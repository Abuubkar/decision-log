import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { PROBLEM } from "../copy";
import { styles } from "../landing.styles";

export function Problem() {
  return (
    <Box as="section" style={[styles.section, styles.sunk]}>
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
  );
}
