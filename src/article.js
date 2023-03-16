import fs from "fs/promises";
import yaml from "js-yaml";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";

const dir = "articles";

export async function parseArticle(id) {
  const list = await listArticles();

  const article = list.find((a) => a.id === id);

  if (!article) {
    return null;
  }

  const file = await fs.readFile(dir + "/" + article.file);

  // Parse content

  return {
    content: (
      await remark({
        allowDangerousHtml: true,
      })
        .use(remarkHtml, {
          allowDangerousHtml: true,
          allowDangerousCharacters: true,
        })
        .use(remarkFrontmatter)
        .process(file)
    ).toString(),
    ...article,
  };
}

export async function listArticles() {
  let files = await fs.readdir(dir);

  files = files.filter((file) => file.endsWith(".md"));

  const re = /---\s*([\s\S]*?)\s*---/g;

  files = await Promise.all(
    files.map(async (file) => {
      const [id, lang, ext] = file.split(".");
      // Read the file, parse frontmatter
      const meta = yaml.loadAll(
        re.exec(await fs.readFile(dir + "/" + file))[0]
      )[0];

      meta.date = meta.date.toLocaleDateString();

      return {
        id,
        lang,
        file,
        ...meta,
      };
    })
  );

  return files;
}
