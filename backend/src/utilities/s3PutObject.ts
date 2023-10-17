import s3 from "@/aws";
import { PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";

interface S3PutObjectParams {
  bucket: string;
  key: string;
  body: PutObjectCommandInput["Body"];
}

export const s3PutObject = async ({ bucket, key, body }: S3PutObjectParams) => {
  const uploadInput: PutObjectCommandInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
  };

  await s3.send(new PutObjectCommand(uploadInput));
};
