"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import Button from "./Button";

type Mode = "signup" | "signin";

export default function AuthForm({ initialMode = "signup" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitted(true);
  };

  const handleFillDemo = () => {
    setName("Arjun Kumar");
    setEmail("arjun@example.com");
    setPassword("Fermor2026!");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] hover:text-accent transition-colors">
            FERMOR
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-4xl grid gap-8 lg:grid-cols-2 items-center">
          {/* Left Column: Brand Context & Value Prop */}
          <div className="hidden lg:block space-y-6 pr-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1 text-xs font-semibold text-accent">
              <Sparkles size={14} />
              <span>Independent Financial Math</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
              {mode === "signup"
                ? "Start understanding your money with complete clarity."
                : "Welcome back to your financial control center."}
            </h1>

            <p className="text-base text-muted leading-relaxed">
              Fermor is built on mathematical transparency. No hidden commissions, no unsolicited sales calls, and no opaque financial formulas.
            </p>

            <ul className="space-y-4 pt-2">
              {[
                "100% Client-side mathematical calculations",
                "Instant access to SIP, EMI, and Stock returns models",
                "Save your calculation scenarios across sessions",
                "Fermor Junior math and educational literacy tools",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink font-medium">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent mt-0.5">
                    <Check size={12} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-line flex items-center gap-3 text-xs text-muted">
              <ShieldCheck size={18} className="text-accent" />
              <span>Incorporated in Bengaluru, India • Privacy-first architecture</span>
            </div>
          </div>

          {/* Right Column: Interactive Card Form */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">
                    {mode === "signup" ? "Account created successfully!" : "Signed in successfully!"}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Welcome to Fermor. You have full access to all financial planning tools and saved scenarios.
                  </p>
                </div>

                <div className="rounded-lg border border-line bg-paper p-4 text-left text-xs space-y-1.5">
                  <p className="text-muted">
                    Logged in as: <strong className="text-ink">{email}</strong>
                  </p>
                  <p className="text-muted">
                    Status: <span className="font-semibold text-accent">Active Demo Session</span>
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <Button href="/#calculators">
                    Go to Calculators
                  </Button>
                  <Button href="/" variant="ghost">
                    Return to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {/* Mode Selector Tabs */}
                <div className="flex border-b border-line mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                    }}
                    className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 ${
                      mode === "signup"
                        ? "border-accent text-accent"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError(null);
                    }}
                    className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 ${
                      mode === "signin"
                        ? "border-accent text-accent"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    Sign In
                  </button>
                </div>

                {/* Form Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-ink">
                    {mode === "signup" ? "Get started with Fermor" : "Sign in to your account"}
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    {mode === "signup"
                      ? "Free forever. No credit card required."
                      : "Access your financial goals and simulations."}
                  </p>
                </div>

                {error && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label htmlFor="auth-name" className="block text-xs font-medium text-ink mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arjun Kumar"
                        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-white focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="auth-email" className="block text-xs font-medium text-ink mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="auth-password" className="text-xs font-medium text-ink">
                        Password
                      </label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          onClick={() => alert("Password reset link simulated for demo.")}
                          className="text-xs text-muted hover:text-accent transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 pr-10 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {mode === "signup" && (
                    <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-4 w-4 rounded border-line accent-[#1d5c4b]"
                      />
                      <span className="text-xs text-muted leading-relaxed">
                        I agree to Fermor&apos;s{" "}
                        <Link href="/terms" className="text-accent underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-accent underline">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {mode === "signup" ? "Create Free Account" : "Sign In to Fermor"}
                  </button>
                </form>

                {/* Quick Demo Autofill Helper */}
                <div className="mt-5 pt-4 border-t border-line text-center">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                  >
                    <Sparkles size={13} className="text-accent" />
                    <span>Click here to auto-fill sample credentials</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-6 text-center text-xs text-muted">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Fermor. Plain mathematics without unnecessary complexity.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
