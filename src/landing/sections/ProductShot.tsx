import * as stylex from "@stylexjs/stylex";
import productShot from "../../assets/product-shot.png";
import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { styles } from "../landing.styles";

/** A real capture of the running demo, not an illustration of one. */
export function ProductShot() {
  return (
    <Box as="section" style={[styles.section, styles.sunk]}>
      <Box style={styles.wide}>
        <Text as="h2" variant="title">
          A log a team has actually kept.
        </Text>
        <Box style={styles.shotFrame}>
          <img
            src={productShot}
            alt="The Decision Log demo, showing eleven decisions filtered by status and area, with superseded entries faded."
            width={2240}
            height={1760}
            loading="lazy"
            {...stylex.props(styles.shot)}
          />
        </Box>
        <Text variant="small" tone="faint" style={styles.caption}>
          Two years from one team. The faded entries stopped holding.
        </Text>
      </Box>
    </Box>
  );
}
