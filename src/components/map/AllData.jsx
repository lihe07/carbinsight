import "@/table.css";
import Section from "../Section";
import Title from "../Title";
import { For } from "solid-js";

export default () => {
  return (
    <Section>
      <Title title="全部数据"></Title>
      <table class="color-white w-full">
        <thead>
          <tr>
            <th>地区</th>
            <th>数据源</th>
            <th>时间</th>
            <th>总量</th>
            <th>人均</th>
            <th>按GDP</th>
          </tr>
        </thead>

        <tbody>
          <For each={[...Array(10).keys()]}>
            {(i) => (
              <tr>
                <td>{i}</td>
                <td>{Math.random()}</td>
                <td>{Math.random()}</td>
                <td>{Math.random()}</td>
                <td>{Math.random()}</td>
                <td>{Math.random()}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Section>
  );
};
