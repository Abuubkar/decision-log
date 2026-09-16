import type { LogState } from "../state";

/** Every piece of the log takes the whole state and reads the part it needs. */
export type LogProps = { log: LogState };
