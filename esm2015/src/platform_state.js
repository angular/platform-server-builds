/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { serializeDocument } from './domino_adapter';
/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
let PlatformState = /** @class */ (() => {
    let PlatformState = class PlatformState {
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
    };
    PlatformState = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], PlatformState);
    return PlatformState;
})();
export { PlatformState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQ7Ozs7R0FJRztBQUVIO0lBQUEsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtRQUN4QixZQUFzQyxJQUFTO1lBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFHLENBQUM7UUFFbkQ7O1dBRUc7UUFDSCxjQUFjO1lBQ1osT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVEOztXQUVHO1FBQ0gsV0FBVztZQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO0tBQ0YsQ0FBQTtJQWhCWSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQUVFLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBOztPQURsQixhQUFhLENBZ0J6QjtJQUFELG9CQUFDO0tBQUE7U0FoQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge3NlcmlhbGl6ZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybSBzdGF0ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVN0YXRlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBsYXRmb3JtIHRvIHN0cmluZy5cbiAgICovXG4gIHJlbmRlclRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZURvY3VtZW50KHRoaXMuX2RvYyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBET00gc3RhdGUuXG4gICAqL1xuICBnZXREb2N1bWVudCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kb2M7XG4gIH1cbn1cbiJdfQ==