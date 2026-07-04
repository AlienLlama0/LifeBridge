import Link from "next/link";
import { HeartPulse } from "lucide-react";

const links = [
  { href: "/", label: "হোম" },
  { href: "/hospitals", label: "হাসপাতাল খুঁজুন" },
  { href: "/emergency", label: "জরুরি" },
  { href: "/dashboard/patient", label: "আমার ড্যাশবোর্ড" },
];

export default function Navbar() {
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
          <Link href="#" className="hidden sm:inline text-sm font-medium text-ink/70 hover:text-clinical-900">
            লগইন
          </Link>
          <Link
            href="#"
            className="focus-ring text-sm font-semibold bg-clinical-900 text-white px-4 py-2 rounded-lg hover:bg-clinical-700 transition-colors"
          >
            নিবন্ধন
          </Link>
        </div>
      </div>
    </header>
  );
}
