import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "path": "path-browserify",
      "os": "os-browserify/browser",
      "crypto": "crypto-browserify",
    },
  },
  css: {
    postcss: {}, 
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
        "process.env": "{}",
      },
      plugins: [
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    outDir: "public/dist",
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    port: 3000,
  },
});