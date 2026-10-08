import Image from "next/image";
import { links } from "@/content/site";

export function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first" data-reveal>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            <Image
              src="/images/girl-with-dog.jpg"
              alt="A young girl hugging a senior brown dog on a rug at home"
              fill
              sizes="(min-width: 1024px) 36rem, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-6 hidden size-36 overflow-hidden rounded-full border-[6px] border-ivory shadow-[var(--shadow-soft)] sm:block">
            <Image
              src="/images/waiting-room.jpg"
              alt="A dog sitting in an armchair in the clinic’s waiting room"
              fill
              sizes="9rem"
              className="object-cover object-[50%_60%]"
            />
          </div>
        </div>

        <div>
          <p className="eyebrow" data-reveal>
            About us
          </p>
          <h2 id="welcome-title" className="section-title mt-3" data-reveal>
            Family Veterinary Clinic welcomes you.
          </h2>
          <p className="mt-6 text-muted" data-reveal>
            We are a full-service animal hospital providing comprehensive healthcare to pets in Crofton, Gambrills, Bowie,
            Odenton, and Waugh Chapel. Our veterinarians offer a wide variety of medical, surgical, and dental services,
            all in our clinic. We focus on wellness and prevention, as well as care for when pets are sick.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5" data-reveal>
            <a href="#team" className="btn btn-secondary">
              Meet our team
            </a>
            <a
              href={links.catFriendly}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 rounded-2xl pr-2"
              aria-label="Cat Friendly Veterinarian, American Association of Feline Practitioners (opens in a new tab)"
            >
              <Image
                src="/images/cat-friendly-veterinarian.png"
                alt=""
                width={320}
                height={129}
                className="h-16 w-auto"
              />
              <span className="text-[0.9375rem] font-bold leading-tight text-navy">
                Cat Friendly
                <br />
                Veterinarian (AAFP)
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
