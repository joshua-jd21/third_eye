import { Link, createFileRoute } from "@tanstack/react-router";
import { CaptionedPlate } from "~/components/Media";
import { SectionHead } from "~/components/SectionHead";
import { artist } from "~/content/artist";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description: `About ${artist.name} — ${artist.title}.`,
      path: "/about",
      image: artist.portrait.src,
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="shell pt-10 md:pt-16">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="meta">{artist.name}</p>
            <h1 className="mt-4 text-h1 font-display text-ink">About</h1>
          </div>
          <p className="meta col-span-12 max-w-[34ch] lg:col-span-4 lg:col-start-9 lg:pb-1">
            {artist.title}
          </p>
        </div>
      </section>

      {/* ── Portrait + biography ─────────────────────────────────── */}
      <section aria-label="Biography" className="shell mt-10 md:mt-14">
        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 sm:col-span-7 lg:col-span-5">
            <CaptionedPlate image={artist.portrait} caption={artist.portrait.caption} eager />
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-6 lg:col-start-7">
            {artist.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-[62ch] text-body text-graphite">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artist statement ─────────────────────────────────────── */}
      {artist.statement ? (
        <section aria-label="Artist statement" className="shell mt-20 md:mt-32">
          <SectionHead label="Artist Statement" />
          <div className="grid-12">
            <p className="col-span-12 max-w-[24ch] font-display text-h2 leading-[1.25] text-ink md:col-span-9 md:col-start-2 md:max-w-[38ch]">
              {artist.statement}
            </p>
          </div>
        </section>
      ) : null}

      {/* ── Background ───────────────────────────────────────────── */}
      {artist.background.length > 0 ? (
        <section aria-label="Background" className="shell mt-20 md:mt-28">
          <SectionHead label="Background" />
          <div className="grid-12 gap-y-5">
            <div className="col-span-12 space-y-5 md:col-span-7 md:col-start-6">
              {artist.background.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-[62ch] text-body text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Selected credits ─────────────────────────────────────── */}
      {artist.selectedCredits.length > 0 ? (
        <section aria-label="Selected credits" className="shell mt-20 md:mt-28">
          <SectionHead label="Selected Credits" />
          <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {artist.selectedCredits.map((credit) => (
              <div
                key={`${credit.role}-${credit.name}`}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-3"
              >
                <dt className="meta">{credit.role}</dt>
                <dd className="text-right text-small text-ink">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* ── Contact prompt ───────────────────────────────────────── */}
      <section aria-label="Contact" className="shell mt-20 md:mt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-rule pt-5">
          <p className="text-h3 font-display text-ink">
            For commissions, press and collaborations.
          </p>
          <Link
            to="/contact"
            className="meta inline-flex min-h-[2.75rem] items-center text-ink underline underline-offset-[0.5em] transition-colors duration-200 hover:text-muted"
          >
            Contact →
          </Link>
        </div>
      </section>
    </>
  );
}
