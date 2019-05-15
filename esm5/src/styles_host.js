import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID, ɵgetDOM as getDOM } from '@angular/platform-browser';
import * as i0 from "@angular/core";
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
    ServerStylesHost.ngInjectableDef = i0.ΔdefineInjectable({ token: ServerStylesHost, factory: function ServerStylesHost_Factory(t) { return new (t || ServerStylesHost)(i0.Δinject(DOCUMENT), i0.Δinject(ɵTRANSITION_ID, 8)); }, providedIn: null });
    return ServerStylesHost;
}(SharedStylesHost));
export { ServerStylesHost };
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [ɵTRANSITION_ID]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUVuSDtJQUNzQyw0Q0FBZ0I7SUFHcEQsMEJBQzhCLEdBQVEsRUFDVSxZQUFvQjtRQUZwRSxZQUdFLGlCQUFPLFNBRVI7UUFKNkIsU0FBRyxHQUFILEdBQUcsQ0FBSztRQUNVLGtCQUFZLEdBQVosWUFBWSxDQUFRO1FBSjVELFVBQUksR0FBUSxJQUFJLENBQUM7UUFNdkIsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBQzVELENBQUM7SUFFTyxvQ0FBUyxHQUFqQixVQUFrQixLQUFhO1FBQzdCLElBQUksT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBc0I7UUFBcEMsaUJBQTRGO1FBQXBELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFBQyxDQUFDO3FFQXBCakYsZ0JBQWdCLG1FQUFoQixnQkFBZ0IsYUFJZixRQUFRLGNBQ0ksY0FBYzsyQkFsQnhDO0NBa0NDLEFBdEJELENBQ3NDLGdCQUFnQixHQXFCckQ7U0FyQlksZ0JBQWdCO21DQUFoQixnQkFBZ0I7Y0FENUIsVUFBVTs7c0JBS0osTUFBTTt1QkFBQyxRQUFROztzQkFDZixRQUFROztzQkFBSSxNQUFNO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdCwgybVUUkFOU0lUSU9OX0lELCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICBwcml2YXRlIGhlYWQ6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdCjJtVRSQU5TSVRJT05fSUQpIHByaXZhdGUgdHJhbnNpdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGVhZCA9IGdldERPTSgpLmdldEVsZW1lbnRzQnlUYWdOYW1lKGRvYywgJ2hlYWQnKVswXTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYWRhcHRlciA9IGdldERPTSgpO1xuICAgIGNvbnN0IGVsID0gYWRhcHRlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGFkYXB0ZXIuc2V0VGV4dChlbCwgc3R5bGUpO1xuICAgIGlmICghIXRoaXMudHJhbnNpdGlvbklkKSB7XG4gICAgICBhZGFwdGVyLnNldEF0dHJpYnV0ZShlbCwgJ25nLXRyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb25JZCk7XG4gICAgfVxuICAgIGFkYXB0ZXIuYXBwZW5kQ2hpbGQodGhpcy5oZWFkLCBlbCk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pIHsgYWRkaXRpb25zLmZvckVhY2goc3R5bGUgPT4gdGhpcy5fYWRkU3R5bGUoc3R5bGUpKTsgfVxufVxuIl19