# react-scoped-i18n 🌐

`react-scoped-i18n 🌐` is a **fully type-safe** i18n solution for **React**.

It encourages writing translations right next to the components that use them.

---

## Getting started:

### [Installation & Usage](/docs/usage.md)

### [API](/docs/api.md)

###### Note: You can use this with both React and React Native (+ Expo) projects. 🚀


---

## Why `react-scoped-i18n 🌐`?

### Key features:
- Fully type-safe; missing translations or unsupported languages are compile-time errors
- Utilize the built-in, widely supported [Internationalization API (Intl)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for number, currency, date and time formatting
- Implementation is fully JS/TS; no new syntax is required for string interpolation or dynamic translations generated at runtime; you can simply write normal JS/TS code

### The focus is on _dev experience_ above all else:
- Translations are colocated with the components that use them; looking up translations in the codebase always immediately leads to the relevant component code
- No context switching between component code and translation files when developing UI
- No tedious naming of translation keys, as they usually provide little value
- Ditch restrictive translation file formats (JSON, YAML); use the full power of JS/TS
- Runs within React's context system. No additional build steps, changes can be hot-reloaded, language switches reflected immediately 

---

## What does it look like?

#### Very Basic Example:

```tsx
import { useI18n } from "@/i18n";
import { Heading, Button } from "@/components";

export const WelcomeMessage = () => {
    const { t, commons } = useI18n();

    const name = `John`;
    
    return (
        <>
            <Heading>
                {t({
                    // text localization with string interpolation, all fully type-safe for all configured languages
                    en: `Welcome to the website, ${name}!`,
                    es: `¡Bienvenido al sitio web, ${name}!`,
                    sl: `Dobrodošli na spletno stran, ${name}!`,
                })}
            </Heading>
            <Button>{t(commons.continue)}</Button>
        </>
    );
};
```

##### Number Formatting Basic Example:

```tsx
import { useI18n } from "@/i18n";
import { Text } from "@/components";

export const PriceTag = () => {
    const { t, format } = useI18n();

    const price = 19.99;
    
    const currency = `USD`;
    
    return (
        <Text>
            {t({
                en: `The price is ${format.currency(price, currency)}.`,
                es: `El precio es ${format.currency(price, currency)}.`,
                sl: `Cena je ${format.currency(price, currency)}.`,
            })}
        </Text>
    );
};
```

#### Pluralization Basic Example:

```tsx
import { useI18n } from "@/i18n";
import { Text } from "@/components";

export const Apples = () => {
    const { tPlural } = useI18n();
    
    const count = 12;
    
    return (
        <Text>
            {tPlural(count, {
                en: {
                    negative: `You are in apple debt...`,
                    one: `You have one apple.`,
                    many: `You have ${count} apples.`,
                    42: `You have the perfect number of apples!`, // ‼️ you can target specific numbers
                },
                es: {
                    one: `Tienes una manzana.`,
                    many: `Tienes ${count} manzanas.`,
                },
                sl: {
                    one: `Imaš eno jabolko.`,
                    two: `Imaš dve jabolki.`, // ‼️ handling dual form in Slovenian that English and Spanish don't have
                    many: `Imaš ${count} jabolk.`,
                }
            })}
        </Text>
    )
};
```

#### TLDR:

`react-scoped-i18n 🌐` shines most when devs are the ones adding translations into the app, and when the number of supported languages is small-to-medium sized.


> You can find more in-depth examples in the [Installation & Usage](/docs/usage.md) and the API definitions in [API](/docs/api.md)

---

#### [License: MIT](/LICENSE)