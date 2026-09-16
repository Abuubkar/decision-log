import * as stylex from "@stylexjs/stylex";
import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { LogFilters } from "../../demo/Log/LogFilters";
import { LogList } from "../../demo/Log/LogList";
import { StatusDot } from "../../demo/StatusDot";
import { useLog } from "../../demo/state";
import { formatDecidedOn } from "../../domain/decisions";
import { CLOSING, FOOTER, PROMISES, QUESTIONS } from "../copy";
import { DEMO_HREF } from "../landing.styles";
import { ProductShot } from "../sections";
import { Specimen, byId } from "./Specimen";
import { p } from "./prototype.styles";

/**
 * PROTOTYPE. Three variants of the landing page, switchable via ?variant=,
 * on the existing index.html route.
 *
 * Question: what makes this page convincing to founders without reading as
 * AI-made? The research pointed at three things the current page lacks:
 * show the product doing the job (not a screenshot of it), be specific
 * (real entries, real dates, real names), and break the uniform column.
 *
 *   A  Specimen hero. A real decision rendered live next to the headline.
 *   B  One decision, read later. The page follows one call across a year.
 *   C  The log is the page. The working log embedded as the hero object.
 */

function Footer() {
  return (
    <Box as="footer" style={p.footer}>
      <Box style={p.wrap}>
        <Text variant="small" tone="faint">
          {FOOTER}
        </Text>
      </Box>
    </Box>
  );
}

