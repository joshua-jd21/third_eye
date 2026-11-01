import { useState } from "react";
import type { ImageAsset } from "~/content/types";
import { cx } from "~/lib/cx";
import { buildVimeoEmbedUrl, parseVimeoUrl } from "~/lib/vimeo";

interface VimeoPlayerProps {
  /** Whatever the artist pasted into `vimeoUrl`. Invalid input never breaks the page. */
  url?: string | null;
  /** Poster shown before playback, and the fallback when the URL is unusable. */
  poster?: ImageAsset | null;
  /** Used for the iframe title and the play button's accessible name. */
  title: string;
  /** Tailwind aspect utility for the frame. Defaults to 16:9. */
  aspectClassName?: string;
  className?: string;
  eager?: boolean;
}

function PlayGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 10 12" width="10" height="12" fill="currentColor" className="shrink-0">
      <path d="M0 0v12l10-6z" />
    </svg>
  );
}

/**
 * Poster-first Vimeo player.
 *
 * Nothing is requested from Vimeo until the visitor presses play: the first
 * paint is the poster image, and the iframe only mounts after a click. The
 * embed src is rebuilt from the parsed id/hash, never from the pasted string.
 */
export function VimeoPlayer({
  url,
  poster,
  title,
  aspectClassName = "aspect-[16/9]",
  className,
  eager,
}: VimeoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = parseVimeoUrl(url);

  return (
    <div className={cx("relative w-full overflow-hidden bg-field", aspectClassName, className)}>
      {video && isPlaying ? (
        <iframe
          src={buildVimeoEmbedUrl(video, { autoplay: true })}
          title={title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : poster ? (
        <>
          <img
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {video ? (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${title}`}
              className="group absolute inset-0 flex cursor-pointer items-end justify-start p-4 text-left md:p-6"
            >
              <span className="meta inline-flex items-center gap-2.5 bg-paper px-3 py-2.5 text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-paper">
                <PlayGlyph />
                Play
              </span>
            </button>
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-rule p-6 text-center">
          <p className="meta">
            {title} — no video or poster configured
          </p>
        </div>
      )}
    </div>
  );
}
