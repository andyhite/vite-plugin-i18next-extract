declare module "i18next-scanner" {
  export type ResourceStore = {
    [lng: string]: {
      [ns: string]: {
        [key: string]: unknown;
      };
    };
  };

  export interface ParseFuncFromStringOptions {
    extensions?: string[];
    list?: string[];
  }

  export type FallbackKeyFn = (ns: string, value: string) => string;

  export interface ParseTransFromStringOptions {
    acorn?: {
      ecmaVersion?: number | string;
      sourceType?: "module" | "script";
    };
    component?: string;
    defaultsKey?: string;
    extensions?: string[];
    fallbackKey?: boolean | FallbackKeyFn;
    i18nKey?: string;
    keepBasicHtmlNodesFor?: string[];
    supportBasicHtmlNodes?: true;
  }

  export interface ParseAttrFromStringOptions {
    extensions?: string[];
    list?: string[];
  }

  export interface ParserOptions {
    allowDynamicKeys?: boolean;
    attr?: ParseAttrFromStringOptions;
    contextDefaultValues?: string[];
    contextSeparator?: string;
    debug?: boolean;
    defaultLng?: string;
    defaultNs?: string;
    defaultValue?: string;
    func?: ParseFuncFromStringOptions;
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
    trans?: ParseTransFromStringOptions;
  }

  export type ParseFuncFromStringHandler = (
    key: string,
    options: ParseFuncFromStringOptions
  ) => void;

  export type ParseAttrFromStringHandler = (
    key: string,
    options: ParseAttrFromStringOptions
  ) => void;

  export type ParseTransFromStringHandler = (
    key: string,
    options: ParseTransFromStringOptions
  ) => void;

  export class Parser {
    constructor(options?: ParserOptions);

    parseFuncFromString(
      str: string,
      handler?: ParseFuncFromStringHandler
    ): void;

    parseFuncFromString(
      str: string,
      options?: ParseFuncFromStringOptions,
      handler?: ParseFuncFromStringHandler
    ): void;

    parseAttrFromString(
      str: string,
      handler?: ParseAttrFromStringHandler
    ): void;

    parseAttrFromString(
      str: string,
      options?: ParseAttrFromStringOptions,
      handler?: ParseAttrFromStringHandler
    ): void;

    parseTransFromString(
      str: string,
      handler?: ParseTransFromStringHandler
    ): void;

    parseTransFromString(
      str: string,
      options?: ParseTransFromStringOptions,
      handler?: ParseTransFromStringHandler
    ): void;

    set(key: string, value?: string): void;

    get(options?: { sort?: boolean }): ResourceStore;
    get(key: string, options?: { lng: string }): string;

    formatResourceSavePath(lng: string, ns: string): string;
  }
}
