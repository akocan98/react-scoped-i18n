import { createFormat } from "./createFormat";

describe("createFormat", () => {
  const format = createFormat({
    currentLanguage: "en-US",
  });

  it("number formatter returns a formatted value", () => {
    const formattedNumber = format.number(1234567.89);

    expect(formattedNumber).toBe("1,234,567.89");
  });

  it("date formatter returns a formatted value", () => {
    const date = new Date("2024-01-01T12:00:00Z");

    const formattedDate = format.date(date);

    expect(formattedDate).toBe("1/1/2024");
  });

  it("time formatter returns a formatted value", () => {
    const date = new Date("1912-06-23T02:15:00");

    const formattedTime = format.time(date);

    expect(formattedTime).toBe("2:15:00 AM");
  });

  it("currency formatter returns a formatted value", () => {
    const formattedCurrency = format.currency(1234.56, "USD");

    expect(formattedCurrency).toBe("$1,234.56");
  });
});
