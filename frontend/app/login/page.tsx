"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeartPulse, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ROLE_DASHBOARD } from "@/lib/auth";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = login(email, password);

    if (!result.ok || !result.user) {
      setError(result.error || "লগইন ব্যর্থ হয়েছে।");
      setSubmitting(false);
      return;
    }

    router.push(next || ROLE_DASHBOARD[result.user.role]);
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinical-900 text-white">
          <HeartPulse size={24} strokeWidth={2.5} />
        </span>
        <h1 className="font-display font-bold text-2xl text-clinical-900">লগইন করুন</h1>
        <p className="text-sm text-ink/60">
          রোগী, হাসপাতাল স্টাফ বা অ্যাডমিন — আপনার অ্যাকাউন্ট দিয়ে প্রবেশ করুন
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-line bg-white p-6 sm:p-8 flex flex-col gap-5"
      >
        {error && (
          <div className="rounded-lg bg-critical-light text-critical-dark text-sm font-medium px-4 py-3">
            {error}
          </div>
        )}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
          ইমেইল
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
          পাসওয়ার্ড
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-10 py-2.5 text-sm text-ink outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
              aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-1 w-full rounded-lg bg-clinical-900 text-white font-semibold text-sm py-2.5 hover:bg-clinical-700 transition-colors disabled:opacity-60"
        >
          {submitting ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>

        <div className="flex items-start gap-2 rounded-lg bg-clinical-100 text-clinical-900 px-3 py-2.5 text-xs">
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          <span>
            অ্যাডমিন ডেমো: <span className="font-mono">admin@lifebridge.com</span> /{" "}
            <span className="font-mono">admin1234</span>
          </span>
        </div>
      </form>

      <p className="text-center text-sm text-ink/60 mt-6">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/register" className="font-semibold text-clinical-900 hover:underline">
          নিবন্ধন করুন
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
