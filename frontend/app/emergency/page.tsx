import { Phone, Truck, MapPin } from "lucide-react";
import { hospitals } from "@/lib/mock-data";

export default function EmergencyPage() {
  const nearest = [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm)[0];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="text-center">
        <span className="inline-block bg-critical-light text-critical-dark text-xs font-bold px-3 py-1 rounded-full">
          জরুরি অবস্থা
        </span>
        <h1 className="font-display font-extrabold text-3xl mt-3">এখনই সাহায্য নিন</h1>
        <p className="text-ink/60 mt-2">আপনার অবস্থান অনুযায়ী সবচেয়ে কাছের হাসপাতাল দেখানো হচ্ছে।</p>
      </div>

      <div className="mt-8 rounded-2xl border border-critical/30 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-ink/50 mb-4">
          <MapPin size={15} /> আপনার বর্তমান অবস্থান থেকে
        </div>

        <h2 className="font-display font-bold text-2xl">{nearest.name}</h2>
        <p className="text-ink/60 text-sm mt-1">{nearest.address}</p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-xl bg-clinical-100 text-clinical-900 text-center py-4">
            <p className="text-xs font-semibold">দূরত্ব</p>
            <p className="font-mono font-bold text-2xl mt-1">{nearest.distanceKm} কি.মি.</p>
          </div>
          <div className="rounded-xl bg-vital-light text-vital-dark text-center py-4">
            <p className="text-xs font-semibold">খালি বেড</p>
            <p className="font-mono font-bold text-2xl mt-1">{nearest.availableBeds}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href={`tel:${nearest.phone}`}
            className="focus-ring flex-1 flex items-center justify-center gap-2 bg-critical text-white font-display font-bold text-base px-5 py-4 rounded-xl hover:bg-critical-dark transition-colors"
          >
            <Phone size={20} /> হাসপাতালে কল করুন
          </a>
          <button className="focus-ring flex-1 flex items-center justify-center gap-2 bg-clinical-900 text-white font-display font-bold text-base px-5 py-4 rounded-xl hover:bg-clinical-700 transition-colors">
            <Truck size={20} /> অ্যাম্বুলেন্স রিকোয়েস্ট করুন
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-ink/40 mt-6">
        জাতীয় জরুরি সেবা: ৯৯৯ · সবসময় সরাসরি কল করাই সবচেয়ে দ্রুত পথ
      </p>
    </div>
  );
}
