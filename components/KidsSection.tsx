"use client";

import { useState } from "react";
import Section, { H2, Eyebrow } from "./Section";
import { Sparkles, Coins, Trophy, HelpCircle, ArrowRight, Check, X, RotateCcw, Lightbulb, Compass } from "lucide-react";
import { inr, compact } from "@/lib/finance";

// Needs vs Wants Game Items
const GAME_ITEMS = [
  { id: 1, item: "School textbooks & notebooks", icon: "📚", isNeed: true, explanation: "Essential for education and daily learning!" },
  { id: 2, item: "Latest video game skin / gems", icon: "🎮", isNeed: false, explanation: "Fun to have, but purely entertainment (a Want)!" },
  { id: 3, item: "Nutritious lunch & water bottle", icon: "🍱", isNeed: true, explanation: "Fuel for health and energy — essential Need!" },
  { id: 4, item: "Trending branded sneakers (already have good ones)", icon: "👟", isNeed: false, explanation: "Fashion upgrade — a classic Want you can save up for!" },
];

export default function KidsSection() {
  // Pocket Money Simulator State
  const [dailySavings, setDailySavings] = useState(50);
  const [years, setYears] = useState(8); // e.g. from age 10 to age 18

  // Needs vs Wants Game State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Math Calculations for Kids
  const totalDays = years * 365;
  const rawSaved = dailySavings * totalDays;
  const monthlyRate = 0.10 / 12; // 10% annual returns
  const totalMonths = years * 12;
  const monthlyDeposit = dailySavings * 30.42;
  const compoundTotal = monthlyDeposit * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  const magicBonus = Math.max(0, compoundTotal - rawSaved);

  const handleChoice = (isNeedChoice: boolean) => {
    if (selectedChoice !== null) return;
    const isCorrect = isNeedChoice === GAME_ITEMS[currentIdx].isNeed;
    setSelectedChoice(isNeedChoice);
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIdx + 1 < GAME_ITEMS.length) {
        setCurrentIdx((i) => i + 1);
        setSelectedChoice(null);
      } else {
        setGameFinished(true);
      }
    }, 1200);
  };

  const restartGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedChoice(null);
    setGameFinished(false);
  };

  return (
    <Section id="kids" className="border-t border-line bg-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent mb-3">
            <Sparkles size={14} />
            <span>Fermor Junior • Math & Financial Literacy</span>
          </div>
          <H2>Math education that builds a lifetime of smart money habits.</H2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Incorporated in Bengaluru, Fermor is on a mission to democratize financial mathematics. We believe every kid and teen deserves to understand how numbers and money work in the real world.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          <span>Free tools for students, parents & schools across India</span>
        </div>
      </div>

      {/* Main Kids Interactive Grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ================= SIMULATOR: POCKET MONEY MULTIPLIER ================= */}
        <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
                <Coins size={20} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">The Pocket Money Multiplier</h3>
                <p className="text-xs text-muted">See how small daily coins grow with math</p>
              </div>
            </div>
            <span className="rounded-md bg-white border border-line px-2.5 py-1 text-xs font-medium text-ink">
              Interactive
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {/* Daily savings slider */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-ink">Pocket money saved per day</span>
                <span className="font-semibold text-accent tabular-nums">₹{dailySavings} / day</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={10}
                value={dailySavings}
                onChange={(e) => setDailySavings(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#1d5c4b] cursor-pointer"
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-muted">
                <span>₹10 (small snack)</span>
                <span>₹50 (ice cream)</span>
                <span>₹200 (special treat)</span>
              </div>
            </div>

            {/* Time Horizon */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-ink">Saving horizon</span>
                <span className="font-semibold text-ink tabular-nums">{years} Years (until college)</span>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {[3, 5, 8, 12].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYears(y)}
                    className={`rounded-lg border py-1.5 text-xs font-medium transition-colors ${
                      years === y
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-white text-muted hover:border-ink hover:text-ink"
                    }`}
                  >
                    {y} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Piggy Bank Output Card */}
            <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-line/60">
                <span>By the time you turn {10 + years} years old:</span>
                <span className="font-semibold text-accent">10% Compound Growth</span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted block">With Magic Compounding</span>
                  <span className="text-3xl font-bold tracking-tight text-ink tabular-nums">
                    {compact(compoundTotal)}
                  </span>
                  <span className="text-xs text-muted block mt-0.5">{inr(compoundTotal)} total value</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted block">Just in Piggy Bank</span>
                  <span className="text-xl font-semibold text-muted tabular-nums">
                    {compact(rawSaved)}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-accent-soft p-3 text-xs text-accent">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Math Bonus: +{inr(magicBonus)} extra!
                </p>
                <p className="mt-0.5 text-accent/80 text-[11px]">
                  Compound interest gave you {((magicBonus / rawSaved) * 100).toFixed(0)}% more money than just stuffing cash under your mattress!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE GAME: NEEDS VS WANTS ================= */}
        <div className="rounded-card border border-line bg-paper p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white shadow-sm">
                  <Trophy size={18} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">Needs vs. Wants Quiz</h3>
                  <p className="text-xs text-muted">Test your financial decision-making</p>
                </div>
              </div>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">
                Score: {score}/{GAME_ITEMS.length}
              </span>
            </div>

            {!gameFinished ? (
              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-line bg-white p-6 text-center shadow-sm">
                  <span className="text-5xl block mb-2">{GAME_ITEMS[currentIdx].icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Question {currentIdx + 1} of {GAME_ITEMS.length}
                  </span>
                  <h4 className="mt-1 text-lg font-semibold text-ink">
                    {GAME_ITEMS[currentIdx].item}
                  </h4>
                  <p className="mt-2 text-xs text-muted">
                    Would you classify this item as an essential Need or a fun Want?
                  </p>
                </div>

                {/* Choice Buttons */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    disabled={selectedChoice !== null}
                    onClick={() => handleChoice(true)}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 font-medium transition-all ${
                      selectedChoice === true
                        ? GAME_ITEMS[currentIdx].isNeed
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-600"
                        : "border-line bg-white hover:border-ink text-ink shadow-sm hover:scale-[1.02]"
                    }`}
                  >
                    <span>🛡️ Essential Need</span>
                    {selectedChoice === true && (
                      GAME_ITEMS[currentIdx].isNeed ? <Check size={16} /> : <X size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={selectedChoice !== null}
                    onClick={() => handleChoice(false)}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 font-medium transition-all ${
                      selectedChoice === false
                        ? !GAME_ITEMS[currentIdx].isNeed
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-600"
                        : "border-line bg-white hover:border-ink text-ink shadow-sm hover:scale-[1.02]"
                    }`}
                  >
                    <span>🎈 Fun Want</span>
                    {selectedChoice === false && (
                      !GAME_ITEMS[currentIdx].isNeed ? <Check size={16} /> : <X size={16} />
                    )}
                  </button>
                </div>

                {selectedChoice !== null && (
                  <p className="text-center text-xs font-medium text-accent animate-in fade-in">
                    {GAME_ITEMS[currentIdx].explanation}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-line bg-white p-6 text-center shadow-sm">
                <span className="text-4xl block mb-2">🎉</span>
                <h4 className="text-lg font-bold text-ink">Well done!</h4>
                <p className="mt-1 text-sm text-muted">
                  You scored <strong className="text-ink">{score} out of {GAME_ITEMS.length}</strong>! You have a great grasp of Needs vs. Wants.
                </p>
                <button
                  type="button"
                  onClick={restartGame}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <RotateCcw size={14} /> Play Again
                </button>
              </div>
            )}
          </div>

          {/* 3-Jar Concept for Kids */}
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              The 3-Jar Math Rule For Young Minds
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-line bg-white p-2.5">
                <span className="text-base block">🛍️</span>
                <strong className="block text-ink mt-1">Spend Jar (50%)</strong>
                <span className="text-[10px] text-muted">Books & fun</span>
              </div>
              <div className="rounded-lg border border-line bg-white p-2.5">
                <span className="text-base block">🏦</span>
                <strong className="block text-ink mt-1">Save Jar (30%)</strong>
                <span className="text-[10px] text-muted">Big goals</span>
              </div>
              <div className="rounded-lg border border-line bg-white p-2.5">
                <span className="text-base block">🌱</span>
                <strong className="block text-ink mt-1">Grow Jar (20%)</strong>
                <span className="text-[10px] text-accent">Compounds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Math education callout banner */}
      <div className="mt-10 rounded-2xl border border-line bg-paper p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
            <Lightbulb size={22} />
          </span>
          <div>
            <h4 className="text-base font-semibold text-ink">
              The Doubling Penny Riddle: Exponential Math in Action
            </h4>
            <p className="mt-1 text-sm text-muted max-w-2xl leading-relaxed">
              Would you rather take <strong>₹1,00,000 today</strong>, or a <strong>₹1 coin that doubles every single day for 30 days</strong>?
              By Day 30, that ₹1 coin multiplies into over <span className="font-semibold text-accent">₹53.6 Crores</span>! That is the power of compounding math that Fermor teaches every day.
            </p>
          </div>
        </div>

        <a
          href="#calculators"
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-white shadow transition-all hover:bg-accent"
        >
          Try the compound calculators <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
}
