import { notFound } from "next/navigation";
import { MapPin, Phone, Star, Clock, Droplet, Navigation2 } from "lucide-react";
import { getHospitalById, hospitals } from "@/lib/mock-data";
import BedStatCard from "@/components/BedStatCard";
import LiveIndicator from "@/components/LiveIndicator";

export function generateStaticParams() {
  return hospitals.map((h) => ({ id: h.id }));
}

export default function HospitalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hospital = getHospitalById(params.id);

  if (!hospital) return notFound();

  // TODO: Replace these with hospital.latitude & hospital.longitude
  const latitude = 23.75398;
  const longitude = 90.36549;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-clinical-100 text-clinical-900 mb-2">
            {hospital.ownerType}
          </span>

          <h1 className="font-display font-bold text-2xl sm:text-3xl">
            {hospital.name}
          </h1>

          <p className="flex items-center gap-1 text-ink/60 mt-2 text-sm">
            <MapPin size={15} />
            {hospital.address} · {hospital.distanceKm} কি.মি. দূরে
          </p>

          <p className="flex items-center gap-1 text-caution font-semibold mt-1 text-sm">
            <Star size={15} fill="currentColor" />
            {hospital.rating}
            <span className="text-ink/40 font-normal">
              ({hospital.reviewCount} রিভিউ)
            </span>
          </p>
        </div>

        <LiveIndicator
          minutesAgo={hospital.lastUpdatedMinutesAgo}
          tone={hospital.isVerifiedLive ? "vital" : "neutral"}
        />
      </div>

      {hospital.announcement && (
        <div className="mt-5 rounded-xl bg-caution-light border border-caution/30 px-4 py-3 text-sm font-medium text-caution">
          📢 {hospital.announcement}
        </div>
      )}

      {/* Live availability */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <BedStatCard
          label="সাধারণ বেড"
          available={hospital.availableBeds}
          total={hospital.totalBeds}
          size="lg"
        />
        <BedStatCard
          label="আইসিইউ"
          available={hospital.icuAvailable}
          total={hospital.icuTotal}
          size="lg"
        />
        <BedStatCard
          label="ভেন্টিলেটর"
          available={hospital.ventilatorAvailable}
          total={hospital.ventilatorTotal}
          size="lg"
        />
        <BedStatCard
          label="অক্সিজেন সাপোর্ট"
          available={hospital.oxygenAvailable}
          total={hospital.oxygenTotal}
          size="lg"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={`tel:${hospital.phone}`}
          className="focus-ring flex items-center gap-2 bg-clinical-900 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-clinical-700 transition-colors"
        >
          <Phone size={16} />
          {hospital.phone} এ কল করুন
        </a>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex items-center gap-2 border border-line bg-white font-semibold text-sm px-5 py-3 rounded-xl hover:border-clinical-500 transition-colors"
        >
          <Navigation2 size={16} />
          রুট দেখুন
        </a>

        <button className="focus-ring flex items-center gap-2 bg-vital text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-vital-dark transition-colors">
          বেড রিকোয়েস্ট করুন
        </button>
      </div>

      {/* Google Map */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-line shadow-sm">
        <iframe
          title={hospital.name}
          width="100%"
          height="400"
          loading="lazy"
          className="w-full"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        {/* Departments */}
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display font-bold text-lg mb-3">
            বিভাগসমূহ
          </h2>

          <ul className="space-y-2">
            {hospital.departments.map((d) => (
              <li
                key={d.name}
                className="flex items-center justify-between text-sm border-b border-line/70 pb-2 last:border-0"
              >
                <span className="font-medium">{d.name}</span>
                <span className="text-ink/50">
                  {d.doctorsOnDuty} জন ডাক্তার কর্মরত
                </span>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-1.5 text-sm text-ink/60 mt-4">
            <Clock size={14} />
            ভিজিটিং আওয়ার: {hospital.visitingHours}
          </p>
        </div>

        {/* Blood bank */}
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Droplet size={18} className="text-critical" />
            ব্লাড ব্যাংক
          </h2>

          <div className="grid grid-cols-3 gap-2">
            {hospital.bloodBank.map((b) => (
              <div
                key={b.type}
                className="rounded-lg bg-critical-light text-critical-dark text-center py-3"
              >
                <p className="font-mono font-bold text-lg">{b.type}</p>
                <p className="text-xs mt-0.5">{b.units} ইউনিট</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}