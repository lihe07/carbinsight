import { json } from "solid-start";
import { parseArticle } from "@/article";
export async function GET({ params }) {
  return json(await parseArticle(params.id));
}
