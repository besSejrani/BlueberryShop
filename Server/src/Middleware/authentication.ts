// Configuration
import "dotenv/config";

// Authentication & Authorization
import jwt from "jsonwebtoken";

// Database
import { UserModel } from "@Model/user/User";

// GraphQL
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "@Graphql/types/MyContext";

// Error Handling
import to from "@Error/to";

// =================================================================================================

export const authentication: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    // let err
    // let data

    const token = context.req.headers.cookie?.split("token=")[1].split(";")[0] || context.req.headers.token;

    const decoded: any = await jwt.verify(token as string, process.env.JWT_SECRET as string);

    const [err, data] = await to(UserModel.findById(decoded._id));
    if (err) return context.res.status(400).json({ message: "You must be loged in" });
    const user = data;

    context.req.userId = user?.id;
    context.req.role = user?.role;

    return next();
  } catch (error) {
    console.log("error:", error.message);
  }
};
