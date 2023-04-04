import Switcher from "~/components/Switcher";

export default () => {
  return (
    <div class="pt-30 color-white max-w-300 ma px-10">
      <h2>Test Components:</h2>
      <Switcher options={["Option 1", "Option 2"]}></Switcher>

      <div class="h-20"></div>
    </div>
  );
};
