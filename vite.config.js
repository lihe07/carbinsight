import solid from "solid-start/vite";
import { defineConfig } from "vite";
import unocss from "unocss/vite";
import { listArticles } from "./src/article";

const prerenderRoutes = ["/articles-raw/"];

for (const article of await listArticles()) {
  prerenderRoutes.push("/articles/" + article.id);
  prerenderRoutes.push("/articles-raw/" + article.id);
}

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
      prerenderRoutes,
    }),
  ],
});
