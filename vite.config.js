// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "vite-plugin-copy";

export default defineConfig({
  plugins: [
    react(),
    copy({
      patterns: [{ from: "../src/assets/image", to: "assets/image" }],
    }),
  ],
});
