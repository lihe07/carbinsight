import { For } from "solid-js";

export default (props) => {
  return (
    <div class="flex">
      <For each={props.options}>
        {(option) => <div class="flex-1">{option}</div>}
      </For>
    </div>
  );
};
