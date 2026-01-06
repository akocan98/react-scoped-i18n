import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import js from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ),
  {
    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslint,
      "unused-imports": unusedImports,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "react-native/no-inline-styles": 0,
      camelcase: 1,
      "no-multiple-empty-lines": 1,
      curly: ["error", "all"],
      quotes: ["error", "backtick"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unsafe-argument": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "react-hooks/exhaustive-deps": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },

    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
  },
];
