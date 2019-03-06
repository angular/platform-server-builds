import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID, ɵgetDOM as getDOM } from '@angular/platform-browser';
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
    ServerStylesHost.ngInjectableDef = i0.defineInjectable({ token: ServerStylesHost, factory: function ServerStylesHost_Factory(t) { return new (t || ServerStylesHost)(i0.inject(DOCUMENT), i0.inject(ɵTRANSITION_ID, 8)); }, providedIn: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWlCLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxRQUFRLEVBQTZCLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRXhKO0lBQ3NDLDRDQUFnQjtJQUdwRCwwQkFDOEIsR0FBUSxFQUNVLFlBQW9CO1FBRnBFLFlBR0UsaUJBQU8sU0FFUjtRQUo2QixTQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1Usa0JBQVksR0FBWixZQUFZLENBQVE7UUFKNUQsVUFBSSxHQUFRLElBQUksQ0FBQztRQU12QixLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDNUQsQ0FBQztJQUVPLG9DQUFTLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxTQUFzQjtRQUFwQyxpQkFBNEY7UUFBcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUFDLENBQUM7b0VBcEJqRixnQkFBZ0IsbUVBQWhCLGdCQUFnQixZQUlmLFFBQVEsYUFDSSxjQUFjOzJCQWpCeEM7Q0FpQ0MsQUF0QkQsQ0FDc0MsZ0JBQWdCLEdBcUJyRDtTQXJCWSxnQkFBZ0I7bUNBQWhCLGdCQUFnQjtjQUQ1QixVQUFVOztzQkFLSixNQUFNO3VCQUFDLFFBQVE7O3NCQUNmLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCDJtURvbUFkYXB0ZXIgYXMgRG9tQWRhcHRlciwgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1VFJBTlNJVElPTl9JRCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgcHJpdmF0ZSBoZWFkOiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoybVUUkFOU0lUSU9OX0lEKSBwcml2YXRlIHRyYW5zaXRpb25JZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmhlYWQgPSBnZXRET00oKS5nZXRFbGVtZW50c0J5VGFnTmFtZShkb2MsICdoZWFkJylbMF07XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZShzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGFkYXB0ZXIgPSBnZXRET00oKTtcbiAgICBjb25zdCBlbCA9IGFkYXB0ZXIuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBhZGFwdGVyLnNldFRleHQoZWwsIHN0eWxlKTtcbiAgICBpZiAoISF0aGlzLnRyYW5zaXRpb25JZCkge1xuICAgICAgYWRhcHRlci5zZXRBdHRyaWJ1dGUoZWwsICduZy10cmFuc2l0aW9uJywgdGhpcy50cmFuc2l0aW9uSWQpO1xuICAgIH1cbiAgICBhZGFwdGVyLmFwcGVuZENoaWxkKHRoaXMuaGVhZCwgZWwpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KSB7IGFkZGl0aW9ucy5mb3JFYWNoKHN0eWxlID0+IHRoaXMuX2FkZFN0eWxlKHN0eWxlKSk7IH1cbn1cbiJdfQ==