import Redis from "ioredis";
export const redis = new Redis({ host: "192.168.1.104", port: 6379 });

// import Redis from "ioredis";
// export const redis = new Redis(process.env.REDIS_URL, {
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,

//   connectTimeout: 20000,
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// import Redis from "ioredis";
// export const redis = new Redis({ host: "redis" });
