import Navbar from "./Navbar";
import Footer from "./Footer";
export type Block = [heading: string, ...paragraphs: string[]];
export default function LegalPage({ title, intro, updated, blocks }: { title: string; intro: string; updated?: string; blocks: Block[] }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {updated && <p className="mt-3 text-sm text-muted">Last updated {updated}</p>}
        <p className="mt-8 text-lg leading-relaxed text-muted">{intro}</p>
        {blocks.map(([h, ...ps]) => (
          <section key={h} className="mt-12 border-t border-line pt-8">
            <h2 className="text-xl font-semibold tracking-tight">{h}</h2>
            {ps.map((p) => (<p key={p} className="mt-3 leading-relaxed text-ink/80">{p}</p>))}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
