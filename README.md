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

| Path                      | What lives there                                               |
| ------------------------- | -------------------------------------------------------------- |
| `index.html`, `demo.html` | The two entry points. There is no router.                      |
| `src/tokens.stylex.ts`    | Colour, type, spacing and radius tokens.                       |
| `src/components`          | Base components wrapping the native elements, one folder each. |
| `src/domain`              | Types, helpers and the seeded decisions.                       |
| `src/landing`             | The landing page, one file per section, copy in `copy.ts`.     |
| `src/demo`                | The working log. State lives in `demo/state`.                  |
| `docs/adr`                | Decisions about the build itself.                              |
| `CONTEXT.md`              | The glossary this codebase writes to.                          |

Every component lives in its own folder with an `index.ts`. A `.styles.ts` exists
where there is a `stylex.create`, a `.types.ts` where there is more than one prop
type, and hooks or context split out where they already exist. A seventeen-line
component does not get four files.

Toolchain is [Vite+](https://viteplus.dev), which brings the build, Oxlint,
Oxfmt and the commit hook under one `vp` command.
