## API

### Top-Level Exports

- `I18nProvider`: React context provider component that wraps your application and provides i18n functionality.
- `useI18n`: Hook to access translation functions and current language within your components.

-----

### The `useI18n()` hook returns the following properties:


<details>
  <summary>
   <code>t()</code>
   
   ###### Returns the translation based on <code>currentLanguage</code>
  </summary>
  
  Signature: `t(translation: TranslationMap<Language>): ReactNode`
  
  Usage:
  ```tsx
  t({
      en: "Hello",
      fr: "Bonjour"
  });
```
</details>

---

<details>
  <summary>
   <code>format()</code>

###### General purpose formatter for **numbers**, currencies, dates, and times
  </summary>

Signature:
```ts
format: {
   number: (value: number, options?: Intl.NumberFormatOptions) => string;
   date: (value: (Date | number), options?: Intl.DateTimeFormatOptions) => string;
   time: (value: (Date | number), options?: Intl.DateTimeFormatOptions) => string;
   currency: (value: number, currency: string, options?: Intl.NumberFormatOptions) => string;
}
```

Formatting is implemented with the built-in, widely supported [Internationalization API (Intl)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). For each formatting function, you can refer to the respective MDN documentation for available options.

Usage:

1. Number Formatting Example:
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const PersonCount = () => {
    const { format } = useI18n();

    const personCount = 1234.56;

    return <Text>
       {format.number(personCount)}
    </Text>
}
```

###### For a full overview of the number formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

2. Date Formatting Example:
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const CurrentDate = () => {
    const { format } = useI18n();

    const today = new Date();

    return <Text>
       {format.date(today, {
          year: "numeric",
          month: "long",
          day: "numeric",
       })}
    </Text>
}
```

###### For a full overview of the date formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)


3. Currency Formatting Example:

```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const PriceTag = () => {
    const { format } = useI18n();

    const price = 19.99;

    return <Text>
        {format.currency(price, 'USD', options)}
    </Text>
}
```

###### For a full overview of the currency formatting options, refer to [MDN: Intl / NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

4. Time Formatting Example:
```tsx
import { useI18n } from "src/i18n";
import { Text } from "@/components";

export const CurrentTime = () => {
    const { format } = useI18n();

    const now = new Date();

    return <Text>
       {format.time(now, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
       })}
    </Text>
}
```
###### For a full overview of the time formatting options, refer to [MDN: Intl / DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

</details>

---

<details>
  <summary>
   <code>tPlural()</code>
  
   ###### Returns the pluralized translation based on <code>currentLanguage</code> and the <code>count</code> parameter
  </summary>
  
  Signature: 
```ts
tPlural(count: number, {
  negative?: TranslationMap<Lang>;
  zero?: TranslationMap<Lang>;
  one?: TranslationMap<Lang>;
  two?: TranslationMap<Lang>;
  many?: TranslationMap<Lang>;
  [key: number]: TranslationMap<Lang>;
}): ReactNode
```
  
  Usage:
  ```tsx
const count = 12;

tPlural(count, {
    negative: {
        en: "You are in apple debt!",
        es: "¡Estás en deuda de manzanas!",
        sl: "Imaš jabolčni dolg!",
    },
    zero: {
        en: "Unfortunately, you have no apples.",
        es: "Desafortunadamente, no tienes manzanas.",
        sl: "Na žalost nimaš nobenega jabolka.",
    },
    one: {
        en: `You have one apple.`,
        es: `Tienes una manzana.`,
        sl: "Imate eno jabolko.",
    },
    two: {
        en: `You have two apples.`,
        es: `Tienes dos manzanas.`,
       sl: "Imata dve jabolki.",
    },
    many: {
        en: `You have ${count} apples.`,
        es: `Tienes ${count} manzanas.`,
       sl: `Imate ${count} jabolk.`,
    },
    42: {
        en: `You have the perfect amount of apples!`,
        es: `¡Tienes la cantidad perfecta de manzanas!`,
       sl: "Imate popolno število jabolk!",
    },
})
  ```

and now you can get _funky 💃_ with it, because it's just plain javascript.. 

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
  
  Type: `currentLanguage: Language` (`Language` extends `string`) 
  
  Usage:
  ```tsx
const { currentLanguage } = useI18n();

console.log(currentLanguage); // e.g., "en", "es", ...
  ```
</details>

---

<details>
  <summary>
   <code>setCurrentLanguage()</code>
  
   ###### Changes <code>currentLanguage</code>
  </summary>
  
  Signature: `setCurrentLanguage: (language: Language) => void`
  
  Usage:
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
  
   ###### Constant object containing common translations
  </summary>

  ❓Optional

  type: `commons: Record<string, TranslationMap<Language> | undefined`

  Usage:

#### Must first be initialised:
  ```tsx
import createI18nContext from "react-scoped-i18n";

export const { I18nProvider, useI18n } = createI18nContext({
    languages: [`en`, `es`],
    fallbackLanguage: `en`,
    commons: {
       ok: {
          en: `OK`,
          es: `Aceptar`,
       },
       cancel: {
          en: `Cancel`,
          es: `Cancelar`,
       },
    }
});
  ```

#### Then can be used like this:
  ```tsx
import { useI18n } from "src/i18n";
import { Button } from "@/components";

export const ConfirmButton = () => {
    const { t, commons } = useI18n();

    return <Button>{t(commons.ok)}</Button>; // type-safe access
};
```
</details>

---

### Note about language codes

If you are unsure which format to use for language codes, check out [MDN: Intl - Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).

TLDR; Use common tags such as `en`, `en-US`, `en-UK`, `es`, `es-ES`, `sl`, etc. The "best-effort" algorithm used by the Internationalization API will do its best to match the selected locale to one of your supported languages. This way, you ensure number & date formatting support without any additional setup.
