import fs from 'fs';
import { dirname } from 'path';

import ts from 'typescript';

export class Compiler {
  private config?: ts.ParsedCommandLine;

  constructor(rootPath: string) {
    const tsconfigPath = ts.findConfigFile(
      rootPath,
      ts.sys.fileExists,
      'tsconfig.json'
    );

    if (tsconfigPath) {
      const tsconfigFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

      this.config = ts.parseJsonConfigFileContent(
        tsconfigFile.config,
        ts.sys,
        dirname(tsconfigPath)
      );
    }
  }

  transpile(path: string, encoding: BufferEncoding) {
    const code = fs.readFileSync(path, encoding);

    if (this.config) {
      const result = ts.transpileModule(code, {
        compilerOptions: { ...this.config.options, jsx: ts.JsxEmit.Preserve },
      });

      return result.outputText;
    }

    return code;
  }
}
