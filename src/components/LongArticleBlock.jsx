import { Show } from "solid-js";
import Section from "./Section";
import { useNavigate } from "solid-start";
import { useAppContext } from "@/AppContext";
import orgs from "@/orgs";

function Wrapper(props) {
  return (
    <>
      <Show when={props.noAnimation}>{props.children}</Show>
      <Show when={!props.noAnimation}>
        <Section animOnly={true}>{props.children}</Section>
      </Show>
    </>
  );
}

export default (props) => {
  const navigate = useNavigate();
  const { t } = useAppContext();

  return (
    <Wrapper noAnimation={props.noAnimation}>
      <div
        class="flex rounded-5 min-h-70 w-full bg-black dark:bg-op-50 light:bg-op-30 transition my-20 md:flex-row flex-col cursor-pointer op-90 hover:op-100 active:op-80 cursor-pointer"
        classList={{
          "md:flex-row-reverse": props.reverse,
        }}
        onClick={() => {
          navigate("/articles/" + props.id);
        }}
      >
        <div
          class="md:w-50% w-full md:h-auto h-70 rounded-5 bg-cover"
          style={{ "background-image": `url(${props.cover})` }}
        />
        <div class="md:w-50% w-full md:h-full color-white pa-10 box-border relative">
          <Show when={props.orgnization}>
            <p class="text-5 op-90 m0 flex items-center">
              <img
                src={orgs[props.orgnization].logo}
                alt={orgs[props.orgnization].name}
                class="w-7 h-7 rounded-50%"
              />
              <span class="ml-2">{orgs[props.orgnization].name}</span>
            </p>
            <div class="flex gap-2 mt-3 absolute right-10 top-6">
              <For each={props.tags}>
                {(tag) => (
                  <div class="text-4 border-white border-solid border-1 rounded-lg px-3 py-1">
                    {tag}
                  </div>
                )}
              </For>
            </div>
          </Show>

          <h1 class="text-8 my-4 tracking-wide">{props.title}</h1>
          <p class="text-5 m-0 op-70 leading-relaxed overflow-ellipsis">
            {props.description}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
