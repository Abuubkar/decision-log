import { AREAS } from "../../domain/types";
import type { DecisionValues } from "./decisionForm.types";

/** A title that runs long stops being a title, and a rationale has an end. */
export const LIMITS = { title: 90, statement: 240, rationale: 700, owner: 40 };

export const today = () => new Date().toISOString().slice(0, 10);

/** Every message says what to do, rather than what went wrong. */
export const RULES = {
  title: { required: "Give it a title. One line is enough." },
  statement: { required: "Say what the team decided." },
  rationale: { required: "Say why. In six months this is the only part anyone needs." },
  decidedOn: {
    required: "Pick the day the team decided.",
    validate: (value: string) => value <= today() || "Pick a day that has already happened.",
  },
  owner: { required: "Name whoever made the call." },
  area: { required: "Pick an area." },
};

export const emptyDecision = (): DecisionValues => ({
  title: "",
  statement: "",
  rationale: "",
  decidedOn: today(),
  owner: "",
  area: AREAS[0],
});
