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
      <AppBar
        onManageAreas={log.manageAreas}
        onDeleteAll={() => {
          if (log.decisions.length === 0) return;
          const count = log.decisions.length;
          log.removeAll();
          toast(`Deleted ${count} decisions`, { label: "Undo", run: log.undo });
        }}
        onReset={() => {
          log.resetDemo();
          toast("Back to the seeded log");
        }}
      />
      <Log log={log} />
      <DecisionDrawer
        drawer={log.drawer}
        decision={log.open}
        areas={log.areas}
        areaCounts={log.areaCounts.byArea}
        onClose={log.closeDrawer}
        onEdit={log.edit}
        onView={log.view}
        onChangeStatus={log.changeStatus}
        onDelete={log.remove}
        onSave={log.save}
        onAddArea={log.addArea}
        onRemoveArea={log.removeArea}
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
