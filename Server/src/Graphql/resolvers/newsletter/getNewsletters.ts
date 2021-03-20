// GraphQL
import { Resolver, Query } from "type-graphql";

// Database
import { Newsletter, NewsletterModel } from "../../../Model/Newsletter";

//=======================================================================

@Resolver()
export class NewslettersResolver {
  @Query(() => [Newsletter], { nullable: true })
  async getNewsletters(): Promise<Newsletter[] | null> {
    return await NewsletterModel.find({});
  }
}
