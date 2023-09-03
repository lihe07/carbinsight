import Section from "@/components/Section";
import Title from "@/components/Title";
import "@/article.css";
import { useAppContext } from "@/AppContext";
import { Show } from "solid-js";

export default () => {
  const { t, lang } = useAppContext();
  return (
    <Section>
      <Title
        title={t("map.dataSource")}
        description={t("map.dataSourceDescription")}
      />

      <div class="color-white article-container">
        <Show when={lang() === "zh"}>
          <p>
            排放因子数据来源于CEADS中国碳核算数据库{" "}
            <a href="https://www.ceads.net.cn/data/">
              https://www.ceads.net.cn/data/
            </a>
            <br />
            以下为引用文献：
          </p>

          <ol>
            <li>
              Shan et al. (2022) "City-level emission peak and drivers in China.
              Science Bulletin", doi.org/10.1016/j.scib.2022.08.024
            </li>
            <li>
              Shan et al. (2018) "City-level climate change mitigation in China.
              Science Advances" 3. Shan et al. (2017) "Methodology and
              applications of city level CO2 emission accounts in China. Journal
              of Cleaner Production" 4. Shan et al. (2019) "An
              emissions-socioeconomic inventory of Chinese cities. Scientific
              Data"
            </li>
          </ol>

          <p>
            卫星拍摄数据来源于NIES日本国立环境研究所{" "}
            <a href="https://db.cger.nies.go.jp/dataset/ODIAC/">
              https://db.cger.nies.go.jp/dataset/ODIAC/
            </a>
            <br />
            以下为引用文献：
          </p>

          <p>
            Tomohiro Oda, Shamil Maksyutov (2015), ODIAC Fossil Fuel CO2
            Emissions Dataset (Version name*1 : ODIACYYYY or ODIACYYYYa), Center
            for Global Environmental Research, National Institute for
            Environmental Studies, doi:10.17595/20170411.001. (Reference date*2
            : YYYY/MM/DD)
          </p>

          <p>
            MT为百万吨
            <br />
            CGe10 为碳排放克数除以1e10
            <br />
            CGe10/人 人均二氧化碳排放体现二氧化碳排放强度
            <br />
            CGe10/美元 每国民生产值排放体现二氧化碳排放利用率
          </p>
        </Show>
        <Show when={lang() === "en"}>
          <p>
            The emission factors data is from the China Emission Accounts and
            Datasets (CEADS){" "}
            <a href="https://www.ceads.net.cn/data/">
              https://www.ceads.net.cn/data/
            </a>
            <br />
            The following is the citation:
          </p>

          <ol>
            <li>
              Shan et al. (2022) "City-level emission peak and drivers in China.
              Science Bulletin", doi.org/10.1016/j.scib.2022.08.024
            </li>
            <li>
              Shan et al. (2018) "City-level climate change mitigation in China.
              Science Advances" 3. Shan et al. (2017) "Methodology and
              applications of city level CO2 emission accounts in China. Journal
              of Cleaner Production" 4. Shan et al. (2019) "An
              emissions-socioeconomic inventory of Chinese cities. Scientific
              Data"
            </li>
          </ol>

          <p>
            The satellite data is from the National Institute for Environmental
            Studies, Japan{" "}
            <a href="https://db.cger.nies.go.jp/dataset/ODIAC/">
              https://db.cger.nies.go.jp/dataset/ODIAC/{" "}
            </a>
            <br />
            The following is the citation:
          </p>

          <p>
            Tomohiro Oda, Shamil Maksyutov (2015), ODIAC Fossil Fuel CO2
            Emissions Dataset (Version name*1 : ODIACYYYY or ODIACYYYYa), Center
            for Global Environmental Research, National Institute for
            Environmental Studies, doi:10.17595/20170411.001. (Reference date*2
            : YYYY/MM/DD)
          </p>

          <p>
            MT is million tons
            <br />
            CGe10 is the emission in 10^10 g CO2
            <br />
            CGe10/person CO2 emission per capita
            <br />
            CGe10/$ CO2 emission per GDP
          </p>
        </Show>
      </div>
    </Section>
  );
};
