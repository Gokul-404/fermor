import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In — Fermor",
  description: "Sign in to access your Fermor financial tools and simulations.",
};

export default function SignInPage() {
  return <AuthForm initialMode="signin" />;
}
