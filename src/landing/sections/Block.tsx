import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { styles } from "../landing.styles";

export type Entry = { term: string; definition: string };

/** Heading in a fixed left column, ruled term and definition rows on the right. */
export function Block({ heading, items }: { heading: string; items: Entry[] }) {
  return (
    <Box style={styles.block}>
      <Text as="h2" variant="title" style={styles.blockHeading}>
        {heading}
      </Text>
      <Box as="dl" style={styles.rows}>
        {items.map((item) => (
          <Box key={item.term} style={styles.row}>
            <Text as="dt" style={styles.term}>
              {item.term}
            </Text>
            <Text as="dd" tone="muted" style={styles.definition}>
              {item.definition}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
