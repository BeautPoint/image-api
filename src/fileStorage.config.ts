import fs from "fs";
import multer from "multer";
import path from "path";

export function fileStorageConfig() {
  const imagesDir = path.join(__dirname, "images");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imagesDir); // 'images/'에서 'uploads/'로 경로를 수정하였습니다.
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  return multer({ storage });
}

// export default fileStorageConfig;
