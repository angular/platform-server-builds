/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
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
    ServerEventManagerPlugin.ngInjectableDef = i0.ΔdefineInjectable({ token: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, factory: function ServerEventManagerPlugin_Factory(t) { return new (t || ServerEventManagerPlugin /* extends EventManagerPlugin which is private */)(i0.Δinject(DOCUMENT)); }, providedIn: null });
    return ServerEventManagerPlugin;
}());
export { ServerEventManagerPlugin };
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvc2VydmVyX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFNUQ7SUFFRSxrQ0FBc0MsR0FBUTtRQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7SUFBRyxDQUFDO0lBRWxELG1DQUFtQztJQUNuQywyQ0FBUSxHQUFSLFVBQVMsU0FBaUIsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUMsbURBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCx5REFBc0IsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDMUUsSUFBTSxNQUFNLEdBQWdCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLE1BQU0sbUJBQWMsU0FBVyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7NkVBaEJVLHdCQUF3QixDQUFDLGlEQUFpRCwyRUFBMUUsd0JBQXdCLENBQUMsaURBQWlELGFBQ2pFLFFBQVE7bUNBZDlCO0NBOEJDLEFBbEJELElBa0JDO1NBakJZLHdCQUF3QjttQ0FBeEIsd0JBQXdCLENBQUMsaURBQWlEO2NBRHRGLFVBQVU7O3NCQUVJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlckV2ZW50TWFuYWdlclBsdWdpbiAvKiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB3aGljaCBpcyBwcml2YXRlICovIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueSkge31cblxuICAvLyBIYW5kbGUgYWxsIGV2ZW50cyBvbiB0aGUgc2VydmVyLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZykgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkub25BbmRDYW5jZWwoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGdldERPTSgpLmdldEdsb2JhbEV2ZW50VGFyZ2V0KHRoaXMuZG9jLCBlbGVtZW50KTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==