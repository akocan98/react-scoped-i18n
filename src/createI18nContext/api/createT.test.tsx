import React, { ReactNode } from "react";
import { createT } from "./createT";

describe(`createT`, () => {
  const t = createT({
    currentLanguage: `fr`,
    fallbackLanguage: `en`,
    languages: [`en`, `es`, `fr`] as const,
  });

  it(`t helper returns a translation`, () => {
    expect(
      t({
        en: `Hello`,
        es: `Hola`,
        fr: `Bonjour`,
      }),
    ).toBe(`Bonjour`);

    expect(
      t<ReactNode>({
        en: <></>,
        es: `Hola`,
        fr: `Bonjour`,
      }),
    ).toBe(`Bonjour`);
  });
});
