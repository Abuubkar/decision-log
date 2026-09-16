import * as stylex from "@stylexjs/stylex";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { styles } from "./log.styles";
import type { LogProps } from "./log.types";

/** Clear filters appears only once there is something to clear. */
export function LogToolbar({ log }: LogProps) {
  return (
    <Box style={styles.toolbar}>
      <Input
        type="search"
        value={log.query}
        onChange={(event) => log.setQuery(event.target.value)}
        placeholder="Search decisions"
        aria-label="Search decisions"
        style={styles.search}
      />
      {log.filtersApplied && (
        <Button variant="quiet" onClick={log.clearFilters}>
          Clear filters
        </Button>
      )}
      <span {...stylex.props(styles.spacer)} />
      <Button variant="primary" onClick={log.create}>
        New decision
      </Button>
    </Box>
  );
}
