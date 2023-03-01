/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID } from '@angular/platform-browser';
import * as i0 from "@angular/core";
class ServerStylesHost extends SharedStylesHost {
    constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this._styleNodes = new Set();
        this.head = doc.getElementsByTagName('head')[0];
    }
    onStyleAdded(style) {
        const adapter = getDOM();
        const el = adapter.createElement('style');
        el.textContent = style;
        if (!!this.transitionId) {
            el.setAttribute('ng-transition', this.transitionId);
        }
        this.head.appendChild(el);
        this._styleNodes.add(el);
    }
    ngOnDestroy() {
        this._styleNodes.forEach(styleNode => styleNode.remove());
        this._styleNodes.clear();
        super.ngOnDestroy();
    }
}
ServerStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-3673ea0", ngImport: i0, type: ServerStylesHost, deps: [{ token: DOCUMENT }, { token: ɵTRANSITION_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ServerStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-3673ea0", ngImport: i0, type: ServerStylesHost });
export { ServerStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-3673ea0", ngImport: i0, type: ServerStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ɵTRANSITION_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRWhHLE1BQ2EsZ0JBQWlCLFNBQVEsZ0JBQWdCO0lBSXBELFlBQzhCLEdBQVEsRUFDVSxZQUFvQjtRQUNsRSxLQUFLLEVBQUUsQ0FBQztRQUZvQixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1UsaUJBQVksR0FBWixZQUFZLENBQVE7UUFMNUQsU0FBSSxHQUFRLElBQUksQ0FBQztRQUNqQixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFNM0MsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVRLFlBQVksQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRVEsV0FBVztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dIQTFCVSxnQkFBZ0Isa0JBS2YsUUFBUSxhQUNJLGNBQWM7NEhBTjNCLGdCQUFnQjtTQUFoQixnQkFBZ0I7c0dBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBTUosTUFBTTsyQkFBQyxRQUFROzswQkFDZixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIHByaXZhdGUgaGVhZDogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3R5bGVOb2RlcyA9IG5ldyBTZXQ8SFRNTEVsZW1lbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdCjJtVRSQU5TSVRJT05fSUQpIHByaXZhdGUgdHJhbnNpdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB9XG5cbiAgb3ZlcnJpZGUgb25TdHlsZUFkZGVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0RE9NKCk7XG4gICAgY29uc3QgZWwgPSBhZGFwdGVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZWwudGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICBpZiAoISF0aGlzLnRyYW5zaXRpb25JZCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCduZy10cmFuc2l0aW9uJywgdGhpcy50cmFuc2l0aW9uSWQpO1xuICAgIH1cbiAgICB0aGlzLmhlYWQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIHRoaXMuX3N0eWxlTm9kZXMuYWRkKGVsKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N0eWxlTm9kZXMuZm9yRWFjaChzdHlsZU5vZGUgPT4gc3R5bGVOb2RlLnJlbW92ZSgpKTtcbiAgICB0aGlzLl9zdHlsZU5vZGVzLmNsZWFyKCk7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxufVxuIl19