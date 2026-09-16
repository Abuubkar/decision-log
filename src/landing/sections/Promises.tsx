import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { PROMISES } from "../copy";
import { styles } from "../landing.styles";
import { Entries } from "./Entries";

/** Where the over-promising lives. Claims about the product, never about anyone else. */
export function Promises() {
  return (
    <Box as="section" style={[styles.section, styles.sunk]}>
      <Box style={styles.wrap}>
        <Text as="h2" variant="title">
          And keeps going.
        </Text>
        <Entries items={PROMISES} />
      </Box>
    </Box>
  );
}
