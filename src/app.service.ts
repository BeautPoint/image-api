import fs from "fs";
import path from "path";
import multer from "multer";

// const filePath = path.join(__dirname, "data.json");

export class AppServie {
  private imagesDir: string;

  constructor() {
    this.imagesDir = path.join(__dirname, "./src/images/");
  }
  async getImage() {
    const data = await fs.promises.readFile(this.imagesDir, "utf8");
    const result = JSON.parse(data);
    return result;
  }
  async createImage(imageFile: any) {
    const { filename } = imageFile;
    const { SERVER_URL } = process.env;

    const imageUrl = SERVER_URL + filename;
    const result = { url: imageUrl };

    return result;
  }
}
