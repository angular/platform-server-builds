/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/platform_state.ts
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
let PlatformState = /** @class */ (() => {
    /**
     * Representation of the current platform state.
     *
     * \@publicApi
     */
    class PlatformState {
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
        renderToString() {
            return serializeDocument(this._doc);
        }
        /**
         * Returns the current DOM state.
         * @return {?}
         */
        getDocument() {
            return this._doc;
        }
    }
    PlatformState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PlatformState.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    /** @nocollapse */ PlatformState.ɵfac = function PlatformState_Factory(t) { return new (t || PlatformState)(i0.ɵɵinject(DOCUMENT)); };
    /** @nocollapse */ PlatformState.ɵprov = i0.ɵɵdefineInjectable({ token: PlatformState, factory: PlatformState.ɵfac });
    return PlatformState;
})();
export { PlatformState };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PlatformState, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlatformState.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7OztBQU9uRDs7Ozs7O0lBQUEsTUFDYSxhQUFhOzs7O1FBQ3hCLFlBQXNDLElBQVM7WUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQUcsQ0FBQzs7Ozs7UUFLbkQsY0FBYztZQUNaLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7Ozs7O1FBS0QsV0FBVztZQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7Z0JBaEJGLFVBQVU7Ozs7Z0RBRUksTUFBTSxTQUFDLFFBQVE7O2lHQURqQixhQUFhLGNBQ0osUUFBUTs0RUFEakIsYUFBYSxXQUFiLGFBQWE7d0JBbkIxQjtLQW1DQztTQWhCWSxhQUFhO2tEQUFiLGFBQWE7Y0FEekIsVUFBVTs7c0JBRUksTUFBTTt1QkFBQyxRQUFROzs7Ozs7O0lBQWhCLDZCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtzZXJpYWxpemVEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm0gc3RhdGUuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1TdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBwbGF0Zm9ybSB0byBzdHJpbmcuXG4gICAqL1xuICByZW5kZXJUb1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBzZXJpYWxpemVEb2N1bWVudCh0aGlzLl9kb2MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgRE9NIHN0YXRlLlxuICAgKi9cbiAgZ2V0RG9jdW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZG9jO1xuICB9XG59XG4iXX0=