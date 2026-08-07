import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(
      new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
    ),
  },
});
