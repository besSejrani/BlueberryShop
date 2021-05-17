import { InputType, Field } from "type-graphql";

@InputType()
export class StripePaymentIntentInput {
  @Field()
  amount: number;

  @Field()
  shippingCountry: string;

  @Field()
  shippingAddress: string;

  @Field()
  shippingCity: string;

  @Field()
  shippingZip: string;
}
