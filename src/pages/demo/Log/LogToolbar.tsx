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
      <Button
        variant="primary"
        onClick={log.create}
        aria-label="New decision"
        style={styles.create}
      >
        {/* The words go on a phone and the mark stands in for them, so the
            search keeps the row it would otherwise have to itself. */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden="true"
          {...stylex.props(styles.createMark)}
        >
          <path
            d="M7 1.5v11M1.5 7h11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span {...stylex.props(styles.createWords)}>New decision</span>
      </Button>
    </Box>
  );
}
