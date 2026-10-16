# Panupong Nijjaboon — portfolio

Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, GSAP + ScrollTrigger. Light "paper and signal" design with
a WebGL colour-field hero, a 3D scroll intro and two CSS-3D helix galleries (work and certifications).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://example.tenfw.com`) so canonical URLs, the sitemap and robots point to
the real domain. Deploys as-is on Vercel or any Node host.

## Where the content lives

The site has two languages: `/en` and `/th` (the root redirects by saved choice, then browser language). The header button switches
and remembers the choice.

| Change | File |
|---|---|
| All wording, EN and TH (UI text, summary, experience, every project) | `lib/content/en.ts`, `lib/content/th.ts` (same shape, see `types.ts`) |
| Contact, GitHub, certificates (grouped by issuer), product logos | `lib/profile.ts` |
| Projects: slugs, screenshots, demo links, numbers, stack | `lib/work.ts` |
| Every technology and tool shown with an icon | `lib/tech.ts` |
| Hero, section order, intro cards | `app/[lang]/page.tsx` |
| Colours, fonts, helix and intro geometry | `app/globals.css` |

### Icons
- Product logos (Platforms section): `public/img/products/<file>.png`, listed in `lib/profile.ts`. 16:10 tile, transparent PNG or SVG.
- Tool icons: drop `public/img/tech/<id>.svg` (or .png / .webp) using the `id` in `lib/tech.ts`. Your file wins; until then the bundled icon in
  `public/img/tech/_auto` (already trimmed to fill the frame) or a text tile is shown. Rebuild after adding files.
- Certificates: `public/img/certs/<slug>.webp`, about 1400 x 1000.

### Videos (optional, picked up automatically if the file exists)
- `public/video/<project>.mp4`: walkthrough on the project page (16:10, about 1440 x 900, H.264, under 10 MB). Names: `tenix-one`,
  `tenix-deepspace`, `project-hub`, `tenix-fullsnap`, `recon-tool`.
- `public/video/<project>-card.mp4`: silent 4 to 8 second loop played on the work helix card at the front (16:10, under 2 MB).
- `public/video/about.mp4`: short self-introduction under the portrait (4:5 or 16:10).

### CV
`npm run` is not needed: `node scripts/build-cv.mjs && python3 scripts/render-cv.py` rebuilds `public/cv/Panupong-Nijjaboon-CV-EN.pdf`
and `-TH.pdf` from the same content files (needs Node 22 and Playwright with Chromium).

To add a certificate: image in `public/img/certs/<slug>.webp` plus a row in `certs` (`lib/profile.ts`; keep an issuer's rows together).
To add a project: `lib/work.ts` (data) plus its text in both content files, and its slug in `types.ts`.

## How the motion works

- **Hero shader** (`components/ui/ShaderBackground.tsx`): a small fragment shader (fbm noise mapped to `lib/palette.ts`)
  at half resolution and ~30 fps. It pauses offscreen, in hidden tabs and for reduced motion, has a visible
  Pause/Play button, and falls back to a static CSS gradient.
- **Intro** (`IntroStage.tsx`): a sticky pinned stage; scroll scrubs a GSAP timeline that swings statements in
  3D and flies cards, logos and tool icons from far away past the camera; a Three.js star-field runs behind it; after the last line the ship goes to warp (streaks stretch) and the screen floods with light into the next section.
- Hero: `public/video/hero.mp4` (looping background) and `public/img/me/hero.webp` (your photo, transparent background, bottom right). Replace either file to change it; `hero-poster.jpg` is the still shown before the video loads or with reduced motion.
- Smooth scrolling is Lenis (`components/animations/SmoothScroll.tsx`); the round up/down buttons are `components/ui/ScrollButtons.tsx`.
- **Helix** (`Helix.tsx`): GSAP only tweens one CSS variable `--p` (0 to 1). CSS computes every card's position with
  `sin()`/`cos()` so cards spiral up and toward you. Only cards near the front are focusable (`inert` on the rest).
- No JS or `prefers-reduced-motion`: the intro is stacked text and both helixes become plain responsive grids.

## Notes on content

- Everything about you comes from your CV and project descriptions and certificate files.
  Numbers carry the qualifier from their source (for example the 15.8x compression is "measured on one development
  dataset").
- The demos run in the browser on invented data. The TENIX One and Project Hub sign-in pages pre-fill demo credentials.
- Product logos belong to their owners and are shown only to say which platforms you have worked with.
- Your phone number is public on the page (it is on your CV). Remove it from `contact` in `lib/profile.ts` if you prefer.
