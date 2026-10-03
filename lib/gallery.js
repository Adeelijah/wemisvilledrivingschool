import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

function getSql() {
  if (!sql) throw new Error("Gallery database is not configured.");
  return sql;
}

function toGalleryItem(row) {
  return {
    id: row.id,
    storageKey: row.storage_key,
    imageUrl: row.image_url,
    altText: row.alt_text,
    caption: row.caption || "",
    sortOrder: Number(row.sort_order),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

export async function listGalleryItems() {
  const rows = await getSql()`
    SELECT id, storage_key, image_url, alt_text, caption, sort_order, created_at, updated_at
    FROM gallery_items
    ORDER BY sort_order ASC, created_at ASC;
  `;
  return rows.map(toGalleryItem);
}

export async function createGalleryItem({ id, storageKey, imageUrl, altText, caption, sortOrder }) {
  const rows = await getSql()`
    INSERT INTO gallery_items (id, storage_key, image_url, alt_text, caption, sort_order)
    VALUES (${id}, ${storageKey}, ${imageUrl}, ${altText}, ${caption || null}, ${sortOrder})
    RETURNING id, storage_key, image_url, alt_text, caption, sort_order, created_at, updated_at;
  `;
  return toGalleryItem(rows[0]);
}

export async function updateGalleryItem(id, { altText, caption, sortOrder }) {
  const rows = await getSql()`
    UPDATE gallery_items
    SET alt_text = ${altText}, caption = ${caption || null}, sort_order = ${sortOrder}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, storage_key, image_url, alt_text, caption, sort_order, created_at, updated_at;
  `;
  return rows[0] ? toGalleryItem(rows[0]) : null;
}

export async function getGalleryItem(id) {
  const rows = await getSql()`
    SELECT id, storage_key, image_url, alt_text, caption, sort_order, created_at, updated_at
    FROM gallery_items WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] ? toGalleryItem(rows[0]) : null;
}

export async function deleteGalleryItem(id) {
  const rows = await getSql()`
    DELETE FROM gallery_items WHERE id = ${id}
    RETURNING id;
  `;
  return rows.length > 0;
}
