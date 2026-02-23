import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions';
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: proxyOptions,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@canvasjs/charts": path.resolve(__dirname, "src/shims/canvasjs-charts.js"),
      "react-charts": path.resolve(
        __dirname,
        "node_modules/react-charts/dist/react-charts.min.mjs"
      ),
    },
  },
  build: {
    outDir: "../my_app/public/dashboard",
    emptyOutDir: true,
    target: "es2015",
  },
});
