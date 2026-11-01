import type { ImageAsset } from "~/content/types";
import { cx } from "~/lib/cx";

interface PlateProps {
  image: ImageAsset;
  /** Wrapper classes (grid placement, margins). */
  className?: string;
  /** Applied to the <img> itself, e.g. the aspect ratio a tile is cropped to. */
  imageClassName?: string;
  /** Above-the-fold images only. Everything else lazy-loads. */
  eager?: boolean;
}

/**
 * An image with its intrinsic size reserved, so nothing shifts while it loads.
 * Aspect ratio comes from the file's own dimensions — no forced crops.
 */
export function Plate({ image, className, imageClassName, eager }: PlateProps) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cx("h-auto w-full bg-field", imageClassName, className)}
    />
  );
}

interface CaptionedPlateProps extends PlateProps {
  caption?: string;
  /** Right-hand meta slot, e.g. a year. */
  meta?: string;
}

/** Image with a hairline caption row beneath it — used for stills and the archive. */
export function CaptionedPlate({
  image,
  className,
  imageClassName,
  eager,
  caption,
  meta,
}: CaptionedPlateProps) {
  const captionText = caption ?? image.caption;

  return (
    <figure className={className}>
      <Plate image={image} imageClassName={imageClassName} eager={eager} />
      {captionText || meta ? (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2">
          <span className="meta">{captionText}</span>
          {meta ? <span className="meta shrink-0">{meta}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
