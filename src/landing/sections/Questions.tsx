import { Box } from "../../components/Box";
import { QUESTIONS } from "../copy";
import { styles } from "../landing.styles";
import { Block } from "./Block";

export function Questions() {
  return (
    <Box as="section" style={styles.section}>
      <Box style={styles.wide}>
        <Block heading="Every decision answers four questions." items={QUESTIONS} />
      </Box>
    </Box>
  );
}
