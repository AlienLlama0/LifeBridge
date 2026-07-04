import { Bell, Heart, History, User } from "lucide-react";
import { hospitals } from "@/lib/mock-data";
import HospitalCard from "@/components/HospitalCard";

export default function PatientDashboard() {
  const saved = hospitals.slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-clinical-900 text-white flex items-center justify-center font-display font-bold text-lg">
          অ
        </div>
        <div>
          <h1 className="font-display font-bold text-xl">স্বাগতম, আলোক</h1>
          <p className="text-sm text-ink/50">আপনার সংরক্ষিত হাসপাতাল ও সাম্প্রতিক কার্যক্রম</p>
        </div>
      </div>

      <div className="rounded-2xl bg-clinical-100 text-clinical-900 flex items-center gap-3 px-5 py-4 mt-6">
        <Bell size={18} />
        <p className="text-sm font-medium">সিটি জেনারেল হাসপাতালে এখন আইসিইউ খালি আছে — বিস্তারিত দেখুন</p>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-display font-bold text-lg mb-4">
          <Heart size={18} className="text-critical" /> পছন্দের হাসপাতাল
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {saved.map((h) => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-6 mt-10">
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <History size={18} className="text-clinical-500" /> সাম্প্রতিক অনুসন্ধান
          </h2>
          <ul className="text-sm text-ink/70 space-y-2">
            <li className="border-b border-line/70 pb-2">ধানমন্ডি — আইসিইউ</li>
            <li className="border-b border-line/70 pb-2">শাহবাগ — সাধারণ বেড</li>
            <li>গুলশান — ভেন্টিলেটর</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <User size={18} className="text-clinical-500" /> জরুরি যোগাযোগ
          </h2>
          <ul className="text-sm text-ink/70 space-y-2">
            <li className="border-b border-line/70 pb-2">বাবা — ০১৭xxxxxxxx</li>
            <li>পারিবারিক ডাক্তার — ০১৮xxxxxxxx</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
