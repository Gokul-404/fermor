"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  TrendingUp,
  Landmark,
  PieChart,
  HelpCircle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { inr, compact, calculateStockReturns, calculateEMI } from "@/lib/finance";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  card?: {
    type: "spending" | "stock" | "emi" | "overview";
    title: string;
    data?: any;
  };
};

// Distinct Robotic Character Avatar Component
function BotAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "w-12 h-12" : size === "sm" ? "w-7 h-7" : "w-10 h-10";

  return (
    <div className={`relative ${dim} flex items-center justify-center shrink-0`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300"
      >
        {/* Antenna */}
        <line x1="32" y1="12" x2="32" y2="4" stroke="#1d5c4b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="4" r="3.5" fill="#2dd4bf" className="animate-pulse" />

        {/* Ears / Side Bolts */}
        <rect x="6" y="24" width="4" height="14" rx="2" fill="#1d5c4b" />
        <rect x="54" y="24" width="4" height="14" rx="2" fill="#1d5c4b" />

        {/* Head Chassis */}
        <rect
          x="10"
          y="12"
          width="44"
          height="38"
          rx="12"
          fill="#14161a"
          stroke="#1d5c4b"
          strokeWidth="2.5"
        />

        {/* Screen / Visor */}
        <rect x="15" y="19" width="34" height="18" rx="7" fill="#1e293b" />

        {/* Glowing Eyes */}
        <ellipse cx="24" cy="28" rx="3.5" ry="4" fill="#2dd4bf" />
        <circle cx="25.5" cy="26.5" r="1.2" fill="#ffffff" />

        <ellipse cx="40" cy="28" rx="3.5" ry="4" fill="#2dd4bf" />
        <circle cx="41.5" cy="26.5" r="1.2" fill="#ffffff" />

        {/* Friendly Digital Smile / Soundwave */}
        <path
          d="M26 43 Q32 47 38 43"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Little decorative chest badge or collar */}
        <path d="M22 50 L32 58 L42 50" stroke="#1d5c4b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const PRESET_QUERIES = [
  "How much of the spendings did I do in this month?",
  "How much is my stock expected to grow in 12 months?",
  "What would be my EMI for a 20 Lakh loan?",
  "Show my current financial overview",
];

