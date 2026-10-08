import Image from "next/image";
import { Paw, Phone, Pill, Refill } from "@/components/icons";
import { clinic, links } from "@/content/site";

export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-oat/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-mist/70 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow" data-reveal>
            Crofton &amp; Gambrills, MD <span aria-hidden="true">•</span> Since 1982
          </p>
          <h1 id="hero-title" className="mt-5 text-[clamp(2.6rem,1.3rem+4.6vw,4.75rem)] leading-[1.02]">
            <span data-hero-line className="block overflow-hidden pb-[0.1em]">
              <span>Compassionate</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-[0.1em]">
              <span>care for your</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-[0.1em]">
              <span>
                <em className="text-terracotta">other</em> children.
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.1875rem] text-muted" data-reveal>
            We are committed to providing compassionate, high-quality, and effective care for you and your pet in our
            state-of-the-art facility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a href={links.appointment} target="_blank" rel="noopener" className="btn btn-primary">
              Request Appointment
            </a>
            <a href={clinic.phoneHref} className="btn btn-secondary">
              <Phone size={18} /> Call {clinic.phone}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" data-reveal>
            <a href={links.pharmacy} target="_blank" rel="noopener" className="btn btn-sm">
              <Pill size={18} className="text-terracotta" /> Online Pharmacy
            </a>
            <a href={links.refill} target="_blank" rel="noopener" className="btn btn-sm">
              <Refill size={18} className="text-terracotta" /> Request a Refill
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem]" data-reveal>
          <div className="arch relative aspect-[4/5] overflow-hidden bg-oat shadow-[var(--shadow-lift)]">
            <Image
              src="/images/exam-room.jpg"
              alt="A Family Veterinary Clinic veterinarian listening to a Boston terrier’s heart in an exam room"
              fill
              preload
              sizes="(min-width: 1024px) 30rem, 90vw"
              className="kenburns object-cover object-[50%_30%]"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 size-32 overflow-hidden rounded-full border-[6px] border-ivory shadow-[var(--shadow-soft)] sm:-left-10 sm:size-40">
            <Image
              src="/images/cat-with-train.jpg"
              alt="A tuxedo cat relaxing at home"
              fill
              sizes="10rem"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div className="card absolute -right-2 top-10 hidden items-center gap-3 px-4 py-3 sm:flex">
            <span className="grid size-10 place-items-center rounded-full bg-mist text-navy">
              <Paw size={20} />
            </span>
            <span className="text-[0.9375rem] font-bold leading-tight text-navy">
              Family-owned
              <br />
              <span className="font-semibold text-muted">since 1982</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
