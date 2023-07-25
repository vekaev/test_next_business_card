import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const config = {
  bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
};

const s3Client = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

export const BlobService = {
  uploadFile: async (file: File, fileName: string): Promise<string> => {
    const params = {
      Body: file,
      Key: fileName,
      ACL: "public-read",
      Bucket: config.bucketName,
    };

    return s3Client
      .send(new PutObjectCommand(params))
      .then(
        () =>
          `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${fileName}`
      ).catch(() => {
        throw new Error("Failed to upload file");
      });
  },
};
