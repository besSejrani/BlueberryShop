// GraphQL
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from "type-graphql";
import { StripePaymentIntentInput } from "./inputs/stripePaymentIntentInput";
import { MyContext } from "src/Graphql/types/MyContext";

// Database
import { UserModel } from "@Model/user/User";

// Stripe
import Stripe from "stripe";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class CreateStripePaymentIntent {
  @Mutation(() => String, { nullable: true })
  @UseMiddleware(authentication)
  async createStripePaymentIntent(
    @Arg("stripePaymentIntent") stripePaymentIntentInput: StripePaymentIntentInput,
    @Ctx() context: MyContext,
  ): Promise<string | null | boolean> {
    if (!context.req.userId) {
      return true;
    }

    const user = await UserModel.findOne({ _id: context.req.userId });

    const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_TEST_KEY}`, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 1,
      timeout: 1000,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripePaymentIntentInput.amount,
      currency: "chf",
      description: "BlueberryShop payment",
      payment_method_types: ["card"],
      shipping: {
        name: `${user?.username}`,
        address: {
          country: stripePaymentIntentInput.shippingCountry,
          line1: stripePaymentIntentInput.shippingAddress,
          city: stripePaymentIntentInput.shippingCity,
          postal_code: stripePaymentIntentInput.shippingZip,
        },
      },
    });

    return paymentIntent.client_secret;
  }
}
