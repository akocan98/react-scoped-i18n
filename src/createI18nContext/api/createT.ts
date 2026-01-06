import { TranslationMap, TranslationValue } from "../type";
import { getTranslation } from "../util/getTranslation";
import { ReactNode } from "react";

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

  return <Value extends TranslationValue = ReactNode>(
    translation: TranslationMap<Language, Value>,
  ): Value => {
    return getTranslation({
      translation,
      language: currentLanguage,
      languages,
      fallbackLanguage,
    });
  };
};
