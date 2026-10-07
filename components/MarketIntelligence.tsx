"use client";

import { useState } from "react";
import Section, { H2, Eyebrow } from "./Section";
import { ArrowRight, ChevronRight, X } from "lucide-react";

type Category = "all" | "technology" | "sports" | "government" | "geopolitics";

type MarketEvent = {
  id: string;
  category: "technology" | "sports" | "government" | "geopolitics";
  categoryLabel: string;
  timestamp: string;
  title: string;
  whyItMatters: string;
  potentialImpact: string[];
  analysis?: {
    chain: string[];
    takeaway: string;
  };
};

const MARKET_EVENTS: MarketEvent[] = [
  // Technology
  {
    id: "tech-1",
    category: "technology",
    categoryLabel: "Technology",
    timestamp: "2h ago",
    title: "New policy revises customs tariffs on semiconductor fabrication equipment",
    whyItMatters: "Lower input duties could reduce capital expenditure costs for domestic foundries and speed up hardware manufacturing timelines.",
    potentialImpact: ["Technology", "Electronics Manufacturing", "Capital Goods"],
    analysis: {
      chain: [
        "Government lowers import duty on precision chipmaking equipment",
        "Capex costs drop for domestic semiconductor plants",
        "Suppliers and electronics assembly firms experience reduced margin pressure"
      ],
      takeaway: "Hardware manufacturers may benefit from lower production expenses over medium-term fiscal cycles."
    }
  },
  {
    id: "tech-2",
    category: "technology",
    categoryLabel: "Technology",
    timestamp: "5h ago",
    title: "Global cloud providers announce increased capex allocations for enterprise AI infrastructure",
    whyItMatters: "Sustained data center expansion drives long-term demand for power distribution, cooling hardware, and server components.",
    potentialImpact: ["Data Centers", "Power & Utilities", "Hardware"],
    analysis: {
      chain: [
        "Hyperscalers increase multi-year infrastructure budgets",
        "Heavy electricity and specialized thermal management demand rises",
        "Utility providers and cooling equipment vendors see sustained order books"
      ],
      takeaway: "The economic ripple effects of compute expansion extend far beyond software companies to physical infrastructure."
    }
  },
  {
    id: "tech-3",
    category: "technology",
    categoryLabel: "Technology",
    timestamp: "1d ago",
    title: "Cybersecurity compliance mandates tightened for digital payment aggregators",
    whyItMatters: "Tighter security standards may increase operational overhead for smaller fintechs while favoring established compliance providers.",
    potentialImpact: ["Fintech", "Enterprise Security", "Banking"],
    analysis: {
      chain: [
        "Regulators introduce stricter data encryption protocols",
        "Fintech firms upgrade authentication architecture",
        "Enterprise cybersecurity solution vendors gain enterprise contract volume"
      ],
      takeaway: "Regulatory security requirements steadily turn cybersecurity software into non-discretionary corporate spending."
    }
  },

  // Sports
  {
    id: "sports-1",
    category: "sports",
    categoryLabel: "Sports",
    timestamp: "3h ago",
    title: "Global tournament broadcasting and digital streaming rights conclude multi-year auction",
    whyItMatters: "Record media rights valuation affects telecom bandwidth consumption, ad-spending budgets, and subscriber acquisition costs.",
    potentialImpact: ["Media & Entertainment", "Telecommunications", "Digital Advertising"],
    analysis: {
      chain: [
        "Broadcasters commit large multi-year licensing fees",
        "Streaming platforms monetize through targeted tier pricing and ad slots",
        "Brands shift seasonal marketing budgets towards live sports programming"
      ],
      takeaway: "Large sports tournaments act as major catalysts for consumer advertising allocation and digital media revenue."
    }
  },
  {
    id: "sports-2",
    category: "sports",
    categoryLabel: "Sports",
    timestamp: "8h ago",
    title: "Host cities report surge in seasonal hospitality bookings and aviation demand ahead of major cup",
    whyItMatters: "Concentrated tourist influx temporarily tightens regional airline yields, hotel occupancy rates, and urban consumer retail.",
    potentialImpact: ["Aviation", "Hospitality", "Consumer Retail"],
    analysis: {
      chain: [
        "International fan travel concentrates into host metropolitan regions",
        "Hotel room pricing and flight yields rise across tournament corridors",
        "Short-term regional revenue increases for local service businesses"
      ],
      takeaway: "Major sporting events generate measurable seasonal revenue spikes for localized transport and lodging operators."
    }
  },
  {
    id: "sports-3",
    category: "sports",
    categoryLabel: "Sports",
    timestamp: "2d ago",
    title: "Athletic apparel makers note rising sponsorship returns and direct-to-consumer athletic wear demand",
    whyItMatters: "High-visibility tournament sponsorships directly influence seasonal inventory sell-through and brand gross margins.",
    potentialImpact: ["Footwear & Apparel", "Consumer Discretionary"],
    analysis: {
      chain: [
        "Global sporting viewership boosts athletic brand visibility",
        "Merchandise sales accelerate across retail and e-commerce channels",
        "Apparel brands experience seasonal margin lift"
      ],
      takeaway: "Sponsorship investments create measurable short-term consumer spending boosts for global sportswear makers."
    }
  },

  // Government
  {
    id: "govt-1",
    category: "government",
    categoryLabel: "Government",
    timestamp: "1h ago",
    title: "Central bank maintains policy repo rate, signaling focus on disinflation trajectory",
    whyItMatters: "Unchanged benchmark lending rates keep home loan and corporate debt costs stable, influencing credit uptake and savings yields.",
    potentialImpact: ["Banking", "Real Estate", "Fixed Income"],
    analysis: {
      chain: [
        "Monetary policy committee leaves benchmark interest rates unchanged",
        "Floating-rate retail loan EMIs and fixed deposit rates remain stable",
        "Borrowers and real estate buyers gain predictability in borrowing expenses"
      ],
      takeaway: "Rate stability reduces interest-rate volatility for debt investors and retail borrowers planning long-term mortgages."
    }
  },
  {
    id: "govt-2",
    category: "government",
    categoryLabel: "Government",
    timestamp: "4h ago",
    title: "National budget increases capital outlay for railway logistics and highway corridors",
    whyItMatters: "Direct fiscal spending on freight and transport corridors supports order books for cement, steel, and construction contractors.",
    potentialImpact: ["Infrastructure", "Cement & Steel", "Logistics"],
    analysis: {
      chain: [
        "Fiscal allocations accelerate for public infrastructure projects",
        "Tenders awarded to civil construction and engineering firms",
        "Long-term freight logistics costs decrease across manufacturing corridors"
      ],
      takeaway: "Infrastructure outlays act as multi-year economic multipliers for heavy engineering and materials sectors."
    }
  },
  {
    id: "govt-3",
    category: "government",
    categoryLabel: "Government",
    timestamp: "1d ago",
    title: "Renewable energy production-linked incentive tranche disbursed to solar manufacturers",
    whyItMatters: "Financial incentives offset raw material import costs and support localization of clean energy component supply chains.",
    potentialImpact: ["Renewable Energy", "Utilities", "Manufacturing"],
    analysis: {
      chain: [
        "Fiscal incentives disbursed based on manufacturing output milestones",
        "Domestic panel and cell manufacturing capacity scales",
        "Power generation developers source cheaper domestic modules"
      ],
      takeaway: "Targeted industrial subsidies encourage domestic manufacturing scale in capital-intensive green energy sectors."
    }
  },

  // Geopolitics
  {
    id: "geo-1",
    category: "geopolitics",
    categoryLabel: "Geopolitics",
    timestamp: "3h ago",
    title: "Maritime shipping rerouting around key transit straits elevates container freight rates",
    whyItMatters: "Longer voyage times add transit surcharges and delay manufacturing inventories, affecting import-dependent product prices.",
    potentialImpact: ["Shipping & Logistics", "Global Trade", "Commodities"],
    analysis: {
      chain: [
        "Security risks along key maritime straits prompt rerouting around southern capes",
        "Vessel transit times lengthen by 10 to 14 days, reducing available global fleet capacity",
        "Container freight benchmarks rise, increasing landed costs for imported goods"
      ],
      takeaway: "Logistics friction can temporarily elevate supply-chain costs and import inflation across consumer product lines."
    }
  },
  {
    id: "geo-2",
    category: "geopolitics",
    categoryLabel: "Geopolitics",
    timestamp: "7h ago",
    title: "Major oil-producing nations confirm extension of voluntary crude export limits",
    whyItMatters: "Sustained crude price floors directly impact domestic fuel retail prices, aviation turbine fuel, and petrochemical inputs.",
    potentialImpact: ["Energy", "Petrochemicals", "Aviation"],
    analysis: {
      chain: [
        "Crude producers maintain disciplined export ceilings",
        "Global crude oil benchmarks hold steady at higher trading ranges",
        "Refining margins and transport input costs reflect higher baseline energy prices"
      ],
      takeaway: "Energy prices permeate broadly through manufacturing freight, fertilizers, and consumer logistics."
    }
  },
  {
    id: "geo-3",
    category: "geopolitics",
    categoryLabel: "Geopolitics",
    timestamp: "2d ago",
    title: "Diplomatic trade talks advance bilateral digital services and cross-border currency settlement",
    whyItMatters: "Bilateral local-currency settlement agreements reduce foreign exchange conversion costs for exporters and cross-border software vendors.",
    potentialImpact: ["Export Services", "Banking", "Information Technology"],
    analysis: {
      chain: [
        "Partner countries establish direct currency clearing channels",
        "Transaction conversion costs and dollar settlement delays decrease",
        "Bilateral trade friction lowers for cross-border software and services"
      ],
      takeaway: "Financial infrastructure agreements streamline trade flows and reduce hedging costs for international commerce."
    }
  }
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "technology", label: "Technology" },
  { key: "sports", label: "Sports" },
  { key: "government", label: "Government" },
  { key: "geopolitics", label: "Geopolitics" },
];

