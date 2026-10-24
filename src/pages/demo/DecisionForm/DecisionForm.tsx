import * as stylex from "@stylexjs/stylex";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { today } from "@/domain/decisions";
import { styles } from "./decisionForm.styles";
import type { DecisionFormProps, DecisionValues } from "./decisionForm.types";
import { LIMITS, RULES, emptyDecision } from "./decisionForm.validation";

export function DecisionForm({
  decision,
  areas,
  onSubmit,
  onCancel,
  onDelete,
  onDirtyChange,
}: DecisionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<DecisionValues>({
    defaultValues: decision
      ? {
          title: decision.title,
          statement: decision.statement,
          rationale: decision.rationale,
          decidedOn: decision.decidedOn,
          owner: decision.owner,
          area: decision.area,
        }
      : emptyDecision(areas[0] ?? ""),
  });

  useEffect(() => {
    onDirtyChange?.(isDirty);
    // Unmounting means the form is gone, and with it anything unsaved.
    return () => onDirtyChange?.(false);
  }, [isDirty, onDirtyChange]);

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
            {...register("title", RULES.title)}
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
            {...register("statement", RULES.statement)}
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
            {...register("rationale", RULES.rationale)}
          />
        </Field>

        <Box style={styles.pair}>
          <Field label="Decided on" error={errors.decidedOn?.message}>
            <Input type="date" max={today()} {...register("decidedOn", RULES.decidedOn)} />
          </Field>

          <Field
            label="Owner"
            error={errors.owner?.message}
            count={{ current: watch("owner").length, max: LIMITS.owner }}
          >
            <Input
              maxLength={LIMITS.owner}
              placeholder="First name"
              {...register("owner", RULES.owner)}
            />
          </Field>
        </Box>

        <Field label="Area" error={errors.area?.message}>
          <Select {...register("area", RULES.area)}>
            {areas.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </Select>
        </Field>
      </Box>

      <Box style={styles.actions}>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete this decision"
            title="Delete this decision"
            {...stylex.props(styles.delete)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
              <path
                d="M2.5 3.5h10M6 3.5V2h3v1.5M3.8 3.5l.6 9a1 1 0 0 0 1 .9h4.2a1 1 0 0 0 1-.9l.6-9M6.2 6v5M8.8 6v5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        )}
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {decision ? "Save" : "Add decision"}
        </Button>
      </Box>
    </Box>
  );
}
