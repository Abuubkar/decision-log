import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { AreaList } from "./AreaList";
import { StatusList } from "./StatusList";
import { styles } from "./settings.styles";
import type { SettingsPane, SettingsProps } from "./settings.types";

/**
 * Four things that act on the whole log rather than one decision. The two that
 * take something away sit at the bottom, under a rule, away from the two that
 * do not.
 */
export function Settings(props: SettingsProps) {
  const [pane, setPane] = useState<SettingsPane>("menu");

  if (pane === "areas") {
    return (
      <Pane title="Areas" onBack={() => setPane("menu")}>
        <AreaList
          areas={props.areas}
          counts={props.areaCounts}
          onAdd={props.onAddArea}
          onRename={props.onRenameArea}
          onRemove={props.onRemoveArea}
        />
      </Pane>
    );
  }

  if (pane === "statuses") {
    return (
      <Pane title="Statuses" onBack={() => setPane("menu")}>
        <StatusList
          statuses={props.statuses}
          counts={props.statusCounts}
          onAdd={props.onAddStatus}
          onEdit={props.onEditStatus}
          onRemove={props.onRemoveStatus}
        />
      </Pane>
    );
  }

  return (
    <>
      <Text as="h2" variant="title" style={styles.heading}>
        Settings
      </Text>

      <Box style={styles.menu}>
        <Choice
          label="Statuses"
          note={`${props.statuses.length} ${props.statuses.length === 1 ? "status" : "statuses"}. Rename them or add your own.`}
          onClick={() => setPane("statuses")}
        />
        <Choice
          label="Areas"
          note={`${props.areas.length} ${props.areas.length === 1 ? "area" : "areas"}. The parts of the business you file under.`}
          onClick={() => setPane("areas")}
        />
      </Box>

      <Box style={styles.danger}>
        <Choice
          label="Delete all decisions"
          note={
            props.decisionCount === 0
              ? "The log is already empty."
              : `Takes out all ${props.decisionCount}. One undo brings them back.`
          }
          disabled={props.decisionCount === 0}
          onClick={props.onDeleteAll}
        />
        <Choice
          label="Reset demo"
          note="Forgets everything in this browser and puts the sample log back."
          onClick={props.onResetDemo}
        />
      </Box>
    </>
  );
}

function Pane({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <Button variant="quiet" onClick={onBack} style={styles.back}>
        &larr; Settings
      </Button>
      <Text as="h2" variant="title" style={styles.heading}>
        {title}
      </Text>
      {children}
    </>
  );
}

function Choice({
  label,
  note,
  disabled,
  onClick,
}: {
  label: string;
  note: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} {...stylex.props(styles.choice)}>
      <span {...stylex.props(styles.choiceLabel)}>{label}</span>
      <span {...stylex.props(styles.choiceNote)}>{note}</span>
    </button>
  );
}
