import { Client } from "@notionhq/client";
import NotionPageToHtml from "notion-page-to-html";

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} lang
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {string} cover
 * @property {string[]} tags
 * @property {string?} content
 * @property {string?} file
 */

// Load .env
import dotenv from "dotenv";
import { bootstrap } from "global-agent";

function makeClient() {
  dotenv.config();
  bootstrap();

  return new Client({
    auth: process.env.NOTION_TOKEN,
    timeoutMs: 10000,
  });
}

function mapPage(page) {
  return {
    id: page.properties.id.rich_text[0].plain_text,
    lang: page.properties.Lang.select.name,
    title: page.properties.Title.title[0].plain_text,
    description: page.properties.Description.rich_text[0].plain_text,
    date: page.properties.Date.date.start,
    cover: page.cover.external.url,
    tags: page.properties.Tags.multi_select.map((tag) => tag.name),
  };
}

/**
 * @param {string} id
 * @returns {Promise<Article[]>}
 */
export async function parseArticle(id) {
  console.log("parseArticle", id);
  const pages = await makeClient().databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "id",
      rich_text: {
        equals: id,
      },
    },
  });

  //   console.log(pages);
  return await Promise.all(
    pages.results.map(async (page) => {
      let article = mapPage(page);
      article.content = (
        await NotionPageToHtml.convert(page.url, {
          bodyContentOnly: true,
        })
      ).html;
      return article;
    })
  );
}

/**
 * @returns {Promise<Article[]>}
 */
export async function listArticles() {
  const pages = await makeClient().databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return pages.results.map(mapPage);
}
