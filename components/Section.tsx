type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function Section({ id, children, className = "", innerClassName = "" }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className={`mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
export const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl ${className}`}>{children}</h2>
);
export const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`mb-3 text-sm font-semibold tracking-wider uppercase text-accent ${className}`}>{children}</p>
);

