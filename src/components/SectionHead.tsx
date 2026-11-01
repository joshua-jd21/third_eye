import type { ReactNode } from "react";
import { cx } from "~/lib/cx";

interface SectionHeadProps {
  /** Small uppercase section label. */
  label: string;
  /** Optional right-hand slot — a link, a count, a year. */
  children?: ReactNode;
  className?: string;
}

/** Hairline rule + uppercase label. Every section on the site starts with one. */
export function SectionHead({ label, children, className }: SectionHeadProps) {
  return (
    <div
      className={cx(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-3 pb-6 md:pb-9",
        className,
      )}
    >
      <h2 className="meta text-ink">{label}</h2>
      {children ? <div className="meta">{children}</div> : null}
    </div>
  );
}
