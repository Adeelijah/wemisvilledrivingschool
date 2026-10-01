"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursePricingManager() {
  const router = useRouter();
  const [pricing, setPricing] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [storageReady, setStorageReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingCode, setSavingCode] = useState(null);
  const [error, setError] = useState("");
  const [savedCode, setSavedCode] = useState(null);

  useEffect(() => {
    async function loadPricing() {
      try {
        const response = await fetch("/api/admin/course-prices", { cache: "no-store" });
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!response.ok) throw new Error("Could not load course prices.");

        const data = await response.json();
        setPricing(data.pricing || []);
        setStorageReady(Boolean(data.storageReady));
        setDrafts(Object.fromEntries((data.pricing || []).map((item) => [item.code, String(item.priceNgn)])));
      } catch {
        setError("Course prices could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadPricing();
  }, [router]);

  async function savePrice(course) {
    setError("");
    setSavedCode(null);
    const priceNgn = Number(drafts[course.code]);
    if (!Number.isSafeInteger(priceNgn) || priceNgn <= 0 || priceNgn > 2147483647) {
      setError(`Enter a whole-naira price for ${course.name}.`);
      return;
    }

    setSavingCode(course.code);
    try {
      const response = await fetch("/api/admin/course-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: course.code, priceNgn }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok) throw new Error(data.error || "Could not save this price.");

      setPricing((current) => current.map((item) => item.code === course.code ? data.pricing : item));
      setDrafts((current) => ({ ...current, [course.code]: String(data.pricing.priceNgn) }));
      setSavedCode(course.code);
    } catch (saveError) {
      setError(saveError.message || "Could not save this price.");
    } finally {
      setSavingCode(null);
    }
  }

  return (
    <section className="p-5 md:p-8" aria-labelledby="course-pricing-heading">
      <div className="mb-6">
        <h2 id="course-pricing-heading" className="font-display text-xl uppercase tracking-wide text-ink">Course Pricing</h2>
        <p className="mt-2 text-sm text-slate">Update the public price for each driving course. Enter prices in whole naira.</p>
      </div>

      {!storageReady && !loading && (
        <p role="status" className="mb-5 border-2 border-signal bg-paper p-4 text-sm text-ink">
          The pricing database is not available yet. The website is showing its built-in prices; apply the course pricing migration before editing prices.
        </p>
      )}
      {error && <p role="alert" className="mb-5 text-sm font-medium text-red-700">{error}</p>}

      <div className="border-2 border-ink bg-paper">
        {loading ? (
          <p className="p-5 text-sm text-slate">Loading course prices…</p>
        ) : pricing.length === 0 ? (
          <p className="p-5 text-sm text-slate">No course prices are available.</p>
        ) : (
          <ul className="divide-y divide-slate/20">
            {pricing.map((course) => (
              <li key={course.code} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-plate text-xs tracking-[0.15em] text-road">{course.code}</p>
                  <h3 className="mt-1 font-display text-base uppercase tracking-wide text-ink">{course.name}</h3>
                  <p className="mt-1 text-sm text-slate">
                    Current: ₦{Number(course.priceNgn).toLocaleString("en-NG")}
                    {savedCode === course.code && <span className="ml-2 text-green-700">Saved</span>}
                  </p>
                </div>
                <form
                  className="flex flex-wrap items-end gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    savePrice(course);
                  }}
                >
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate">New price (₦)</span>
                    <input
                      aria-label={`New price for ${course.name}`}
                      type="number"
                      min="1"
                      max="2147483647"
                      step="1"
                      required
                      disabled={!storageReady || savingCode !== null}
                      value={drafts[course.code] ?? ""}
                      onChange={(event) => setDrafts((current) => ({ ...current, [course.code]: event.target.value }))}
                      className="w-40 border-2 border-slate/30 px-3 py-2 text-sm disabled:bg-chalk disabled:text-slate"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!storageReady || savingCode !== null}
                    className="rounded-[4px] border-2 border-ink bg-signal px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-signalDark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingCode === course.code ? "Saving…" : "Save Price"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
