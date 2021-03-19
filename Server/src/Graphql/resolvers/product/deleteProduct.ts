// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { ProductModel } from "../../../Model/Product";

//AWS
import { S3 } from "../../../Class/Aws/S3";

// ========================================================================================================

@Resolver()
export class DeleteProductResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteProduct(@Arg("productId") productId: string): Promise<boolean> {
    const data = await ProductModel.findById(productId);
    const images = data?.productImages;

    const keys = images?.map((key) => {
      const data = key.split("https://blueberryshop.s3.eu-west-3.amazonaws.com/");
      return data[1];
    }) as never;

    // Initialize Bucket
    const s3 = await new S3({
      accessKeyId: process.env.AMAZON_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      bucket: process.env.AMAZON_S3_BUCKET,
      signatureVersion: "v4",
      region: "eu-west-3",
    });

    if (images!.length >= 1) {
      // Remove S3 link from database
      await s3.deleteMultipleProductImages(keys);
    }

    await ProductModel.findOneAndRemove({ _id: productId });

    return true;
  }
}
