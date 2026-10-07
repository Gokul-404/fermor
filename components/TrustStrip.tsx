const items = [["Simple", "Plain numbers, plain language."], ["Transparent", "Every result comes with its working."], ["Built around your goals", "Start from what you want to reach."]];
export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-white">
      <ul className="mx-auto grid max-w-6xl divide-y divide-line px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
        {items.map(([t, d]) => (<li key={t} className="py-6 sm:px-6 sm:first:pl-0"><p className="font-medium">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></li>))}
      </ul>
    </div>
  );
}
