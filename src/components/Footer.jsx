import { For } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import logo from "../assets/images/logo.svg";
import Section from "../components/Section";

const orgs = [
  {
    name: "Green Lens",
    logo: "https://placekitten.com/300/300",
  },
  {
    name: "Anyhow",
    logo: "https://via.placeholder.com/150",
  },
];

const OrgCard = (props) => {
  return (
    <div class="flex-1 flex items-center gap-5">
      <img src={props.logo} alt="" srcset="" class="w-20 h-20 rounded-50%" />
      <p class="color-white text-7">{props.name}</p>
    </div>
  );
};

export default () => {
  const t = useI18n()[0];
  return (
    <footer class="w-full md:h-100 h-max light:bg-teal-7 dark:bg-true-gray-8 overflow-hidden transition">
      <Section class="flex items-center h-full box-border md:flex-row flex-col">
        <div class="flex items-center gap-5 color-white">
          <img src={logo} alt="" srcset="" class="w-20 h-20" />
          <p class="text-7">Carbinsight</p>
        </div>
        <div class="dark:bg-true-gray-7 light:bg-teal-6 md:w-1 w-full md:h-full md:mx-10 my-5 rounded transition" />
        <div class="flex-1">
          <div class="dark:bg-true-gray-7 light:bg-teal-6 transition rounded-10 p-10">
            <h2 class="color-white mt-0 mb-7">{t("index.footer.otherOrgs")}</h2>

            <div class="flex flex-wrap gap-5">
              <For each={orgs}>{(org) => <OrgCard {...org} />}</For>
            </div>
          </div>
          <p class="color-white op-20 text-center">
            <a class="color-white" href="https://beian.miit.gov.cn/">
              京ICP备2021000000号-1
            </a>
            \ | @2023 Carbinsight
          </p>
        </div>
      </Section>
    </footer>
  );
};
