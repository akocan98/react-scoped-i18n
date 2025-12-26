export const createFormat = <const Languages extends readonly string[]>({
  currentLanguage,
}: {
  currentLanguage: Languages[number];
}) => {
  const defaultNumberFormatter = new Intl.NumberFormat(currentLanguage);

  const defaultDateFormatter = new Intl.DateTimeFormat(currentLanguage);

  const defaultTimeFormatter = new Intl.DateTimeFormat(currentLanguage, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return {
    number: (value: number, options?: Intl.NumberFormatOptions) => {
      if (options) {
        return new Intl.NumberFormat(currentLanguage, options).format(value);
      }

      return defaultNumberFormatter.format(value);
    },

    date: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      if (options) {
        new Intl.DateTimeFormat(currentLanguage, options).format(value);
      }

      return defaultDateFormatter.format(value);
    },

    time: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      if (options) {
        return new Intl.DateTimeFormat(currentLanguage, {
          ...options,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(value);
      }

      return defaultTimeFormatter.format(value);
    },

    currency: (
      value: number,
      currency: Intl.NumberFormatOptions["currency"],
      options?: Intl.NumberFormatOptions,
    ) => {
      return new Intl.NumberFormat(currentLanguage, {
        style: "currency",
        currency,
        ...options,
      }).format(value);
    },
  };
};
