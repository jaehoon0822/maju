import * as path from "path";
import sharp from "sharp";
import { Handler, S3Event } from "aws-lambda";
import { bucket, getS3 } from "./util/s3Client";
import { avatarResizer, coverImageResizer, postResizer } from "./util/resizers";

export const handler: Handler = async (event: S3Event) => {
  try {
    const key = event.Records[0].s3.object.key.split("/");
    const prefix = key[0];
    const keyName = path.parse(key[2]).name;
    const { Body } = await getS3({ Bucket: bucket, Key: key.join("/") });
    const content = await Body?.transformToByteArray();
    const imageInfo = await sharp(content).metadata();

    if (prefix === "post") {
      await postResizer({ bucket, content, imageInfo, keyName, prefix });
    }
    if (prefix === "avatar") {
      await avatarResizer({ imageInfo, bucket, content, keyName, prefix });
    }
    if (prefix === "coverImage") {
      await coverImageResizer({
        imageInfo,
        bucket,
        content,
        keyName,
        prefix,
      });
    }

    return {
      statusCode: 200,
      body: event,
    };
  } catch (error) {
    console.log(error);
  }
};
