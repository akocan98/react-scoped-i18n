export const createFormat = <const Languages extends readonly string[]>({
  currentLanguage,
}: {
  currentLanguage: Languages[number];
}) => {
  const defaultNumberFormatter = new Intl.NumberFormat(currentLanguage);

  const defaultDateFormatter = new Intl.DateTimeFormat(currentLanguage);

  const defaultTimeFormatter = new Intl.DateTimeFormat(currentLanguage, {
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`,
  });

  const defaultPercentageFormatter = new Intl.NumberFormat(currentLanguage, {
    style: `percent`,
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
        return new Intl.DateTimeFormat(currentLanguage, options).format(value);
      }

      return defaultDateFormatter.format(value);
    },

    time: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      if (options) {
        return new Intl.DateTimeFormat(currentLanguage, {
          ...options,
        }).format(value);
      }

      return defaultTimeFormatter.format(value);
    },

    currency: (
      value: number,
      currency: string,
      options?: Omit<Intl.NumberFormatOptions, `style` | `currency`>,
    ) => {
      return new Intl.NumberFormat(currentLanguage, {
        style: `currency`,
        currency,
        ...options,
      }).format(value);
    },

    percentage: (
      value: number,
      options?: Omit<Intl.NumberFormatOptions, `style`>,
    ) => {
      if (options) {
        return new Intl.NumberFormat(currentLanguage, {
          style: `percent`,
          ...options,
        }).format(value);
      }

      return defaultPercentageFormatter.format(value);
    },
  };
};
