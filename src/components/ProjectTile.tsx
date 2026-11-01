import { Link } from "@tanstack/react-router";
import { Plate } from "~/components/Media";
import { categoryLabel, type Project } from "~/content/types";
import { cx } from "~/lib/cx";

interface ProjectTileProps {
  project: Project;
  /** Column placement and vertical offset for this tile. */
  className?: string;
  /** Aspect ratio the thumbnail is cropped to. */
  imageClassName?: string;
  /** Above-the-fold tiles only. */
  eager?: boolean;
}

/** One entry in the Selected Work grid: image, title, year, role, category. */
export function ProjectTile({ project, className, imageClassName, eager }: ProjectTileProps) {
  return (
    <article className={cx("group", className)}>
      <Link to="/work/$slug" params={{ slug: project.slug }} className="block">
        <Plate
          image={project.thumbnail}
          eager={eager}
          className={cx(
            "object-cover transition-opacity duration-200 group-hover:opacity-85",
            imageClassName,
          )}
        />
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-rule pt-3">
          <h3 className="text-h3 font-display text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {project.title}
          </h3>
          <span className="meta shrink-0">{project.year}</span>
        </div>
        <p className="meta mt-1.5">
          {project.role} · {categoryLabel(project.category)}
        </p>
      </Link>
    </article>
  );
}
