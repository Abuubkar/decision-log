import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { CLOSING } from "../copy";
import { DEMO_HREF, styles } from "../landing.styles";

export function Closing() {
  return (
    <Box as="section" style={styles.section}>
      <Box style={styles.wrap}>
        <Text as="h2" variant="title">
          {CLOSING.heading}
        </Text>
        <Text tone="muted" style={styles.prose}>
          {CLOSING.support}
        </Text>
        <Text as="a" href={DEMO_HREF} style={styles.cta}>
          Try the demo
        </Text>
      </Box>
    </Box>
  );
}
