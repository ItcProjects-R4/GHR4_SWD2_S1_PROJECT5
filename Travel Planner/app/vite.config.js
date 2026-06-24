// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import react from '@vitejs/plugin-react';
// import path from 'path';
// import {defineConfig} from 'vite';

// export default defineConfig(() => {
//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, '.'),
//       },
//     },
//     server: {
//       // HMR is disabled in AI Studio via DISABLE_HMR env var.
//       // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
//       hmr: process.env.DISABLE_HMR !== 'true',
//       // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
//       watch: process.env.DISABLE_HMR === 'true' ? null : {},
//     },
//   };
// });



// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default defineConfig(() => {
//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, '.'),
//       },
//     },
//     server: {
//       // HMR is disabled in AI Studio via DISABLE_HMR env var.
//       // Do not modify — file watching is disabled to prevent flickering during agent edits.
//       hmr: import.meta.env?.VITE_DISABLE_HMR !== 'true',
//       // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
//       watch: import.meta.env?.VITE_DISABLE_HMR === 'true' ? null : {},
//     },
//   };
// });



import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => ({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    hmr: true,
    watch: {},
  },
}));
