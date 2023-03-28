import BlazeSlider from "./BlazeSlider";
import "blaze-slider/dist/blaze.css";
import NarrowArticleBlock from "./NarrowArticleBlock";

import cover from "@/assets/images/ba.jpg";
import { For, onCleanup, onMount } from "solid-js";
import Section from "@/components/Section";

const Cover = (props) => {
  return (
    <div
      class="absolute top-0 h-full z-2 swiper-cover backdrop-blur-1"
      classList={{
        "right-full": !props.right,
        "left-full rotate-180": props.right,
      }}
    >
      <svg class="w-full h-full light:color-teal-9 dark:color-true-gray-8 transition-color-150">
        <defs>
          <mask id="msk">
            <linearGradient id="gdt">
              <stop offset="0" stop-color="white" stop-opacity="1" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#gdt)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="currentColor" mask="url(#msk)" />
      </svg>
    </div>
  );
};

export default (props) => {
  let el;

  onMount(() => {
    console.log("useBlazeSlider", el);
    const slider = new BlazeSlider(el, {
      all: {
        loop: false,
        slidesToShow: 2,
      },
      "(max-width: 768px)": {
        slidesToShow: 1,
      },
    });

    return () => {
      console.log("onCleanup");
      slider.destroy();
    };
  });

  return (
    <Section animOnly={true} class="relative">
      <div class="w-full blaze-slider" ref={el}>
        <div class="blaze-container">
          <div class="blaze-track-container !overflow-visible">
            <div class="blaze-track">
              <For each={props.articles}>
                {(article) => (
                  <div class="">
                    <NarrowArticleBlock {...article} />
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
      <Cover />
      <Cover right={true} />
    </Section>
  );
};
