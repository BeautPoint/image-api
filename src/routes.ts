import fs from "fs";
import { AppController } from "./app.contoller";
import { Router } from "express";
import { AppServie } from "./app.service";
import multer from "multer";
import path from "path";
import { fileStorageConfig } from "./fileStorage.config";

export async function appRouter() {
  const router: Router = Router();
  const appService = new AppServie();
  const controller: AppController = new AppController(appService);
  const imagesDir = path.join(__dirname, "images");
  const upload = fileStorageConfig();

  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "./src/images"); // 'images/'에서 'uploads/'로 경로를 수정하였습니다.
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + "-" + Date.now());
  //   },
  // });

  // if (!fs.existsSync(imagesDir)) {
  //   fs.mkdirSync(imagesDir, { recursive: true });
  // }
  // const upload = multer({ storage });

  router.get("/images/:imageName", controller.getImage.bind(controller));
  router.post(
    "/create",
    upload.single("profileImage"),
    controller.createImage.bind(controller)
  );

  return router;
}

// class AppRouter {
//   router: Router = Router();
//   controller: AppController;
//   constructor() {
//     this.controller = new AppController();
//     this.initRoute();
//   }

//   initRoute() {
//     this.router.get("/sdsd", this.controller.getImages);
//     this.router.post("/create", this.controller.createImage);
//   }
// }

// const appRouter = new AppRouter();

// export { appRouter };
