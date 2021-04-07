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
    @Arg("picture", () => [GraphQLUpload]) FileList: Upload[],
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
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

    if (data.length < 1) {
      const update = await UserModel.findOneAndUpdate(
        { _id: context.req.userId },
        { ...user.toObject(), ...updateProfileInput },
        { new: true }
      );

      return update;
    } else {
      const update = await UserModel.findOneAndUpdate(
        { _id: context.req.userId },
        { ...user.toObject(), ...updateProfileInput, profileImageUrl: data[0] },
        { new: true }
      );

      return update;
    }
  }
}
