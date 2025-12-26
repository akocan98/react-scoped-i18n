import { getPluralTranslation } from "./getPluralTranslation";
import { MISSING_TRANSLATION } from "../const";

describe(`getPluralTranslation`, () => {
  const languages = [`en`, `es`] as const;

  const fallbackLanguage = `en`;

  const translations = {
    en: {
      negative: `You have a negative count.`,
      zero: `You have no items.`,
      one: `You have one item.`,
      two: `You have two items.`,
      many: `You have many items.`,
      42: `You have the perfect count of items!`,
    },
    es: {
      negative: `Tienes un conteo negativo.`,
      zero: `No tienes artículos.`,
      one: `Tienes un artículo.`,
      two: `Tienes dos artículos.`,
      many: `Tienes muchos artículos.`,
    },
  };

  it("Error: Translations object is undefined or null", () => {
    expect(() =>
      getPluralTranslation({
        currentLanguage: `es`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: -5,
        // @ts-expect-error testing undefined translations
        translations: undefined,
      }),
    ).toThrow(`[i18n] Translations object is undefined or null`);
  });

  it(`returns the correct translation for negative count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `es`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: -5,
        translations,
      }),
    ).toBe(`Tienes un conteo negativo.`);
  });

  it(`returns the correct translation for zero count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `en`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 0,
        translations,
      }),
    ).toBe(`You have no items.`);
  });

  it(`returns the correct translation for one count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `es`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 1,
        translations,
      }),
    ).toBe(`Tienes un artículo.`);
  });

  it(`returns the correct translation for two count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `en`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 2,
        translations,
      }),
    ).toBe(`You have two items.`);
  });

  it(`returns the correct translation for many count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `es`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 10,
        translations,
      }),
    ).toBe(`Tienes muchos artículos.`);
  });

  it(`returns the correct translation for exact match count`, () => {
    expect(
      getPluralTranslation({
        currentLanguage: `en`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 42,
        translations,
      }),
    ).toBe(`You have the perfect count of items!`);
  });

  it(`falls back to default language if translation is missing for current language`, () => {
    const incompleteTranslations = {
      en: {
        one: `You have one item.`,
      },
    };

    expect(
      getPluralTranslation({
        currentLanguage: `es`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 1,
        // @ts-expect-error incomplete translation for testing
        translations: incompleteTranslations,
      }),
    ).toBe(`You have one item.`);
  });

  it(`returns ${MISSING_TRANSLATION} if translation is missing for both current and default languages`, () => {
    const incompleteTranslations = {
      de: {
        one: `Tienes un artículo.`,
      },
    };

    expect(
      getPluralTranslation({
        currentLanguage: `en`,
        languages,
        fallbackLanguage: fallbackLanguage,
        count: 1,
        // @ts-expect-error incomplete translation for testing
        translations: incompleteTranslations,
      }),
    ).toBe(MISSING_TRANSLATION);
  });

  it("Warn: No pluralization match found for count", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    const incompleteTranslations = {
      en: {
        one: `You have one item.`,
      },
    };

    getPluralTranslation({
      currentLanguage: `en`,
      languages,
      fallbackLanguage: fallbackLanguage,
      count: 5,
      // @ts-expect-error incomplete translation for testing
      translations: incompleteTranslations,
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `[i18n] No pluralization match found for count "5". Please provide appropriate pluralization translations.`,
    );

    consoleWarnSpy.mockRestore();
  });
});
