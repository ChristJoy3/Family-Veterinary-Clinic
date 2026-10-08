"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, External, Paw } from "@/components/icons";
import { articleCategories, articles } from "@/content/articles";
import { featuredArticles, resourceLinks } from "@/content/site";
import { gsap, prefersReducedMotion, refreshScroll } from "@/lib/motion";

const FEATURED = "Featured";
const filters = ["All", ...articleCategories, FEATURED];
const INITIAL = 6;

type Card =
  | { kind: "article"; slug: string; title: string; excerpt: string; category: string }
  | { kind: "featured"; title: string };

const allCards: Card[] = [
  ...articles.map((a) => ({ kind: "article" as const, slug: a.slug, title: a.title, excerpt: a.excerpt, category: a.category })),
  ...featuredArticles.map((title) => ({ kind: "featured" as const, title })),
];

export function Resources() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const grid = useRef<HTMLUListElement>(null);
  const first = useRef(true);

  const matching = allCards.filter((c) =>
    filter === "All" ? true : filter === FEATURED ? c.kind === "featured" : c.kind === "article" && c.category === filter,
  );
  const visible = expanded || filter !== "All" ? matching : matching.slice(0, INITIAL);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    refreshScroll();
    if (prefersReducedMotion() || !grid.current) return;
    gsap.fromTo(
      grid.current.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.04, clearProps: "opacity,transform" },
    );
  }, [filter, expanded]);

  return (
    <section id="resources" aria-labelledby="resources-title" className="bg-oat py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Resources &amp; blog
          </p>
          <h2 id="resources-title" className="section-title mt-3" data-reveal>
            Helpful reading for pet parents.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category" data-reveal>
          {filters.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {matching.length} articles
        </p>

        <ul ref={grid} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((card) =>
            card.kind === "article" ? (
              <li key={card.slug}>
                <Link
                  href={`/resources/${card.slug}`}
                  className="card group flex h-full flex-col p-7 transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="eyebrow">{card.category}</span>
                  <h3 className="mt-3 text-xl leading-snug group-hover:underline group-hover:decoration-clay group-hover:underline-offset-4">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[1rem] text-muted">{card.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[1rem] font-bold text-terracotta">
                    Read article <Arrow size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ) : (
              <li key={card.title}>
                <div className="flex h-full flex-col rounded-[var(--radius-card)] border-2 border-dashed border-navy/15 bg-ivory/70 p-7">
                  <span className="eyebrow">Featured article</span>
                  <h3 className="mt-3 text-xl leading-snug">{card.title}</h3>
                  <p className="mt-3 flex-1 text-[1rem] italic text-muted">[Article summary and link to be added]</p>
                </div>
              </li>
            ),
          )}
        </ul>

        {filter === "All" && matching.length > INITIAL ? (
          <div className="mt-8 text-center">
            <button type="button" className="btn btn-secondary" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show fewer articles" : `Show all ${matching.length} articles`}
            </button>
          </div>
        ) : null}

        <div className="mt-16" data-reveal>
          <h3 className="text-2xl">More resources</h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {resourceLinks.map((r) => (
              <li key={r.label}>
                {r.href === null ? (
                  <span className="chip cursor-default border-dashed text-muted" title="Coming soon">
                    <Paw size={14} className="text-navy/30" /> {r.label} <span className="sr-only">(coming soon)</span>
                  </span>
                ) : r.external ? (
                  <a href={r.href} target="_blank" rel="noopener" className="chip">
                    <Paw size={14} className="text-clay" /> {r.label} <External size={14} />
                  </a>
                ) : (
                  <Link href={r.href} className="chip">
                    <Paw size={14} className="text-clay" /> {r.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
