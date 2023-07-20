import path from 'path';

import createDebugger from 'debug';
import vfs from 'vinyl-fs';
import { Plugin } from 'vite';

import { Scanner } from './scanner';
import { ScannerOptions } from './types';

function isSourceFile(filename: string) {
  return /\.[tj]sx?$/.test(filename);
}

const debug = createDebugger('vite:i18n-extract:plugin');

export default function vitePluginI18nExtract(options: ScannerOptions = {}) {
  debug('Plugin initializing', { options });

  const plugin: Plugin = {
    apply: 'serve',
    name: 'vite:i18n-extract',
  };

  plugin.configureServer = function (server) {
    const rootPath = server.config.root;
    const scanner = new Scanner(rootPath);

    debug('Configure server', { rootPath });

    server.watcher.on('change', (filename) => {
      if (isSourceFile(filename)) {
        debug('File change', { filename });

        const files: string[] = [];

        Object.entries(server.watcher.getWatched()).forEach(
          ([dirname, filenames]) => {
            filenames.forEach((filename) => {
              if (isSourceFile(filename)) {
                files.push(path.join(dirname, filename));
              }
            });
          }
        );

        debug('Scan files', { files });

        vfs
          .src(files)
          .pipe(scanner.createStream(options))
          .pipe(vfs.dest(rootPath));

        debug('Done scanning files');
      }
    });
  };

  return plugin;
}
