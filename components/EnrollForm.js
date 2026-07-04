"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { courses } from "@/lib/courses";

export default function EnrollForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("course") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: preselected,
    preferredContact: "Call",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your name and phone number.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending your inquiry. Please call or WhatsApp us instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="border-2 border-ink bg-chalk p-8 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wide text-ink">Inquiry received</h2>
        <p className="mt-3 text-slate">
          Thanks, {form.name.split(" ")[0] || "there"} — we've got your details and will reach out by{" "}
          {form.preferredContact.toLowerCase()} shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-ink bg-paper p-6 md:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border-2 border-slate/40 px-3 py-2.5 text-sm focus:border-road"
            placeholder="e.g. Adaeze Okafor"
          />
        </Field>
        <Field label="Phone Number" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full border-2 border-slate/40 px-3 py-2.5 text-sm focus:border-road"
            placeholder="e.g. 0803 xxx xxxx"
          />
        </Field>
        <Field label="Email (optional)">
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full border-2 border-slate/40 px-3 py-2.5 text-sm focus:border-road"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Course of Interest">
          <select
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
            className="w-full border-2 border-slate/40 bg-paper px-3 py-2.5 text-sm focus:border-road"
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </Field>
        <Field label="Preferred Contact Method" className="md:col-span-2">
          <div className="flex gap-4">
            {["Call", "WhatsApp"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 border-2 border-slate/40 px-4 py-2.5 text-sm">
                <input
                  type="radio"
                  name="preferredContact"
                  checked={form.preferredContact === opt}
                  onChange={() => update("preferredContact", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Message (optional)" className="md:col-span-2">
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full border-2 border-slate/40 px-3 py-2.5 text-sm focus:border-road"
            placeholder="Tell us anything that helps — preferred days, prior experience, etc."
          />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-[4px] border-2 border-ink bg-signal px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark disabled:opacity-60 md:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-road">*</span>}
      </span>
      {children}
    </label>
  );
}
