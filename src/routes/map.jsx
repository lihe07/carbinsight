import { useAppContext } from "@/AppContext";
import InteractiveMap from "@/components/InteractiveMap";
import { createSignal, createMemo } from "solid-js";

import { parser, sort } from "@/data";
import factors from "@/assets/factors.csv?raw";
import satelite from "@/assets/satelite.csv?raw";
import Card from "@/components/Card";
import Switcher from "@/components/Switcher";
import AllData from "@/components/map/AllData";
import RankingItem from "@/components/index/Ranking/RankingItem";
import TimeSlider from "@/components/map/TimeSlider";
import DataSource from "@/components/map/DataSource";
import { Title } from "solid-start";

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

  const sortedData = createMemo(() => sort(res(), currentLevel()));

  return (
    <div class="w-full">
      <div class="color-white flex w-full">
        <Title>Carbinsight - {t("map.title")}</Title>

        <div class="h-screen pt-20 box-border w-60% relative">
          <div class="p-5 absolute top-25 left-5 right-0 flex justify-between">
            <Switcher
              options={[t("map.factors"), t("map.satelite")]}
              onChange={(index) => {
                setCurrent({
                  ...current(),
                  source: ["factors", "satelite"][index],
                });
              }}
            />

            <Switcher
              small
              options={[t("map.total"), t("map.perCapita"), t("map.perGDP")]}
              onChange={(index) => {
                setCurrent({
                  ...current(),
                  stat: ["total", "perCapita", "perGDP"][index],
                });
              }}
            />
          </div>

          <InteractiveMap
            res={res()}
            defaultLevel="china"
            currentLevel={currentLevel()}
            onChangeLevel={setCurrentLevel}
          />

          <Card class="p-5 absolute bottom-5 left-5 right-0">
            <TimeSlider />
          </Card>
        </div>

        <Card class="p-5 mt-25 m-5 flex-grow h-[calc(100vh-160px)] overflow-y-scroll">
          <For each={sortedData()}>
            {(row, index) => (
              <RankingItem
                name={row.key}
                unit="GCe10"
                data={row.value}
                rank={index() + 1}
                onClick={() => setCurrentLevel(row.key)}
                active={currentLevel() === row.key}
              />
            )}
          </For>
        </Card>
      </div>
      <DataSource />
      <AllData current={current()} currentLevel={currentLevel()} />
    </div>
  );
};
