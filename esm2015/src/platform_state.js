/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { serializeDocument } from './domino_adapter';
import * as i0 from "@angular/core";
/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
let PlatformState = /** @class */ (() => {
    class PlatformState {
        constructor(_doc) {
            this._doc = _doc;
        }
        /**
         * Renders the current state of the platform to string.
         */
        renderToString() {
            return serializeDocument(this._doc);
        }
        /**
         * Returns the current DOM state.
         */
        getDocument() {
            return this._doc;
        }
    }
    PlatformState.ɵfac = function PlatformState_Factory(t) { return new (t || PlatformState)(i0.ɵɵinject(DOCUMENT)); };
    PlatformState.ɵprov = i0.ɵɵdefineInjectable({ token: PlatformState, factory: PlatformState.ɵfac });
    return PlatformState;
})();
export { PlatformState };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PlatformState, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFbkQ7Ozs7R0FJRztBQUNIO0lBQUEsTUFDYSxhQUFhO1FBQ3hCLFlBQXNDLElBQVM7WUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQUcsQ0FBQztRQUVuRDs7V0FFRztRQUNILGNBQWM7WUFDWixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7O1dBRUc7UUFDSCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7OzhFQWZVLGFBQWEsY0FDSixRQUFRO3lEQURqQixhQUFhLFdBQWIsYUFBYTt3QkFuQjFCO0tBbUNDO1NBaEJZLGFBQWE7a0RBQWIsYUFBYTtjQUR6QixVQUFVOztzQkFFSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7c2VyaWFsaXplRG9jdW1lbnR9IGZyb20gJy4vZG9taW5vX2FkYXB0ZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IHBsYXRmb3JtIHN0YXRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtU3RhdGUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge31cblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcGxhdGZvcm0gdG8gc3RyaW5nLlxuICAgKi9cbiAgcmVuZGVyVG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc2VyaWFsaXplRG9jdW1lbnQodGhpcy5fZG9jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IERPTSBzdGF0ZS5cbiAgICovXG4gIGdldERvY3VtZW50KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2RvYztcbiAgfVxufVxuIl19