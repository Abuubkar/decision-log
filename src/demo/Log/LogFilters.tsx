import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { AREAS, STATUSES } from "../../domain/types";
import { styles } from "./log.styles";
import type { LogProps } from "./log.types";

const capitalise = (word: string) => word[0]!.toUpperCase() + word.slice(1);

type FilterProps = {
  label: string;
  count?: number;
  chosen: boolean;
  onClick: () => void;
};

function Filter({ label, count, chosen, onClick }: FilterProps) {
  return (
    <Button
      onClick={onClick}
      aria-pressed={chosen}
      style={[styles.filter, chosen && styles.chosen]}
    >
      <span>{label}</span>
      {count !== undefined && <span {...stylex.props(styles.count)}>{count}</span>}
    </Button>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box style={styles.group}>
      <Text variant="label" style={styles.groupTitle}>
        {title}
      </Text>
      {children}
    </Box>
  );
}

export function LogFilters({ log }: LogProps) {
  return (
    <Box as="aside" style={styles.sidebar}>
      <Group title="Status">
        <Filter
          label="All"
          count={log.decisions.length}
          chosen={log.status === "all"}
          onClick={() => log.setStatus("all")}
        />
        {STATUSES.map((status) => (
          <Filter
            key={status}
            label={capitalise(status)}
            count={log.statusCounts[status]}
            chosen={log.status === status}
            onClick={() => log.setStatus(status)}
          />
        ))}
      </Group>

      <Group title="Area">
        <Filter label="Every area" chosen={log.area === "all"} onClick={() => log.setArea("all")} />
        {AREAS.map((area) => (
          <Filter
            key={area}
            label={area}
            count={log.areaCounts.get(area) ?? 0}
            chosen={log.area === area}
            onClick={() => log.setArea(area)}
          />
        ))}
      </Group>
    </Box>
  );
}
