import winston, { format } from "winston";

const customLogger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { app: "backend" },
  transports: [
    // writes all logs of http or higher to given files
    //new winston.transports.Console(),
    new winston.transports.File({
      filename: "../../logs/combined/combined.json",
    }),
    new winston.transports.File({
      filename: "../../logs/combined/combined.log",
    }),

    // error and higher to given files
    new winston.transports.File({
      filename: "../../logs/error/error.json",
      level: "error",
    }),
    new winston.transports.File({
      filename: "../../logs/error/error.log",
      level: "error",
    }),
  ],
  //silent:true,
});

export const logger = customLogger;

logger.http("Hii ni uras banae")
