"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { External, Paw, Plus } from "@/components/icons";
import { team, teamGroups, type TeamGroup, type TeamMember } from "@/content/team";
import { gsap, prefersReducedMotion, refreshScroll } from "@/lib/motion";

function FlipCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);
  const card = useRef<HTMLLIElement>(null);
  const backId = `bio-${member.id}`;

  const onPointerMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = card.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 8).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    card.current?.style.setProperty("--tilt-x", "0deg");
    card.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <li
      ref={card}
      data-team-card
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`flip h-[29rem] w-[80vw] max-w-[22rem] shrink-0 snap-start sm:w-auto sm:max-w-none ${flipped ? "is-flipped" : ""}`}
    >
      <div className="flip-tilt">
        <div className="flip-inner">
          {/* Front */}
          <div className="flip-face card flex flex-col">
            <div className="relative h-[72%] shrink-0 overflow-hidden bg-mist">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 1280px) 18rem, (min-width: 640px) 45vw, 80vw"
                  className="object-cover"
                  style={member.focus ? { objectPosition: member.focus } : undefined}
                />
              ) : (
                <div className="grid size-full place-items-center">
                  <span className="flex flex-col items-center gap-3 text-navy/45">
                    <span className="grid size-24 place-items-center rounded-full bg-ivory">
                      <Paw size={44} className="text-navy/35" />
                    </span>
                    <span className="text-[0.9375rem] font-bold">Photo coming soon</span>
                  </span>
                </div>
              )}
              {member.badge === "cat-friendly" ? (
                <span className="absolute bottom-3 left-3 rounded-2xl bg-white/90 p-1.5 shadow-sm">
                  <Image src="/images/cat-friendly-veterinarian.png" alt="Cat Friendly Veterinarian" width={320} height={129} className="h-12 w-auto" />
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 items-center justify-between gap-3 px-6 py-4">
              <div>
                <h3 className="text-xl leading-snug">{member.name}</h3>
                <p className="mt-1 text-[0.9375rem] font-semibold text-muted">{member.role}</p>
              </div>
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-oat text-navy">
                <Plus size={20} />
              </span>
            </div>
            <button
              type="button"
              className="flip-toggle absolute inset-0 rounded-[var(--radius-card)]"
              aria-expanded={flipped}
              aria-controls={backId}
              onClick={() => setFlipped((v) => !v)}
            >
              <span className="sr-only">Read bio: {member.name}</span>
            </button>
          </div>

          {/* Back */}
          <div id={backId} className="flip-face flip-back on-dark flex flex-col bg-navy p-7 text-ivory">
            <p className="eyebrow">{member.role}</p>
            <p className="mt-2 font-display text-2xl leading-tight text-white">{member.name}</p>
            <div className="mt-4 flex-1 overflow-y-auto pr-1 text-[0.96875rem] leading-relaxed text-ivory/90" data-lenis-prevent>
              {member.bio ?? <span className="italic text-ivory/70">[Bio coming soon]</span>}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              {member.link ? (
                <a href={member.link.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-white underline underline-offset-4">
                  {member.link.label} <External size={16} />
                </a>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="rounded-full border border-ivory/40 px-4 py-2 text-[0.875rem] font-bold hover:bg-ivory/10"
              >
                Back<span className="sr-only"> to {member.name}’s photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Team() {
  const [group, setGroup] = useState<TeamGroup>("doctors");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLUListElement>(null);
  const first = useRef(true);
  const members = team.filter((m) => m.group === group);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    refreshScroll();
    if (prefersReducedMotion() || !list.current) return;
    gsap.fromTo(
      list.current.querySelectorAll("[data-team-card]"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05, clearProps: "opacity,transform" },
    );
    list.current.scrollTo({ left: 0 });
  }, [group]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = teamGroups.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setGroup(teamGroups[next].key);
    tabs.current[next]?.focus();
  };

  return (
    <section id="team" aria-labelledby="team-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              Meet the team
            </p>
            <h2 id="team-title" className="section-title mt-3" data-reveal>
              The people who’ll know your pet by name.
            </h2>
          </div>
          <div role="tablist" aria-label="Team groups" className="flex flex-wrap gap-2" data-reveal>
            {teamGroups.map((g, i) => (
              <button
                key={g.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${g.key}`}
                aria-selected={group === g.key}
                aria-controls="team-panel"
                tabIndex={group === g.key ? 0 : -1}
                onClick={() => setGroup(g.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="chip"
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div id="team-panel" role="tabpanel" aria-labelledby={`tab-${group}`} className="mt-12">
          <ul
            ref={list}
            className="rail -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4"
          >
            {members.map((m) => (
              <FlipCard key={m.id} member={m} />
            ))}
          </ul>
          <p className="mt-4 text-[0.9375rem] text-muted">
            <span className="sm:hidden">Swipe to see everyone. </span>Tap or press Enter on a card to read a bio.
          </p>
        </div>
      </div>
    </section>
  );
}
