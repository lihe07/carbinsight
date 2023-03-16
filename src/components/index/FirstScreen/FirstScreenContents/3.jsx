import { useAppContext } from "@/AppContext";
import ColorNumber from "./ColorNumber";

export default () => {
  const { t } = useAppContext;

  return (
    <>
      1981年至2010年间，亚太地区创纪录的降雨天气增加了
      <ColorNumber class="bg-gradient-from-cyan-7 bg-gradient-to-sky-4">
        56%
      </ColorNumber>
      。报告表示，在2070年前，受到海岸洪水威胁程度最大的亚洲城市包括：曼谷、达卡、广州、加尔各答、孟买和上海。这些城市中的成百上千万人将面临流离失所的危险
    </>
  );
};
