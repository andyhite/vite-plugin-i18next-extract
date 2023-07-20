import { I18nextScannerOptions } from 'i18next-scanner';

export interface ScannerOptions extends I18nextScannerOptions {
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
      sourceType?: 'module' | 'script';
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
