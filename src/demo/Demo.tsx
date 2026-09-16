import * as stylex from "@stylexjs/stylex";
import { Box } from "../components/Box";
import { ToastProvider, useToast } from "../components/Toast";
import { colors } from "../tokens.stylex";
import { AppBar } from "./AppBar";
import { DecisionDrawer } from "./DecisionDrawer";
import { Log } from "./Log";
import { useLog } from "./useLog";

const styles = stylex.create({
  page: {
    minHeight: "100dvh",
    backgroundColor: colors.paper,
  },
});

function App() {
  const log = useLog();
  const toast = useToast();

  return (
    <Box style={styles.page}>
      <AppBar
        onReset={() => {
          log.resetDemo();
          toast("Demo reset to the seed data");
        }}
      />
      <Log log={log} />
      <DecisionDrawer
        drawer={log.drawer}
        decision={log.open}
        onClose={log.closeDrawer}
        onEdit={log.edit}
        onView={log.view}
        onChangeStatus={log.changeStatus}
        onSave={log.save}
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
