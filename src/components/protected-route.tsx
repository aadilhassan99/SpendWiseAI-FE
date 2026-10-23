"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";
import { LoadingState } from "@/components/ui";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = authStorage.getToken();
  useEffect(() => {
    if (!token) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [pathname, router, token]);
  if (!token) return <LoadingState label="Checking your session…" />;
  return <>{children}</>;
}
