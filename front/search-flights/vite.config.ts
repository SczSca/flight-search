/// <reference types="vitest"/>
/// <reference types="Vite/client"/>
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.tsx",
  },
});
