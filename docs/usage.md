# Installation & Usage

###### You can use this with both React and React Native (+ Expo) projects. 🚀


To get started, you must first install the package:

```bash
npm install react-scoped-i18n
# or
yarn add react-scoped-i18n
```

## Step 1:
### Define your config and export the `I18nProvider` and `useI18n` hook

This is where all the type inference happens:

```ts
// src/i18n.ts

import createI18nContext from "react-scoped-i18n";

export const { I18nProvider, useI18n } = createI18nContext({
    languages: [`en`, `es`, `sl`],
    fallbackLanguage: `en`, // already statically typed (inferred from the languages array)
});
```

Having defined your config this way, the exported `useI18n` hook will now be **fully typed for the languages you specified**. This means that every translation you write must now include all the languages you defined in the config, no more, no less.

<details>
  <summary>
    ℹ️ Note About Language Codes:
  </summary>

  > If you are unsure what format to use for language codes, check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation.
  > 
  > The TLDR is: Use common tags such as `en`, `en-US`, `en-UK`, `es`, `es-ES`, `sl`, etc. The "best-effort" algorithm used by the Intl API will do its best to match the user's locale to one of your supported languages. This way, you ensure number & date formatting support without any additional setup.
</details>

## Step 2:
### Wrap your app with the provider

```tsx
// 📄 your root component / entry point

import { I18nProvider } from "./i18n-config";
import { Home } from "./home";

export const Index = () => {
    return (
        <I18nProvider initialLanguage={`en`}>
            <Home />
        </I18nProvider>
    );
}
```

## Step 3:
### You can now use the `useI18n` hook in your components:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const Greeting = () => {
    const { t } = useI18n();

    return (
        <Title>
            {t({
                en: `Hello, welcome to our website!`,
                es: `¡Hola, bienvenido a nuestro sitio web!`,
                sl: `Živjo, dobrodošli na naši spletni strani!`,
            })}
        </Title>
    );
};
```

And that's it! 🚀

Note: You can also define the translations object outside the JSX (or outside the component entirely) if you prefer, but then you run into limitations with string interpolation as well as having to name your translation objects. Generally, unless required, this would be considered an **anti-pattern**.

----

## Examples

### String interpolation

With `react-scoped-i18n 🌐`, it's just JS/TS code:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const Greeting = () => {
    const { t } = useI18n();

    const name = `John`;

    return (
        <Title>
            {t({
                en: `Hey, ${name}!`,
                es: `¡Hola, ${name}!`,
                sl: `Živjo, ${name}!`,
            })}
        </Title>
    );
};
```

---

### Current language

You can **access** the current language and **change it**, all via the `useI18n` hook:

```tsx
import { useI18n } from "src/i18n";
import { Title, Button } from "@/components";

export const Language = () => {
    const { t, currentLanguage, setCurrentLanguage } = useI18n();

    const vivaEspaña = () => {
        setCurrentLanguage(`es`); // type-safe, of course
    };

    return (
        <>
            <Title>
                {t({
                    en: `Current language: ${currentLanguage}`,
                    es: `Idioma actual: ${currentLanguage}`,
                    sl: `Jezik: ${currentLanguage}`,
                })}
            </Title>
            <Button onClick={vivaEspaña}>🇪🇸</Button>
        </>
    );
};
```

---

### Number, Date, Time and Currency Formatting

- ###### For a full overview of the number formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

- ###### For a full overview of the date formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

- ###### For a full overview of the currency formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

- ###### For a full overview of the time formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

You can format numbers, dates, times and currencies according to the current language/locale:

#### Number Formatting Example:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const Apples = () => {
    const { t, format } = useI18n();

    const count = 1_000_000;
    
    return (
        <Title>
            {t({
                en: `We have ${format.number(count)} apples!`,
                es: `¡Tenemos ${format.number(count)} apples!`,
                sl: `Imamo ${format.number(count, {
                    maximumFractionDigits: 0,
                })} jabolk!`,
            })}
        </Title>
    );
};
```

#### Date Formatting Example:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const Today = () => {
    const { t, format } = useI18n();

    const today = new Date();

    return (
        <Title>
            {t({
                en: `Today's date is ${format.date(today)}`,
                es: `La fecha de hoy es ${format.date(today)}`,
                sl: `Današnji datum je ${format.date(today, {
                    year: `numeric`,
                    month: `long`,
                    day: `numeric`,
                })}`,
            })}
        </Title>
    );
};
```

#### Currency Formatting Example:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const PriceTag = () => {
  const { t, format } = useI18n();
  
  const priceEUR = 19.99;
  
  const priceUSD = 21.99;

  return (
        <>
          <Title>
            {t({
              en: `The price is ${format.currency(priceUSD, "USD")}`,
              es: `El precio es ${format.currency(priceEUR, "EUR")}`,
            })}
          </Title>
        </>
  );
};
```


