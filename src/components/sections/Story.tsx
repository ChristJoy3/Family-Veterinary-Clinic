"use client";

import { useEffect, useRef } from "react";
import { Paw } from "@/components/icons";
import { links, timeline } from "@/content/site";
import { gsap } from "@/lib/motion";

/** Body text with the two partner organisations linked. */
function StoryBody({ text }: { text: string }) {
  const parts = text.split(/(Second Chance of Baltimore|Anne Arundel Volunteer Fire Department)/);
  return (
    <>
      {parts.map((part, i) =>
        part === "Second Chance of Baltimore" ? (
          <a key={i} href={links.secondChance} target="_blank" rel="noopener" className="link">
            {part}
          </a>
        ) : part === "Anne Arundel Volunteer Fire Department" ? (
          <a key={i} href={links.arundelFire} target="_blank" rel="noopener" className="link">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * History told as a horizontal timeline. On desktop with motion allowed the
 * section pins and vertical scroll drives the track sideways; otherwise it's
 * a native swipe rail.
 */
export function Story() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const vp = viewport.current;
      const tr = track.current;
      if (!vp || !tr) return;
      vp.dataset.pinned = "";
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);

      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => {
        delete vp.dataset.pinned;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-oat py-20 md:flex md:min-h-svh md:flex-col md:justify-center md:pb-12 md:pt-28"
    >
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <p className="eyebrow" data-reveal>
            Our story
          </p>
          <h2 id="story-title" className="section-title mt-3" data-reveal>
            A family practice, then and now.
          </h2>
        </div>
        <div className="hidden w-56 md:block" aria-hidden="true">
          <div className="h-[3px] overflow-hidden rounded-full bg-navy/10">
            <div ref={progress} className="h-full origin-left rounded-full bg-terracotta" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      <div
        ref={viewport}
        className="rail mt-12 snap-x snap-mandatory overflow-x-auto scroll-px-4 data-[pinned]:snap-none data-[pinned]:overflow-visible sm:scroll-px-8"
      >
        <ol ref={track} className="flex w-max gap-5 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))]">
          {timeline.map((item, i) => (
            <li key={item.marker} className="relative flex w-[82vw] shrink-0 snap-start flex-col sm:w-[28rem] lg:w-[36rem]">
              <div className="mb-5 flex items-center gap-3" aria-hidden="true">
                <span className="grid size-10 place-items-center rounded-full bg-navy text-ivory">
                  <Paw size={18} />
                </span>
                <span className="h-px flex-1 bg-navy/20" />
              </div>
              <article className="card flex-1 p-7 sm:p-9">
                <p className="font-display text-[2.5rem] leading-none text-terracotta sm:text-5xl">{item.marker}</p>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-3 text-[1.0625rem] text-muted">
                  <StoryBody text={item.body} />
                </p>
                {"closing" in item && item.closing ? (
                  <p className="mt-5 border-l-2 border-clay pl-4 font-display text-xl italic text-navy">“{item.closing}”</p>
                ) : null}
                <p className="sr-only">
                  Step {i + 1} of {timeline.length}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <p className="container-x mt-6 text-[0.9375rem] text-muted md:hidden" aria-hidden="true">
        Swipe to read more →
      </p>
    </section>
  );
}
