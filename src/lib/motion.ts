"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Recalculate trigger positions after layout changes (tabs, filters, “show more”). */
export const refreshScroll = () => {
  requestAnimationFrame(() => ScrollTrigger.refresh());
};

/* The loader announces when the page is revealed so the hero can animate in. */
let revealed = false;
const revealListeners = new Set<() => void>();

export function markRevealed() {
  if (revealed) return;
  revealed = true;
  revealListeners.forEach((fn) => fn());
  revealListeners.clear();
}

export function onRevealed(fn: () => void) {
  if (revealed) fn();
  else revealListeners.add(fn);
  return () => revealListeners.delete(fn);
}
