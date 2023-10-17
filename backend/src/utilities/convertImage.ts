import { streamToBuffer } from "./streamToBuffer";
import { extname } from "path";
import { gifToMp4 } from "./gifToMp4";

interface convertImage {
  fileName: string;
  key: string;
  file: Express.Multer.File;
}
const convertImage = async ({ file, fileName, key }: convertImage) => {
  try {
    const ext = extname(file.originalname);
    console.log("buffer:=---------------", file.stream);
    // sharp 를 사용하여 gif -> webp 변환
    if (ext === ".gif") {
      await gifToMp4({ file: file, fileName, key });
    } else {
      const bufferData = await streamToBuffer({ stream: file.stream });
      // imagemin 에서 buffer 를 받아서 webp 변환
    }
  } catch (error) {
    console.log(error);
  }
};

export { convertImage };
