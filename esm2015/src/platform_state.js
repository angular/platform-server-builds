/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { serializeDocument } from './domino_adapter';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Representation of the current platform state.
 *
 * \@publicApi
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
    renderToString() { return serializeDocument(this._doc); }
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
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ PlatformState.ɵfac = function PlatformState_Factory(t) { return new (t || PlatformState)(i0.ɵɵinject(DOCUMENT)); };
/** @nocollapse */ PlatformState.ngInjectableDef = i0.ɵɵdefineInjectable({ token: PlatformState, factory: function (t) { return PlatformState.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(PlatformState, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlatformState.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBUW5ELE1BQU0sT0FBTyxhQUFhOzs7O0lBQ3hCLFlBQXNDLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUcsQ0FBQzs7Ozs7SUFLbkQsY0FBYyxLQUFhLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFLakUsV0FBVyxLQUFVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztZQVp6QyxVQUFVOzs7OzRDQUVJLE1BQU0sU0FBQyxRQUFROzswRUFEakIsYUFBYSxjQUNKLFFBQVE7K0RBRGpCLGFBQWEsaUNBQWIsYUFBYTttQ0FBYixhQUFhO2NBRHpCLFVBQVU7O3NCQUVJLE1BQU07dUJBQUMsUUFBUTs7Ozs7OztJQUFoQiw2QkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7c2VyaWFsaXplRG9jdW1lbnR9IGZyb20gJy4vZG9taW5vX2FkYXB0ZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IHBsYXRmb3JtIHN0YXRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtU3RhdGUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge31cblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcGxhdGZvcm0gdG8gc3RyaW5nLlxuICAgKi9cbiAgcmVuZGVyVG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHNlcmlhbGl6ZURvY3VtZW50KHRoaXMuX2RvYyk7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBET00gc3RhdGUuXG4gICAqL1xuICBnZXREb2N1bWVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5fZG9jOyB9XG59XG4iXX0=