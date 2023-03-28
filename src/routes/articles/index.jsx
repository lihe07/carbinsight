import { Meta, Title, useRouteData } from "solid-start";
import { For, createEffect, createSignal, Show, on } from "solid-js";
import { useAppContext } from "@/AppContext";

import header from "@/assets/images/ba.jpg";
import Section from "@/components/Section";
import CenterTitle from "@/components/CenterTitle";
import LongArticleBlock from "@/components/LongArticleBlock";

import articlesRouteData from "./index.data";

export const routeData = articlesRouteData;

const categories = [
  {
    name: {
      en: "All",
      zh: "全部",
    },
    description: {
      en: "All articles",
      zh: "所有文章",
    },
    cover: header,
    id: "all",
  },
  {
    name: {
      en: "Gov Documents",
      zh: "政府文献",
    },
    description: {
      en: "Goverment Documents",
      zh: "政府文献",
    },
    cover: header,
    id: "gov",
  },
  {
    name: {
      en: "Intergov Documents",
      zh: "政府间组织文献",
    },
    description: {
      en: "Intergoverment Documents",
      zh: "政府间组织文献",
    },
    cover: header,
    id: "intergov",
  },
  {
    name: {
      en: "NGO Articles",
      zh: "公益组织文章",
    },
    description: {
      en: "NGO Articles",
      zh: "公益组织文章",
    },
    cover: header,
    id: "ngo",
  },
  {
    name: {
      en: "Research Papers",
      zh: "科研论文",
    },
    description: {
      en: "Research Papers Desc",
      zh: "科研论文描述",
    },
    cover: header,
    id: "papers",
  },
];

const ImageHeader = (props) => {
  const [cover, setCover] = createSignal(null);

  createEffect(() => {
    if (props.src) {
      setCover(props.src);
    }
  });

  return (
    <div class="h-70 relative">
      <div
        style={{ "background-image": `url(${cover()})` }}
        class="w-full h-full bg-cover bg-center transition-opacity"
        classList={{ "op-0": !props.src }}
      />
      <div class="w-full h-full absolute top-0 bg-black bg-op-40 flex flex-col justify-center">
        <CenterTitle {...props} />
      </div>
    </div>
  );
};

const Category = (props) => {
  const { lang } = useAppContext();
  return (
    <li
      class="dark:bg-true-gray-8 light:bg-teal-7 hover:op-100 rounded-xl h-10 min-w-10 md:text-left text-center leading-9.5 px-3 my-3 transition cursor-pointer outline-2 outline-solid dark:outline-true-gray-8 light:outline-teal-7"
      classList={{ "!bg-op-0 op-80": !props.active }}
      onClick={() => props.onClick()}
    >
      {props.name[lang()]}
    </li>
  );
};

const Input = (props) => {
  return (
    <input
      type="text"
      placeholder="Search"
      class="dark:bg-true-gray-8 dark:outline-true-gray-8 light:bg-teal-7 light:outline-teal-7 color-white border-none rounded-xl h-10 w-full outline-solid outline-2 op-80 hover:op-100 dark:focus:outline-true-gray-7 light:focus:outline-teal-6 focus:bg-op-0 focus:op-100 transition-all px-3 box-border tracking-wide placeholder-white text-16px"
      onInput={(e) =>
        props.setCategory({
          name: {
            en: "Search results",
            zh: "搜索结果",
          },
          description: {
            en: `Search results for "${e.target.value}"`,
            zh: `搜索结果 "${e.target.value}"`,
          },
          id: -1,
          value: e.target.value,
        })
      }
    />
  );
};

const Left = (props) => {
  return (
    <aside class="border-r border-white w-70 border-r-solid border-op-10 md:block hidden">
      <div class="sticky top-30 pb-5 px-10 color-white">
        <Input setCategory={props.setCategory} />
        <ul class="list-none p0 mt-7">
          <For each={categories}>
            {(category) => (
              <Category
                {...category}
                active={props.category.id === category.id}
                onClick={() => props.setCategory(category)}
              />
            )}
          </For>
        </ul>
      </div>
    </aside>
  );
};

const Right = (props) => {
  const { lang } = useAppContext();

  // const articles = () => props.data?.filter((item) => item.lang === lang());
  const [articles, setArticles] = createSignal([]);
  createEffect(() => {
    if (props.data)
      setArticles(
        props.data.filter((item) => {
          if (item.lang != lang()) return false;
          if (props.category.id === "all") return true;

          if (props.category.id === -1) {
            // Search
            if (props.category.value === "") return false;
            if (item.title.includes(props.category.value)) return true;
            if (item.description.includes(props.category.value)) return true;
            return false;
          }
          return item.tags.includes(props.category.id);
        })
      );

    console.log("reorg");
  });

  return (
    <div class="min-w-0 flex-1">
      <ImageHeader
        src={props.category.cover}
        title={props.category.name[lang()]}
        description={props.category.description[lang()]}
      />
      <div class="px-10">
        <div class="md:hidden block mt-5 mb--10">
          <ul class="list-none p0 m0 color-white flex gap-5">
            <For each={categories}>
              {(category) => (
                <Category
                  {...category}
                  active={props.category.id === category.id}
                  onClick={() => props.setCategory(category)}
                />
              )}
            </For>
          </ul>
          <Input setCategory={props.setCategory} />
        </div>

        {/* {props.data} */}
        <For each={articles()}>
          {(item, index) => (
            <LongArticleBlock
              reverse={index() % 2}
              noAnimation={true}
              {...item}
            />
          )}
        </For>
        <Show when={articles().length === 0}>
          <div class="color-white h-100 flex items-center justify-center">
            <p class="op-80 text-xl">没有内容...</p>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default () => {
  const [category, setCategory] = createSignal(categories[0]);
  const { t } = useAppContext();
  const data = useRouteData();
  return (
    <div class="pt-20">
      <Title>Carbinsight - {t("articles.title")}</Title>
      <Meta name="description" content="desc" />
      <Meta name="keywords" content="a,b,c" />

      <Section class="!p-0">
        <div class="flex">
          <Show when={data()}>
            <Left category={category()} setCategory={setCategory} />
            <Right
              data={data()}
              category={category()}
              setCategory={setCategory}
            />
          </Show>
        </div>
      </Section>
    </div>
  );
};
