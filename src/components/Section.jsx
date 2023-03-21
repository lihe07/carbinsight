import { onMount, createSignal, splitProps, mergeProps } from "solid-js";

export default (_props) => {
  const props = mergeProps({ class: "", once: true }, _props);
  const [local, others] = splitProps(props, ["animOnly", "class", "once"]);

  const [enter, setEnter] = createSignal(false);
  let section;

  function onScroll() {
    if (
      window.innerHeight - section.getBoundingClientRect().top >
      window.innerHeight / 3
    ) {
      setEnter(true);
    } else {
      // Only if the section is totally out of the screen, set enter to false
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        if (local.once) return;
        setEnter(false);
      }
    }
  }

  onMount(() => {
    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 150);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <section
      ref={section}
      class={
        props.animOnly
          ? "transition-500 " + local.class
          : "p-10 max-w-300 ma transition-500 " + local.class
      }
      classList={{
        "op-0 translate-y--5": !enter(),
        "op-100 translate-y-0 ": enter(),
      }}
      {...others}
    >
      {props.children}
    </section>
  );
};
