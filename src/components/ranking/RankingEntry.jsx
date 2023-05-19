import { useAppContext } from "@/AppContext";

/**
 * @param {string[]} props.entry
 * @param {number} props.rank
 */
export default (props) => {
  const { lang } = useAppContext();
  return (
    <tr>
      <td>
        <span
          classList={{
            "font-bold": props.rank <= 3,
            "color-amber-3": props.rank === 1,
            "color-gray-3": props.rank === 2,
            "color-orange-3": props.rank === 3,
            "font-light": props.rank > 3,
          }}
        >
          {props.rank}
        </span>
      </td>
      <td>{lang() === "en" ? props.entry[1] : props.entry[0]}</td>
      <td class="font-mono">
        <span class="font-bold text-5 mr-1">{props.entry[2].trim()}</span>
        <span class="op-80">kg</span>
      </td>
    </tr>
  );
};
