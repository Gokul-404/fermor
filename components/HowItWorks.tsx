import Section, { H2 } from "./Section";
const steps = [["01", "Understand", "See your financial position clearly."], ["02", "Plan", "Turn financial goals into practical plans."], ["03", "Act", "Use clear insights to make better decisions."]];
export default function HowItWorks() {
  return (
    <Section id="how" className="border-y border-line bg-white">
      <H2>Understand. Plan. Act.</H2>
      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
        {steps.map(([n, t, d]) => (
          <li key={n} className="md:px-8 md:first:pl-0 md:last:pr-0">
            <p className="text-sm font-medium tabular-nums text-accent">{n}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t}</h3>
            <p className="mt-2 max-w-xs text-muted">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
