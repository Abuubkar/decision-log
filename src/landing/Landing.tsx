import * as stylex from "@stylexjs/stylex";
import productShot from "../assets/product-shot.png";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { colors, radii, space, type } from "../tokens.stylex";
import { CLOSING, FOOTER, HERO, PROBLEM, PROMISES, QUESTIONS } from "./copy";

const styles = stylex.create({
  page: { backgroundColor: colors.paper, color: colors.ink },
  wrap: {
    maxWidth: "760px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  wide: {
    maxWidth: "1100px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  hero: {
    paddingTop: { default: "140px", "@media (max-width: 780px)": space.xxl },
    paddingBottom: { default: "100px", "@media (max-width: 780px)": space.xl },
  },
  headline: { maxWidth: "11ch" },
  support: {
    fontSize: { default: "19px", "@media (max-width: 780px)": "17px" },
    maxWidth: "46ch",
    marginTop: space.xl,
  },
  cta: {
    display: "inline-block",
    marginTop: space.xl,
    backgroundColor: { default: colors.ink, ":hover": "#000" },
    color: colors.paper,
    borderRadius: radii.sm,
    paddingBlock: "14px",
    paddingInline: space.lg,
    fontSize: "16px",
    fontWeight: 500,
    textDecorationLine: "none",
  },
  section: {
    paddingBlock: { default: "88px", "@media (max-width: 780px)": space.xxl },
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  sunk: { backgroundColor: colors.paperSunk },
  prose: {
    fontSize: { default: "18px", "@media (max-width: 780px)": "16px" },
    lineHeight: 1.7,
    maxWidth: "58ch",
    marginTop: space.lg,
  },
  shotFrame: {
    marginTop: space.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.lg,
    overflow: "hidden",
    boxShadow: "0 18px 50px rgba(27, 24, 21, 0.10)",
  },
  shot: { display: "block", width: "100%", height: "auto" },
  caption: { marginTop: space.md },
  list: { margin: 0, marginTop: space.xl, display: "grid", gap: space.lg },
  entry: {
    display: "grid",
    gridTemplateColumns: { default: "220px 1fr", "@media (max-width: 780px)": "1fr" },
    gap: { default: space.lg, "@media (max-width: 780px)": space.xs },
    paddingTop: space.base,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  term: { fontFamily: type.serif, fontSize: "20px", fontWeight: 600, margin: 0 },
  definition: { margin: 0, maxWidth: "52ch" },
  footer: {
    paddingBlock: space.xl,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
});

const DEMO = "./demo.html";

function Entries({ items }: { items: { term: string; definition: string }[] }) {
  return (
    <Box as="dl" style={styles.list}>
      {items.map((item) => (
        <Box key={item.term} style={styles.entry}>
          <Text as="dt" style={styles.term}>
            {item.term}
          </Text>
          <Text as="dd" tone="muted" style={styles.definition}>
            {item.definition}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export function Landing() {
  return (
    <Box style={styles.page}>
      <Box as="header" style={styles.hero}>
        <Box style={styles.wrap}>
          <Text as="h1" variant="display" style={styles.headline}>
            {HERO.headline}
          </Text>
          <Text tone="muted" style={styles.support}>
            {HERO.support}
          </Text>
          <Text as="a" href={DEMO} style={styles.cta}>
            Try the demo
          </Text>
        </Box>
      </Box>

      <Box as="section" style={styles.section}>
        <Box style={styles.wrap}>
          <Text as="h2" variant="title">
            {PROBLEM.heading}
          </Text>
          {PROBLEM.paragraphs.map((paragraph) => (
            <Text key={paragraph} tone="muted" style={styles.prose}>
              {paragraph}
            </Text>
          ))}
        </Box>
      </Box>

      <Box as="section" style={[styles.section, styles.sunk]}>
        <Box style={styles.wide}>
          <Text as="h2" variant="title">
            A log a team has actually kept.
          </Text>
          <Box style={styles.shotFrame}>
            <img
              src={productShot}
              alt="The Decision Log demo, showing eleven decisions filtered by status and area, with superseded entries faded."
              width={2240}
              height={1760}
              loading="lazy"
              {...stylex.props(styles.shot)}
            />
          </Box>
          <Text variant="small" tone="faint" style={styles.caption}>
            Two years from one team. The faded entries stopped holding.
          </Text>
        </Box>
      </Box>

      <Box as="section" style={styles.section}>
        <Box style={styles.wrap}>
          <Text as="h2" variant="title">
            Every decision answers four questions.
          </Text>
          <Entries items={QUESTIONS} />
        </Box>
      </Box>

      <Box as="section" style={[styles.section, styles.sunk]}>
        <Box style={styles.wrap}>
          <Text as="h2" variant="title">
            And keeps going.
          </Text>
          <Entries items={PROMISES} />
        </Box>
      </Box>

      <Box as="section" style={styles.section}>
        <Box style={styles.wrap}>
          <Text as="h2" variant="title">
            {CLOSING.heading}
          </Text>
          <Text tone="muted" style={styles.prose}>
            {CLOSING.support}
          </Text>
          <Text as="a" href={DEMO} style={styles.cta}>
            Try the demo
          </Text>
        </Box>
      </Box>

      <Box as="footer" style={styles.footer}>
        <Box style={styles.wrap}>
          <Text variant="small" tone="faint">
            {FOOTER}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
