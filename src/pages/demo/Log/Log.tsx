import { Box } from "@/components/Box";
import { LogFilters } from "./LogFilters";
import { LogList } from "./LogList";
import { LogToolbar } from "./LogToolbar";
import { styles } from "./log.styles";
import type { LogProps } from "./log.types";

export function Log({ log }: LogProps) {
  return (
    <Box as="section" style={styles.frame} id="log">
      <Box style={styles.box}>
        <LogToolbar log={log} />
        <Box style={styles.body}>
          <LogFilters log={log} />
          <LogList log={log} />
        </Box>
      </Box>
    </Box>
  );
}
