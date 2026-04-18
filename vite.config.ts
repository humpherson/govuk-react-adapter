import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "GovUkReactAdapter",
      fileName: (format) =>
        format === "es" ? "govuk-react-adapter.js" : "govuk-react-adapter.cjs",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        /^react$/,
        /^react-dom$/,
        /^react\/jsx-runtime$/,
        /^react\/jsx-dev-runtime$/,
        /^react-dom\/.*/,
      ],
    },
  },
});
