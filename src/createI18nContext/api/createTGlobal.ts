import { isLanguage, TranslationMap } from "../type";
import { getTranslation } from "../util/getTranslation";
import { IS_DEV } from "../../env";

export const createTGlobal = <const Language extends string>({
  currentLanguage,
  languages,
  fallbackLanguage,
}: {
  currentLanguage: { current: Language };
  languages: readonly Language[];
  fallbackLanguage: Language;
}) => {
  /**
   * Module-scoped translation function, to be used outside React components.
   * Do not use inside React components, use `useI18n` hook instead.
   */
  return (translation: TranslationMap<Language>) => {
    if (!isLanguage(currentLanguage.current, languages)) {
      throw new Error(
        `tGlobal cannot be invoked before <I18nProvider> is mounted`,
      );
    }

    const isValidLanguage = isLanguage(currentLanguage.current, languages);

    if (!isValidLanguage) {
      throw new Error(`Invalid current language "${currentLanguage}"`);
    }

    if (IS_DEV) {
      console.info(
        `[i18n] Friendly reminder: Make sure you are not using "tGlobal" inside React components. Use "useI18n" hook instead. `,
      );
    }

    return getTranslation({
      translation: translation,
      language: currentLanguage.current,
      languages,
      fallbackLanguage: fallbackLanguage,
    });
  };
};
