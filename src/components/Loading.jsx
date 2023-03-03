export default (props) => {
  return (
    <div class="relative w-full h-full">
      <div class="w-full h-full">
        <h1>Loading</h1>
      </div>
      <div class="w-full h-full absolute top-0 left-0">{props.children}</div>
    </div>
  );
};
