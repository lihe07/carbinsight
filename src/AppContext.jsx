import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";

import dict from "./lang";

function deepReadObject(obj, path, defaultValue) {
  const value = path
    .trim()
    .split(".")
    .reduce((a, b) => (a ? a[b] : undefined), obj);
  return value !== undefined ? value : defaultValue;
}

function defaultLang() {
  if (typeof window === "undefined") {
    return "en";
  }

  let language = localStorage.getItem("lang");
  if (["zh", "en"].includes(language)) {
    return language;
  }

  language = navigator.language;
  if (language === "zh-CN" || language === "zh-TW") {
    return "zh";
  }
  return "en";
}

function defaultTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  let theme = localStorage.getItem("theme");
  if (["light", "dark"].includes(theme)) {
    return theme;
  }

  // Light or Dark
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [dark, setDark] = createSignal(defaultTheme() === "dark");
  const [lang, setLang] = createSignal(defaultLang());

  const value = {
    lang,
    dark,
    t(key) {
      return deepReadObject(dict[lang()], key, key);
    },
    switchLang() {
      value.drySwitchLang();
      localStorage.setItem("lang", lang());
    },
    drySwitchLang() {
      setLang(lang() === "en" ? "zh" : "en");
    },
    switchTheme() {
      const theme = dark() ? "light" : "dark";
      localStorage.setItem("theme", theme);
      setDark(!dark());
    },
  };

  onMount(() => {
    setLang(undefined);
    setDark(undefined);

    let i = 0;
    const t = () => {
      setLang(undefined);
      setLang(defaultLang());
      setDark(undefined);
      setDark(defaultTheme() === "dark");
      if (i < 5) {
        i++;
        setTimeout(t, 100);
      }
    };
    t();

    createEffect(() => {
      document.body.classList.toggle("dark", dark());
      document.body.classList.toggle("light", !dark());
    });
  });

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
