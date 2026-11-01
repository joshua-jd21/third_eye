import { Link, createFileRoute } from "@tanstack/react-router";
import { CaptionedPlate } from "~/components/Media";
import { ProjectTile } from "~/components/ProjectTile";
import { SectionHead } from "~/components/SectionHead";
import { VimeoPlayer } from "~/components/VimeoPlayer";
import { archive } from "~/content/archive";
import { artist } from "~/content/artist";
import {
  getFeaturedProject,
  getSelectedWork,
  projects as allProjects,
} from "~/content/projects";
import { categoryLabel } from "~/content/types";
import { cx } from "~/lib/cx";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${artist.name} — ${artist.title}`,
      description: artist.shortBio,
      path: "/",
    }),
  component: HomePage,
});

/**
 * Composed Selected Work grid. Each entry takes a column span and a vertical
 * offset so the six tiles read as an editorial spread rather than a card wall.
 * Offsets are positive only — no item is pulled over the one above it.
 */
const SELECTED_LAYOUT = [
  { box: "md:col-span-5 md:col-start-1", image: "aspect-[4/5]" },
  { box: "md:col-span-6 md:col-start-7 md:mt-24", image: "aspect-[3/2]" },
  { box: "md:col-span-7 md:col-start-1", image: "aspect-[3/2]" },
  { box: "md:col-span-4 md:col-start-9 md:mt-16", image: "aspect-[4/5]" },
  { box: "md:col-span-4 md:col-start-2", image: "aspect-[4/5]" },
  { box: "md:col-span-6 md:col-start-7 md:mt-32", image: "aspect-[3/2]" },
];

/** Visual archive rhythm — mixed widths, staggered rows. */
const ARCHIVE_LAYOUT = [
  { box: "sm:col-span-6 md:col-span-7 md:col-start-1", image: "aspect-[3/2]" },
  { box: "sm:col-span-6 md:col-span-4 md:col-start-9 md:mt-16", image: "aspect-[4/5]" },
  { box: "sm:col-span-6 md:col-span-4 md:col-start-1", image: "aspect-[4/5]" },
  { box: "sm:col-span-6 md:col-span-7 md:col-start-6 md:mt-16", image: "aspect-[16/9]" },
  { box: "sm:col-span-6 md:col-span-6 md:col-start-1", image: "aspect-[3/2]" },
  { box: "sm:col-span-6 md:col-span-3 md:col-start-9 md:mt-12", image: "aspect-[1/1]" },
];

function HomePage() {
  const featured = getFeaturedProject();
  const selected = getSelectedWork();
  const portrait = artist.portrait;

  return (
    <>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <section className="shell pt-10 pb-10 md:pt-16 md:pb-14">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="meta">{artist.title}</p>
            <h1 className="mt-4 text-display font-display text-ink">{artist.name}</h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-small text-graphite md:text-body">{artist.shortBio}</p>
            {artist.location ? <p className="meta mt-5">{artist.location}</p> : null}
          </div>
        </div>
      </section>

      {/* ── Featured project ─────────────────────────────────────── */}
      <section aria-label="Featured project" className="mt-2 md:mt-4">
        <div className="shell">
          <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-3 pb-5 md:pb-8">
            <h2 className="meta text-ink">Featured — {categoryLabel(featured.category)}</h2>
            <p className="meta">{featured.year}</p>
          </div>
        </div>

        <VimeoPlayer
          url={featured.vimeoUrl}
          poster={featured.hero ?? featured.poster}
          title={featured.title}
          aspectClassName="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[239/100]"
          eager
        />

        <div className="shell mt-5 grid-12 items-baseline gap-y-3 md:mt-6">
          <h3 className="col-span-12 text-h2 font-display text-ink md:col-span-7">
            {featured.title}
          </h3>
          <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 md:col-span-5 md:justify-end">
            <p className="meta">{featured.role}</p>
            <Link
              to="/work/$slug"
              params={{ slug: featured.slug }}
              className="meta text-ink underline underline-offset-[0.5em] transition-colors duration-200 hover:text-muted"
            >
              View project
            </Link>
          </div>
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────────── */}
      <section aria-label="Selected work" className="shell mt-24 md:mt-36">
        <SectionHead label="Selected Work">
          <Link
            to="/work"
            className="meta text-ink transition-colors duration-200 hover:text-muted"
          >
            All work ({allProjects.length}) →
          </Link>
        </SectionHead>

        <div className="grid-12 gap-y-14 md:gap-y-24">
          {selected.map((project, index) => (
            <ProjectTile
              key={project.slug}
              project={project}
              eager={index < 2}
              className={cx("col-span-12", SELECTED_LAYOUT[index % SELECTED_LAYOUT.length].box)}
              imageClassName={SELECTED_LAYOUT[index % SELECTED_LAYOUT.length].image}
            />
          ))}
        </div>
      </section>

      {/* ── Visual archive ───────────────────────────────────────── */}
      {archive.length > 0 ? (
        <section aria-label="Visual archive" className="shell mt-24 md:mt-36">
          <SectionHead label="Visual Archive">
            <span>{archive.length} images</span>
          </SectionHead>

          <div className="grid-12 gap-y-10 md:gap-y-16">
            {archive.map((image, index) => (
              <CaptionedPlate
                key={image.src}
                image={image}
                meta={image.year}
                className={cx("col-span-12", ARCHIVE_LAYOUT[index % ARCHIVE_LAYOUT.length].box)}
                imageClassName={ARCHIVE_LAYOUT[index % ARCHIVE_LAYOUT.length].image}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── About introduction ───────────────────────────────────── */}
      <section aria-label="About the artist" className="shell mt-24 md:mt-36">
        <SectionHead label="About">
          <Link
            to="/about"
            className="meta text-ink transition-colors duration-200 hover:text-muted"
          >
            Read more →
          </Link>
        </SectionHead>

        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 sm:col-span-7 lg:col-span-5">
            <CaptionedPlate image={portrait} caption={portrait.caption} />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-1">
            {artist.statement ? (
              <p className="font-display text-h3 leading-[1.4] text-ink md:text-[1.5rem] md:leading-[1.38]">
                {artist.statement}
              </p>
            ) : null}
            <Link
              to="/about"
              className="meta mt-8 inline-flex min-h-[2.75rem] items-center text-ink underline underline-offset-[0.5em] transition-colors duration-200 hover:text-muted"
            >
              About the artist
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section aria-label="Contact" className="on-dark mt-24 bg-ink md:mt-36">
        <div className="shell grid-12 gap-y-12 py-16 md:py-28">
          <div className="col-span-12 md:col-span-7">
            <p className="meta text-white/60">Contact</p>
            <a
              href={`mailto:${artist.email}`}
              className="mt-4 block font-display text-h1 break-words text-white transition-colors duration-200 hover:text-white/70"
            >
              {artist.email}
            </a>
            {artist.availability ? (
              <p className="meta mt-7 text-white/60">{artist.availability}</p>
            ) : null}
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="meta text-white/60">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {artist.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-small text-white transition-colors duration-200 hover:text-white/70 hover:underline hover:decoration-1 hover:underline-offset-4"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
