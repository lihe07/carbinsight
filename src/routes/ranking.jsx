import { Title as SiteTitle } from "solid-start";
import Title from "@/components/Title";
import { useAppContext } from "@/AppContext";
import rankingRaw from "@/assets/ranking.csv?raw";
import RankingEntry from "@/components/ranking/RankingEntry";
import "@/table.css";

/** @type {string[][]} */
let ranking = rankingRaw
  .split("\n")
  .slice(1)
  .filter((line) => line)
  .map((line) => line.split(","));

// Sort
ranking = ranking.sort((a, b) => {
  const aScore = parseInt(a[2]);
  const bScore = parseInt(b[2]);
  return bScore - aScore;
});

export default () => {
  const { t } = useAppContext();

  return (
    <div class="pt-30 color-white max-w-300 ma px-10">
      <SiteTitle>Carbinsight - {t("ranking.title")}</SiteTitle>

      <Title
        title={t("ranking.title")}
        description={t("ranking.description")}
      ></Title>

      <table class="w-full text-left mb-10">
        <thead>
          <tr>
            <th>{t("ranking.rank")}</th>
            <th class="">{t("ranking.name")}</th>
            <th class="">{t("ranking.amount")}</th>
          </tr>
        </thead>
        <tbody>
          <For each={ranking}>
            {(entry, index) => (
              <RankingEntry rank={index() + 1} entry={entry}></RankingEntry>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
