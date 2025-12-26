import { createTGlobal } from "./createTGlobal";

describe("createTGlobal", () => {
  const fakeCurrentLanguageRef = { current: "de" };

  const tGlobal = createTGlobal({
    currentLanguage: fakeCurrentLanguageRef,
    fallbackLanguage: "en",
    languages: ["en", "es", "fr", "de"] as const,
  });

  it("tGlobal helper returns a translation", () => {
    const translation = {
      en: "Goodbye",
      es: "Adiós",
      fr: "Au revoir",
      de: "Auf Wiedersehen",
    };

    expect(tGlobal(translation)).toBe("Auf Wiedersehen");
  });
});
