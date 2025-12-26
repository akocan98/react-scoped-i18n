import { createT } from "./createT";

describe("createT", () => {
  const t = createT({
    currentLanguage: "fr",
    fallbackLanguage: "en",
    languages: ["en", "es", "fr"] as const,
  });

  it("t helper returns a translation", () => {
    const translation = {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
    };

    expect(t(translation)).toBe("Bonjour");
  });
});
