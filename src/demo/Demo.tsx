import * as stylex from "@stylexjs/stylex";
import { Box } from "../components/Box";
import { ToastProvider, useToast } from "../components/Toast";
import { colors } from "../tokens.stylex";
import { AppBar } from "./AppBar";
import { DecisionDrawer } from "./DecisionDrawer";
import { Log } from "./Log";
import { useLog } from "./state";
// PROTOTYPE ONLY — change history variants. Remove with the prototype.
import { useState } from "react";
import { Button } from "../components/Button";
import { ChangeFeed } from "./prototype/ChangeFeed";
import { PrototypeSwitcher } from "./prototype/PrototypeSwitcher";
import { currentVariant } from "./prototype/variant";

const styles = stylex.create({
  page: {
    minHeight: "100dvh",
    backgroundColor: colors.paper,
  },
});

function App() {
  const log = useLog();
  const toast = useToast();
  // PROTOTYPE ONLY.
  const variant = currentVariant();
  const [showFeed, setShowFeed] = useState(false);

  return (
    <Box style={styles.page}>
      <AppBar
        onReset={() => {
          log.resetDemo();
          toast("Demo reset to the seed data");
        }}
        extra={
          variant === "C" ? (
            <Button
              onClick={() => setShowFeed((current) => !current)}
              aria-pressed={showFeed}
              variant={showFeed ? "primary" : "secondary"}
            >
              History
            </Button>
          ) : undefined
        }
      />
      {variant === "C" && showFeed ? (
        <ChangeFeed decisions={log.decisions} onOpen={log.view} />
      ) : (
        <Log log={log} />
      )}
      <DecisionDrawer
        drawer={log.drawer}
        decision={log.open}
        onClose={log.closeDrawer}
        onEdit={log.edit}
        onView={log.view}
        onChangeStatus={log.changeStatus}
        onSave={log.save}
      />
      <PrototypeSwitcher />
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
