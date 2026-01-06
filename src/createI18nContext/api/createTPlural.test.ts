import { createTPlural } from "./createTPlural";

describe(`createTPlural`, () => {
  const tPlural = createTPlural({
    currentLanguage: `en`,
    fallbackLanguage: `en`,
  });

  it(`tPlural helper returns a translation for specific number`, () => {
    const count = 2;

    const translation = tPlural(count, {
      en: {
        0: `You have no messages`,
        one: `You have 1 message`,
        many: `You have ${count} messages`,
      },
      sl: {
        0: `Nimate sporočil`,
        one: `Imate 1 sporočilo`,
        two: `Imate 2 sporočili`,
        many: `Imate ${count} sporočil`,
      },
      pt: {
        0: `Você não tem mensagens`,
        one: `Você tem 1 mensagem`,
        many: `Você tem ${count} mensagens`,
      },
    });

    expect(translation).toBe(`You have 2 messages`);
  });
});
