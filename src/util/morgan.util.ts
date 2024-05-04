import chalk from "chalk";
import morgan from "morgan";

morgan.token("colored-method", (req, res) => {
  //   const crud = ["GET", "POST", "PATCH", "DELETE"];
  const { method, statusCode } = req;
  //   return method === "GET" && chalk.green(req.method);
  
  if (method === "GET") return chalk.green(method);
  if (method === "POST") return chalk.yellow(method);
  if (method === "PUT" || "PATCH") return chalk.blue(method);
  if (method === "DELETE") return chalk.red(method);
});

morgan.token("status", (req, res) => {
  const { statusCode } = res;
  if (statusCode < 400) return chalk.cyan(res.statusCode.toString());
  return chalk.red(res.statusCode.toString());
});

// morgan.token("reqeust", (req, res) => {});

// Apply morgan middleware with custom format
export const morganFormat = ":colored-method :url :status :response-time ms";
