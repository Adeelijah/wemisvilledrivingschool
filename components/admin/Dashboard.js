"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import GalleryManager from "./GalleryManager";

const STATUSES = ["New", "Contacted", "Enrolled", "Not Interested"];
const DATE_GROUPS = ["All dates", "Today", "This week", "Last month", "Older"];
const SECTIONS = [
  ["overview", "Overview", "▦"],
  ["inquiries", "Inquiries", "◎"],
  ["gallery", "Gallery", "▧"],
];
const STATUS_STYLES = {
  New: "bg-amber-100 text-amber-800 ring-amber-200",
  Contacted: "bg-violet-100 text-violet-800 ring-violet-200",
  Enrolled: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  "Not Interested": "bg-slate-100 text-slate-600 ring-slate-200",
};
const CHART_COLORS = ["#F2C200", "#4C1D75", "#15803d", "#94a3b8"];

export default function Dashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [galleryCount, setGalleryCount] = useState(null);
  const [galleryError, setGalleryError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All dates");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [saving, setSaving] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadError, setLoadError] = useState("");

  async function load() {
    setLoading(true);
    setLoadError("");
    try {
      const [inquiryResponse, galleryResponse] = await Promise.all([
        fetch("/api/inquiries", { cache: "no-store" }),
        fetch("/api/admin/gallery", { cache: "no-store" }),
      ]);
      if (inquiryResponse.status === 401 || galleryResponse.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!inquiryResponse.ok) throw new Error("Inquiries could not be loaded. Please refresh to try again.");
      const inquiryData = await inquiryResponse.json();
      setInquiries(inquiryData.inquiries || []);
      if (galleryResponse.ok) {
        const galleryData = await galleryResponse.json();
        setGalleryCount((galleryData.items || []).length);
        setGalleryError(false);
      } else {
        setGalleryCount(null);
        setGalleryError(true);
      }
    } catch (error) {
      setLoadError(error.message || "Dashboard data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* initial authenticated data load */ }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = inquiries.find((inquiry) => inquiry.id === selectedId) || null;
  useEffect(() => { setNotesDraft(selected?.notes || ""); }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      const matchesStatus = statusFilter === "All" || inquiry.status === statusFilter;
      const matchesSearch = !query || [inquiry.name, inquiry.phone, inquiry.course || ""].some((value) => value.toLowerCase().includes(query));
      const matchesDate = dateFilter === "All dates" || getInquiryDateGroup(inquiry.createdAt) === dateFilter;
      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [inquiries, statusFilter, dateFilter, search]);

  const groupedInquiries = DATE_GROUPS.slice(1).map((group) => ({
    group,
    items: filtered.filter((inquiry) => getInquiryDateGroup(inquiry.createdAt) === group),
  })).filter((section) => section.items.length > 0);

  const newCount = inquiries.filter((inquiry) => inquiry.status === "New").length;
  const enrolledCount = inquiries.filter((inquiry) => inquiry.status === "Enrolled").length;
  const monthlyData = useMemo(() => buildMonthlyData(inquiries), [inquiries]);
  const statusCounts = STATUSES.map((status) => ({ status, count: inquiries.filter((inquiry) => inquiry.status === status).length }));

  async function updateStatus(id, status) {
    const current = inquiries.find((inquiry) => inquiry.id === id);
    if (!current || current.status === status) return;
    setSaving(`status:${id}`);
    setFeedback("");
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Status could not be updated. Please try again.");
      setInquiries((prev) => prev.map((item) => item.id === id ? data.inquiry : item));
      setFeedback("Inquiry status saved.");
    } catch (error) {
      setFeedback(error.message || "Status could not be updated. Please try again.");
    } finally { setSaving(""); }
  }

  async function saveNotes() {
    if (!selected) return;
    setSaving(`notes:${selected.id}`);
    setFeedback("");
    try {
      const response = await fetch(`/api/inquiries/${selected.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: notesDraft }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Notes could not be saved. Please try again.");
      setInquiries((prev) => prev.map((item) => item.id === selected.id ? data.inquiry : item));
      setFeedback("Notes saved.");
    } catch (error) {
      setFeedback(error.message || "Notes could not be saved. Please try again.");
    } finally { setSaving(""); }
  }

  async function deleteInquiry(inquiry) {
    if (!window.confirm(`Delete the inquiry from ${inquiry.name}? This cannot be undone.`)) return;
    setDeleting(true);
    setFeedback("");
    try {
      const response = await fetch(`/api/inquiries/${inquiry.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) return router.push("/admin/login");
      if (!response.ok) throw new Error(data.error || "Inquiry could not be deleted. Please try again.");
      setInquiries((current) => current.filter((item) => item.id !== inquiry.id));
      setSelectedId(null);
      setFeedback("Inquiry deleted.");
    } catch (error) {
      setFeedback(error.message || "Inquiry could not be deleted. Please try again.");
    } finally { setDeleting(false); }
  }

  function selectInquiry(inquiry) {
    setSelectedId(inquiry.id);
    setFeedback("");
    if (window.innerWidth < 1280) {
      window.setTimeout(() => document.getElementById("inquiry-details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const activeTitle = SECTIONS.find(([section]) => section === activeSection)?.[1] || "Overview";
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-ink md:flex">
      <aside className="flex flex-col bg-[#17171b] text-white md:sticky md:top-0 md:h-screen md:w-64 md:flex-shrink-0">
        <div className="flex items-center justify-between px-5 py-4 md:block md:px-6 md:py-7">
          <div className="flex items-center gap-3">
            <img src="/faviconnew.png" alt="Wemisville Driving School" className="h-10 w-10 rounded-xl object-contain" />
            <div><p className="font-display text-lg uppercase leading-tight tracking-wide">Wemisville</p><p className="mt-1 text-xs text-white/50">Driving School · Admin</p></div>
          </div>
          <button onClick={logout} className="rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/10 md:hidden">Log out</button>
        </div>
        <p className="hidden px-6 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 md:block">Workspace</p>
        <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:px-3">
          {SECTIONS.map(([section, label, icon]) => (
            <button key={section} onClick={() => { setActiveSection(section); setFeedback(""); }} aria-current={activeSection === section ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors md:w-full ${activeSection === section ? "bg-white text-ink shadow-sm" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
              <span className={`grid h-7 w-7 place-items-center rounded-lg text-base ${activeSection === section ? "bg-signal text-ink" : "bg-white/10 text-white/80"}`}>{icon}</span>
              <span>{label}</span>
              {section === "inquiries" && newCount > 0 && <span className="ml-auto rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold text-ink">{newCount}</span>}
            </button>
          ))}
        </nav>
        <div className="hidden border-t border-white/10 p-4 md:block"><button onClick={logout} className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/60 hover:bg-white/10 hover:text-white">↪ <span className="ml-2">Log out</span></button></div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex min-h-[76px] items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div><p className="text-xs font-medium text-slate">Wemisville Admin / {activeTitle}</p><h1 className="mt-1 font-display text-xl uppercase tracking-wide md:text-2xl">{activeTitle}</h1></div>
          <div className="flex items-center gap-2">
            {activeSection === "inquiries" && <>
              <label className="hidden sm:block"><span className="sr-only">Search inquiries</span><input type="search" placeholder="Search leads…" value={search} onChange={(event) => setSearch(event.target.value)} className="w-44 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-road md:w-56" /></label>
              <a href="/api/inquiries/export" className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white hover:bg-asphalt2 sm:px-4 sm:text-sm">Export CSV</a>
            </>}
            {activeSection !== "inquiries" && <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate sm:inline">Admin panel</span>}
            <button onClick={logout} className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate hover:bg-slate-50 md:block">Log out</button>
          </div>
        </header>

        {loadError && <div role="alert" className="mx-4 mt-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 md:mx-8"><span>{loadError}</span><button onClick={load} className="font-semibold underline">Retry</button></div>}
        {activeSection === "overview" ? (
          <section className="space-y-6 p-4 md:p-8" aria-labelledby="overview-heading">
            <div className="flex flex-wrap items-end justify-between gap-2"><div><h2 id="overview-heading" className="font-display text-2xl uppercase tracking-wide">Good to see you</h2><p className="mt-1 text-sm text-slate">Here’s what’s happening with your school inquiries.</p></div><span className="text-xs text-slate">Live data from your records</span></div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard title="Total Inquiries" value={loading ? null : inquiries.length} detail="All recorded inquiries" icon="◎" tone="yellow" />
              <KpiCard title="New Inquiries" value={loading ? null : newCount} detail="Awaiting follow-up" icon="✳" tone="purple" />
              <KpiCard title="Enrolled Leads" value={loading ? null : enrolledCount} detail="Marked as enrolled" icon="✓" tone="green" />
              <KpiCard title="Gallery Items" value={galleryCount} detail={galleryError ? "Gallery data unavailable" : "Managed gallery images"} icon="▧" tone="blue" />
            </div>
            {galleryError && <p role="status" className="-mt-3 text-xs text-amber-800">Gallery count is unavailable. Check gallery storage setup; other dashboard metrics remain current.</p>}
            <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <MonthlyChart data={monthlyData} loading={loading} />
              <StatusChart data={statusCounts} loading={loading} total={inquiries.length} />
            </div>
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h3 className="font-semibold">Recent inquiries</h3><p className="mt-0.5 text-xs text-slate">Latest leads submitted to your school</p></div><button onClick={() => setActiveSection("inquiries")} className="text-sm font-semibold text-road hover:underline">View all →</button></div>
              {loading ? <div className="space-y-3 p-5"><div className="h-10 animate-pulse rounded-lg bg-slate-100"/><div className="h-10 animate-pulse rounded-lg bg-slate-100"/></div> : inquiries.length === 0 ? <EmptyState title="No inquiries yet" description="New enrollment requests will appear here when submitted." /> : (
                <div className="divide-y divide-slate-100">{inquiries.slice(0, 5).map((inquiry) => <button key={inquiry.id} onClick={() => { selectInquiry(inquiry); setActiveSection("inquiries"); }} className="flex w-full min-h-14 flex-wrap items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-slate-50"><span className="min-w-0"><span className="block truncate text-sm font-semibold">{inquiry.name}</span><span className="mt-1 block text-xs text-slate">{inquiry.course || "No course selected"} · {formatDate(inquiry.createdAt)}</span></span><StatusBadge status={inquiry.status}/></button>)}</div>
              )}
            </section>
          </section>
        ) : activeSection === "inquiries" ? (
          <section className="p-4 md:p-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-display text-2xl uppercase tracking-wide">Inquiry inbox</h2><p className="mt-1 text-sm text-slate">Review enrollment requests and follow up with prospective students.</p></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate shadow-sm">{filtered.length} {filtered.length === 1 ? "inquiry" : "inquiries"}</span></div>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 sm:hidden"><input type="search" placeholder="Search leads…" value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" /></div>
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1" aria-label="Filter by inquiry status">{["All", ...STATUSES].map((status) => <button key={status} onClick={() => setStatusFilter(status)} aria-pressed={statusFilter === status} className={`min-h-10 shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${statusFilter === status ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate hover:border-slate-400"}`}>{status}{status === "All" ? ` (${inquiries.length})` : ` (${inquiries.filter((item) => item.status === status).length})`}</button>)}</div>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1" aria-label="Group inquiries by date">{DATE_GROUPS.map((group) => <button key={group} onClick={() => setDateFilter(group)} aria-pressed={dateFilter === group} className={`min-h-10 shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${dateFilter === group ? "border border-violet-200 bg-violet-50 text-road" : "border border-slate-200 bg-white text-slate hover:bg-slate-50"}`}>{group}</button>)}</div>
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
              <section id="inquiry-list" aria-label="Inquiry list" className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[minmax(120px,1fr)_minmax(130px,1fr)_100px_130px] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate md:grid"><span>Lead</span><span>Course</span><span>Status</span><span>Received</span></div>
                {loading ? <div className="space-y-3 p-5"><div className="h-16 animate-pulse rounded-xl bg-slate-100"/><div className="h-16 animate-pulse rounded-xl bg-slate-100"/></div> : filtered.length === 0 ? <EmptyState title={inquiries.length ? "No matching inquiries" : "Your inbox is empty"} description={inquiries.length ? "Try another search or date/status group." : "Enrollment requests will show up here."} /> : (
                  <div className="divide-y divide-slate-100">{groupedInquiries.map(({ group, items }) => <section key={group} aria-label={`${group} inquiries`}><h3 className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate md:px-5">{group}<span className="ml-2 font-medium">{items.length}</span></h3><ul className="divide-y divide-slate-100">{items.map((inquiry) => <li key={inquiry.id}><button onClick={() => selectInquiry(inquiry)} aria-pressed={selectedId === inquiry.id} className={`grid min-h-16 w-full gap-2 px-4 py-4 text-left transition-colors hover:bg-slate-50 md:grid-cols-[minmax(120px,1fr)_minmax(130px,1fr)_100px_130px] md:items-center md:gap-3 md:px-5 ${selectedId === inquiry.id ? "bg-violet-50/70" : ""}`}><span className="min-w-0"><span className="block truncate text-sm font-semibold">{inquiry.name}</span><span className="mt-1 block truncate text-xs text-slate">{inquiry.phone}</span></span><span className="truncate text-xs text-slate">{inquiry.course || "No course selected"}</span><span><StatusBadge status={inquiry.status}/></span><span className="text-xs text-slate">{formatDate(inquiry.createdAt)}</span></button></li>)}</ul></section>)}</div>
                )}
              </section>
              <section id="inquiry-details" aria-label="Inquiry details" className="min-h-[260px] scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                {!selected ? <div className="grid min-h-[220px] place-items-center text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl text-slate">◎</span><p className="mt-3 text-sm font-semibold">Select an inquiry</p><p className="mt-1 text-xs text-slate">Lead details and follow-up options appear here.</p></div></div> : <>
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-medium text-slate">Inquiry details</p><h3 className="mt-1 truncate font-display text-xl uppercase tracking-wide">{selected.name}</h3></div><StatusBadge status={selected.status}/></div>
                  <dl className="mt-5 grid gap-4 border-y border-slate-100 py-4 sm:grid-cols-2"><Detail label="Phone" value={<a className="font-medium text-road hover:underline" href={`tel:${selected.phone}`}>{selected.phone}</a>}/><Detail label="Email" value={selected.email || "—"}/><Detail label="Course" value={selected.course || "—"}/><Detail label="Preferred contact" value={selected.preferredContact || "—"}/><Detail label="Submitted" value={formatDate(selected.createdAt)}/><Detail label="Message" value={selected.message || "—"} wide/></dl>
                  <div className="mt-4"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">Update status</p><div className="flex flex-wrap gap-2">{STATUSES.map((status) => <button key={status} disabled={Boolean(saving) || deleting} onClick={() => updateStatus(selected.id, status)} className={`min-h-10 rounded-lg px-3 py-2 text-xs font-semibold ring-1 ring-inset disabled:opacity-50 ${selected.status === status ? STATUS_STYLES[status] : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"}`}>{saving === `status:${selected.id}` && selected.status !== status ? "Saving…" : status}</button>)}</div></div>
                  <div className="mt-5"><label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate">Internal notes</span><textarea rows={4} value={notesDraft} onChange={(event) => setNotesDraft(event.target.value)} className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-road focus:bg-white" placeholder="Add a follow-up note…"/></label><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><span aria-live="polite" className={`text-xs ${feedback && /could not|failed|error/i.test(feedback) ? "text-red-700" : "text-emerald-700"}`}>{feedback}</span><button onClick={saveNotes} disabled={Boolean(saving) || deleting} className="min-h-10 rounded-lg bg-road px-4 py-2.5 text-xs font-semibold text-white hover:bg-roadLight disabled:cursor-not-allowed disabled:opacity-50">{saving === `notes:${selected.id}` ? "Saving…" : "Save notes"}</button></div></div>
                  <div className="mt-5 border-t border-slate-100 pt-4"><button onClick={() => deleteInquiry(selected)} disabled={Boolean(saving) || deleting} className="min-h-10 rounded-lg border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">{deleting ? "Deleting inquiry…" : "Delete inquiry"}</button><p className="mt-2 text-[11px] text-slate">Deleting an inquiry permanently removes this record.</p></div>
                </>}
              </section>
            </div>
          </section>
        ) : <GalleryManager/>}
      </main>
    </div>
  );
}

function KpiCard({ title, value, detail, icon, tone }) {
  const tones = { yellow: "bg-amber-50 text-amber-700", purple: "bg-violet-50 text-violet-700", green: "bg-emerald-50 text-emerald-700", blue: "bg-sky-50 text-sky-700" };
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm font-medium text-slate">{title}</p><span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${tones[tone]}`}>{icon}</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{value === null ? <span className="inline-block h-9 w-16 animate-pulse rounded bg-slate-100 align-middle"/> : Number(value).toLocaleString()}</p><p className="mt-1 text-xs text-slate">{detail}</p></article>;
}

function MonthlyChart({ data, loading }) {
  const max = Math.max(1, ...data.map((item) => item.count));
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"><div className="mb-5"><h3 className="font-semibold">Monthly inquiries</h3><p className="mt-1 text-xs text-slate">Inquiry records by month · last 12 months</p></div>
    {loading ? <div className="h-52 animate-pulse rounded-xl bg-slate-50"/> : !data.some((item) => item.count > 0) ? <EmptyState title="No inquiry history yet" description="Monthly activity will appear as inquiries are recorded."/> : <div className="overflow-x-auto"><div className="flex h-52 min-w-[560px] items-end gap-2 border-b border-slate-100 px-1 sm:gap-3">{data.map((item) => <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] font-medium text-slate">{item.count || ""}</span><div title={`${item.label}: ${item.count} inquiries`} className="w-full max-w-9 rounded-t-md bg-signal transition-all" style={{ height: `${item.count ? Math.max(8, (item.count / max) * 130) : 2}px`, opacity: item.count ? 1 : 0.18 }}/><span className="pb-2 text-[10px] text-slate">{item.short}</span></div>)}</div><p className="mt-3 text-center text-[10px] text-slate">No percentage comparison shown · counts reflect recorded inquiries</p></div>}
  </section>;
}

function StatusChart({ data, loading, total }) {
  const segments = data.map((item, index) => ({ ...item, color: CHART_COLORS[index] }));
  let offset = 0;
  const circumference = 2 * Math.PI * 42;
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"><div className="mb-4"><h3 className="font-semibold">Inquiry status</h3><p className="mt-1 text-xs text-slate">Current distribution across all inquiries</p></div>
    {loading ? <div className="mx-auto h-44 w-44 animate-pulse rounded-full bg-slate-100"/> : total === 0 ? <EmptyState title="Nothing to break down" description="Status distribution appears after the first inquiry."/> : <><div className="relative mx-auto h-44 w-44"><svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`Inquiry statuses for ${total} total records` }><circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="12"/>{segments.filter((item) => item.count > 0).map((item) => { const length = (item.count / total) * circumference; const segment = <circle key={item.status} cx="50" cy="50" r="42" fill="none" stroke={item.color} strokeWidth="12" strokeDasharray={`${length} ${circumference - length}`} strokeDashoffset={-offset}/>; offset += length; return segment; })}</svg><div className="absolute inset-0 grid place-content-center text-center"><span className="text-3xl font-semibold">{total}</span><span className="text-[10px] text-slate">inquiries</span></div></div><ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3">{segments.map((item) => <li key={item.status} className="flex items-center gap-2 text-xs"><span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: item.color }}/><span className="min-w-0 truncate text-slate">{item.status}</span><span className="ml-auto font-semibold">{item.count}</span></li>)}</ul></>}
  </section>;
}

function EmptyState({ title, description }) { return <div className="px-4 py-8 text-center"><p className="text-sm font-semibold text-ink">{title}</p><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate">{description}</p></div>; }
function StatusBadge({ status }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLES[status] || STATUS_STYLES.New}`}>{status || "New"}</span>; }
function Detail({ label, value, wide }) { return <div className={wide ? "sm:col-span-2" : "min-w-0"}><dt className="text-[10px] font-semibold uppercase tracking-wide text-slate">{label}</dt><dd className="mt-1 break-words text-sm text-ink">{value}</dd></div>; }
function formatDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }); }
function getInquiryDateGroup(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Older";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inquiryDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (inquiryDay.getTime() === today.getTime()) return "Today";
  const ageInDays = Math.floor((today.getTime() - inquiryDay.getTime()) / 86400000);
  if (ageInDays > 0 && ageInDays < 7) return "This week";
  if (date.getFullYear() === (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()) && date.getMonth() === (now.getMonth() + 11) % 12) return "Last month";
  return "Older";
}
function buildMonthlyData(inquiries) {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => new Date(now.getFullYear(), now.getMonth() - 11 + index, 1));
  const counts = new Map(months.map((date) => [`${date.getFullYear()}-${date.getMonth()}`, 0]));
  inquiries.forEach((inquiry) => { const date = new Date(inquiry.createdAt); if (!Number.isNaN(date.getTime())) { const key = `${date.getFullYear()}-${date.getMonth()}`; if (counts.has(key)) counts.set(key, counts.get(key) + 1); } });
  return months.map((date) => { const key = `${date.getFullYear()}-${date.getMonth()}`; return { key, label: date.toLocaleString("en", { month: "long", year: "numeric" }), short: date.toLocaleString("en", { month: "short" }), count: counts.get(key) || 0 }; });
}
