/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __extends, __metadata, __param } from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID } from '@angular/platform-browser';
var ServerStylesHost = /** @class */ (function (_super) {
    __extends(ServerStylesHost, _super);
    function ServerStylesHost(doc, transitionId) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.transitionId = transitionId;
        _this.head = null;
        _this.head = doc.getElementsByTagName('head')[0];
        return _this;
    }
    ServerStylesHost.prototype._addStyle = function (style) {
        var adapter = getDOM();
        var el = adapter.createElement('style');
        el.textContent = style;
        if (!!this.transitionId) {
            el.setAttribute('ng-transition', this.transitionId);
        }
        this.head.appendChild(el);
    };
    ServerStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        additions.forEach(function (style) { return _this._addStyle(style); });
    };
    ServerStylesHost = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __param(1, Optional()), __param(1, Inject(ɵTRANSITION_ID)),
        __metadata("design:paramtypes", [Object, String])
    ], ServerStylesHost);
    return ServerStylesHost;
}(SharedStylesHost));
export { ServerStylesHost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR2hHO0lBQXNDLG9DQUFnQjtJQUdwRCwwQkFDOEIsR0FBUSxFQUNVLFlBQW9CO1FBRnBFLFlBR0UsaUJBQU8sU0FFUjtRQUo2QixTQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1Usa0JBQVksR0FBWixZQUFZLENBQVE7UUFKNUQsVUFBSSxHQUFRLElBQUksQ0FBQztRQU12QixLQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDbEQsQ0FBQztJQUVPLG9DQUFTLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBc0I7UUFBcEMsaUJBQTRGO1FBQXBELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFBQyxDQUFDO0lBcEJqRixnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO1FBS04sV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEIsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBOztPQUw1QixnQkFBZ0IsQ0FxQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXJCRCxDQUFzQyxnQkFBZ0IsR0FxQnJEO1NBckJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIHByaXZhdGUgaGVhZDogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KMm1VFJBTlNJVElPTl9JRCkgcHJpdmF0ZSB0cmFuc2l0aW9uSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5oZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZShzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGFkYXB0ZXIgPSBnZXRET00oKTtcbiAgICBjb25zdCBlbCA9IGFkYXB0ZXIuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBlbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgIGlmICghIXRoaXMudHJhbnNpdGlvbklkKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ25nLXRyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb25JZCk7XG4gICAgfVxuICAgIHRoaXMuaGVhZC5hcHBlbmRDaGlsZChlbCk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pIHsgYWRkaXRpb25zLmZvckVhY2goc3R5bGUgPT4gdGhpcy5fYWRkU3R5bGUoc3R5bGUpKTsgfVxufVxuIl19