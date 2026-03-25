/**
 * @license Angular v22.0.0-next.4+sha-f187d23
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
