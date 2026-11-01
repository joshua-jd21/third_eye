import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CaptionedPlate } from "~/components/Media";
import { SectionHead } from "~/components/SectionHead";
import { VimeoPlayer } from "~/components/VimeoPlayer";
import { getAdjacentProjects, getProjectBySlug } from "~/content/projects";
import { categoryLabel } from "~/content/types";
import { cx } from "~/lib/cx";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project, adjacent: getAdjacentProjects(project.slug) };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return { meta: [{ title: "Project not found" }] };
    }
    return pageHead({
      title: project.title,
      description:
        project.summary ??
        `${project.title} — ${project.role}, ${project.year}. ${categoryLabel(project.category)}.`,
      path: `/work/${project.slug}`,
      image: project.poster.src,
      type: "article",
    });
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

/** Stills rhythm: wide, narrow and offset, so three stills never read as a strip. */
const STILL_LAYOUT = [
  "md:col-span-7 md:col-start-1",
  "md:col-span-4 md:col-start-9 md:mt-24",
  "md:col-span-5 md:col-start-2 md:mt-4",
];

function ProjectPage() {
  const { project, adjacent } = Route.useLoaderData();

  return (
    <article className="pb-24 md:pb-32">
      <div className="shell pt-6 md:pt-8">
        <Link
          to="/work"
          className="meta inline-flex min-h-[2.75rem] items-center text-muted transition-colors duration-200 hover:text-ink"
        >
          ← Work
        </Link>
      </div>

      {/* ── Title block ──────────────────────────────────────────── */}
      <header className="shell mt-2 md:mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule pt-3">
          <p className="meta text-ink">{categoryLabel(project.category)}</p>
          <p className="meta">{project.year}</p>
        </div>
        <h1 className="mt-6 max-w-[22ch] text-h1 font-display text-ink md:mt-8">
          {project.title}
        </h1>
        <p className="meta mt-4">{project.role}</p>
      </header>

      {/* ── Poster / player ──────────────────────────────────────── */}
      <div className="shell mt-10 md:mt-14">
        <VimeoPlayer
          url={project.vimeoUrl}
          poster={project.poster}
          title={project.title}
          aspectClassName="aspect-[16/9]"
          eager
        />
      </div>

      {/* ── Facts + description ──────────────────────────────────── */}
      <div className="shell mt-12 grid-12 gap-y-10 md:mt-16">
        <dl className="col-span-12 space-y-4 md:col-span-3">
          <div>
            <dt className="meta">Year</dt>
            <dd className="mt-1 text-small text-graphite">{project.year}</dd>
          </div>
          <div>
            <dt className="meta">Role</dt>
            <dd className="mt-1 text-small text-graphite">{project.role}</dd>
          </div>
          <div>
            <dt className="meta">Category</dt>
            <dd className="mt-1 text-small text-graphite">{categoryLabel(project.category)}</dd>
          </div>
        </dl>

        {project.description ? (
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="max-w-[62ch] text-body text-graphite">{project.description}</p>
          </div>
        ) : null}
      </div>

      {/* ── Stills ───────────────────────────────────────────────── */}
      {project.stills && project.stills.length > 0 ? (
        <section aria-label="Stills" className="shell mt-20 md:mt-28">
          <SectionHead label="Stills" />
          <div className="grid-12 gap-y-10 md:gap-y-16">
            {project.stills.map((image, index) => (
              <CaptionedPlate
                key={image.src}
                image={image}
                className={cx("col-span-12", STILL_LAYOUT[index % STILL_LAYOUT.length])}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Behind the scenes ────────────────────────────────────── */}
      {project.behindTheScenes && project.behindTheScenes.length > 0 ? (
        <section aria-label="Behind the scenes" className="shell mt-20 md:mt-28">
          <SectionHead label="Behind the Scenes" />
          <div className="grid-12 gap-y-10">
            {project.behindTheScenes.map((image) => (
              <CaptionedPlate
                key={image.src}
                image={image}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Credits ──────────────────────────────────────────────── */}
      {project.credits && project.credits.length > 0 ? (
        <section aria-label="Credits" className="shell mt-20 md:mt-28">
          <SectionHead label="Credits" />
          <dl className="border-t border-rule">
            {project.credits.map((credit) => (
              <div
                key={`${credit.role}-${credit.name}`}
                className="grid grid-cols-12 items-baseline gap-x-4 border-b border-rule py-3"
              >
                <dt className="meta col-span-4 md:col-span-3">{credit.role}</dt>
                <dd className="col-span-8 text-small text-ink md:col-span-9">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* ── External links ───────────────────────────────────────── */}
      {project.links && project.links.length > 0 ? (
        <section aria-label="Links" className="shell mt-16 md:mt-20">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="meta inline-flex min-h-[2.75rem] items-center text-ink transition-colors duration-200 hover:text-muted"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ── Previous / next ──────────────────────────────────────── */}
      <nav aria-label="Project navigation" className="shell mt-24 md:mt-36">
        <div className="grid-12 gap-y-8 border-t border-rule pt-4">
          <div className="col-span-12 md:col-span-6">
            <p className="meta">Previous</p>
            <Link
              to="/work/$slug"
              params={{ slug: adjacent.previous.slug }}
              className="mt-2 block text-h3 font-display text-ink transition-colors duration-200 hover:text-muted"
            >
              ← {adjacent.previous.title}
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <p className="meta">Next</p>
            <Link
              to="/work/$slug"
              params={{ slug: adjacent.next.slug }}
              className="mt-2 block text-h3 font-display text-ink transition-colors duration-200 hover:text-muted"
            >
              {adjacent.next.title} →
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}

function ProjectNotFound() {
  return (
    <div className="shell py-24 md:py-40">
      <p className="meta">404 — Project not found</p>
      <h1 className="mt-5 max-w-[24ch] text-h1 font-display text-ink">
        That project is not in the catalogue.
      </h1>
      <Link
        to="/work"
        className="meta mt-8 inline-flex min-h-[2.75rem] items-center text-ink underline underline-offset-[0.5em]"
      >
        View all work
      </Link>
    </div>
  );
}
