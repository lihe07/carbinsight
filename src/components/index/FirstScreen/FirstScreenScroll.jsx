import { createSignal } from "solid-js";
import { Motion } from "@motionone/solid";

export default () => {
  const [top, setTop] = createSignal("0%");

  return (
    <Motion.div
      class="absolute bottom-5 left-50% translate-x--50% write-vertical-right flex items-center text-6 font-600 tracking-wider"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, delay: 0 }}
    >
      <span>Scroll</span>
      <div class="w-15 h-15 inline-block m-t-2 relative overflow-hidden cursor-pointer">
        <Motion.div
          class="absolute w-15 h-15"
          animate={{ top: top() }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            // scroll
            setTop("100%");
            setTimeout(
              () =>
                document.getElementById("root").scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                }),
              500
            );

            setTimeout(() => setTop("0%"), 1000);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none">
              <path
                d="M11.65 4.007l.1-.007a.75.75 0 0 1 .744.648l.007.102l-.001 12.696l3.22-3.221a.75.75 0 0 1 .976-.073l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.497 4.5a.75.75 0 0 1-.976.073l-.084-.073l-4.504-4.5a.75.75 0 0 1 .976-1.133l.084.072L11 17.442V4.75a.75.75 0 0 1 .65-.743l.1-.007l-.1.007z"
                fill="currentColor"
                style={{ "--darkreader-inline-fill": "currentColor" }}
                data-darkreader-inline-fill=""
              />
            </g>
          </svg>
        </Motion.div>
      </div>
    </Motion.div>
  );
};
