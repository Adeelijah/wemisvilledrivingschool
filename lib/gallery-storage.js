import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKET = "gallery";
let client;

function getConfig() {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL_S3, AWS_REGION } = process.env;
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_ENDPOINT_URL_S3 || !AWS_REGION) {
    throw new Error("Gallery storage is not configured.");
  }
  return { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL_S3, AWS_REGION };
}

function getClient() {
  if (client) return client;
  const config = getConfig();
  client = new S3Client({
    region: config.AWS_REGION,
    endpoint: config.AWS_ENDPOINT_URL_S3,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

export function getGalleryImageUrl(storageKey) {
  const { AWS_ENDPOINT_URL_S3 } = getConfig();
  const endpoint = AWS_ENDPOINT_URL_S3.replace(/\/+$/, "");
  const encodedKey = storageKey.split("/").map(encodeURIComponent).join("/");
  return `${endpoint}/${BUCKET}/${encodedKey}`;
}

export async function uploadGalleryObject({ key, body, contentType }) {
  await getClient().send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));
}

export async function deleteGalleryObject(key) {
  await getClient().send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}
