const rawNodeEnv =
  typeof process !== `undefined` &&
  process.env &&
  typeof process.env.NODE_ENV === `string`
    ? process.env.NODE_ENV
    : undefined;

// __DEV__ is defined in RN/Expo, but not on Web
declare const __DEV__: boolean | undefined;

export const IS_DEV =
  typeof __DEV__ !== `undefined` ? __DEV__ : rawNodeEnv === `development`;
