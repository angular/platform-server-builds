/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { serializeDocument } from './domino_adapter';
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
var PlatformState = /** @class */ (function () {
    function PlatformState(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     */
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    PlatformState.prototype.renderToString = /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    function () { return serializeDocument(this._doc); };
    /**
     * Returns the current DOM state.
     */
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    PlatformState.prototype.getDocument = /**
     * Returns the current DOM state.
     * @return {?}
     */
    function () { return this._doc; };
    PlatformState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PlatformState.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return PlatformState;
}());
export { PlatformState };
function PlatformState_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PlatformState.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PlatformState.ctorParameters;
    /** @type {?} */
    PlatformState.prototype._doc;
}
//# sourceMappingURL=platform_state.js.map