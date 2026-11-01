import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "~/content/artist";
import { projects } from "~/content/projects";

/**
 * /sitemap.xml — generated from the project catalogue at request time, so a new
 * project appears here the moment it is added to src/content/projects.ts.
 */

interface Entry {
  path: string;
  priority: string;
}

function buildSitemap(): string {
  const entries: Entry[] = [
    { path: "/", priority: "1.0" },
    { path: "/work", priority: "0.9" },
    { path: "/about", priority: "0.7" },
    { path: "/contact", priority: "0.6" },
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: "0.8" })),
  ];

  const urls = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${siteUrl}${entry.path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
