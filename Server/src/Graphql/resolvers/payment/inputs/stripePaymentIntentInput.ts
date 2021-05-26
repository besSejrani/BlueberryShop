// Class-Validator
import { IsInt, MaxLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

@InputType()
export class StripePaymentIntentInput {
  @Field()
  @IsInt()
  amount: number;

  @Field()
  @MaxLength(25, { message: "Shipping Country information can not be longer than 25 characters" })
  shippingCountry: string;

  @Field()
  @MaxLength(40, { message: "Shipping Address information can not be longer than 40 characters" })
  shippingAddress: string;

  @Field()
  @MaxLength(25, { message: "Shipping Country information can not be longer than 25 characters" })
  shippingCity: string;

  @Field()
  @MaxLength(10, { message: "Shipping Country information can not be longer than 10 characters" })
  shippingZip: string;
}
