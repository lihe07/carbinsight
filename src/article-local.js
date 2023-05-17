import fs from "fs/promises";
import yaml from "js-yaml";

import showdown from "showdown";

const dir = "articles";

const converter = new showdown.Converter();
converter.setFlavor("github");

export async function parseArticle(id) {
  const list = await listArticles();

  const articles = list.filter((a) => a.id === id);

  if (articles.length === 0) {
    return null;
  }

  return await Promise.all(
    articles.map(async (article) => {
      let file = await (await fs.readFile(dir + "/" + article.file)).toString();

      // Remove frontmatter - only replace the first
      file = file.split("---").slice(2).join("---");

      // Parse content
      return {
        content: converter.makeHtml(file),
        ...article,
      };
    })
  );
}

export async function listArticles() {
  let files = await fs.readdir(dir);

  files = files.filter((file) => file.endsWith(".md"));

  files = await Promise.all(
    files.map(async (file) => {
      const [id, lang, ext] = file.split(".");
      // Read the file, parse frontmatter
      const meta = yaml.loadAll(
        await (await fs.readFile(dir + "/" + file)).toString().split("---")[1]
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
