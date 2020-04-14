/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/styles_host.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class ServerStylesHost extends SharedStylesHost {
    /**
     * @param {?} doc
     * @param {?} transitionId
     */
    constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this.head = doc.getElementsByTagName('head')[0];
    }
    /**
     * @private
     * @param {?} style
     * @return {?}
     */
    _addStyle(style) {
        /** @type {?} */
        let adapter = getDOM();
        /** @type {?} */
        const el = adapter.createElement('style');
        el.textContent = style;
        if (!!this.transitionId) {
            el.setAttribute('ng-transition', this.transitionId);
        }
        this.head.appendChild(el);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) {
        additions.forEach((/**
         * @param {?} style
         * @return {?}
         */
        style => this._addStyle(style)));
    }
}
ServerStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] }] }
];
/** @nocollapse */ ServerStylesHost.ɵfac = function ServerStylesHost_Factory(t) { return new (t || ServerStylesHost)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(ɵTRANSITION_ID, 8)); };
/** @nocollapse */ ServerStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: ServerStylesHost, factory: ServerStylesHost.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [ɵTRANSITION_ID]
            }] }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServerStylesHost.prototype.head;
    /**
     * @type {?}
     * @private
     */
    ServerStylesHost.prototype.doc;
    /**
     * @type {?}
     * @private
     */
    ServerStylesHost.prototype.transitionId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7O0FBR2hHLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxnQkFBZ0I7Ozs7O0lBR3BELFlBQzhCLEdBQVEsRUFDVSxZQUFvQjtRQUNsRSxLQUFLLEVBQUUsQ0FBQztRQUZvQixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1UsaUJBQVksR0FBWixZQUFZLENBQVE7UUFKNUQsU0FBSSxHQUFRLElBQUksQ0FBQztRQU12QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFFTyxTQUFTLENBQUMsS0FBYTs7WUFDekIsT0FBTyxHQUFHLE1BQU0sRUFBRTs7Y0FDaEIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdkIsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsU0FBc0I7UUFDbEMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztJQUNwRCxDQUFDOzs7WUF2QkYsVUFBVTs7Ozs0Q0FLSixNQUFNLFNBQUMsUUFBUTt5Q0FDZixRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7O21HQUwzQixnQkFBZ0IsY0FJZixRQUFRLGVBQ0ksY0FBYzsyRUFMM0IsZ0JBQWdCLFdBQWhCLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O3NCQUtKLE1BQU07dUJBQUMsUUFBUTs7c0JBQ2YsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxjQUFjOzs7Ozs7O0lBSnRDLGdDQUF5Qjs7Ozs7SUFHckIsK0JBQWtDOzs7OztJQUNsQyx3Q0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtVRSQU5TSVRJT05fSUR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICBwcml2YXRlIGhlYWQ6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdCjJtVRSQU5TSVRJT05fSUQpIHByaXZhdGUgdHJhbnNpdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGUoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBhZGFwdGVyID0gZ2V0RE9NKCk7XG4gICAgY29uc3QgZWwgPSBhZGFwdGVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZWwudGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICBpZiAoISF0aGlzLnRyYW5zaXRpb25JZCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCduZy10cmFuc2l0aW9uJywgdGhpcy50cmFuc2l0aW9uSWQpO1xuICAgIH1cbiAgICB0aGlzLmhlYWQuYXBwZW5kQ2hpbGQoZWwpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KSB7XG4gICAgYWRkaXRpb25zLmZvckVhY2goc3R5bGUgPT4gdGhpcy5fYWRkU3R5bGUoc3R5bGUpKTtcbiAgfVxufVxuIl19