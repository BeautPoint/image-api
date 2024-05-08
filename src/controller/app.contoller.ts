import { Request, Response, NextFunction } from "express";
import { AppServie } from "../service/app.service";
import { Exceptions } from "../middleware/exceptions.midleware";
import { fileStorageConfig } from "../middleware/fileStorage.middleware";

export class AppController {
  constructor(private readonly appService: AppServie) {}

  async getRoot(req: Request, res: Response, next: NextFunction) {
    return res.status(200).send("The server is running!");
  }

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename } = req.params;
      const filePath = await this.appService.getImage(filename);
      return res.status(200).sendFile(filePath);
    } catch (err: any) {
      next(err);
    }
  }

  async createImage(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const result = await this.appService.createImage(file);
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
