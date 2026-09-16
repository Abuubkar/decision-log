import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { styles } from "../landing.styles";

export type Entry = { term: string; definition: string };

/** A definition list set as rows rather than as icon cards. */
export function Entries({ items }: { items: Entry[] }) {
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
