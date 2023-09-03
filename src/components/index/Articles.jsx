import { For, Show } from "solid-js";
import Section from "../../components/Section";
import LongArticleBlock from "../../components/LongArticleBlock";
import Title from "../../components/CenterTitle";

import ArticlesCarousel from "./Articles/ArticlesCarousel";

import { useAppContext } from "@/AppContext";

export default (props) => {
  // console.log(props.data);
  const { t, lang } = useAppContext();

  const withOrg = () =>
    props.data &&
    props.data.filter((item) => item.lang === lang() && item.orgnization);

  return (
    <Section>
      <Title
        title={t("index.articles.title")}
        description={t("index.articles.description")}
      />
      <For each={withOrg()}>
        {(item, index) => <LongArticleBlock {...item} reverse={index() % 2} />}
      </For>
      <div class="my-20"></div>
      <ArticlesCarousel
        articles={
          props.data && props.data.filter((item) => item.lang === lang())
        }
      />
    </Section>
  );
};
