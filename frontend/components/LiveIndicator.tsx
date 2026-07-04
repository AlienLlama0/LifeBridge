interface LiveIndicatorProps {
  label?: string;
  tone?: "vital" | "critical" | "neutral";
  minutesAgo?: number;
}

const toneMap = {
  vital: "text-vital",
  critical: "text-critical",
  neutral: "text-clinical-500",
};

export default function LiveIndicator({
  label = "লাইভ",
  tone = "vital",
  minutesAgo,
}: LiveIndicatorProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${toneMap[tone]}`}>
      <svg width="34" height="16" viewBox="0 0 34 16" aria-hidden="true">
        <polyline
          className="ecg-line animate-pulseLine origin-center"
          points="0,8 8,8 11,2 14,14 17,8 34,8"
        />
      </svg>
      <span className="text-xs font-semibold tracking-wide">
        {label}
        {typeof minutesAgo === "number" && (
          <span className="font-normal text-ink/50">
            {" "}
            · {minutesAgo} মিনিট আগে হালনাগাদ
          </span>
        )}
      </span>
    </div>
  );
}
