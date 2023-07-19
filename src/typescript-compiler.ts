import { dirname } from "path";

import * as ts from "typescript";

export class TypescriptCompiler {
  private config?: ts.ParsedCommandLine;

  set rootPath(path: string) {
    const tsconfigPath = ts.findConfigFile(
      path,
      ts.sys.fileExists,
      "tsconfig.json"
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

  transpile(code: string) {
    if (this.config) {
      const result = ts.transpileModule(code, {
        compilerOptions: { ...this.config.options, jsx: ts.JsxEmit.Preserve },
      });

      return result.outputText;
    }

    return code;
  }
}
