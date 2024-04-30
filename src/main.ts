import fs from "fs";
import express, { Application, json } from "express";
import cors from "cors";
import { appRouter } from "./routes";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";

async function server() {
  const app: Application = express();
  const port = 3002;
  const router = await appRouter();
  const imagesDir = path.join(__dirname, "images");

  dotenv.config();
  app.use("/images", express.static(imagesDir));
  app.use(cors());
  app.use(json());
  app.use(router);

  app.listen(port, () => {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    console.log(`🔥 Server is Opened PORT : ${port}`);
  });
}

server();
const setup = createServer(express());

module.exports = setup;
