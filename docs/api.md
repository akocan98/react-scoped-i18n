## API

### Top-Level Exports

- `I18nProvider`: React context provider component that wraps your application and provides i18n functionality
- `useI18n`: Hook to access translation functions and current language within your components
- `tGlobal`: Global translation function for use outside React components

-----

### The `useI18n()` hook returns the following properties:


<details>
  <summary>
   <code>t()</code>
   
   ###### Returns the translation based on <code>currentLanguage</code>
  </summary>
  
  #### Signature: 
```ts
t<Translation extends string | number | ReactNode = ReactNode>(
    translation: TranslationMap<Language, Translation>
): Translation

// `Language` extends `string`
```

The return type of `t()` is inferred from the values of the provided translations.


#### Usage:
  ```tsx
  t({
    // the return type of t() is inferred as "string" here
    en: "Hello",
    fr: "Bonjour"
  });
```

If your translations require different structures based on the language, we can consider this an issue of localization as well. For this reason, you can specify React nodes as translation values:

```tsx
t({
    // the return type of t() is inferred as "ReactNode" here
    en: <Bold>Hello, world!</Bold>,
    es: <Italic>Hola, mundo!</Italic>
}); 
```

----

You can explicitly assert the return type of `t()` by providing a generic type parameter (`string | number | ReactNode`). 

This is useful when translations are passed through non-React APIs.

```tsx
t<string>({ 
    en: "Hello, world!",
    es: "Hola, mundo!",
});
```

```tsx
t<number>({
   en: 1_234,
   es: 4_321
});
```

This is also useful if you intend to mix different types of translation values:

```tsx
t<ReactNode>({
    en: <Bold>Hello, world!</Bold>,
    es: "Hola, mundo!",
})
```

By doing this, you are asserting the return type of `t()`, meaning you will get a Typescript error if the translation values do not conform to the specified type.

</details>

---

<details>
  <summary>
   <code>format()</code>

###### General purpose formatter for **numbers**, currencies, dates, and times
  </summary>

#### Signature:
```ts
format: {
   number: (value: number, options?: Intl.NumberFormatOptions) => string;
   date: (value: (Date | number), options?: Intl.DateTimeFormatOptions) => string;
   time: (value: (Date | number), options?: Intl.DateTimeFormatOptions) => string;
   currency: (value: number, currency: string, options?: Intl.NumberFormatOptions) => string;
}
```

Formatting is implemented with the widely supported [Internationalization API (Intl)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). For each formatting function, you can refer to the respective MDN documentation for available options.

#### Usage:

1. Number Formatting Example (with optional options):
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const HeadCount = () => {
    const { format } = useI18n();

    const personCount = 1234.567;

    return <Text>
       {format.number(personCount, formatOptions)}
    </Text>
}

const formatOptions = {
    maximumFractionDigits: 2,
};
```

###### For a full overview of the number formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

2. Date Formatting Example (with optional options):
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const Now = () => {
    const { format } = useI18n();

    const now = new Date();

    return <Text>
       {format.date(now, formatOptions)}
    </Text>
}

const formatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
```

###### For a full overview of the date formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)


3. Currency Formatting Example (with optional options):

```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const PriceTag = () => {
    const { format } = useI18n();

    const price = 19.99;

    return <Text>
        {format.currency(price, 'USD', formatOptions)}
    </Text>
}

const formatOptions = {
    currencySign: "accounting",
};

```

###### For a full overview of the currency formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

4. Time Formatting Example (with optional options):
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const CurrentTime = () => {
    const { format } = useI18n();

    const now = new Date();

    return <Text>
       {format.time(now, formatOptions)}
    </Text>
}

const formatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
};
```
###### For a full overview of the time formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

</details>

---

<details>
  <summary>
   <code>tPlural()</code>
  
   ###### Returns the pluralized translation based on <code>currentLanguage</code> and the <code>count</code> parameter
  </summary>

#### Signature:
```ts
tPlural(count: number, translations: Record<Language, {
  negative?: ReactNode;
  zero?: ReactNode;
  one?: ReactNode;
  two?: ReactNode;
  many?: ReactNode;
  [key: number]: ReactNode;
}) => ReactNode

// `Language` extends `string`
```

#### Usage:
  ```tsx
const count = 12;

