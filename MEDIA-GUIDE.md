# Media guide

Everything on this website — photographs, film stills, the portrait, the video — is
one of your own files placed in a folder, plus a line of text in a settings file.
There is no admin panel and nothing to design. Replace a file, edit a line, publish.

If you only read one paragraph: **put your image in the folder listed below, using
the same file name as the grey placeholder that is already there, then change the
three lines in `src/content/` that describe it (the path, the width and the height).**

---

## 1. The folders

All images live under `public/images/`. Inside it there are four folders:

```
public/images/
├── artist/      your portrait (one file)
├── featured/    the wide image at the top of the home page (one file)
├── projects/    one folder per project
│   ├── project-one/
│   │   ├── thumbnail.svg
│   │   ├── poster.svg
│   │   ├── still-01.svg
│   │   ├── still-02.svg
│   │   ├── still-03.svg
│   │   ├── bts-01.svg
│   │   └── bts-02.svg
│   ├── project-two/
│   └── … one folder for each project, named exactly like its address
└── archive/     the visual archive images (archive-01 … archive-06)
```

There is no separate "photography" folder. The visual archive section on the home
page reads from `public/images/archive/`.

### What each image is, and where it appears

| File | Where it shows up | Size to supply |
| --- | --- | --- |
| `artist/portrait` | The portrait beside your biography, on the home page and the About page | 1200 × 1500 (4:5, upright) |
| `featured/home-hero` | The wide image at the very top of the home page, behind the play button of the featured project | 2400 × 1350 (16:9) |
| `projects/<slug>/thumbnail` | The small image in the Selected Work grid, and the thumbnail in the Work list | see the per-project table below |
| `projects/<slug>/poster` | The large image at the top of the project page — and the picture that sits behind the play button until someone presses it | 2400 × 1350 (16:9) |
| `projects/<slug>/still-01…` | The film stills further down the project page | 2000 × 1125 (16:9) or 1400 × 1750 (4:5) |
| `projects/<slug>/bts-01…` | Behind-the-scenes photographs on the project page | 1600 × 1200 (4:3) |
| `archive/archive-01…06` | The Visual Archive section on the home page | any of the sizes below |

### Thumbnail sizes, project by project

Thumbnails are the one image whose shape differs between projects, so each project
has its own size. These are the sizes the site is currently set up for:

| Project folder | Thumbnail size | Shape |
| --- | --- | --- |
| `project-one` | 1600 × 1200 | 4:3 |
| `project-two` | 1200 × 1500 | 4:5 upright |
| `project-three` | 1600 × 1067 | 3:2 |
| `project-four` | 1600 × 1067 | 3:2 |
| `project-five` | 1200 × 1500 | 4:5 upright |
| `project-six` | 1200 × 1500 | 4:5 upright |
| `project-seven` | 1600 × 1067 | 3:2 |
| `project-eight` | 1600 × 1200 | 4:3 |

### Archive image sizes

| File | Size | Shape |
| --- | --- | --- |
| `archive-01` | 1600 × 1067 | 3:2 |
| `archive-02` | 1400 × 1750 | 4:5 upright |
| `archive-03` | 1400 × 1750 | 4:5 upright |
| `archive-04` | 1600 × 900 | 16:9 |
| `archive-05` | 1600 × 1067 | 3:2 |
| `archive-06` | 1200 × 1200 | square |

Mixed shapes are welcome in the archive — that is what makes the section read as a
spread rather than a row of tiles. Keep the list between four and eight images;
the layout repeats its rhythm every six.

---

## 2. Replacing an image

The placeholders you see now are light grey plates with their size printed on them.
They are honest stand-ins — no stock photography, no invented film stills.

For each image you want to replace:

1. **Export your photograph** at (or close to) the size in the tables above, as a
   JPG or WebP. Landscape images generally want the long edge at 2400 pixels; the
   portrait at 1200 × 1500.
2. **Save it into the same folder** as the placeholder, with the same base name.
   The extension will change, because a photograph cannot be saved as `.svg`:
   `portrait.svg` becomes `portrait.jpg`, `still-01.svg` becomes `still-01.jpg`.
   You can delete the `.svg` once the real file is in place.
3. **Update the three lines** for that image in the settings file that mentions it
   (listed in section 6). The pattern is always the same:

   ```ts
   {
     src: "/images/artist/portrait.jpg",   // ← path, starting /images/
     alt: "The artist at a window, in profile",  // ← describe the picture
     width: 1200,                          // ← the real pixel width
     height: 1500,                         // ← the real pixel height
   }
   ```

4. **Publish** (`bun run publish`).

`width` and `height` are not decoration: the site reserves that exact space before
the image loads, so the page does not jump around as pictures arrive. Put the real
numbers in — if they are wrong, the page will shift while loading.

**Alt text** is required on every image. Describe what is *in* the photograph, not
what the project is called — "A figure walking through a lit corridor", not "Project
Two still". This is what a blind visitor hears, and it is what search engines read.

