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
    PlatformState.prototype.renderToString = function () { return serializeDocument(this._doc); };
    /**
     * Returns the current DOM state.
     */
    PlatformState.prototype.getDocument = function () { return this._doc; };
    PlatformState.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlatformState.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return PlatformState;
}());
export { PlatformState };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQW9CLE1BQU0sMkJBQTJCLENBQUM7QUFFdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQ7Ozs7R0FJRztBQUNIO0lBRUUsdUJBQXNDLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUcsQ0FBQztJQUVuRDs7T0FFRztJQUNILHNDQUFjLEdBQWQsY0FBMkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakU7O09BRUc7SUFDSCxtQ0FBVyxHQUFYLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBWnpDLFVBQVU7Ozs7Z0RBRUksTUFBTSxTQUFDLFFBQVE7O0lBVzlCLG9CQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtzZXJpYWxpemVEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm0gc3RhdGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1TdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBwbGF0Zm9ybSB0byBzdHJpbmcuXG4gICAqL1xuICByZW5kZXJUb1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gc2VyaWFsaXplRG9jdW1lbnQodGhpcy5fZG9jKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IERPTSBzdGF0ZS5cbiAgICovXG4gIGdldERvY3VtZW50KCk6IGFueSB7IHJldHVybiB0aGlzLl9kb2M7IH1cbn1cbiJdfQ==