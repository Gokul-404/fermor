import Section, { H2, Eyebrow } from "./Section";
import { Eye, Scale, ShieldCheck, CheckCircle2, Star, Sparkles } from "lucide-react";

const TRUST_PRINCIPLES = [
  {
    icon: Eye,
    title: "Clear",
    description: "Understand your financial information without unnecessary complexity.",
  },
  {
    icon: Scale,
    title: "Transparent",
    description: "See the numbers behind your financial picture instead of relying on vague recommendations.",
  },
  {
    icon: ShieldCheck,
    title: "User-first",
    description: "Designed around helping people understand and make decisions about their own finances.",
  },
];

const STAGES = [
  {
    step: "01",
    title: "Getting started",
    description: "Understand where your money goes and build better habits.",
  },
  {
    step: "02",
    title: "Building wealth",
    description: "Track investments and understand your progress with compounding.",
  },
  {
    step: "03",
    title: "Planning ahead",
    description: "Work toward meaningful long-term financial milestones.",
  },
];

const REVIEWS = [
  {
    quote: "I finally have a simple view of where my money is going instead of checking everything separately.",
    author: "Arjun",
    location: "Bengaluru",
    avatarBg: "bg-emerald-100 text-emerald-800",
  },
  {
    quote: "The dashboard makes the numbers much easier to understand. I don't have to dig through spreadsheets anymore.",
    author: "Priya",
    location: "Mumbai",
    avatarBg: "bg-teal-100 text-teal-800",
  },
  {
    quote: "I like that the information is presented clearly without making finance feel complicated.",
    author: "Rahul",
    location: "Hyderabad",
    avatarBg: "bg-emerald-100 text-emerald-800",
  },
  {
    quote: "Being able to test different EMI and SIP scenarios side by side gives me a lot more confidence before making decisions.",
    author: "Ananya",
    location: "Pune",
    avatarBg: "bg-teal-100 text-teal-800",
  },
  {
    quote: "The math is completely transparent. It shows you the formula and logic instead of just spitting out a black-box number.",
    author: "Karthik",
    location: "Chennai",
    avatarBg: "bg-emerald-100 text-emerald-800",
  },
  {
    quote: "Fermor cuts through the noise. It focuses on the three or four numbers that actually matter to my monthly savings.",
    author: "Sneha",
    location: "Gurugram",
    avatarBg: "bg-teal-100 text-teal-800",
  },
];

export default function WhyFermor() {
  return (
    <Section id="why" className="border-t border-line bg-white">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-accent-soft px-4 py-2 text-base sm:text-lg font-bold text-accent tracking-wide shadow-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span>Why Us</span>
        </div>
        <H2>Financial clarity you can trust.</H2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
          Clear information, understandable insights, and a simpler way to stay on top of your financial life.
        </p>
      </div>

      {/* Trust Principles with Icon Accents */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 border-b border-line pb-16">
        {TRUST_PRINCIPLES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent shadow-xs">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-muted">{description}</p>
          </div>
        ))}
      </div>

      {/* Wherever you are financially, start with clarity, start with us */}
      <div className="mt-16 border-b border-line pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Your Financial Journey</span>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Wherever you are financially, start with clarity, start with us.
            </h3>
          </div>
          <span className="text-xs text-muted">Step-by-step mathematical progress</span>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {STAGES.map(({ step, title, description }) => (
            <li
              key={title}
              className="relative flex flex-col justify-between rounded-card border border-line bg-paper p-6 transition-all duration-200 hover:border-ink/40 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-line/60">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white shadow-xs">
                    {step}
                  </span>
                  <span className="text-xs text-muted font-medium">Stage {step}</span>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-ink">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* User Reviews Subsection */}
      <div className="mt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            What users are saying
          </h3>
          <span className="text-xs text-muted">Community experiences across India</span>
        </div>

        {/* 6 Reviews in 3x2 Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map(({ quote, author, location, avatarBg }) => (
            <figure
              key={author}
              className="flex flex-col justify-between rounded-card border border-line bg-paper p-6 transition-all duration-200 hover:border-muted/80 hover:shadow-sm"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${avatarBg}`}>
                    {author.charAt(0)}
                  </div>
                  <div>
                    <strong className="block text-xs font-semibold text-ink">{author}</strong>
                    <span className="block text-[11px] text-muted">{location}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent">
                  <CheckCircle2 size={11} />
                  <span>Verified</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
