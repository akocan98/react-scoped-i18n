// __DEV__ is defined in RN/Expo, but not on Web
declare const __DEV__: boolean | undefined;

const rawNodeEnv = process.env.NODE_ENV;

export const IS_DEV =
  typeof __DEV__ !== `undefined` ? __DEV__ : rawNodeEnv === `development`;
