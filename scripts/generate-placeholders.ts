/**
 * Generates the SVG placeholder images that ship with this repository.
 *
 *   bun run scripts/generate-placeholders.ts
 *
 * Every placeholder is a light grey field with a hairline border, the file's
 * label and its exact pixel dimensions, so the layout is complete before the
 * artist's photographs arrive. Replace each file with a real image of the same
 * aspect ratio (same file name, same folder) and update width/height/alt in
 * src/content/.
 *
 * Nothing here is stock photography and nothing is a generated film still:
 * these are honest, clearly labelled plates.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

interface Spec {
  /** Path under public/. */
  path: string;
  width: number;
  height: number;
  label: string;
}

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const PROJECTS = [
  { slug: "project-one", title: "Project One", thumb: [1600, 1200] },
  { slug: "project-two", title: "Project Two", thumb: [1200, 1500] },
  { slug: "project-three", title: "Project Three", thumb: [1600, 1067] },
  { slug: "project-four", title: "Project Four", thumb: [1600, 1067] },
  { slug: "project-five", title: "Project Five", thumb: [1200, 1500] },
  { slug: "project-six", title: "Project Six", thumb: [1200, 1500] },
  { slug: "project-seven", title: "Project Seven", thumb: [1600, 1067] },
  { slug: "project-eight", title: "Project Eight", thumb: [1600, 1200] },
] as const;

const ARCHIVE = [
  [1600, 1067],
  [1400, 1750],
  [1400, 1750],
  [1600, 900],
  [1600, 1067],
  [1200, 1200],
] as const;

function ratioLabel(width: number, height: number): string {
  const ratio = width / height;
  if (Math.abs(ratio - 2.39) < 0.02) return "2.39:1";
  if (Math.abs(ratio - 16 / 9) < 0.02) return "16:9";
  if (Math.abs(ratio - 4 / 3) < 0.02) return "4:3";
  if (Math.abs(ratio - 3 / 2) < 0.02) return "3:2";
  if (Math.abs(ratio - 4 / 5) < 0.02) return "4:5";
  if (Math.abs(ratio - 3 / 4) < 0.02) return "3:4";
  if (Math.abs(ratio - 1) < 0.02) return "1:1";
  if (Math.abs(ratio - 1.25) < 0.02) return "5:4";
  if (Math.abs(ratio - 1.5) < 0.02) return "3:2";
  return `${width}×${height}`;
}

const specs: Spec[] = [
  {
    path: "images/artist/portrait.svg",
    width: 1200,
    height: 1500,
    label: "Portrait",
  },
  {
    path: "images/featured/home-hero.svg",
    width: 2400,
    height: 1350,
    label: "Featured — Home Hero",
  },
  ...PROJECTS.flatMap((project) => [
    {
      path: `images/projects/${project.slug}/thumbnail.svg`,
      width: project.thumb[0],
      height: project.thumb[1],
      label: `${project.title} — Thumbnail`,
    },
    {
      path: `images/projects/${project.slug}/poster.svg`,
      width: 2400,
      height: 1350,
      label: `${project.title} — Poster`,
    },
  ]),
  ...[
    ["still-01", 2000, 1125, "Still 01"],
    ["still-02", 1400, 1750, "Still 02"],
    ["still-03", 2000, 1125, "Still 03"],
    ["bts-01", 1600, 1200, "On Set 01"],
    ["bts-02", 1600, 1200, "On Set 02"],
  ].map(([name, width, height, label]) => ({
    path: `images/projects/project-one/${name}.svg`,
    width: width as number,
    height: height as number,
    label: `Project One — ${label as string}`,
  })),
  ...[
    ["still-01", 2000, 1125, "Still 01"],
    ["still-02", 2000, 1125, "Still 02"],
  ].map(([name, width, height, label]) => ({
    path: `images/projects/project-two/${name}.svg`,
    width: width as number,
    height: height as number,
    label: `Project Two — ${label as string}`,
  })),
  ...ARCHIVE.map(([width, height], index) => ({
    path: `images/archive/archive-${String(index + 1).padStart(2, "0")}.svg`,
    width,
    height,
    label: `Archive ${String(index + 1).padStart(2, "0")}`,
  })),
];

function svg(spec: Spec): string {
  const { width, height, label } = spec;
  const titleSize = Math.round(Math.max(14, Math.min(width, height) * 0.028));
  const metaSize = Math.round(titleSize * 0.68);
  const tracking = Math.round(titleSize * 0.12);
  const gap = Math.round(titleSize * 1.5);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label} placeholder">
  <rect width="${width}" height="${height}" fill="#E9E9E7"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="#D6D6D2" stroke-width="1"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" text-anchor="middle" fill="#8A8A86">
    <text x="${width / 2}" y="${height / 2 + titleSize / 3}" font-size="${titleSize}" letter-spacing="${tracking}" font-weight="500">${label.toUpperCase()}</text>
    <text x="${width / 2}" y="${height / 2 + titleSize / 3 + gap}" font-size="${metaSize}" letter-spacing="${Math.round(metaSize * 0.1)}">${width} × ${height} · ${ratioLabel(width, height)}</text>
  </g>
</svg>
`;
}

let written = 0;
for (const spec of specs) {
  const target = join(PUBLIC_DIR, spec.path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, svg(spec), "utf8");
  written += 1;
}

console.log(`Wrote ${written} placeholder images to public/images/`);
