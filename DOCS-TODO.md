# Documentation still to write

The site is built and published. Two handover documents are still owed (follow-up
delegation). They must cover:

## README.md

- What the site is, and the one-line workflow: replace images in `public/images/`,
  edit `src/content/`, paste Vimeo URLs, `bun run publish`.
- Local commands: `bun install`, `bun run dev`, `bun run build`, `bun run publish`.
- Where content lives: `src/content/artist.ts`, `projects.ts`, `archive.ts`, `types.ts`.
- Ordering rule: the `projects` array is the running order everywhere; the home page
  shows the first six projects (excluding the one flagged `featured`); `/work` shows
  all of them in the same order. `archive` array order is the visual-archive order.
- Adding a project: copy an object in `projects.ts`, unique `slug`, images into
  `public/images/projects/<slug>/`, then `/work/<slug>` exists automatically, appears
  in `/work`, in prev/next and in `/sitemap.xml`.
- Vimeo: paste a URL into `vimeoUrl`; accepted formats; empty string = poster only.
- Known caveats: social sharing images are SVG placeholders (most social platforms
  only render JPG/PNG — replace with a real JPG at 1200×630 when going live);
  `siteUrl` in `src/content/artist.ts` must be updated when the custom domain lands.

## MEDIA-GUIDE.md

- Folder map: `public/images/artist/`, `featured/`, `projects/<slug>/`, `photography/`,
  `archive/` (note: `photography/` is reserved and currently unused — the archive
  section reads from `archive/`).
- Exact file names, aspect ratios and pixel sizes each placeholder expects
  (`scripts/generate-placeholders.ts` is the source of truth; it can be re-run to
  restore a deleted placeholder).
- Replace file-for-file, then update `width`, `height` and `alt` in the config.
- The home Selected Work grid crops thumbnails to fixed shapes (4:5 / 3:2 per slot,
  `object-cover`), so keep subjects away from the edges; the archive crops to its own
  slot rhythm.
- Vimeo privacy: embedding must be allowed for the live domain
  (video settings → Privacy → Where can this be embedded), otherwise the player shows
  an error. Unlisted videos keep their `?h=` hash — paste the full URL.
- Alt text: required for every image; describe the image, not the project title.
