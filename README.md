# Fernando Guerra | Portfolio

A dark, editorial portfolio for Fernando Guerra: growth operator, AI product builder and founder.

**Live:** [guerra2fernando.github.io](https://guerra2fernando.github.io)

Built with Next.js 15 (static export), React 19, Tailwind CSS, shadcn-style UI primitives and Three.js. Published to GitHub Pages from the `gh-pages` branch.

## Pages

- `/` : entrance, interactive 3D signal engine, selected work, operating stack, experience preview
- `/about/` : story, principal industries, highlights, principles, toolbox, education
- `/developments/` : filterable archive of 35+ projects and the full experience timeline

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static site is written to `out/`.

## Editing content

All projects, experience entries, stack groups and copy live in [`lib/data.ts`](lib/data.ts). Add a project by appending an object to the `projects` array; the archive, filters and detail dialog update automatically.

The hero scene is in [`components/hero-scene.tsx`](components/hero-scene.tsx). It uses a particle sphere, orbital rings, a wireframe core and pointer-driven repulsion. It falls back to a CSS orb if WebGL is unavailable and respects `prefers-reduced-motion`.

## Deployment

The live site is published from the `gh-pages` branch. GitHub Actions is not required.

To build and publish an update:

```powershell
npm run deploy
```

This builds the static export, copies `out/` into a clean temporary directory, force-pushes it to `gh-pages` with a root `.nojekyll`, and waits for GitHub Pages to build the new commit.

GitHub Pages is configured with **Source: Deploy from a branch → `gh-pages` → `/ (root)`**. The expected URL is `https://guerra2fernando.github.io`.

If you later enable GitHub Actions billing, you can add a workflow that runs `npm ci && npm run build` and publishes `out/`; the static export is already compatible.

## Notes

- This is a user GitHub Pages site, so no `basePath` is required.
- CV PDFs are served from `public/cv/` in light and dark variants.
- Fonts are self-hosted in `public/fonts/` to keep builds deterministic.
- The Open Graph image is `public/og.png`.
