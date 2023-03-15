import { useI18n } from "@solid-primitives/i18n";
import logo from "@/assets/images/logo.svg";

export default () => {
  const t = useI18n()[0];
  return (
    <div class="h-screen w-full flex color-white items-center justify-center">
      <div class="flex rounded-xl transition-colors-300 dark:bg-true-gray-8 light:bg-teal-7 p-10 items-center justify-center gap-5">
        <img src={logo} alt="logo" width="80" height="80" />

        <div>
          <h2 class="m0">{t("notFound.title")}</h2>
          <p class="op-80 mt-3 mb-0">{t("notFound.description")}</p>
        </div>
      </div>
    </div>
  );
};
