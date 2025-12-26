import { PluralTranslationMap } from "../type";
import { getPluralTranslation } from "../util/getPluralTranslation";

export const createTPlural = <const Languages extends readonly string[]>({
  currentLanguage,
  languages,
  fallbackLanguage,
}: {
  currentLanguage: Languages[number];
  languages: Readonly<Languages>;
  fallbackLanguage: Languages[number];
}) => {
  /**
   * Pluralization helper function.
   * Selects the appropriate translation based on the count provided.
   */
  return (
    count: number,
    translations: PluralTranslationMap<Languages[number]>,
  ) => {
    return getPluralTranslation({
      currentLanguage,
      languages,
      fallbackLanguage: fallbackLanguage,
      count,
      translations,
    });
  };
};
