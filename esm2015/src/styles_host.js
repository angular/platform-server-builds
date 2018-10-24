import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID, ɵgetDOM as getDOM } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        this.head = getDOM().getElementsByTagName(doc, 'head')[0];
    }
    /**
     * @param {?} style
     * @return {?}
     */
    _addStyle(style) {
        /** @type {?} */
        let adapter = getDOM();
        /** @type {?} */
        const el = adapter.createElement('style');
        adapter.setText(el, style);
        if (!!this.transitionId) {
            adapter.setAttribute(el, 'ng-transition', this.transitionId);
        }
        adapter.appendChild(this.head, el);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) { additions.forEach(style => this._addStyle(style)); }
}
ServerStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] }] }
];
ServerStylesHost.ngInjectableDef = i0.defineInjectable({ token: ServerStylesHost, factory: function ServerStylesHost_Factory(t) { return new (t || ServerStylesHost)(i0.inject(DOCUMENT), i0.inject(ɵTRANSITION_ID, 8)); }, providedIn: null });
if (false) {
    /** @type {?} */
    ServerStylesHost.prototype.head;
    /** @type {?} */
    ServerStylesHost.prototype.doc;
    /** @type {?} */
    ServerStylesHost.prototype.transitionId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBaUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLFFBQVEsRUFBNkIsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUd4SixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZ0JBQWdCOzs7OztJQUdwRCxZQUM4QixHQUFRLEVBQ1UsWUFBb0I7UUFDbEUsS0FBSyxFQUFFLENBQUM7UUFGb0IsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNVLGlCQUFZLEdBQVosWUFBWSxDQUFRO29CQUpoRCxJQUFJO1FBTXRCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNEOzs7OztJQUVPLFNBQVMsQ0FBQyxLQUFhOztRQUM3QixJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQzs7UUFDdkIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7OztJQUdyQyxhQUFhLENBQUMsU0FBc0IsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7OztZQXJCN0YsVUFBVTs7Ozs0Q0FLSixNQUFNLFNBQUMsUUFBUTt5Q0FDZixRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7O2dFQUwzQixnQkFBZ0IsbUVBQWhCLGdCQUFnQixZQUlmLFFBQVEsYUFDSSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIMm1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdCwgybVUUkFOU0lUSU9OX0lELCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICBwcml2YXRlIGhlYWQ6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdCjJtVRSQU5TSVRJT05fSUQpIHByaXZhdGUgdHJhbnNpdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGVhZCA9IGdldERPTSgpLmdldEVsZW1lbnRzQnlUYWdOYW1lKGRvYywgJ2hlYWQnKVswXTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYWRhcHRlciA9IGdldERPTSgpO1xuICAgIGNvbnN0IGVsID0gYWRhcHRlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGFkYXB0ZXIuc2V0VGV4dChlbCwgc3R5bGUpO1xuICAgIGlmICghIXRoaXMudHJhbnNpdGlvbklkKSB7XG4gICAgICBhZGFwdGVyLnNldEF0dHJpYnV0ZShlbCwgJ25nLXRyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb25JZCk7XG4gICAgfVxuICAgIGFkYXB0ZXIuYXBwZW5kQ2hpbGQodGhpcy5oZWFkLCBlbCk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pIHsgYWRkaXRpb25zLmZvckVhY2goc3R5bGUgPT4gdGhpcy5fYWRkU3R5bGUoc3R5bGUpKTsgfVxufVxuIl19