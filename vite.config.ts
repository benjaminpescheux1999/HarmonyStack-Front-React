import million from "million/compiler";
// import MillionLint from "@million/lint";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// const _plugins = [react()];
// _plugins.unshift(
//   million.vite({
//     auto: true,
//   }),
//   MillionLint.vite()
// );
export default defineConfig({
  plugins: [
    react(),
    million.vite({
      auto: true,
    }),
    // MillionLint.vite()
  ],
});
