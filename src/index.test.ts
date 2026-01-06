describe(`sanity check: createI18nContext is exported`, () => {
  test(`it should be defined`, async () => {
    const { createI18nContext } = await import(`./index`);
    expect(createI18nContext).toBeDefined();
  });
});
