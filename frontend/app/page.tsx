import Link from "next/link";

import { hospitals, cityTotals } from "@/lib/mock-data";
import HospitalCard from "@/components/HospitalCard";
import LiveIndicator from "@/components/LiveIndicator";
import EmergencyButton from "@/components/EmergencyButton";
import HospitalSearch from "@/components/HospitalSearch";

export default function HomePage() {
  const nearby = [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-clinical-950 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <LiveIndicator label="ঢাকা শহরের লাইভ চিত্র" tone="vital" />
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight mt-4 max-w-2xl">
            রোগী পথে থাকতেই জানুন —
            <br />
            কোথায় বেড এখনই খালি আছে
          </h1>
          <p className="text-clinical-100/80 mt-4 max-w-xl">
            প্রতিটি সেকেন্ড গুরুত্বপূর্ণ। হাসপাতাল খুঁজে সময় নষ্ট না করে, লাইফব্রিজে একনজরে দেখুন
            কোন হাসপাতালে বেড, আইসিইউ বা ভেন্টিলেটর খালি আছে — এবং সরাসরি ফোন করুন।
          </p>

          {/* City-wide live counters — signature element */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl">
            <div className="rounded-xl bg-white/10 border border-white/10 p-4">
              <p className="text-xs text-clinical-100/70">হাসপাতাল</p>
              <p className="font-mono font-bold text-2xl sm:text-3xl mt-1">{cityTotals.totalHospitals}</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 p-4">
              <p className="text-xs text-clinical-100/70">মোট বেড</p>
              <p className="font-mono font-bold text-2xl sm:text-3xl mt-1">{cityTotals.totalBeds}</p>
            </div>
            <div className="rounded-xl bg-vital/20 border border-vital/30 p-4">
              <p className="text-xs text-vital">এখন খালি বেড</p>
              <p className="font-mono font-bold text-2xl sm:text-3xl mt-1 text-vital">
                {cityTotals.availableBeds}
              </p>
            </div>
            <div className="rounded-xl bg-critical/20 border border-critical/30 p-4">
              <p className="text-xs text-red-200">খালি আইসিইউ</p>
              <p className="font-mono font-bold text-2xl sm:text-3xl mt-1 text-red-200">
                {cityTotals.icuAvailable}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <HospitalSearch />
          </div>

          <div className="mt-8">
            <EmergencyButton />
          </div>
        </div>
      </section>

      {/* Nearby hospitals */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl sm:text-2xl">আপনার কাছাকাছি হাসপাতাল</h2>
          <Link href="/hospitals" className="text-sm font-semibold text-clinical-900 hover:underline">
            সব দেখুন →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearby.map((h) => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-t border-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-8 text-center">কীভাবে কাজ করে</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "খুঁজুন", desc: "এলাকা বা হাসপাতালের নাম দিয়ে সার্চ করুন, অথবা ফিল্টার ব্যবহার করুন।" },
              { title: "তুলনা করুন", desc: "লাইভ বেড, আইসিইউ, ভেন্টিলেটর ও দূরত্ব একসাথে দেখুন।" },
              { title: "সরাসরি যোগাযোগ", desc: "এক ক্লিকে হাসপাতালে কল করুন অথবা রুট দেখে রওনা দিন।" },
            ].map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-line p-6">
                <p className="font-mono text-clinical-500 font-bold text-sm mb-2">০{i + 1}</p>
                <h3 className="font-display font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-ink/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
