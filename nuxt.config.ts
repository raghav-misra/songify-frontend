import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: "static",
    ssr: false,
    css: ["~~/styles/main.css"],
    meta: {
        link: [
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk&family=Material+Icons+Round&display=swap" }
        ],
        title: "songify"
    },
    runtimeConfig: {
        public: {
            apiEndpoint: process.env.API_ENDPOINT
        }
    }
});
