import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig, transformWithEsbuild } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx", // to allow use jsx inside js
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
    svgr(),
    basicSsl(),
  ],

  resolve: {
    baseUrl: ".",
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },

  build: {
    sourcemap: false,
  },
  base: "/fentasy/",
});
