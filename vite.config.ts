import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

// URL is a global, so this needs no @types/node.
const src = new URL("./src", import.meta.url).pathname;

export default defineConfig({
  // The repo deploys to https://abuubkar.github.io/decision-log/, so every
  // asset URL needs the repo name in front of it.
  base: "/decision-log/",
  resolve: {
    // "@" is src, so nothing has to count how deep it sits.
    alias: { "@": src },
  },
  plugins: [
    // StyleX has to run before the React plugin or Fast Refresh stops working.
    // Its CSS stays unlayered so it always outranks the reset in src/index.css,
    // whichever order the two stylesheets happen to load in.
    // StyleX resolves the defineVars module itself and does not see Vite's
    // alias, so it needs the same mapping spelled out.
    stylex.vite({ aliases: { "@/*": [`${src}/*`] } }),
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        landing: "index.html",
        demo: "demo.html",
      },
    },
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
  },
  staged: {
    "*.{ts,tsx,css,json,md}": "vp check --fix",
  },
});
