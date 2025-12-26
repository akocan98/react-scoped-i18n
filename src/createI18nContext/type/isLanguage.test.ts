import { isLanguage } from "./index";

describe(`isLanguage`, () => {
  const languages = [`en`, `es`, `sl`] as const;

  it(`returns true for supported languages`, () => {
    expect(isLanguage(`en`, languages)).toBe(true);
    expect(isLanguage(`es`, languages)).toBe(true);
    expect(isLanguage(`sl`, languages)).toBe(true);
  });

  it(`returns false for unsupported languages`, () => {
    expect(isLanguage(`fr`, languages)).toBe(false);
    expect(isLanguage(`de`, languages)).toBe(false);
    expect(isLanguage(`it`, languages)).toBe(false);
  });
});
