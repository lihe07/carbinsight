export default (props) => {
  return (
    <div class="text-center color-white">
      <h1 class="m0 text-10 tracking-wide md:text-15">{props.title}</h1>
      <p class="leading-relaxed op-90 text-6 max-w-70% ma mt-5">
        {props.description}
      </p>
    </div>
  );
};
