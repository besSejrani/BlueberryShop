// GraphQL
import { ObjectType, Field } from "type-graphql";

// Database
import { User } from "../../../../Model/User";

// ========================================================================================================

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
