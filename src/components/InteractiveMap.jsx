import { createEffect, onMount } from "solid-js";
import * as d3 from "d3";
import { useAppContext } from "../AppContext";
import style from "./InteractiveMap.module.css";

const china =
  "https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221230/1623192915.txt";

const api = "https://geo.datav.aliyun.com/areas_v2/bound/{level}_full.json";

async function getGeoJson(level) {
  const res = await fetch(
    level === "china" || level === null ? china : api.replace("{level}", level)
  );
  const data = await res.json();
  return data.features;
}

function coloring(g, dark, data, numberToColor) {
  if (!g) return;
  g.selectAll("path")
    // .attr("fill", dark ? "#525252" : "#0d9488")
    .attr("fill", (d) => {
      const code = d.properties.code;
      if (!data[code]) {
        return dark ? "#525252" : "#0d9488";
      }
      return numberToColor(data[code]?.Total, dark);
    })
    .attr("stroke", dark ? "#262626" : "#115e59")
    .attr("stroke-width", 0.5)
    .attr("opacity", 0.8);
}

function resize(container, svg, g, transform) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  svg.attr("width", width).attr("height", height);
  svg.selectAll("rect").attr("width", width).attr("height", height);
  // translate the map to center
  if (!transform) {
    if (window.innerWidth < 768) {
      g.attr("transform", `translate(${width / 2}, ${height / 2}) scale(0.7)`);
    } else {
      g.attr("transform", `translate(${width / 2}, ${height / 2})`);
    }
  } else {
    const deltaX = (container.clientWidth - transform.clientWidth) / 2;
    const deltaY = (container.clientHeight - transform.clientHeight) / 2;
    g.attr(
      "transform",
      `translate(${transform.x + deltaX}, ${transform.y + deltaY}) scale(${
        transform.k
      })`
    );
  }
}

function initMap(container, features, onClick) {
  const projection = d3.geoMercator().center([158, 15]).scale(500);
  // .translate([width / 2, height / 2])
  const path = d3.geoPath().projection(projection);
  const svg = d3.select(container).append("svg");

  svg.attr("style", "cursor: pointer;");

  svg
    .append("rect")
    .attr("opacity", 0)
    .on("click", function () {
      onClick();
    });

  const g = svg.append("g"); // map group
  g.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", function (d) {
      return d.properties.code || d.properties.adcode;
    })
    .on("mouseover", function () {
      d3.select(this).transition().duration(150).attr("opacity", 1);
    })
    .on("mouseout", function () {
      if (!this.classList.contains("active")) {
        d3.select(this).transition().duration(150).attr("opacity", 0.8);
      }
    })
    .on("click", function () {
      onClick(this);
    });

  return { svg, g, path, projection };
}

function getCentroid(ele) {
  if (!ele) return [0, 0];
  const bbox = ele.getBBox();
  return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
}

const MARGIN = 50;
function getScale(ele, container) {
  if (!ele) {
    // If is mobile: 0.7 else: 1
    return window.innerWidth < 768 ? 0.8 : 1;
  }
  const bbox = ele.getBBox();
  const widthScale = (container.clientWidth - MARGIN) / bbox.width;
  const heightScale = (container.clientHeight - MARGIN) / bbox.height;
  return Math.min(widthScale, heightScale, 5);
}

export default (props) => {
  let container;
  const { dark } = useAppContext();

  console.log(props.defaultLevel);
  const featuresPromise = getGeoJson(props.defaultLevel);

  onMount(() => {
    featuresPromise.then((features) => {
      map = initMap(container, features, onClick);

      resize(container, map.svg, map.g);
      new ResizeObserver(() =>
        resize(container, map.svg, map.g, transform)
      ).observe(container);
      coloring(map.g, dark(), props.data, props.numberToColor);
    });
  });

  // Preparation: loading data
  createEffect(() => {
    console.log("change level", props.currentLevel);
    changeTo(props.currentLevel);

    setTimeout(() => {
      getGeoJson(props.currentLevel).then((features) => {
        // Clear current map
        map.svg.remove();

        map = initMap(container, features, onClick);

        resize(container, map.svg, map.g, transform);

        coloring(map.g, dark(), props.data, props.numberToColor);
      });
    }, 500);
  });

  let map;
  let transform;

  createEffect(() => coloring(map?.g, dark(), props.data, props.numberToColor)); // Theme

  function onClick(ele) {
    if (props.currentLevel === ele?.id) {
      // Double Click, Back to default
      ele = null;
    }
    if (!ele?.id) {
      // Only elements that have id can be clicked
      ele = null;
    }

    changeTo(ele?.id || "china");
  }

  function changeTo(level) {
    if (!map) return;

    const containerX = container.clientWidth / 2;
    const containerY = container.clientHeight / 2;

    transform = {
      clientWidth: container.clientWidth,
      clientHeight: container.clientHeight,
    };

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
        function () {
          return this.id === ele.id;
        }
    );

    map.g
      .selectAll("path")
      .transition()
      .duration(300)
      .attr("opacity", function () {
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
