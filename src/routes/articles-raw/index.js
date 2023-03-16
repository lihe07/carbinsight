import { json } from "solid-start";
import { listArticles } from "@/article";
export async function GET() {
  return json(await listArticles());
}
