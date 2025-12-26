import { getTranslation } from "./getTranslation";
import { MISSING_TRANSLATION } from "../const";

describe(`getTranslation`, () => {
  const languages = [`en`, `es`, `sl`] as const;

  const translation = {
    en: `Hello!`,
    es: `¡Hola!`,
    sl: `Živjo!`,
  };

  const fallbackLanguage = `es`;

  it(`returns the correct translation for the specified language`, () => {
    expect(
      getTranslation({
        translation,
        language: `sl`,
        languages,
        fallbackLanguage: fallbackLanguage,
      }),
    ).toBe(`Živjo!`);
  });

  it(`falls back to the default language if the specified language translation is missing`, () => {
    expect(
      // @ts-expect-error testing missing language
      getTranslation({
        translation,
        languages,
        fallbackLanguage: fallbackLanguage,
      }),
    ).toBe(`¡Hola!`);
  });

  it(`falls back to the default language if the specified language is not supported`, () => {
    expect(
      getTranslation({
        // @ts-expect-error unsupported language
        translation,
        language: `fr`,
        languages,
        fallbackLanguage: fallbackLanguage,
      }),
    ).toBe(`¡Hola!`);
  });

  it(`returns ${MISSING_TRANSLATION} if the translation is missing for both the specified and default languages`, () => {
    const incompleteTranslation = {
      en: `Hello!`,
    };

    expect(
      getTranslation({
        // @ts-expect-error incomplete translation
        translation: incompleteTranslation,
        languages,
        fallbackLanguage: fallbackLanguage,
        language: `de`,
      }),
    ).toBe(MISSING_TRANSLATION);
  });

  it("Error: Translation object is undefined or null", () => {
    expect(() => {
      getTranslation({
        // @ts-expect-error testing undefined translation
        translation: undefined,
        languages,
        fallbackLanguage: fallbackLanguage,
        language: `es`,
      });
    }).toThrow(`[i18n] Translation object is undefined or null`);
  });

  it("Warn: Missing languages", () => {
    const incompleteLanguages = [`en`, `de`] as const;

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    getTranslation({
      // @ts-expect-error incomplete languages
      translation,
      language: `sl`,
      languages: incompleteLanguages,
      fallbackLanguage: fallbackLanguage,
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `[i18n] Missing languages: de in en,es,sl`,
    );
  });

  it("Warn: Missing translation for language, falling back to default", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    getTranslation({
      // @ts-expect-error testing translation for language
      translation,
      language: `pt`,
      languages,
      fallbackLanguage: fallbackLanguage,
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `[i18n] Missing translation for language "pt". Falling back to default language "es"`,
    );
  });

  it("Warn: Missing translation for language and for default language", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    getTranslation({
      // @ts-expect-error testing translation for language and default language
      translation,
      language: `ru`,
      languages,
      fallbackLanguage: `nl`,
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `[i18n] Missing translation for language "ru" and for default language "nl"`,
    );
  });
});
