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
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre",
    },
    unocss(),
    solid({
      adapter: "solid-start-static",
      extensions: [".mdx", ".md"],
    }),
  ],
});
