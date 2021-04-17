import { InputType, Field } from "type-graphql";

@InputType()
export class ResetPasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