### Cropping: keep the subject away from the edges

Some places crop an image to a fixed shape. The site crops from the centre, so a
face or a subject at the very edge can be cut off:

- **Thumbnails** are cropped in two different places at two different shapes: the
  home page grid uses upright (4:5) and wide (3:2) slots depending on position, and
  the Work list uses 4:3. Supply the size in the table, but keep the important part
  of the frame near the middle.
- **The home page hero** is shown 16:9 on most screens and much wider (2.39:1) on a
  large desktop, so the top and bottom of that image can be trimmed on big screens.
  Keep faces and key detail in the vertical middle.
- **Stills, behind-the-scenes and archive images** keep their own proportions and
  are not cropped — whatever shape you supply is the shape shown.

---

## 3. Adding a new project

A project is an entry in one list plus a folder of images. Nothing else needs to
change: its page, its place in the Work list, the previous/next links and the
sitemap all follow automatically.

1. **Choose the address.** Lowercase, hyphenated, no spaces:
   `salt-flats`, `night-shift`, `portrait-of-a-house`. This becomes the page
   address, `/work/salt-flats`. It must be unique and should never be reused for a
   different project later.
2. **Create the folder** `public/images/projects/salt-flats/` and put in it at least
   a `thumbnail` and a `poster` (2400 × 1350). Add `still-01`, `still-02` … and
   `bts-01`, `bts-02` … as you have them.
3. **Copy an existing project** in `src/content/projects.ts` and edit it. The
   required fields are `slug`, `title`, `year`, `role`, `category`, `thumbnail` and
   `poster`; everything else is optional:

   ```ts
   {
     slug: "salt-flats",
     title: "Salt Flats",
     year: "2025",
     role: "Director",
     category: "direction",          // see the list of categories below
     summary: "One line for the work list.",
     thumbnail: { src: "/images/projects/salt-flats/thumbnail.jpg", alt: "…", width: 1600, height: 1067 },
     poster:    { src: "/images/projects/salt-flats/poster.jpg",    alt: "…", width: 2400, height: 1350 },
     description: "Two or three sentences about the work.",
     vimeoUrl: "https://vimeo.com/123456789",
     stills: [ … ],
     behindTheScenes: [ … ],
     credits: [ { role: "Editing", name: "Name" } ],
     links: [ { label: "Festival page", href: "https://…" } ],
   }
   ```

   The categories you can use are: `direction`, `cinematography`, `film`,
   `commercial`, `music-video`, `photography`, `visual-art`, `other`. Only the ones
   that actually have projects appear as filters in the Work list.
4. **Publish** (`bun run publish`). The new project is now at `/work/salt-flats`.

Optional sections hide themselves. Leave out `stills`, `behindTheScenes`,
`credits` or `links` (or give an empty list) and that whole section disappears from
the project page — you will never see an empty heading.

**Order matters.** The list in `projects.ts` *is* the order of the site. The home
page's Selected Work grid shows the first six projects after the featured one, and
the Work list shows every project in the same order. To move a project up or down,
move its block of text.

---

## 4. Choosing the featured project

The featured project is the large one at the top of the home page. It is set by one
line in `src/content/projects.ts`:

```ts
featured: true,
```

- Only one project should have it. If several do, the first one wins.
- If none does, the first project in the list is featured.
- The featured project is left out of the Selected Work grid below it, so you always
  see the feature plus six others.
- The wide image at the top comes from that project's `hero` field if it has one
  (currently `public/images/featured/home-hero.jpg`), and otherwise from its
  `poster`. If you feature a project with no `hero`, its poster is stretched across
  a very wide band — check it on a large screen and swap in a wide image if it
  looks wrong.

---

## 5. Adding a video from Vimeo

Each project has one line for its film:

```ts
vimeoUrl: "",
```

Paste a Vimeo link between the quotes. That is the whole step. Accepted forms:

```
https://vimeo.com/123456789                        the normal link
https://vimeo.com/123456789/abcdef1234             an unlisted link (keeps the code)
https://vimeo.com/123456789?h=abcdef1234           the same, with the code as a parameter
https://player.vimeo.com/video/123456789           the embed link
https://player.vimeo.com/video/123456789?h=abcdef1234
https://vimeo.com/channels/staffpicks/123456789    a link from inside a channel
https://vimeo.com/showcase/12345/video/123456789   a link from inside a showcase
123456789                                          just the number
```

**Unlisted videos:** copy the whole link, including the extra code after the number
(`/abcdef1234`) or the `?h=` part. Without that code the video will not play on the
site, even though it plays when you are logged in.

### What the site does with the link

- It reads the video number (and the private code, if there is one) out of the link
  and ignores everything else.
- The project page and the home page show the **poster image with a Play button**.
  Nothing is requested from Vimeo until a visitor presses play, which keeps the page
  fast and means the video player is not loaded for people who never watch.
