import { createFileRoute } from "@tanstack/react-router";
import { artist } from "~/content/artist";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description: `Contact ${artist.name} — email and links.`,
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="shell pt-10 md:pt-16">
        <p className="meta">Contact</p>
        <h1 className="mt-4 text-h1 font-display text-ink">Get in touch</h1>
      </section>

      <section aria-label="Contact details" className="shell mt-10 md:mt-14">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <p className="meta text-ink">Email</p>
            <a
              href={`mailto:${artist.email}`}
              className="mt-3 block font-display text-h2 break-words text-ink underline decoration-rule decoration-1 underline-offset-[0.22em] transition-colors duration-200 hover:decoration-ink"
            >
              {artist.email}
            </a>
            {artist.availability ? <p className="meta mt-7">{artist.availability}</p> : null}
            {artist.location ? <p className="meta mt-2">{artist.location}</p> : null}
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="meta text-ink">Elsewhere</p>
            <ul className="mt-3 border-t border-rule">
              {artist.socials.map((social) => (
                <li key={social.href} className="border-b border-rule">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-[3.5rem] items-center justify-between gap-4 text-small text-graphite transition-colors duration-200 hover:text-ink"
                  >
                    {social.label}
                    <span aria-hidden className="meta">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Enquiries" className="shell mt-20 md:mt-28">
        <div className="border-t border-rule pt-6">
          <p className="max-w-[58ch] text-small text-graphite">
            This site has no contact form — please write directly to the address above with the
            project, the timeline and the format.
          </p>
        </div>
      </section>
    </>
  );
}
