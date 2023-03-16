import { useAppContext } from "@/AppContext";
import ColorNumber from "./ColorNumber";

export default () => {
  const { t } = useAppContext;

  return (
    <>
      每年大约有
      <ColorNumber class="bg-gradient-from-teal-4 bg-gradient-to-cyan-5">
        700万
      </ColorNumber>
      人因接触到污染空气中可渗透到肺部和心血管系统的细微颗粒而死亡，导致中风、心脏病、肺癌、慢性阻塞性肺病等疾病，以及包括肺炎在内的呼吸道感染。
    </>
  );
};
