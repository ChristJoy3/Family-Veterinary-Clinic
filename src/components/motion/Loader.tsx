"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Paw } from "@/components/icons";
import { getLenis, gsap, markRevealed, prefersReducedMotion } from "@/lib/motion";

const SEEN_KEY = "fvc-loader-seen";

/** The logo's sign shape (165×230 logo space): straight edges with concave corner notches. */
const SIGN_OUTLINE =
  "M82.5 27.5H133A19.5 19.5 0 0 0 152.5 47V198A19.5 19.5 0 0 0 133 217.5H32A19.5 19.5 0 0 0 12.5 198V47A19.5 19.5 0 0 0 32 27.5Z";

/**
 * Once-per-session logo intro. The intro itself is pure CSS (see globals.css,
 * "Loader") so it starts at first paint: the sign outline draws itself, the
 * logo fills in from the bottom up, paw prints walk beneath it and the tagline
 * fades up. Once hydrated and the intro has finished, the logo glides into the
 * header while the ivory curtain lifts away. Reduced motion gets a plain fade.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const paws = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el || html.classList.contains("loader-seen")) {
      markRevealed();
      return;
    }

    // JS has taken over, so the no-JS failsafe isn't needed.
    el.style.animation = "none";
    const headerLogo = document.getElementById("header-logo");
    const lenis = getLenis();
    lenis?.stop();
    html.style.overflow = "hidden";
    let cancelled = false;

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      html.classList.add("loader-seen");
      html.style.overflow = "";
      if (headerLogo) headerLogo.style.opacity = "1";
      el.style.display = "none";
      lenis?.start();
    };

    if (prefersReducedMotion()) {
      el.style.transition = "opacity 300ms ease";
      const t = window.setTimeout(() => {
        el.style.opacity = "0";
        markRevealed();
      }, 500);
      const t2 = window.setTimeout(finish, 800);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }

    const ctx = gsap.context(() => {}, el);

    const exit = () => {
      if (cancelled) return;
      ctx.add(() => {
        const tl = gsap.timeline({ onComplete: finish });
        tl.to([paws.current, tagline.current], { opacity: 0, y: 6, duration: 0.3, ease: "power1.in" }, 0)
          .to(curtain.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0.1)
          .call(markRevealed, [], 0.35);

        if (headerLogo && logo.current) {
          const from = logo.current.getBoundingClientRect();
          const to = headerLogo.getBoundingClientRect();
          tl.to(
            logo.current,
            {
              x: to.left + to.width / 2 - (from.left + from.width / 2),
              y: to.top + to.height / 2 - (from.top + from.height / 2),
              scale: to.height / from.height,
              duration: 0.9,
              ease: "power3.inOut",
            },
            0,
          );
        } else {
          tl.to(logo.current, { opacity: 0, duration: 0.4 }, 0);
        }
      });
    };

    // Wait for the CSS intro (which may already be done if hydration was slow).
    const intro = Array.from(el.querySelectorAll<HTMLElement>("[data-intro]")).flatMap((n) => n.getAnimations());
    const guard = window.setTimeout(exit, 2600);
    Promise.all(intro.map((a) => a.finished.catch(() => undefined))).then(() => {
      window.clearTimeout(guard);
      window.setTimeout(exit, 150);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(guard);
      ctx.revert();
    };
  }, []);

  return (
    <div id="loader" ref={root} className="fixed inset-0 z-[100]" role="status" aria-live="polite">
      <span className="sr-only">Loading Family Veterinary Clinic</span>
      <div ref={curtain} className="absolute inset-0 bg-ivory">
        <svg
          className="absolute inset-x-0 top-full h-12 w-full text-ivory"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0H100V0C70 10 30 10 0 0Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-8">
        <div ref={logo} className="relative aspect-[165/230] h-56 will-change-transform sm:h-64" aria-hidden="true">
          <svg data-intro className="loader-outline absolute inset-0 size-full overflow-visible text-navy" viewBox="0 0 165 230" fill="none">
            <path d={SIGN_OUTLINE} pathLength={1} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <div data-intro className="loader-fill absolute inset-0">
            <Image src="/images/logo.png" alt="" fill preload sizes="12rem" className="object-contain" />
          </div>
        </div>

        <div ref={paws} className="flex items-end gap-4 text-navy" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="loader-paw" style={{ ["--i" as string]: i }}>
              <Paw size={16} className={`rotate-90 ${i % 2 ? "-translate-y-2" : ""}`} />
            </span>
          ))}
        </div>

        <p ref={tagline} className="font-display text-lg tracking-wide text-navy">
          <span data-intro className="loader-tag inline-block">
            Family Veterinary Clinic <span aria-hidden="true">•</span> Since 1982
          </span>
        </p>
      </div>
    </div>
  );
}
