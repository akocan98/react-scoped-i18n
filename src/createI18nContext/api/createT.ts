import { TranslationMap } from "../type";
import { getTranslation } from "../util/getTranslation";

export const createT = <const Languages extends readonly string[]>({
  currentLanguage,
  fallbackLanguage,
  languages,
}: {
  currentLanguage: Languages[number];
  fallbackLanguage: Languages[number];
  languages: Readonly<Languages>;
}) => {
  type Language = Languages[number];

  /**
   * Function to get the translation for the current language.
   */
  return (translation: TranslationMap<Language>) => {
    return getTranslation({
      translation,
      language: currentLanguage,
      fallbackLanguage: fallbackLanguage,
      languages,
    });
  };
};
