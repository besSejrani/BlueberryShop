// GraphQL
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../Graphql/types/MyContext";

// In-Memory Database
import { redis } from "../Redis/index";

// ========================================================================================================

const oneDay = 60 * 60 * 24;

export const rateLimit: (limit?: number) => MiddlewareFn<MyContext> = (limit = 50) => async (
  { context: { req }, info },
  next,
) => {
  const key = `rate-limit:${info.fieldName}:${req.ip}`;

  const current = await redis.incr(key);

  if (current > limit) {
    throw new Error("You are making too much requests");
  } else if (current === 1) {
    await redis.expire(key, oneDay);
  }

  return next();
};
