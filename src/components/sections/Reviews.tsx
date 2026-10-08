"use client";

import { useRef } from "react";
import { Arrow, ArrowLeft, External } from "@/components/icons";
import { links } from "@/content/site";

const placeholders = Array.from({ length: 5 }, (_, i) => i + 1);

export function Reviews() {
  const rail = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="on-dark overflow-hidden bg-navy py-20 text-ivory lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              Reviews
            </p>
            <h2 id="reviews-title" className="section-title mt-3 text-ivory" data-reveal>
              Kind words from our families.
            </h2>
          </div>
          <div className="flex gap-2" data-reveal>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="grid size-12 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10"
              aria-label="Previous review"
              aria-controls="review-rail"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="grid size-12 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10"
              aria-label="Next review"
              aria-controls="review-rail"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      <ul
        id="review-rail"
        ref={rail}
        aria-label="Client reviews"
        className="rail mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(2rem,calc((100vw-76rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))]"
        data-reveal
      >
        {placeholders.map((n) => (
          <li
            key={n}
            className="flex w-[85vw] max-w-[26rem] shrink-0 snap-start flex-col rounded-[var(--radius-card)] bg-ivory p-8 text-ink"
            aria-label={`Review ${n} of ${placeholders.length}`}
          >
            <span aria-hidden="true" className="font-display text-6xl leading-none text-clay">
              “
            </span>
            <p className="mt-2 flex-1 font-display text-xl text-navy">[Client review]</p>
            <p className="mt-6 text-[0.9375rem] font-bold text-muted">[Client name]</p>
          </li>
        ))}
      </ul>

      <div className="container-x mt-10 flex flex-wrap gap-3" data-reveal>
        <a href={links.googleReviews} target="_blank" rel="noopener" className="btn btn-light">
          Read our Google reviews <External size={18} />
        </a>
        <a href={links.leaveReview} target="_blank" rel="noopener" className="btn btn-ghost-light">
          Leave a review <External size={18} />
        </a>
      </div>
    </section>
  );
}
