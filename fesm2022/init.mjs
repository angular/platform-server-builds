/**
 * @license Angular v17.0.0-next.7+sha-21b085d
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵsetDomTypes } from '@angular/platform-server';

/**
 * Apply the necessary shims to make DOM globals (such as `Element`, `HTMLElement`, etc.) available
 * on the environment.
 */
function applyShims() {
    ɵsetDomTypes();
}

/**
 * @module
 * @description
 * Entry point for all initialization APIs of the platform-server package.
 */
applyShims();

/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */
//# sourceMappingURL=init.mjs.map
