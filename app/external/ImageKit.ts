import ImageKitSDK from "imagekit";
import { UploadOptions, UploadResponse } from "imagekit/dist/libs/interfaces";
import { BirdCreationQuery } from "../entities/BirdCreationQuery";
import { isObject } from "../utils/isObject";

interface ImagekitUploadResponse {
  fileType: string;
  height: number;
  url: string;
  width: number;
}

export class ImageKit {
  private readonly imageKitSDK: ImageKitSDK;

  constructor() {
    this.imageKitSDK = new ImageKitSDK({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
    });
  }

  async upload(birdCreationQuery: BirdCreationQuery) {
    const uploadOptions: UploadOptions[] =
      this.composeImagekitUploadOptions(birdCreationQuery);

    const uploadResponsePromises: Promise<UploadResponse>[] = uploadOptions.map(
      async (uploadOption: UploadOptions): Promise<UploadResponse> => {
        return this.imageKitSDK.upload(uploadOption);
      }
    );

    let uploadResponses: UploadResponse[] = [];

    uploadResponses = await Promise.all(uploadResponsePromises);

    const areUploadResponsesValid: boolean = uploadResponses.every(
      (uploadResponse: UploadResponse) =>
        this.imagekitUploadResponseTypeGuard(uploadResponse)
    );

    if (areUploadResponsesValid) {
      const updatedBirdCreationQuery: BirdCreationQuery = {
        ...birdCreationQuery,
      };

      updatedBirdCreationQuery.images = uploadResponses.map(
        (uploadResponse: UploadResponse) => uploadResponse.url
      );

      return updatedBirdCreationQuery;
    } else {
      throw new Error("Imagekit response is not valid");
    }
  }

  private composeImagekitUploadOptions(
    birdCreationQuery: BirdCreationQuery
  ): UploadOptions[] {
    if (!birdCreationQuery.images) {
      throw new Error("BirdCreationQuery has no images");
    }

    const uploadOptions: UploadOptions[] = [];

    let fileName: string = "no_ring";
    let folder: string = process.env.NODE_ENV || "folder";

    if (birdCreationQuery.ringId) {
      fileName = birdCreationQuery.ringId;
      folder += `/${birdCreationQuery.ringId}`;
    }

    for (const image of birdCreationQuery.images) {
      const uploadOption: UploadOptions = {
        file: image,
        fileName: fileName,
        folder: folder,
      };

      uploadOptions.push(uploadOption);
    }

    return uploadOptions;
  }

  private imagekitUploadResponseTypeGuard(
    value: unknown
  ): value is ImagekitUploadResponse {
    let isImagekitUploadResponse: boolean = false;

    if (isObject(value)) {
      isImagekitUploadResponse =
        "url" in value &&
        typeof value.url === "string" &&
        "fileType" in value &&
        typeof value.fileType === "string" &&
        value.fileType === "image" &&
        "width" in value &&
        typeof value.width === "number" &&
        "height" in value &&
        typeof value.height === "number";
    }

    return isImagekitUploadResponse;
  }
}
