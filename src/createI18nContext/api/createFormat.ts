import LRUCache from "lru-cache";
import { LRU_CACHE_MAX_SIZE } from "../const";
import { potentiallyWarnInvalidCacheState } from "../util/cache";

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
    number: (
      value: number,
      options?: Omit<Intl.NumberFormatOptions, `style`>,
    ) => {
      if (!options) {
        return defaultNumberFormatter.format(value);
      }

      if (!caches.number.has(options)) {
        potentiallyWarnInvalidCacheState(value, caches.number, options);

        caches.number.set(
          options,
          new Intl.NumberFormat(currentLanguage, options),
        );
      }

      const cachedFormatter = caches.number.get(options);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      return new Intl.NumberFormat(currentLanguage, options).format(value);
    },

    date: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      if (!options) {
        return defaultDateFormatter.format(value);
      }

      if (!caches.date.has(options)) {
        potentiallyWarnInvalidCacheState(value, caches.date, options);

        caches.date.set(
          options,
          new Intl.DateTimeFormat(currentLanguage, options),
        );
      }

      const cachedFormatter = caches.date.get(options);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      return new Intl.DateTimeFormat(currentLanguage, options).format(value);
    },

    time: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      if (!options) {
        return defaultTimeFormatter.format(value);
      }

      if (!caches.time.has(options)) {
        potentiallyWarnInvalidCacheState(value, caches.time, options);

        caches.time.set(
          options,
          new Intl.DateTimeFormat(currentLanguage, options),
        );
      }

      const cachedFormatter = caches.time.get(options);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      return new Intl.DateTimeFormat(currentLanguage, {
        ...options,
      }).format(value);
    },

    currency: (
      value: number,
      currency: string,
      options?: Omit<Intl.NumberFormatOptions, `style` | `currency`>,
    ) => {
      if (options) {
        const cacheKey = {
          ...options,
          currency,
        };

        if (!caches.currency.has(cacheKey)) {
          potentiallyWarnInvalidCacheState(value, caches.currency, cacheKey);

          caches.currency.set(
            cacheKey,
            new Intl.NumberFormat(currentLanguage, {
              style: `currency`,
              currency,
              ...options,
            }),
          );
        }

        const cachedFormatter = caches.currency.get(cacheKey);

        if (cachedFormatter) {
          return cachedFormatter.format(value);
        }
      }

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
      if (!options) {
        return defaultPercentageFormatter.format(value);
      }

      if (!caches.percentage.has(options)) {
        potentiallyWarnInvalidCacheState(value, caches.number, options);

        caches.percentage.set(
          options,
          new Intl.NumberFormat(currentLanguage, {
            style: `percent`,
            ...options,
          }),
        );
      }

      const cachedFormatter = caches.percentage.get(options);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      return new Intl.NumberFormat(currentLanguage, {
        style: `percent`,
        ...options,
      }).format(value);
    },
  };
};

const caches = {
  number: new LRUCache<Intl.NumberFormatOptions, Intl.NumberFormat>({
    max: LRU_CACHE_MAX_SIZE,
  }),

  date: new LRUCache<Intl.DateTimeFormatOptions, Intl.DateTimeFormat>({
    max: LRU_CACHE_MAX_SIZE,
  }),

  time: new LRUCache<Intl.DateTimeFormatOptions, Intl.DateTimeFormat>({
    max: LRU_CACHE_MAX_SIZE,
  }),

  currency: new LRUCache<
    Intl.NumberFormatOptions & {
      currency: string;
    },
    Intl.NumberFormat
  >({
    max: LRU_CACHE_MAX_SIZE,
  }),

  percentage: new LRUCache<Intl.NumberFormatOptions, Intl.NumberFormat>({
    max: LRU_CACHE_MAX_SIZE,
  }),
};