function Pairs({ items }: { items: { term: string; definition: string }[] }) {
  return (
    <Box style={p.cGrid}>
      {items.map((item) => (
        <Box key={item.term}>
          <Text as="h3" style={p.cTerm}>
            {item.term}
          </Text>
          <Text tone="muted" style={p.cDef}>
            {item.definition}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

/* ---------------------------------------------------------------- A */

/** Heading on the left, ruled rows on the right. Both blocks share one skeleton. */
function Block({
  heading,
  items,
}: {
  heading: string;
  items: { term: string; definition: string }[];
}) {
  return (
    <Box style={p.aBlock}>
      <Text as="h2" variant="title" style={p.aBlockHeading}>
        {heading}
      </Text>
      <Box as="dl" style={p.aRows}>
        {items.map((item) => (
          <Box key={item.term} style={p.aRow}>
            <Text as="dt" style={p.cTerm}>
              {item.term}
            </Text>
            <Text as="dd" tone="muted" style={p.aRowDef}>
              {item.definition}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function VariantA() {
  return (
    <Box style={p.page}>
      <Box as="header" style={[p.wide, p.aHero]}>
        <Box>
          <Text as="h1" variant="display" style={p.aHeadline}>
            Six months from now, someone will ask why.
          </Text>
          <Text tone="muted" style={p.aSupport}>
            Decision Log keeps what your team decided, who decided it, and the reasoning, in the
            words of the person who made the call. The entry on the right is one of eleven in the
            demo.
          </Text>
          <Box style={p.aActions}>
            <Text as="a" href={DEMO_HREF} style={p.cta}>
              Try the demo
            </Text>
            <Text as="a" href="#log" style={p.ctaGhost}>
              See the whole log
            </Text>
          </Box>
        </Box>
        <Specimen decision={byId("d8")} caption="A decision the team later replaced" />
      </Box>

      <Box as="section" style={[p.section, p.sunk]}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            The reasoning is the part that goes missing.
          </Text>
          <Text tone="muted" style={p.prose}>
            A call gets made on a Tuesday afternoon. Four people agree, someone ships it, and the
            reasoning stays where it was argued. A year later the person who made it has moved on,
            or the constraint that forced their hand has gone, and the decision looks arbitrary. So
            someone reopens it, and the team spends an afternoon rebuilding an argument it already
            won.
          </Text>
          <Text tone="muted" style={p.prose}>
            Writing it down takes two minutes on the day, while it is still in your head. The entry
            above took Marcus about that long. It held for four months, and the log says when it
            stopped.
          </Text>
        </Box>
      </Box>

      <Box id="log">
        <ProductShot />
      </Box>

      <Box as="section" style={p.section}>
        <Box style={p.wide}>
          <Block heading="Every decision answers four questions." items={QUESTIONS} />
        </Box>
      </Box>

      <Box as="section" style={[p.section, p.sunk]}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            {CLOSING.heading}
          </Text>
          <Text tone="muted" style={p.prose}>
            {CLOSING.support}
          </Text>
          <Box style={p.aActions}>
            <Text as="a" href={DEMO_HREF} style={p.cta}>
              Try the demo
            </Text>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

/* ---------------------------------------------------------------- B */

function Row({ id, faded = false }: { id: string; faded?: boolean }) {
  const d = byId(id);
  return (
    <Box style={[p.bRow, faded && p.faded]}>
      <Box>
        <Text as="h3" variant="heading" style={p.cardTitle}>
          <StatusDot status={faded ? "superseded" : "active"} />
          {d.title}
        </Text>
        <Text tone="muted">{d.statement}</Text>
      </Box>
      <Box style={p.meta}>
        <span>{formatDecidedOn(d.decidedOn)}</span>
        <span {...stylex.props(p.status, faded ? p.superseded : p.active)}>
          {faded ? "superseded" : "active"}
        </span>
      </Box>
    </Box>
  );
}

function Step({ when, sub, children }: { when: string; sub: string; children: React.ReactNode }) {
  return (
    <Box style={p.bStep}>
      <Box>
        <Text as="h2" style={p.bWhen}>
          {when}
        </Text>
        <Text variant="small" tone="faint" style={p.bWhenSub}>
          {sub}
        </Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

export function VariantB() {
  const perVehicle = { ...byId("d2"), status: "active" as const };
  return (
    <Box style={p.page}>
      <Box as="header" style={[p.wide, p.bHero]}>
        <Text as="h1" variant="display" style={p.bHeadline}>
          What a decision looks like a year later.
        </Text>
        <Text tone="muted" style={p.prose}>
          Decision Log records what your team decided and why, so the reasoning survives the people
          and the constraints that produced it. Here is one decision from the demo, followed through
          fourteen months.
        </Text>
      </Box>

      <Box style={[p.wide, p.bLayout]}>
        <Box>
          <Step when="2 May 2024" sub="Marcus writes it down the day the team agrees">
            <Specimen decision={perVehicle} showHistory={false} caption="As first recorded" />
          </Step>

          <Step when="8 Jul 2025" sub="Fourteen months on, the same problem comes back">
            <Text tone="muted" style={p.prose}>
              Renewals had turned into arguments about vehicle counts. Marcus records the new
              pricing and marks the old one superseded. The old entry stays in the log. It fades,
              and it says why it stopped.
            </Text>
            <Box style={p.bPair}>
              <Row id="d9" />
              <Row id="d2" faded />
            </Box>
          </Step>

          <Step when="Spring 2026" sub="Someone new asks why pricing works this way">
            <Text style={p.bQuote}>
              “Why don’t we just charge per vehicle? That’s how depots budget.”
            </Text>
            <Text tone="muted" style={p.prose}>
              They open the log, filter to GTM, and read both entries. The first says exactly why
              per vehicle made sense. The second says exactly why it stopped making sense. The
              argument does not get rebuilt. It gets read.
            </Text>
            <Box style={p.bPair}>
              <Specimen decision={byId("d9")} caption="As it reads today" />
            </Box>
          </Step>
        </Box>

        <Box as="aside" style={p.bRail}>
          <Text style={p.serifLead}>Every entry answers four questions.</Text>
          {QUESTIONS.map((q) => (
            <Box key={q.term}>
              <Text style={p.strong}>{q.term}</Text>
              <Text variant="small" tone="muted">
                {q.definition}
              </Text>
            </Box>
          ))}
          <Text as="a" href={DEMO_HREF} style={p.cta}>
            Try the demo
          </Text>
        </Box>
      </Box>

      <Box as="section" style={[p.section, p.sunk]}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            And keeps going.
          </Text>
          <Pairs items={PROMISES} />
        </Box>
      </Box>

      <Box as="section" style={p.section}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            {CLOSING.heading}
          </Text>
          <Text tone="muted" style={p.prose}>
            {CLOSING.support}
          </Text>
          <Box style={p.aActions}>
            <Text as="a" href={DEMO_HREF} style={p.cta}>
              Try the demo
            </Text>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

/* ---------------------------------------------------------------- C */

export function VariantC() {
  // Rows would open a drawer the landing page does not render, so they go to the demo.
  const log = { ...useLog(), view: () => window.location.assign(DEMO_HREF) };
  return (
    <Box style={p.page}>
      <Box style={p.wide}>
        <Box as="header" style={p.cTop}>
          <Text as="span" style={p.cBrand}>
            Decision Log
          </Text>
          <Text as="a" href={DEMO_HREF} style={p.ctaGhost}>
            Try the demo
          </Text>
        </Box>

        <Box style={p.cHero}>
          <Text as="h1" variant="display" style={p.cHeadline}>
            What your team decided, and why, two years on.
          </Text>
          <Text tone="muted">
            This is the log from the demo, working. Eleven decisions from a team that sells route
            planning to waste collection firms. Filter it. The faded ones stopped holding.
          </Text>
        </Box>

        <Box style={p.cLogWrap}>
          <Box style={p.cLogBox}>
            <Box style={p.cLogBody}>
              <LogFilters log={log} />
              <LogList log={log} />
            </Box>
            <Box style={p.cLogFoot}>
              <Text variant="small" tone="muted">
                Rows open in the demo. Add your own there, change a status, and see how it reads.
              </Text>
              <Text as="a" href={DEMO_HREF} style={p.cta}>
                Try the demo
              </Text>
            </Box>
          </Box>

          <Box as="aside" style={p.cNotes}>
            {[
              [
                "Newest first, by year",
                "A log reads the way a team remembers: what did we decide last?",
              ],
              [
                "Hollow dot, faded row",
                "Superseded or reversed. The entry keeps its place and says so.",
              ],
              [
                "Who and which area",
                "Filter by one person and read how they think before you hand them the next call.",
              ],
              [
                "The reasoning, in full",
                "Three lines here. The whole thing in the drawer. It is the reason to keep a log at all.",
              ],
            ].map(([term, def]) => (
              <Box key={term} style={p.cNote}>
                <Text style={p.strong}>{term}</Text>
                <Text variant="small" tone="muted">
                  {def}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box as="section" style={[p.section, p.sunk]}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            The reasoning is the part that goes missing.
          </Text>
          <Text tone="muted" style={p.prose}>
            A call gets made on a Tuesday afternoon. Four people agree, someone ships it, and the
            reasoning stays where it was argued. A year later the person who made it has moved on,
            or the constraint that forced their hand has gone, and the decision looks arbitrary.
            Writing it down takes two minutes on the day. It holds for years.
          </Text>
        </Box>
      </Box>

      <Box as="section" style={p.section}>
        <Box style={p.wide}>
          <Box style={p.aTwoCol}>
            <Box>
              <Text as="h2" variant="title">
                Every decision answers four questions.
              </Text>
              <Pairs items={QUESTIONS} />
            </Box>
            <Box>
              <Text as="h2" variant="title">
                And keeps going.
              </Text>
              <Pairs items={PROMISES} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box as="section" style={[p.section, p.sunk]}>
        <Box style={p.wrap}>
          <Text as="h2" variant="title">
            {CLOSING.heading}
          </Text>
          <Text tone="muted" style={p.prose}>
            {CLOSING.support}
          </Text>
          <Box style={p.aActions}>
            <Text as="a" href={DEMO_HREF} style={p.cta}>
              Try the demo
            </Text>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
