// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { NewsletterModel } from "@Model/Newsletter";

// =================================================================================================

@Resolver()
export class AddToNewsletterResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async addToNewsletter(@Arg("email") email: string): Promise<boolean> {
    const emailNewsletter = await NewsletterModel.findOne({ email });

    if (emailNewsletter) {
      return true;
    }

    const newEmailNewsletter = new NewsletterModel({ email });
    newEmailNewsletter.save();

    return true;
  }
}
