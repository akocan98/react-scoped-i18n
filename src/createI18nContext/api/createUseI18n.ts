import { I18nContextType, TranslationMap } from "../type";
import { Context, useContext, useMemo } from "react";
import { createT } from "./createT";
import { createTPlural } from "./createTPlural";
import { createFormat } from "./createFormat";
import { createCommons } from "./createCommons";

export const createUseI18n = <
  const Languages extends readonly string[],
  const Commons extends Record<
    string,
    TranslationMap<Languages[number], string>
  >,
>({
  I18nContext,
  languages,
  fallbackLanguage,
  commons,
}: {
  I18nContext: Context<I18nContextType<Languages[number]> | null>;
  languages: Readonly<Languages>;
  fallbackLanguage: Languages[number];
  commons?: Commons;
}) => {
  type Language = Languages[number];

  /**
   * Hook to access i18n functions and current language.
   */
  return () => {
    const context = useContext<I18nContextType<Language> | null>(I18nContext);

    if (!context) {
      throw new Error(`useI18n must be used inside <Provider>`);
    }

    const { currentLanguage, setCurrentLanguage } = context;

    const t = useMemo(() => {
      return createT({
        currentLanguage,
        languages,
        fallbackLanguage: fallbackLanguage,
      });
    }, [currentLanguage]);

    const tPlural = useMemo(() => {
      return createTPlural({
        currentLanguage,
        fallbackLanguage: fallbackLanguage,
      });
    }, [currentLanguage]);

    const format = useMemo(() => {
      return createFormat({ currentLanguage });
    }, [currentLanguage]);

    const _commons = useMemo(() => {
      return createCommons({
        commons: commons || ({} as Commons),
        currentLanguage,
        fallbackLanguage,
      });
    }, [currentLanguage]);

    return {
      t,
      tPlural,
      setCurrentLanguage,
      currentLanguage,
      format,
      commons: _commons,
    };
  };
};
