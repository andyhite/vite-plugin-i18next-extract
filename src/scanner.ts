import createDebugger from 'debug';
import {
  CustomTransformFn,
  I18nextScannerOptions,
  createStream,
} from 'i18next-scanner';

import { Compiler } from './compiler';
import { ScannerOptions } from './types';

const debug = createDebugger('vite:i18n-extract:scanner');

export class Scanner {
  private compiler: Compiler;

  constructor(rootPath: string) {
    debug('Initializing', { rootPath });
    this.compiler = new Compiler(rootPath);
  }

  createStream(options: ScannerOptions) {
    debug('Create stream', { options });
    return createStream(this.mergeOptions(options), this.createTransform());
  }

  createTransform(): CustomTransformFn {
    const compiler = this.compiler;

    return function (this, file, encoding, done) {
      debug('Transpiling', { encoding, path: file.path });

      const code = compiler.transpile(file.path, encoding);

      const parserOptions = {
        transformOptions: {
          filepath: file.path,
        },
      };

      this.parser.parseAttrFromString(code, parserOptions, (key) => {
        debug('Parsed attribute', { key });
        this.parser.set(key, key);
      });

      this.parser.parseFuncFromString(code, parserOptions, (key) => {
        debug('Parsed function', { key });
        this.parser.set(key, key);
      });

      this.parser.parseTransFromString(
        code,
        {
          fallbackKey: (_ns, value) => value,
          ...parserOptions,
        },
        (key) => {
          debug('Parsed Trans', { key });
        }
      );

      done();
    };
  }

  private mergeOptions(options: ScannerOptions): I18nextScannerOptions {
    options = {
      removeUnusedKeys: true,
      sort: true,
      ...options,
      func: {
        list: options.func?.list ?? ['i18next.t', 'i18n.t', 't'],
        ...options.func,
      },
      resource: {
        loadPath: 'public/locales/{{lng}}/{{ns}}.json',
        savePath: 'public/locales/{{lng}}/{{ns}}.json',
        ...options.resource,
      },
    };

    debug('Merged options', { options });

    return options;
  }
}
