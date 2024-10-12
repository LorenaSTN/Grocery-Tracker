import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Grocery-Tracker/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@react")) {
              return "vendor_react";
            }

            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
