import Section, { H2 } from "./Section";
const items = [["Getting started", "Understand where your money goes and build better habits."], ["Building wealth", "Track investments and understand your progress."], ["Planning ahead", "Work toward meaningful financial goals."]];
export default function AudienceSection() {
  return (
    <Section>
      <H2>Wherever you are financially, start with clarity.</H2>
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map(([t, d]) => (<li key={t} className="rounded-card border border-line bg-white p-6 transition-colors hover:border-ink/30"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p></li>))}
      </ul>
    </Section>
  );
}
