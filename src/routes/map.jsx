import { useAppContext } from "@/AppContext";
import InteractiveMap from "@/components/InteractiveMap";
import { Title } from "solid-start";
import { createSignal, createMemo } from "solid-js";

import { parser, sort, numberToColorRaw } from "@/data";
import factor from "@/assets/factor.csv?raw";
import Card from "@/components/Card";

export default () => {
  const { t } = useAppContext();

  const [currentLevel, setCurrentLevel] = createSignal("china");
  const [currentYear, setCurrentYear] = createSignal(2019);

  let res = parser(factor);

  const maxOfYear = () => res.maxOfYear[currentYear()];
  const minOfYear = () => res.minOfYear[currentYear()];
  const numberToColor = (n, dark) =>
    numberToColorRaw(n, dark, maxOfYear(), minOfYear());

  const sortedData = createMemo(() => sort(res.data[currentYear()]));

  return (
    <div class="color-white flex">
      <Title>Carbinsight - {t("map.title")}</Title>

      <div class="h-screen pt-20 box-border w-60% relative">

        <Card class="p-5 absolute top-25 left-5 right-0">
          Properties
        </Card>


        <InteractiveMap
          data={res.data[currentYear()]}
          defaultLevel="china"
          currentLevel={currentLevel()}
          onChangeLevel={setCurrentLevel}
          numberToColor={numberToColor}
        />

        <Card class="p-5 absolute bottom-5 left-5 right-0">
          TIME Slider
        </Card>

      </div>

      <Card class="p-5 mt-25 m-5 flex-grow">
        <h2>TODO: Ranking...</h2>
      </Card>


    </div>
  );
};
