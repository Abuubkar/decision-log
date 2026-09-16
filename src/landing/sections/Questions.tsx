import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { QUESTIONS } from "../copy";
import { styles } from "../landing.styles";
import { Entries } from "./Entries";

export function Questions() {
  return (
    <Box as="section" style={styles.section}>
      <Box style={styles.wrap}>
        <Text as="h2" variant="title">
          Every decision answers four questions.
        </Text>
        <Entries items={QUESTIONS} />
      </Box>
    </Box>
  );
}
