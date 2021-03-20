// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { NewsletterModel } from "../../../Model/Newsletter";

// ========================================================================================================

@Resolver()
export class AddUserToNewsResolver {
  @Mutation(() => Boolean)
  async addUserToNews(@Arg("email") email: string): Promise<boolean> {
    const emailNewsletter = await NewsletterModel.findOne({ email });

    if (emailNewsletter) {
      return true;
    }

    const newEmailNewsletter = new NewsletterModel({ email });
    newEmailNewsletter.save();

    return true;
  }
}
