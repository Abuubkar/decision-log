> Draft. Rewrite this in your own words before sending it.

# What I decided, and what I left out

## Decided

**Two HTML pages instead of a router.** GitHub Pages serves static files and has
no rewrite rule, so a client-side router means either hash URLs or a `404.html`
trick. Two Vite entry points give real URLs, no routing dependency, and a
landing page whose JavaScript does almost nothing.

**The demo forgets everything.** State lives in memory. A refresh restores the
seeded decisions. I put a visible Reset demo control in the app bar so that
reads as a sandbox rather than as data loss.

**Rows do not change anything.** A row shows a decision and opens a drawer. All
writing happens in the drawer. Scanning a list and acting on it are different
jobs and they now have different places.

**Superseded decisions stay visible.** They fade, their status dot goes hollow,
and they keep their position in the list. Hiding them would lose the point of
keeping a log.

**The seed data took longer than the code.** Eleven decisions from one invented
company across two years, including one the team reversed and admitted they got
wrong. Generated placeholder data is the fastest way to make a product look
fake.

**No fabricated social proof.** The brief allows over-promising, so the landing
page promises features that do not exist. It does not invent customer logos,
testimonials or usage numbers, because those are claims about other people.

## Left out

**Dark mode.** The design is warm paper and ink. There is no honest dark
translation of it, and a half-finished one is a visible defect.

**Delete.** Reset demo covers the only case a demo needs.

**Persistence.** The brief allows data to disappear. Adding storage would have
meant deciding what happens on a schema change, for no gain here.

**A link from a superseded decision to the one that replaced it.** The prototype
showed this gap clearly: reading "superseded" and having no way to reach the
replacement feels unfinished. It needs a relation in the domain model and a
picker in the form, and I chose the seed data instead.

**Alternatives considered.** Promised on the landing page, absent from the app.
It is the field that turns the form into homework.

**Tests.** No test harness anywhere. The type checker and the linter run on
every commit and in CI, which is the safety net this size of project earns.

**A detail page.** The drawer holds everything, and a URL for a decision would
break on refresh anyway since nothing is stored.
