import Equation from "./TakeAction/Equation";

import blob1l from "@/assets/images/blob1l.svg?raw";
import blob1r from "@/assets/images/blob1r.svg?raw";
import blob2l from "@/assets/images/blob2l.svg?raw";
import blob2r from "@/assets/images/blob2r.svg?raw";

import { For } from "solid-js";
import Section from "@/components/Section";
import Title from "@/components/CenterTitle";
import { useAppContext } from "@/AppContext";

const equations = [
  {
    leftBlob: blob1l,
    rightBlob: blob1r,
    left: "煤炭节省",
    right: "二氧化碳减排",
    leftValue: "1.00",
    rightValue: "2.36",
    leftUnit: "吨",
    rightUnit: "吨",
  },
  {
    leftBlob: blob2l,
    rightBlob: blob2r,
    left: "樟树",
    right: "二氧化碳减排",
    leftValue: "1.0",
    rightValue: "150",
    leftUnit: "棵",
    rightUnit: "千克",
  },
];

export default () => {
  const { t } = useAppContext();
  return (
    <Section>
      <Title
        title={t("index.takeAction.title")}
        description={t("index.takeAction.description")}
      />
      <div class="h-20" />
      <For each={equations}>{(equation) => <Equation {...equation} />}</For>
    </Section>
  );
};
