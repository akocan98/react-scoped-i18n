import { createUseI18n } from "./createUseI18n";
import { Context } from "react";
import { I18nContextType } from "../type";

describe(`createUseI18n`, () => {
  const mockedI18nContext = {} as Context<I18nContextType<`en` | `es`> | null>;

  it(`prints console.error if used outside of a provider`, () => {
    const useI18n = createUseI18n({
      languages: [`en`, `es`],
      fallbackLanguage: `en`,
      commons: undefined,
      I18nContext: mockedI18nContext,
    });

    // expect console.error to be called
    const consoleErrorSpy = jest
      .spyOn(console, `error`)
      .mockImplementation(() => {});

    try {
      useI18n();
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (e) {
      expect(consoleErrorSpy).toHaveBeenCalled(); // eslint-disable-line unused-imports/no-unused-vars
    }

    consoleErrorSpy.mockRestore();
  });

  it(`can be initialised with only required parameters`, () => {
    expect(() =>
      createUseI18n({
        languages: [`en`, `es`],
        fallbackLanguage: `en`,
        commons: undefined,
        I18nContext: mockedI18nContext,
      }),
    ).toBeDefined();
  });

  it(`should be initialised with all parameters`, () => {
    expect(() =>
      createUseI18n({
        languages: [`en`, `es`],
        fallbackLanguage: `es`,
        commons: {
          accept: {
            en: `Accept`,
            es: `Aceptar`,
          },
        },
        I18nContext: mockedI18nContext,
      }),
    ).toBeDefined();
  });
});
