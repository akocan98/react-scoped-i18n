import { I18nContextType, TranslationMap } from "./type";
import { createContext } from "react";
import { createI18nProvider } from "./provider/createI18nProvider";
import { createUseI18n } from "./api/createUseI18n";
import { createTGlobal } from "./api/createTGlobal";
import { IS_DEV } from "../env";

export function createI18nContext<
  Languages extends readonly string[],
  Commons extends Record<string, TranslationMap<Languages[number], string>>,
>({
  languages,
  fallbackLanguage,
  commons,
}: {
  languages: Readonly<Languages>;
  fallbackLanguage: Languages[number];
  commons?: Readonly<Commons>;
}) {
  type Language = Languages[number];

  if (IS_DEV) {
    if (commons) {
      Object.freeze(commons);
    }

    Object.freeze(languages);
  }

  const moduleScopedCurrentLanguageRef =
    /**
     * Module-scoped variable to hold the current language for tGlobal function.
     * This is updated by the I18nProvider component.
     * Don't rely on this
     */
    { current: fallbackLanguage };

  if (!fallbackLanguage || !languages.includes(fallbackLanguage)) {
    throw new Error(
      `Default language "${fallbackLanguage}" must be one of the supported languages: [${languages.join(
        `, `,
      )}]`,
    );
  }

  const I18nContext = createContext<I18nContextType<Language> | null>(null);

  I18nContext.displayName = `I18nContext`;

  const I18nProvider = createI18nProvider({
    I18nContext,
    moduleScopedCurrentLanguageRef,
    fallbackLanguage,
  });

  const useI18n = createUseI18n({
    I18nContext,
    languages,
    fallbackLanguage,
    commons,
  });

  const tGlobal = createTGlobal({
    languages,
    currentLanguage: moduleScopedCurrentLanguageRef,
    fallbackLanguage,
  });

  return { I18nProvider, useI18n, tGlobal };
}
