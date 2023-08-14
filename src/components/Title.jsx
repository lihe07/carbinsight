/**
 * Title component
 * @param {string} props.title Title
 * @param {string} props.description Description
 * @param {boolean} props.right Align to right
 */
export default (props) => {
  return (
    <div
      class="color-white w-100% flex"
      classList={{ "justify-end text-right": props.right }}
    >
      <div class="w-full md:max-w-50%">
        <h1 class="text-9 font-bold">{props.title}</h1>
        <p class="leading-relaxed op-80 text-6">{props.description}</p>
      </div>
    </div>
  );
};
