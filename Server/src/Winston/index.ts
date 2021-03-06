import winston from "winston";

import DevelopmentLogger from "./developmentLogger";
import ProductionLogger from "./productionLogger";

// =================================================================================================

let logger: winston.Logger;

if (process.env.NODE_ENV2 === "development") {
  logger = DevelopmentLogger();
} else {
  logger = ProductionLogger();
}

export default logger;
