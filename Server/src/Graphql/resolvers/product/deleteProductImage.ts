// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { ProductModel } from "@Model/Product";

// AWS
import { S3 } from "../../../Class/Aws/S3";

// =================================================================================================

@Resolver()
export class DeleteProductImageResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteProductImage(@Arg("productId") productId: string, @Arg("keyId") keyId: string): Promise<boolean> {
    // Remove S3 link from database
    await ProductModel.findOneAndUpdate({ _id: productId }, { $pull: { productImages: keyId } });

    // Initialize Bucket
    const s3 = await new S3({
      accessKeyId: process.env.AMAZON_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      bucket: process.env.AMAZON_S3_BUCKET,
      signatureVersion: "v4",
      region: "eu-west-3",
    });

    // Remove image from S3
    const data = keyId.split("https://blueberryshop.s3.eu-west-3.amazonaws.com/");
    const key = data[1];
    await s3.deleteProductImage(key);

    return true;
  }
}
