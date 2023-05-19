import Section from "@/components/Section";
import avatar from "@/assets/images/avatar.jpg";
import { useRouteData, Title } from "solid-start";
import { useAppContext } from "@/AppContext";

import "./[id].css";

import articleRouteData from "./[id].data";

export const routeData = articleRouteData;

function ContentArea(props) {
  return (
    <article class="flex-1">
      <h1 class="text-4xl font-bold mt-3">{props.data?.title}</h1>

      <img
        src={props.data?.cover}
        alt="cover"
        class="w-full md:h-70 h-50 object-cover object-center rounded-xl"
        srcset=""
      />

      <div innerHTML={props.data?.content} class="article-container"></div>
    </article>
  );
}

function Metadata(props) {
  return (
    <div class="md:w-70 md:sticky top-30 h-max flex md:flex-col flex-row md:items-start items-center justify-between gap-1">
      <div class="flex items-center gap-3">
        <img
          src={avatar}
          alt="avatar"
          srcset=""
          class="w-17 h-17 rounded-50% border-5 border-solid dark:border-true-gray-8 light:border-teal-7 transition-300"
        />
        <div>
          <p class="text-xl m0 font-bold">He Li</p>
          <p class="mt-1 mb-0 op-50">Developer</p>
        </div>
      </div>
      <hr class="dark:border-true-gray-8 light:border-teal-7 border-solid transition-300 border-3 md:my-5 my-0 md:mx-0 mx-5 md:h-0 md:w-full h-15"></hr>

      <p class="op-50 text-lg m0">
        <span class="font-bold">Published: </span>
        {props.data?.date}
      </p>

      <p class="op-50 text-lg m0">
        <span class="font-bold">Tags: </span>
        {props.data?.tags?.join(", ")}
      </p>
    </div>
  );
}

export default () => {
  const data = useRouteData();

  const { lang } = useAppContext();

  const article = () =>
    data() && (data().find((article) => article.lang === lang()) || data()[0]);

  return (
    <div class="pt-20 color-white">
      <Title>Carbinsight - {article()?.title}</Title>

      <Section>
        <div class="flex gap-10 md:flex-row flex-col-reverse ">
          <ContentArea data={article()}></ContentArea>
          <Metadata data={article()}></Metadata>
        </div>
      </Section>
    </div>
  );
};
