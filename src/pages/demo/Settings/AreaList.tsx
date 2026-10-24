import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { areaExists } from "@/domain/areas";
import type { AreaInLog } from "@/domain/areas";
import type { Area } from "@/domain/types";
import { styles } from "./settings.styles";

type Props = {
  areas: AreaInLog[];
  counts: Map<Area, number>;
  onAdd: (name: Area) => void;
  onRename: (from: Area, to: Area) => void;
  onRemove: (name: Area) => void;
};

/**
 * An area decisions are filed under cannot be removed, because the decision is
 * what makes the area exist. Renaming one is always allowed: it moves every
 * decision filed under it in the same step.
 */
export function AreaList({ areas, counts, onAdd, onRename, onRemove }: Props) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Area | null>(null);

  const trimmed = name.trim();
  const taken = trimmed !== "" && areaExists(areas, trimmed);
  const ready = trimmed !== "" && !taken;

  return (
    <>
      <Text tone="muted" style={styles.lede}>
        The parts of the business you file decisions under. A decision belongs to one.
      </Text>

      <Box
        as="form"
        style={styles.add}
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (!ready) return;
          onAdd(trimmed);
          setName("");
        }}
      >
        <Input
          data-autofocus
          value={name}
          maxLength={32}
          placeholder="Add an area"
          aria-label="Add an area"
          invalid={taken}
          onChange={(event) => setName(event.target.value)}
        />
        <Button type="submit" variant="primary" disabled={!ready}>
          Add
        </Button>
      </Box>

      {/* Always rendered, so saying no moves nothing on the way in or out. */}
      <p {...stylex.props(styles.message, !taken && styles.messageQuiet)} aria-live="polite">
        {taken ? "You already have that one." : ""}
      </p>

      <ul {...stylex.props(styles.list)}>
        {areas.map(({ name: area, inUse }) =>
          editing === area ? (
            <EditRow
              key={area}
              value={area}
              clash={(next) => next !== area && areaExists(areas, next)}
              onCancel={() => setEditing(null)}
              onSave={(next) => {
                onRename(area, next);
                setEditing(null);
              }}
            />
          ) : (
            <li key={area} {...stylex.props(styles.row)}>
              <span>{area}</span>
              <span {...stylex.props(styles.count)}>
                {counts.get(area) ?? 0}
                {inUse ? "" : " · unused"}
              </span>
              <Button variant="quiet" onClick={() => setEditing(area)} aria-label={`Edit ${area}`}>
                Edit
              </Button>
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
          ),
        )}
      </ul>
    </>
  );
}

function EditRow({
  value,
  clash,
  onSave,
  onCancel,
}: {
  value: string;
  clash: (next: string) => boolean;
  onSave: (next: string) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const trimmed = draft.trim();
  const ready = trimmed !== "" && !clash(trimmed);

  return (
    <li {...stylex.props(styles.row, styles.rowEditing)}>
      <Input
        data-autofocus
        value={draft}
        maxLength={32}
        aria-label={`Rename ${value}`}
        invalid={trimmed !== "" && clash(trimmed)}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && ready) onSave(trimmed);
          if (event.key === "Escape") onCancel();
        }}
      />
      <Button variant="quiet" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" disabled={!ready} onClick={() => onSave(trimmed)}>
        Save
      </Button>
    </li>
  );
}
