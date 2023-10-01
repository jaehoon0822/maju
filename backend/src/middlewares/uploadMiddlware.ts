import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import multerS3 from "multer-s3";
import path from "path";
import s3, { bucket } from "@/aws";
import { convertImageToWebp } from "@/utilities/convertImageToWebp";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";

// S3 post storage 연결
export const postStorage = multerS3({
  s3: s3,
  bucket,
  key: async (_req, file, cb) => {
    const convertFile = await convertImageToWebp({ file });
    const fileName = `post/raw/${uuidv4()}.webp`;

    const uploadInput: PutObjectCommandInput = {
      Bucket: bucket,
      Key: fileName,
      Body: convertFile,
    };

    s3.send(new PutObjectCommand(uploadInput));
    cb(null, fileName);
  },
});

// S3 avatar storage 연결
export const avatarStorage = multerS3({
  s3: s3,
  bucket: "maju-bucket",
  key: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar/raw/${uuidv4()}${ext}`);
  },
});

// S3 coverImage storage 연결
export const coverImageStorage = multerS3({
  s3: s3,
  bucket: "maju-bucket",
  key: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `coverImage/raw/${uuidv4()}${ext}`);
  },
});

// Multipart-form data 처리
export const postUpload = multer({
  // storage 설정
  // s3 storage
  storage: postStorage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if ([".jpeg", ".jpg", ".png", ".gif", ".webp"].includes(ext))
      cb(null, true);
    else cb(new Error("jpeg,png,gif,webp 만 적용가능합니다."));
  },
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// Multipart-form data 처리
export const userAvatarUpload = multer({
  // storage 설정
  // s3 storage
  storage: avatarStorage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if ([".jpeg", ".jpg", ".png", ".gif", ".webp"].includes(ext))
      cb(null, true);
    else cb(new Error("jpeg,png,gif,webp 만 적용가능합니다."));
  },
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// Multipart-form data 처리
export const userCoverImageUpload = multer({
  // storage 설정
  storage: coverImageStorage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if ([".jpeg", ".jpg", ".png", ".gif", ".webp"].includes(ext))
      cb(null, true);
    else cb(new Error("jpeg,png,gif,webp 만 적용가능합니다."));
  },
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