export default function MarketIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [activeAnalysis, setActiveAnalysis] = useState<MarketEvent | null>(null);

  const filteredEvents =
    selectedCategory === "all"
      ? MARKET_EVENTS
      : MARKET_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <Section id="market" className="border-t border-line bg-paper" innerClassName="pt-12 sm:pt-16 pb-8 sm:pb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <H2>What&apos;s moving the market?</H2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Understand the events and trends that can influence markets and your financial decisions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          <span>Event → Potential impact → Better understanding</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, label }) => {
          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "border-accent bg-accent text-white shadow-sm"
                  : "border-line bg-white text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Event Cards Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((evt) => (
          <article
            key={evt.id}
            className="flex flex-col justify-between rounded-card border border-line bg-white p-6 transition-all duration-200 hover:border-muted/80 hover:shadow-sm"
          >
            <div>
              {/* Category & Timestamp */}
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-semibold uppercase tracking-wider text-accent">
                  {evt.categoryLabel}
                </span>
                <span className="tabular-nums">{evt.timestamp}</span>
              </div>

              {/* Event Title */}
              <h3 className="mt-3 text-base font-semibold leading-snug text-ink">
                {evt.title}
              </h3>

              {/* Why it matters */}
              <div className="mt-4 pt-4 border-t border-line/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Why it matters
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {evt.whyItMatters}
                </p>
              </div>

              {/* Potential Impact */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Potential impact
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {evt.potentialImpact.map((item) => (
                    <span
                      key={item}
                      className="rounded bg-paper border border-line/70 px-2 py-0.5 text-xs text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Read analysis action */}
            <div className="mt-6 pt-4 border-t border-line/60">
              <button
                type="button"
                onClick={() => setActiveAnalysis(evt)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-ink"
              >
                <span>Read analysis</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>



      {/* Analysis Modal / Drawer */}
      {activeAnalysis && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Event Analysis"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveAnalysis(null)}
        >
          <div
            className="w-full max-w-lg rounded-card border border-line bg-white p-6 sm:p-8 shadow-xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent-soft px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                  {activeAnalysis.categoryLabel}
                </span>
                <span className="text-xs text-muted">{activeAnalysis.timestamp}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveAnalysis(null)}
                className="p-1 text-muted hover:text-ink rounded"
                aria-label="Close analysis"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-ink leading-snug">
              {activeAnalysis.title}
            </h3>

            <div className="mt-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Cause & Effect Chain
              </p>
              <div className="space-y-2 rounded-lg bg-paper border border-line p-4 text-xs sm:text-sm">
                {activeAnalysis.analysis?.chain.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-ink leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-accent-soft/60 border border-accent/20 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                Key Takeaway
              </p>
              <p className="mt-1 text-xs sm:text-sm text-ink leading-relaxed">
                {activeAnalysis.analysis?.takeaway}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveAnalysis(null)}
                className="rounded-lg border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
