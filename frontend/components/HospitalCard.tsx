import Link from "next/link";
import { MapPin, Star, Phone } from "lucide-react";
import { Hospital, occupancyLevel } from "@/lib/types";
import LiveIndicator from "./LiveIndicator";

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  const bedLevel = occupancyLevel(hospital.availableBeds, hospital.totalBeds);
  const icuLevel = occupancyLevel(hospital.icuAvailable, hospital.icuTotal);

  return (
    <Link
      href={`/hospitals/${hospital.id}`}
      className="focus-ring group block rounded-2xl border border-line bg-white p-5 hover:shadow-md hover:border-clinical-500/40 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-clinical-100 text-clinical-900 mb-2">
            {hospital.ownerType}
          </span>
          <h3 className="font-display font-bold text-lg text-ink group-hover:text-clinical-900">
            {hospital.namebn}
          </h3>
          <p className="flex items-center gap-1 text-sm text-ink/60 mt-1">
            <MapPin size={14} /> {hospital.address} · {hospital.distanceKm} কি.মি. দূরে
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-caution shrink-0">
          <Star size={15} fill="currentColor" />
          {hospital.rating}
          <span className="text-ink/40 font-normal">({hospital.reviewCount})</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div
          className={`rounded-lg px-3 py-2 text-center ${
            bedLevel === "high" ? "bg-vital-light" : bedLevel === "low" ? "bg-caution-light" : "bg-critical-light"
          }`}
        >
          <p className="font-mono font-bold text-lg leading-none">{hospital.availableBeds}</p>
          <p className="text-[11px] mt-1 font-medium text-ink/60">খালি বেড</p>
        </div>
        <div
          className={`rounded-lg px-3 py-2 text-center ${
            icuLevel === "high" ? "bg-vital-light" : icuLevel === "low" ? "bg-caution-light" : "bg-critical-light"
          }`}
        >
          <p className="font-mono font-bold text-lg leading-none">{hospital.icuAvailable}</p>
          <p className="text-[11px] mt-1 font-medium text-ink/60">আইসিইউ</p>
        </div>
        <div
          className={`rounded-lg px-3 py-2 text-center ${
            hospital.emergencyOpen ? "bg-vital-light" : "bg-critical-light"
          }`}
        >
          <p className="font-mono font-bold text-lg leading-none">
            {hospital.emergencyOpen ? "খোলা" : "বন্ধ"}
          </p>
          <p className="text-[11px] mt-1 font-medium text-ink/60">জরুরি বিভাগ</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <LiveIndicator minutesAgo={hospital.lastUpdatedMinutesAgo} tone={hospital.isVerifiedLive ? "vital" : "neutral"} />
        <span className="flex items-center gap-1 text-sm font-semibold text-clinical-900">
          <Phone size={14} /> {hospital.phone}
        </span>
      </div>
    </Link>
  );
}
