import * as stylex from "@stylexjs/stylex";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { Text } from "../../components/Text";
import { useToast } from "../../components/Toast";
import { DecisionForm } from "../DecisionForm";
import { DecisionDetail } from "./DecisionDetail";
import { HEADINGS } from "./decisionDrawer.copy";
import { styles } from "./decisionDrawer.styles";
import type { DecisionDrawerProps } from "./decisionDrawer.types";

/** Routes between the three things the drawer can be, and renders none of them. */
export function DecisionDrawer({
  drawer,
  decision,
  onClose,
  onEdit,
  onView,
  onChangeStatus,
  onUndoStatus,
  onSave,
  history,
}: DecisionDrawerProps) {
  const toast = useToast();
  const mode = drawer?.mode ?? "view";

  return (
    <Drawer
      open={drawer !== null}
      focusKey={mode}
      onClose={onClose}
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
              onClick={onClose}
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
          onCancel={onClose}
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
          onCancel={() => onView(decision.id)}
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
          history={history}
          onChangeStatus={onChangeStatus}
          onUndoStatus={onUndoStatus}
        />
      )}
    </Drawer>
  );
}
