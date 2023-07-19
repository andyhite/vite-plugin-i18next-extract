import fs from "fs";

import { Plugin } from "vite";

import {
  ResourceExtractor,
  ResourceExtractorOptions,
} from "./resource-extractor";

export default function vitePluginI18nExtract(
  options: ResourceExtractorOptions = {}
) {
  const plugin: Plugin = {
    name: "vite:i18n-scanner",
  };

  let rootPath: string;

  plugin.configResolved = function (config) {
    rootPath = config.root;
  };

  plugin.transform = function (code, id) {
    if (id.includes("/node_modules/")) return;

    const extractor = new ResourceExtractor({ ...options, rootPath });

    extractor.extractBundle(code).forEach((resource) => {
      fs.writeFileSync(resource.path, resource.contents);
    });

    return { code };
  };

  return plugin;
}
