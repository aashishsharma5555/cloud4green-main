import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import './index.css'
import App from './App.jsx'

/* Take scroll restoration off the browser, for the whole app, before anything
 * renders.
 *
 * On a reload the browser puts the window back at the offset it left at, and
 * it does that against the *old* document height, in a race with the first
 * paint. On this site that meant a refresh anywhere on the home page came back
 * halfway down it — into the products section — which is not what a reload
 * should mean when the page opens on a hero.
 *
 * It has to live here rather than in the preloader, because the preloader only
 * shows once per tab: refresh the page a second time and it is skipped
 * entirely, so a lock scoped to it would already be gone by the reload that
 * needed it most. Set at module scope, so it is in force before React's first
 * commit and before any restore can be attempted.
 *
 * ScrollToTop then owns the in-app half of the same question. */
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
