# Davaa — Portfolio

Static editorial portfolio at https://davaasren.github.io/. HTML, CSS and JavaScript; no dependencies or build step. GitHub Pages serves the root of `main`. Keep `.nojekyll`.

## Edit content

Edit `data/portfolio.json` for projects, experience, education and capabilities. Main presentation: `index.html`; layout: `styles/main.css`; rendering and motion: `scripts/main.js`. Project URLs are real `work/<slug>/index.html` files, compatible with direct GitHub Pages navigation. If adding projects, add a corresponding static page and update the HTML overview. Existing project introductions have static fallback text.

## Assets still needed

- Place the final recruiter-friendly PDF at `assets/cv/davaa-cv.pdf`, then set `cv.available` to `true` in the data file.
- Add approved Uulzy and Gerte Life screenshots to `assets/projects/`; replace the typographic preview markup with images with descriptive alt text, dimensions and lazy loading.
- Add Uulzy project dates, specific role and implemented features; Gerte Life dates and platform details.
- Add bank-approved chatbot imagery and support-flow details; do not expose internal bank information.
- Add the bachelor’s project title, topic, functionality, technologies, role and screenshots.

Missing information is explicitly marked; previews are typographic placeholders, not product screenshots. The type playground is a real experiment built for this website. No other completed lab projects are claimed.

## Verification

Serve the repository with a local static HTTP server. Check `/`, `/overview.html`, `/lab/`, each `/work/<slug>/`, and `/404.html`. Verify mobile layouts, keyboard navigation and reduced motion. No production compilation is needed: these files are the production artifact. Publish by pushing to `main`.

## Scroll and motion system

`styles/motion.css` and `scripts/motion.js` enhance only the homepage. Locally vendored GSAP 3.13.0, ScrollTrigger 3.13.0 and Lenis 1.3.26 run without a package manager or production build. Lenis uses GSAP’s ticker; ScrollTrigger receives Lenis scroll updates. Touch scrolling stays native.

Desktop: opening masks, hero letter dispersion, an 180vh pinned foundation-to-direction story, scrubbed project masks/scales, overlapping project pins, velocity-sensitive moving type, timeline progress, pointer feedback and a composed ending. Mobile removes all pins and cursor interactions while keeping scroll-controlled reveals. Reduced motion skips Lenis and the animation setup; all content remains visible. GSAP matchMedia reverts animations at breakpoints and cleans up listeners, ticker callbacks and Lenis.

Project previews are still explicitly marked typographic placeholders. Motion applies to those previews until approved imagery is provided.
