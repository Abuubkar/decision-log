# Decision Log

A place to record the decisions a team has already made: what was decided, why,
when, and whether it still holds.

Live at **https://abuubkar.github.io/decision-log/**. The demo is at
[/demo.html](https://abuubkar.github.io/decision-log/demo.html).

Nothing is saved. The demo opens on seeded data and a refresh puts it back.

## Running it

```bash
npm install
npm run dev
```

`npm run check` runs the formatter, the linter and the type checker in one pass.
`npm run build` writes to `dist`.

## How it is put together

| Path                      | What lives there                              |
| ------------------------- | --------------------------------------------- |
| `index.html`, `demo.html` | The two entry points. There is no router.     |
| `src/tokens.stylex.ts`    | Colour, type, spacing and radius tokens.      |
| `src/components`          | Base components wrapping the native elements. |
| `src/domain`              | Types, helpers and the seeded decisions.      |
| `src/landing`             | The landing page, with its copy in one file.  |
| `src/demo`                | The working log.                              |
| `docs/adr`                | Decisions about the build itself.             |
| `CONTEXT.md`              | The glossary this codebase writes to.         |

Toolchain is [Vite+](https://viteplus.dev), which brings the build, Oxlint,
Oxfmt and the commit hook under one `vp` command.
