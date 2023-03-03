import { Link } from "@solidjs/router";
import { For, createSignal } from "solid-js";

const Open = (props) => {
  return (
    <Link
      href={props.href}
      class="color-white transition"
      classList={{
        "op-80 hover:op-100": props.hover,
        "op-0": !props.hover,
      }}
      aria-label="Read more"
    >
      <svg width="30" height="30" viewBox="0 0 24 20">
        <path
          fill="currentColor"
          d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"
        />
      </svg>
    </Link>
  );
};

export default (props) => {
  const [hover, setHover] = createSignal(false);

  return (
    <div
      class="w-full md:h-70 h-80 rounded-5 bg-center bg-cover relative cursor-pointer transition-all-300"
      style={{ "background-image": `url(${props.cover})` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        class="w-full absolute bottom-0 left-0 color-white px-10 box-border transition-all-300 rounded-5 backdrop-blur bg-black bg-op-30 overflow-hidden"
        classList={{ "h-full py-10": hover(), "h-33 py-6": !hover() }}
      >
        <div class="flex items-center justify-between">
          <h1 class="text-7 tracking-wide  m0">{props.title}</h1>

          <Open href={props.href} hover={hover()} />
        </div>
        <div class="flex gap-2 mt-3">
          <For each={props.tags}>
            {(tag) => (
              <div class="text-4 border-white border-solid border-1 rounded-lg px-3 py-1">
                {tag}
              </div>
            )}
          </For>
        </div>

        <p
          class="text-4 transition-300 leading-relaxed"
          classList={{
            "op-0": !hover(),
            "op-100": hover(),
          }}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
};
