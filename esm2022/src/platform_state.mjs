/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1+sha-9005717", ngImport: i0, type: PlatformState, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1+sha-9005717", ngImport: i0, type: PlatformState }); }
}
export { PlatformState };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1+sha-9005717", ngImport: i0, type: PlatformState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFbkQ7Ozs7R0FJRztBQUNILE1BQ2EsYUFBYTtJQUN4QixZQUFzQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztJQUFHLENBQUM7SUFFbkQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO3lIQWZVLGFBQWEsa0JBQ0osUUFBUTs2SEFEakIsYUFBYTs7U0FBYixhQUFhO3NHQUFiLGFBQWE7a0JBRHpCLFVBQVU7OzBCQUVJLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge3NlcmlhbGl6ZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybSBzdGF0ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVN0YXRlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBsYXRmb3JtIHRvIHN0cmluZy5cbiAgICovXG4gIHJlbmRlclRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZURvY3VtZW50KHRoaXMuX2RvYyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBET00gc3RhdGUuXG4gICAqL1xuICBnZXREb2N1bWVudCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kb2M7XG4gIH1cbn1cbiJdfQ==