import * as stylex from "@stylexjs/stylex";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { colors, space, type } from "../tokens.stylex";

const styles = stylex.create({
  bar: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.base,
    maxWidth: "1120px",
    marginInline: "auto",
    paddingBlock: space.md,
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  mark: {
    fontFamily: type.serif,
    fontSize: "20px",
    fontWeight: 600,
    color: colors.ink,
    textDecorationLine: "none",
  },
});

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
