import { useI18n } from "@solid-primitives/i18n";

export default (props) => {
  const t = useI18n()[0];
  return (
    <div
      class="flex color-white h-20 w-full items-center px-5 box-border cursor-pointer op-80 hover:op-100 transition active:op-60 overflow-y-auto"
      classList={{ "!op-100": props.active }}
      onClick={(e) => props.onClick(e)}
    >
      <div
        class="w-8 h-8 rounded-50% flex items-center justify-center text-5 bg-op-40"
        classList={{
          "bg-yellow": props.rank === 1,
          "bg-gray": props.rank === 2,
          "bg-orange": props.rank === 3,
        }}
      >
        {props.rank}
      </div>
      <span class="flex-1 md:mx-5 ml-3 mr-1 text-5 mt--0.5 truncate">
        {t("codes." + props.name)}
      </span>
      <span class="font-mono">
        <span class="text-6 font-bold">{props.data.toFixed(2)}</span>
        <span class="ml-1 text-4 op-80">{props.unit}</span>
      </span>
    </div>
  );
};
