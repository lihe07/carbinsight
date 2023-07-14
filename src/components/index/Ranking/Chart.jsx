import { LineChart } from "chartist";
import "chartist/dist/index.css";
import "./Chart.css";
import { createEffect, createMemo } from "solid-js";

function process(propsData, currentLevel) {
  let data = [];

  for (const year in propsData) {
    let value;

    if (currentLevel === "china") {
      value = Object.values(propsData[year].data).reduce((a, b) => a + b);
    } else {
      value = propsData[year].data[currentLevel];
    }
    data.push({
      year,
      value,
    });
  }

  data.sort((a, b) => a.year - b.year);

  return {
    labels: data.map((e) => e.year),
    series: [data.map((e) => e.value)],
  };
}

export default (props) => {
  let chart;

  const data = createMemo(() => process(props.data, props.currentLevel));

  createEffect(() => {
    if (data().series.length) chart.update(data());
  });

  function useChart(ele) {
    chart = new LineChart(
      ele,
      {
        labels: ["A", "B", "C"],
        series: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
      {
        fullWidth: true,
        chartPadding: {
          top: 50,
          left: 20,
          right: 40,
          bottom: 20,
        },
      }
    );
  }

  return (
    <div>
      <div
        class="w-full h-330px transition"
        ref={useChart}
        classList={{ "op-0": !data().series.length }}
      />
    </div>
  );
};
