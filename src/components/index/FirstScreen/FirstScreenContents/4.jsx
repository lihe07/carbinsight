import { useAppContext } from "@/AppContext";
import ColorNumber from "./ColorNumber";

export default () => {
  const { t } = useAppContext;

  return (
    <>
      材料、燃料和粮食的开采和加工过程中排放的温室气体占全球温室气体排放总量的一半，并导致
      <ColorNumber class="bg-gradient-from-sky-4 bg-gradient-to-teal-4">
        90%
      </ColorNumber>
      以上的生物多样性丧失和缺水问题
    </>
  );
};
