import { Link } from "@tanstack/react-router";
import { artist } from "~/content/artist";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const linkClass =
  "text-small text-graphite transition-colors duration-200 hover:text-ink hover:underline hover:decoration-1 hover:underline-offset-4";

/** Footer: name, navigation, socials, and a copyright year generated at render time. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="shell py-14 md:py-20">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-h3 text-ink uppercase tracking-[0.02em]">{artist.name}</p>
            <p className="meta mt-3 max-w-[28ch]">{artist.title}</p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3 md:col-start-7">
            <p className="meta text-ink">Index</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3 md:col-start-10">
            <p className="meta text-ink">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {artist.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-5 md:flex-row md:items-center md:justify-between">
          <p className="meta">
            © {year} {artist.name}. All rights reserved.
          </p>
          <a href="#top" className="meta transition-colors duration-200 hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
