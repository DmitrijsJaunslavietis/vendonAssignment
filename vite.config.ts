/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        environment: "jsdom",
        setupFiles: "./src/setup-tests/setup-vitest.ts",
        include: ["**/*.test.tsx", "**/*.test.ts"],
        globals: true,
    },
});
