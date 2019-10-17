/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
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
    ServerEventManagerPlugin = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ServerEventManagerPlugin);
    return ServerEventManagerPlugin;
}());
export { ServerEventManagerPlugin };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHakQ7SUFDRSxrQ0FBc0MsR0FBUTtRQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7SUFBRyxDQUFDO0lBRWxELG1DQUFtQztJQUNuQywyQ0FBUSxHQUFSLFVBQVMsU0FBaUIsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUMsbURBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCx5REFBc0IsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDMUUsSUFBTSxNQUFNLEdBQWdCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLE1BQU0sbUJBQWMsU0FBVyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFoQlUsd0JBQXdCO1FBRHBDLFVBQVUsRUFBRTtRQUVFLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTs7T0FEbEIsd0JBQXdCLENBaUJwQztJQUFELCtCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FqQlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW4gLyogZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4gd2hpY2ggaXMgcHJpdmF0ZSAqLyB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnkpIHt9XG5cbiAgLy8gSGFuZGxlIGFsbCBldmVudHMgb24gdGhlIHNlcnZlci5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpIHsgcmV0dXJuIHRydWU7IH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIGdldERPTSgpLm9uQW5kQ2FuY2VsKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICBhZGRHbG9iYWxFdmVudExpc3RlbmVyKGVsZW1lbnQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBnZXRET00oKS5nZXRHbG9iYWxFdmVudFRhcmdldCh0aGlzLmRvYywgZWxlbWVudCk7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZXZlbnQgdGFyZ2V0ICR7dGFyZ2V0fSBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG59XG4iXX0=