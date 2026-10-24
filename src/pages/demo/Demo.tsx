import * as stylex from "@stylexjs/stylex";
import { Box } from "@/components/Box";
import { useEffect } from "react";
import { ToastProvider, useToast } from "@/components/Toast";
import { colors } from "@/tokens.stylex";
import { AppBar } from "./AppBar";
import { DecisionDrawer } from "./DecisionDrawer";
import { Log } from "./Log";
import { useLog } from "./state";

const styles = stylex.create({
  page: {
    minHeight: "100dvh",
    backgroundColor: colors.paper,
  },
});

function App() {
  const log = useLog();
  const toast = useToast();

  // A refused action says why, where the person was looking when they tried.
  useEffect(() => {
    if (!log.refusal) return;
    toast(log.refusal);
    log.clearRefusal();
  }, [log, toast]);

  return (
    <Box style={styles.page}>
      <AppBar onOpenSettings={log.openSettings} />
      <Log log={log} />
      <DecisionDrawer
        drawer={log.drawer}
        decision={log.open}
        areas={log.areas}
        areaCounts={log.areaCounts.byArea}
        statuses={log.statuses}
        statusCounts={log.statusCounts.byStatus}
        decisionCount={log.decisions.length}
        onClose={log.closeDrawer}
        onEdit={log.edit}
        onView={log.view}
        onChangeStatus={log.changeStatus}
        onDelete={log.remove}
        onSave={log.save}
        onAddArea={log.addArea}
        onRenameArea={log.renameArea}
        onRemoveArea={log.removeArea}
        onAddStatus={log.addStatus}
        onEditStatus={log.editStatus}
        onRemoveStatus={log.removeStatus}
        onDeleteAll={() => {
          const count = log.decisions.length;
          log.removeAll();
          toast(`Deleted ${count} ${count === 1 ? "decision" : "decisions"}`, {
            label: "Undo",
            run: log.undo,
          });
        }}
        onResetDemo={() => {
          // The one action with nothing behind it: it forgets the save too.
          const sure = window.confirm(
            "This forgets everything in this browser and puts the sample log back. There is no undo.",
          );
          if (!sure) return;
          log.resetDemo();
          toast("Back to the seeded log");
        }}
        onUndo={log.undo}
        history={log.history}
      />
    </Box>
  );
}

export function Demo() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
