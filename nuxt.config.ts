import tailwindcss from "@tailwindcss/vite";
import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/tailwind.css", "primeicons/primeicons.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
