import fs from "fs";
import multer from "multer";
import path from "path";

export function fileStorageConfig() {
  const imagesDir = path.join(__dirname, "..", "images");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
      // file.originalname = Buffer.from(file.originalname, "latin1").toString(
      //   "utf-8"
      // );
      const ext = path.extname(file.originalname);
      const randomString = Math.floor(Math.random() * Date.now()).toString(16);
      cb(null, `${Date.now()}-${randomString}${ext}`);
    },
  });
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
  });
}
