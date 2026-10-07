import { ArrowUpRight } from "lucide-react";
import Section, { H2 } from "./Section";
const posts = [
  ["How compounding works in a monthly SIP", "Tata Mutual Fund", "https://www.tatamutualfund.com/blogs/understand-power-compounding-sip-and-sip-calculator-explained"],
  ["Where your EMI goes: interest versus principal", "Jago Investor", "https://jagoinvestor.com/?p=4888"],
  ["CTC versus in-hand salary", "Tickertape", "https://tickertape.in/blog/difference-between-ctc-and-inhand-salary"],
];
export default function Insights() {
  return (
    <Section id="insights" className="border-t border-line bg-white" innerClassName="pt-8 sm:pt-10 pb-12 sm:pb-16">
      <H2>Short reads on how the math works.</H2>
      <p className="mt-4 text-muted">Each link opens an explainer on another site.</p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {posts.map(([t, src, url]) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 py-6">
              <span className="text-lg font-medium transition-colors group-hover:text-accent">{t}<span className="sr-only"> (opens in a new tab)</span></span>
              <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted">{src}<ArrowUpRight size={15} aria-hidden /></span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
