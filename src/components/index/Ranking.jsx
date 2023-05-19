import { For, createMemo, createSignal } from "solid-js";

import Card from "@/components/Card";
import InteractiveMap from "@/components/InteractiveMap";
import Section from "@/components/Section";
import Title from "@/components/Title";

import RankingItem from "./Ranking/RankingItem";
import CollapseCard from "./Ranking/CollapseCard";
import Chart from "./Ranking/Chart";

import data from "@/assets/data.csv?raw";

import * as d3 from "d3";
import { useAppContext } from "@/AppContext";
import Switcher from "../Switcher";
import { A } from "solid-start";

function parser(raw) {
  console.log("Parsing data...");

  const rawData = d3.csvParse(raw);

  const data = {};
  // {
  //   2023: { 110000: { Pollution A: 123, ... } },
  //   year: { region: { Poll: ... } }
  // }

  const maxOfYear = {};
  const minOfYear = {};

  for (const row of rawData) {
    if (!row) continue;

    const year = parseInt(row.Year);
    const region = parseInt(row.Code);
    if (!data[year]) data[year] = {};

    data[year][region] = {};
    for (const key in row) {
      if (key === "Year" || key === "Code") continue;
      const num = parseFloat(row[key]);
      data[year][region][key] = num;
      if (key === "Total") {
        maxOfYear[year] = Math.max(maxOfYear[year] || num, num);
        minOfYear[year] = Math.min(minOfYear[year] || num, num);
      }
    }
  }

  console.log("Max of year: ", maxOfYear);
  console.log("Min of year: ", minOfYear);

  return { data, maxOfYear, minOfYear };
}

function numberToColorRaw(n, dark, max, min) {
  const range = max - min;
  const percent = (n - min) / range;
  const hue = (1 - percent) * 120;
  return dark ? `hsla(${hue}, 50%, 60%, 0.5)` : `hsla(${hue}, 50%, 60%, 0.8)`;
}

function sort(data) {
  if (!data) return [];
  // Gives: [ { Code: 110000, Total: ... } ]
  const arr = Object.entries(data).map(([key, value]) => ({
    Code: key,
    ...value,
  }));
  arr.sort((a, b) => b.Total - a.Total);
  return arr;
}

export default () => {
  const { t } = useAppContext();

  const [collapseId, setCollapseId] = createSignal(0);

  const [currentLevel, setCurrentLevel] = createSignal("china");
  // const [currentYear, setCurrentYear] = createSignal(new Date().getFullYear());
  const [currentYear, setCurrentYear] = createSignal(2019);

  let res = parser(data);

  const maxOfYear = () => res.maxOfYear[currentYear()];
  const minOfYear = () => res.minOfYear[currentYear()];
  const numberToColor = (n, dark) =>
    numberToColorRaw(n, dark, maxOfYear(), minOfYear());

  const sortedData = createMemo(() => sort(res.data[currentYear()]));

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
            ></Switcher>
          </div>
          <InteractiveMap
            defaultLevel="china"
            currentLevel={currentLevel()}
            onChangeLevel={setCurrentLevel}
            data={res.data[currentYear()]}
            numberToColor={numberToColor}
          />
          <div class="absolute bottom-5 flex justify-center items-center w-full">
            <Switcher
              small
              options={[t("map.total"), t("map.perCapita"), t("map.perGDP")]}
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
            {/* <RankingItem name="Provi Name" unit="unit" data={114} rank={1} /> */}
            <For each={sortedData()}>
              {(row, index) => (
                <RankingItem
                  name={row.Code}
                  unit="unit"
                  data={row.Total}
                  rank={index() + 1}
                  onClick={() =>
                    setCurrentLevel(
                      currentLevel() === row.Code ? "china" : row.Code
                    )
                  }
                  active={currentLevel() === row.Code}
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
            <Chart currentLevel={currentLevel()} data={res.data} />
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
