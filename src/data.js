import { csvParse } from "d3";

export function extreams(data, currentLevel) {
  data = sort(data, currentLevel);
  if (!data.length) return {};

  return {
    max: data[0].value,
    min: data[data.length - 1].value,
  };
}

export function sort(data, currentLevel) {
  if (!data) return [];
  // Gives: [ { key: 110000, value: 123} ]
  let arr = Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }));

  if (currentLevel === "china") {
    arr = arr.filter((row) => parseInt(row.key) % 10000 == 0);
  } else {
    const currentPrefix = currentLevel.replace(/0+$/, "");
    arr = arr.filter(
      (row) => row.key.startsWith(currentPrefix) && row.key !== currentLevel,
    );
  }

  arr.sort((a, b) => b.value - a.value);
  return arr;
}

const stats = ["total", "perCapita", "perGDP"];

export function parser(raw) {
  const rawData = csvParse(raw);

  const nested = {};
  // {
  //    <stat>: { <year>: { <region>: 123 } }
  // }
  //
  // data: {
  //   <region>: number
  // }

  for (const stat of stats) {
    nested[stat] = {};
  }

  for (const row of rawData) {
    if (!row) continue;

    const year = parseInt(row.year);
    const region = parseInt(row.code);

    for (const stat of stats) {
      if (!nested[stat][year]) nested[stat][year] = {};

      nested[stat][year][region] = parseFloat(row[stat]);
    }
  }

  return nested;
}

export function numberToColorRaw(n, dark, max, min) {
  const range = max - min;
  const percent = (n - min) / range;
  const hue = (1 - percent) * 120;
  return dark ? `hsla(${hue}, 50%, 60%, 0.5)` : `hsla(${hue}, 50%, 60%, 0.8)`;
}
