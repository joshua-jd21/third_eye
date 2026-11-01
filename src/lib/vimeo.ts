/**
 * Vimeo URL parsing.
 *
 * The artist pastes whatever Vimeo gives them; this module turns it into a
 * trusted `{ id, hash }` pair. The embed `src` is always rebuilt from those two
 * values — a raw pasted string never reaches an iframe.
 *
 * Supported inputs
 *   https://vimeo.com/123456789
 *   https://vimeo.com/123456789/abcdef1234        (unlisted — hash kept)
 *   https://player.vimeo.com/video/123456789
 *   https://player.vimeo.com/video/123456789?h=abcdef1234
 *   https://vimeo.com/123456789?share=copy        (extra params ignored)
 *   https://vimeo.com/channels/staffpicks/123456789
 *   https://vimeo.com/groups/name/videos/123456789
 *   https://vimeo.com/album/12345/video/123456789
 *   https://vimeo.com/showcase/12345/video/123456789
 *   123456789                                     (bare id)
 *
 * Anything else returns null, and the caller renders the poster instead.
 */

export interface VimeoRef {
  /** Numeric video id. */
  id: string;
  /** Privacy hash for unlisted videos, when one is present. */
  hash?: string;
}

const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com", "m.vimeo.com"]);

const isId = (value: string | undefined): value is string => Boolean(value && /^\d+$/.test(value));

/** Parse a Vimeo URL or bare id into `{ id, hash }`, or null if unusable. */
export function parseVimeoUrl(input?: string | null): VimeoRef | null {
  if (!input) return null;

  const raw = input.trim();
  if (!raw) return null;

  // Bare numeric id.
  if (/^\d+$/.test(raw)) return { id: raw };

  let url: URL;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (!VIMEO_HOSTS.has(host) && !host.endsWith(".vimeo.com")) return null;

  let segments: string[];
  try {
    segments = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  } catch {
    return null;
  }

  let id: string | undefined;
  let hash: string | undefined;

  const [first, second, third, fourth] = segments;

  if (first === "video") {
    // player.vimeo.com/video/<id>
    if (isId(second)) id = second;
  } else if (first === "channels") {
    // vimeo.com/channels/<channel>/<id>
    if (isId(third)) id = third;
  } else if (first === "groups" && third === "videos") {
    // vimeo.com/groups/<group>/videos/<id>
    if (isId(fourth)) id = fourth;
  } else if (first === "album" && third === "video") {
    // vimeo.com/album/<album>/video/<id>
    if (isId(fourth)) id = fourth;
  } else if (first === "showcase" && third === "video") {
    // vimeo.com/showcase/<showcase>/video/<id>
    if (isId(fourth)) id = fourth;
  } else if (isId(first)) {
    // vimeo.com/<id> or vimeo.com/<id>/<hash>
    id = first;
    if (second && !isId(second)) hash = second;
  }

  if (!id) return null;

  // `?h=` wins over a path hash — that is how Vimeo's own embeds express it.
  const queryHash = url.searchParams.get("h");
  if (queryHash) hash = queryHash;

  return hash ? { id, hash } : { id };
}

/**
 * Build the embed URL from a parsed reference.
 * `autoplay` is only passed on the click-to-load path — never on first paint.
 */
export function buildVimeoEmbedUrl(ref: VimeoRef, options: { autoplay?: boolean } = {}): string {
  const params = new URLSearchParams();
  if (ref.hash) params.set("h", ref.hash);
  params.set("dnt", "1");
  params.set("title", "0");
  params.set("byline", "0");
  params.set("portrait", "0");
  if (options.autoplay) params.set("autoplay", "1");
  return `https://player.vimeo.com/video/${ref.id}?${params.toString()}`;
}
