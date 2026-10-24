import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { styles } from "./log.styles";
import type { LogProps } from "./log.types";

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
      <Box style={styles.options}>{children}</Box>
    </Box>
  );
}

export function LogFilters({ log }: LogProps) {
  return (
    <Box as="aside" style={styles.sidebar}>
      <Group title="Status">
        <Filter
          label="All"
          count={log.statusCounts.all}
          chosen={log.status === null}
          onClick={() => log.setStatus(null)}
        />
        {log.statuses.map((status) => (
          <Filter
            key={status.id}
            label={status.label}
            count={log.statusCounts.byStatus.get(status.id) ?? 0}
            chosen={log.status === status.id}
            onClick={() => log.setStatus(status.id)}
          />
        ))}
      </Group>

      <Group title="Area">
        <Filter
          label="Every area"
          count={log.areaCounts.all}
          chosen={log.area === null}
          onClick={() => log.setArea(null)}
        />
        {log.areas.map(({ name }) => (
          <Filter
            key={name}
            label={name}
            count={log.areaCounts.byArea.get(name) ?? 0}
            chosen={log.area === name}
            onClick={() => log.setArea(name)}
          />
        ))}
      </Group>
    </Box>
  );
}
