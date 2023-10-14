import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Challenge-12-Password-Generator/",
  plugins: [react()],
});
