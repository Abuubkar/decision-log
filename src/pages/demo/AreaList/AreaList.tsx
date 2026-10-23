import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { areaExists } from "@/domain/areas";
import { styles } from "./areaList.styles";
import type { AreaListProps } from "./areaList.types";

/**
 * An area a decision sits in cannot be removed, because the decision is what
 * makes the area exist. The count says why, so the refusal is visible before
 * anyone tries rather than only afterwards.
 */
export function AreaList({ areas, counts, onAdd, onRemove }: AreaListProps) {
  const [name, setName] = useState("");
  const taken = areaExists(areas, name.trim());
  const ready = name.trim() !== "" && !taken;

  function add() {
    if (!ready) return;
    onAdd(name.trim());
    setName("");
  }

  return (
    <>
      <Text as="h2" variant="title" style={styles.heading}>
        Areas
      </Text>
      <Text tone="muted" style={styles.lede}>
        The parts of the business you file decisions under. A decision belongs to one.
      </Text>

      <Box
        as="form"
        style={styles.add}
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          add();
        }}
      >
        <Input
          data-autofocus
          value={name}
          maxLength={32}
          placeholder="Add an area"
          aria-label="Add an area"
          onChange={(event) => setName(event.target.value)}
        />
        <Button type="submit" variant="primary" disabled={!ready}>
          Add
        </Button>
      </Box>
      {taken && (
        <Text variant="small" tone="muted" style={styles.taken}>
          You already have that one.
        </Text>
      )}

      <ul {...stylex.props(styles.list)}>
        {areas.map(({ name: area, inUse }) => (
          <li key={area} {...stylex.props(styles.row)}>
            <span>{area}</span>
            <span {...stylex.props(styles.count)}>
              {counts.get(area) ?? 0}
              {inUse ? "" : " · unused"}
            </span>
            <Button
              variant="quiet"
              disabled={inUse}
              onClick={() => onRemove(area)}
              aria-label={`Remove ${area}`}
              title={inUse ? "Decisions are filed here, so it stays" : undefined}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
