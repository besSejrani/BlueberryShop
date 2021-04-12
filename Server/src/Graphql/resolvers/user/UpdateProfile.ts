// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { UpdateProfile } from "./inputs/UpdateProfile";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "../../../Model/User";

// Upload
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { S3 } from "../../../Class/Aws/S3";

// Middleware
import { authentication } from "../../../Middleware/authentication";
// import authorization from "../../../Middleware/authorization";

//=======================================================================

@Resolver()
export class UpdateProfileResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async updateProfile(
    @Arg("updateProfileInput") updateProfileInput: UpdateProfile,
    @Arg("picture", () => GraphQLUpload, { nullable: true }) File: Upload,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return null;
    }

    if (File) {
      const s3 = await new S3({
        accessKeyId: process.env.AMAZON_KEY_ID,
        secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
        bucket: process.env.AMAZON_S3_BUCKET,
        signatureVersion: "v4",
        region: "eu-west-3",
      });

      const data = user.profileImageUrl.split("https://blueberryshop.s3.eu-west-3.amazonaws.com/");
      const key = data[1];

      if (key) {
        await s3.deleteProductImage(key);
      }

      const { url } = await s3.singleFileUpdateResolver({ file: File });

      const update = await UserModel.findOneAndUpdate(
        { _id: context.req.userId },
        { ...user.toObject(), ...updateProfileInput, profileImageUrl: url },
        { new: true }
      );

      return update;
    }

    const update = await UserModel.findOneAndUpdate(
      { _id: context.req.userId },
      { ...user.toObject(), ...updateProfileInput },
      { new: true }
    );

    return update;
  }
}
