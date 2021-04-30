// Configuration
import "dotenv/config";

// Winston
import { format, createLogger, transports } from "winston";

// =================================================================================================

const { combine, timestamp, printf } = format;

const DevelopmentLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`);

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
        filename: "logs/example.log",
      }),
    ],
  });
};

export default DevelopmentLogger;
