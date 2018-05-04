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
 * @experimental
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
       */
    PlatformState.prototype.renderToString = /**
       * Renders the current state of the platform to string.
       */
    function () { return serializeDocument(this._doc); };
    /**
     * Returns the current DOM state.
     */
    /**
       * Returns the current DOM state.
       */
    PlatformState.prototype.getDocument = /**
       * Returns the current DOM state.
       */
    function () { return this._doc; };
    PlatformState.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlatformState.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return PlatformState;
}());
export { PlatformState };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsUUFBUSxFQUFvQixNQUFNLDJCQUEyQixDQUFDO0FBRXRFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0lBU2pELHVCQUFzQztRQUFBLFNBQUksR0FBSixJQUFJO0tBQVM7SUFFbkQ7O09BRUc7Ozs7SUFDSCxzQ0FBYzs7O0lBQWQsY0FBMkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBRWpFOztPQUVHOzs7O0lBQ0gsbUNBQVc7OztJQUFYLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7O2dCQVp6QyxVQUFVOzs7O2dEQUVJLE1BQU0sU0FBQyxRQUFROzt3QkFwQjlCOztTQW1CYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge3NlcmlhbGl6ZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybSBzdGF0ZS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVN0YXRlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBsYXRmb3JtIHRvIHN0cmluZy5cbiAgICovXG4gIHJlbmRlclRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVEb2N1bWVudCh0aGlzLl9kb2MpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgRE9NIHN0YXRlLlxuICAgKi9cbiAgZ2V0RG9jdW1lbnQoKTogYW55IHsgcmV0dXJuIHRoaXMuX2RvYzsgfVxufVxuIl19