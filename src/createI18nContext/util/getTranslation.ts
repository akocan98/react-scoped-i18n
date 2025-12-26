import { ReactNode } from "react";
import { TranslationMap } from "../type";
import { MISSING_TRANSLATION } from "../const";
import { IS_DEV } from "../../env";

export const getTranslation = <const Language extends string>({
  translation,
  language,
  languages,
  fallbackLanguage,
}: {
  translation: TranslationMap<Language>;
  language: Language;
  languages: readonly Language[];
  fallbackLanguage: Language;
}): ReactNode => {
  if (!translation) {
    throw new Error(`[i18n] Translation object is undefined or null`);
  }

  if (IS_DEV) {
    const missing = languages.filter((l) => !(l in translation));

    if (missing.length > 0) {
      console.warn(
        `[i18n] Missing languages: ${missing.join(`, `)} in ${Object.keys(translation)}`,
      );
    }
  }

  const targetTranslation = translation[language];

  if (targetTranslation) {
    return targetTranslation;
  }

  const fallbackTranslation = translation[fallbackLanguage];

  if (fallbackTranslation) {
    if (IS_DEV) {
      console.warn(
        `[i18n] Missing translation for language "${language}". Falling back to default language "${fallbackLanguage}"`,
      );
    }

    return fallbackTranslation;
  }

  if (IS_DEV) {
    console.warn(
      `[i18n] Missing translation for language "${language}" and for default language "${fallbackLanguage}"`,
    );
  }

  return MISSING_TRANSLATION;
};
