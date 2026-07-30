/// <reference path="./quill-image-resize-module.d.ts" />
import Quill from 'quill';

// Depending on how the consumer's bundler resolves this CommonJS
// package, the real ImageResize class can end up nested behind one or
// more `.default` layers. Walk them until we find the constructor.
function unwrapImageResizeCtor(mod: any): any {
  while (mod && typeof mod !== 'function' && 'default' in mod) {
    mod = mod.default;
  }
  return mod;
}

let imageResizeReady: Promise<void> | null = null;

// quill-image-resize-module's Toolbar submodule reads
// `window.Quill.imports.parchment` as soon as it's loaded, since it
// assumes Quill is loaded as a global (e.g. via a <script> tag).
//
// A static `import` of that package would get hoisted above this
// file's own code once a bundler flattens everything into one module
// (e.g. an FESM bundle) — ES module imports are always fully resolved
// before any local top-level statement runs, so `window.Quill = Quill`
// would end up executing too late no matter where it's written.
//
// A dynamic `import()` isn't subject to that hoisting: it runs exactly
// where it's called, so we can guarantee `window.Quill` is set first.
export function ensureImageResizeRegistered(): Promise<void> {
  if (!imageResizeReady) {
    (window as any).Quill = Quill;
    imageResizeReady = import('quill-image-resize-module').then((mod) => {
      Quill.register('modules/imageResize', unwrapImageResizeCtor(mod));
    });
  }
  return imageResizeReady;
}
