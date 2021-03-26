// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { NewsletterModel } from "../../../Model/Newsletter";

// ========================================================================================================

@Resolver()
export class AddToNewsletterResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteFromNewsletter(@Arg("newsletterId") newsletterId: string): Promise<boolean> {
    const emailNewsletter = await NewsletterModel.findById(newsletterId);

    if (!emailNewsletter) {
      return true;
    }

    await NewsletterModel.findOneAndDelete({ _id: newsletterId });

    return true;
  }
}
