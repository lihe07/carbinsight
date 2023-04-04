import { For, createSignal } from "solid-js";

export default (props) => {
  const [currnet, setCurrent] = createSignal(0);

  return (
    <div class="flex relative w-max rounded-lg p-1 border-white border-1 border-solid border-op-20 cursor-pointer light:bg-teal-8 dark:bg-truegray-9 !bg-op-50 transition-300">
      <For each={props.options}>
        {(option, index) => (
          <div
            class="flex-1 w-25 h-5.6 p-x-3 py-1 text-center transition color-white "
            classList={{
              "op-100": index() === currnet(),
              "op-30 hover:op-80": index() !== currnet(),
              "!w-20": props.small,
            }}
            style="line-height: 23px"
            onClick={() => {
              setCurrent(index());
              props.onChange?.(index());
            }}
          >
            {option}
          </div>
        )}
      </For>

      <div
        class="absolute top-1 w-31 h-7.6 bg-white bg-op-30 rounded transition-all"
        classList={{
          "!w-25.5": props.small,
        }}
        style={{
          left: `${currnet() * (props.small ? 104 : 124) + 5}px`,
        }}
      ></div>
    </div>
  );
};
