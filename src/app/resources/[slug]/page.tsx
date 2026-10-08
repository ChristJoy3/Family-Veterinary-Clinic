import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { ArrowLeft, Phone } from "@/components/icons";
import { allContentSlugs, articles, getContentPage } from "@/content/articles";
import { clinic, links } from "@/content/site";

export function generateStaticParams() {
  return allContentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getContentPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.excerpt || `${page.title} from Family Veterinary Clinic in Crofton & Gambrills, MD.`,
    alternates: { canonical: `/resources/${slug}` },
  };
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const page = getContentPage(slug);
  if (!page) notFound();

  const related = page.category
    ? articles.filter((a) => a.category === page.category && a.slug !== page.slug).slice(0, 3)
    : [];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article className="container-x max-w-3xl py-14 lg:py-20">
        <Link href="/#resources" className="link inline-flex items-center gap-2 text-[1rem]">
          <ArrowLeft size={18} /> All resources
        </Link>
        <p className="eyebrow mt-10">{page.category ?? "Resources"}</p>
        <h1 className="mt-3 text-[clamp(2.25rem,1.5rem+3vw,3.5rem)]">{page.title}</h1>
        <div className="mt-10">
          <RichText blocks={page.body} title={page.title} />
        </div>

        <aside className="card on-dark mt-14 flex flex-col gap-5 bg-navy p-8 text-ivory sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl text-ivory">Questions about your pet?</p>
          <div className="flex flex-wrap gap-3">
            <a href={links.appointment} target="_blank" rel="noopener" className="btn btn-primary">
              Request Appointment
            </a>
            <a href={clinic.phoneHref} className="btn btn-ghost-light">
              <Phone size={18} /> {clinic.phone}
            </a>
          </div>
        </aside>

        {related.length ? (
          <nav aria-labelledby="related-title" className="mt-14">
            <h2 id="related-title" className="text-2xl">
              More in {page.category}
            </h2>
            <ul className="mt-5 grid gap-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link href={`/resources/${a.slug}`} className="link text-[1.0625rem]">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
    </main>
  );
}
