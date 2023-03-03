import FirstScreen from "@/components/index/FirstScreen";
import Ranking from "@/components/index/Ranking";
import AnimatedWave from "@/components/index/AnimatedWave";
import TakeAction from "@/components/index/TakeAction";
import Articles from "@/components/index/Articles";

import Section from "@/components/Section";
import AboutUs from "@/components/index/AboutUs";
import { Head, Meta, Title } from "solid-start";

export default () => {
  return (
    <>
      <Head>
        <Title>Carbinsight - 首页</Title>
        <Meta name="description" content="Carbinsight" />
        <Meta name="keywords" content="" />
      </Head>
      <div class="overflow-hidden">
        <FirstScreen />
        <Ranking />
        {/* Future: */}
        {/* <Prediction /> */}
        <Section animOnly={true}>
          <AnimatedWave type="immediate" />
          <div class="dark:bg-true-gray-8 light:bg-teal-9 transition-colors-300">
            <TakeAction />
            <Articles />
          </div>
        </Section>
        <AboutUs />
      </div>
    </>
  );
};
