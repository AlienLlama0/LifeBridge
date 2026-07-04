"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HeartPulse,
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ROLE_DASHBOARD, UserRole } from "@/lib/auth";

type RegisterableRole = Exclude<UserRole, "admin">;

const ROLE_TABS: { role: RegisterableRole; label: string; icon: typeof User }[] = [
  { role: "patient", label: "সাধারণ মানুষ", icon: User },
  { role: "hospital", label: "হাসপাতাল স্টাফ", icon: Building2 },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState<RegisterableRole>("patient");
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setSubmitting(true);
    const result = register({
      name,
      email,
      phone,
      password,
      role,
      hospitalName: role === "hospital" ? hospitalName : undefined,
      address: role === "hospital" ? address : undefined,
    });

    if (!result.ok || !result.user) {
      setError(result.error || "নিবন্ধন ব্যর্থ হয়েছে।");
      setSubmitting(false);
      return;
    }

    router.push(ROLE_DASHBOARD[result.user.role]);
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinical-900 text-white">
          <HeartPulse size={24} strokeWidth={2.5} />
        </span>
        <h1 className="font-display font-bold text-2xl text-clinical-900">নিবন্ধন করুন</h1>
        <p className="text-sm text-ink/60">লাইফব্রিজে যুক্ত হোন — কয়েক সেকেন্ডেই</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        {ROLE_TABS.map(({ role: r, label, icon: Icon }) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
              role === r
                ? "border-clinical-900 bg-clinical-900 text-white"
                : "border-line bg-white text-ink/70 hover:border-clinical-500"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
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
          {role === "hospital" ? "যোগাযোগকারীর নাম" : "পূর্ণ নাম"}
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
            />
          </div>
        </label>

        {role === "hospital" && (
          <>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
              হাসপাতালের নাম
              <div className="relative">
                <Building2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
                />
                <input
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="যেমন: সিটি জেনারেল হাসপাতাল"
                  className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
              ঠিকানা
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
                />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="হাসপাতালের ঠিকানা"
                  className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
                />
              </div>
            </label>
          </>
        )}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
          ইমেইল
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
          মোবাইল নম্বর
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="অন্তত ৬ অক্ষর"
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

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink/80">
          পাসওয়ার্ড নিশ্চিত করুন
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              className="focus-ring w-full rounded-lg border border-line bg-canvas pl-10 pr-3 py-2.5 text-sm text-ink outline-none"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-1 w-full rounded-lg bg-clinical-900 text-white font-semibold text-sm py-2.5 hover:bg-clinical-700 transition-colors disabled:opacity-60"
        >
          {submitting ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}
        </button>

        {role === "hospital" && (
          <div className="flex items-start gap-2 rounded-lg bg-caution-light text-caution px-3 py-2.5 text-xs">
            <Info size={14} className="mt-0.5 shrink-0" />
            <span>
              হাসপাতাল অ্যাকাউন্ট নিবন্ধনের পর লাইফব্রিজ টিম যাচাই করে অনুমোদন দেবে।
            </span>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-lg bg-clinical-100 text-clinical-900 px-3 py-2.5 text-xs">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>অ্যাডমিন অ্যাকাউন্ট শুধুমাত্র লাইফব্রিজ টিম কর্তৃক তৈরি করা হয়।</span>
        </div>
      </form>

      <p className="text-center text-sm text-ink/60 mt-6">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href="/login" className="font-semibold text-clinical-900 hover:underline">
          লগইন করুন
        </Link>
      </p>
    </div>
  );
}
