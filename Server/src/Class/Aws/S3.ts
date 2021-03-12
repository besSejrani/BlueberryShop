// Configuration
import "dotenv/config";

// Data
import stream from "stream";

// AWS
import AWS from "aws-sdk";

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
    file: ApolloServerFileUploads.File;
  }): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file;
    const filePath = this.createDestinationFilePath(filename, mimetype, encoding);
    const uploadStream = this.createUploadStream(filePath);

    createReadStream().pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    return { filename, mimetype, encoding, url: result.Location };
  }

  async multipleUploadsResolver({
    files,
  }: {
    files: ApolloServerFileUploads.File[];
  }): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(files.map((f) => this.singleFileUploadResolver({ file: f })));
  }

  // uploadFile = (createReadStream: any, filename: any) => {
  //   // Configuration S3
  //   const s3: any = new AWS.S3({
  //     accessKeyId: process.env.AMAZON_KEY_ID,
  //     secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  //     signatureVersion: "v4",
  //     region: "eu-west-3",
  //   });

  //   const uploadFromStream = (s3: any, filename: any) => {
  //     const pass = new Stream.PassThrough(s3);

  //     // Setting up S3 upload parameters
  //     const params = {
  //       Bucket: process.env.AMAZON_S3_BUCKET,
  //       Key: `${filename}`,
  //       Body: pass,
  //     };

  //     // Uploading files to the bucket
  //     s3.upload(params, function (err: any, data: any) {
  //       if (err) {
  //         throw err;
  //       }

  //       console.log(`File uploaded successfully. ${data.Location}`);
  //     });

  //     return pass;
  //   };

  //   createReadStream().pipe(uploadFromStream(s3, filename));
  // };
}
