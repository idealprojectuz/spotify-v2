import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
export default defineConfig({
  plugins: [react()],
  cacheDir: "../../node_modules/.vite/web",
  envDir: join(process.cwd(), "..", ".."),
});
