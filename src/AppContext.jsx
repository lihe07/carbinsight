import {
  createI18nContext,
  I18nContext,
  useI18n,
} from "@solid-primitives/i18n";
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";

import lang from "./lang";

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
  const i18n = createI18nContext(lang, defaultLang());

  const [dark, setDark] = createSignal(true);

  const value = {
    lang: i18n[1].locale,
    dark,
    switchLang() {
      const lang = i18n[1].locale() === "en" ? "zh" : "en";
      localStorage.setItem("lang", lang);
      i18n[1].locale(lang);
      // setLocale(lang);
    },
    switchTheme() {
      const theme = dark() ? "light" : "dark";
      localStorage.setItem("theme", theme);
      setDark(!dark());
    },
  };

  onMount(() => {
    createEffect(() => {
      document.body.classList.toggle("dark", dark());
      document.body.classList.toggle("light", !dark());
    });
  });

  return (
    <AppContext.Provider value={value}>
      <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
