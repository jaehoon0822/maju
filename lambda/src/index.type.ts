import { Metadata } from "sharp";
import { TransformationOptions } from "./util/transformationOptions";

export interface ResizerParams {
  // S3 bucket 이름
  bucket: string;
  // S3 key 이름
  keyName: string;
  // S3 Folder 이름(접두사)
  prefix: string;
  // 변환할 content
  content: Uint8Array | undefined;
  // 현재 image 정보
  imageInfo: Metadata;
}

export interface PutImagesParams extends ResizerParams {
  // transformationOptions
  transformationOptions: TransformationOptions;
}
