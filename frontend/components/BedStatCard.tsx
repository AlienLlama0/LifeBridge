import { occupancyLevel } from "@/lib/types";

interface BedStatCardProps {
  label: string;
  available: number;
  total: number;
  size?: "lg" | "md";
}

const toneStyles = {
  high: "bg-vital-light text-vital-dark",
  low: "bg-caution-light text-caution",
  critical: "bg-critical-light text-critical-dark",
};

const toneText = {
  high: "খালি আছে",
  low: "সীমিত সংখ্যায় খালি",
  critical: "খালি নেই",
};

export default function BedStatCard({ label, available, total, size = "md" }: BedStatCardProps) {
  const level = occupancyLevel(available, total);
  return (
    <div className={`rounded-xl p-4 ${toneStyles[level]} ${size === "lg" ? "text-center" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</p>
      <p className={`font-mono font-bold leading-tight ${size === "lg" ? "text-4xl mt-1" : "text-2xl mt-0.5"}`}>
        {available}
        <span className="text-base font-medium opacity-60">/{total}</span>
      </p>
      <p className="text-xs font-medium mt-1">{toneText[level]}</p>
    </div>
  );
}
