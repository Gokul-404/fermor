const base = "inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export default function Button({ href, variant = "primary", children }: { href: string; variant?: "primary" | "ghost"; children: React.ReactNode }) {
  const style = variant === "primary" ? "bg-ink text-white hover:bg-accent active:scale-[0.99]" : "border border-line bg-white hover:border-ink/40";
  const ext = href.startsWith("http");
  return <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${base} ${style}`}>{children}</a>;
}
