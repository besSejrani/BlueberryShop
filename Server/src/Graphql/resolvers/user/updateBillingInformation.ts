// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { UpdateBilling } from "./inputs/UpdateBilling";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "../../../Model/User";

// Middleware
import { authentication } from "../../../Middleware/authentication";

//=======================================================================

@Resolver()
export class UpdateBillingInformationResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async updateBilling(
    @Arg("updateBillingInput") updateBillingInput: UpdateBilling,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return null;
    }

    const update = await UserModel.findOneAndUpdate(
      { _id: context.req.userId },

      {
        ...user.toObject(),
        ...updateBillingInput,
      },
      { new: true }
    );

    return update;
  }
}
