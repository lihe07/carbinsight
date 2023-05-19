import { useAppContext } from "@/AppContext";
import { Title } from "solid-start";

export default () => {
  const { t } = useAppContext();
  return (
    <div class="pt-30 color-white max-w-300 ma px-10">
      <Title>Carbinsight - {t("map.title")}</Title>

      <div class="h-100"></div>
    </div>
  );
};
