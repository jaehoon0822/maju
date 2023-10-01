//@ts-ignore
const imagemin = require("imagemin");
const webp = require("imagemin-webp");
// import imagemin from "imagemin";
// import webp from "imagemin-webp";

interface convertImageToWebp {
  file: Express.Multer.File;
}
const convertImageToWebp = async ({ file }: convertImageToWebp) => {
  try {
    // Multer.File 을 buffer 로 변경k
    const bufferData = file.buffer;
    // imagemin 에서 buffer 를 받아서 webp 변환
    const convertFile = await imagemin.buffer(bufferData, {
      plugins: [
        webp({
          quality: 75,
        }),
      ],
    });
    // 변환된 file 반환
    return convertFile;
  } catch (error) {
    console.log(error);
  }
};

export { convertImageToWebp };
