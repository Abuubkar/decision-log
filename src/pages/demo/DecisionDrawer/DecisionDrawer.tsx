import * as stylex from "@stylexjs/stylex";
import { useCallback, useRef } from "react";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { DecisionForm } from "../DecisionForm";
import { Settings } from "../Settings";
import { DecisionDetail } from "./DecisionDetail";
import { HEADINGS } from "./decisionDrawer.copy";
import { styles } from "./decisionDrawer.styles";
import type { DecisionDrawerProps } from "./decisionDrawer.types";

/** Routes between the three things the drawer can be, and renders none of them. */
export function DecisionDrawer({
  drawer,
  decision,
  areas,
  areaCounts,
  statuses,
  statusCounts,
  decisionCount,
  onClose,
  onEdit,
  onView,
  onChangeStatus,
  onDelete,
  onSave,
  onAddArea,
  onRenameArea,
  onRemoveArea,
  onAddStatus,
  onEditStatus,
  onRemoveStatus,
  onDeleteAll,
  onResetDemo,
  onUndo,
  history,
}: DecisionDrawerProps) {
  const toast = useToast();
  const mode = drawer?.mode ?? "view";

  // A ref rather than state: nothing renders differently because the form is
  // dirty, and a re-render on the first keystroke would cost the field its
  // cursor position for no reason.
  const dirty = useRef(false);
  const onDirtyChange = useCallback((value: boolean) => {
    dirty.current = value;
  }, []);

  /** Nothing typed is thrown away without being asked about first. */
  const mayClose = useCallback(
    () =>
      !dirty.current ||
      window.confirm("You have not saved this decision. Close it and lose what you typed?"),
    [],
  );

  const closeIfAllowed = useCallback(() => {
    if (mayClose()) onClose();
  }, [mayClose, onClose]);

  return (
    <Drawer
      open={drawer !== null}
      focusKey={mode}
      onClose={onClose}
      onBeforeClose={mayClose}
      heading={
        <>
          <Text variant="label">{HEADINGS[mode]}</Text>
          <Box style={styles.actions}>
            {mode === "view" && decision && (
              <Button onClick={() => onEdit(decision.id)} style={styles.edit}>
                Edit
              </Button>
            )}
            <button
              type="button"
              onClick={closeIfAllowed}
              aria-label="Close"
              {...stylex.props(styles.close)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </Box>
        </>
      }
    >
      {mode === "create" && (
        <DecisionForm
          areas={areas.map(({ name }) => name)}
          onDirtyChange={onDirtyChange}
          onCancel={closeIfAllowed}
          onSubmit={(values) => {
            const added = { ...values, id: crypto.randomUUID(), status: "active" as const };
            onSave(added);
            onClose();
            toast(`Added “${added.title}”`);
          }}
        />
      )}

      {mode === "edit" && decision && (
        <DecisionForm
          decision={decision}
          areas={areas.map(({ name }) => name)}
          onDirtyChange={onDirtyChange}
          onCancel={() => onView(decision.id)}
          onDelete={() => {
            // Nothing to confirm. The drawer closes on its own once the
            // decision is gone, and the toast holds the way back.
            onDelete(decision.id);
            toast(`Deleted “${decision.title}”`, { label: "Undo", run: onUndo });
          }}
          onSubmit={(values) => {
            onSave({ ...decision, ...values });
            onView(decision.id);
            toast("Saved");
          }}
        />
      )}

      {mode === "view" && decision && (
        <DecisionDetail
          decision={decision}
          statuses={statuses}
          history={history}
          onChangeStatus={onChangeStatus}
          onUndo={onUndo}
        />
      )}

      {mode === "settings" && (
        <Settings
          areas={areas}
          areaCounts={areaCounts}
          statuses={statuses}
          statusCounts={statusCounts}
          decisionCount={decisionCount}
          onAddArea={onAddArea}
          onRenameArea={onRenameArea}
          onRemoveArea={onRemoveArea}
          onAddStatus={onAddStatus}
          onEditStatus={onEditStatus}
          onRemoveStatus={onRemoveStatus}
          onDeleteAll={onDeleteAll}
          onResetDemo={onResetDemo}
        />
      )}
    </Drawer>
  );
}
