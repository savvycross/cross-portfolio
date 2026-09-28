# Cross Makele — Portfolio

Next.js + TypeScript + Tailwind. All videos are streamed from Vimeo; nothing heavy lives in the repo.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying

The site is live at **https://cross-portfolio-gamma.vercel.app/**, hosted on Vercel.
Every push to `main` deploys automatically. Pull requests get their own preview link.

`.github/workflows/build.yml` also builds the site on every push, so a broken edit shows up as a red check.

**Your own domain.** In Vercel, go to Project → Settings → Domains and add it. Then set the environment variable
`NEXT_PUBLIC_SITE_URL` to it (e.g. `https://crossmakele.com`) so share previews and the sitemap use it.

A fully static build is also possible (`GITHUB_PAGES=1 npm run build` → `out/`), if you ever move to static hosting.

## Updating content

Everything editable lives in two files. You never need to touch the components.

**`data/site.ts`**: name, headline, bio, email, services, tools, socials, showreel.

- `showreel`: Vimeo link for the reel.
- `openingAnimation`: set to a Vimeo link to loop it in the hero. While it's `null`, the hero loops the showreel.
- `socials`: uncomment and fill in real links. Empty = hidden.

**`data/projects.ts`**: one entry per project, shown in that order.

| Field | What it does |
| --- | --- |
| `video` | Full Vimeo video (project page + default hover preview) |
| `preview` | Optional short 3–6s Vimeo clip used for hover previews |
| `poster` | Optional still, e.g. `/images/sp3nd.jpg`. Defaults to the Vimeo thumbnail |
| `visibility` | `public`, `nda` (listed, no media shown) or `hidden` |
| `concept` | Labels the project as a concept instead of client work |
| `process` / `gallery` | Styleframes, storyboards, stills. Images go in `public/images/`, or use Vimeo links with `type: "video"` |

Leave any optional field out and its section doesn't render.

### Contact form

The "Start a project" form delivers straight to `crossanimations1@gmail.com` via Web3Forms
(key in `data/site.ts` → `form.web3formsKey`; `NEXT_PUBLIC_WEB3FORMS_KEY` overrides it).
Replies go to the visitor's address. Everything happens on the page: the form turns into a
"Message sent" confirmation on success, or shows a retry message if sending fails.

Form options (project types, budgets, timelines) live in `data/site.ts` → `form`.

### Vimeo settings

- Hover previews and the hero loop use Vimeo's chromeless background player. This needs a Vimeo **Starter plan or higher**. On a free plan, the poster stays visible and nothing breaks.
- For **unlisted** videos, paste the full share link including the hash (`vimeo.com/123/abcdef`).
- If you restrict embedding to specific domains, add your site's domain in each video's Vimeo privacy settings.
