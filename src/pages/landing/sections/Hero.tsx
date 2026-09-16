import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { HERO } from "../copy";
import { DEMO_HREF, styles } from "../landing.styles";
import { Specimen, byId } from "./Specimen";

/**
 * The headline sits beside a real entry from the log. The product does the
 * arguing, and the page has something to be specific about.
 */
export function Hero() {
  return (
    <Box as="header" style={[styles.wide, styles.hero]}>
      <Box>
        <Text as="h1" variant="display" style={styles.headline}>
          {HERO.headline}
        </Text>
        <Text tone="muted" style={styles.support}>
          {HERO.support}
        </Text>
        <Box style={styles.actions}>
          <Text as="a" href={DEMO_HREF} style={styles.cta}>
            Try the demo
          </Text>
          <Text as="a" href="#log" style={styles.ctaGhost}>
            See the whole log
          </Text>
        </Box>
      </Box>
      <Specimen decision={byId("d8")} caption="A decision the team later replaced" />
    </Box>
  );
}
