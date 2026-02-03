import { IS_DEV } from "../../env";
import { LRUCache } from "lru-cache";

export function potentiallyWarnInvalidCacheState<
  K extends Intl.NumberFormatOptions | Intl.DateTimeFormatOptions,
  V extends Intl.NumberFormat | Intl.DateTimeFormat,
>(value: number | Date, cache: LRUCache<K, V>, options: K) {
  if (!IS_DEV) {
    return;
  }

  const cachedKeys = Array.from(cache.keys());

  const isEquivalent = cachedKeys.some((key) => shallowEqual(key, options));

  if (isEquivalent) {
    console.warn(
      `[i18n] ⚠️ Formatting ${value} with options ${JSON.stringify(options)} is not cached, but it should be. This is because you are recreating the options object on every render. To fix this, memoize the options object or define it outside of the component.`,
    );
  }
}

function shallowEqual(a: object, b: object) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) => (a as never)[key] === (b as never)[key]);
}
