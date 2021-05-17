// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateProfile {
  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  username?: string;

  @Field()
  email?: string;
}
