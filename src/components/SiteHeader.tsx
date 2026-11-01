import { Link } from "@tanstack/react-router";
import { artist } from "~/content/artist";

const NAV = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Compact masthead: artist name left, primary nav right, thin bottom rule.
 * One row at every width — the three labels are short enough that no menu
 * button (and therefore no JavaScript) is needed to reach them.
 */
export function SiteHeader() {
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="shell">
        <div className="flex items-center justify-between gap-4 py-1 md:h-[4.5rem] md:py-0">
          <Link
            to="/"
            className="font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] whitespace-nowrap text-ink transition-colors duration-200 hover:text-muted md:text-[0.8125rem]"
          >
            {artist.name}
          </Link>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-10">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="meta flex min-h-[2.75rem] items-center whitespace-nowrap text-graphite transition-colors duration-200 hover:text-ink data-[status=active]:text-ink data-[status=active]:underline data-[status=active]:underline-offset-[0.55em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
