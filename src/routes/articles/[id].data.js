import { createResource } from "solid-js";
import { useParams } from "solid-start";
import { parseArticle } from "@/article";

function isServer() {
  return typeof window === "undefined";
}

export default () => {
  const id = useParams().id;

  return createResource(async () => {
    if (isServer()) {
      return parseArticle(id);
    } else {
      // Client: Fetch the cached data from the server
      console.log("Client: Fetching Article Data", id);

      const response = await fetch(`/articles-raw/${id}`);
      const data = await response.json();

      return data;
    }
  })[0];
};
