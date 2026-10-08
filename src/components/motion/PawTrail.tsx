"use client";

import { useEffect, useRef } from "react";

const STEP = 70;
const MAX_PRINTS = 10;
const PAW_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 12.2c-2.6 0-5.6 3.3-5.6 5.6 0 1.6 1.2 2.4 2.6 2.4 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.4 0 2.6-.8 2.6-2.4 0-2.3-3-5.6-5.6-5.6Z"/><ellipse cx="6" cy="10.4" rx="1.9" ry="2.4"/><ellipse cx="9.6" cy="6.4" rx="2" ry="2.6"/><ellipse cx="14.4" cy="6.4" rx="2" ry="2.6"/><ellipse cx="18" cy="10.4" rx="1.9" ry="2.4"/></svg>';

/** A faint trail of paw prints behind the cursor. Desktop pointers only, never with reduced motion. */
export function PawTrail() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = layer.current;
    if (!el || !fine.matches || reduce.matches) return;

    let last: { x: number; y: number } | null = null;
    let side = 1;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!last) {
        last = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < STEP) return;

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const nx = (-dy / dist) * 7 * side;
      const ny = (dx / dist) * 7 * side;
      side *= -1;
      last = { x: e.clientX, y: e.clientY };

      const print = document.createElement("span");
      print.className = "paw-print";
      print.innerHTML = PAW_SVG;
      print.style.transform = `translate(${e.clientX + nx - 8}px, ${e.clientY + ny - 8}px) rotate(${angle}deg)`;
      el.appendChild(print);
      while (el.childElementCount > MAX_PRINTS) el.firstElementChild?.remove();
      print.addEventListener("animationend", () => print.remove(), { once: true });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden text-navy" />;
}
