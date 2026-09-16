import { Box } from "../components/Box";
import { styles } from "./landing.styles";
import { Closing, Footer, Hero, ProductShot, Problem, Promises, Questions } from "./sections";

export function Landing() {
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
