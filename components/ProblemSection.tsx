"use client";

import { useState } from "react";
import Section, { H2, Eyebrow } from "./Section";
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

const bits = [
  ["Income", "₹65,000", "Monthly salary credited"],
  ["Expenses", "₹32,400", "Living costs & bills"],
  ["Investments", "₹4,82,000", "Stocks, SIPs & funds"],
  ["Goals", "3 active", "Emergency, travel, home"],
];

export default function ProblemSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <H2>Your financial life shouldn&apos;t feel this complicated.</H2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Most people have money scattered across multiple bank apps, SIPs, cards, and loans. Fermor turns fragmented data into clear mathematical insights you can immediately act on.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Incorporated in Bengaluru, India • Empowering financial math clarity</span>
          </div>
        </div>

        <div>
          {/* Fragmented numbers grid */}
          <ul className="grid grid-cols-2 gap-3">
            {bits.map(([k, v, desc]) => (
              <li key={k} className="rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{k}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">{v}</p>
                <p className="mt-1 text-xs text-muted">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="my-4 flex items-center justify-center text-muted" aria-hidden>
            <span className="text-sm font-medium">↓</span>
          </div>

          {/* Interactive Clickable Box (Previously static dashed box) */}
          <div className="rounded-card border-2 border-dashed border-accent/40 bg-white transition-all duration-300 hover:border-accent hover:shadow-md">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-card"
              aria-expanded={isOpen}
              aria-controls="meaning-breakdown"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="text-lg font-semibold text-ink">What does it all actually mean?</p>
                  <p className="text-xs text-muted">
                    {isOpen ? "Click to collapse clarity breakdown" : "Click here to reveal the clear mathematical answer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-accent">
                <span>{isOpen ? "Hide" : "Reveal clarity"}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {/* Expandable Explanation Breakdown */}
            {isOpen && (
              <div
                id="meaning-breakdown"
                className="border-t border-line/80 bg-paper/60 p-5 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="rounded-lg bg-white p-4 border border-line mb-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Fermor Health Index
                    </span>
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">
                      84 / 100 • Resilient
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink">
                    You have a healthy surplus of ₹32,600 every month. Here is your synthesized story:
                  </p>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-3.5">
                    <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold text-ink">Net Savings Ratio: 50.2%</p>
                      <p className="text-xs text-muted mt-0.5">
                        You spend ₹32,400 out of ₹65,000. You keep more than half your earnings, well above the Indian national median.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-3.5">
                    <TrendingUp size={18} className="mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold text-ink">Wealth Velocity: 15.4% to Direct Growth</p>
                      <p className="text-xs text-muted mt-0.5">
                        ₹10,000/mo compounds in SIPs. In 10 years at 12% CAGR, this alone grows into ₹23.2 Lakhs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-3.5">
                    <ShieldCheck size={18} className="mt-0.5 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold text-ink">Emergency Cushion: 6.2 Months</p>
                      <p className="text-xs text-muted mt-0.5">
                        Your liquid investments cover over 6 months of mandatory living costs, shielding you from debt traps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-4">
                  <p className="text-xs text-muted">
                    No guesswork. Fermor translates scattered records into actionable math.
                  </p>
                  <a
                    href="#calculators"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    Simulate your numbers in Calculators <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
