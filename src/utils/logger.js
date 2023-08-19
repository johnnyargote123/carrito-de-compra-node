import winston from "winston";
import config from "../config/config.js";
const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,

  },
  colors: {
    fatal: "red",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const developmentLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({
            colors: customLevelOptions.colors,
          }),
          winston.format.simple()
        ),
      }),


      new winston.transports.File({ level: "error", filename: "errors.log" }),
    ],
    
  });

const productionLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.File({ level: "error", filename: "errors.log" }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevelOptions.colors,
        }),
        winston.format.simple()
      ),
    }),
  ],
});

let logger;

switch (config.environment) {
  case "prod":
    logger = productionLogger;
    break;

  case "dev":
    logger = developmentLogger;
    break;
}

export default logger;