#### Time Formatting Example:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const CurrentTime = () => {
    const { t, format } = useI18n();

    const now = new Date();

    return (
        <Title>
            {t({
                en: `The current time is ${format.time(now)}`,
                es: `La hora actual es ${format.time(now)}`,
                sl: `Trenutni čas je ${format.time(now, {
                    hour: `2-digit`,
                    minute: `2-digit`,
                })}`,
            })}
        </Title>
    );
};
```

---

### Common translations

You can define some common translations, usually utility strings that are reused across the app.

1) They must be defined via the config:

```ts
// src/i18n.ts

import createI18nContext from "react-scoped-i18n";

export const { I18nProvider, useI18n } = createI18nContext({
    languages: [`en`, `es`],
    fallbackLanguage: `en`,
    commons:  {
        ok: {
            en: `OK`,
            es: `Aceptar`,
        },
        cancel: {
            en: `Cancel`,
            es: `Cancelar`,
        },
    },
});
```

2) then they can be accessed via the `useI18n` hook (through `commons` property):

```tsx
import { useI18n } from "src/i18n";
import { Button } from "@/components";

export const ConfirmButton = () => {
    const { t, commons } = useI18n();

    return <Button>
        {t(commons.ok)}
    </Button>;
};
```

---

### "tPlural" helper:

You can handle pluralization with the `tPlural` helper:

```tsx
import { useI18n } from "src/i18n";
import { Title } from "@/components";

export const Apples = () => {
    const { tPlural } = useI18n();

    const count = 12;

    return (
        <Title>
          {tPlural(count, {
            en: {
              negative: `You are in apple debt...`,
              one: `You have one apple.`,
              many: `You have ${count} apples.`,
              42: `You have the perfect number of apples!`,
            },
            sl: {
              negative: `Imaš jabolčni dolg...`,
              one: `Imaš eno jabolko.`,
              two: `Imaš dve jabolki.`, // ‼️ handling dual form in Slovenian that English and Spanish don't have
              many: `Imaš ${count} jabolk.`,
              42: `Imaš popolno število jabolk!`,
            },
            es: {
              one: `Tienes una manzana.`,
              many: `Tienes ${count} manzanas.`,
              42: `¡Tienes la cantidad perfecta de manzanas!`,
            },
          })}
        </Title>
  );
};
```

---

### "tGlobal" helper for translations outside React components

You can use translations outside React components, for example in utility functions or services.

You must:

1) Export the `tGlobal` helper

```ts
// src/i18n.ts

import createI18nContext from "react-scoped-i18n";

export const { I18nProvider, useI18n, tGlobal } = createI18nContext({
    languages: [`en`, `es`, `sl`],
    fallbackLanguage: `en`, // already statically typed (inferred from the languages array)
});
```

2) and then you can use it:

```ts
// src/example-logger.ts

import { tGlobal } from "react-scoped-i18n";
import { log } from "some-logging-library";

const logger = (messageKey: string) => {
    log(tGlobal({
        en: `Log message: ${messageKey}`,
        es: `Mensaje de registro: ${messageKey}`,
        sl: `Sporočilo: ${messageKey}`,
    }));
};
```

---

### React Nodes as Translation Values

If your translations require different structures based on the language, we can consider this an issue of localization as well. For this reason, you can specify React nodes as translation values:

```tsx
import { useI18n } from "src/i18n";
import { Text, Bold, Italic, Underlined } from "@/components";

export const VeryImportantThing = () => {
    const { t } = useI18n();

    const thing = `Thing`;

    return (
        <Text>
            {t({
                en: (
                    <>
                        This is an important thing:
                        <Text>
                            The thing known as <Bold>Mr. {thing}</Bold> is very important.
                        </Text>
                    </>
                ),
                es: (
                    <>
                        Esta es una cosa importante:
                        <Text>
                            La cosa conocida como <Italic>Sr. {thing}</Italic> es muy importante.
                        </Text>
                    </>
                ),
                sl: (
                    <>
                        To je pomembna stvar:
                        <Text>
                            Zadeva, znana kot <Underlined>G. {thing}</Underlined>, je zelo pomembna.
                        </Text>
                    </>
                )
            })}
        </Text>
    );
};
```

----

#### TLDR:

With `react-scoped-i18n` it's immediately obvious what the actual content is, right there in the component code.
You can also find the component easily by searching for any of the rendered text. Common translations are also type-safe, meaning you benefit from autocomplete as well!

### You can check out the [full API docs here](/docs/api.md).

