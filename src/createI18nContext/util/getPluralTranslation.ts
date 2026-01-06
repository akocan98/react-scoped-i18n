import { PluralTranslationMap } from "../type";
import { MISSING_TRANSLATION } from "../const";
import { IS_DEV } from "../../env";

export const getPluralTranslation = <const Language extends string>({
  currentLanguage,
  fallbackLanguage,
  count,
  translations,
}: {
  currentLanguage: Language;
  fallbackLanguage: Language;
  count: number;
  translations: PluralTranslationMap<Language[][number]>;
}) => {
  if (!translations) {
    throw new Error(`[i18n] Translations object is undefined or null`);
  }

  const targetTranslation = translations[currentLanguage];

  const defaultTranslation = translations[fallbackLanguage];

  if (targetTranslation == undefined && defaultTranslation === undefined) {
    if (IS_DEV) {
      console.warn(
        `[i18n] Missing plural translation for language "${currentLanguage}" and for default language "${fallbackLanguage}"`,
      );
    }

    return MISSING_TRANSLATION;
  }

  if (targetTranslation === undefined) {
    if (IS_DEV) {
      console.warn(
        `[i18n] Missing plural translation for language "${currentLanguage}". Falling back to default language "${fallbackLanguage}"`,
      );
    }
  }

  const translation = targetTranslation || defaultTranslation;

  const exactMatch = translation[count];

  if (exactMatch) {
    return exactMatch;
  }

  if (count < 0 && translation.negative) {
    return translation.negative;
  }

  if (count === 0 && translation.zero) {
    return translation.zero;
  }

  if (count === 1 && translation.one) {
    return translation.one;
  }

  if (count === 2 && translation.two) {
    return translation.two;
  }

  if (translation.many) {
    return translation.many;
  }

  if (IS_DEV) {
    console.warn(
      `[i18n] No pluralization match found for count "${count}". Please provide appropriate pluralization translations.`,
    );
  }

  return MISSING_TRANSLATION;
};
