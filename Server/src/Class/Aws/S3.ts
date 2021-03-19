// Configuration
import "dotenv/config";

// Data
import stream from "stream";
import { v4 as uuid } from "uuid";

// AWS
import AWS from "aws-sdk";

// GraphQL
import { ApolloServerFileUploads } from "./index";

// ========================================================================================================

type S3Type = {
  accessKeyId: string;
  secretAccessKey: string;
  signatureVersion: string;
  region: string;
  bucket: string;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class S3 {
  private s3: AWS.S3;
  public s3Config: S3Type;

  constructor(config: S3Type) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region,
      accessKeyId: config.accessKeyId,
      signatureVersion: config.signatureVersion,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.s3Config = config;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.s3Config.bucket,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  private createDestinationFilePath(fileName: string, _mimetype?: string, _encoding?: string): string {
    return fileName;
  }

  async singleFileUploadResolver({
    file,
  }: {
    file: ApolloServerFileUploads.Upload;
  }): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const extension = filename.split(".")[1];
    const newFileName = `${uuid()}.${extension}`;

    const filePath = this.createDestinationFilePath(newFileName, mimetype, encoding);
    const uploadStream = this.createUploadStream(filePath);

    createReadStream().pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    return await { filename, mimetype, encoding, url: result.Location };
  }

  async multipleUploadsResolver({
    files,
  }: {
    files: ApolloServerFileUploads.Upload[];
  }): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(files.map((f) => this.singleFileUploadResolver({ file: f })));
  }

  async deleteProductImage(key: string) {
    this.s3.deleteObject(
      {
        Bucket: process.env.AMAZON_S3_BUCKET,
        Key: key,
      },
      function (err, _data) {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  async deleteMultipleProductImages(keys = []) {
    const objects = keys.map((key) => ({ Key: key }));

    const params = {
      Bucket: process.env.AMAZON_S3_BUCKET,
      Delete: { Objects: objects },
    };

    this.s3.deleteObjects(params).promise();
  }
}
