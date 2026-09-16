import * as stylex from "@stylexjs/stylex";
import type { Status } from "@/domain/types";
import { styles } from "./statusDot.styles";

export function StatusDot({ status }: { status: Status }) {
  return <span aria-hidden="true" {...stylex.props(styles.dot, styles[status])} />;
}
