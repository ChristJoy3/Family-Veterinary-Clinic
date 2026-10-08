"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Arrow, External, serviceIcons } from "@/components/icons";
import { moreServices, petCare, petServices } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Pet = keyof typeof petCare;

export function Services() {
  const [pet, setPet] = useState<Pet>("cats");
  const panel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const care = petCare[pet];

  const choose = (next: Pet) => {
    if (next === pet || busy.current) return;
    const root = panel.current;
    if (!root || prefersReducedMotion()) {
      setPet(next);
      return;
    }
    busy.current = true;
    const out = root.querySelectorAll("[data-morph]");
    gsap.to(out, {
      opacity: 0,
      y: -14,
      rotateX: 18,
      scale: 0.97,
      duration: 0.28,
      ease: "power2.in",
      stagger: 0.035,
      onComplete: () => {
        flushSync(() => setPet(next));
        gsap.fromTo(
          root.querySelectorAll("[data-morph]"),
          { opacity: 0, y: 18, rotateX: -18, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
            clearProps: "transform",
            onComplete: () => {
              busy.current = false;
            },
          },
        );
      },
    });
  };

  const isDogs = pet === "dogs";

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              Services
            </p>
            <h2 id="services-title" className="section-title mt-3" data-reveal>
              Preventive care, tailored to every pet.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-lg font-extrabold" data-reveal>
            <button
              type="button"
              onClick={() => choose("cats")}
              className={`rounded-full px-2 py-1 transition-colors ${isDogs ? "text-muted hover:text-navy" : "text-navy"}`}
              aria-hidden="true"
              tabIndex={-1}
            >
              Cats
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={isDogs}
              aria-label="Show care for dogs instead of cats"
              onClick={() => choose(isDogs ? "cats" : "dogs")}
              className="relative h-10 w-[4.5rem] rounded-full bg-navy p-1 transition-colors"
            >
              <span
                aria-hidden="true"
                className={`block size-8 rounded-full bg-ivory shadow transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  isDogs ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => choose("dogs")}
              className={`rounded-full px-2 py-1 transition-colors ${isDogs ? "text-navy" : "text-muted hover:text-navy"}`}
              aria-hidden="true"
              tabIndex={-1}
            >
              Dogs
            </button>
          </div>
        </div>

        <div
          ref={panel}
          className="mt-12 grid items-center gap-10 [perspective:1200px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          aria-live="polite"
        >
          <div>
            <h3 className="text-3xl sm:text-4xl" data-morph>
              {care.heading}
            </h3>
            {care.body.map((p) => (
              <p key={p} className="mt-4 text-muted" data-morph>
                {p}
              </p>
            ))}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {petServices.map((s) => {
                const Icon = serviceIcons[s.key];
                return (
                  <li key={s.key} data-morph className="card flex items-center gap-4 p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-navy">
                      <Icon size={24} />
                    </span>
                    <span>
                      <span className="block font-display text-xl text-navy">{s.label}</span>
                      <span className="block text-[0.875rem] font-semibold text-muted">for {care.label.toLowerCase()}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div data-morph className="arch relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-oat shadow-[var(--shadow-lift)]">
            <Image src={care.image.src} alt={care.image.alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
          </div>
        </div>

        <h3 className="mt-24 text-2xl sm:text-3xl" data-reveal>
          More ways we care
        </h3>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moreServices.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.title} className="card flex flex-col p-7 transition-shadow hover:shadow-[var(--shadow-lift)]" data-reveal>
                <span className="grid size-14 place-items-center rounded-full bg-oat text-terracotta">
                  <Icon size={26} />
                </span>
                <h4 className="mt-5 font-display text-xl leading-snug text-navy">{s.title}</h4>
                <p className="mt-3 flex-1 text-[1rem] text-muted">{s.body}</p>
                {"href" in s ? (
                  <a href={s.href} target="_blank" rel="noopener" className="link mt-5 inline-flex items-center gap-1.5 text-[1rem]">
                    {s.cta} <External size={16} />
                  </a>
                ) : (
                  <a href="#contact" className="link mt-5 inline-flex items-center gap-1.5 text-[1rem]">
                    Ask about this <Arrow size={16} />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
