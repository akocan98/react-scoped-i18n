import { PluralTranslationMap } from "../type";
import { getPluralTranslation } from "../util/getPluralTranslation";

export const createTPlural = <const Languages extends readonly string[]>({
  currentLanguage,
  fallbackLanguage,
}: {
  currentLanguage: Languages[number];
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
      fallbackLanguage: fallbackLanguage,
      count,
      translations,
    });
  };
};
