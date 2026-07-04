"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border-2 border-signal bg-asphalt p-8">
        <span className="inline-flex items-center gap-1 rounded-[4px] border-2 border-ink bg-signal px-2 py-1 font-plate text-sm font-bold tracking-wider text-ink">
          WDS
        </span>
        <h1 className="mt-4 font-display text-2xl uppercase tracking-wide text-paper">Admin Login</h1>
        <p className="mt-1 text-sm text-chalkLine/70">Wemisville staff dashboard</p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium text-chalkLine">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-chalkLine/30 bg-paper px-3 py-2.5 text-sm text-ink"
          />
        </label>

        {error && <p role="alert" className="mt-3 text-sm font-medium text-signal">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-[4px] bg-signal px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
