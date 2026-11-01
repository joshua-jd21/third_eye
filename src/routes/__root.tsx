import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { artist } from "~/content/artist";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${artist.name} — ${artist.title}` },
      { name: "description", content: artist.shortBio },
      { name: "theme-color", content: "#f7f7f5" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  return (
    <div className="shell py-24 md:py-40">
      <p className="meta">404 — Not found</p>
      <h1 className="mt-5 max-w-[24ch] text-h1 font-display text-ink">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-[52ch] text-small text-graphite">
        The address may be mistyped, or the work may have moved. Everything currently in the
        catalogue is listed under Work.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
        <Link to="/work" className="meta text-ink underline underline-offset-[0.5em]">
          View work
        </Link>
        <Link to="/" className="meta transition-colors duration-200 hover:text-ink">
          Back to home
        </Link>
      </div>
    </div>
  );
}
