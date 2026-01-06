/**
 * @jest-environment jsdom
 */
import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import { createI18nContext } from "./index";

test(`very basic integration test`, () => {
  const { I18nProvider, useI18n } = createI18nContext({
    languages: [`en`, `es`] as const,
    fallbackLanguage: `en`,
    commons: {
      continue: {
        en: `Continue`,
        es: `Continuar`,
      },
    },
  });

  const TestComponent = () => {
    const { t, currentLanguage, setCurrentLanguage, commons, format } =
      useI18n();

    return (
      <>
        <h1 data-testid={`current-language`}>{currentLanguage}</h1>

        <div data-testid={`test-component`}>
          {t({ en: `Hello`, es: `Hola` })}
        </div>

        <button
          data-testid={`switch-to-english-button`}
          onClick={() => {
            setCurrentLanguage(`en`);
          }}
        />

        <div data-testid={`formatted-number`}>
          {format.number(10_000.555, {
            maximumFractionDigits: 2,
          })}
        </div>

        <button data-testid={`continue-button`}>{commons.continue}</button>
      </>
    );
  };

  render(
    <I18nProvider initialLanguage={`es`}>
      <TestComponent />
    </I18nProvider>,
  );

  expect(screen.getByTestId(`current-language`).textContent).toBe(`es`);

  expect(screen.getByTestId(`test-component`).textContent).toBe(`Hola`);

  expect(screen.getByTestId(`continue-button`).textContent).toBe(`Continuar`);

  expect(screen.getByTestId(`formatted-number`).textContent).toBe(`10.000,56`);

  act(() => {
    screen.getByTestId(`switch-to-english-button`).click();
  });

  expect(screen.getByTestId(`current-language`).textContent).toBe(`en`);

  expect(screen.getByTestId(`test-component`).textContent).toBe(`Hello`);

  expect(screen.getByTestId(`continue-button`).textContent).toBe(`Continue`);

  expect(screen.getByTestId(`formatted-number`).textContent).toBe(`10,000.56`);
});
