import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Drawer } from "../components/Drawer";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Text } from "../components/Text";
import { Textarea } from "../components/Textarea";
import { ToastProvider, useToast } from "../components/Toast";
import { colors, space } from "../tokens.stylex";

/**
 * A scratch page that renders every primitive in every state. The log replaces
 * it in the pull request that builds the demo.
 */
const styles = stylex.create({
  page: {
    backgroundColor: colors.paper,
    minHeight: "100dvh",
    paddingBlock: space.xl,
  },
  wrap: {
    maxWidth: "720px",
    marginInline: "auto",
    paddingInline: space.lg,
  },
  group: {
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: space.md,
    alignItems: "center",
    marginTop: space.md,
  },
  stack: {
    display: "grid",
    gap: space.base,
    marginTop: space.md,
  },
});

function Gallery() {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  return (
    <Box as="main" style={styles.page}>
      <Box style={styles.wrap}>
        <Text as="h1" variant="title">
          Primitives
        </Text>
        <Text tone="muted">Every base component, in every state it ships with.</Text>

        <Box style={styles.group}>
          <Text variant="label">Type scale</Text>
          <Text as="p" variant="display">
            Display
          </Text>
          <Text as="p" variant="title">
            Title
          </Text>
          <Text as="p" variant="heading">
            Heading
          </Text>
          <Text>Body copy, the size most of the log is set in.</Text>
          <Text variant="small" tone="muted">
            Small and muted.
          </Text>
          <Text variant="small" tone="faint">
            Small and faint, the tone a superseded decision takes.
          </Text>
        </Box>

        <Box style={styles.group}>
          <Text variant="label">Buttons</Text>
          <Box style={styles.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="quiet">Quiet</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Box>
        </Box>

        <Box style={styles.group}>
          <Text variant="label">Badges</Text>
          <Box style={styles.row}>
            <Badge tone="active">Active</Badge>
            <Badge tone="superseded">Superseded</Badge>
            <Badge tone="reversed">Reversed</Badge>
          </Box>
        </Box>

        <Box style={styles.group}>
          <Text variant="label">Fields</Text>
          <Box style={styles.stack}>
            <Field label="Title">
              <Input placeholder="One line, the way you'd say it out loud" />
            </Field>
            <Field label="Why" error="Say why. This is the part that decays.">
              <Textarea placeholder="The reasoning, in your words." />
            </Field>
            <Field label="Area">
              <Select defaultValue="Product">
                <option>Product</option>
                <option>Engineering</option>
              </Select>
            </Field>
          </Box>
        </Box>

        <Box style={styles.group}>
          <Text variant="label">Drawer and toasts</Text>
          <Box style={styles.row}>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Open drawer
            </Button>
            <Button onClick={() => toast("Saved")}>Plain toast</Button>
            <Button
              onClick={() =>
                toast("Marked superseded", { label: "Undo", run: () => toast("Put back") })
              }
            >
              Toast with undo
            </Button>
          </Box>
        </Box>
      </Box>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        heading={<Text variant="label">Drawer</Text>}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <Text as="h2" variant="heading">
          It slides in from the right
        </Text>
        <Text tone="muted" style={styles.row}>
          Escape closes it, so does a click on the backdrop. Focus stays inside while it is open,
          because it is a native dialog.
        </Text>
        <Box style={styles.row}>
          <Button onClick={() => toast("Saved", { label: "Undo", run: () => toast("Put back") })}>
            Toast from inside the drawer
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export function Demo() {
  return (
    <ToastProvider>
      <Gallery />
    </ToastProvider>
  );
}
