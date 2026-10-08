"use client";

import { useRef, useState, type FormEvent } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "@/components/icons";
import { clinic, links } from "@/content/site";

const petTypes = ["Dog", "Cat", "Other"];
const reasons = ["Wellness", "Sick visit", "Surgery", "Dental", "Refill", "Other"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 text-[0.9375rem] font-semibold text-alert">
      {message}
    </p>
  ) : null;
}

/**
 * There is no form backend yet, so a valid submission opens the visitor's
 * email app with the message pre-filled to the clinic's inbox.
 */
export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!value("name")) next.name = "Please enter your name.";
    if (!value("email")) next.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(value("email"))) next.email = "Please enter a valid email address, like name@example.com.";
    if (!value("message")) next.message = "Please enter a message.";
    setErrors(next);
    setSent(false);

    const firstInvalid = (["name", "email", "message"] as const).find((k) => next[k]);
    if (firstInvalid) {
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const lines = [`Name: ${value("name")}`, `Email: ${value("email")}`];
    if (value("phone")) lines.push(`Phone: ${value("phone")}`);
    if (value("pet")) lines.push(`Pet name: ${value("pet")}`);
    if (value("petType")) lines.push(`Pet type: ${value("petType")}`);
    const picked = data.getAll("reason");
    if (picked.length) lines.push(`Reason: ${picked.join(", ")}`);
    lines.push("", value("message"));
    const subject = `Website inquiry from ${value("name")}`;
    window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const describedBy = (k: keyof Errors) => (errors[k] ? `${k}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow" data-reveal>
            Contact
          </p>
          <h2 id="contact-title" className="section-title mt-3" data-reveal>
            We’d love to meet your pet.
          </h2>
          <address className="mt-8 grid gap-4 not-italic" data-reveal>
            <p className="flex gap-3">
              <MapPin size={22} className="mt-1 shrink-0 text-terracotta" />
              <span>
                <strong className="block text-navy">Family Veterinary Clinic</strong>
                {clinic.street}, {clinic.city}, {clinic.region} {clinic.postalCode}
                <br />
                <a href={links.directions} target="_blank" rel="noopener" className="link text-[1rem]">
                  Get directions
                </a>
              </span>
            </p>
            <a href={clinic.phoneHref} className="flex items-center gap-3 font-bold text-navy hover:underline">
              <Phone size={22} className="text-terracotta" /> {clinic.phone}
            </a>
            <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 break-all font-bold text-navy hover:underline">
              <Mail size={22} className="shrink-0 text-terracotta" /> {clinic.email}
            </a>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={links.facebook} target="_blank" rel="noopener" className="chip">
                <Facebook size={18} /> FamilyVeterinaryClinic
              </a>
              <a href={links.instagram} target="_blank" rel="noopener" className="chip">
                <Instagram size={18} /> @familyvetclinic
              </a>
            </div>
          </address>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]" data-reveal>
            <iframe
              src={links.map}
              title="Map showing Family Veterinary Clinic at 1413 Defense Hwy, Gambrills, MD"
              className="h-72 w-full [filter:grayscale(0.35)_sepia(0.18)_saturate(0.9)_contrast(0.98)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form ref={form} noValidate onSubmit={onSubmit} className="card p-6 sm:p-10" data-reveal aria-describedby="form-note">
          <p id="form-note" className="text-[0.9375rem] text-muted">
            Fields marked <span aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required. For emergencies, please call us instead.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-bold text-navy">
                Name <span aria-hidden="true">*</span>
              </label>
              <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className="field" />
              <FieldError id="name-error" message={errors.name} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-bold text-navy">
                Email <span aria-hidden="true">*</span>
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className="field" />
              <FieldError id="email-error" message={errors.email} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block font-bold text-navy">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
            </div>
            <div>
              <label htmlFor="pet" className="mb-1.5 block font-bold text-navy">
                Pet name
              </label>
              <input id="pet" name="pet" className="field" />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-2 font-bold text-navy">Pet type</legend>
            <div className="flex flex-wrap gap-2">
              {petTypes.map((t) => (
                <label key={t}>
                  <input type="radio" name="petType" value={t} className="peer sr-only" />
                  <span className="chip">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="mb-2 font-bold text-navy">Reason for contacting us</legend>
            <div className="flex flex-wrap gap-2">
              {reasons.map((r) => (
                <label key={r}>
                  <input type="checkbox" name="reason" value={r} className="peer sr-only" />
                  <span className="chip">{r}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="message" className="mb-1.5 block font-bold text-navy">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-invalid={!!errors.message}
              aria-describedby={describedBy("message")}
              className="field resize-y"
            />
            <FieldError id="message-error" message={errors.message} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
            <p className="text-[0.9375rem] text-muted">This opens your email app with your message ready to send.</p>
          </div>
          <p role="status" className="mt-4 font-semibold text-navy">
            {sent ? "Thanks! Your email app should open with your message. If it doesn’t, email us at info@familyveterinaryclinic.com." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
