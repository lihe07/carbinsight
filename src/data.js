import { csvParse } from "d3";

export function sort(data) {
  if (!data) return [];
  // Gives: [ { Code: 110000, Total: ... } ]
  const arr = Object.entries(data).map(([key, value]) => ({
    Code: key,
    ...value,
  }));
  arr.sort((a, b) => b.Total - a.Total);
  return arr;
}

export function parser(raw) {
  console.log("Parsing data...");

  const rawData = csvParse(raw);

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

  return { data, maxOfYear, minOfYear };
}

export function numberToColorRaw(n, dark, max, min) {
  const range = max - min;
  const percent = (n - min) / range;
  const hue = (1 - percent) * 120;
  return dark ? `hsla(${hue}, 50%, 60%, 0.5)` : `hsla(${hue}, 50%, 60%, 0.8)`;
}
