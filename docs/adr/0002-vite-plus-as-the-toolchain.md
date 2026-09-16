# Vite+ as the toolchain

Vite+ bundles the build, the linter (Oxlint), the formatter (Oxfmt) and commit
hook management behind one `vp` CLI. We use it instead of assembling Vite,
ESLint, Prettier, husky and lint-staged by hand, because this project's stated
constraint is to avoid dependencies that duplicate something already built in.
It is free for individuals and open source projects, which covers this repo.

## Consequences

`vite.config.ts` imports `defineConfig` from `vite-plus` rather than `vite`, and
the commit hook lives in `.vite-hooks/pre-commit` driven by a `staged` block in
that same config. Five dev dependencies disappear.

Two things stayed unverified when we chose this. StyleX compiles through
`@stylexjs/unplugin`, and nothing we found confirms that combination works on
Vite+'s Rolldown-based build. Vite+'s docs also do not say whether CI needs a
license key, which matters because we deploy from GitHub Actions. The scaffolding
PR tests both. If either fails, the fallback is plain Vite with Oxlint and Oxfmt
installed directly, which keeps the linter and formatter and loses only the
unified CLI.
