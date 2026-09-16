import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { Text } from "../../components/Text";
import { useToast } from "../../components/Toast";
import { DecisionForm } from "../DecisionForm";
// PROTOTYPE ONLY — change history variants. Remove with the prototype.
import { ChangeHistorySection } from "../prototype/ChangeHistorySection";
import { ChangeHistoryTimeline } from "../prototype/ChangeHistoryTimeline";
import { changesFor } from "../prototype/changes";
import { protoStyles } from "../prototype/protoStyles";
import { currentVariant } from "../prototype/variant";
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
  onSave,
}: DecisionDrawerProps) {
  const toast = useToast();
  const mode = drawer?.mode ?? "view";
  // PROTOTYPE ONLY.
  const variant = currentVariant();
  const [tab, setTab] = useState<"decision" | "history">("decision");
  useEffect(() => setTab("decision"), [drawer]);

  return (
    <Drawer
      open={drawer !== null}
      focusKey={mode}
      onClose={onClose}
      heading={
        <>
          {variant === "B" && mode === "view" && decision ? (
            <ProtoTabs decisionId={decision.id} tab={tab} onTab={setTab} />
          ) : (
            <Text variant="label">{HEADINGS[mode]}</Text>
          )}
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

      {mode === "view" && decision && variant === "B" && tab === "history" && (
        <ChangeHistoryTimeline decisionId={decision.id} />
      )}

      {mode === "view" && decision && !(variant === "B" && tab === "history") && (
        <>
          <DecisionDetail decision={decision} onChangeStatus={onChangeStatus} />
          {variant === "A" && <ChangeHistorySection decisionId={decision.id} />}
        </>
      )}
    </Drawer>
  );
}

// PROTOTYPE ONLY — variant B's header tabs.
function ProtoTabs({
  decisionId,
  tab,
  onTab,
}: {
  decisionId: string;
  tab: "decision" | "history";
  onTab: (next: "decision" | "history") => void;
}) {
  const count = changesFor(decisionId).length;
  return (
    <div {...stylex.props(protoStyles.tabs)}>
      <button
        type="button"
        onClick={() => onTab("decision")}
        {...stylex.props(protoStyles.tab, tab === "decision" && protoStyles.tabOn)}
      >
        Decision
      </button>
      <button
        type="button"
        onClick={() => onTab("history")}
        {...stylex.props(protoStyles.tab, tab === "history" && protoStyles.tabOn)}
      >
        History
        <span {...stylex.props(protoStyles.count)}>{count}</span>
      </button>
    </div>
  );
}
