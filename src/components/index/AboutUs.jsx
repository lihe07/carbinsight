import { For } from "solid-js";
import background from "../../assets/images/ba.jpg";
import Section from "../../components/Section";
import AnimatedWave from "./AnimatedWave";
import CenterTitle from "../../components/CenterTitle";
import { useI18n } from "@solid-primitives/i18n";

import avatar from "@/assets/images/avatar.jpg";

const people = [
  {
    name: "Jiachuan Wang",
    job: "Leader",
    avatar,
  },
  {
    name: "He Li",
    job: "Website Developer",
    avatar,
  },
  {
    name: "Kevin Zhao",
    job: "Designer",
    avatar,
  },
  {
    name: "Jitong Li",
    job: "Writer",
    avatar,
  },
];

const Avatar = (props) => {
  return (
    <div class="text-center color-white">
      <img
        src={props.avatar}
        alt={props.name}
        class="md:w-40 md:h-40 w-30 h-30 rounded-10"
      />
      <h2 class="mb-0">{props.name}</h2>
      <p class="text-6 mt-0 op-80 color-sky-3">{props.job}</p>
    </div>
  );
};

export default () => {
  const t = useI18n()[0];
  return (
    <div
      class="bg-cover bg-center mt--1"
      style={{
        "background-image": `url(${background})`,
      }}
    >
      <div class="bg-black bg-op-50 h-full">
        <AnimatedWave reverse={true} type="asScroll" />
        <Section>
          <div class="md:mt--15 mt--5 mb-15">
            <CenterTitle
              title={t("index.about.title")}
              description={t("index.about.description")}
            />
          </div>
          <Section animOnly={true}>
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-5 mb-10">
              <For each={people}>{(person) => <Avatar {...person} />}</For>
            </div>
          </Section>
        </Section>
      </div>
    </div>
  );
};
