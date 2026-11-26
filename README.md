# Fernando Guerra — Portfolio

A dark, editorial portfolio for Fernando Guerra: AI engineer, growth operator and founder.

Built with Next.js 15 (static export), React 19, Tailwind CSS, shadcn-style UI primitives and Three.js. Deployed to GitHub Pages.

## Pages

- `/` — entrance, interactive 3D signal engine, selected work, operating stack, experience preview
- `/about/` — story, principal industries, highlights, principles, toolbox, education
- `/developments/` — filterable archive of 35+ projects and the full experience timeline

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

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the static export and publishes it to GitHub Pages on every push to `main`.

To enable Pages for this repository:

1. Go to **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main`.

The expected URL is `https://guerra2fernando.github.io`.

## Notes

- The site is a user GitHub Pages site, so no `basePath` is required.
- CV PDFs are served from `public/cv/`.
- Fonts are self-hosted in `public/fonts/` to keep builds deterministic.
