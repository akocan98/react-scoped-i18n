import React, { Context, ReactNode, useEffect, useState } from "react";
import { I18nContextType } from "../type";

export const createI18nProvider = <const Language extends string>({
  I18nContext,
  moduleScopedCurrentLanguageRef,
  fallbackLanguage,
}: {
  I18nContext: Context<I18nContextType<Language> | null>;
  moduleScopedCurrentLanguageRef: { current: Language };
  fallbackLanguage: Language;
}) => {
  const I18nProvider = ({
    children,
    initialLanguage,
  }: {
    children: ReactNode;
    initialLanguage: Language;
  }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(
      initialLanguage || fallbackLanguage,
    );

    useEffect(() => {
      // Used only for tGlobal function outside React components.
      // Do not rely on this!
      moduleScopedCurrentLanguageRef.current = currentLanguage;
    }, [currentLanguage]);

    return (
      <I18nContext.Provider
        value={{
          currentLanguage,
          fallbackLanguage,
          setCurrentLanguage,
        }}
      >
        {children}
      </I18nContext.Provider>
    );
  };

  I18nProvider.displayName = `I18nProvider`;

  return I18nProvider;
};
