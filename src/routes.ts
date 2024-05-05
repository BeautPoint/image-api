import fs from "fs";
import { AppController } from "./controller/app.contoller";
import { Router } from "express";
import { AppServie } from "./service/app.service";
import multer from "multer";
import path from "path";
import { fileStorageConfig } from "./middleware/fileStorage.middleware";
import { get } from "http";
import { logAPI } from "./util/apiLog.util";

export async function appRouter() {
  const router: Router = Router();
  const appService = new AppServie();
  const controller: AppController = new AppController(appService);
  const upload = fileStorageConfig().single("imageFile");

  router.get("/", logAPI, controller.getRoot.bind(controller));
  router.get("/image/:filename", logAPI, controller.getImage.bind(controller));
  router.post(
    "/create",
    upload,
    logAPI,
    controller.createImage.bind(controller)
  );

  return router;
}
