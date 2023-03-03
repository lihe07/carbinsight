import { splitProps } from "solid-js";

export default (props) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  return (
    <div
      {...others}
      class={
        "dark:bg-true-gray-8 light:bg-teal-9 rounded-xl transition-colors-300 " +
        local.class
      }
    >
      {local.children}
    </div>
  );
};
