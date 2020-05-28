/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID } from '@angular/platform-browser';
let ServerStylesHost = /** @class */ (() => {
    let ServerStylesHost = class ServerStylesHost extends SharedStylesHost {
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
    };
    ServerStylesHost = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __param(1, Optional()), __param(1, Inject(ɵTRANSITION_ID)),
        __metadata("design:paramtypes", [Object, String])
    ], ServerStylesHost);
    return ServerStylesHost;
})();
export { ServerStylesHost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR2hHO0lBQUEsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxnQkFBZ0I7UUFHcEQsWUFDOEIsR0FBUSxFQUNVLFlBQW9CO1lBQ2xFLEtBQUssRUFBRSxDQUFDO1lBRm9CLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDVSxpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUo1RCxTQUFJLEdBQVEsSUFBSSxDQUFDO1lBTXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFTyxTQUFTLENBQUMsS0FBYTtZQUM3QixJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxhQUFhLENBQUMsU0FBc0I7WUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQ0YsQ0FBQTtJQXZCWSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO1FBS04sV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEIsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBOztPQUw1QixnQkFBZ0IsQ0F1QjVCO0lBQUQsdUJBQUM7S0FBQTtTQXZCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIHByaXZhdGUgaGVhZDogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KMm1VFJBTlNJVElPTl9JRCkgcHJpdmF0ZSB0cmFuc2l0aW9uSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5oZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZShzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGFkYXB0ZXIgPSBnZXRET00oKTtcbiAgICBjb25zdCBlbCA9IGFkYXB0ZXIuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBlbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgIGlmICghIXRoaXMudHJhbnNpdGlvbklkKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ25nLXRyYW5zaXRpb24nLCB0aGlzLnRyYW5zaXRpb25JZCk7XG4gICAgfVxuICAgIHRoaXMuaGVhZC5hcHBlbmRDaGlsZChlbCk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pIHtcbiAgICBhZGRpdGlvbnMuZm9yRWFjaChzdHlsZSA9PiB0aGlzLl9hZGRTdHlsZShzdHlsZSkpO1xuICB9XG59XG4iXX0=