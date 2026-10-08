"use client";

import { useRef, useState } from "react";
import { Close, Door } from "@/components/icons";
import { links } from "@/content/site";
import { getLenis } from "@/lib/motion";

/** Opens the clinic's Google Street View tour in a modal; the iframe only loads on demand. */
export function VirtualTour() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);

  const open = () => {
    setLoaded(true);
    dialog.current?.showModal();
    getLenis()?.stop();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={open} className="btn btn-primary">
        <Door size={20} /> Take the Virtual Tour
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="tour-title"
        onClose={() => getLenis()?.start()}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] rounded-[var(--radius-card)] bg-ivory p-0 shadow-[var(--shadow-lift)] backdrop:bg-navy-deep/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <h2 id="tour-title" className="text-2xl">
            Step inside Family Veterinary Clinic
          </h2>
          <button
            type="button"
            onClick={close}
            className="grid size-11 place-items-center rounded-full text-navy hover:bg-oat"
            aria-label="Close virtual tour"
          >
            <Close />
          </button>
        </div>
        <div className="aspect-[4/3] bg-oat sm:aspect-video">
          {loaded ? (
            <iframe
              src={links.virtualTour}
              title="Virtual tour of Family Veterinary Clinic (Google Street View)"
              className="size-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
