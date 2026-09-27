# Motion Design Portfolio — Build Prompt (draft v1)

> Anything in `[BRACKETS]` is a placeholder waiting for your real info.

---

build a premium personal portfolio website for [YOUR NAME], a motion designer.

the website exists to show motion work. the work is the hero. the design must frame the videos, not compete with them.

the design direction is simple, clean, premium, modern, and cinematic. think editorial layout + film-screening room.

use this color palette:

[#______] as the main background
[#______] as the signature accent
[#______] as the light / text-on-dark color
[#______] as the main dark
#111111 as black
[#______] as muted gray

do not introduce random colors. let the colors inside the videos be the only "extra" color on the page.

use a clean modern sans-serif such as Geist, Manrope, or Satoshi. an optional mono font (e.g. Geist Mono) may be used for small labels like timecodes, years, and categories.

the website should feel like a premium motion studio portfolio, not a template or a generic agency site.

use strong typography, generous whitespace, clean alignment, subtle borders, and excellent spacing.

avoid excessive glassmorphism, excessive gradients, particles, neon effects, complicated 3D scenes, random floating objects, oversized cursors, and animation for its own sake. the motion on the page should prove taste, not show off.

reference sites: https://veee.app/ and https://www.kree8.studio/ — take their restraint, spacing, and confidence, not their exact layouts.

---

## structure

opening animation
navigation
hero / showreel
selected work
clients
services
tools
about
contact
footer
project detail pages

---

## opening animation

show [YOUR LOGO / NAME / MARK] in the center against the main background.

a short, clean motion moment (scale, mask reveal, or a quick type animation) that hints at what you do.

then transition directly into the showreel, so the reel feels like it is "revealed" by the intro.

keep it around 1 to 1.5 seconds. play it only on the first visit of the session.

do not use a percentage loader or spinning loader.

---

## navigation

[YOUR NAME]

work
services
about
contact
[instagram / behance / vimeo / x — pick what applies]

a small floating navigation with a subtle glass effect, thin border, and light blur.

keep it minimal and sticky. it should sit on top of the showreel without blocking it.

---

## hero / showreel

the showreel is the first thing people see. it fills the top of the page (full-width, close to full viewport height).

the reel autoplays muted, loops, and plays inline (including on iOS).

overlaid in a corner, keep only:
[YOUR NAME]
[motion designer & ___ — your one-line title]
a small "play reel with sound" button

clicking "play reel with sound" opens the full reel in a clean fullscreen player with sound, custom minimal controls (play/pause, mute, progress bar, close), and ESC to close.

below or beside the reel, a short intro line:
[e.g. "I make brands move — 2D, 3D and UI motion for ___"]

buttons:
view work
[get in touch]

subtle interactions only:
the reel slightly scales down / rounds its corners as you scroll into the next section
a custom "play" cursor label appears only when hovering the reel (desktop only)

use a poster image so something shows instantly before the video loads.

---

## selected work

the core of the site.

a grid (or alternating editorial layout) of projects. each project card has:

a looping muted preview video (short 3–6s cut), shown as a still poster until hovered or scrolled into view
project name
client
category (e.g. brand animation, 3D, UI motion, explainer, social)
year

interactions:
on desktop, the preview video plays on hover and pauses when the cursor leaves
on mobile, the preview plays when the card is centered in view
a small cursor label ("view project") on hover, desktop only
optional filter tabs by category: [all / 2D / 3D / brand / UI / social — confirm]

clicking a project opens its own project page.

projects:
[PROJECT 1 — name, client, category, year, preview video, full video]
[PROJECT 2 — ...]
[PROJECT 3 — ...]
[...]

do not invent projects. use clean placeholders until real videos are provided.

---

## project detail page

each project gets its own page with:

a large full video player at the top (with sound controls)
project title, client, year, role, tools used
a short brief: the problem and the idea
[optional] process / breakdown: styleframes, storyboards, before/after, wireframe renders — shown as an image + video gallery
[optional] credits (collaborators, sound design, studio)
"next project" link at the bottom with a preview of the next project's video

---

## clients

[CLIENT / BRAND LIST — grouped by category if you want, e.g. tech, fashion, music, crypto]

do not invent information about these clients.

use clean placeholders for logos until real assets are provided.

make it feel like a premium archive (list with year and type of work), not a logo wall.

---

## services

what i do

[e.g.
BRAND ANIMATION
2D MOTION GRAPHICS
3D ANIMATION
UI / PRODUCT MOTION
SOCIAL & AD CONTENT
TITLE SEQUENCES]

use large editorial typography instead of generic cards.

on hover, each service line can reveal a small looping video clip that follows the cursor (desktop only). on mobile, show a small static thumbnail instead.

---

## tools

[e.g. After Effects, Cinema 4D, Blender, Houdini, Illustrator, Figma, Premiere, DaVinci Resolve, Rive, Lottie]

typographic and minimal. no software logo grid.

---

## about

[YOUR BIO — 2 to 4 short paragraphs]

[optional: portrait photo or a looping self-portrait animation]
[optional: location / timezone / availability status, e.g. "available for freelance from ___"]

present this as a clean editorial section with strong typography and whitespace.

---

## contact

let's make something move

[email address — shown as a large clickable link with copy-to-clipboard]
[social links]

do not create a fake contact form.

---

## footer

[name] © [year]
socials
back to top

---

## motion

use smooth scrolling (Lenis).

use GSAP (with ScrollTrigger) or Framer Motion for subtle animations: fade, slide, scale, mask reveals, and small parallax.

animate the page like an editor would cut it: clean timing, consistent easing, no bouncy or random motion.

keep animations restrained. the website must still look excellent without animation.

---

## video performance (very important)

videos must never make the site slow.

use compressed mp4 (H.264) + webm versions, or a video host ([Vimeo Pro / Mux / Cloudinary / self-hosted — confirm]).

every video has a poster image.

preview videos are short, small (under ~2–3MB), and muted.

lazy-load videos; only load and play them when near the viewport, and pause them when off-screen.

use preload="none" or "metadata" on everything except the showreel preview.

never autoplay with sound.

---

## mobile

design mobile separately instead of simply shrinking desktop.

the showreel stays first and prominent.

project previews play when centered in view instead of on hover.

reduce parallax and motion.

remove custom cursors on mobile.

make navigation simple (a clean full-screen menu).

---

## technical requirements

use Next.js, TypeScript, and Tailwind.

do not install unnecessary libraries (GSAP or Framer Motion, Lenis, and that's it unless needed).

keep project data in one typed file (e.g. `data/projects.ts`) so new projects can be added without touching components.

keep components clean and reusable.

optimize images and videos.

respect prefers-reduced-motion (show posters instead of autoplaying videos, disable parallax).

make the website accessible: keyboard-operable video player, captions support, focus states, alt text.

add proper SEO and Open Graph images for every project page.

---

## most important rule

LESS IS MORE.

the work is the star. the site is the frame.

do not add effects because they look impressive.

do not make every section glass.

do not make everything 3D.

do not make everything animated.

use typography, spacing, color, composition, and the videos themselves to create the premium feel.

the final website should feel polished, expensive, simple, and intentional.

build the complete website now and refine the visual details before considering it finished.
