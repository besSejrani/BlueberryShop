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

// Error Handling
import to from "@Error/to";

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
    let err;
    let data;

    [err, data] = await to(UserModel.findOne({ _id: context.req.userId }));
    if (err) return null;
    const user = data;

    [err, data] = await to(bcrypt.compare(resetPasswordInput.oldPassword, user.password));
    if (!data) throw new Error("Invalid credentials");

    [err, data] = await to(bcrypt.genSalt(12));
    // if (err) // TODO
    const salt = data;

    [err, data] = await to(bcrypt.hash(resetPasswordInput.newPassword, salt));
    // if (err) // TODO
    const hash = data;

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
