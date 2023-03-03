import { LineChart } from "chartist";
import "chartist/dist/index.css";
import "./Chart.css";
import { createEffect, createMemo } from "solid-js";

function process(propsData, currentLevel) {
  const data = {}; // { Poll Type: { year: value, year: value } }

  if (currentLevel === "china") {
    // Sum up all region
    for (const year in propsData) {
      for (const region in propsData[year]) {
        for (const poll in propsData[year][region]) {
          if (poll === "Total") continue;
          if (!data[poll]) data[poll] = {};
          data[poll][year] =
            (data[poll][year] || 0) + propsData[year][region][poll];
        }
      }
    }
  } else {
    // Only a single region
    for (const year in propsData) {
      for (const poll in propsData[year][currentLevel] || {}) {
        if (poll === "Total") continue;
        if (!data[poll]) data[poll] = {};
        data[poll][year] = propsData[year][currentLevel][poll];
      }
    }
  }

  const labels = Object.keys(propsData);
  const series = Object.values(data).map((poll) => Object.values(poll));

  return { labels, series };
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
