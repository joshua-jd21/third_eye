import { CATEGORIES, type CategorySlug, type Project } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE PROJECT CATALOGUE
 *
 *  ORDERING: this array is the running order of the site. The first six
 *  projects (after the featured one) appear in the home page's Selected Work
 *  grid; every project appears in /work in the same order. To reorder, move
 *  the object — there is no separate sort key.
 *
 *  ADDING A PROJECT: copy one object below, give it a unique `slug`, drop its
 *  images into `public/images/projects/<slug>/`, and paste a Vimeo URL into
 *  `vimeoUrl`. Nothing else needs to change — routes, filters, prev/next and
 *  the sitemap are generated from this array.
 *
 *  Every field except slug / title / year / role / category / thumbnail /
 *  poster is optional. Empty optional fields hide their whole section on the
 *  project page rather than leaving an empty label behind.
 *
 *  All titles, descriptions and credits below are PLACEHOLDERS.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PROJECTS: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    year: "2024",
    role: "Director",
    category: "direction",
    featured: true,
    summary: "Placeholder summary — one line for listings.",
    thumbnail: {
      src: "/images/projects/project-one/thumbnail.svg",
      alt: "Project One — thumbnail (placeholder image)",
      width: 1600,
      height: 1200,
    },
    poster: {
      src: "/images/projects/project-one/poster.svg",
      alt: "Project One — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    hero: {
      src: "/images/featured/home-hero.svg",
      alt: "Project One — wide feature image (placeholder image)",
      width: 2400,
      height: 1350,
    },
    description:
      "Placeholder text. Replace with a short synopsis of the work — format, location, collaborators, and what it is about. Two or three sentences is usually enough; the images carry the rest.",
    // Paste a Vimeo URL here. Any of these work:
    //   https://vimeo.com/123456789
    //   https://vimeo.com/123456789/abcdef1234   (unlisted, keeps the hash)
    //   https://player.vimeo.com/video/123456789
    //   123456789
    vimeoUrl: "",
    stills: [
      {
        src: "/images/projects/project-one/still-01.svg",
        alt: "Project One — still one (placeholder image)",
        width: 2000,
        height: 1125,
        caption: "Still 01 — caption",
      },
      {
        src: "/images/projects/project-one/still-02.svg",
        alt: "Project One — still two (placeholder image)",
        width: 1400,
        height: 1750,
        caption: "Still 02 — caption",
      },
      {
        src: "/images/projects/project-one/still-03.svg",
        alt: "Project One — still three (placeholder image)",
        width: 2000,
        height: 1125,
        caption: "Still 03 — caption",
      },
    ],
    behindTheScenes: [
      {
        src: "/images/projects/project-one/bts-01.svg",
        alt: "Project One — behind the scenes, camera setup (placeholder image)",
        width: 1600,
        height: 1200,
        caption: "On set — caption",
      },
      {
        src: "/images/projects/project-one/bts-02.svg",
        alt: "Project One — behind the scenes, crew (placeholder image)",
        width: 1600,
        height: 1200,
        caption: "On set — caption",
      },
    ],
    credits: [
      { role: "Direction", name: "Placeholder Name" },
      { role: "Cinematography", name: "Placeholder Name" },
      { role: "Editing", name: "Placeholder Name" },
      { role: "Production", name: "Placeholder Company" },
    ],
    links: [{ label: "External link (placeholder)", href: "https://example.com" }],
  },
  {
    slug: "project-two",
    title: "Project Two",
    year: "2024",
    role: "Director of Photography",
    category: "cinematography",
    summary: "Placeholder summary — one line for listings.",
    thumbnail: {
      src: "/images/projects/project-two/thumbnail.svg",
      alt: "Project Two — thumbnail (placeholder image)",
      width: 1200,
      height: 1500,
    },
    poster: {
      src: "/images/projects/project-two/poster.svg",
      alt: "Project Two — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    description:
      "Placeholder text. Replace with a short synopsis of the work, the format it was shot in, and the collaborators involved.",
    vimeoUrl: "",
    stills: [
      {
        src: "/images/projects/project-two/still-01.svg",
        alt: "Project Two — still one (placeholder image)",
        width: 2000,
        height: 1125,
        caption: "Still 01 — caption",
      },
      {
        src: "/images/projects/project-two/still-02.svg",
        alt: "Project Two — still two (placeholder image)",
        width: 2000,
        height: 1125,
        caption: "Still 02 — caption",
      },
    ],
    credits: [
      { role: "Cinematography", name: "Placeholder Name" },
      { role: "Direction", name: "Placeholder Name" },
    ],
  },
  {
    slug: "project-three",
    title: "Project Three",
    year: "2023",
    role: "Director",
    category: "film",
    thumbnail: {
      src: "/images/projects/project-three/thumbnail.svg",
      alt: "Project Three — thumbnail (placeholder image)",
      width: 1600,
      height: 1067,
    },
    poster: {
      src: "/images/projects/project-three/poster.svg",
      alt: "Project Three — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
  {
    slug: "project-four",
    title: "Project Four",
    year: "2023",
    role: "Director",
    category: "commercial",
    thumbnail: {
      src: "/images/projects/project-four/thumbnail.svg",
      alt: "Project Four — thumbnail (placeholder image)",
      width: 1600,
      height: 1067,
    },
    poster: {
      src: "/images/projects/project-four/poster.svg",
      alt: "Project Four — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
  {
    slug: "project-five",
    title: "Project Five",
    year: "2022",
    role: "Director of Photography",
    category: "music-video",
    thumbnail: {
      src: "/images/projects/project-five/thumbnail.svg",
      alt: "Project Five — thumbnail (placeholder image)",
      width: 1200,
      height: 1500,
    },
    poster: {
      src: "/images/projects/project-five/poster.svg",
      alt: "Project Five — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
  {
    slug: "project-six",
    title: "Project Six",
    year: "2022",
    role: "Photographer",
    category: "photography",
    thumbnail: {
      src: "/images/projects/project-six/thumbnail.svg",
      alt: "Project Six — thumbnail (placeholder image)",
      width: 1200,
      height: 1500,
    },
    poster: {
      src: "/images/projects/project-six/poster.svg",
      alt: "Project Six — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
  {
    slug: "project-seven",
    title: "Project Seven",
    year: "2021",
    role: "Artist",
    category: "visual-art",
    thumbnail: {
      src: "/images/projects/project-seven/thumbnail.svg",
      alt: "Project Seven — thumbnail (placeholder image)",
      width: 1600,
      height: 1067,
    },
    poster: {
      src: "/images/projects/project-seven/poster.svg",
      alt: "Project Seven — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
  {
    slug: "project-eight",
    title: "Project Eight",
    year: "2021",
    role: "Director",
    category: "other",
    thumbnail: {
      src: "/images/projects/project-eight/thumbnail.svg",
      alt: "Project Eight — thumbnail (placeholder image)",
      width: 1600,
      height: 1200,
    },
    poster: {
      src: "/images/projects/project-eight/poster.svg",
      alt: "Project Eight — poster (placeholder image)",
      width: 2400,
      height: 1350,
    },
    vimeoUrl: "",
  },
];

/** The catalogue, in running order. Import this, never a copy of it. */
export const projects: readonly Project[] = PROJECTS;

/** Number of entries shown in the home page Selected Work grid. */
export const SELECTED_WORK_COUNT = 6;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** The home page feature. Falls back to the first project if none is flagged. */
export function getFeaturedProject(): Project {
  return PROJECTS.find((project) => project.featured) ?? PROJECTS[0];
}

/** Home page Selected Work: catalogue order, featured project excluded. */
export function getSelectedWork(): Project[] {
  const featured = getFeaturedProject();
  return PROJECTS.filter((project) => project.slug !== featured.slug).slice(0, SELECTED_WORK_COUNT);
}

/** Previous / next in catalogue order, wrapping at the ends. */
export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const count = PROJECTS.length;
  return {
    previous: PROJECTS[(index - 1 + count) % count],
    next: PROJECTS[(index + 1) % count],
  };
}

/** Filter value used by the /work page for "no filter". */
export const ALL_CATEGORIES = "all";

export interface CategoryFacet {
  slug: CategorySlug;
  label: string;
  count: number;
}

/** Only the categories that actually have projects, in the canonical order. */
export function getCategoryFacets(): CategoryFacet[] {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
    label: category.label,
    count: PROJECTS.filter((project) => project.category === category.slug).length,
  })).filter((facet) => facet.count > 0);
}

/** Projects for one category slug, or the whole catalogue when slug is null. */
export function getProjectsByCategory(slug: CategorySlug | null): Project[] {
  if (!slug) return [...PROJECTS];
  return PROJECTS.filter((project) => project.category === slug);
}

/** Narrow an arbitrary string to a known category slug. */
export function toCategorySlug(value: unknown): CategorySlug | null {
  if (typeof value !== "string") return null;
  const match = CATEGORIES.find((category) => category.slug === value);
  return match ? match.slug : null;
}
