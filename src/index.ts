import fs from "fs";

import { Plugin } from "vite";

import {
  ResourceExtractor,
  ResourceExtractorOptions,
} from "./resource-extractor";
import { TypescriptCompiler } from "./typescript-compiler";

export default function vitePluginI18nExtract(
  options: ResourceExtractorOptions = {}
) {
  const plugin: Plugin = {
    name: "vite:i18n-scanner",
  };

  const compiler = new TypescriptCompiler();
  const extractor = new ResourceExtractor(compiler, options);

  plugin.configResolved = function (config) {
    extractor.rootPath = config.root;
    compiler.rootPath = config.root;
  };

  plugin.transform = function (code, id) {
    if (id.includes("/node_modules/")) return;

    extractor.extractBundle(code).forEach((resource) => {
      fs.writeFileSync(resource.path, resource.contents);
    });

    return { code };
  };

  return plugin;
}
