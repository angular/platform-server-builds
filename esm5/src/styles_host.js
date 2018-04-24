/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID, ɵgetDOM as getDOM } from '@angular/platform-browser';
var ServerStylesHost = /** @class */ (function (_super) {
    tslib_1.__extends(ServerStylesHost, _super);
    function ServerStylesHost(doc, transitionId) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.transitionId = transitionId;
        _this.head = null;
        _this.head = getDOM().getElementsByTagName(doc, 'head')[0];
        return _this;
    }
    ServerStylesHost.prototype._addStyle = function (style) {
        var adapter = getDOM();
        var el = adapter.createElement('style');
        adapter.setText(el, style);
        if (!!this.transitionId) {
            adapter.setAttribute(el, 'ng-transition', this.transitionId);
        }
        adapter.appendChild(this.head, el);
    };
    ServerStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        additions.forEach(function (style) { return _this._addStyle(style); });
    };
    ServerStylesHost.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ServerStylesHost.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] },] },
    ]; };
    return ServerStylesHost;
}(SharedStylesHost));
export { ServerStylesHost };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFpQixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsUUFBUSxFQUE2QixpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDOztJQUdsSCw0Q0FBZ0I7SUFHcEQsMEJBQzhCLEtBQ2tCO1FBRmhELFlBR0UsaUJBQU8sU0FFUjtRQUo2QixTQUFHLEdBQUgsR0FBRztRQUNlLGtCQUFZLEdBQVosWUFBWTtxQkFKeEMsSUFBSTtRQU10QixLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7S0FDM0Q7SUFFTyxvQ0FBUyxHQUFqQixVQUFrQixLQUFhO1FBQzdCLElBQUksT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDcEM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBc0I7UUFBcEMsaUJBQTRGO1FBQXBELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7S0FBRTs7Z0JBckI3RixVQUFVOzs7O2dEQUtKLE1BQU0sU0FBQyxRQUFRO2dEQUNmLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs7MkJBakJ4QztFQVlzQyxnQkFBZ0I7U0FBekMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIMm1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdCwgybVUUkFOU0lUSU9OX0lELCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICBwcml2YXRlIGhlYWQ6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdCjJtVRSQU5TSVRJT05fSUQpIHByaXZhdGUgdHJhbnNpdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGVhZCA9IGdldERPTSgpLmdldEVsZW1lbnRzQnlUYWdOYW1lKGRvYywgJ2hlYWQnKVswXTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYWRhcHRlciA9IGdldERPTSgpO1xuICAgIGNvbnN0IGVsID0gYWRhcHRlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGFkYXB0ZXIuc2V0VGV4dChlbCwgc3R5bGUpO1xuICAgIGlmICghIXRoaXMudHJhbnNpdGlvbklkKSB7XG4gICAgICBhZGFwdGVyLnNldEF0dHJpYnV0ZShlbCwgJ25nLXRyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb25JZCk7XG4gICAgfVxuICAgIGFkYXB0ZXIuYXBwZW5kQ2hpbGQodGhpcy5oZWFkLCBlbCk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pIHsgYWRkaXRpb25zLmZvckVhY2goc3R5bGUgPT4gdGhpcy5fYWRkU3R5bGUoc3R5bGUpKTsgfVxufVxuIl19