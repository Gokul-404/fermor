import Section, { H2 } from "./Section";
const items = [["Privacy-first", "Your financial information should remain under your control."], ["Transparent", "Clear numbers and explanations without unnecessary financial jargon."], ["Simple", "A financial platform shouldn't require you to be a finance expert."]];
export default function TrustSection() {
  return (
    <Section className="border-t border-line bg-white">
      <H2>Built around clarity and control.</H2>
      <dl className="mt-12 grid gap-10 md:grid-cols-3">
        {items.map(([t, d]) => (<div key={t}><dt className="text-lg font-semibold">{t}</dt><dd className="mt-2 text-muted">{d}</dd></div>))}
      </dl>
    </Section>
  );
}
