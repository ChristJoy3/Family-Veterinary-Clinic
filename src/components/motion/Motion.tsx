"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, onRevealed, prefersReducedMotion, setLenis } from "@/lib/motion";

const HEADER_OFFSET = -96;

/**
 * Site-wide motion: Lenis smooth scroll synced to ScrollTrigger, in-page anchor
 * scrolling, fade-up reveals, bone-divider drawing and the hero entrance.
 * With reduced motion it only handles anchor focus; everything stays static.
 */
export function Motion() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const hash = url.hash;
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET });
      else target.scrollIntoView({ block: "start" });
      history.pushState(null, "", hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      if (reduce) return;

      ScrollTrigger.batch("[data-reveal]:not([data-hero] [data-reveal])", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray<SVGSVGElement>("[data-bone]").forEach((svg) => {
        gsap.to(svg.querySelectorAll("path"), {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
          stagger: 0.18,
          scrollTrigger: { trigger: svg, start: "top 92%", once: true },
        });
      });
    });

    const stopHero = onRevealed(() => {
      if (reduce) return;
      ctx.add(() => {
        const tl = gsap.timeline();
        tl.to("[data-hero-line] > span", { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.12 });
        tl.to(
          "[data-hero] [data-reveal]",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
          0.35,
        );
      });
    });

    return () => {
      stopHero();
      document.removeEventListener("click", onClick);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
