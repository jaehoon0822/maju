import fs from "fs";
import path from "path";
import Ffmpeg from "fluent-ffmpeg";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import { path as ffprobePath } from "@ffprobe-installer/ffprobe";
import { Readable } from "stream";
import { s3PutObject } from "./s3PutObject";
import { bucket } from "@/aws";
//@ts-ignore
const imagemin = require("imagemin");
const gifsicle = require("imagemin-gifsicle");

interface gifToMp4Params {
  file: Express.Multer.File;
  fileName: string;
  key: string;
}

export const gifToMp4 = async ({ file, fileName, key }: gifToMp4Params) => {
  const uploadFolder = path.resolve(__dirname, "../upload");
  const outputFilePath = path.join(uploadFolder!, `${fileName}.mp4`);
  // imagemin 에서 buffer 를 받아서 최적화
  Ffmpeg.setFfmpegPath(ffmpegPath);
  Ffmpeg.setFfprobePath(ffprobePath);

  // console.log("-----envupload", process.env.UPLOAD_FOLDER);
  // console.log("-----output-----", outputFilePath);
  // console.log("-----redableData-----", readableData);
  console.log("-------filepath------", file.path);
  // Ffmpeg 에서 mp4 로 변환
  const ffmpegCommaned = Ffmpeg()
    .input(file.stream)
    .outputOptions([
      "-pix_fmt yuv420p",
      "-c:v libx264",
      "-movflags +faststart",
      "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
    ])
    .toFormat("mp4")
    // .noAudio()
    .output(outputFilePath);

  ffmpegCommaned
    .on("end", async () => {
      console.log("Ended");
      // end event
      // output path 의 mp4 를 가져옴
      const mp4File = fs.readFileSync(outputFilePath);
      // 변환된 file 을 s3 에 send
      await s3PutObject({ body: mp4File, bucket, key });
      // output path 의 mp4 파일 삭제
      fs.unlinkSync(outputFilePath);
    })
    .on("error", (e, stdout, stdErr) => {
      console.log(e);
      console.log(stdErr);
      console.log(stdout);
    })
    .run();
  // Ffmpeg()
  //   .input(readableData) // input file
  //   .outputOptions([
  //     "-pix_fmt yuv420p",
  //     "-c:v libx264",
  //     "-movflags +faststart",
  //     "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
  //   ])
  //   .output(outputFilePath) // output path
  //   .on("error", (error) => {
  //     // error event
  //     console.log("ffmpegError: ", error.message);
  //   })
  //   .on("end", async () => {
  //     // end event
  //     // output path 의 mp4 를 가져옴
  //     const mp4File = fs.readFileSync(outputFilePath);
  //     // 변환된 file 을 s3 에 send
  //     await s3PutObject({ body: mp4File, bucket, key });
  //     // output path 의 mp4 파일 삭제
  //     // fs.unlinkSync(outputFilePath);
  //   })
  //   .run();
};
