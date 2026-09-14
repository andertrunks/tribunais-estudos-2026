import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "/tribunais-estudos-2026/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Tribunais Estudos 2026",
        short_name: "Tribunais",
        description: "Conteúdo Mestre para Concursos de Tribunais",
        lang: "pt-BR",
        theme_color: "#142f32",
        background_color: "#f6f7f9",
        display: "standalone",
        scope: "/tribunais-estudos-2026/",
        start_url: "/tribunais-estudos-2026/#/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "index.html",
        globPatterns: ["**/*.{js,css,html,png,svg,webmanifest,woff,woff2,ttf}"],
      },
    }),
  ],
});
