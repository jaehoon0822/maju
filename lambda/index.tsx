import * as path from "path";
import { Handler, S3Event } from "aws-lambda";
import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import * as sharp from "sharp";
// import sharp from "sharp";

const transfromationOptions = [
  { name: "w140", width: 140 },
  { name: "w348", width: 300 },
  { name: "w576", width: 576 },
  { name: "w960", width: 960 },
];

const s3 = new S3Client({
  region: "ap-northeast-2",
});

export const handler: Handler = async (event: S3Event) => {
  try {
    const key = event.Records[0].s3.object.key;
    const prefix = key.split("/")[0];
    const keyName = path.parse(key.split("/")[2]).name;
    const getparams: GetObjectCommandInput = {
      Bucket: "maju-bucket",
      Key: key,
    };
    const image = await s3.send(new GetObjectCommand(getparams));
    const content = await image.Body?.transformToByteArray();
    const imageInfo = await sharp(content).metadata();

    if (imageInfo.width > 1200) {
      const resizedImage = await sharp(content, { animated: true })
        .rotate()
        .resize(1200)
        .webp({
          lossless: true,
          quality: 60,
          alphaQuality: 80,
          force: false,
        })
        .toBuffer();

      const putParams: PutObjectCommandInput = {
        Bucket: "maju-bucket",
        Body: resizedImage,
        Key: `${prefix}/raw/${keyName}.webp`,
      };
      return await s3.send(new PutObjectCommand(putParams));
    }

    await Promise.all(
      transfromationOptions.map(async ({ name, width }) => {
        try {
          const newKey = `${prefix}/${name}/${keyName}.webp`;
          if (imageInfo.width > width) {
            console.log(`newKey: ${newKey}`);
            const resizedImage = await sharp(content, { animated: true })
              .rotate()
              .resize(width)
              .webp({
                lossless: true,
                quality: 60,
                alphaQuality: 80,
                force: false,
              })
              .toBuffer();
            const putParams: PutObjectCommandInput = {
              Bucket: "maju-bucket",
              Body: resizedImage,
              Key: newKey,
            };
            await s3.send(new PutObjectCommand(putParams));
          } else {
            const putParams: PutObjectCommandInput = {
              Bucket: "maju-bucket",
              Body: content,
              Key: newKey,
            };
            await s3.send(new PutObjectCommand(putParams));
          }
        } catch (error) {
          console.log(error);
        }
      })
    );

    return {
      statusCode: 200,
      body: event,
    };
  } catch (error) {
    console.log(error);
  }
};
