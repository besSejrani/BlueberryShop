// Configuration
import "dotenv/config";

// Redis
import Redis from "ioredis";
// =================================================================================================

// export const redis =
//   process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production"
//     ? new Redis({ host: "redis" })
//     : new Redis(process.env.REDIS_URL, {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT),
//         password: process.env.REDIS_PASSWORD,
//       });

export const redis = new Redis({ host: "redis" });
