// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { CreateProductInput } from "./inputs/createProductInput";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { Product, ProductModel } from "@Model/Product";

// Upload
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { S3 } from "@Class/Aws/S3";

// Stripe
import Stripe from "stripe";

// =================================================================================================

@Resolver()
export class CreateProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async createProduct(
    @Arg("picture", () => [GraphQLUpload]) FileList: Upload[],
    @Arg("input")
    { name, price, description, stock, category, promotion, status }: CreateProductInput,
  ): Promise<any> {
    const product = await ProductModel.findOne({ name });

    if (product) {
      return null;
    }

    // Stripe Initialization
    const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_TEST_KEY}`, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 1,
      timeout: 1000,
    });

    // S3 Initialization
    const s3 = await new S3({
      accessKeyId: process.env.AMAZON_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      bucket: process.env.AMAZON_S3_BUCKET,
      signatureVersion: "v4",
      region: "eu-west-3",
    });

    const data: string[] = [];

    // Upload Images To AWS S3
    const images = await s3.multipleUploadsResolver({ files: FileList });
    const urls = await Promise.all(images);
    await urls.forEach((value) => data.push(value.url));

    // Create Stripe Product
    const productStripe = await stripe.products.create({
      name,
      images: data,
      description,
      type: "good",
    });

    await stripe.skus.create({
      inventory: { type: "finite", quantity: 500 },
      currency: "chf",
      product: productStripe.id,
      price: parseInt(price) * 100,
      image: data[0],
    });

    // Create Stripe Product Price
    const stripePrice = await stripe.prices.create({
      product: productStripe.id,
      unit_amount: parseInt(price) * 100,
      currency: "chf",
    });

    const newProduct = await new ProductModel({
      name,
      price,
      description,
      stock,
      promotion,
      status,
      categories: category,
      productImageUrl: data[0],
      productImages: data,
      stripeId: productStripe.id,
      stripePriceId: stripePrice.id,
    });
    await newProduct.save();

    return newProduct;
  }
}
