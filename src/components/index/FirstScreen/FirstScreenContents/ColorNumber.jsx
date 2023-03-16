export default (props) => {
  return (
    <span
      class={
        "text-10 font-bold m-x-1 bg-gradient-to-r bg-clip-text text-transparent " +
        props.class
      }
    >
      {props.children}
    </span>
  );
};
