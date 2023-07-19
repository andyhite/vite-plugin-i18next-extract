import path from "path";

import { Parser } from "i18next-scanner";

import {
  TypescriptCompiler,
  TypescriptCompilerOptions,
} from "./typescript-compiler";

export interface ResourceExtractorOptions {
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

export class ResourceExtractor {
  private parser: Parser;
  private compiler: TypescriptCompiler;

  constructor(
    private options: ResourceExtractorOptions & TypescriptCompilerOptions
  ) {
    this.parser = new Parser({
      sort: true,
      ...options,
      removeUnusedKeys: false,
      resource: {
        loadPath: "public/locales/{{lng}}/{{ns}}.json",
        savePath: "public/locales/{{lng}}/{{ns}}.json",
        ...options.resource,
      },
      func: {
        list: options.func?.list ?? ["i18next.t", "i18n.t", "t"],
        ...options.func,
      },
    });

    this.compiler = new TypescriptCompiler(options);
  }

  transpile(code: string) {
    return this.compiler.transpile(code);
  }

  extract(code: string) {
    code = this.transpile(code);

    this.parser.parseFuncFromString(code, (key) => {
      this.parser.set(key, key);
    });

    this.parser.parseTransFromString(code, {
      fallbackKey: (_ns, value) => value,
    });

    this.parser.parseAttrFromString(code, (key) => {
      this.parser.set(key, key);
    });

    return this.parser.get({ sort: this.options.sort ?? true });
  }

  extractBundle(code: string) {
    const resources = this.extract(code);

    const files: { contents: Buffer; path: string }[] = [];

    Object.keys(resources).forEach((lng) => {
      const namespaces = resources[lng];

      Object.keys(namespaces).forEach((ns) => {
        const text = JSON.stringify(namespaces[ns], null, 2) + "\n";

        files.push({
          contents: Buffer.from(text),
          path: path.join(
            this.options.rootPath,
            this.parser.formatResourceSavePath(lng, ns)
          ),
        });
      });
    });

    return files;
  }
}
