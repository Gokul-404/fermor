import Button from "./Button";
import DashboardPreview from "./DashboardPreview";
export default function Hero() {
  return (
    <section id="top">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Make sense of your money.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Understand your finances, make better decisions, and build toward your financial goals with clarity.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#get-started">Get started</Button>
            <Button href="#how" variant="ghost">See how it works</Button>
          </div>
        </div>
        <DashboardPreview animate />
      </div>
    </section>
  );
}
