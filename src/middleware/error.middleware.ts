import { NextFunction, Request, Response } from "express";
import { Exceptions } from "./exceptions.midleware";
import { logger } from "../config/logger.config";

export function errorHandle(
  err: Exceptions,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { message } = err;
  const status = err.status || 400;

  if (message === "Unexpected end of form") {
    logger.error(err);
    return res.status(400).send({ status: 400, message });
  }

  logger.error(message);
  const result = { status, message };

  return res.status(status).send(result);
}
