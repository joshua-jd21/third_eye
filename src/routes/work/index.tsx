import { Link, createFileRoute } from "@tanstack/react-router";
import { artist } from "~/content/artist";
import {
  getCategoryFacets,
  getProjectsByCategory,
  projects as allProjects,
  toCategorySlug,
} from "~/content/projects";
import { categoryLabel } from "~/content/types";
import { cx } from "~/lib/cx";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/work/")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () =>
    pageHead({
      title: "Work",
      description: `Selected work by ${artist.name} — direction, cinematography, film, commercial, music video, photography and visual art.`,
      path: "/work",
    }),
  component: WorkPage,
});

/** Filter links are real anchors: the URL drives the result set, with or without JavaScript. */
function filterHref(category: string | null): string {
  return category ? `/work?category=${category}` : "/work";
}

function filterClass(isActive: boolean): string {
  return cx(
    "meta flex min-h-[2.75rem] items-center whitespace-nowrap transition-colors duration-200 hover:text-ink",
    isActive ? "text-ink underline underline-offset-[0.55em]" : "text-muted",
  );
}

function WorkPage() {
  const { category } = Route.useSearch();
  const activeCategory = toCategorySlug(category);
  const facets = getCategoryFacets();
  const list = getProjectsByCategory(activeCategory);

  return (
    <>
      <section className="shell pt-10 md:pt-16">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="meta">Index</p>
            <h1 className="mt-4 text-h1 font-display text-ink">Work</h1>
          </div>
          <p className="col-span-12 max-w-[46ch] text-small text-graphite lg:col-span-4 lg:col-start-9 lg:pb-1">
            A working catalogue: films, commissioned work, photography and visual art. Filter by
            discipline, or read the catalogue straight through.
          </p>
        </div>
      </section>

      <section aria-label="Filter work" className="shell mt-10 md:mt-14">
        <nav aria-label="Filter projects by category" className="border-y border-rule">
          <ul className="flex flex-wrap items-center gap-x-5 py-1 md:gap-x-8">
            <li>
              <a
                href={filterHref(null)}
                aria-current={activeCategory === null ? "page" : undefined}
                className={filterClass(activeCategory === null)}
              >
                All
                <span className="ml-1.5 tabular-nums text-muted">{allProjects.length}</span>
              </a>
            </li>
            {facets.map((facet) => (
              <li key={facet.slug}>
                <a
                  href={filterHref(facet.slug)}
                  aria-current={activeCategory === facet.slug ? "page" : undefined}
                  className={filterClass(activeCategory === facet.slug)}
                >
                  {facet.label}
                  <span className="ml-1.5 tabular-nums text-muted">{facet.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-label="Project list" className="shell mt-8 md:mt-10">
        <p className="meta pb-4">
          {list.length} {list.length === 1 ? "project" : "projects"}
          {activeCategory ? ` — ${categoryLabel(activeCategory)}` : ""}
        </p>

        <ul className="border-t border-rule">
          {list.map((project, index) => (
            <li key={project.slug} className="border-b border-rule">
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group grid grid-cols-12 items-center gap-x-4 gap-y-2 py-5 md:gap-x-6 md:py-6"
              >
                <span className="meta hidden md:col-span-1 md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="col-span-4 row-span-2 md:col-span-3 md:row-span-1">
                  <img
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    width={project.thumbnail.width}
                    height={project.thumbnail.height}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[4/3] w-full bg-field object-cover transition-opacity duration-200 group-hover:opacity-85"
                  />
                </div>

                <h2 className="col-span-8 text-h3 font-display text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 md:col-span-4">
                  {project.title}
                </h2>

                <p className="meta col-span-8 md:col-span-3">
                  {project.year} · {project.role} · {categoryLabel(project.category)}
                </p>

                <span aria-hidden className="meta hidden md:col-span-1 md:block md:justify-self-end">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
