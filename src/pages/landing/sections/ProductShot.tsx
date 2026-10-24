import * as stylex from "@stylexjs/stylex";
import shotAvif from "@/assets/product-shot.avif";
import shotAvif2x from "@/assets/product-shot-2x.avif";
import shotPng from "@/assets/product-shot.png";
import shotWebp from "@/assets/product-shot.webp";
import shotWebp2x from "@/assets/product-shot-2x.webp";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { styles } from "../landing.styles";

/**
 * A real capture of the running demo, not an illustration of one. The frame is
 * 1100px at its widest, so the pair in each srcset is that width and twice it,
 * and the browser takes whichever its screen can actually show. The png is the
 * last resort and nothing modern will reach for it.
 */
export function ProductShot() {
  return (
    <Box as="section" style={[styles.section, styles.sunk]}>
      <Box style={styles.wide}>
        <Text as="h2" variant="title">
          A log a team has actually kept.
        </Text>
        <Box style={styles.shotFrame}>
          <picture {...stylex.props(styles.shotPicture)}>
            <source type="image/avif" srcSet={`${shotAvif} 1x, ${shotAvif2x} 2x`} />
            <source type="image/webp" srcSet={`${shotWebp} 1x, ${shotWebp2x} 2x`} />
            <img
              src={shotPng}
              alt="The Decision Log demo, showing eleven decisions filtered by status and area, with superseded entries faded."
              width={2200}
              height={1728}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.shot)}
            />
          </picture>
        </Box>
        <Text variant="small" tone="faint" style={styles.caption}>
          Two years from one team. The faded entries stopped holding.
        </Text>
      </Box>
    </Box>
  );
}
