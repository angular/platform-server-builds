/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID } from '@angular/platform-browser';
import * as i0 from "@angular/core";
let ServerStylesHost = /** @class */ (() => {
    class ServerStylesHost extends SharedStylesHost {
        constructor(doc, transitionId) {
            super();
            this.doc = doc;
            this.transitionId = transitionId;
            this.head = null;
            this.head = doc.getElementsByTagName('head')[0];
        }
        _addStyle(style) {
            let adapter = getDOM();
            const el = adapter.createElement('style');
            el.textContent = style;
            if (!!this.transitionId) {
                el.setAttribute('ng-transition', this.transitionId);
            }
            this.head.appendChild(el);
        }
        onStylesAdded(additions) {
            additions.forEach(style => this._addStyle(style));
        }
    }
    ServerStylesHost.ɵfac = function ServerStylesHost_Factory(t) { return new (t || ServerStylesHost)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(ɵTRANSITION_ID, 8)); };
    ServerStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: ServerStylesHost, factory: ServerStylesHost.ɵfac });
    return ServerStylesHost;
})();
export { ServerStylesHost };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRWhHO0lBQUEsTUFDYSxnQkFBaUIsU0FBUSxnQkFBZ0I7UUFHcEQsWUFDOEIsR0FBUSxFQUNVLFlBQW9CO1lBQ2xFLEtBQUssRUFBRSxDQUFDO1lBRm9CLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDVSxpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUo1RCxTQUFJLEdBQVEsSUFBSSxDQUFDO1lBTXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFTyxTQUFTLENBQUMsS0FBYTtZQUM3QixJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxhQUFhLENBQUMsU0FBc0I7WUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDOztvRkF0QlUsZ0JBQWdCLGNBSWYsUUFBUSxlQUNJLGNBQWM7NERBTDNCLGdCQUFnQixXQUFoQixnQkFBZ0I7MkJBYjdCO0tBb0NDO1NBdkJZLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O3NCQUtKLE1BQU07dUJBQUMsUUFBUTs7c0JBQ2YsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdCwgybVUUkFOU0lUSU9OX0lEfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgcHJpdmF0ZSBoZWFkOiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoybVUUkFOU0lUSU9OX0lEKSBwcml2YXRlIHRyYW5zaXRpb25JZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmhlYWQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYWRhcHRlciA9IGdldERPTSgpO1xuICAgIGNvbnN0IGVsID0gYWRhcHRlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgaWYgKCEhdGhpcy50cmFuc2l0aW9uSWQpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnbmctdHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbklkKTtcbiAgICB9XG4gICAgdGhpcy5oZWFkLmFwcGVuZENoaWxkKGVsKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPikge1xuICAgIGFkZGl0aW9ucy5mb3JFYWNoKHN0eWxlID0+IHRoaXMuX2FkZFN0eWxlKHN0eWxlKSk7XG4gIH1cbn1cbiJdfQ==