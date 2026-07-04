"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartPulse, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ROLE_DASHBOARD, ROLE_LABELS } from "@/lib/auth";

const baseLinks = [
  { href: "/", label: "হোম" },
  { href: "/hospitals", label: "হাসপাতাল খুঁজুন" },
  { href: "/emergency", label: "জরুরি" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const links = user
    ? [...baseLinks, { href: ROLE_DASHBOARD[user.role], label: "আমার ড্যাশবোর্ড" }]
    : [...baseLinks, { href: "/dashboard/patient", label: "আমার ড্যাশবোর্ড" }];

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-clinical-900 text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-900 text-white">
            <HeartPulse size={20} strokeWidth={2.5} />
          </span>
          লাইফব্রিজ
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-ink/70">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-clinical-900 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <span className="hidden sm:flex items-center gap-2 text-sm font-medium text-ink/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clinical-100 text-clinical-900">
                  <User size={14} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-ink">{user.name}</span>
                  <span className="text-[11px] text-ink/50">{ROLE_LABELS[user.role]}</span>
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="focus-ring flex items-center gap-1.5 text-sm font-semibold text-critical hover:text-critical-dark transition-colors"
              >
                <LogOut size={15} />
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline text-sm font-medium text-ink/70 hover:text-clinical-900"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                className="focus-ring text-sm font-semibold bg-clinical-900 text-white px-4 py-2 rounded-lg hover:bg-clinical-700 transition-colors"
              >
                নিবন্ধন
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
