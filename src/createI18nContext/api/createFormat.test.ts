import { createFormat } from "./createFormat";

describe(`createFormat`, () => {
  const format = createFormat({
    currentLanguage: `en-US`,
  });

  it(`number formatter returns a formatted value`, () => {
    const formattedNumber = format.number(1234567.89);

    expect(formattedNumber).toBe(`1,234,567.89`);
  });

  it(`number formatter returns a formatted value with options`, () => {
    const formattedNumber = format.number(0.1234, {
      style: `percent`,
      minimumFractionDigits: 2,
    });

    expect(formattedNumber).toBe(`12.34%`);
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
    const formattedPercentage = format.percentage(0.1234);

    expect(formattedPercentage).toBe(`12%`);
  });

  it(`percentage formatter returns a formatted value `, () => {
    const formattedPercentage = format.percentage(0.1234);

    expect(formattedPercentage).toBe(`12%`);
  });

  it(`percentage formatter returns a formatted value with options`, () => {
    const formattedPercentage = format.percentage(0.1234, {
      minimumFractionDigits: 2,
    });

    expect(formattedPercentage).toBe(`12.34%`);
  });
});
