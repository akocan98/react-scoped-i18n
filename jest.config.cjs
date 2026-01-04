// eslint-disable-next-line no-undef
module.exports = {
  preset: `ts-jest`,
  testEnvironment: `node`,

  roots: [`<rootDir>/src`],
  testMatch: [`**/*.test.ts`],
  collectCoverageFrom: [`src/**/*.ts`, `!src/**/*.d.ts`],
  globals: { __DEV__: true },
};
