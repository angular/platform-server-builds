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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWlCLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxRQUFRLEVBQTZCLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRXhKO0lBQ3NDLDRDQUFnQjtJQUdwRCwwQkFDOEIsR0FBUSxFQUNVLFlBQW9CO1FBRnBFLFlBR0UsaUJBQU8sU0FFUjtRQUo2QixTQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1Usa0JBQVksR0FBWixZQUFZLENBQVE7UUFKNUQsVUFBSSxHQUFRLElBQUksQ0FBQztRQU12QixLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDNUQsQ0FBQztJQUVPLG9DQUFTLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxTQUFzQjtRQUFwQyxpQkFBNEY7UUFBcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUFDLENBQUM7b0VBcEJqRixnQkFBZ0IsbUVBQWhCLGdCQUFnQixZQUlmLFFBQVEsYUFDSSxjQUFjOzJCQWpCeEM7Q0FpQ0MsQUF0QkQsQ0FDc0MsZ0JBQWdCLEdBcUJyRDtTQXJCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVCwgybVEb21BZGFwdGVyIGFzIERvbUFkYXB0ZXIsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtVRSQU5TSVRJT05fSUQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIHByaXZhdGUgaGVhZDogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KMm1VFJBTlNJVElPTl9JRCkgcHJpdmF0ZSB0cmFuc2l0aW9uSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5oZWFkID0gZ2V0RE9NKCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZG9jLCAnaGVhZCcpWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGUoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBhZGFwdGVyID0gZ2V0RE9NKCk7XG4gICAgY29uc3QgZWwgPSBhZGFwdGVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYWRhcHRlci5zZXRUZXh0KGVsLCBzdHlsZSk7XG4gICAgaWYgKCEhdGhpcy50cmFuc2l0aW9uSWQpIHtcbiAgICAgIGFkYXB0ZXIuc2V0QXR0cmlidXRlKGVsLCAnbmctdHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbklkKTtcbiAgICB9XG4gICAgYWRhcHRlci5hcHBlbmRDaGlsZCh0aGlzLmhlYWQsIGVsKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPikgeyBhZGRpdGlvbnMuZm9yRWFjaChzdHlsZSA9PiB0aGlzLl9hZGRTdHlsZShzdHlsZSkpOyB9XG59XG4iXX0=