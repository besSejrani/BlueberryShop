// GraphQL
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { ResetPasswordInput } from "./inputs/ResetPasswordInput";
import { MyContext } from "../../types/MyContext";

// Database
import { UserModel } from "@Model/user/User";

// Bcrypt
import bcrypt from "bcryptjs";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// =================================================================================================

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async resetPassword(
    @Arg("resetPasswordInput") resetPasswordInput: ResetPasswordInput,
    @Ctx() context: MyContext,
  ): Promise<boolean | null> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return null;
    }

    const valid = bcrypt.compare(resetPasswordInput.oldPassword, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(resetPasswordInput.newPassword, salt);

    await UserModel.findByIdAndUpdate(
      { _id: context.req.userId },
      {
        ...user.toObject(),
        password: hash,
      },
      { new: true },
    );

    return true;
  }
}
