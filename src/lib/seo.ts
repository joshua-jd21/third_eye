import { artist, siteUrl } from "~/content/artist";

/**
 * Per-page SEO tags.
 *
 * Every route calls this from its `head()` so titles, descriptions, canonical
 * URLs and sharing images are never hand-written in more than one place.
 */
export interface PageHeadOptions {
  /** Page title. The artist's name is appended automatically. */
  title: string;
  description: string;
  /** Path from the site root, e.g. `/work/project-one`. */
  path: string;
  /** Absolute path or URL of the sharing image. */
  image?: string;
  type?: "website" | "article";
}

/** Default sharing image, used when a page has nothing better of its own. */
export const DEFAULT_SHARE_IMAGE = "/images/featured/home-hero.svg";

function absolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, siteUrl).toString();
}

export function pageHead({ title, description, path, image, type = "website" }: PageHeadOptions) {
  const url = absolute(path);
  const shareImage = absolute(image ?? DEFAULT_SHARE_IMAGE);
  const fullTitle = title.includes(artist.name) ? title : `${title} — ${artist.name}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: artist.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: shareImage },
      { property: "og:image:alt", content: `${artist.name} — ${title}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: shareImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
