import Image from "next/image";
import { Check } from "@/components/icons";
import { whyUs } from "@/content/site";

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow" data-reveal>
            Why Family Vet
          </p>
          <h2 id="why-title" className="section-title mt-3" data-reveal>
            Everything your pet needs, under one roof.
          </h2>
          <div className="arch relative mt-10 hidden aspect-[4/5] max-w-xs overflow-hidden lg:block" data-reveal>
            <Image
              src="/images/waiting-room.jpg"
              alt="A young dog waiting patiently in an armchair in the clinic lobby"
              fill
              sizes="20rem"
              className="object-cover object-[48%_60%]"
            />
          </div>
        </div>

        <div className="card overflow-hidden" data-reveal>
          <div className="flex items-center justify-between gap-4 bg-navy px-6 py-5 text-ivory sm:px-8">
            <span className="text-[0.9375rem] font-extrabold uppercase tracking-[0.14em]">What you get</span>
            <span className="font-display text-lg">Family Veterinary Clinic</span>
          </div>
          <ul>
            {whyUs.map((item) => (
              <li key={item} className="flex items-center justify-between gap-6 border-t border-oat px-6 py-5 first:border-t-0 sm:px-8">
                <span className="text-[1.0625rem] font-semibold text-navy">{item}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-terracotta text-white">
                  <Check size={20} strokeWidth={2.5} />
                  <span className="sr-only">Included</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
