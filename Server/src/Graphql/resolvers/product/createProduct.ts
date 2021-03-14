// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateProductInput } from "./types/createProductInput";

// //Authorization
// import { authentication } from "../../../Middleware/authentication";
// import authorization from "../../../Middleware/authorization";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// Upload
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { S3 } from "../../../Class/Aws/S3";

// ========================================================================================================

@Resolver()
export class CreateProductResolver {
  @Mutation(() => Product)
  // @UseMiddleware(authentication)
  // @UseMiddleware(authorization(["admin"]))
  async createProduct(
    @Arg("picture", () => [GraphQLUpload]) FileList: Upload[],
    @Arg("input")
    { name, price, description, stock, promotion, status }: CreateProductInput
  ): Promise<any> {
    const product = await ProductModel.findOne({ name });

    if (product) {
      return null;
    }

    const s3 = await new S3({
      accessKeyId: process.env.AMAZON_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      bucket: process.env.AMAZON_S3_BUCKET,
      signatureVersion: "v4",
      region: "eu-west-3",
    });

    const data: string[] = [];

    const images = await s3.multipleUploadsResolver({ files: FileList });
    const urls = await Promise.all(images);
    await urls.forEach((value) => data.push(value.url));

    const newProduct = await new ProductModel({
      name,
      price,
      description,
      stock,
      promotion,
      status,
      productImages: data,
    });
    await newProduct.save();
    return newProduct;
  }
}
