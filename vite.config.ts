import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// @ts-ignore
import * as path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "DeepGetSetTS",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: [],
      output: {
        exports: "named",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      outDir: "dist",
    }),
  ],
});
