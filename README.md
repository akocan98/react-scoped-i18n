# react-scoped-i18n 🌐

`react-scoped-i18n 🌐` is a **fully type-safe** i18n solution for **React**.

It encourages writing translations right next to the components that use them.

You can use this with both <ins>React</ins> and <ins>React Native</ins> (_vanilla & Expo!_) projects. 🚀 🩵

---

## Getting started:

### [Installation & Usage](/docs/usage.md)

### [API](/docs/api.md)

---

## Why `react-scoped-i18n 🌐`?

### Key features:
- Very minimal setup with out-of-the-box number & date formatting
- Fully type-safe:
- - missing translations or unsupported languages are compile-time errors
- - return types of `t()` are inferred from translation values
- Utilize the widely supported [Internationalization API (Intl)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for number, currency, date and time formatting
- Usage is entirely in the runtime; no build-time transforms, no new syntax is required for string interpolation or dynamic translations generated at runtime, everything is plain JS/TS

### The focus is on dev experience:
- Translations are colocated with the components that use them; looking up translations in the codebase always immediately leads to the relevant component code
- No context switching between component code and translation files when developing UI
- No tedious naming of translation keys, as they usually provide little value
- Ditch restrictive translation file formats (JSON, YAML); use the full power of JS/TS
- Runs within React's context system. No additional build steps, changes can be hot-reloaded, language switches reflected immediately

---

## What does it look like?

##### Very Basic Example:

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
                    // all fully type-safe for all configured languages
                    en: `Welcome to the website, ${name}!`,
                    es: `¡Bienvenido al sitio web, ${name}!`,
                    sl: `Dobrodošli na spletno stran, ${name}!`,
                })}
            </Heading>
            <Button>{
                // "commons" object is used for commonly used, shared translations
                t(commons.continue)
            }</Button>
        </>
    );
};
```

<details>
  <summary>
Number Formatting Basic Example:
  </summary>

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
</details>


<details>
  <summary>
Pluralization Basic Example:
  </summary>

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
</details>

----

`react-scoped-i18n 🌐` shines most when devs are the ones adding translations into the app, and when the number of supported languages is small-to-medium sized.

You can find more in-depth examples in the [Installation & Usage](/docs/usage.md) and the API definitions in [API](/docs/api.md)

---

#### [License: MIT](/LICENSE)
