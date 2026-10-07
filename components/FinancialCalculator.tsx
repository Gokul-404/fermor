"use client";

import { useState } from "react";
import Section, { H2, Eyebrow } from "./Section";
import { compact, inr, project, calculateEMI, calculateStockReturns } from "@/lib/finance";
import { TrendingUp, Landmark, Coins, ArrowUpRight, Percent, Calendar } from "lucide-react";

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Number.isFinite(v) ? v : lo));

type FieldProps = {
  id: string;
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  helperText?: string;
};

function Field({
  id,
  label,
  value,
  set,
  min,
  max,
  step,
  suffix,
  prefix,
  helperText,
}: FieldProps) {
  const [text, setText] = useState(String(value));

  // Sync text whenever numeric value updates from sliders/presets
  if (
    parseFloat(text) !== value &&
    !isNaN(value) &&
    (typeof document === "undefined" || document.activeElement?.id !== id) &&
    text !== String(value)
  ) {
    setText(String(value));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setText(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      set(clamp(parsed, min, max));
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(text);
    if (isNaN(parsed) || parsed < min) {
      set(min);
      setText(String(min));
    } else if (parsed > max) {
      set(max);
      setText(String(max));
    } else {
      set(parsed);
      setText(String(parsed));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {helperText && <span className="text-xs text-muted">{helperText}</span>}
      </div>
      <div className="mt-2 flex items-center rounded-md border border-line bg-white px-3 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
        {prefix && <span className="text-sm font-medium text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="h-11 w-full bg-transparent px-2 text-base font-medium text-ink tabular-nums outline-none"
        />
        {suffix && <span className="text-sm font-medium text-muted">{suffix}</span>}
      </div>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const val = Number(e.target.value);
          set(val);
          setText(String(val));
        }}
        className="mt-3 w-full accent-[#1d5c4b] cursor-pointer"
      />
    </div>
  );
}

export default function FinancialCalculator() {
  const [activeTab, setActiveTab] = useState<"stocks" | "emi" | "sip">("stocks");

  // Stocks & Investment state
  const [stockInitial, setStockInitial] = useState(100000);
  const [stockMonthly, setStockMonthly] = useState(10000);
  const [stockYears, setStockYears] = useState(10);
  const [stockRate, setStockRate] = useState(12);

  // EMI state
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [loanRate, setLoanRate] = useState(8.75);
  const [loanYears, setLoanYears] = useState(15);

  // SIP state
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);

  // Computed results
  const stockResult = calculateStockReturns(stockInitial, stockMonthly, stockRate, stockYears);
  const emiResult = calculateEMI(loanAmount, loanRate, loanYears);
  const loanResult = emiResult; // Alias so both loanResult and emiResult work
  const sipResult = project(sipMonthly, sipYears, sipRate);
  const sipShare = sipResult.fv > 0 ? (sipResult.contributions / sipResult.fv) * 100 : 100;

  return (
    <Section id="calculators" className="border-y border-line bg-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <H2>Plan your money with precision.</H2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Simulate your stock market investments, calculate monthly loan EMIs, or forecast your SIP growth with real compounding formulas.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex max-w-full overflow-x-auto rounded-lg border border-line bg-paper p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("stocks")}
            className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
              activeTab === "stocks"
                ? "bg-white text-ink shadow-sm border border-line/60"
                : "text-muted hover:text-ink"
            }`}
          >
            <TrendingUp size={16} className={activeTab === "stocks" ? "text-accent" : ""} />
            Stocks & Growth
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("emi")}
            className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
              activeTab === "emi"
                ? "bg-white text-ink shadow-sm border border-line/60"
                : "text-muted hover:text-ink"
            }`}
          >
            <Landmark size={16} className={activeTab === "emi" ? "text-accent" : ""} />
            Loan & EMI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sip")}
            className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
              activeTab === "sip"
                ? "bg-white text-ink shadow-sm border border-line/60"
                : "text-muted hover:text-ink"
            }`}
          >
            <Coins size={16} className={activeTab === "sip" ? "text-accent" : ""} />
            SIP Planner
          </button>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="mt-10">
        {/* ===================== TAB 1: STOCKS & INVESTMENTS ===================== */}
        {activeTab === "stocks" && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Quick Market Benchmarks
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {[
                    { label: "Nifty 50 (12%)", rate: 12 },
                    { label: "Bluechips (10%)", rate: 10 },
                    { label: "Aggressive Growth (15%)", rate: 15 },
                    { label: "Conservative (8%)", rate: 8 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setStockRate(preset.rate)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        stockRate === preset.rate
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-line bg-paper text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                id="stock-initial"
                label="Lump sum investment"
                value={stockInitial}
                set={setStockInitial}
                min={0}
                max={5000000}
                step={10000}
                prefix="₹"
                helperText="Initial capital invested"
              />

              <Field
                id="stock-monthly"
                label="Recurring monthly addition (DCA)"
                value={stockMonthly}
                set={setStockMonthly}
                min={0}
                max={200000}
                step={1000}
                prefix="₹"
                helperText="Optional monthly top-up"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="stock-years"
                  label="Investment horizon"
                  value={stockYears}
                  set={setStockYears}
                  min={1}
                  max={30}
                  step={1}
                  suffix="yrs"
                />
                <Field
                  id="stock-rate"
                  label="Expected CAGR return"
                  value={stockRate}
                  set={setStockRate}
                  min={1}
                  max={30}
                  step={0.5}
                  suffix="%"
                />
              </div>

              {/* Fast horizon selectors */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted">
                <span>Quick horizon:</span>
                {[3, 5, 10, 15, 20].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setStockYears(yr)}
                    className={`rounded border px-2 py-0.5 text-xs transition-colors ${
                      stockYears === yr
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white hover:border-muted text-ink"
                    }`}
                  >
                    {yr}y
                  </button>
                ))}
              </div>
            </div>

            {/* Results Card */}
            <div
              className="flex flex-col justify-between rounded-card border border-line bg-paper p-6 sm:p-8"
              aria-live="polite"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">Estimated Portfolio Value</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                    <ArrowUpRight size={13} />
                    {stockResult.multiplier.toFixed(1)}x Capital
                  </span>
                </div>
                <p className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums text-ink">
                  {compact(stockResult.totalFv)}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Exact value: {inr(stockResult.totalFv)} after {stockYears} years
                </p>

                {/* Progress bar */}
                <div
                  className="mt-6 flex h-2.5 overflow-hidden rounded-full bg-accent"
                  role="img"
                  aria-label={`Invested capital is ${stockResult.investedShare.toFixed(0)}%, estimated gains are ${stockResult.growthShare.toFixed(0)}%`}
                >
                  <div
                    className="bg-ink/75 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, stockResult.investedShare))}%` }}
                  />
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted">
                      <span className="h-2 w-2 rounded-full bg-ink/70" />
                      Amount Invested
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">
                      {compact(stockResult.totalInvested)}
                    </dd>
                    <span className="text-xs text-muted">{inr(stockResult.totalInvested)}</span>
                  </div>
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Estimated Gains
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-accent">
                      {compact(stockResult.totalReturns)}
                    </dd>
                    <span className="text-xs text-muted">+{stockResult.roiPct.toFixed(0)}% ROI</span>
                  </div>
                </dl>

                <div className="mt-6 space-y-2 rounded-md bg-white/70 p-3.5 text-xs text-muted border border-line/60">
                  <div className="flex justify-between">
                    <span>Initial lump sum</span>
                    <span className="font-medium text-ink tabular-nums">{inr(stockInitial)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly DCA additions</span>
                    <span className="font-medium text-ink tabular-nums">{inr(stockMonthly)} × {stockResult.n} mos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assumed compounding</span>
                    <span className="font-medium text-ink">{stockRate}% p.a. CAGR</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                Note: Stock returns are subject to market volatility and are not guaranteed. CAGR represents smoothed annualized growth.
              </p>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: LOAN & EMI ===================== */}
        {activeTab === "emi" && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Common Loan Scenarios
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {[
                    { label: "Home Loan (8.5% • 20y)", amount: 5000000, rate: 8.5, years: 20 },
                    { label: "Car Loan (9.0% • 5y)", amount: 1200000, rate: 9.0, years: 5 },
                    { label: "Personal Loan (13.5% • 3y)", amount: 500000, rate: 13.5, years: 3 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setLoanAmount(preset.amount);
                        setLoanRate(preset.rate);
                        setLoanYears(preset.years);
                      }}
                      className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                id="loan-amount"
                label="Loan amount (Principal)"
                value={loanAmount}
                set={setLoanAmount}
                min={50000}
                max={20000000}
                step={50000}
                prefix="₹"
                helperText="Total borrowed sum"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="loan-rate"
                  label="Interest rate (p.a.)"
                  value={loanRate}
                  set={setLoanRate}
                  min={1}
                  max={25}
                  step={0.25}
                  suffix="%"
                />
                <Field
                  id="loan-years"
                  label="Loan tenure"
                  value={loanYears}
                  set={setLoanYears}
                  min={1}
                  max={30}
                  step={1}
                  suffix="years"
                />
              </div>

              {/* Quick tenure picker */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted">
                <span>Quick tenure:</span>
                {[3, 5, 10, 15, 20, 25].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setLoanYears(yr)}
                    className={`rounded border px-2 py-0.5 text-xs transition-colors ${
                      loanYears === yr
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white hover:border-muted text-ink"
                    }`}
                  >
                    {yr}y
                  </button>
                ))}
              </div>
            </div>

            {/* Results Card */}
            <div
              className="flex flex-col justify-between rounded-card border border-line bg-paper p-6 sm:p-8"
              aria-live="polite"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">Monthly EMI</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-ink border border-line">
                    {loanResult.n} Installments
                  </span>
                </div>
                <p className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums text-ink">
                  {inr(loanResult.monthlyEMI)}
                  <span className="text-lg font-normal text-muted"> / mo</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  Total outflow: {compact(loanResult.totalAmount)} ({inr(loanResult.totalAmount)})
                </p>

                {/* Progress bar showing Principal vs Interest */}
                <div
                  className="mt-6 flex h-2.5 overflow-hidden rounded-full bg-accent"
                  role="img"
                  aria-label={`Principal is ${loanResult.principalShare.toFixed(0)}%, Interest is ${loanResult.interestShare.toFixed(0)}%`}
                >
                  <div
                    className="bg-ink/75 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, loanResult.principalShare))}%` }}
                  />
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted">
                      <span className="h-2 w-2 rounded-full bg-ink/70" />
                      Principal Amount
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">
                      {compact(loanAmount)}
                    </dd>
                    <span className="text-xs text-muted">{loanResult.principalShare.toFixed(1)}% of total</span>
                  </div>
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Total Interest
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-accent">
                      {compact(emiResult.totalInterest)}
                    </dd>
                    <span className="text-xs text-muted">{loanResult.interestShare.toFixed(1)}% of total</span>
                  </div>
                </dl>

                <div className="mt-6 space-y-2 rounded-md bg-white/70 p-3.5 text-xs text-muted border border-line/60">
                  <div className="flex justify-between">
                    <span>Yearly installment cost</span>
                    <span className="font-medium text-ink tabular-nums">{inr(loanResult.monthlyEMI * 12)} / year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective monthly rate</span>
                    <span className="font-medium text-ink tabular-nums">{(loanRate / 12).toFixed(3)}%</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                Standard reducing balance formula: E = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1). Pre-payments and processing charges are excluded.
              </p>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: SIP PLANNER ===================== */}
        {activeTab === "sip" && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <Field
                id="sip-monthly"
                label="Monthly investment"
                value={sipMonthly}
                set={setSipMonthly}
                min={500}
                max={300000}
                step={500}
                prefix="₹"
                helperText="SIP deposited at end of every month"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="sip-years"
                  label="Time period"
                  value={sipYears}
                  set={setSipYears}
                  min={1}
                  max={30}
                  step={1}
                  suffix="years"
                />
                <Field
                  id="sip-rate"
                  label="Expected annual return"
                  value={sipRate}
                  set={setSipRate}
                  min={1}
                  max={25}
                  step={0.5}
                  suffix="%"
                />
              </div>

              {/* Quick duration buttons */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted">
                <span>Quick horizon:</span>
                {[3, 5, 10, 15, 20].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSipYears(yr)}
                    className={`rounded border px-2 py-0.5 text-xs transition-colors ${
                      sipYears === yr
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white hover:border-muted text-ink"
                    }`}
                  >
                    {yr}y
                  </button>
                ))}
              </div>
            </div>

            {/* Results Card */}
            <div
              className="flex flex-col justify-between rounded-card border border-line bg-paper p-6 sm:p-8"
              aria-live="polite"
            >
              <div>
                <span className="text-sm font-medium text-muted">Potential Future Value</span>
                <p className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums text-ink">
                  {compact(sipResult.fv)}
                </p>
                <p className="mt-1 text-xs text-muted">Exact value: {inr(sipResult.fv)}</p>

                <div
                  className="mt-6 flex h-2.5 overflow-hidden rounded-full bg-accent"
                  role="img"
                  aria-label={`Contributions are ${sipShare.toFixed(0)}% of the total`}
                >
                  <div
                    className="bg-ink/75 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, sipShare))}%` }}
                  />
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted">
                      <span className="h-2 w-2 rounded-full bg-ink/70" />
                      Your Contributions
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">
                      {compact(sipResult.contributions)}
                    </dd>
                    <span className="text-xs text-muted">{inr(sipResult.contributions)}</span>
                  </div>
                  <div className="rounded-lg border border-line bg-white p-3.5">
                    <dt className="flex items-center gap-2 text-xs font-medium text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Potential Growth
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-accent">
                      {compact(sipResult.growth)}
                    </dd>
                    <span className="text-xs text-muted">{inr(sipResult.growth)}</span>
                  </div>
                </dl>

                <p className="mt-6 rounded-md bg-white/70 p-3 text-xs leading-relaxed text-muted border border-line/60">
                  The working: {inr(sipMonthly)} × [((1 + {(sipRate / 12).toFixed(3)}%)<sup>{sipResult.n}</sup> − 1) ÷ {(sipRate / 12).toFixed(3)}%].
                </p>
              </div>

              <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                This is an illustration based on standard compound interest, not a guaranteed return. Real market returns fluctuate over time.
              </p>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
