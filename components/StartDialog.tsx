"use client";
import { useEffect, useRef } from "react";
import { ChevronRight, X } from "lucide-react";
const options = [
  ["Plan monthly investing", "Try the SIP calculator with your own numbers.", "calculators"],
  ["See my money in one place", "Look at the sample dashboard.", "product"],
  ["Teach a child about money", "Start with the kids' section.", "kids"],
  ["Ask a question", "Chat with Fermor Bot.", "chat"],
  ["Create a free account", "Sign up to track and save financial simulations.", "signup"],
] as const;
export default function StartDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a[href="#get-started"]')) return;
      e.preventDefault();
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  const go = (id: string) => {
    ref.current?.close();
    if (id === "signup") { location.href = "/signup"; return; }
    if (location.pathname !== "/") { location.href = id === "chat" ? "/#chat" : `/#${id}`; return; }
    if (id === "chat") window.dispatchEvent(new Event("fermor:open-chat"));
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <dialog ref={ref} aria-labelledby="start-title" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      className="start-dialog w-[calc(100%-2.5rem)] max-w-md rounded-card border border-line bg-paper p-0 text-ink">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="start-title" className="text-xl font-semibold tracking-tight">Where do you want to start?</h2>
          <button type="button" aria-label="Close" onClick={() => ref.current?.close()} className="-mr-2 -mt-1 p-2 text-muted transition-colors hover:text-ink"><X size={18} /></button>
        </div>
        <p className="mt-2 text-sm text-muted">No account needed. Pick a goal and we&apos;ll take you to the right tool.</p>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {options.map(([t, d, id]) => (
            <li key={id}>
              <button type="button" onClick={() => go(id)} className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-accent">
                <span><span className="block font-medium">{t}</span><span className="block text-sm text-muted">{d}</span></span>
                <ChevronRight size={16} className="shrink-0 text-muted" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
