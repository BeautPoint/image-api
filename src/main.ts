import fs from "fs";
import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import { appRouter } from "./routes";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandle } from "./middleware/error.middleware";
import { logger } from "./config/logger.config";
import { morganFormat } from "./util/morgan.util";
dotenv.config();

const app: Application = express();

async function server() {
  const port = process.env.PORT || 3002;
  const router = await appRouter();
  const imagesDir = path.join(__dirname, "images");
  app.use(
    morgan(morganFormat, {
      stream: { write: (message) => logger.http(message.trim()) },
    })
  );
  app.use(json());
  app.use(router);
  app.use(errorHandle);
  app.listen(port, () => {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    logger.info(`🔥 Server is Opened PORT - ${port}`);
  });
}

server();

module.exports = app;
