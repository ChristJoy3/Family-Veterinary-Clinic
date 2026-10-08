import Image from "next/image";
import { Paw } from "@/components/icons";
import { clinicPhotos } from "@/content/site";
import { VirtualTour } from "./VirtualTour";

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label.replace(/[[\]]/g, "")}
      className={`grid place-items-center rounded-[var(--radius-card)] border-2 border-dashed border-navy/15 bg-mist/60 text-center ${className}`}
    >
      <span className="flex flex-col items-center gap-2 px-4 text-[0.9375rem] font-bold text-navy/60">
        <Paw size={28} className="text-navy/30" />
        {label}
      </span>
    </div>
  );
}

export function Clinic() {
  const [waiting, exam, cat, dog] = clinicPhotos;
  return (
    <section id="clinic" aria-labelledby="clinic-title" className="bg-oat py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow" data-reveal>
            Inside the clinic
          </p>
          <h2 id="clinic-title" className="section-title mt-3" data-reveal>
            A state-of-the-art clinic that feels like home.
          </h2>
          <p className="mt-6 text-muted" data-reveal>
            Our state-of-the-art facility sits in an inviting home setting. We have a full in-house lab, a dedicated
            dental suite, heated recovery cages, surgical facilities, and a dedicated staff.
          </p>
          <div className="mt-8" data-reveal>
            <VirtualTour />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 sm:gap-4">
          <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]" data-reveal>
            <Image src={waiting.src} alt={waiting.alt} fill sizes="(min-width: 1024px) 28rem, 60vw" className="object-cover" />
          </div>
          <div className="arch relative col-span-2 overflow-hidden" data-reveal>
            <Image src={exam.src} alt={exam.alt} fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover object-[60%_30%]" />
          </div>
          <Placeholder label="[Clinic exterior photo]" className="col-span-2 aspect-square" />
          <div className="relative col-span-2 aspect-square overflow-hidden rounded-full" data-reveal>
            <Image src={cat.src} alt={cat.alt} fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover object-[48%_40%]" />
          </div>
          <div className="relative col-span-2 aspect-square overflow-hidden rounded-[var(--radius-card)]" data-reveal>
            <Image src={dog.src} alt={dog.alt} fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover object-[55%_50%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
