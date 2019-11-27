/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/server_events.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
export class ServerEventManagerPlugin /* extends EventManagerPlugin which is private */ {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        this.doc = doc;
    }
    // Handle all events on the server.
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return true; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        return getDOM().onAndCancel(element, eventName, handler);
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(element, eventName, handler) {
        /** @type {?} */
        const target = getDOM().getGlobalEventTarget(this.doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}
ServerEventManagerPlugin.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ServerEventManagerPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServerEventManagerPlugin.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqRCxNQUFNLE9BQU8sd0JBQXdCLENBQUMsaURBQWlEOzs7O0lBQ3JGLFlBQXNDLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQUcsQ0FBQzs7Ozs7O0lBR2xELFFBQVEsQ0FBQyxTQUFpQixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUU1QyxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDekUsT0FBTyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7O0lBRUQsc0JBQXNCLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7O2NBQ3BFLE1BQU0sR0FBZ0IsTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLE1BQU0sY0FBYyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUFqQkYsVUFBVTs7Ozs0Q0FFSSxNQUFNLFNBQUMsUUFBUTs7Ozs7OztJQUFoQix1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlckV2ZW50TWFuYWdlclBsdWdpbiAvKiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB3aGljaCBpcyBwcml2YXRlICovIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueSkge31cblxuICAvLyBIYW5kbGUgYWxsIGV2ZW50cyBvbiB0aGUgc2VydmVyLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZykgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkub25BbmRDYW5jZWwoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGdldERPTSgpLmdldEdsb2JhbEV2ZW50VGFyZ2V0KHRoaXMuZG9jLCBlbGVtZW50KTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==