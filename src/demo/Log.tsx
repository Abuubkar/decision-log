import * as stylex from "@stylexjs/stylex";
import { Fragment } from "react";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { AREAS, STATUSES } from "../domain/types";
import type { Decision } from "../domain/types";
import { colors, radii, space, type } from "../tokens.stylex";
import { DecisionRow } from "./DecisionRow";
import type { useLog } from "./useLog";

const styles = stylex.create({
  frame: {
    maxWidth: "1120px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
    paddingBlock: space.lg,
  },
  box: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
    flexWrap: "wrap",
    paddingBlock: space.md,
    paddingInline: space.base,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
    backgroundColor: colors.paperSunk,
  },
  search: { flex: 1, maxWidth: "340px", minWidth: "140px" },
  body: {
    display: "grid",
    gridTemplateColumns: { default: "208px 1fr", "@media (max-width: 780px)": "1fr" },
    alignItems: "start",
  },
  sidebar: {
    alignSelf: "stretch",
    paddingBlock: space.base,
    paddingInline: space.md,
    backgroundColor: colors.paperSunk,
    borderRightWidth: { default: "1px", "@media (max-width: 780px)": 0 },
    borderRightStyle: "solid",
    borderRightColor: colors.rule,
    borderBottomWidth: { default: 0, "@media (max-width: 780px)": "1px" },
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  group: {
    marginBottom: space.lg,
    display: { default: "block", "@media (max-width: 780px)": "inline-block" },
    verticalAlign: "top",
    marginRight: { default: 0, "@media (max-width: 780px)": space.lg },
  },
  groupTitle: { marginBottom: space.sm, paddingInline: space.sm },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    gap: space.md,
    width: "100%",
    borderWidth: 0,
    borderRadius: radii.md,
    backgroundColor: { default: "transparent", ":hover": colors.card },
    color: colors.inkMuted,
    fontWeight: 400,
    paddingBlock: "6px",
    paddingInline: space.sm,
  },
  chosen: {
    backgroundColor: { default: colors.card, ":hover": colors.card },
    color: colors.ink,
    fontWeight: 500,
    boxShadow: `0 0 0 1px ${colors.rule}`,
  },
  count: { color: colors.inkFaint, fontSize: type.small },
  year: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
    paddingTop: space.base,
    paddingBottom: "6px",
    paddingInline: space.lg,
  },
  rule: { flex: 1, height: "1px", backgroundColor: colors.rule },
  empty: { paddingBlock: space.xl, paddingInline: space.lg },
});

const yearOf = (decision: Decision) => decision.decidedOn.slice(0, 4);

export function Log({ log }: { log: ReturnType<typeof useLog> }) {
  let year = "";

  return (
    <Box as="section" style={styles.frame} id="log">
      <Box style={styles.box}>
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
        </Box>

        <Box style={styles.body}>
          <Box as="aside" style={styles.sidebar}>
            <Box style={styles.group}>
              <Text variant="label" style={styles.groupTitle}>
                Status
              </Text>
              <Button
                onClick={() => log.setStatus("all")}
                aria-pressed={log.status === "all"}
                style={[styles.filter, log.status === "all" && styles.chosen]}
              >
                <span>All</span>
                <span {...stylex.props(styles.count)}>{log.decisions.length}</span>
              </Button>
              {STATUSES.map((status) => (
                <Button
                  key={status}
                  onClick={() => log.setStatus(status)}
                  aria-pressed={log.status === status}
                  style={[styles.filter, log.status === status && styles.chosen]}
                >
                  <span>{status[0]!.toUpperCase() + status.slice(1)}</span>
                  <span {...stylex.props(styles.count)}>{log.statusCounts[status]}</span>
                </Button>
              ))}
            </Box>

            <Box style={styles.group}>
              <Text variant="label" style={styles.groupTitle}>
                Area
              </Text>
              <Button
                onClick={() => log.setArea("all")}
                aria-pressed={log.area === "all"}
                style={[styles.filter, log.area === "all" && styles.chosen]}
              >
                <span>Every area</span>
              </Button>
              {AREAS.map((area) => (
                <Button
                  key={area}
                  onClick={() => log.setArea(area)}
                  aria-pressed={log.area === area}
                  style={[styles.filter, log.area === area && styles.chosen]}
                >
                  <span>{area}</span>
                  <span {...stylex.props(styles.count)}>{log.areaCounts.get(area) ?? 0}</span>
                </Button>
              ))}
            </Box>
          </Box>

          <Box as="main">
            {log.filtered.length === 0 ? (
              <Text tone="muted" style={styles.empty}>
                Nothing matches that. Try a different search, or widen the filters.
              </Text>
            ) : (
              log.filtered.map((decision) => {
                const showYear = yearOf(decision) !== year;
                year = yearOf(decision);
                return (
                  <Fragment key={decision.id}>
                    {showYear && (
                      <Box style={styles.year}>
                        <Text variant="small" tone="faint" as="span">
                          {year}
                        </Text>
                        <span {...stylex.props(styles.rule)} />
                      </Box>
                    )}
                    <DecisionRow decision={decision} onOpen={log.openDecision} />
                  </Fragment>
                );
              })
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
