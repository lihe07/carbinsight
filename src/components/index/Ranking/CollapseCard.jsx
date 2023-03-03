import { Motion } from "@motionone/solid";
import Card from "../../../components/Card";

export default (props) => {
  const show = () => props.id === props.current;

  function changeVisibility() {
    const other = props.id === 0 ? 1 : 0;
    props.set(show() ? other : props.id);
  }

  return (
    <Motion.div
      class="md:!h-[calc(50%-10px)]"
      animate={{
        height: show() ? "calc(100% - 5rem)" : "3.75rem",
      }}
    >
      <Card class="w-full overflow-hidden h-full">
        <div
          class="h-15 w-full flex items-center color-white px-3 box-border md:hidden block transition-300 cursor-pointer"
          onClick={changeVisibility}
          classList={{
            "op-70": !show(),
            "op-100": show(),
          }}
        >
          <svg
            class="w-7 h-7 transition-all-300 mx-1"
            classList={{
              "rotate-0 translate-y-0.5": show(),
              "rotate--90": !show(),
            }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="m0 text-4">{props.title}</span>
        </div>
        <div
          class="h-max w-full transition md:op-100"
          classList={{
            "op-0": !show(),
            "op-100": show(),
          }}
        >
          {props.children}
        </div>
      </Card>
    </Motion.div>
  );
};
