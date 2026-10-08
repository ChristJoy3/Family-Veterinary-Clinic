"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Close, Menu, Phone } from "@/components/icons";
import { clinic, links, nav } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "border-oat-deep/60 bg-ivory/85 shadow-[0_8px_30px_-18px_rgb(34_48_94/0.35)] backdrop-blur-xl"
            : "border-transparent bg-ivory/60 backdrop-blur-md"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Family Veterinary Clinic home">
            <span id="header-logo" className="block">
              <Image src="/images/logo.png" alt="" width={165} height={230} preload className="h-14 w-auto" />
            </span>
            <span className="hidden whitespace-nowrap leading-tight sm:block lg:hidden xl:block">
              <span className="block font-display text-lg text-navy">Family Veterinary Clinic</span>
              <span className="block text-[0.8125rem] font-semibold text-muted">Crofton &amp; Gambrills, MD</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="whitespace-nowrap rounded-full px-3 py-2 text-[0.9875rem] font-bold text-navy transition-colors hover:bg-oat"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={clinic.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 font-bold text-navy hover:bg-oat 2xl:flex"
            >
              <Phone size={18} />
              {clinic.phone}
            </a>
            <a href={links.appointment} target="_blank" rel="noopener" className="btn btn-primary hidden whitespace-nowrap sm:inline-flex">
              Request Appointment
            </a>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full text-navy hover:bg-oat lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!open} className="border-t border-oat-deep/60 lg:hidden">
          <nav aria-label="Mobile" className="container-x py-4">
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-xl text-navy hover:bg-oat"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={links.appointment} target="_blank" rel="noopener" className="btn btn-primary">
                Request Appointment
              </a>
              <a href={clinic.phoneHref} className="btn btn-secondary">
                <Phone size={18} /> Call {clinic.phone}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
