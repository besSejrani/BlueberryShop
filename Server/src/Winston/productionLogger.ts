// Configuration
import "dotenv/config";

// Winston
import { format, createLogger, transports } from "winston";

// =================================================================================================

const { combine, timestamp, errors, json } = format;

const ProductionLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL_PPRODUCTION,
    format: combine(format.colorize(), timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "server-service" },
    transports: [
      new transports.File({
        filename: "logs/example.log",
      }),
    ],
  });
};

export default ProductionLogger;
