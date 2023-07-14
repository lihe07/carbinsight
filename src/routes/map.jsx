import { useAppContext } from "@/AppContext";
import InteractiveMap from "@/components/InteractiveMap";
import { Title } from "solid-start";
import { createSignal, createMemo } from "solid-js";

import { parser, sort, numberToColorRaw } from "@/data";
import factors from "@/assets/factors.csv?raw";
import satelite from "@/assets/satelite.csv?raw";
import Card from "@/components/Card";

export default () => {
  const { t } = useAppContext();

  const [currentLevel, setCurrentLevel] = createSignal("china");

  const sources = {
    factors: parser(factors),
    satelite: parser(satelite),
  };

  const [current, setCurrent] = createSignal({
    year: 2019,
    source: "factors",
    stat: "total",
  });

  const res = () => sources[current().source][current().stat][current().year];

  const sortedData = createMemo(() => sort(res().data));

  return (
    <div class="color-white flex">
      <Title>Carbinsight - {t("map.title")}</Title>

      <div class="h-screen pt-20 box-border w-60% relative">
        <Card class="p-5 absolute top-25 left-5 right-0">Properties</Card>

        <InteractiveMap
          res={res()}
          defaultLevel="china"
          currentLevel={currentLevel()}
          onChangeLevel={setCurrentLevel}
        />

        <Card class="p-5 absolute bottom-5 left-5 right-0">TIME Slider</Card>
      </div>

      <Card class="p-5 mt-25 m-5 flex-grow">
        <h2>TODO: Ranking...</h2>
      </Card>
    </div>
  );
};
