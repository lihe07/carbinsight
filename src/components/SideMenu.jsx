import { Portal } from "solid-js/web";
import { useAppContext } from "@/AppContext";
import { A, useLocation } from "solid-start";

import { IconMoon, IconSun } from "./Header";

const IconLanguage = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="m12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z"
    />
  </svg>
);

function SmallButton(props) {
  return (
    <div
      class="flex items-center gap-1 cursor-pointer active:scale-80 transition"
      onClick={props.onClick}
    >
      <span class="mt-1.5">{props.icon}</span>
      <span class="text-lg">{props.children}</span>
    </div>
  );
}

export default (props) => {
  const { t, switchLang, switchTheme, dark } = useAppContext();
  const location = useLocation();

  return (
    <Portal>
      <div
        class="fixed z-3 top-0 w-full h-screen bg-white dark:bg-true-gray-8 light:bg-teal-7 !bg-op-70 backdrop-blur transition-all-300 pt-20 "
        classList={{
          "left-0": props.show,
          "left-full": !props.show,
        }}
      >
        <For each={props.routes}>
          {(route) => (
            <A
              class="decoration-none color-white font-sans text-lg h-15 flex items-center justify-center my-5 mx-5 box-border rounded-xl light:border-teal-6 dark:border-truegray-7 light:bg-teal-6 dark:bg-truegray-7 border-3 border-solid transition-all-300"
              classList={{
                "!bg-op-0": location.pathname !== route.path,
                "bg-op-100": location.pathname === route.path,
              }}
              href={route.path}
            >
              {t(route.name)}
            </A>
          )}
        </For>

        <div class="flex mt-5 mx-5 justify-between color-white font-sans">
          <SmallButton onClick={switchLang} icon={IconLanguage}>
            {t("otherName")}
          </SmallButton>
          <SmallButton icon={dark() ? IconSun : IconMoon} onClick={switchTheme}>
            Dark
          </SmallButton>
        </div>
      </div>
    </Portal>
  );
};
