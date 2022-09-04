import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["~~/styles/main.css"],
    meta: {
        link: [
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.min.css" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" }
        ],
        title: "songify"
    },
    runtimeConfig: {
        public: {
            apiEndpoint: "http://localhost:8080/api"
        }
    }
});
