import { createEffect, createMemo, on, onMount } from "solid-js";
import * as d3 from "d3";
import { useAppContext } from "../AppContext";
import style from "./InteractiveMap.module.css";
import { extreams } from "@/data";

const china =
  "https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221230/1623192915.txt";

const api = "https://upkg.bwrrc.org.cn/cn-geojson@1.1.0/{level}_full.json"

async function getGeoJson(level) {
  let url =
    level === "china" || level === null ? china : api.replace("{level}", level)


  const res = await fetch(url);
  const data = await res.json();
  return data.features;
}

function coloring(g, dark, res, max, min) {
  if (!g) return;
  if (!res) return;

  console.log("Max", max, "Min", min)

  g.selectAll("path")
    .attr("fill", (d) => {

      let code = d.properties.code || d.properties.adcode;

      code += []
      if (!res[code]) {
        // console.log("No Data for", code)
        // console.log(typeof (code))
        return dark ? "#525252" : "#0d9488";
      }

      // console.log("rendering", code)
      // console.log(numberToColorRaw(res.data[code], dark, res.max, res.min))

      return numberToColorRaw(res[code], dark, max, min);
    })
    .attr("stroke", dark ? "#262626" : "#115e59")
    .attr("stroke-width", 0.1)
    .attr("opacity", 0.8);
}

function resize(container, svg, g, transform) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  svg.attr("width", width).attr("height", height);
  svg.selectAll("rect").attr("width", width).attr("height", height);

  const deltaX = (container.clientWidth - transform.clientWidth) / 2;
  const deltaY = (container.clientHeight - transform.clientHeight) / 2;
  g.attr(
    "transform",
    `translate(${transform.x + deltaX}, ${transform.y + deltaY}) scale(${transform.k
    })`
  );
}

function initMap(container, features, onClick) {
  const projection = d3.geoMercator().center([158, 15]).scale(500);
  // .translate([width / 2, height / 2])
  const path = d3.geoPath().projection(projection);
  const svg = d3.select(container).append("svg");

  svg.attr("style", "cursor: pointer;");
  svg.style("opacity", 0).transition().duration(500).style("opacity", 1);

  svg
    .append("rect")
    .attr("opacity", 0)
    .on("click", function() {
      onClick();
    });

  const g = svg.append("g"); // map group
  g.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", function(d) {
      return d.properties.code || d.properties.adcode;
    })
    .on("mouseover", function() {
      d3.select(this).transition().duration(150).attr("opacity", 1);
    })
    .on("mouseout", function() {
      if (!this.classList.contains("active")) {
        d3.select(this).transition().duration(150).attr("opacity", 0.8);
      }
    })
    .on("click", function() {
      onClick(this);
    });

  return { svg, g, path, projection };
}

function getCentroid(ele) {
  if (!ele) return [0, 0];
  const bbox = ele.getBBox();
  return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
}

const MARGIN = 150;
function getScale(ele, container) {
  if (!ele) return 1;
  const bbox = ele.getBBox();
  const widthScale = (container.clientWidth - MARGIN) / bbox.width;
  const heightScale = (container.clientHeight - MARGIN) / bbox.height;
  return Math.min(widthScale, heightScale);
}

export function numberToColorRaw(n, dark, max, min) {
  const range = max - min;
  const percent = (n - min) / range;
  const hue = (1 - percent) * 120;
  return dark ? `hsla(${hue}, 50%, 60%, 0.5)` : `hsla(${hue}, 50%, 60%, 0.8)`;
}
export default (props) => {
  let container;
  const { dark } = useAppContext();

  console.log(props.defaultLevel);
  // const featuresPromise = getGeoJson(props.defaultLevel);
  //
  const maxmin = () => extreams(props.res, props.currentLevel)

  onMount(() => {
    new ResizeObserver(
      () => map && resize(container, map.svg, map.g, transform)
    ).observe(container);
  });

  // Preparation: loading data
  createEffect(() => {
    changeTo(props.currentLevel);
    if (props.currentLevel % 100 > 0) {
      // Already last level
      console.log("Last Level");
      return;
    }

    if (map) {
      // Fade out current map
      console.log("Fade out");
      map.svg.transition().duration(500).style("opacity", 0);
    }

    let t0 = performance.now();

    getGeoJson(props.currentLevel).then((features) => {
      setTimeout(
        () => {
          if (map) map.svg.remove();

          map = initMap(container, features, onClick);

          if (!transform) {
            transform = {
              clientHeight: container.clientHeight,
              clientWidth: container.clientWidth,
            };
          }

          const fullWidth = container.clientWidth;
          const fullHeight = container.clientHeight;

          const scale = getScale(map.g.node(), container);

          const c = getCentroid(map.g.node());

          // Re-center
          transform.x = fullWidth / 2 - scale * c[0];
          transform.y = fullHeight / 2 - scale * c[1];
          transform.k = scale;

          resize(container, map.svg, map.g, transform);

          coloring(map.g, dark(), props.res, maxmin().max, maxmin().min);
        },
        map ? Math.max(0, 500 - (performance.now() - t0)) : 0
      );
    });
  });

  let map;
  let transform;

  createEffect(on([dark, () => props.res], () => coloring(map?.g, dark(), props.res, maxmin().max, maxmin().min))) // Watch for theme and data source

  function onClick(ele) {
    if (props.currentLevel === ele?.id) {
      // Double Click, Back to default
      ele = null;
    }
    if (!ele?.id) {
      // Only elements that have id can be clicked
      ele = null;
    }

    // Calculate last level, if current is 230401, last is 230400, if current is 230400, last is 230000, if current is 230000, last is "china"

    let lastLevel = "china";

    for (let i = 1; i < 3; i++) {
      let a = Math.pow(100, i);
      if (props.currentLevel % a > 0) {
        // 230401 -> 230400
        lastLevel = Math.floor(props.currentLevel / a) * a + [];
        break;
      }
    }

    console.log("click", ele?.id || lastLevel);
    changeTo(ele?.id || lastLevel);
  }

  function changeTo(level) {
    if (!map) return;
    if (level === props.currentLevel) return;

    const containerX = container.clientWidth / 2;
    const containerY = container.clientHeight / 2;

    transform = {
      clientWidth: container.clientWidth,
      clientHeight: container.clientHeight,
    };

    console.log("change to", level);

    props.onChangeLevel(level);

    const ele = document.getElementById(level);
    const centroid = getCentroid(ele);
    const scale = getScale(ele, container);
    transform.x = containerX - centroid[0] * scale;
    transform.y = containerY - centroid[1] * scale;
    transform.k = scale;

    map.g.selectAll("path").classed(
      "active",
      ele &&
      function() {
        return this.id === ele.id;
      }
    );

    map.g
      .selectAll("path")
      .transition()
      .duration(300)
      .attr("opacity", function() {
        return this.id === ele?.id ? "1" : "0.8";
      });

    map.g
      .transition()
      .duration(700)
      .attr(
        "transform",
        `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
      );
  }

  return (
    <div
      class={"w-full max-w-full " + style.container}
      style={{ height: "100%" }}
      ref={container}
    />
  );
};
