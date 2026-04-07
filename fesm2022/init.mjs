/**
 * @license Angular v21.2.7+sha-c9f8f3a-with-local-changes
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import domino from '../third_party/domino/bundled-domino.mjs';

function applyShims() {
  Object.assign(globalThis, domino.impl);
  globalThis['KeyboardEvent'] = domino.impl.Event;
}

applyShims();

const ɵɵmoduleMarker = true;

export { ɵɵmoduleMarker };
//# sourceMappingURL=init.mjs.map
