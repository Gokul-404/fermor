"use client";
import { useState } from "react";
type Props = { data: number[]; label: string; animate?: boolean; labels?: string[] };
export default function Trend({ data, label, animate = false, labels }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const w = 600, h = 140, min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 10 - ((v - min) / (max - min)) * (h - 30)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const last = data.length - 1;
  const pos = hover === null ? 0 : (hover / last) * 100;
  const top = hover === null ? 0 : (pts[hover][1] / h) * 100;
  const fromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(Math.round(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * last));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setHover((i) => Math.min(last, (i ?? -1) + 1));
    if (e.key === "ArrowLeft") setHover((i) => Math.max(0, (i ?? data.length) - 1));
    if (e.key === "Escape") setHover(null);
  };
  return (
    <div className="relative touch-pan-y rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" tabIndex={0} role="group"
      aria-label={`${label}. Use left and right arrow keys to read each month.`}
      onPointerMove={fromPointer} onPointerDown={fromPointer} onPointerLeave={() => setHover(null)} onKeyDown={onKey} onBlur={() => setHover(null)}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={label} className={`h-32 w-full ${animate ? "reveal-x" : ""}`}>
        {[0.25, 0.5, 0.75].map((t) => (<line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="#e7e4dd" strokeWidth="1" vectorEffect="non-scaling-stroke" />))}
        <path d={`${line} L${w},${h} L0,${h} Z`} fill="#1d5c4b" opacity="0.07" />
        <path d={line} fill="none" stroke="#1d5c4b" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      {hover !== null && (
        <>
          <div className="pointer-events-none absolute inset-y-0 w-px bg-ink/25" style={{ left: `${pos}%` }} />
          <div className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent" style={{ left: `${pos}%`, top: `${top}%` }} />
          <div className="pointer-events-none absolute top-0 whitespace-nowrap rounded-md border border-line bg-white px-2 py-1 text-xs tabular-nums" style={{ left: `${Math.min(86, Math.max(14, pos))}%`, transform: "translateX(-50%)" }}>
            {labels?.[hover]} <span className="font-semibold">₹{data[hover].toFixed(2)}L</span>
          </div>
        </>
      )}
    </div>
  );
}
