import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/articles";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const OLD_SITE = "https://www.familyveterinaryclinic.com/";

/** Old-site article links become local routes; everything else opens externally. */
function localize(href: string) {
  if (href.startsWith(`${OLD_SITE}contact-us`)) return "/#contact";
  if (href.startsWith(OLD_SITE) && href.endsWith(".pml")) {
    return `/resources/${href.slice(OLD_SITE.length, -4)}`;
  }
  return href;
}

function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    out.push(text.slice(last, m.index));
    const href = localize(m[2]);
    const external = href.startsWith("http");
    out.push(
      <a key={m.index} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {m[1]}
      </a>,
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

function youtubeId(src: string) {
  return src.match(/embed\/+([\w-]{6,})/)?.[1] ?? null;
}

/** Renders migrated blocks, grouping consecutive list items into one list. */
export function RichText({ blocks, title }: { blocks: Block[]; title: string }) {
  const groups: (Block | Block[])[] = [];
  for (const b of blocks) {
    const prev = groups.at(-1);
    if (b.t === "li") {
      if (Array.isArray(prev)) prev.push(b);
      else groups.push([b]);
    } else groups.push(b);
  }

  return (
    <div className="prose-article">
      {groups.map((g, i) => {
        if (Array.isArray(g)) {
          return (
            <ul key={i} className="list-none">
              {g.map((li, j) => (
                <li key={j} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:size-2 before:rounded-full before:bg-clay">
                  <Inline text={"text" in li ? li.text : ""} />
                </li>
              ))}
            </ul>
          );
        }
        switch (g.t) {
          case "h":
            return (
              <h2 key={i}>
                <Inline text={g.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Inline text={g.text} />
              </h3>
            );
          case "video": {
            const id = youtubeId(g.src);
            const prevHeading = groups[i - 1];
            const label = !Array.isArray(prevHeading) && prevHeading && "text" in prevHeading ? prevHeading.text : title;
            return id ? (
              <div key={i} className="mb-8 aspect-video overflow-hidden rounded-[var(--radius-card)] bg-navy">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={`Video: ${label}`}
                  className="size-full"
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null;
          }
          default:
            return (
              <Fragment key={i}>
                <p>
                  <Inline text={g.text} />
                </p>
              </Fragment>
            );
        }
      })}
    </div>
  );
}
