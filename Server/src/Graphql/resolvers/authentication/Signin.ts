// GraphQL
import { Mutation, Resolver, Arg } from "type-graphql";
import { SigninInput } from "./inputs/SigninInput";

// Database
import { UserModel } from "../../../Model/User";

//Authentication & Authorization
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Response
import { UserResponse } from "../user/types/UserType";

// ========================================================================================================

@Resolver()
export class SigninResolver {
  @Mutation(() => UserResponse)
  async signin(@Arg("input") { email, password }: SigninInput): Promise<UserResponse> {
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

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET as string);

    return { user, token };
  }
}
