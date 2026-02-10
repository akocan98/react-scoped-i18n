# react-scoped-i18n 🌐

A React i18n library where translations live **next to the components that render them** - no keys, no JSON files, fully type-safe.

Translations are written directly in your components, it's **all just code**.

Works with **React** and **React Native** (_vanilla & Expo_). 🚀 🩵

---

## Getting started

- **[Installation & Usage](/docs/usage.md)** (30 second setup)
- **[API](/docs/api.md)** (full reference)

---

## Why `react-scoped-i18n 🌐`?

If you’re tired of naming translation keys, jumping between JSON files, and losing typesafety, then this is for you!

### Key features

- Very minimal setup with out-of-the-box number & date formatting
- Fully typesafe: Missing translations or unsupported languages are compile-time errors
- Uses the widely supported [Internationalization API (Intl)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for number, currency, date, and time formatting
- It's all in the runtime:
  - No build-time transforms
  - No custom string interpolation syntax
  - Everything is plain JS/TS

### The focus is on developer experience

- Translations are colocated with the components that use them
- Rendered text is searchable - `ctrl+f` takes you straight to the component
- No context switching between UI code and translation files
- No tedious naming of translation keys
- No restrictive file formats (JSON/YAML)
- Runs entirely within React’s context system
- Hot-reload friendly; language switches are reflected immediately

---

## What does it look like?

Basically...

<img width="500" height="210" alt="image" src="https://github.com/user-attachments/assets/8c7db963-7cf6-4fd1-95af-df574d0c5209" />

Instead of looking up translation keys, you write translations inline.

### Very basic example

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
                    // all typesafe: if you forget a configured language, it's a typescript error!
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

<details> <summary><strong>Number formatting example</strong></summary>
    
```ts
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
</details>

<details> <summary><strong>Pluralization example</strong></summary>

You have access to all the standard ICU categories (one, two, many...) with the addition of `negative` for handling negative numbers, and you can even target specific numbers if needed.

```ts
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
    );
};
```
</details>

---

`react-scoped-i18n 🌐` works best when translations are written and maintained in code, and when the number of supported languages is small-to-medium.

If your workflow relies on external translators or platforms like Crowdin or Lokalise, this is probably not the right tool.

You can find more in-depth examples in the [Installation & Usage](/docs/usage.md) and the API definitions in [API](/docs/api.md)

---

#### [License: MIT](/LICENSE)
