// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { NewsletterModel } from "../../../Model/Newsletter";

// ========================================================================================================

@Resolver()
export class AddToNewsletterResolver {
  @Mutation(() => Boolean)
  async deleteFromNewsletter(@Arg("newsletterId") newsletterId: string): Promise<boolean> {
    const emailNewsletter = await NewsletterModel.findById(newsletterId);

    if (!emailNewsletter) {
      return true;
    }

    await NewsletterModel.findOneAndDelete({ _id: newsletterId });

    return true;
  }
}
