import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// 项目 Pages：https://longhuxishang.github.io/shop-supervision/
export default defineConfig({
  plugins: [react()],
  base: "/shop-supervision/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets-built",
    sourcemap: true,
  },
});
