import { InputType, Field } from "type-graphql";

@InputType()
export class StripePaymentIntent {
  @Field()
  amount: number;
}
