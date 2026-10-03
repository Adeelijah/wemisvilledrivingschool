import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import { deleteGalleryItem, getGalleryItem, updateGalleryItem } from "@/lib/gallery";
import { deleteGalleryObject } from "@/lib/gallery-storage";

export const runtime = "nodejs";

function isAdmin() {
  return isValidSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}

function validateMutation(request) {
  if (!isAdmin()) return NextResponse.json({ error: "Your admin session has expired. Please sign in again." }, { status: 401 });
  const origin = request.headers.get("origin");
  try {
    if (!origin || new URL(origin).origin !== new URL(request.url).origin) throw new Error("origin mismatch");
  } catch {
    return NextResponse.json({ error: "This request could not be verified. Refresh the page and try again." }, { status: 403 });
  }
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

export async function PATCH(request, { params }) {
  const rejection = validateMutation(request);
  if (rejection) return rejection;
  const body = await request.json().catch(() => null);
  const metadata = validateMetadata(body);
  if (metadata.error) return NextResponse.json({ error: metadata.error }, { status: 400 });
  try {
    const item = await updateGalleryItem(params.id, metadata);
    if (!item) return NextResponse.json({ error: "This gallery image no longer exists." }, { status: 404 });
    return NextResponse.json({ item }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Gallery metadata update failed.");
    return NextResponse.json({ error: "Gallery details could not be saved. Confirm the gallery migration has been applied." }, { status: 503 });
  }
}

export async function DELETE(request, { params }) {
  const rejection = validateMutation(request);
  if (rejection) return rejection;
  try {
    const item = await getGalleryItem(params.id);
    if (!item) return NextResponse.json({ error: "This gallery image no longer exists." }, { status: 404 });

    try {
      await deleteGalleryObject(item.storageKey);
    } catch {
      console.error("Gallery object deletion failed.");
      return NextResponse.json({ error: "The image could not be removed from storage, so its gallery record was kept. Try again." }, { status: 502 });
    }

    try {
      await deleteGalleryItem(item.id);
    } catch {
      console.error("Gallery metadata deletion failed after object deletion.");
      return NextResponse.json({ error: "The image file was removed, but its record could not be deleted. Retry deletion to finish cleanup." }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Gallery deletion failed.");
    return NextResponse.json({ error: "The gallery image could not be deleted. Try again." }, { status: 503 });
  }
}
