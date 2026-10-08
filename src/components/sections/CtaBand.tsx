import { Paw, Phone } from "@/components/icons";
import { clinic, links } from "@/content/site";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-navy py-20 text-center text-ivory lg:py-28">
      <Paw aria-hidden="true" size={220} className="absolute -left-10 top-6 -rotate-12 text-white/[0.04]" />
      <Paw aria-hidden="true" size={160} className="absolute -right-6 bottom-4 rotate-12 text-white/[0.04]" />
      <div className="container-x relative">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-[clamp(2.4rem,1.5rem+3.6vw,4.25rem)] text-ivory" data-reveal>
          Bring your family to ours.
        </h2>
        <div className="mt-10 flex flex-col items-center gap-5" data-reveal>
          <a href={links.appointment} target="_blank" rel="noopener" className="btn btn-primary px-8 text-lg">
            Request Appointment
          </a>
          <a href={clinic.phoneHref} className="inline-flex items-center gap-2 text-lg font-bold text-ivory/90 hover:text-white">
            <Phone size={20} className="text-periwinkle" /> {clinic.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
