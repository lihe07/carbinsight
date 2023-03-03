import { For, mergeProps } from "solid-js";
import Card from "./Card";

export default (props_) => {
  const props = mergeProps(props_, {
    direction: "right",
  });

  const values = () => {
    // console.log(props.max, props.min)
    // Calc 10 values from props.max to props.min
    const step = (props.max - props.min) / 10;
    const values = [];
    for (let i = 0; i < 11; i++) {
      values.push(props.max - step * i);
    }
    return values;
  };

  return (
    <Card class="h-full md:w-10 w-7 relative bg-gradient-linear bg-op-10 from-red to-green z1">
      <div class="w-full h-full op-50 bg-dark rounded-xl" />
      {/* When shallow screen: hide numbers */}
      <div class="w-full h-90% absolute top-4% left-0 md:op-100 op-0">
        <For each={values()}>
          {(num, index) => (
            <div
              class="flex items-center absolute"
              style={{ top: `${index() * 10}%` }}
              classList={{
                "op-70": index() % 5 === 0,
                "op-60": index() % 5 !== 0,
                "flex-row-reverse": props.direction === "left",
              }}
            >
              <div
                class="bg-white h-1 m-r-2"
                classList={{
                  "w-12": index() % 5 === 0,
                  "w-10": index() % 5 !== 0,
                }}
              />
              <span
                class="color-white"
                classList={{
                  "text-5": index() % 5 === 0,
                  "text-4": index() % 5 !== 0,
                }}
              >
                {Math.round(num)}
              </span>
            </div>
          )}
        </For>
      </div>
    </Card>
  );
};
