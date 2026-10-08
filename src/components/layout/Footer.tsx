import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "@/components/icons";
import { clinic, links, nav } from "@/content/site";
import { CurrentYear } from "./CurrentYear";

const quickLinks = [
  ...nav,
  { label: "Our Story", href: "/#story" },
  { label: "Forms", href: "/#forms" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-navy-deep text-ivory/85">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-ivory p-2">
              <Image src="/images/logo.png" alt="Family Veterinary Clinic logo" width={165} height={230} className="h-20 w-auto" />
            </div>
            <div>
              <p className="font-display text-2xl text-ivory">Family Veterinary Clinic</p>
              <p className="eyebrow mt-1">Since 1982</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-[1rem]">
            A full-service animal hospital serving {clinic.areas.slice(0, -1).join(", ")}, and {clinic.areas.at(-1)}, MD.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener"
              className="grid size-11 place-items-center rounded-full border border-ivory/25 hover:bg-ivory/10"
              aria-label="Family Veterinary Clinic on Facebook"
            >
              <Facebook />
            </a>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener"
              className="grid size-11 place-items-center rounded-full border border-ivory/25 hover:bg-ivory/10"
              aria-label="Family Veterinary Clinic on Instagram (@familyvetclinic)"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-periwinkle">Quick links</h2>
          <ul className="mt-5 grid gap-2.5 text-[1rem]">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-periwinkle">Hours</h2>
          <dl className="mt-5 grid gap-3 text-[1rem]">
            <div>
              <dt className="font-bold text-ivory">Monday–Friday</dt>
              <dd>Drop-offs 7:30–8:30am</dd>
              <dd>Appointments 9:00am–1:30pm, 2:00–6:30pm</dd>
            </div>
            <div>
              <dt className="font-bold text-ivory">Saturday</dt>
              <dd>Appointments 8:00am–1:00pm</dd>
            </div>
            <div>
              <dt className="font-bold text-ivory">Sunday</dt>
              <dd>Closed</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-periwinkle">Contact</h2>
          <address className="mt-5 grid gap-3 text-[1rem] not-italic">
            <p className="flex gap-3">
              <MapPin size={20} className="mt-1 shrink-0 text-periwinkle" />
              <span>
                {clinic.street}
                <br />
                {clinic.city}, {clinic.region} {clinic.postalCode}
              </span>
            </p>
            <a href={clinic.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone size={20} className="text-periwinkle" />
              {clinic.phone}
            </a>
            <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 break-all hover:text-white">
              <Mail size={20} className="shrink-0 text-periwinkle" />
              {clinic.email}
            </a>
          </address>
          <p className="mt-6 rounded-2xl border border-ivory/15 p-4 text-[0.9375rem]">
            After-hours emergencies: Anne Arundel Emergency Veterinary Clinic,{" "}
            <a href="tel:+14102240331" className="font-bold text-ivory underline">
              (410) 224-0331
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Family Veterinary Clinic <CurrentYear />
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/policies" className="hover:text-white hover:underline">
                Our Policies
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white hover:underline">
                Accessibility Statement
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
