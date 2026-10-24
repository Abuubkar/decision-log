import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { statusNameTaken, whyStatusStays } from "@/domain/statuses";
import { TONES } from "@/domain/types";
import type { Status, StatusId, Tone } from "@/domain/types";
import { StatusDot } from "../StatusDot";
import { styles } from "./settings.styles";

type Props = {
  statuses: Status[];
  counts: Map<StatusId, number>;
  onAdd: (label: string, tone: Tone, holds: boolean) => void;
  onEdit: (id: StatusId, label: string, tone: Tone, holds: boolean) => void;
  onRemove: (id: StatusId) => void;
};

type Draft = { label: string; tone: Tone; holds: boolean };

const EMPTY: Draft = { label: "", tone: "slate", holds: false };

/**
 * A decision carries a status by id, so renaming one here never touches a
 * decision or the history that mentions it. Only the label moves.
 */
export function StatusList({ statuses, counts, onAdd, onEdit, onRemove }: Props) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [editing, setEditing] = useState<StatusId | null>(null);

  const trimmed = draft.label.trim();
  const taken = trimmed !== "" && statusNameTaken(statuses, trimmed);
  const ready = trimmed !== "" && !taken;

  return (
    <>
      <Text tone="muted" style={styles.lede}>
        Where a decision stands. A decision is in exactly one, and the ones that hold are the log as
        it stands today.
      </Text>

      <Box
        as="form"
        style={styles.addStatus}
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (!ready) return;
          onAdd(trimmed, draft.tone, draft.holds);
          setDraft(EMPTY);
        }}
      >
        <Box style={styles.add}>
          <Input
            data-autofocus
            value={draft.label}
            maxLength={24}
            placeholder="Add a status"
            aria-label="Add a status"
            invalid={taken}
            onChange={(event) => setDraft((d) => ({ ...d, label: event.target.value }))}
          />
          <Button type="submit" variant="primary" disabled={!ready}>
            Add
          </Button>
        </Box>
        <Tones chosen={draft.tone} onChoose={(tone) => setDraft((d) => ({ ...d, tone }))} />
        <Holds checked={draft.holds} onChange={(holds) => setDraft((d) => ({ ...d, holds }))} />
      </Box>

      {/* Always rendered, so saying no moves nothing on the way in or out. */}
      <p {...stylex.props(styles.message, !taken && styles.messageQuiet)} aria-live="polite">
        {taken ? "You already have one called that." : ""}
      </p>

      <ul {...stylex.props(styles.list)}>
        {statuses.map((status) => {
          const stays = whyStatusStays(statuses, [], status.id);
          const inUse = (counts.get(status.id) ?? 0) > 0;
          const why = stays ?? (inUse ? `${counts.get(status.id)} decisions are in it.` : null);

          return editing === status.id ? (
            <EditStatus
              key={status.id}
              status={status}
              clash={(next) => statusNameTaken(statuses, next, status.id)}
              onCancel={() => setEditing(null)}
              onSave={(next) => {
                onEdit(status.id, next.label, next.tone, next.holds);
                setEditing(null);
              }}
            />
          ) : (
            <li key={status.id} {...stylex.props(styles.row)}>
              <span {...stylex.props(styles.statusName)}>
                <StatusDot status={status} />
                {status.label}
                {status.holds && <span {...stylex.props(styles.holds)}>still holds</span>}
              </span>
              <span {...stylex.props(styles.count)}>{counts.get(status.id) ?? 0}</span>
              <Button
                variant="quiet"
                onClick={() => setEditing(status.id)}
                aria-label={`Edit ${status.label}`}
              >
                Edit
              </Button>
              <Button
                variant="quiet"
                disabled={why !== null}
                onClick={() => onRemove(status.id)}
                aria-label={`Remove ${status.label}`}
                title={why ?? undefined}
              >
                Remove
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function EditStatus({
  status,
  clash,
  onSave,
  onCancel,
}: {
  status: Status;
  clash: (next: string) => boolean;
  onSave: (next: Draft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Draft>({
    label: status.label,
    tone: status.tone,
    holds: status.holds,
  });
  const trimmed = draft.label.trim();
  const ready = trimmed !== "" && !clash(trimmed);
  // Active is where a new decision lands, so it always holds.
  const locked = status.id === "active";

  return (
    <li {...stylex.props(styles.row, styles.rowEditing, styles.rowStacked)}>
      <Box style={styles.add}>
        <Input
          data-autofocus
          value={draft.label}
          maxLength={24}
          aria-label={`Rename ${status.label}`}
          invalid={trimmed !== "" && clash(trimmed)}
          onChange={(event) => setDraft((d) => ({ ...d, label: event.target.value }))}
          onKeyDown={(event) => {
            if (event.key === "Enter" && ready) onSave({ ...draft, label: trimmed });
            if (event.key === "Escape") onCancel();
          }}
        />
        <Button variant="quiet" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={!ready}
          onClick={() => onSave({ ...draft, label: trimmed })}
        >
          Save
        </Button>
      </Box>
      <Tones chosen={draft.tone} onChoose={(tone) => setDraft((d) => ({ ...d, tone }))} />
      <Holds
        checked={locked || draft.holds}
        disabled={locked}
        note={locked ? "A new decision starts here, so it always holds." : undefined}
        onChange={(holds) => setDraft((d) => ({ ...d, holds }))}
      />
    </li>
  );
}

function Tones({ chosen, onChoose }: { chosen: Tone; onChoose: (tone: Tone) => void }) {
  return (
    <div {...stylex.props(styles.tones)} role="group" aria-label="Colour">
      {TONES.map((tone) => (
        <button
          key={tone}
          type="button"
          aria-label={tone}
          aria-pressed={chosen === tone}
          onClick={() => onChoose(tone)}
          {...stylex.props(styles.tone, styles[tone], chosen === tone && styles.toneChosen)}
        />
      ))}
    </div>
  );
}

function Holds({
  checked,
  disabled,
  note,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  note?: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label {...stylex.props(styles.holdsField)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{note ?? "Decisions in this status still hold"}</span>
    </label>
  );
}
