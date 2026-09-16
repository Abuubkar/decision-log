# Two HTML entry points instead of a client-side router

The landing page and the demo are separate products with separate jobs, and
GitHub Pages serves static files with no rewrite rule. Rather than add a router
and work around the missing rewrite, we build two Vite entry points, `index.html`
and `demo.html`, and link between them with a plain anchor.

## Considered options

A `HashRouter` would work on Pages without server support, but it adds a
dependency and leaves `#/` in every URL. A `BrowserRouter` needs a `404.html`
copy of `index.html` to catch deep links, which breaks the browser's real 404 and
confuses crawlers. A single page that swaps views on state ships one bundle for
two unrelated jobs and gives us no way to link straight to the demo.

## Consequences

The demo's React tree never loads on the landing page, so the page a reviewer
lands on first stays close to static HTML. The cost is `demo.html` in the URL,
which we accept. Anyone adding a third page adds another entry point to
`vite.config.ts` rather than a route.
