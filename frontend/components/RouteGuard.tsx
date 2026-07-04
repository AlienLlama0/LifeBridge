"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/auth";
import { HeartPulse } from "lucide-react";

export default function RouteGuard({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=/dashboard/${role}`);
      return;
    }
    if (user.role !== role) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [loading, user, role, router]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 flex flex-col items-center text-center gap-3 text-ink/50">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-clinical-900 text-white animate-beat">
          <HeartPulse size={18} strokeWidth={2.5} />
        </span>
        <p className="text-sm">যাচাই করা হচ্ছে…</p>
      </div>
    );
  }

  return <>{children}</>;
}
