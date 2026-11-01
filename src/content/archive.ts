import type { ArchiveImage } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VISUAL ARCHIVE
 *
 *  ORDERING: array order is the running order. The home page composes these
 *  images into a fixed editorial rhythm (wide, narrow, offset), so keep the
 *  list between four and eight entries for the best result. Every caption and
 *  image below is a PLACEHOLDER.
 *
 *  Images live in `public/images/archive/`. Mixed aspect ratios are welcome —
 *  each image keeps its own ratio and the grid accommodates it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const archive: readonly ArchiveImage[] = [
  {
    src: "/images/archive/archive-01.svg",
    alt: "Archive image one (placeholder image)",
    width: 1600,
    height: 1067,
    caption: "Archive caption",
    year: "2024",
  },
  {
    src: "/images/archive/archive-02.svg",
    alt: "Archive image two (placeholder image)",
    width: 1400,
    height: 1750,
    caption: "Archive caption",
    year: "2023",
  },
  {
    src: "/images/archive/archive-03.svg",
    alt: "Archive image three (placeholder image)",
    width: 1400,
    height: 1750,
    caption: "Archive caption",
    year: "2023",
  },
  {
    src: "/images/archive/archive-04.svg",
    alt: "Archive image four (placeholder image)",
    width: 1600,
    height: 900,
    caption: "Archive caption",
    year: "2022",
  },
  {
    src: "/images/archive/archive-05.svg",
    alt: "Archive image five (placeholder image)",
    width: 1600,
    height: 1067,
    caption: "Archive caption",
    year: "2021",
  },
  {
    src: "/images/archive/archive-06.svg",
    alt: "Archive image six (placeholder image)",
    width: 1200,
    height: 1200,
    caption: "Archive caption",
    year: "2021",
  },
];
