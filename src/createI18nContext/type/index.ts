import { Dispatch, ReactNode, SetStateAction } from "react";

export type TranslationMap<Lang extends string> = Record<Lang, ReactNode>;

export type Languages = readonly string[];

export type Language = Languages[number];

export const isLanguage = (
  lang: string,
  languages: Languages,
): lang is Language => {
  return languages.includes(lang as Language);
};

export type I18nContextType<Lang extends string> = {
  currentLanguage: Lang;
  fallbackLanguage: Lang;
  setCurrentLanguage: Dispatch<SetStateAction<Lang>>;
};

export type PluralTranslation<Lang extends string> = {
  negative?: ReactNode;
  zero?: ReactNode;
  one?: ReactNode;
  two?: ReactNode;
  many?: ReactNode;
  [key: number]: ReactNode;
};

export type PluralTranslationMap<Lang extends string> = Record<
  Lang,
  PluralTranslation<Lang>
>;
