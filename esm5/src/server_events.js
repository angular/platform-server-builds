/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/platform-browser';
import * as i0 from "@angular/core";
var ServerEventManagerPlugin = /** @class */ (function () {
    function ServerEventManagerPlugin(doc) {
        this.doc = doc;
    }
    // Handle all events on the server.
    ServerEventManagerPlugin.prototype.supports = function (eventName) { return true; };
    ServerEventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
        return getDOM().onAndCancel(element, eventName, handler);
    };
    ServerEventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        var target = getDOM().getGlobalEventTarget(this.doc, element);
        if (!target) {
            throw new Error("Unsupported event target " + target + " for event " + eventName);
        }
        return this.addEventListener(target, eventName, handler);
    };
    ServerEventManagerPlugin.ngInjectableDef = i0.defineInjectable({ token: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, factory: function ServerEventManagerPlugin_Factory(t) { return new (t || ServerEventManagerPlugin /* extends EventManagerPlugin which is private */)(i0.inject(DOCUMENT)); }, providedIn: null });
    return ServerEventManagerPlugin;
}());
export { ServerEventManagerPlugin };
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, [{
        type: Injectable
    }], function () { return [{
        type: undefined,
        decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }]
    }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFdEU7SUFFRSxrQ0FBc0MsR0FBUTtRQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7SUFBRyxDQUFDO0lBRWxELG1DQUFtQztJQUNuQywyQ0FBUSxHQUFSLFVBQVMsU0FBaUIsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUMsbURBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCx5REFBc0IsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDMUUsSUFBTSxNQUFNLEdBQWdCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLE1BQU0sbUJBQWMsU0FBVyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7NEVBaEJVLHdCQUF3QixDQUFDLGlEQUFpRCwyRUFBMUUsd0JBQXdCLENBQUMsaURBQWlELFlBQ2pFLFFBQVE7bUNBYjlCO0NBNkJDLEFBbEJELElBa0JDO1NBakJZLHdCQUF3QjttQ0FBeEIsd0JBQXdCLENBQUMsaURBQWlEO2NBRHRGLFVBQVU7Ozs7c0JBRUksTUFBTTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2luIC8qIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHdoaWNoIGlzIHByaXZhdGUgKi8ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55KSB7fVxuXG4gIC8vIEhhbmRsZSBhbGwgZXZlbnRzIG9uIHRoZSBzZXJ2ZXIuXG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiBnZXRET00oKS5vbkFuZENhbmNlbChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5kb2MsIGVsZW1lbnQpO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGV2ZW50IHRhcmdldCAke3RhcmdldH0gZm9yIGV2ZW50ICR7ZXZlbnROYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVyKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxufVxuIl19