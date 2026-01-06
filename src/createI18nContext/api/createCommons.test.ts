import { createCommons } from "./createCommons";

describe(`createCommons`, () => {
  it(`returns the correct common translations based on current language and fallback`, () => {
    const result = createCommons({
      commons: {
        welcome: {
          en: `Welcome`,
          es: `Bienvenido`,
          fr: `Bienvenue`,
        },
        goodbye: {
          en: `Goodbye`,
          es: `Adiós`,
        },
      },
      currentLanguage: `fr`,
      fallbackLanguage: `en`,
    });

    expect(result).toEqual({
      welcome: `Bienvenue`,
      goodbye: `Goodbye`,
    });
  });
});
