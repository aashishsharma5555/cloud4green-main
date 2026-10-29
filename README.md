# Cloud4Green website

Marketing site for Cloud4Green, built with React 19, Vite, Tailwind CSS v4 and React Router.

## Scripts

```bash
npm install        # install dependencies
npm run dev        # dev server (HTTPS, self-signed - click through the browser warning)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint
```

## Deploying

Run `npm run build` and upload the contents of `dist/` to the web root.

The build writes one HTML file per route (each with its own title and meta tags), plus
`sitemap.xml`, `robots.txt`, `_redirects` (Netlify) and `.htaccess` (Apache / cPanel).
Routes and SEO data live in `src/config/seo.js`; don't edit the generated files by hand.

## Project structure

```
cloud4green/
├── index.html              HTML shell (Vite entry)
├── public/                 files served as-is: favicon, logos, og-image, PDF catalogue
├── scripts/                one-off generators for the hero map/globe dot data
├── src/
│   ├── main.jsx            app entry: fonts, global CSS, <App />
│   ├── App.jsx             routes
│   ├── index.css           Tailwind setup and global styles
│   ├── pages/              one file per route
│   │   ├── products/       /products/*
│   │   └── services/       /services/*
│   ├── components/
│   │   ├── layout/         Navbar (+ navbar/ parts), Footer, Container, Section, SEO
│   │   ├── ui/             shadcn/ui primitives
│   │   ├── sections/       homepage sections (and shared ones like enterprise-cta)
│   │   ├── <feature>/      sections for one page: automation, certifications,
│   │   │                   consulting, e-learning, enterprise, enterprise-labs, ...
│   │   └── common/ motion/ backgrounds/ brand/ illustrations/ preloader/
│   ├── hooks/              custom React hooks (useXxx.js)
│   ├── config/             navigation, SEO, downloads
│   ├── data/               static content (FAQs, testimonials, ...)
│   ├── lib/ utils/         helpers
│   ├── styles/             component stylesheets
│   └── assets/             images and fonts imported from code
└── package.json
```

### Conventions

- Folders: `kebab-case`. Components: `PascalCase.jsx`. Hooks: `useCamelCase.js`.
- Import through the `@/` alias (`@/components/...`), which points to `src/`.
- Images used in code go in `src/assets/images/`; files that need a fixed URL go in `public/`.
