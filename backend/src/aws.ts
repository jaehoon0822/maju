import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export const bucket = "maju-bucket";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
  },
});

export const getSignedUrl = async ({ key }: { key: string }) => {
  try {
    const { fields, url } = await createPresignedPost(s3, {
      Bucket: bucket,
      Key: key,
      Expires: 300,
      Conditions: [
        ["content-length-range", 0, 20 * 1024 * 1024],
        ["starts-with", "$Conent-Type", "image/"],
      ],
    });
    return { fields, url };
  } catch (error) {
    throw error;
  }
};

export default s3;
