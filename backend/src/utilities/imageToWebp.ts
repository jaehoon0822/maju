import { s3PutObject } from "./s3PutObject";
import { bucket } from "@/aws";
//@ts-ignore
const imagemin = require("imagemin");
const webp = require("imagemin-webp");

interface ImageToWebpParams {
  bufferData: Buffer;
  key: string;
}

export const imageToWebp = async ({ bufferData, key }: ImageToWebpParams) => {
  // imagemin 에서 buffer 를 받아서 webp 변환
  const convertedFile = await imagemin.buffer(bufferData, {
    plugins: [
      webp({
        quality: 75,
      }),
    ],
  });
  // 변환된 file 을 s3 에 send
  await s3PutObject({ body: convertedFile, bucket, key });
};
