import { useAppContext } from "@/AppContext";
import ColorNumber from "./ColorNumber";

export default () => {
  const { t } = useAppContext;

  return (
    <>
      全球交通部门能源消耗占世界能源总量的
      <ColorNumber class="bg-gradient-from-sky-4 bg-gradient-to-teal-4">
        21%
      </ColorNumber>
      ，产生的温室气体是全球总排放量的
      <ColorNumber class="bg-gradient-from-sky-4 bg-gradient-to-teal-4">
        20%
      </ColorNumber>
    </>
  );
};
