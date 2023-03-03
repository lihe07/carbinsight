import { Motion } from "@motionone/solid";

const colors = [
  "bg-gradient-from-sky-4 bg-gradient-to-teal-4",
  "bg-gradient-from-teal-4 bg-gradient-to-cyan-7",
  "bg-gradient-from-cyan-7 bg-gradient-to-sky-4",
  "bg-gradient-from-sky-4 bg-gradient-to-teal-4",
];

export default (props) => {
  return (
    <div
      class="absolute overflow-hidden md:w-125 m-x-10 rounded-6 dark:bg-true-gray-9 light:bg-teal-9 !bg-opacity-40 backdrop-blur-lg top-10 "
      // classList={
      //   {
      //     // 'left-10 bottom-10': props.current() === 0,
      //     // 'left-10 top-10': props.current() === 1,
      //     // 'right-10 top-10': props.current() === 2
      //   }
      // }
    >
      <div class="m-8">
        <p class="text-6" style={{ "line-height": "35px" }}>
          <span
            class={
              "text-10 font-bold m-r-2 bg-gradient-to-r bg-clip-text text-transparent " +
              colors[props.current()]
            }
          >
            114%
          </span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
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
