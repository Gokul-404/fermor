import Link from "next/link";
const links = [
  ["Why Us", "/#why"],
  ["Product", "/#product"],
  ["Calculators", "/#calculators"],
  ["Kids & Math", "/#kids"],
  ["How it works", "/#how"],
  ["Insights", "/#insights"],
  ["About", "/about"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em]">FERMOR</p>
          <p className="mt-3 max-w-sm text-sm text-muted">Tools that help you understand your money and plan with clarity.</p>
        </div>
        <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">{links.map(([l, h]) => (<li key={l}><Link href={h} className="transition-colors hover:text-ink">{l}</Link></li>))}</ul></nav>

      </div>
    </footer>
  );
}
