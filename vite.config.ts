import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  // The repo deploys to https://abuubkar.github.io/decision-log/, so every
  // asset URL needs the repo name in front of it.
  base: "/decision-log/",
  plugins: [
    // StyleX has to run before the React plugin or Fast Refresh stops working.
    stylex.vite({ useCSSLayers: true }),
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
