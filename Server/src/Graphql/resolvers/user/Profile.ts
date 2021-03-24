// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { ChangedProfileInput } from "./inputs/ChangeProfileInput";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "../../../Model/User";

// Middleware
import { authentication } from "../../../Middleware/authentication";

//=======================================================================

@Resolver()
export class ProfileResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async updateProfile(
    @Arg("data") { username, email }: ChangedProfileInput,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    if (context.req.userId) {
      return null;
    }

    const user = await UserModel.findByIdAndUpdate(context.req.userId, { username, email }, { new: true });
    return user;
  }
}
