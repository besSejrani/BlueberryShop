// GraphQL
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../Graphql/types/MyContext";

// =======================================================================

const authorization = (roles: string[]): MiddlewareFn<MyContext> => async ({ context }, next): Promise<void> => {
  if (!roles.includes(context.req.role)) {
    // await context.res.status(400).json({ message: "You do not have permission to perform this action" });
    throw new Error("You do not have permission to perform this action");
  }

  return next();
};

export default authorization;
