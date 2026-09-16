import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { FOOTER } from "../copy";
import { styles } from "../landing.styles";

export function Footer() {
  return (
    <Box as="footer" style={styles.footer}>
      <Box style={styles.wrap}>
        <Text variant="small" tone="faint">
          {FOOTER}
        </Text>
      </Box>
    </Box>
  );
}
