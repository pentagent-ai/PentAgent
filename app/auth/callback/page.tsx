import type { Metadata } from "next";
import { AuthCallbackClient } from "@/components/auth-callback-client";

export const metadata: Metadata = {
  title: "Signing in…",
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <AuthCallbackClient />;
}
