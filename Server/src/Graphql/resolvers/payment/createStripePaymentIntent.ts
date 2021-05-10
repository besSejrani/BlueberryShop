// GraphQL
import { Mutation, Resolver, Arg } from "type-graphql";
import { StripePaymentIntent } from "./inputs/stripePaymentIntentInput";

// Stripe
import Stripe from "stripe";

// =================================================================================================

@Resolver()
export class CreateStripePaymentIntent {
  @Mutation(() => String, { nullable: true })
  async createStripePaymentIntent(
    @Arg("stripePaymentIntent") stripePaymentIntent: StripePaymentIntent,
  ): Promise<string | null | boolean> {
    const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_TEST_KEY}`, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 1,
      timeout: 1000,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripePaymentIntent.amount,
      currency: "chf",
      description: "BlueberryShop payment",
      payment_method_types: ["card"],
    });

    return paymentIntent.client_secret;
  }
}
