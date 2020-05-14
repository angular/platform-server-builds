/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/server_events.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerEventManagerPlugin.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    /** @nocollapse */ ServerEventManagerPlugin.ɵfac = function ServerEventManagerPlugin_Factory(t) { return new (t || ServerEventManagerPlugin /* extends EventManagerPlugin which is private */)(i0.ɵɵinject(DOCUMENT)); };
    /** @nocollapse */ ServerEventManagerPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, factory: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */.ɵfac });
    return ServerEventManagerPlugin;
})();
export { ServerEventManagerPlugin };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServerEventManagerPlugin.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7QUFFakQ7SUFBQSxNQUNhLHdCQUF3QixDQUFDLGlEQUFpRDs7OztRQUNyRixZQUFzQyxHQUFRO1lBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFHLENBQUM7Ozs7OztRQUdsRCxRQUFRLENBQUMsU0FBaUI7WUFDeEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDOzs7Ozs7O1FBRUQsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO1lBQ3pFLE9BQU8sTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7Ozs7OztRQUVELHNCQUFzQixDQUFDLE9BQWUsRUFBRSxTQUFpQixFQUFFLE9BQWlCOztrQkFDcEUsTUFBTSxHQUFnQixNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLE1BQU0sY0FBYyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7Z0JBbkJGLFVBQVU7Ozs7Z0RBRUksTUFBTSxTQUFDLFFBQVE7O3VIQURqQix3QkFBd0IsQ0FBQyxpREFBaUQsY0FDakUsUUFBUTt1RkFEakIsd0JBQXdCLENBQUMsaURBQWlELFdBQTFFLHdCQUF3QixDQUFDLGlEQUFpRDttQ0FadkY7S0ErQkM7U0FuQlksd0JBQXdCO2tEQUF4Qix3QkFBd0IsQ0FBQyxpREFBaUQ7Y0FEdEYsVUFBVTs7c0JBRUksTUFBTTt1QkFBQyxRQUFROzs7Ozs7O0lBQWhCLHVDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2luIC8qIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHdoaWNoIGlzIHByaXZhdGUgKi8ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55KSB7fVxuXG4gIC8vIEhhbmRsZSBhbGwgZXZlbnRzIG9uIHRoZSBzZXJ2ZXIuXG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIGdldERPTSgpLm9uQW5kQ2FuY2VsKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICBhZGRHbG9iYWxFdmVudExpc3RlbmVyKGVsZW1lbnQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBnZXRET00oKS5nZXRHbG9iYWxFdmVudFRhcmdldCh0aGlzLmRvYywgZWxlbWVudCk7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZXZlbnQgdGFyZ2V0ICR7dGFyZ2V0fSBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG59XG4iXX0=