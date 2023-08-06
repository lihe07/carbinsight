import "@/table.css";
import Section from "../Section";
import Title from "../Title";
import { For } from "solid-js";
import { csvParse } from "d3";
import { useAppContext } from "@/AppContext";

import factors from "@/assets/factors.csv?raw";
import satelite from "@/assets/satelite.csv?raw";

const labeledFactors = csvParse(factors).map((row) => ({
  ...row,
  source: "factors",
}));

const labeledSatelite = csvParse(satelite).map((row) => ({
  ...row,
  source: "satelite",
}));

export default (props) => {
  const { t } = useAppContext();

  const data = () => {
    let data;
    if (props.current.source === "satelite") {
      data = labeledSatelite;
    } else {
      data = labeledFactors;
    }

    if (props.currentLevel === "china") {
      data = data.filter((row) => row.code % 10000 == 0);
    } else {
      const current = parseInt(props.currentLevel);
      data = data.filter(
        (row) =>
          (row.code - current).toString().length ==
          props.currentLevel.toString().match(/0/g).length ||
          row.code === props.currentLevel
      );
    }

    return data;
  };
  return (
    <Section>
      <Title title="全部数据"></Title>
      <table class="color-white w-full">
        <thead>
          <tr>
            <th>地区</th>
            <th>数据源</th>
            <th>时间</th>
            <th>总量</th>
            <th>人均</th>
            <th>按GDP</th>
          </tr>
        </thead>

        <tbody class="text-center">
          <For each={data()}>
            {(row) => (
              <tr>
                <td>{t("codes." + row.code)}</td>
                <td>{row.source}</td>
                <td>{row.year}</td>
                <td>{row.total}</td>
                <td>{row.perCapita}</td>
                <td>{row.perGDP}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Section>
  );
};
