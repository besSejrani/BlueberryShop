// Configuration
import "dotenv/config";

// Winston
import { format, createLogger, transports } from "winston";

// =================================================================================================

const { combine, timestamp, printf } = format;

const DevelopmentLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`);

  // YYYY-MM-DD
  const date = new Date();
  const myDate = `${date.toISOString().split("T")[0]}`;

  return createLogger({
    level: process.env.LOG_LEVEL_DEVELOPMENT,
    format: combine(
      // format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      logFormat,
    ),
    transports: [
      new transports.File({
        filename: `logs/${myDate}.log`,
      }),
    ],
  });
};

export default DevelopmentLogger;
