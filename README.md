# Cross Makele — Portfolio

Next.js + TypeScript + Tailwind. All videos are streamed from Vimeo; nothing heavy lives in the repo.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying

**GitHub Pages (set up already).** Every push to `main` builds the site and publishes it to
`https://savvycross.github.io/cross-portfolio/` via `.github/workflows/deploy.yml`. It also rebuilds daily to keep Vimeo thumbnails fresh.
Pages must be turned on once: repo **Settings → Pages → Source: GitHub Actions**. On a free GitHub plan the repo must be public for Pages to work.

**Vercel (alternative).** Import the repo on vercel.com; no settings needed. Set `NEXT_PUBLIC_SITE_URL` to your domain.

**Your own domain.** Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://crossmakele.com`) so share previews and the sitemap use it.

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

### Vimeo settings

- Hover previews and the hero loop use Vimeo's chromeless background player. This needs a Vimeo **Starter plan or higher**. On a free plan, the poster stays visible and nothing breaks.
- For **unlisted** videos, paste the full share link including the hash (`vimeo.com/123/abcdef`).
- If you restrict embedding to specific domains, add your site's domain in each video's Vimeo privacy settings.
