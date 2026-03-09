# react-scoped-i18n 🌐

A React i18n library where **translations live next to the components that render them** - no keys, no JSON files, fully type-safe at compile time.

Works with **React** and **React Native** (_vanilla & Expo_).

---

## The problem with key-based i18n

Every other i18n library makes you name things. You write a key in your component, then jump to a JSON file to write the actual string, then come back. Keys get stale. Typos go unnoticed until runtime. Your translation file becomes a graveyard of strings you're not sure are still used.

`react-scoped-i18n` flips this: **translations are just code, written inline, where you need them.**

```tsx
const { t } = useI18n();

const name = `Oto`;

return <Heading>
  {t({
    en: `Welcome back, ${name}!`,
    es: `¡Bienvenido de nuevo, ${name}!`,
  })}
</Heading>;
```

No keys. No files. `ctrl+f` on any rendered string takes you straight to the component.

---

## Type safety that actually catches bugs

Forget to add a translation for a language you support? **TypeScript error.** Reference an unsupported language? **TypeScript error.** At compile time, not in production.

```tsx
return <Heading>
  {t({
    en: `Welcome back, ${name}!`,
    // TS Error: Property 'es' is missing - your app supports Spanish
  })}
</Heading>;
```

---

## Getting started

- **[Installation & Usage](/docs/usage.md)** - 30 second setup
- **[API Reference](/docs/api.md)** - full reference

---

## Key features

- **Colocated translations** - live in the component, not a separate file
- **Compile-time safety** - missing or unsupported languages are TypeScript errors
- **No build-time transforms** - no Babel plugins, no magic, lives in React runtime (React Context) 
- **No custom syntax** - plain JS template literals, no `{count, plural, ...}` to memorise
- **Out-of-the-box formatting** - numbers, currencies, dates and times via the native [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- **Hot-reload friendly** - language switches are reflected immediately
- **Minimal setup** - takes 30 seconds

---

## Examples

### Interpolation

```tsx
const { t } = useI18n();

const name = `Oto`;

return (
    <Heading>
        {t({
            en: `Welcome to the website, ${name}!`,
            es: `¡Bienvenido al sitio web, ${name}!`,
            sl: `Dobrodošli na spletno stran, ${name}!`,
        })}
    </Heading>
);
```

### Number & currency formatting

```tsx
const { t, format } = useI18n();

const price = 19.99;

return (
    <Text>
        {t({
            en: `The price is ${format.currency(price, "USD")}.`,
            es: `El precio es ${format.currency(price, "USD")}.`,
            sl: `Cena je ${format.currency(price, "USD")}.`,
        })}
    </Text>
);
```

### Pluralization

Full ICU category support (`one`, `two`, `many`, etc.), including a `negative` shorthand and the ability to target specific numbers.

```tsx
const { tPlural } = useI18n();

const count = 12;

return (
    <Text>
        {tPlural(count, {
            en: {
                negative: `You are in apple debt...`,
                one: `You have one apple.`,
                many: `You have ${count} apples.`,
                42: `You have the perfect number of apples!`,
            },
            es: {
                one: `Tienes una manzana.`,
                many: `Tienes ${count} manzanas.`,
            },
            sl: {
                one: `Imaš eno jabolko.`,
                two: `Imaš dve jabolki.`, // handling the Slovenian dual form
                many: `Imaš ${count} jabolk.`,
            },
        })}
    </Text>
);
```

### Shared / common translations

```tsx
const { t, commons } = useI18n();

return <Button>{t(commons.continue)}</Button>;
```

---

## Who this is for

`react-scoped-i18n` is built for **small teams and indie developers** who:

- Write and maintain their own translations (or work directly with translators in code)
- Support a small-to-medium number of languages
- Want TypeScript to enforce correctness, not just assist with autocomplete
- Prefer reading code over managing JSON files

If your workflow involves external translation platforms like Crowdin or Lokalise (or third party translators touching files directly), this approach is likely not for you.

---

#### [License: MIT](/LICENSE)
