import { createFormat } from "./createFormat";

describe(`createFormat`, () => {
  const numberFormatOptions = {
    minimumFractionDigits: 4,
  };

  const format = createFormat({
    currentLanguage: `en-US`,
  });

  it(`number formatter returns a formatted value`, () => {
    const formattedNumber = format.number(1234567.89);

    expect(formattedNumber).toBe(`1,234,567.89`);
  });

  it(`number formatter returns a formatted value with options (with caching enabled)`, () => {
    const formattedNumber1 = format.number(1234567.89, numberFormatOptions);
    const formattedNumber2 = format.number(1234567.89, numberFormatOptions);

    expect(formattedNumber1).toBe(`1,234,567.8900`);
    expect(formattedNumber2).toBe(`1,234,567.8900`);
  });

  it(`date formatter returns a formatted value`, () => {
    const date = new Date(`2024-01-01T12:00:00Z`);

    const formattedDate = format.date(date);

    expect(formattedDate).toBe(`1/1/2024`);
  });

  it(`date formatter returns a formatted value with options`, () => {
    const date = new Date(`1999-01-01T12:00:00Z`);

    const formattedDate = format.date(date, {
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });

    expect(formattedDate).toBe(`January 1, 1999`);
  });

  it(`time formatter returns a formatted value`, () => {
    const date = new Date(`1912-06-23T02:15:00`);

    const formattedTime = format.time(date);

    expect(formattedTime).toBe(`2:15:00 AM`);
  });

  it(`time formatter returns a formatted value with options`, () => {
    const date = new Date(`2000-12-31T23:45:30`);

    const formattedTime = format.time(date, {
      hour12: false,
      hour: `2-digit`,
      minute: `2-digit`,
    });

    expect(formattedTime).toBe(`23:45`);
  });

  it(`currency formatter returns a formatted value`, () => {
    const formattedCurrency = format.currency(1234.567, `USD`);

    expect(formattedCurrency).toBe(`$1,234.57`);
  });

  it(`currency formatter returns a formatted value with options`, () => {
    const formattedCurrency = format.currency(1234.567, `EUR`, {
      maximumFractionDigits: 1,
    });

    expect(formattedCurrency).toBe(`€1,234.6`);
  });

  it(`percentage formatter returns a formatted value`, () => {
    const formattedPercentage1 = format.percentage(0.1234);
    const formattedPercentage2 = format.percentage(0.1267);

    expect(formattedPercentage1).toBe(`12%`);
    expect(formattedPercentage2).toBe(`13%`);
  });

  it(`percentage formatter returns a formatted value with options`, () => {
    const formattedPercentage = format.percentage(0.1234, {
      minimumFractionDigits: 2,
    });

    expect(formattedPercentage).toBe(`12.34%`);
  });

  it(`Error: Number options are not cached`, () => {
    const warnSpy = jest.spyOn(console, `warn`);

    const formattedNumber1 = format.number(1234567.89, {
      minimumFractionDigits: 5,
    });
    const formattedNumber2 = format.number(1234567.89, {
      minimumFractionDigits: 5,
    });

    expect(formattedNumber1).toBe(`1,234,567.89000`);
    expect(formattedNumber2).toBe(`1,234,567.89000`);

    expect(warnSpy).toHaveBeenCalledWith(
      `[i18n] ⚠️ Formatting 1234567.89 with options {"minimumFractionDigits":5} is not cached, but it should be. This is because you are recreating the options object on every render. To fix this, memoize the options object or define it outside of the component.`,
    );
  });

  it(`Error: Date options are not cached`, () => {
    const warnSpy = jest.spyOn(console, `warn`);

    const date = new Date(`2026-02-03T12:00:00Z`);

    const formattedDate1 = format.date(date, {
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });
    const formattedDate2 = format.date(date, {
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });

    expect(formattedDate1).toBe(`February 3, 2026`);
    expect(formattedDate2).toBe(`February 3, 2026`);

    expect(warnSpy).toHaveBeenCalledWith(
      `[i18n] ⚠️ Formatting Tue Feb 03 2026 13:00:00 GMT+0100 (Central European Standard Time) with options {"year":"numeric","month":"long","day":"numeric"} is not cached, but it should be. This is because you are recreating the options object on every render. To fix this, memoize the options object or define it outside of the component.`,
    );
  });
});
