"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["New", "Contacted", "Enrolled", "Not Interested"];
const STATUS_STYLES = {
  New: "bg-signal text-ink",
  Contacted: "bg-road text-paper",
  Enrolled: "bg-green-700 text-paper",
  "Not Interested": "bg-slate/30 text-ink",
};

export default function Dashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/inquiries");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = inquiries.find((i) => i.id === selectedId) || null;

  useEffect(() => {
    setNotesDraft(selected?.notes || "");
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      const matchesStatus = statusFilter === "All" || i.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q || i.name.toLowerCase().includes(q) || i.phone.toLowerCase().includes(q) || i.course.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, search]);

  const newCount = inquiries.filter((i) => i.status === "New").length;

  async function updateStatus(id, status) {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function saveNotes() {
    if (!selected) return;
    setInquiries((prev) => prev.map((i) => (i.id === selected.id ? { ...i, notes: notesDraft } : i)));
    await fetch(`/api/inquiries/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesDraft }),
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-chalk">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-shrink-0 flex-col bg-ink text-paper md:flex">
        <div className="px-5 py-6">
          <span className="inline-flex items-center gap-1 rounded-[4px] border-2 border-signal bg-ink px-2 py-1 font-plate text-xs font-bold tracking-wider text-signal">
            WDS
          </span>
          <p className="mt-3 font-display text-sm uppercase tracking-wide text-chalkLine/70">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 text-sm">
          <div className="rounded px-3 py-2 font-medium text-paper">
            Inquiries {newCount > 0 && <span className="ml-1 text-signal">({newCount} new)</span>}
          </div>
        </nav>
        <div className="border-t border-chalkLine/10 p-3">
          <button onClick={logout} className="w-full rounded px-3 py-2 text-left text-sm text-chalkLine/80 hover:bg-asphalt">
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b-2 border-ink bg-paper px-5 py-4 md:px-8">
          <h1 className="font-display text-xl uppercase tracking-wide text-ink">Inquiries Inbox</h1>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search leads…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hidden border-2 border-slate/30 px-3 py-1.5 text-sm sm:block"
            />
            <a
              href="/api/inquiries/export"
              className="rounded-[4px] border-2 border-ink bg-signal px-3 py-1.5 font-body text-xs font-bold text-ink hover:bg-signalDark"
            >
              Export CSV
            </a>
            <button onClick={logout} className="text-sm text-slate hover:text-ink md:hidden">Log out</button>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-2 border-b border-slate/20 bg-paper px-5 py-3 md:px-8">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border-2 px-3 py-1 text-xs font-medium ${
                statusFilter === s ? "border-ink bg-ink text-paper" : "border-slate/30 text-slate hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          {/* Inquiry list */}
          <div className="border-r border-slate/20">
            {loading ? (
              <p className="p-6 text-sm text-slate">Loading inquiries…</p>
            ) : filtered.length === 0 ? (
              <p className="p-6 text-sm text-slate">No inquiries match this view yet.</p>
            ) : (
              <ul className="divide-y divide-slate/15">
                {filtered.map((i) => (
                  <li key={i.id}>
                    <button
                      onClick={() => setSelectedId(i.id)}
                      className={`flex w-full flex-col gap-1 px-5 py-4 text-left hover:bg-white ${
                        selectedId === i.id ? "bg-white" : i.status === "New" ? "bg-signal/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-body text-sm font-semibold text-ink">{i.name}</span>
                        <span className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[i.status]}`}>
                          {i.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate">{i.phone} · {i.course || "No course selected"}</span>
                      <span className="text-xs text-slate/70">{new Date(i.createdAt).toLocaleString()}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail panel */}
          <div className="p-5 md:p-8">
            {!selected ? (
              <p className="text-sm text-slate">Select a lead from the list to view details.</p>
            ) : (
              <div className="max-w-lg">
                <h2 className="font-display text-lg uppercase tracking-wide text-ink">{selected.name}</h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <Row label="Phone" value={<a className="text-road hover:underline" href={`tel:${selected.phone}`}>{selected.phone}</a>} />
                  <Row label="Email" value={selected.email || "—"} />
                  <Row label="Course" value={selected.course || "—"} />
                  <Row label="Preferred contact" value={selected.preferredContact} />
                  <Row label="Submitted" value={new Date(selected.createdAt).toLocaleString()} />
                  <Row label="Message" value={selected.message || "—"} />
                </dl>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-ink">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                          selected.status === s ? STATUS_STYLES[s] : "bg-white text-slate ring-1 ring-slate/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Notes</span>
                    <textarea
                      rows={4}
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      className="w-full border-2 border-slate/30 px-3 py-2 text-sm"
                      placeholder='e.g. "Called 2pm, will visit school Monday for registration."'
                    />
                  </label>
                  <button
                    onClick={saveNotes}
                    className="mt-2 rounded-[4px] bg-road px-4 py-2 text-xs font-bold text-paper hover:bg-roadLight"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2">
      <dt className="w-32 flex-shrink-0 text-slate">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
