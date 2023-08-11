import { For, createMemo, createSignal } from "solid-js";

import Card from "@/components/Card";
import InteractiveMap from "@/components/InteractiveMap";
import Section from "@/components/Section";
import Title from "@/components/Title";

import RankingItem from "./Ranking/RankingItem";
import CollapseCard from "./Ranking/CollapseCard";
import Chart from "./Ranking/Chart";

import factors from "@/assets/factors.csv?raw";
import satelite from "@/assets/satelite.csv?raw";

import { useAppContext } from "@/AppContext";
import Switcher from "../Switcher";
import { A } from "solid-start";

import { parser, sort } from "@/data";

const sources = {
  factors: parser(factors),
  satelite: parser(satelite),
};

export default () => {
  const { t } = useAppContext();

  const [collapseId, setCollapseId] = createSignal(0);

  const [currentLevel, setCurrentLevel] = createSignal("china");

  const [current, setCurrent] = createSignal({
    year: 2019,
    source: "factors",
    stat: "total",
  });

  const res = () => sources[current().source][current().stat][current().year];
  const sortedData = createMemo(() => sort(res(), currentLevel()));
  return (
    <Section id="ranking">
      <div class="h-20" />
      <Title
        title={t("index.ranking.title")}
        description={t("index.ranking.description")}
      />

      <div class="mt-20 md:h-170 h-[calc(100vh-130px)] flex md:flex-row flex-col justify-between">
        <Card class="relative md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
          <div class="absolute top-5 flex justify-center items-center w-full">
            <Switcher
              options={[t("map.factors"), t("map.satelite")]}
              onChange={(index) => {
                setCurrent({
                  ...current(),
                  source: ["factors", "satelite"][index],
                });
              }}
            ></Switcher>
          </div>
          <InteractiveMap
            defaultLevel="china"
            currentLevel={currentLevel()}
            onChangeLevel={setCurrentLevel}
            res={res()}
          />
          <div class="absolute bottom-5 flex justify-center items-center w-full">
            <Switcher
              small
              options={[t("map.total"), t("map.perCapita"), t("map.perGDP")]}
              onChange={(index) => {
                setCurrent({
                  ...current(),
                  stat: ["total", "perCapita", "perGDP"][index],
                });
              }}
            ></Switcher>
          </div>
        </Card>

        <div class="flex flex-col justify-between md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
          <CollapseCard
            id={0}
            current={collapseId()}
            set={setCollapseId}
            title="Ranking Title"
          >
            <For each={sortedData()}>
              {(row, index) => (
                <RankingItem
                  name={row.key}
                  unit="unit"
                  data={row.value}
                  rank={index() + 1}
                  onClick={() => setCurrentLevel(row.key)}
                  active={currentLevel() === row.key}
                />
              )}
            </For>
          </CollapseCard>
          <CollapseCard
            id={1}
            current={collapseId()}
            set={setCollapseId}
            title="Chart Title"
          >
            <Chart
              currentLevel={currentLevel()}
              data={sources[current().source][current().stat]}
            />
          </CollapseCard>
        </div>
      </div>

      <div class="flex justify-center mt-3">
        <A
          href="/map"
          class="color-white op-70 hover:op-100 transition cursor-pointer active:op-50 flex items-center gap-1  px-3 py-2 rounded-md decoration-none"
        >
          <div class="i-fluent-full-screen-maximize-20-filled w-7 h-7"></div>
          View in fullscreen
        </A>
      </div>
    </Section>
  );
};
