# vite-plugin-i18next-extract

A [vite](https://github.com/vitejs/vite) plugin that automatically extracts i18next strings during development.

## Install

```bash
pnpm add -D vite-plugin-i18next-extract # using pnpm
yarn add -D vite-plugin-i18next-extract # using yarn
npm install --save-dev vite-plugin-i18next-extract # using npm
```

## Usage

In `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import i18nExtract from "vite-plugin-i18next-extract";

export default defineConfig({
  plugins: [
    i18nExtract({
      /* options */
    }),
  ],
});
```

## Options

`vite-plugin-i18next-extract` accepts all options available to the [`i18next-scanner`](https://github.com/i18next/i18next-scanner) library:

```ts
interface ResourceExtractorOptions {
  allowDynamicKeys?: boolean;
  attr?: {
    extensions?: string[];
    list?: string[];
  };
  contextDefaultValues?: string[];
  contextSeparator?: string;
  debug?: boolean;
  defaultLng?: string;
  defaultNs?: string;
  defaultValue?: string;
  func?: {
    extensions?: string[];
    list?: string[];
  };
  interpolation?: {
    prefix?: string;
    suffix?: string;
  };
  keySeparator?: string;
  lngs?: string[];
  metadata?: Record<string, unknown>;
  ns?: string[];
  nsSeparator?: string;
  pluralSeparator?: string;
  removeUnusedKeys?: boolean;
  resource?: {
    jsonIndent?: number;
    lineEnding?: string;
    loadPath?: string;
    savePath?: string;
  };
  sort?: boolean;
  trans?: {
    acorn?: {
      ecmaVersion?: number | string;
      sourceType?: "module" | "script";
    };
    component?: string;
    defaultsKey?: string;
    extensions?: string[];
    fallbackKey?: boolean | ((ns: string, value: string) => string);
    i18nKey?: string;
    keepBasicHtmlNodesFor?: string[];
    supportBasicHtmlNodes?: true;
  };
}
```
