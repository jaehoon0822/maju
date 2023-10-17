import { PutImagesParams, ResizerParams } from "../index.type";
import { resizeImageCreator } from "./resizeImageCreator";
import { putS3 } from "./s3Client";
import {
  avatarTransformationOptions,
  coverImageTransformationOptions,
  postTransformationOptions,
} from "./transformationOptions";

const putImages = ({
  transformationOptions,
  imageInfo,
  bucket,
  content,
  keyName,
  prefix,
}: PutImagesParams) => {
  // postTransformationOptions 의 크기에 맞도록
  // 모든 image resize
  return Promise.all(
    transformationOptions.map(async ({ name, width }) => {
      try {
        const newKey = `${prefix}/${name}/${keyName}.webp`;
        // imageInfo 의 width 값이 postTransformationOptions 의
        // widht 보다 크면, width 값 resize 이후 s3 저장
        if (imageInfo.width! > width) {
          const resizedImage = await resizeImageCreator({
            content,
            width,
          });
          // S3 저장
          await putS3({ Bucket: bucket, Key: newKey, Body: resizedImage });
        } else {
          // imageInfo 의 width 값이 postTransformationOptions 의
          // width 값보다 작으면 그대로 s3 저장
          await putS3({ Bucket: bucket, Key: newKey, Body: content });
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};

export const postResizer = async ({
  bucket,
  keyName,
  prefix,
  content,
  imageInfo,
}: ResizerParams) => {
  // newKey
  const newKey = `${prefix}/raw/${keyName}.webp`;
  // imageInfo 의 width 값이 최대값 1200 보다 크면
  // 원본 사이즈 1200 으로 resize
  if (imageInfo.width! > 1200) {
    const resizedImage = await resizeImageCreator({ content, width: 1200 });
    await putS3({ Bucket: bucket, Body: resizedImage, Key: newKey });
  }

  await putImages({
    transformationOptions: postTransformationOptions,
    bucket,
    content,
    imageInfo,
    keyName,
    prefix,
  });
};

export const avatarResizer = async ({
  bucket,
  prefix,
  keyName,
  content,
  imageInfo,
}: ResizerParams) => {
  try {
    await putImages({
      transformationOptions: avatarTransformationOptions,
      bucket,
      content,
      imageInfo,
      keyName,
      prefix,
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

export const coverImageResizer = async ({
  bucket,
  prefix,
  keyName,
  content,
  imageInfo,
}: ResizerParams) => {
  try {
    if (imageInfo.width! > 1200) {
      const newKey = `${prefix}/raw/${keyName}.webp`;
      const resizedImage = await resizeImageCreator({ content, width: 1200 });
      await putS3({ Bucket: bucket, Body: resizedImage, Key: newKey });
    }
    await putImages({
      transformationOptions: coverImageTransformationOptions,
      bucket,
      content,
      imageInfo,
      keyName,
      prefix,
    });
  } catch (error) {
    console.log(error);
  }
};
