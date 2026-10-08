"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, onRevealed, prefersReducedMotion } from "@/lib/motion";

/**
 * Fade-up reveals, bone-divider drawing and the hero entrance. Rendered last
 * inside the page so it only touches the DOM after the page has hydrated.
 */
export function PageMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
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
      ctx.add(() => {
        const tl = gsap.timeline();
        tl.to("[data-hero-line] > span", { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.12 });
        tl.to("[data-hero] [data-reveal]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.35);
      });
    });

    return () => {
      stopHero();
      ctx.revert();
    };
  }, []);

  return null;
}
