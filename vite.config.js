import solid from "solid-start/vite";
import { defineConfig } from "vite";
import unocss from "unocss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
  },
  plugins: [
    unocss(),
    solid({
      adapter: "solid-start-static",
      prerenderRoutes: [
        "/articles/demo-article",
        "/articles-raw/demo-article",
        "/articles-raw/",
      ],
    }),
  ],
});
