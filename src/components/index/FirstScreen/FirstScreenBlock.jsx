import { Motion } from "@motionone/solid";

import a from "./FirstScreenContents/1";
import b from "./FirstScreenContents/2";
import c from "./FirstScreenContents/3";
import d from "./FirstScreenContents/4";

const components = [a, b, c, d];

export default (props) => {
  return (
    <div class="absolute overflow-hidden md:w-125 m-x-10 rounded-6 dark:bg-true-gray-9 light:bg-teal-9 !bg-opacity-40 backdrop-blur-lg top-10 ">
      <div class="m-8">
        <p class="text-6 leading-40px">{components[props.current()]}</p>
      </div>
      {/* Progress bar */}
      <div class="bg-true-gray-9 bg-opacity-40 h-4">
        <Motion.div
          class="bg-sky-5 h-full op-50 w-0"
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: props.duration, easing: "linear" }}
        />
      </div>
    </div>
  );
};
