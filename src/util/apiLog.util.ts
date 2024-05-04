import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config";

export const logAPI = (req: Request, res: Response, next: NextFunction) => {
  const { file, params } = req;
  const request = { file, params };
  logger.log("request", JSON.stringify(request, null, 2));
  next();
};
