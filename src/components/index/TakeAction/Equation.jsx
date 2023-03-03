import { svgContainer } from "./Equation.module.css";

import Section from "../../../components/Section";

const Block = (props) => {
  return (
    <div class="relative md:w-70 md:h-70 w-30 h-45 overflow-hidden">
      {/* SVG */}
      <div
        class={
          "absolute md:w-110 w-50 md:top-0 top--1 md:left--20 left--10 z-0 dark:color-slate-7 light:color-teal-7 transition-colors " +
          svgContainer
        }
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={props.blob}
      />
      <div class="absolute md:top-23 top-10.5 w-full z-1 text-center color-white">
        <h2 class="md:text-10 text-6 m-y-0">
          {props.value}
          <span class="md:text-6 text-4 op-80">{props.unit}</span>
        </h2>
        <p class="text-5 op-80 md:m-t-1 m-t-10">{props.name}</p>
      </div>
    </div>
  );
};

const eq =
  "md:w-30 w-10 md:h-3 h-2 md:m-y-7 m-y-3 rounded dark:bg-true-gray-5 light:bg-teal-6 transition-colors";

export default (props) => {
  return (
    <Section animOnly={true} class="flex justify-around items-center m-b-5">
      <Block
        value={props.leftValue}
        blob={props.leftBlob}
        unit={props.leftUnit}
        name={props.left}
      />
      <div>
        <div class={eq} />
        <div class={eq} />
      </div>
      <Block
        value={props.rightValue}
        blob={props.rightBlob}
        unit={props.rightUnit}
        name={props.right}
      />
    </Section>
  );
};
