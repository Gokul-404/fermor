"use client";
import { useEffect, useState } from "react";
export default function CountUp({ to, animate = false }: { to: number; animate?: boolean }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now() + 250, dur = 1100;
    setV(0);
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, to]);
  return <>₹{v.toLocaleString("en-IN")}</>;
}
