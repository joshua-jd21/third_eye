import type { Credit, ImageAsset, SocialLink } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE ARTIST
 *  Every value below is a PLACEHOLDER for the owner to replace.
 *  Nothing here describes a real person: the name, biography, statement,
 *  credits and email are all marked so they cannot be mistaken for fact.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * The site's public origin. Used for canonical URLs, Open Graph tags and the
 * sitemap. REPLACE with the artist's own domain once it is connected.
 */
export const siteUrl = "https://a66ff6b1455b7b3aaae7c45ccc9d1f57.ctonew.app";

export const artist = {
  /** PLACEHOLDER NAME — replace. Rendered uppercase in the header and footer. */
  name: "Artist Name",

  /** PLACEHOLDER professional title — replace. Rendered as the uppercase meta line. */
  title: "Film Director · Cinematographer · Visual Artist",

  /** PLACEHOLDER location line — replace or set to "" to hide. */
  location: "Based in City, Country",

  /** PLACEHOLDER one-liner used on the home page and in meta descriptions. */
  shortBio:
    "Placeholder introduction. Replace this with two or three sentences on the practice: what you make, how you work, and where you are based.",

  /** PLACEHOLDER biography — the About page body. Each string is a paragraph. */
  bio: [
    "Placeholder biography. Replace this paragraph in src/content/artist.ts with the artist's own account of how the practice began and what it has become — the forms it moves between, and the questions that hold them together.",
    "Second placeholder paragraph. This is where the longer background belongs: training, formative collaborators, the shift from one discipline to another. Write it in the artist's own register; the layout takes as many paragraphs as you give it.",
  ],

  /** PLACEHOLDER artist statement — set to "" to hide the section entirely. */
  statement:
    "Placeholder artist statement. Replace with a short first-person paragraph on the work's concerns — image, time, light, the human figure — kept to the length of a breath rather than a page.",

  /** PLACEHOLDER background — set to [] to hide the section entirely. */
  background: [
    "Placeholder background. Replace with a short professional history: the disciplines worked in, the kinds of productions and exhibitions the work has appeared in, and any teaching or collaborative practice.",
  ],

  /** PLACEHOLDER portrait — replace the file, keep the 4:5 ratio, update width/height and alt. */
  portrait: {
    src: "/images/artist/portrait.svg",
    alt: "Portrait of the artist (placeholder image)",
    width: 1200,
    height: 1500,
    caption: "Portrait — replace with a 4:5 photograph",
  } satisfies ImageAsset,

  /** PLACEHOLDER email — replace with the real address. */
  email: "hello@example.com",

  /** PLACEHOLDER availability line — set to "" to hide. */
  availability: "Available for commissions and collaborations",

  /** PLACEHOLDER social links — replace hrefs with the artist's own profiles. */
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ] satisfies SocialLink[],

  /** PLACEHOLDER selected credits — set to [] to hide the section entirely. */
  selectedCredits: [
    { role: "Feature film", name: "Placeholder title" },
    { role: "Short film", name: "Placeholder title" },
    { role: "Exhibition", name: "Placeholder venue" },
    { role: "Commercial", name: "Placeholder client" },
  ] satisfies Credit[],
};

export type Artist = typeof artist;
