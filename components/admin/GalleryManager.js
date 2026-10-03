"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryManager() {
  const router = useRouter();
  const uploadFormRef = useRef(null);
  const [items, setItems] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/gallery", { cache: "no-store" });
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gallery images could not be loaded.");
      setItems(data.items || []);
      setDrafts(Object.fromEntries((data.items || []).map((item) => [item.id, {
        altText: item.altText,
        caption: item.caption || "",
        sortOrder: String(item.sortOrder),
      }])));
    } catch (loadError) {
      setError(loadError.message || "Gallery images could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { loadItems(); }, [loadItems]);

  async function uploadImage(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!file) return setError("Choose a JPEG, PNG, or WebP image.");
    if (!altText.trim()) return setError("Alt text is required for accessibility.");
    const form = new FormData();
    form.set("image", file);
    form.set("altText", altText);
    form.set("caption", caption);
    form.set("sortOrder", sortOrder);
    setUploading(true);
    try {
      const response = await fetch("/api/admin/gallery", { method: "POST", body: form });
      const data = await response.json();
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Image upload failed.");
      setFile(null);
      setAltText("");
      setCaption("");
      setSortOrder(String((items.length + 1) * 10));
      uploadFormRef.current?.reset();
      setSuccess("Gallery image uploaded.");
      await loadItems();
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function saveItem(item) {
    setError("");
    setSuccess("");
    const draft = drafts[item.id];
    setSavingId(item.id);
    try {
      const response = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, sortOrder: Number(draft.sortOrder) }),
      });
      const data = await response.json();
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Gallery details could not be saved.");
      setItems((current) => current.map((value) => value.id === item.id ? data.item : value).sort(compareItems));
      setDrafts((current) => ({ ...current, [item.id]: {
        altText: data.item.altText,
        caption: data.item.caption || "",
        sortOrder: String(data.item.sortOrder),
      } }));
      setSuccess("Gallery details saved.");
    } catch (saveError) {
      setError(saveError.message || "Gallery details could not be saved.");
    } finally {
      setSavingId(null);
    }
  }

  async function deleteItem(item) {
    if (!window.confirm("Delete this gallery image? This cannot be undone.")) return;
    setError("");
    setSuccess("");
    setDeletingId(item.id);
    try {
      const response = await fetch(`/api/admin/gallery/${item.id}`, { method: "DELETE" });
      const data = await response.json();
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Gallery image could not be deleted.");
      setItems((current) => current.filter((value) => value.id !== item.id));
      setSuccess("Gallery image deleted.");
    } catch (deleteError) {
      setError(deleteError.message || "Gallery image could not be deleted.");
      await loadItems();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="p-5 md:p-8" aria-labelledby="gallery-manager-heading">
      <div className="mb-6">
        <h2 id="gallery-manager-heading" className="font-display text-xl uppercase tracking-wide text-ink">Gallery Manager</h2>
        <p className="mt-2 text-sm text-slate">Upload JPEG, PNG, or WebP images up to 4 MB. Alt text is required; captions are optional.</p>
      </div>
      {error && <p role="alert" className="mb-4 border border-red-300 bg-white p-3 text-sm text-red-700">{error}</p>}
      {success && <p role="status" className="mb-4 border border-green-300 bg-white p-3 text-sm text-green-800">{success}</p>}

      <form ref={uploadFormRef} onSubmit={uploadImage} className="mb-8 grid gap-4 border-2 border-ink bg-paper p-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-ink">Image</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => setFile(event.target.files?.[0] || null)} className="block w-full text-sm" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">Alt text</span>
          <input value={altText} maxLength={500} required onChange={(event) => setAltText(event.target.value)} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">Caption (optional)</span>
          <input value={caption} maxLength={300} onChange={(event) => setCaption(event.target.value)} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">Display order</span>
          <input type="number" min="0" step="1" required value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
        </label>
        <div className="flex items-end">
          <button type="submit" disabled={uploading} className="rounded-[4px] border-2 border-ink bg-signal px-4 py-2 text-sm font-bold text-ink hover:bg-signalDark disabled:opacity-50">
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
        </div>
      </form>

      <h3 className="mb-3 font-display text-lg uppercase tracking-wide text-ink">Current Gallery</h3>
      {loading ? <p className="text-sm text-slate">Loading gallery images…</p> : items.length === 0 ? (
        <p className="border border-slate/20 bg-paper p-4 text-sm text-slate">No managed images yet. The public Gallery is still showing its original local photos.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => {
            const draft = drafts[item.id] || { altText: item.altText, caption: item.caption || "", sortOrder: String(item.sortOrder) };
            return (
              <li key={item.id} className="grid gap-4 border-2 border-ink bg-paper p-4 sm:grid-cols-[160px_1fr]">
                <img src={item.imageUrl} alt={item.altText} className="aspect-square w-full border border-slate/20 object-cover" />
                <div className="grid content-start gap-3 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate">Alt text</span>
                    <input value={draft.altText} maxLength={500} onChange={(event) => setDrafts((current) => ({ ...current, [item.id]: { ...draft, altText: event.target.value } }))} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate">Caption (optional)</span>
                    <input value={draft.caption} maxLength={300} onChange={(event) => setDrafts((current) => ({ ...current, [item.id]: { ...draft, caption: event.target.value } }))} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate">Display order</span>
                    <input type="number" min="0" step="1" value={draft.sortOrder} onChange={(event) => setDrafts((current) => ({ ...current, [item.id]: { ...draft, sortOrder: event.target.value } }))} className="w-full border-2 border-slate/30 px-3 py-2 text-sm" />
                  </label>
                  <div className="flex flex-wrap gap-2 sm:col-span-2">
                    <button type="button" disabled={savingId !== null || deletingId !== null} onClick={() => saveItem(item)} className="rounded-[4px] bg-road px-4 py-2 text-xs font-bold text-paper hover:bg-roadLight disabled:opacity-50">
                      {savingId === item.id ? "Saving…" : "Save Details"}
                    </button>
                    <button type="button" disabled={savingId !== null || deletingId !== null} onClick={() => deleteItem(item)} className="rounded-[4px] border-2 border-red-700 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-50">
                      {deletingId === item.id ? "Deleting…" : "Delete Image"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function compareItems(a, b) {
  return a.sortOrder - b.sortOrder || new Date(a.createdAt) - new Date(b.createdAt);
}
