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

**A decision keeps its history.** Created, edited and status changes all get
recorded, and the detail drawer shows them newest first. Undo takes its own
entry back out rather than writing a second one in the opposite direction,
because undo should mean it never happened.

**The landing page shows the product instead of describing it.** The headline
sits beside a real entry from the log, rendered as live HTML rather than a
picture: a decision the team made in April and replaced in August, with its
history under it. You can select the text.

**No fabricated social proof, and in the end no over-promising either.** The
brief allows inventing features for a marketing page, and an earlier version
did. I cut that section. The page is more convincing with one true thing on it
than with four that are not yet built, and nothing here invents customer logos,
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

**Alternatives considered.** It is the field that turns the form into homework,
so the app does not have it and the landing page no longer claims it does.

**Tests.** No test harness anywhere. The type checker and the linter run on
every commit and in CI, which is the safety net this size of project earns.

**A detail page.** The drawer holds everything, and a URL for a decision would
break on refresh anyway since nothing is stored.
