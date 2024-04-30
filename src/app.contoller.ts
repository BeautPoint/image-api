import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { AppServie } from "./app.service";

const imagesDir = path.join(__dirname, "images");

export class AppController {
  constructor(private readonly appService: AppServie) {}

  // async getAllImages(req: Request, res: Response) {
  //   try {
  //     // const result = await this.appService.getImage();
  //     // console.log("Sending response:", result);
  //     fs.readdir(imagesDir, (err, files) => {
  //       console.log(files);
  //       if (err) {
  //         console.log(err);
  //         return res.status(400).send(err);
  //       }

  //       return res.status(200).sendFile(files);
  //     });
  //   } catch (err: any) {
  //     return res.status(400).send({ message: err.message });
  //   }
  // }

  async getImage(req: Request, res: Response) {
    try {
      // const result = await this.appService.getImage();
      // console.log("Sending response:", result);
      const imageName = req.params.imageName;
      const imagePath = path.join(imagesDir, imageName);
      fs.readdir(imagePath, (err, files) => {
        console.log(files);
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }

        return res.status(200).sendFile(files[0]);
      });
    } catch (err: any) {
      return res.status(400).send({ message: err.message });
    }
  }

  async createImage(req: Request, res: Response) {
    try {
      const file = req.file;

      console.log("file : ", file);
      const { uri } = req.body;
      const result = await this.appService.createImage(file);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
