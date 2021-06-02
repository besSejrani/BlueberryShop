// Configuration
import "dotenv/config";

// GraphQL
import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { SigninInput } from "./inputs/SigninInput";

// Database
import { UserModel } from "@Model/user/User";

// Authentication & Authorization
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Response
import { UserResponse } from "../user/types/UserType";

// =================================================================================================

@Resolver()
export class SigninResolver {
  @Mutation(() => UserResponse)
  async signin(@Arg("input") { email, password }: SigninInput, @Ctx() context: MyContext): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    if (!user.confirmed) {
      throw new Error("confirm user");
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    context?.res?.cookie("token", token, {
      maxAge: (60 * 60 * 1000 * 24 * 1) as number,
      httpOnly: true,
      domain: process.env.COOKIES_DOMAIN,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    return { user, token };
  }
}
