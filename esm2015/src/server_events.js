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
let ServerEventManagerPlugin = /** @class */ (() => {
    class ServerEventManagerPlugin /* extends EventManagerPlugin which is private */ {
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
        supports(eventName) {
            return true;
        }
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
    return ServerEventManagerPlugin;
})();
export { ServerEventManagerPlugin };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServerEventManagerPlugin.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRDtJQUFBLE1BQ2Esd0JBQXdCLENBQUMsaURBQWlEOzs7O1FBQ3JGLFlBQXNDLEdBQVE7WUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQUcsQ0FBQzs7Ozs7O1FBR2xELFFBQVEsQ0FBQyxTQUFpQjtZQUN4QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7Ozs7Ozs7UUFFRCxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7WUFDekUsT0FBTyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7Ozs7O1FBRUQsc0JBQXNCLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7O2tCQUNwRSxNQUFNLEdBQWdCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO1lBQzVFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsTUFBTSxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDOUU7WUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELENBQUM7OztnQkFuQkYsVUFBVTs7OztnREFFSSxNQUFNLFNBQUMsUUFBUTs7SUFrQjlCLCtCQUFDO0tBQUE7U0FuQlksd0JBQXdCOzs7Ozs7SUFDdkIsdUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW4gLyogZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4gd2hpY2ggaXMgcHJpdmF0ZSAqLyB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnkpIHt9XG5cbiAgLy8gSGFuZGxlIGFsbCBldmVudHMgb24gdGhlIHNlcnZlci5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkub25BbmRDYW5jZWwoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGdldERPTSgpLmdldEdsb2JhbEV2ZW50VGFyZ2V0KHRoaXMuZG9jLCBlbGVtZW50KTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==