- On pressing play, the video plays in place, full width, with Vimeo's title,
  byline and portrait switched off.
- The player fits the film into a 16:9 frame, so a very wide film (2.39:1) will show
  thin black bars above and below.
- If the link is empty, or is not a recognisable Vimeo link, the site quietly shows
  the poster with no play button. Nothing breaks and no broken player appears.

### The one setting that must be right in Vimeo

**Your video's privacy settings must allow it to be embedded on this website, or the
player will refuse to play it.** This is set in Vimeo, not on this site, and it is
the single most common reason a video that "works" does not work here.

In the video on Vimeo: **Settings → Privacy → Where can this be embedded.** Choose
either "Anywhere" or "Only on sites I choose", and add the site's domain. If you
restrict it to specific domains, the live domain must be listed exactly, and it must
be added again whenever the domain changes. A video set to "Nowhere" will show a
black player with a Vimeo error message.

Unlisted ("Hide from Vimeo" or a private link) is fine — unlisted videos still play
when embedded, as long as embedding is allowed and the private code is included in
the link.

---

## 6. Editing the words

All text lives in two files in `src/content/`. Nothing is typed twice.

### `src/content/artist.ts` — you, throughout the site

| Field | What it is | Appears |
| --- | --- | --- |
| `name` | Your name | Header, footer, home page headline, every page title |
| `title` | Your professional title, e.g. "Film Director · Cinematographer" | Under the name, in page descriptions |
| `location` | A short location line, e.g. "Based in Lisbon" | Home page and Contact (set to `""` to hide) |
| `shortBio` | Two or three sentences on the practice | Home page, and the site's default description in search results |
| `bio` | Your longer biography — one string per paragraph, as many as you like | About page |
| `statement` | A short first-person artist statement | Home page and About (set to `""` to hide) |
| `background` | Professional history paragraphs | About (set to `[]` to hide) |
| `selectedCredits` | A short list of `{ role, name }` | About (set to `[]` to hide) |
| `portrait` | The portrait image and its alt text | Home page, About, sharing image |
| `email` | Your contact address | Home page and Contact page |
| `availability` | One line, e.g. "Available for commissions" (set to `""` to hide) | Home page and Contact |
| `socials` | A list of `{ label, href }` links | Footer, home page, Contact |
| `siteUrl` | The site's public address — see section 8 | Search results, sharing, sitemap |

### `src/content/projects.ts` — the work

Per project: `title`, `year`, `role` (what you did), `category`, `summary` (one line
for lists), `description` (the paragraph on the project page), `credits` (a list of
`{ role, name }`), and `links` (a list of `{ label, href }` for external pages).

`year` is free text, so `"2024"` and `"2024–25"` both work.

### `src/content/archive.ts` — the visual archive

Each entry has an image, a `caption` and a `year`. Array order is the order shown.

Write in straight quotes and keep the commas between entries. A missing comma or a
stray quote is the most common reason a publish fails — see below.

---

## 7. Publishing, and what to do if it fails

To put your changes live:

```
bun run publish
```

That rebuilds the site, restarts it, and waits until it is actually answering before
it reports success. It takes under a minute. Re-running it is always safe.

If it fails, read the message it prints, and if that is not clear, open the file
`.run/server.log` in the project folder — that is the server's own log and the real
error is usually in the last few lines.

The three causes worth checking first:

1. **A typo in a content file.** A missing comma, a missing quote, or a bracket left
   open. The error names the file and the line — the mistake is usually just above
   it.
2. **An image path that does not match the file.** `src` must start with `/images/`
   and match the folder and file name exactly, including capital letters. A `.jpg`
   saved where the config still says `.svg` counts as a mismatch.
3. **The port is still busy.** Re-run `bun run publish`; it takes the port over
   cleanly and is safe to repeat.

To look at changes before publishing them, run `bun run dev` and open the address it
prints. It may choose a different port if the live site is already using the usual
one — that is normal.

---

## 8. Two things to do before the site is truly live

1. **Set the site's real address.** In `src/content/artist.ts`, `siteUrl` is still a
   provisional address. When your own domain is connected, change it to
   `https://yourdomain.com` and publish. This value is what search engines are told
   is the canonical address of every page, what appears in shared links, and what
   the sitemap lists — if it is wrong, Google will index the wrong address.
2. **Replace the sharing image.** The picture that appears when someone shares the
   site on a social platform is currently a placeholder graphic (an `.svg` file,
   which most platforms will not display). Export one photograph at 1200 × 630 as a
   JPG, save it as `public/images/featured/sharing.jpg`, and point
   `DEFAULT_SHARE_IMAGE` in `src/lib/seo.ts` at `/images/featured/sharing.jpg`.

---

## 9. A note on honesty

Every name, biography, credit, project title and image currently on the site is a
labelled placeholder. None of it describes a real person or real work. Replace it
with your own material before the site is shown to anyone — including the credits,
which are the part a client is most likely to check.
