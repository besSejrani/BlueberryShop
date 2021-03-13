import { Stream } from "stream";

export namespace ApolloServerFileUploads {
  export type Upload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
  };

  export type UploadedFileResponse = {
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
  };

  export interface IUploader {
    singleFileUploadResolver: ({ file }: { file: Upload }) => Promise<UploadedFileResponse>;
    multipleUploadsResolver: ({ files }: { files: Upload[] }) => Promise<UploadedFileResponse[]>;
  }
}
