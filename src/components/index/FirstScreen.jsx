import { createEffect, createSignal, on, Show, Suspense } from "solid-js";

import logo from "../../assets/images/logo.svg";

import FirstScreenBlock from "./FirstScreen/FirstScreenBlock";
import FirstScreenScroll from "./FirstScreen/FirstScreenScroll";

const duration = 5; // Play for 5sec

const videoList = [
  "https://files-cos.banxiaoer.net/p/731233309742329856/f/comm/file/843884944205312000.webm",
  "https://files-cos.banxiaoer.net/p/731233309742329856/f/comm/file/843885022190014466.webm",
  "https://files-cos.banxiaoer.net/p/731233309742329856/f/comm/file/843885022190014467.webm",
  "https://files-cos.banxiaoer.net/p/731233309742329856/f/comm/file/843885022190014468.webm",
];

export default () => {
  const [current, setCurrent] = createSignal(0);
  const [loading, setLoading] = createSignal(true);
  const [isPlaying, setIsPlaying] = createSignal(false);
  let video;
  const [isFirst, setIsFirst] = createSignal(true);

  function next() {
    video.pause();
    setIsPlaying(false);
    setCurrent(current() + 1 > 3 ? 0 : current() + 1);
    console.log("next", current());
  }

  const videoCache = {};
  const [currentBlob, setCurrentBlob] = createSignal(null);

  async function updateCurrentBlob() {
    const url = videoList[current()];
    if (videoCache[url]) {
      setCurrentBlob(videoCache[url]);
      return;
    }

    // Load to blob

    const response = await fetch(url, {
      mode: "cors",
      cache: "force-cache",
    });
    const blob = await response.blob();
    const video = URL.createObjectURL(blob);
    videoCache[url] = video;

    setCurrentBlob(video);
  }

  createEffect(on(current, updateCurrentBlob));

  return (
    <section class="w-full h-screen relative color-white">
      {/* Loading hover */}
      <div
        class="dark:bg-true-gray-9 light:bg-teal-9 w-full h-full absolute z-3 transition-opacity-300 pointer-events-none flex justify-center items-center"
        classList={{
          "op-100": loading(),
          "op-0": !loading(),
          "fixed !z-10": isFirst(),
        }}
      >
        <div
          class="flex items-center justify-center transition-opacity-300 dark:bg-true-gray-8 light:bg-teal-8 p8 rounded-xl op-0"
          classList={{ "!op-100": isFirst() }}
        >
          <img class="w-20 h-20 mr-5 object-contain" src={logo} alt="logo" />
          <div>
            <h2 class="m-y-0 m-b-3">Carbinsight</h2>
            <p class="op-80 m-y-0">Site is loading...</p>
          </div>
        </div>
      </div>
      <Suspense>
        <video
          ref={video}
          src={currentBlob()}
          disablePictureInPicture="true"
          muted="true"
          autoPlay="true"
          volume="0"
          onCanPlay={() => {
            video.muted = true;
            const promise = video.play();
            if (isFirst()) {
              setLoading(false);
              setIsFirst(false);
            } else setTimeout(() => setLoading(false), 300);

            setIsPlaying(true);

            if (promise !== undefined) {
              promise.catch((e) => {
                console.log("Fallback to autoplay", e);
              });
            }

            setTimeout(() => setLoading(true), duration * 1000 - 350);
            setTimeout(next, duration * 1000);
          }}
          // onTimeUpdate={() => {
          //   if (duration - video.currentTime <= 0.35) {
          //     // setLoading(true);
          //   }
          //   if (duration - video.currentTime <= 0.1) {
          //   }
          // }}
          class="w-full h-full object-cover"
        />
      </Suspense>
      <Show when={isPlaying()}>
        <FirstScreenBlock
          loading={loading}
          current={current}
          duration={duration}
        />
      </Show>

      <FirstScreenScroll />
    </section>
  );
};
