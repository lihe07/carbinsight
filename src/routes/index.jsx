import FirstScreen from "@/components/index/FirstScreen";
import Ranking from "@/components/index/Ranking";
import AnimatedWave from "@/components/index/AnimatedWave";
import TakeAction from "@/components/index/TakeAction";
import Articles from "@/components/index/Articles";

import Section from "@/components/Section";
import AboutUs from "@/components/index/AboutUs";
import { Meta, Title, useRouteData } from "solid-start";
import { useAppContext } from "@/AppContext";

import articlesRouteData from "@/routes/articles/index.data.js";

export const routeData = articlesRouteData;

export default (props) => {
  const data = useRouteData();
  const { t } = useAppContext();
  return (
    <div class="overflow-hidden">
      <Title>{`Carbinsight - ${t("index.title")}`}</Title>
      <Meta name="description" content="Carbinsight" />
      <Meta name="keywords" content="" />

      <FirstScreen />
      <Ranking />
      <Section animOnly={true}>
        <AnimatedWave type="immediate" />
        <div class="dark:bg-true-gray-8 light:bg-teal-9 transition-colors-300">
          <TakeAction />
          <Articles data={data()} />
        </div>
      </Section>
      <AboutUs />
    </div>
  );
};
