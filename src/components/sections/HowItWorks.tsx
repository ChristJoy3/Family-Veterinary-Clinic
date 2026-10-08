import { Arrow } from "@/components/icons";
import { steps } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            How it works
          </p>
          <h2 id="how-title" className="section-title mt-3" data-reveal>
            Visiting us is simple.
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const external = step.action.href.startsWith("http");
            return (
              <li key={step.title} className="card relative flex flex-col overflow-hidden p-7" data-reveal>
                <span aria-hidden="true" className="font-display text-6xl leading-none text-clay/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-[1rem] text-muted">{step.body}</p>
                <a
                  href={step.action.href}
                  {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  className="link mt-5 inline-flex items-center gap-1.5 text-[1rem]"
                >
                  {step.action.label} <Arrow size={16} />
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
