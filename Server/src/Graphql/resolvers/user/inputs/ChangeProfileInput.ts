// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class ChangedProfileInput {
  @Field()
  username: string;

  @Field()
  email: string;
}
