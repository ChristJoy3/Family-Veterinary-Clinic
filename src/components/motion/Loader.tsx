"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Paw } from "@/components/icons";
import { getLenis, gsap, markRevealed, prefersReducedMotion } from "@/lib/motion";

const SEEN_KEY = "fvc-loader-seen";

/**
 * Once-per-session logo intro: the logo sharpens in, four paw prints walk
 * beneath it, the tagline fades up, then the logo glides into the header
 * while the ivory curtain lifts away. Reduced motion gets a 300ms fade.
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

    const headerLogo = document.getElementById("header-logo");
    const lenis = getLenis();
    lenis?.stop();
    html.style.overflow = "hidden";

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
      }, 150);
      const t2 = window.setTimeout(finish, 450);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }

    const ctx = gsap.context(() => {
      const pawEls = paws.current?.children ?? [];
      const tl = gsap.timeline({ onComplete: finish });

      tl.fromTo(
        logo.current,
        { opacity: 0, scale: 0.92, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          pawEls,
          { opacity: 0, scale: 0.6, y: 4 },
          { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "back.out(2)", stagger: 0.15 },
          0.3,
        )
        .fromTo(tagline.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.55)
        .addLabel("exit", 1.1)
        .to([paws.current, tagline.current], { opacity: 0, duration: 0.25, ease: "power1.in" }, "exit")
        .to(curtain.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "exit+=0.05")
        .call(markRevealed, [], "exit+=0.25");

      // FLIP the loader logo onto the header logo.
      if (headerLogo && logo.current) {
        const from = logo.current.getBoundingClientRect();
        const to = headerLogo.getBoundingClientRect();
        const scale = to.height / from.height;
        tl.to(
          logo.current,
          {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "exit",
        );
      } else {
        tl.to(logo.current, { opacity: 0, duration: 0.4 }, "exit");
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="loader"
      ref={root}
      className="fixed inset-0 z-[100] animate-[loader-failsafe_0.4s_ease_5s_forwards]"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading Family Veterinary Clinic</span>
      <div ref={curtain} className="absolute inset-0 bg-ivory">
        <svg
          className="absolute inset-x-0 top-full h-10 w-full text-ivory"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0H100V0C70 10 30 10 0 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="relative flex h-full flex-col items-center justify-center gap-6">
        <div ref={logo} data-l className="will-change-transform">
          <Image src="/images/logo.png" alt="" width={165} height={230} preload className="h-44 w-auto sm:h-52" />
        </div>
        <div ref={paws} className="flex items-end gap-3 text-navy/70" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <Paw key={i} data-l size={18} className={i % 2 ? "-translate-y-2 rotate-90" : "rotate-90"} />
          ))}
        </div>
        <p ref={tagline} data-l className="font-display text-lg tracking-wide text-navy">
          Family Veterinary Clinic <span aria-hidden="true">•</span> Since 1982
        </p>
      </div>
    </div>
  );
}
