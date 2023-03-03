import { For } from "solid-js";
import Section from "../../components/Section";
import LongArticleBlock from "../../components/LongArticleBlock";
import Title from "../../components/CenterTitle";

import ArticlesCarousel from "./Articles/ArticlesCarousel";

const map = [];

import { useI18n } from "@solid-primitives/i18n";

export default () => {
  const [t, { locale }] = useI18n();

  const withOrg = () =>
    map.filter(
      (item) => item.meta.language === locale() && item.meta.orgnization
    );

  return (
    <Section>
      <Title
        title={t("index.articles.title")}
        description={t("index.articles.description")}
      />
      <For each={withOrg()}>
        {(item, index) => (
          <LongArticleBlock
            {...item.meta}
            name={item.name}
            reverse={index() % 2}
          />
        )}
      </For>
      <div class="my-20"></div>
      <ArticlesCarousel />
    </Section>
  );
};
