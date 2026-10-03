import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import { createGalleryItem, listGalleryItems } from "@/lib/gallery";
import { deleteGalleryObject, getGalleryImageUrl, uploadGalleryObject } from "@/lib/gallery-storage";

export const runtime = "nodejs";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": { extension: "jpg", matches: (bytes) => bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  "image/png": { extension: "png", matches: (bytes) => bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
  "image/webp": { extension: "webp", matches: (bytes) => bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" },
};

function isAdmin() {
  return isValidSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}

function hasValidOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function validateMutation(request) {
  if (!isAdmin()) return NextResponse.json({ error: "Your admin session has expired. Please sign in again." }, { status: 401 });
  if (!hasValidOrigin(request)) return NextResponse.json({ error: "This request could not be verified. Refresh the page and try again." }, { status: 403 });
  return null;
}

function validateMetadata(value) {
  const altText = typeof value?.altText === "string" ? value.altText.trim() : "";
  const caption = typeof value?.caption === "string" ? value.caption.trim() : "";
  const sortOrder = Number(value?.sortOrder);
  if (!altText || altText.length > 500) return { error: "Alt text is required and must be 500 characters or fewer." };
  if (caption.length > 300) return { error: "Caption must be 300 characters or fewer." };
  if (!Number.isSafeInteger(sortOrder) || sortOrder < 0 || sortOrder > 2147483647) return { error: "Display order must be a whole number from 0 or higher." };
  return { altText, caption, sortOrder };
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const items = await listGalleryItems();
    return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Gallery items could not be loaded.");
    return NextResponse.json({ error: "Gallery could not be loaded. Apply the gallery migration and try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request) {
  const rejection = validateMutation(request);
  if (rejection) return rejection;

  let objectKey;
  let stored = false;
  try {
    const form = await request.formData();
    const file = form.get("image");
    const metadata = validateMetadata({
      altText: form.get("altText"),
      caption: form.get("caption"),
      sortOrder: form.get("sortOrder"),
    });
    if (metadata.error) return NextResponse.json({ error: metadata.error }, { status: 400 });
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Choose an image no larger than 4 MB." }, { status: 413 });

    const type = IMAGE_TYPES[file.type];
    if (!type) return NextResponse.json({ error: "Use a JPEG, PNG, or WebP image." }, { status: 415 });
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!type.matches(buffer)) return NextResponse.json({ error: "The image content does not match its JPEG, PNG, or WebP file type." }, { status: 415 });

    objectKey = `${randomUUID()}.${type.extension}`;
    await uploadGalleryObject({ key: objectKey, body: buffer, contentType: file.type });
    stored = true;
    const item = await createGalleryItem({
      id: randomUUID(),
      storageKey: objectKey,
      imageUrl: getGalleryImageUrl(objectKey),
      ...metadata,
    });
    return NextResponse.json({ item }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (stored && objectKey) {
      try {
        await deleteGalleryObject(objectKey);
      } catch {
        console.error("Gallery upload cleanup failed.", { storageKey: objectKey });
      }
    }
    const message = error?.message === "Gallery storage is not configured."
      ? "Gallery storage is not configured. Confirm the Neon gallery bucket credentials in the server environment."
      : "The image could not be uploaded and saved. Check the storage setup and gallery migration, then try again.";
    console.error("Gallery upload failed.");
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
