import { useBeforeLeave } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { useIsRouting } from "solid-start";

export default function Transition(props) {
  const [show, setShow] = createSignal(false);

  const isRouting = useIsRouting();
  createEffect(() => {
    if (!isRouting()) {
      setTimeout(() => setShow(true), 150);
    }
  });

  useBeforeLeave((e) => {
    setShow(false);
    e.preventDefault();

    setTimeout(() => {
      e.retry(true);
    }, 150);
  });

  return (
    <div class="op-0 transition-opacity-150" classList={{ "!op-100": show() }}>
      {props.children}
    </div>
  );
}
