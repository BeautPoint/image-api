import winston, { format, transports, config } from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, colorize, label, printf } = format;

const formatfile = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level} : ${message}`;
  })
);

const formatConsole = combine(
  colorize(),
  timestamp({ format: `YYYY/MM/DD A hh:mm:ss` }),
  printf(({ timestamp, level, message }) => {
    const date = timestamp.replace("AM", "오전").replace("PM", "오후");
    return `[${level}] ${date} : ${message}`;
  })
);
const customLevels = { ...config.npm.levels, request: 7, response: 8 };
const addColors = { http: "cyan", request: "magenta", response: "yellow" };

winston.addColors(addColors);

export const logger = winston.createLogger({
  levels: customLevels,
  format: formatConsole,
  transports: [
    new winstonDaily({
      level: "info",
      dirname: "./logs",
      filename: `%DATE%.log`,
      maxFiles: 30,
      format: formatfile,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: "./logs/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),

    new winston.transports.Console({
      level: "http",
      format: formatConsole,
    }),
    new winston.transports.Console({
      level: "request",
      format: formatConsole,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: formatConsole,
    })
  );
}
