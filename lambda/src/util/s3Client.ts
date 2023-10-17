import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandOutput,
} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "ap-northeast-2",
});

export const bucket = "maju-bucket";

export const putS3 = async ({ Bucket, Body, Key }: PutObjectCommandInput) => {
  try {
    const putParams: PutObjectCommandInput = {
      Bucket,
      Body,
      Key,
    };
    await s3.send(new PutObjectCommand(putParams));
  } catch (error) {
    console.log(error);
  }
};

export const getS3 = async ({
  Bucket,
  Key,
}: GetObjectCommandInput): Promise<GetObjectCommandOutput> => {
  try {
    const getParams: GetObjectCommandInput = {
      Bucket,
      Key,
    };
    const image = await s3.send(new GetObjectCommand(getParams));

    return image;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
