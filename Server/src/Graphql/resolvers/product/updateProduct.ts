// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UpdateProductInput } from "./types/updateProductInput";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// ========================================================================================================

@Resolver()
export class UpdateProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async updateProduct(
    @Arg("productId") productId: string,
    @Arg("input") productInput: UpdateProductInput
  ): Promise<Product | null> {
    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
      return null;
    }

    const update = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { ...product.toObject(), ...productInput },
      { new: true }
    );

    return update;
  }
}

// ========================================================================================================

// // Upload
// import { GraphQLUpload } from "graphql-upload";
// import { createWriteStream } from "fs";
// import { Upload } from "../../types/Upload";

// @Arg("picture", () => GraphQLUpload)

// { createReadStream, filename }: Upload

// return new Promise(async (resolve, reject) =>
//   createReadStream()
//     .pipe(createWriteStream(__dirname + `./images/${filename}`))
//     .on("finish", () => resolve(true))
//     .on("error", () => reject(false))
// );
