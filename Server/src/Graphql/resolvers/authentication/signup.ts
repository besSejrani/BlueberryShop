// GraphQL
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { SignupInput } from "./inputs/SignupInput";

// Database
import { UserModel } from "@Model/user/User";

// Authentication & Authorization
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Response
import { UserResponse } from "../user/types/UserType";

// Email
import { SendEmail } from "../../../Email/sendEmail";
import { createConfirmationUrl } from "../../../Email/createConfirmationUrl";

// =================================================================================================

@Resolver()
export class SignupResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg("input") { username, email, password }: SignupInput,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("Invalid credentials");
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({ username, email, password: hash });
    await newUser.save();

    const payload = {
      id: newUser.id,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    context.res.cookie("access-token", token, {
      maxAge: (60 * 60 * 1000 * 24 * 10) as number,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    context.res.cookie("refresh-token", token, {
      maxAge: (60 * 60 * 1000 * 24 * 10) as number,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    await SendEmail(email, await createConfirmationUrl(newUser.id));

    return { user: newUser, token };
  }
}
