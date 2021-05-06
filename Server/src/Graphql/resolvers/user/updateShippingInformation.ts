// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { UpdateShipping } from "./inputs/updateShipping";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "@Model/user/User";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class UpdateShippingInformationResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async updateShippingInformation(
    @Arg("updateShippingInput") updateShippingInput: UpdateShipping,
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
        shipping: [{ ...user!.shipping[0], ...updateShippingInput }],
      },
      { new: true },
    );

    return update;
  }
}
