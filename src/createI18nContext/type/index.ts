import { Dispatch, ReactNode, SetStateAction } from "react";

export type TranslationValue = ReactNode | string | number;

export type TranslationMap<
  Language extends string,
  Value = TranslationValue,
> = Record<Language, Value>;

export type Languages = readonly string[];

export const isLanguage = (
  language: string,
  languages: Languages,
): language is Languages[number] => {
  return languages.includes(language as Languages[number]);
};

export type I18nContextType<Language extends string> = {
  currentLanguage: Language;
  fallbackLanguage: Language;
  setCurrentLanguage: Dispatch<SetStateAction<Language>>;
};

export type PluralTranslation = {
  negative?: ReactNode;
  zero?: ReactNode;
  one?: ReactNode;
  two?: ReactNode;
  many: ReactNode;
  [key: number]: ReactNode;
};

export type PluralTranslationMap<Language extends string> = Record<
  Language,
  PluralTranslation
>;
