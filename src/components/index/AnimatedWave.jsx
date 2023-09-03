import { Motion } from "@motionone/solid";
import { createSignal, onMount, Show } from "solid-js";

export default (props) => {
  const [left, setLeft] = createSignal(-50);
  let container;
  function asScroll() {
    const rate = Math.max(
      0,
      Math.tanh(
        ((window.innerHeight -
          container.getBoundingClientRect().top -
          container.offsetHeight) /
          container.offsetHeight) *
          2,
      ),
    );
    setLeft(-50 * (1 - rate));
  }
  function immediate() {
    if (
      window.innerHeight - container.getBoundingClientRect().top >
      window.innerHeight / 3
    ) {
      setLeft(0);
    } else if (container.getBoundingClientRect().top >= window.innerHeight) {
      setLeft(-50);
    }
  }
  onMount(() => {
    // const root = document.getElementById('root')
    const listener = props.type === "asScroll" ? asScroll : immediate;
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  const duration = () => (props.type === "asScroll" ? 0.1 : 0.5);
  return (
    <div
      ref={container}
      class="w-full h-30vw max-h-70 relative overflow-hidden"
    >
      <Motion.div
        class="w-150% h-full absolute transition-colors-300 dark:color-true-gray-8 light:color-teal-9"
        animate={{ left: left() + "%" }}
        transition={{ duration: duration(), ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 1440 320"
          class="h-full w-full"
          preserveAspectRatio="none"
        >
          <Show when={!props.reverse}>
            <path
              fill="currentColor"
              fill-opacity="1"
              d="M0,224L80,202.7C160,181,320,139,480,144C640,149,800,203,960,234.7C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </Show>
          <Show when={props.reverse}>
            <defs>
              <mask id="mask">
                <rect width="1440" height="320" fill="white" />
                <path
                  d="M0,224L80,202.7C160,181,320,139,480,144C640,149,800,203,960,234.7C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="1440"
              height="320"
              fill="currentColor"
              mask="url(#mask)"
            />
          </Show>
        </svg>
      </Motion.div>
    </div>
  );
};
