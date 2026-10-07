import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account — Fermor",
  description: "Sign up for a free Fermor account to save and track your financial calculations.",
};

export default function SignUpPage() {
  return <AuthForm initialMode="signup" />;
}
