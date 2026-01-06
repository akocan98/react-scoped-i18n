import { TranslationMap } from "../type";
import { IS_DEV } from "../../env";
import { MISSING_TRANSLATION } from "../const";

export const createCommons = <
  const Languages extends readonly string[],
  const Commons extends Record<
    string,
    TranslationMap<Languages[number], string>
  >,
>({
  commons,
  currentLanguage,
  fallbackLanguage,
}: {
  commons: Commons;
  currentLanguage: Languages[number];
  fallbackLanguage: Languages[number];
}) => {
  const result: { [K in keyof Commons]?: string } = {};

  for (const key in commons) {
    const translationMap = commons[key];

    const targetTranslation = translationMap[currentLanguage];

    if (targetTranslation) {
      result[key] = targetTranslation;

      continue;
    }

    const fallbackTranslation = translationMap[fallbackLanguage];

    if (fallbackTranslation) {
      if (IS_DEV) {
        console.warn(
          `[i18n] Missing translation for key "${key}" in current language "${currentLanguage}" in "commons". Defaulting to fallback language "${fallbackLanguage}".`,
        );
      }

      result[key] = fallbackTranslation;

      continue;
    }

    if (IS_DEV) {
      console.warn(
        `[i18n] Missing translation for key "${key}" in both current language "${currentLanguage}" and fallback language "${fallbackLanguage}" in "commons".`,
      );
    }

    result[key] = MISSING_TRANSLATION;
  }

  return result;
};
