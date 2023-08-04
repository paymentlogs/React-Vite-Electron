import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import obfuscator from "rollup-plugin-obfuscator";
import { uglify } from "rollup-plugin-uglify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, "packages", "frontend", "public"),
  base: "./",
  root: path.resolve(__dirname, "./packages/frontend"),
  server: {
    open: false,
    port: process.env.PORT || 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./packages/frontend/src"),
    },
  },
  optimizeDeps: {
    exclude: ["electron-store"],
  },
  build: {
    sourcemap: false,
    outDir: path.join(__dirname, "Built App", "frontend"),
    emptyOutDir: true,
    minify: "terser",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        plugins: [
          uglify({
            sourcemap: false,
          }),
          obfuscator({
            fileOptions: {
              compact: true,
              controlFlowFlattening: true,
              controlFlowFlatteningThreshold: 1,
              numbersToExpressions: true,
              simplify: true,
              stringArrayShuffle: true,
              stringArrayThreshold: 1,
              rotateStringArray: true,
              stringArray: true,
              disableConsoleOutput: true,
              deadCodeInjection: true,
              debugProtection: true,
              debugProtectionInterval: 2000,
              selfDefending: true,
              sourceMap: false,
            },
            globalOptions: {
              compact: true,
              controlFlowFlattening: true,
              controlFlowFlatteningThreshold: 1,
              numbersToExpressions: true,
              simplify: true,
              stringArrayShuffle: true,
              stringArrayThreshold: 1,
              rotateStringArray: true,
              stringArray: true,
              disableConsoleOutput: true,
              deadCodeInjection: true,
              debugProtection: true,
              debugProtectionInterval: 2000,
              selfDefending: true,
              sourceMap: false,
            },
          }),
        ],
      },
    },
  },
});
