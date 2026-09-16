import { useForm } from "react-hook-form";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { AREAS } from "../../domain/types";
import { styles } from "./decisionForm.styles";
import type { DecisionFormProps, DecisionValues } from "./decisionForm.types";
import { LIMITS, RULES, emptyDecision, today } from "./decisionForm.validation";

export function DecisionForm({ decision, onSubmit, onCancel }: DecisionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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
      : emptyDecision(),
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

          <Field label="Owner" error={errors.owner?.message}>
            <Input placeholder="First name" {...register("owner", RULES.owner)} />
          </Field>
        </Box>

        <Field label="Area" error={errors.area?.message}>
          <Select {...register("area", RULES.area)}>
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
