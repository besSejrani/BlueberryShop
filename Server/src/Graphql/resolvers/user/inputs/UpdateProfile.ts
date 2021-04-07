// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateProfile {
  @Field()
  username?: string;

  @Field()
  email?: string;
}
