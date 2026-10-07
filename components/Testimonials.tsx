import Section from "./Section";
const quotes = [["For the first time, my finances actually feel understandable.", "Demo quote · Getting started"], ["I stopped guessing what my SIP would turn into.", "Demo quote · Building wealth"], ["Our home goal finally has a number and a date.", "Demo quote · Planning ahead"]];
export default function Testimonials() {
  return (
    <Section className="border-y border-line bg-white">
      <figure className="max-w-3xl">
        <blockquote className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl">&ldquo;{quotes[0][0]}&rdquo;</blockquote>
        <figcaption className="mt-5 text-sm text-muted">{quotes[0][1]}</figcaption>
      </figure>
      <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
        {quotes.slice(1).map(([q, a]) => (<figure key={q}><blockquote>&ldquo;{q}&rdquo;</blockquote><figcaption className="mt-2 text-sm text-muted">{a}</figcaption></figure>))}
      </div>
      <p className="mt-8 text-xs text-muted">Illustrative quotes written for this concept page, not real customers.</p>
    </Section>
  );
}
