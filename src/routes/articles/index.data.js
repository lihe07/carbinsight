import { createResource } from "solid-js";
import { listArticles } from "@/article";

export default () => {
  return createResource(async () => {
    if (typeof window === "undefined") {
      return await listArticles();
    } else {
      return await (await fetch("/articles-raw/")).json();
    }
  })[0];
};
