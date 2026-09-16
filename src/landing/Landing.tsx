import { Box } from "../components/Box";
import { styles } from "./landing.styles";
import { Closing, Footer, Hero, ProductShot, Problem, Questions } from "./sections";

export function Landing() {
  return (
    <Box style={styles.page}>
      <Hero />
      <Problem />
      {/* The hero's second action points here. */}
      <Box id="log">
        <ProductShot />
      </Box>
      <Questions />
      <Closing />
      <Footer />
    </Box>
  );
}
