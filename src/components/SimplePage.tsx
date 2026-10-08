import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "@/components/icons";

export function SimplePage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article className="container-x max-w-3xl py-14 lg:py-20">
        <Link href="/" className="link inline-flex items-center gap-2 text-[1rem]">
          <ArrowLeft size={18} /> Home
        </Link>
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="mt-3 text-[clamp(2.25rem,1.5rem+3vw,3.5rem)]">{title}</h1>
        <div className="prose-article mt-10">{children}</div>
      </article>
    </main>
  );
}
