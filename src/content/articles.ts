import articlesJson from "./articles.json";
import resourcePagesJson from "./resource-pages.json";

/** Content migrated from the old site. Inline links are kept as `[text](url)`. */
export type Block =
  | { t: "h" | "h3" | "p" | "li"; text: string }
  | { t: "video"; src: string };

export type ContentPage = {
  slug: string;
  title: string;
  excerpt: string;
  body: Block[];
  sourceUrl: string;
};

export type Article = ContentPage & { category: string };

export const articles = articlesJson as Article[];
export const resourcePages = resourcePagesJson as ContentPage[];

export const articleCategories = Array.from(new Set(articles.map((a) => a.category)));

export function getContentPage(slug: string): (ContentPage & { category?: string }) | undefined {
  return articles.find((a) => a.slug === slug) ?? resourcePages.find((p) => p.slug === slug);
}

export const allContentSlugs = [...articles, ...resourcePages].map((p) => p.slug);
