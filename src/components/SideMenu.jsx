import { Portal } from "solid-js/web";

export default (props) => {
  return (
    <Portal>
      <div
        class="fixed z-3 top-0 w-full h-screen bg-white dark:bg-true-gray-8 light:bg-teal-7 !bg-op-70 backdrop-blur transition-all-300"
        classList={{
          "left-0": props.show,
          "left-full": !props.show,
        }}
      >
        SideMenu
      </div>
    </Portal>
  );
};
