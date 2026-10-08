import { Arrow, Doc } from "@/components/icons";
import { forms } from "@/content/site";

export function Forms() {
  return (
    <section id="forms" aria-labelledby="forms-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Forms
          </p>
          <h2 id="forms-title" className="section-title mt-3" data-reveal>
            Save time before your visit.
          </h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((f) => (
            <li key={f.title} data-reveal>
              <a
                href={f.href}
                target="_blank"
                rel="noopener"
                className="card group flex h-full items-center gap-5 p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mist text-navy transition-colors group-hover:bg-navy group-hover:text-ivory">
                  <Doc size={26} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl text-navy">{f.title}</span>
                  <span className="block text-[0.9375rem] text-muted">{f.body}</span>
                </span>
                <Arrow size={20} className="shrink-0 text-terracotta transition-transform group-hover:translate-x-1" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
