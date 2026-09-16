import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { HERO } from "../copy";
import { DEMO_HREF, styles } from "../landing.styles";

export function Hero() {
  return (
    <Box as="header" style={styles.hero}>
      <Box style={styles.wrap}>
        <Text as="h1" variant="display" style={styles.headline}>
          {HERO.headline}
        </Text>
        <Text tone="muted" style={styles.support}>
          {HERO.support}
        </Text>
        <Text as="a" href={DEMO_HREF} style={styles.cta}>
          Try the demo
        </Text>
      </Box>
    </Box>
  );
}
