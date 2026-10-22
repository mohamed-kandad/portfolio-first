# Mohamed Kandad — Developer Portfolio

The approved dark editorial design, implemented with Next.js 16.3.4 App Router, React 19, strict TypeScript, Tailwind CSS 4, Lucide, React Hook Form, and Zod. No dependencies were added for this redesign. The former 3D/animation libraries were removed from dependency inputs; the signature portrait is a local canvas with a CSS lens.

## Local setup

Requires Node.js 22.13+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev:next
```

`npm run dev:next` uses Next.js. `npm run dev` uses the supplied Sites-compatible Vinext runtime. Bricolage Grotesque (500/800) and DM Sans (400/500) are downloaded at build time by `next/font/google` and served locally. The first build needs network access to Google Fonts.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build:next
```

The build script uses `next build --webpack`, because Turbopack's child-process port binding was unavailable in this environment. It is a normal Next.js production build. Run `npx next start` afterward to serve it.

## Content editing

All primary content is in typed files under `content/`:

- `hero.ts`: headline, chips, marquee, React Native capabilities, portrait path and face coordinates.
- `about.ts`: biography and four highlights.
- `projects.ts`: project descriptions, reusable case-study content, abstract visual labels, and pending fields. `results` is optional and rendered only when supplied.
- `experience.ts`: five confirmed roles, dates, locations, summaries, and responsibilities.
- `education.ts`: education and languages.
- `skills.ts`: seven skill tabs and learning topics.
- `contact.ts`: public contact details, CV link, form copy, and footer.
- `site.ts`: navigation, metadata, and shared labels.

The user-supplied portrait is optimized at `public/images/mohamed.jpg` with orientation normalized and metadata stripped. The About portrait uses `next/image`; the hero has an explicit high-priority preload and a plain image for exact CSS-mask alignment.

## Portrait lens

`components/portfolio/hero-portrait.tsx` uses the same cover-fit calculation as the image (`object-position: 50% 8%`). It samples a small offscreen canvas, removes orange-backdrop cells, and draws a luminance-based character ramp. The constants `faceX`, `faceY`, and `objectPositionY` in `content/hero.ts` are normalized coordinates. The supplied full portrait uses `.56, .31`; re-aim these when replacing or cropping the image.

A single requestAnimationFrame loop controls the lens and 110ms character flicker. It pauses while off-screen or when the tab is hidden. Resizing is debounced. Reduced motion skips the loader, fixes the lens on the face, stops flicker and decorative movement, and leaves all text visible. All listeners, observers, timers, and animation frames clean up on unmount.

## Contact delivery

Direct email, GitHub, LinkedIn, and telephone links work immediately. The form requires server secrets:

```text
RESEND_API_KEY
CONTACT_FROM
CONTACT_TO
```

Use a verified Resend sender for `CONTACT_FROM`. Configure secrets in the host's environment manager; never prefix them with `NEXT_PUBLIC_` or commit local environment files. The form remains visibly disabled until configured. After configuring, test real inbox delivery before public launch. The handler validates requests, checks origin, rejects honeypot submissions, limits message size, applies best-effort per-email throttling, and returns actual provider success/errors. The in-memory rate limit is per process/isolate; use a host-level or durable limiter for public-scale abuse protection.

Public profile values can be overridden with the `NEXT_PUBLIC_*` variables documented in `.env.example`. Rebuild after changing public variables.

## Deployment

### Next.js host

Import the source into a Next.js-compatible host. Build with `npm run build:next` and serve with `npx next start`. Set the canonical URL and public profile configuration before building; set delivery secrets in the server environment.

### Sites

`.openai/hosting.json` preserves the existing private Site identity. The included Vite/Worker integration uses the standard App Router source and preserves server routes. Package using the Sites build helper, then use the Sites source workflow and private deployment tools. Vinext is beta; conventional Next.js deployment remains available.

## Pending content & measured quality

See `CONTENT_CHECKLIST.md` for every pending field. Dashed orange “to confirm” tags identify missing CV, screenshots, years, project links, contributions, and technical details. UI studies use skeletons and em dashes rather than invented data. No unverified results are rendered.

The portfolio includes semantic headings, skip navigation, focus states, keyboard skill tabs, native disclosures, metadata, a PNG Open Graph image, Twitter metadata, JSON-LD Person, sitemap, robots, and a custom 404. Lighthouse targets are 90+ performance and 95+ accessibility/SEO/best practices; only actual measured results should be reported. `CLS 0` is a target, not an unmeasured claim.

## Languages and the opening experience

The portfolio has English, French, and Arabic routes at `/en`, `/fr`, and `/ar`. `/` redirects to English, and old `/projects/:slug` links redirect to their English case studies. The language selector preserves the current page and section. Shared English content remains in the section files; typed French and Arabic dictionaries live in `content/locales/`. Arabic uses Noto Sans Arabic, server-rendered `lang="ar"` / `dir="rtl"`, mirrored layouts, and RTL-aware skill-tab keyboard navigation. The same supplied CV PDF is available in every language; the PDF itself is not translated.

The CV button sits directly beside the contact CTA on desktop and mobile. Small screens use two compact header rows to retain readable controls.

The former name-only loader has been replaced by a brief signal-lock sequence: an outlined MK monogram resolves inside a scanning frame, localized phase text accompanies the animation, and split shutters reveal the hero. It automatically exits within 1.9 seconds, does not intercept input, and is hidden for reduced motion. `content/loader.ts` contains its copy. Both local development and the standard production build use Webpack for reliable style refresh in this environment.
