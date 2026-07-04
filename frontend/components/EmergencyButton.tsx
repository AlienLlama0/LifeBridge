import Link from "next/link";
import { Phone } from "lucide-react";

export default function EmergencyButton({ floating = false }: { floating?: boolean }) {
  if (floating) {
    return (
      <Link
        href="/emergency"
        className="focus-ring fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-critical px-5 py-3.5 text-white font-display font-semibold shadow-lg shadow-critical/30 hover:bg-critical-dark transition-colors animate-beat"
      >
        <Phone size={18} strokeWidth={2.5} />
        জরুরি সাহায্য
      </Link>
    );
  }
  return (
    <Link
      href="/emergency"
      className="focus-ring inline-flex items-center gap-2 rounded-xl bg-critical px-6 py-3 text-white font-display font-semibold hover:bg-critical-dark transition-colors"
    >
      <Phone size={18} strokeWidth={2.5} />
      জরুরি সাহায্য নিন
    </Link>
  );
}
