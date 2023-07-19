import fs from "fs";

import { Plugin } from "vite";

import {
  ResourceExtractor,
  ResourceExtractorOptions,
} from "./resource-extractor";

export default function vitePluginI18nExtract(
  options: ResourceExtractorOptions = {}
) {
  const extractor = new ResourceExtractor(options);

  const plugin: Plugin = {
    name: "vite:i18n-scanner",
  };

  plugin.configResolved = function (config) {
    extractor.rootPath = config.root;
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
