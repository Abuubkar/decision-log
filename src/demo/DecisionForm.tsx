import * as stylex from "@stylexjs/stylex";
import { useForm } from "react-hook-form";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";
import { AREAS } from "../domain/types";
import type { Area, Decision } from "../domain/types";
import { space } from "../tokens.stylex";

const styles = stylex.create({
  form: { display: "flex", flexDirection: "column", height: "100%" },
  fields: { display: "grid", gap: space.base },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 1fr", "@media (max-width: 780px)": "1fr" },
    gap: space.base,
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: space.sm, marginTop: space.lg },
});

type Values = {
  title: string;
  statement: string;
  rationale: string;
  decidedOn: string;
  owner: string;
  area: Area;
};

const today = () => new Date().toISOString().slice(0, 10);

/** A title that runs long stops being a title, and a rationale has an end. */
export const LIMITS = { title: 90, statement: 240, rationale: 700 };

type Props = {
  /** Absent when adding a decision rather than editing one. */
  decision?: Decision;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
};

export function DecisionForm({ decision, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: decision
      ? {
          title: decision.title,
          statement: decision.statement,
          rationale: decision.rationale,
          decidedOn: decision.decidedOn,
          owner: decision.owner,
          area: decision.area,
        }
      : { title: "", statement: "", rationale: "", decidedOn: today(), owner: "", area: AREAS[0] },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <Box style={styles.fields}>
        <Field
          label="Title"
          error={errors.title?.message}
          count={{ current: watch("title").length, max: LIMITS.title }}
        >
          <Input
            data-autofocus
            maxLength={LIMITS.title}
            placeholder="One line, the way you'd say it out loud"
            {...register("title", { required: "Give it a title. One line is enough." })}
          />
        </Field>

        <Field
          label="What we decided"
          error={errors.statement?.message}
          count={{ current: watch("statement").length, max: LIMITS.statement }}
        >
          <Textarea
            maxLength={LIMITS.statement}
            placeholder="The call itself"
            {...register("statement", { required: "Say what the team decided." })}
          />
        </Field>

        <Field
          label="Why"
          error={errors.rationale?.message}
          count={{ current: watch("rationale").length, max: LIMITS.rationale }}
        >
          <Textarea
            maxLength={LIMITS.rationale}
            placeholder="The reasoning, in your words. This is the part that decays."
            {...register("rationale", {
              required: "Say why. In six months this is the only part anyone needs.",
            })}
          />
        </Field>

        <Box style={styles.pair}>
          <Field label="Decided on" error={errors.decidedOn?.message}>
            <Input
              type="date"
              max={today()}
              {...register("decidedOn", {
                required: "Pick the day the team decided.",
                validate: (value) => value <= today() || "Pick a day that has already happened.",
              })}
            />
          </Field>

          <Field label="Owner" error={errors.owner?.message}>
            <Input
              placeholder="First name"
              {...register("owner", { required: "Name whoever made the call." })}
            />
          </Field>
        </Box>

        <Field label="Area" error={errors.area?.message}>
          <Select {...register("area", { required: "Pick an area." })}>
            {AREAS.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </Select>
        </Field>
      </Box>

      <Box style={styles.actions}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {decision ? "Save" : "Add decision"}
        </Button>
      </Box>
    </Box>
  );
}
