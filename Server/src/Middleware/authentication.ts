// Configuration
import "dotenv/config";

//Authentication & Authorization
import jwt from "jsonwebtoken";

// Database
import { UserModel as User } from "../Model/User";

// GraphQL
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../Graphql/types/MyContext";

// ========================================================================================================

export const authentication: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const token = context.req.headers.cookie?.split("token=")[1].split(";")[0] || context.req.headers.token;

    const decoded: any = await jwt.verify(token as string, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded._id);

    if (!user) {
      context.res.status(400).json({ message: "You must be loged in" });
    }

    context.req.userId = user?.id;
    context.req.role = user?.role;

    return next();
  } catch (error) {
    console.log("error:", error.message);
  }
};
