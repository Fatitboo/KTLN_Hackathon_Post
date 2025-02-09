import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load biến môi trường từ file .env
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env": JSON.stringify(env), // Chuyển đổi biến môi trường thành JSON để thay thế
    },
  };
});
