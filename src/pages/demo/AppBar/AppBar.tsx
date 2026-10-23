import * as stylex from "@stylexjs/stylex";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { styles } from "./appBar.styles";
import type { AppBarProps } from "./appBar.types";

/**
 * The three controls that act on the whole log rather than one decision. Reset
 * demo is last because it is the only one that cannot be taken back.
 */
export function AppBar({ onManageAreas, onDeleteAll, onReset }: AppBarProps) {
  return (
    <Box as="header" style={styles.bar}>
      <Box style={styles.inner}>
        <Text as="a" href="./index.html" style={styles.mark}>
          Decision Log
        </Text>
        <Box style={styles.actions}>
          <button
            type="button"
            onClick={onManageAreas}
            aria-label="Areas"
            title="Areas"
            {...stylex.props(styles.gear)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
              />
              <path
                d="M13 8c0-.4 0-.7-.1-1l1.3-1-1.3-2.2-1.5.6a5 5 0 0 0-1.7-1L9.4 1.8H6.6l-.3 1.6c-.6.2-1.2.6-1.7 1l-1.5-.6L1.8 6l1.3 1a5.6 5.6 0 0 0 0 2l-1.3 1 1.3 2.2 1.5-.6c.5.4 1 .8 1.7 1l.3 1.6h2.8l.3-1.6c.6-.2 1.2-.6 1.7-1l1.5.6 1.3-2.2-1.3-1c.1-.3.1-.6.1-1Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Button onClick={onDeleteAll} style={styles.destructive}>
            Delete all
          </Button>
          <Button onClick={onReset}>Reset demo</Button>
        </Box>
      </Box>
    </Box>
  );
}
