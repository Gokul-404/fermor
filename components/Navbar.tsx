"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "./Button";
const links = [
  ["Why Us", "/#why"],
  ["Product", "/#product"],
  ["Calculators", "/#calculators"],
  ["Kids & Math", "/#kids"],
  ["How it works", "/#how"],
  ["Insights", "/#insights"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/#top" className="text-sm font-semibold tracking-[0.2em]">FERMOR</Link>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map(([l, h]) => (<li key={h}><Link href={h} className="transition-colors hover:text-ink">{l}</Link></li>))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/signin" className="px-3 text-sm text-muted transition-colors hover:text-ink">Sign in</Link>
          <Button href="/signup">Sign up</Button>
        </div>
        <button className="-mr-2 p-2 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden">
          <ul>{links.map(([l, h]) => (<li key={h}><Link href={h} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-base">{l}</Link></li>))}</ul>
          <div className="mt-5 flex gap-3"><Button href="/signin" variant="ghost">Sign in</Button><Button href="/signup">Sign up</Button></div>
        </div>
      )}
    </header>
  );
}