export default function FinancialChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! I'm **Fermor Bot**, your personal financial assistant. Ask me anything about your monthly spending, stock growth forecasts, loan EMIs, or savings goals!",
      timestamp: "Just now",
      card: {
        type: "overview",
        title: "Current Snapshot",
        data: {
          income: "₹65,000",
          spending: "₹32,400",
          investments: "₹4,82,000",
        },
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("fermor:open-chat", open);
    if (location.hash === "#chat") setIsOpen(true);
    return () => window.removeEventListener("fermor:open-chat", open);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateBotReply = (userQuery: string): { text: string; card?: Message["card"] } => {
    const q = userQuery.toLowerCase();

    // 1. Spending & Expenses
    if (
      q.includes("spend") ||
      q.includes("expense") ||
      q.includes("spent") ||
      q.includes("grocery") ||
      q.includes("rent") ||
      q.includes("budget")
    ) {
      return {
        text: `Here is your spending analysis for **this month**:\n\n• **Total Spending:** **₹32,400** out of ₹65,000 income (~49.8% spending rate).\n• **Free Cash Flow:** **₹32,600** remains available for savings & reserves.\n\n### Category Breakdown:\n• 🏠 **Rent:** ₹18,000 (55.6%)\n• 📈 **Monthly SIP:** ₹10,000 (30.9%)\n• 🛒 **Groceries:** ₹2,340 (7.2%)\n• ☕ **Utilities & Misc:** ₹2,060 (6.3%)\n\n✅ *Status:* You are comfortably within the healthy **50/30/20 rule** (50% needs, 30% wants, 20% savings)!`,
        card: {
          type: "spending",
          title: "Monthly Expense Distribution",
          data: {
            total: "₹32,400",
            saved: "₹32,600",
            rent: "₹18,000",
            sip: "₹10,000",
            groceries: "₹2,340",
            misc: "₹2,060",
          },
        },
      };
    }

    // 2. Stock / Investment Growth / Forecasting
    if (
      q.includes("stock") ||
      q.includes("grow") ||
      q.includes("invest") ||
      q.includes("equity") ||
      q.includes("return") ||
      q.includes("cagr") ||
      q.includes("nifty") ||
      q.includes("portfolio")
    ) {
      // Check if user mentions months
      const monthsMatch = q.match(/(\d+)\s*(month|mon|mo)/i);
      const yearsMatch = q.match(/(\d+)\s*(year|yr)/i);
      let months = 12;
      if (monthsMatch) {
        months = parseInt(monthsMatch[1]);
      } else if (yearsMatch) {
        months = parseInt(yearsMatch[1]) * 12;
      }

      // Check if user specified an amount like 50000 or 10000 or 1 lakh
      const amountMatch = q.match(/(\d[\d,]*)\s*(k|thousand|lakh|lac)?/i);
      let principal = 50000;
      if (amountMatch) {
        let rawVal = parseFloat(amountMatch[1].replace(/,/g, ""));
        const unit = (amountMatch[2] || "").toLowerCase();
        if (unit.startsWith("k") || unit.startsWith("thous")) rawVal *= 1000;
        else if (unit.startsWith("l")) rawVal *= 100000;
        if (rawVal > 100) principal = rawVal;
      }

      const yearsFloat = Math.max(0.1, months / 12);
      const stockCalc = calculateStockReturns(principal, 0, 13.5, yearsFloat);

      return {
        text: `Based on quality diversified equity / Nifty 50 historical CAGR of **~13.5% p.a.**:\n\nIf you invest **${inr(principal)}** for **${months} month${months > 1 ? "s" : ""}**:\n• **Estimated Value:** **${inr(stockCalc.totalFv)}** (${compact(stockCalc.totalFv)})\n• **Estimated Gains:** **+${inr(stockCalc.totalReturns)}** (+${stockCalc.roiPct.toFixed(1)}% gain)\n• **Capital Multiplier:** **${stockCalc.multiplier.toFixed(2)}x**\n\n💡 *Note:* Stocks experience short-term volatility, but compounding accelerates dramatically past 3+ years! Scroll up to our **Calculators section** to simulate custom monthly additions (DCA).`,
        card: {
          type: "stock",
          title: `Stock Growth Forecast (${months} mos)`,
          data: {
            invested: inr(principal),
            futureValue: inr(stockCalc.totalFv),
            gain: inr(stockCalc.totalReturns),
            roi: `+${stockCalc.roiPct.toFixed(1)}%`,
            duration: `${months} Months`,
          },
        },
      };
    }

    // 3. EMI / Loans
    if (q.includes("emi") || q.includes("loan") || q.includes("interest") || q.includes("borrow")) {
      const emiCalc = calculateEMI(2000000, 8.75, 15);
      return {
        text: `Here's a breakdown for a typical **₹20,00,000 Loan** at **8.75% interest**:\n\n• **Monthly EMI:** **${inr(emiCalc.monthlyEMI)} / month**\n• **Loan Tenure:** 15 Years (180 installments)\n• **Total Principal:** ₹20,00,000\n• **Total Interest Payable:** **${compact(emiCalc.totalInterest)}** (${inr(emiCalc.totalInterest)})\n• **Total Repayment:** **${compact(emiCalc.totalAmount)}\n\n💡 *Pro-tip:* Adding just **1 extra EMI per year** can cut your loan tenure by up to 3 years and save lakhs in interest! Check the **Loan & EMI Calculator** tab above for personalized rates.`,
        card: {
          type: "emi",
          title: "Sample 20L Loan EMI Breakdown",
          data: {
            emi: inr(emiCalc.monthlyEMI),
            principal: "₹20,00,000",
            interest: compact(emiCalc.totalInterest),
            total: compact(emiCalc.totalAmount),
          },
        },
      };
    }

    // 4. Net worth & Goals
    if (q.includes("net worth") || q.includes("goal") || q.includes("saving") || q.includes("overview")) {
      return {
        text: `Here is your current financial status:\n\n• **Total Net Worth:** **₹8,42,500** (↑ 8.4% this year)\n• **Total Active Investments:** **₹4,82,000**\n• **Monthly Income:** **₹65,000**\n\n### Goal Tracking:\n• 🛡️ **Emergency Fund:** 72% achieved (target 6 months of expenses)\n• ✈️ **Travel Fund:** 45% achieved\n• 🏡 **Home Down Payment:** 28% achieved\n\nYou are on track to complete your emergency fund in 3 months!`,
        card: {
          type: "overview",
          title: "Goal Milestones",
          data: {
            emergency: "72%",
            travel: "45%",
            home: "28%",
          },
        },
      };
    }

    // 5. Kids & Math Education
    if (
      q.includes("kid") ||
      q.includes("child") ||
      q.includes("junior") ||
      q.includes("pocket money") ||
      q.includes("math education") ||
      q.includes("teen") ||
      q.includes("piggy bank")
    ) {
      return {
        text: `Fermor is dedicated to **free financial tools and real-world math education** for young minds across India!\n\nCheck out **Fermor Junior** on this page:\n• 🪙 **Pocket Money Multiplier:** Save ₹50/day and see how compound interest turns it into ₹1.05 Lakhs by age 18!\n• 🎮 **Needs vs. Wants Game:** An interactive quiz teaching kids how to prioritize spending.\n• 🏺 **The 3-Jar Math Rule:** Spend 50%, Save 30%, Grow 20%.\n• 💡 **The Doubling Penny Riddle:** Discover how ₹1 doubled every day reaches ₹53.6 Crores in 30 days!`,
      };
    }

    // Fallback response
    return {
      text: `I can help you analyze your finances! Try asking:\n\n1. *"How much did I spend this month?"*\n2. *"How much will 1 Lakh in stocks grow in 24 months?"*\n3. *"Calculate my EMI for a 15 Lakh home loan"*\n4. *"Tell me about Kids financial math and pocket money"*\n\nYou can also jump to our interactive **[Calculators](#calculators)** or **[Kids Section](#kids)**!`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMessage: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        card: reply.card,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Conversation cleared. What financial questions would you like to explore?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* ================= FLOATING BOT WIDGET TRIGGER (BOTTOM RIGHT) ================= */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {/* Subtle greeting bubble before opening */}
        {!isOpen && showGreeting && (
          <div className="mb-3 max-w-xs">
            <div className="relative rounded-xl border border-line bg-white p-3.5 shadow-sm">
              <button
                type="button"
                onClick={() => setShowGreeting(false)}
                className="absolute right-2 top-2 p-1 text-muted hover:text-ink"
                aria-label="Dismiss greeting"
              >
                <X size={14} />
              </button>
              <div className="flex items-start gap-2.5">
                <span className="flex h-2 w-2 shrink-0 translate-y-1 rounded-full bg-accent" />
                <div>
                  <p className="text-xs font-semibold text-ink">Fermor AI Assistant</p>
                  <p className="mt-0.5 text-xs text-muted">
                    Ask me: <em>&ldquo;How much did I spend this month?&rdquo;</em> or stock projections!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mt-2 text-xs font-semibold text-accent hover:underline"
                  >
                    Chat with bot →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trigger Button with Unique Robotic Figure */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Fermor chatbot" : "Open Fermor chatbot"}
          className="group relative flex items-center gap-2.5 rounded-full border border-line bg-white/95 p-2 pl-3.5 pr-4 shadow-sm transition-all duration-300 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {/* Status Indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-accent" />
          </span>

          {/* Robot Avatar Figure */}
          <div className="relative transition-transform duration-300">
            <BotAvatar size="md" />
          </div>

          <div className="text-left">
            <span className="block text-xs font-semibold text-accent">
              Fermor AI
            </span>
            <span className="block text-xs font-medium text-ink">
              {isOpen ? "Close Chat" : "Ask Bot"}
            </span>
          </div>
        </button>
      </div>

      {/* ================= CHATBOT WINDOW DIALOG ================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Fermor Financial Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[580px] max-h-[85vh] w-[92vw] sm:w-[410px] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BotAvatar size="md" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-ink">Fermor Bot</h3>
                  <span className="rounded bg-accent-soft px-1.5 py-0.2 text-[10px] font-semibold text-accent">
                    AI
                  </span>
                </div>
                <p className="text-xs text-muted">Financial Copilot • Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart chat"
                className="rounded-md p-1.5 text-muted transition-colors hover:bg-paper hover:text-ink"
              >
                <RefreshCw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-muted transition-colors hover:bg-paper hover:text-ink"
                aria-label="Close chat window"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick suggestions banner */}
          <div className="border-b border-line bg-paper px-3 py-2">
            <p className="text-[11px] font-medium text-muted">Suggestions:</p>
            <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSend(preset)}
                  className="shrink-0 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="mt-1 shrink-0">
                    <BotAvatar size="sm" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-ink text-white rounded-tr-sm"
                        : "bg-white border border-line text-ink rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {/* Simple formatting for bold, bullets, headers */}
                    <div className="space-y-1.5 whitespace-pre-line">
                      {msg.text.split("\n").map((line, idx) => {
                        if (line.startsWith("### ")) {
                          return (
                            <h4 key={idx} className="font-semibold text-ink text-xs pt-1">
                              {line.replace("### ", "")}
                            </h4>
                          );
                        }
                        if (line.startsWith("• ")) {
                          return (
                            <p key={idx} className="pl-2">
                              {renderFormattedText(line)}
                            </p>
                          );
                        }
                        return <p key={idx}>{renderFormattedText(line)}</p>;
                      })}
                    </div>
                  </div>

                  {/* Render Visual Financial Cards if attached */}
                  {msg.card && (
                    <div className="rounded-xl border border-line bg-white p-3 shadow-sm text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-line/60">
                        <span className="font-semibold text-ink">{msg.card.title}</span>
                        {msg.card.type === "stock" && <TrendingUp size={14} className="text-accent" />}
                        {msg.card.type === "emi" && <Landmark size={14} className="text-accent" />}
                        {msg.card.type === "spending" && <PieChart size={14} className="text-accent" />}
                      </div>

                      {msg.card.type === "spending" && (
                        <div className="mt-2.5 space-y-1.5">
                          <div className="flex justify-between font-semibold">
                            <span>Total Spent:</span>
                            <span className="text-ink">{msg.card.data.total}</span>
                          </div>
                          <div className="flex justify-between text-muted">
                            <span>Remaining Savings:</span>
                            <span className="text-accent font-medium">{msg.card.data.saved}</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-accent">
                            <div className="h-full bg-ink/75" style={{ width: "55%" }} />
                          </div>
                        </div>
                      )}

                      {msg.card.type === "stock" && (
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          <div className="rounded border border-line p-2">
                            <span className="text-muted text-[10px]">Invested</span>
                            <p className="font-semibold text-ink">{msg.card.data.invested}</p>
                          </div>
                          <div className="rounded border border-line p-2 bg-accent-soft/40">
                            <span className="text-accent text-[10px]">Estimated Value</span>
                            <p className="font-semibold text-accent">{msg.card.data.futureValue}</p>
                          </div>
                        </div>
                      )}

                      {msg.card.type === "emi" && (
                        <div className="mt-2.5 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted">Monthly EMI:</span>
                            <span className="font-semibold text-ink">{msg.card.data.emi}</span>
                          </div>
                          <div className="flex justify-between text-muted">
                            <span>Total Repayment:</span>
                            <span>{msg.card.data.total}</span>
                          </div>
                        </div>
                      )}

                      {msg.card.type === "overview" && (
                        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
                          <div className="p-1 rounded bg-paper">
                            <div className="text-[10px] text-muted">Income</div>
                            <div className="font-semibold">{msg.card.data.income || "₹65k"}</div>
                          </div>
                          <div className="p-1 rounded bg-paper">
                            <div className="text-[10px] text-muted">Spending</div>
                            <div className="font-semibold">{msg.card.data.spending || "₹32.4k"}</div>
                          </div>
                          <div className="p-1 rounded bg-paper">
                            <div className="text-[10px] text-muted">Portfolio</div>
                            <div className="font-semibold">{msg.card.data.investments || "₹4.8L"}</div>
                          </div>
                        </div>
                      )}

                      <a
                        href="#calculators"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium text-accent hover:underline pt-1.5 border-t border-line/60"
                      >
                        Open interactive calculators <ExternalLink size={11} />
                      </a>
                    </div>
                  )}

                  <span className="block text-[10px] text-muted px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted">
                <BotAvatar size="sm" />
                <div className="flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="border-t border-line bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about spendings, stocks, EMI..."
                className="flex-1 rounded-xl border border-line bg-paper px-3.5 py-2 text-xs sm:text-sm text-ink outline-none transition-colors focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white transition-opacity hover:bg-accent disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-muted">
              Powered by Fermor Finance Engine • Numbers reflect sample account data
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Helper to format inline markdown bold (**bold**) and italics (*italics*)
function renderFormattedText(text: string) {
  // Replace **bold**
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-muted">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
