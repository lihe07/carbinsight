import { Show } from "solid-js";
import Section from "./Section";
import { useNavigate } from "@solidjs/router";

export default (props) => {
  const navigate = useNavigate();
  return (
    <Section animOnly={true}>
      <div
        class="flex rounded-5 min-h-70 w-full bg-black dark:bg-op-50 light:bg-op-30 transition my-20 md:flex-row flex-col cursor-pointer op-90 hover:op-100 active:op-80"
        classList={{
          "md:flex-row-reverse": props.reverse,
        }}
        onClick={() => navigate("/articles/" + props.name)}
      >
        <div
          class="md:w-50% w-full md:h-auto h-70 rounded-5 bg-cover"
          style={{ "background-image": `url(${props.cover})` }}
        />
        <div class="md:w-50% w-full md:h-full color-white pa-10 box-border">
          <Show when={props.orgnization}>
            <p class="text-5 op-90 m0 flex items-center">
              <img
                src={props.orgnization.logo}
                alt={props.orgnization.name}
                class="w-7 h-7"
              />
              <span class="ml-2">{props.orgnization.name}</span>
            </p>
          </Show>

          <h1 class="text-8 my-4 tracking-wide">{props.title}</h1>
          <p class="text-5 m-0 op-70 leading-relaxed overflow-ellipsis">
            {props.description}
          </p>
        </div>
      </div>
    </Section>
  );
};