tPlural(count, {
   en: {
      negative: `You are in apple debt...`,
      one: `You have one apple.`,
      many: `You have ${count} apples.`,
      42: `You have the perfect number of apples!`,
   },
   sl: {
      negative: `Imaš jabolčni dolg...`,
      one: `Imaš eno jabolko.`,
      two: `Imaš dve jabolki.`,
      many: `Imaš ${count} jabolk.`,
      42: `Imaš popolno število jabolk!`,
   },
   es: {
      one: `Tienes una manzana.`,
      many: `Tienes ${count} manzanas.`,
      42: `¡Tienes la cantidad perfecta de manzanas!`,
   },
})
  ```

and now you can get funky with it, because it's just plain javascript.. 

For example, you can generate a range of numbers for specific translations:

```tsx
{tPlural(count, {
    many: {
        en: `You have ${count} apples.`,
        es: `Tienes ${count} manzanas.`,
        sl: `Imate ${count} jabolk.`,
    },
    ...Object.fromEntries(
        [...Array(100)]
            .map((_, i) => i)
            .map((n) =>
                [
                    n,
                    {
                        en: `Unbelievable! You have ${n} apples!`,
                        es: `¡Increíble! ¡Tienes ${n} manzanas!`,
                        sl: `Neverjetno! Imate ${n} jabolk!`,
                    },
                ],
            ),
    ),
    42: {
        en: `You have the perfect amount of apples!`,
        es: `¡Tienes la cantidad perfecta de manzanas!`,
        sl: "Imate popolno število jabolk!",
    },
})}

// Output is: 
{
    many: {
        en: `You have ${count} apples.`,
            es: `Tienes ${count} manzanas.`,
            sl: `Imate ${count} jabolk.`,
    },
    [0..99]: { // each entry individually generated
        en: `Unbelievable! You have ${n} apples!`,
        es: `¡Increíble! ¡Tienes ${n} manzanas!`,
        sl: `Neverjetno! Imate ${n} jabolk!`,
    },
    42: { // this entry will override the generated one above
        en: `You have the perfect amount of apples!`,
        es: `¡Tienes la cantidad perfecta de manzanas!`,
        sl: "Imate popolno število jabolk!",
    },
}
```
</details>

---

<details>
  <summary>
   <code>currentLanguage</code>
  
   ###### Property representing the current language
  </summary>

#### Type: 
```ts
currentLanguage: Language

// (`Language` extends `string`) 
```

#### Usage:
  ```tsx
const { currentLanguage } = useI18n();

console.log(currentLanguage); // e.g., "en", "es", ...
  ```
</details>

---

<details>
  <summary>
   <code>setCurrentLanguage()</code>
  
   ###### Sets a new value for <code>currentLanguage</code>
  </summary>
  
  #### Signature: 
```ts
setCurrentLanguage: (language: Language) => void

// (`Language` extends `string`)
```
  
  #### Usage:
  ```tsx
const { setCurrentLanguage } = useI18n();

const vivaEspaña = () => {
    setCurrentLanguage(`es`); // parameter must be one of the supported languages
};
  ```
</details>


---

<details>
  <summary>
   <code>commons</code>
  
   ###### Object containing common translations
  </summary>

##### ❓Optional

#### Type:
```ts
commons: Record<string, TranslationMap<Language> | undefined

// (`Language` extends `string`)
```

#### Usage:

###### Must first be initialised:
  ```tsx
import { createI18nContext } from "react-scoped-i18n";

export const { I18nProvider, useI18n } = createI18nContext({
    languages: [`en`, `es`],
    fallbackLanguage: `en`,
    commons: {
       accept: {
          en: `Accept`,
          es: `Aceptar`,
       },
       cancel: {
          en: `Cancel`,
          es: `Cancelar`,
       },
    }
});
  ```

###### Then can be used like this:
  ```tsx
import { useI18n } from "src/i18n";
import { Button } from "@/components";

export const AcceptButton = () => {
    const { t, commons } = useI18n();

    return <Button>{t(commons.accept)}</Button>; // type-safe access
};
```
</details>

-----

### Note about language codes

If you are unsure which format to use for language codes, check out [MDN: Intl - Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).

TLDR: Use common tags such as `en`, `en-US`, `en-UK`, `es`, `es-ES`, `sl`, etc. The "best-effort" algorithm used by the Internationalization API will do its best to match the selected locale to one of your supported languages. This way, you ensure number & date formatting support without any additional setup.

-----


### Using translations outside of React Components

The `tGlobal()` function has the same signature as the `t()` function returned by the `useI18n()` hook, but it can be used outside of React components.

It is **only intended** for uses **outside of React components**. It's use should be limited to error messages, or other non-UI contexts where translations are needed.

<details>
  <summary>
Example usage:
  </summary>


###### You must first export it from your i18n setup file:
```ts
// 📁 src/i18n.ts

import { createI18nContext } from "react-scoped-i18n";

export const { 
   I18nProvider, 
   useI18n, 
   tGlobal // 👈 must be exported explicitly 
} = createI18nContext({
    languages: [`en`, `es`, `sl`],
    fallbackLanguage: `en`,
});

```

###### Then it can be used:

```ts
import { tGlobal } from "src/i18n";

console.log(
    tGlobal({ // usage is identical to the `t()` function
        en: "Something happened",
        es: "Algo pasó",
        sl: "Nekaj se je zgodilo",
    })
);
```
</details>