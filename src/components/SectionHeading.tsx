import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 id={id} className="section-title mt-3" data-reveal>
        {title}
      </h2>
      {intro ? (
        <div className="mt-5 text-muted on-dark:text-ivory/80" data-reveal>
          {intro}
        </div>
      ) : null}
    </div>
  );
}
