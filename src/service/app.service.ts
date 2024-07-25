import { Exceptions } from "../middleware/exceptions.midleware";
import fs from "fs";
import path from "path";

export class AppServie {
  constructor() {}

  /** 이미지 조회 메서드
   * - 조회하려는 이미지명을 클라이언트에서 받아온다.
   * - 이미지가 저장되어있는 폴더 경로에 이미지를 찾은 뒤 반환
   * @param {string} imageName - 이미지 조회에 필요한 값
   * @returns 이미지 파일
   * @Err 저장되어 있지 않은 이미지에 대한 에러
   */
  async getImage(imageName: string) {
    const filePath = path.join(__dirname, "..", "images/");
    const data = await fs.promises.readdir(filePath);
    const imageFile = data.filter((item) => {
      return item === imageName;
    });

    if (!imageFile[0]) {
      throw new Exceptions(404, "Image Not Found!");
    }
    const result = path.join(filePath, imageName);

    return result;
  }

  /** 이미지 생성 메서드
   * - 조회하려는 이미지명을 클라이언트에서 받아온다.
   * - 이미지가 저장되어있는 폴더 경로에 이미지를 찾은 뒤 반환
   * @param imageFile - 이미지 생성에 필요한 값
   * @returns 이미지 파일 url
   * @Err 잘못된 이미지 형식
   */
  async createImage(imageFile?: Express.Multer.File) {
    if (!imageFile?.filename) {
      throw new Exceptions(400, "Please check the file format!");
    }

    const { API_URL, LOCALHOST, NODE_ENV, PORT } = process.env;
    const url = NODE_ENV === "production" ? API_URL : LOCALHOST;
    const imageUrl = `${url}:${PORT}/image/${imageFile?.filename}`;
    const result = { url: imageUrl };

    return result;
  }
}
