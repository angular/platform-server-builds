/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ parse5 = require('parse5');
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { getDOM } from './private_import_platform-browser';
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
var PlatformState = (function () {
    /**
     * @param {?} _doc
     */
    function PlatformState(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    PlatformState.prototype.renderToString = function () { return getDOM().getInnerHTML(this._doc); };
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    PlatformState.prototype.getDocument = function () { return this._doc; };
    return PlatformState;
}());
export { PlatformState };
PlatformState.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformState.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };
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