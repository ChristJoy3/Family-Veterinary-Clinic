"use client";

import { useState } from "react";
import { Plus } from "@/components/icons";
import { faqs } from "@/content/site";
import { refreshScroll } from "@/lib/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((cur) => (cur === i ? null : i));
    window.setTimeout(refreshScroll, 450);
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-oat py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            FAQ
          </p>
          <h2 id="faq-title" className="section-title mt-3" data-reveal>
            Questions, answered.
          </h2>
        </div>
        <div className="grid gap-3" data-reveal>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="card overflow-hidden">
                <h3 className="font-sans text-[1.125rem] tracking-normal">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-bold text-navy sm:px-8"
                  >
                    {f.q}
                    <span
                      aria-hidden="true"
                      className={`grid size-9 shrink-0 place-items-center rounded-full bg-oat transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted sm:px-8">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
