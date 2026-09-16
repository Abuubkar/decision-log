## Decision

a short explanation of the decisions you made and what you deliberately chose **not** to build

### Build

- used vite+ because it has built support for various tools (formatters, linter, bundlers, etc)
- used react-hook-form for form handling to avoid boilerplate code
- used stylex and not tailwind or others because its more powerful for typing and i don't like tailwind
- used two entry points `/index.html` and `/demo.html` because needed to deploy static pages on github pages. with router could have achieved it with hash urls but avoided extra dependency.
- used drawer instead of modal because by nature its much more stable and consistent.
- built version history feature to increase product viability
- built base component (Box, Button, etc) for ease of use and maintainability

### Not Build

- left out export feature to avoid complexity
- left out persistance as it wasn't needed as per task
- Left out detail page for decision log items, to avoid extra routing and unnecessary load.
- Left out dark mode as it was purely cosmentic addition
- Left out delete functionality as it wasn't needed instead added reset button
- Left out tests because of time
