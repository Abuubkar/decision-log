import { Box } from "../components/Box";
import { styles } from "./landing.styles";
import { PrototypeSwitcher, useVariant } from "./prototype/PrototypeSwitcher";
import { VariantA, VariantB, VariantC } from "./prototype/variants";
import { Closing, Footer, Hero, ProductShot, Problem, Promises, Questions } from "./sections";

/** PROTOTYPE wiring. "current" is the page as shipped; A, B, C are the variants. */
const VARIANTS = {
  current: "As shipped",
  A: "Specimen hero",
  B: "One decision, read later",
  C: "The log is the page",
};

function Current() {
  return (
    <Box style={styles.page}>
      <Hero />
      <Problem />
      <ProductShot />
      <Questions />
      <Promises />
      <Closing />
      <Footer />
    </Box>
  );
}

export function Landing() {
  const { variant, go } = useVariant(Object.keys(VARIANTS));
  return (
    <>
      {variant === "current" && <Current />}
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      <PrototypeSwitcher variants={VARIANTS} current={variant} go={go} />
    </>
  );
}
