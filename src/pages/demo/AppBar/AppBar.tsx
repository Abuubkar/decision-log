import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { styles } from "./appBar.styles";

/** Reset demo lives up here because it is the only control that rewrites the whole log. */
export function AppBar({ onReset }: { onReset: () => void }) {
  return (
    <Box as="header" style={styles.bar}>
      <Box style={styles.inner}>
        <Text as="a" href="./index.html" style={styles.mark}>
          Decision Log
        </Text>
        <Button onClick={onReset}>Reset demo</Button>
      </Box>
    </Box>
  );
}
