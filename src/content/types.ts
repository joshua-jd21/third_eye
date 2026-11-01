/**
 * Shared content types.
 *
 * Everything the site renders comes from `src/content/`. Components never
 * hard-code a title, a path, a credit or a link.
 */

/** A single image file plus the metadata the layout needs. */
export interface ImageAsset {
  /** Path from the public folder, e.g. `/images/projects/project-one/poster.svg`. */
  src: string;
  /** Descriptive alt text. Required — an empty alt is a deliberate choice, not an oversight. */
  alt: string;
  /** Intrinsic pixel width of the file. Reserves space, prevents layout shift. */
  width: number;
  /** Intrinsic pixel height of the file. */
  height: number;
  /** Optional short caption shown under the image (stills, archive). */
  caption?: string;
}

/** Project categories. `slug` is what appears in `?category=` URLs. */
export const CATEGORIES = [
  { slug: "direction", label: "Direction" },
  { slug: "cinematography", label: "Cinematography" },
  { slug: "film", label: "Film" },
  { slug: "commercial", label: "Commercial" },
  { slug: "music-video", label: "Music Video" },
  { slug: "photography", label: "Photography" },
  { slug: "visual-art", label: "Visual Art" },
  { slug: "other", label: "Other" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

/** Human-readable label for a category slug. */
export function categoryLabel(slug: CategorySlug): string {
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}

/** A role / name pair used in project and artist credits. */
export interface Credit {
  role: string;
  name: string;
}

/** An outbound link on a project page. */
export interface ProjectLink {
  label: string;
  href: string;
}

/** A social or contact link in the artist config. */
export interface SocialLink {
  label: string;
  href: string;
}

/** One entry in the project catalogue. */
export interface Project {
  /** URL segment: `/work/<slug>`. Lowercase, hyphenated, never reused. */
  slug: string;
  title: string;
  /** Free text so "2024" or "2024–25" both work. */
  year: string;
  /** The artist's role on the project, e.g. "Director" or "Director of Photography". */
  role: string;
  category: CategorySlug;
  /** Grid / list image. */
  thumbnail: ImageAsset;
  /** Main image on the project page and the fallback poster for the video. */
  poster: ImageAsset;
  /** Optional ultra-wide crop used by the home page feature band. Falls back to `poster`. */
  hero?: ImageAsset;
  /** One line shown in listings. Optional. */
  summary?: string;
  /** Long description. Optional — the section is hidden when absent. */
  description?: string;
  /** Vimeo URL or bare video id. Empty string = no video, poster only. */
  vimeoUrl?: string;
  stills?: ImageAsset[];
  behindTheScenes?: ImageAsset[];
  credits?: Credit[];
  links?: ProjectLink[];
  /** The project shown in the home page feature band. Only the first match is used. */
  featured?: boolean;
}

/** One image in the visual archive. */
export interface ArchiveImage extends ImageAsset {
  caption: string;
  year: string;
}
