import { csvParse } from "d3";

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
    const currentInt = parseInt(currentLevel);
    arr = arr.filter(
      (row) =>
        (parseInt(row.key) - currentInt).toString().length ==
        currentLevel.match(/0/g)?.length || 0
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
  //    <stat>: { <year>: { min, max, data } }
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
      if (!nested[stat][year]) nested[stat][year] = { data: {} };

      nested[stat][year].data[region] = parseFloat(row[stat]);
    }
  }

  // Calculate min, max

  for (const stat of stats) {
    for (const year in nested[stat]) {
      const data = Object.values(nested[stat][year].data);
      nested[stat][year].min = Math.min(...data);
      nested[stat][year].max = Math.max(...data);
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
