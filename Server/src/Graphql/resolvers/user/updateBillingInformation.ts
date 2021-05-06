// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { UpdateBilling } from "./inputs/UpdateBilling";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "@Model/user/User";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class UpdateBillingInformationResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async updateBillingInformation(
    @Arg("updateBillingInput") updateBillingInput: UpdateBilling,
    @Ctx() context: MyContext,
  ): Promise<User | null | undefined> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return null;
    }

    const update = await UserModel.findByIdAndUpdate(
      { _id: context.req.userId },
      {
        ...user.toObject(),
        // @ts-ignore: Object is possibly 'null'.
        billing: [{ ...user!.billing[0], ...updateBillingInput }],
      },
      { new: true },
    );

    return update;
  }
}
