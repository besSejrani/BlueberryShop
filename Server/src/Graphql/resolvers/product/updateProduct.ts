// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UpdateProductInput } from "./inputs/updateProductInput";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { Product, ProductModel } from "@Model/Product";

// Stripe
import Stripe from "stripe";

// =================================================================================================

@Resolver()
export class UpdateProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async updateProduct(
    @Arg("productId") productId: string,
    @Arg("input") productInput: UpdateProductInput,
  ): Promise<Product | null> {
    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
      return null;
    }

    // Stripe Initialization
    const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_TEST_KEY}`, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 1,
      timeout: 1000,
    });

    // Stripe Product
    await stripe.products.update(`${product.stripeId!}`, {
      name: productInput.name,
      description: productInput.description,
    });

    const update = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { ...product.toObject(), ...productInput },
      { new: true },
    );

    return update;
  }
}
