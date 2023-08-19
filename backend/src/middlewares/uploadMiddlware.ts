import multer from "multer";
import path from "path";

// Multipart-form data 처리
export const upload = multer({
  // storage 설정
  // local disk storage
  storage: multer.diskStorage({
    // 목적지
    destination(req, file, cb) {
      // cb(error, destination)
      cb(null, path.join(__dirname, "../uploads/"));
    },
    // file 이름
    filename(req, file, cb) {
      // path.extname 은 file 의 확장자를 반환
      // file.originalname -> 파일 이름
      const ext = path.extname(file.originalname);
      // path.basename -> 파일의 확장자를 제외
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf());
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
