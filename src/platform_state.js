/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ parse5 = require('parse5');
import { Injectable, Inject } from '@angular/core/index';
import { DOCUMENT } from '@angular/platform-browser/index';
import { getDOM } from './private_import_platform-browser';
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
export class PlatformState {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    renderToString() { return getDOM().getInnerHTML(this._doc); }
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    getDocument() { return this._doc; }
}
PlatformState.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformState.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
function PlatformState_tsickle_Closure_declarations() {
    /** @type {?} */
    PlatformState.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PlatformState.ctorParameters;
    /** @type {?} */
    PlatformState.prototype._doc;
}
//# sourceMappingURL=platform_state.js.map