/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} urlStr
 * @return {?}
 */
function parseUrl(urlStr) {
    /** @type {?} */
    const parsedUrl = url.parse(urlStr);
    return {
        hostname: parsedUrl.hostname || '',
        protocol: parsedUrl.protocol || '',
        port: parsedUrl.port || '',
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
export class ServerPlatformLocation {
    /**
     * @param {?} _doc
     * @param {?} _config
     */
    constructor(_doc, _config) {
        this._doc = _doc;
        this.href = '/';
        this.hostname = '/';
        this.protocol = '/';
        this.port = '/';
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this._hashUpdate = new Subject();
        /** @type {?} */
        const config = (/** @type {?} */ (_config));
        if (!!config && !!config.url) {
            /** @type {?} */
            const parsedUrl = parseUrl(config.url);
            this.hostname = parsedUrl.hostname;
            this.protocol = parsedUrl.protocol;
            this.port = parsedUrl.port;
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return (/** @type {?} */ (getDOM().getBaseHref(this._doc))); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashUpdate.subscribe(fn); }
    /**
     * @return {?}
     */
    get url() { return `${this.pathname}${this.search}${this.hash}`; }
    /**
     * @private
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    setHash(value, oldUrl) {
        if (this.hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        ((/** @type {?} */ (this))).hash = value;
        /** @type {?} */
        const newUrl = this.url;
        scheduleMicroTask((/**
         * @return {?}
         */
        () => this._hashUpdate.next((/** @type {?} */ ({
            type: 'hashchange', state: null, oldUrl, newUrl
        })))));
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    replaceState(state, title, newUrl) {
        /** @type {?} */
        const oldUrl = this.url;
        /** @type {?} */
        const parsedUrl = parseUrl(newUrl);
        ((/** @type {?} */ (this))).pathname = parsedUrl.pathname;
        ((/** @type {?} */ (this))).search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    pushState(state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    }
    /**
     * @return {?}
     */
    forward() { throw new Error('Not implemented'); }
    /**
     * @return {?}
     */
    back() { throw new Error('Not implemented'); }
    // History API isn't available on server, therefore return undefined
    /**
     * @return {?}
     */
    getState() { return undefined; }
}
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
];
/** @nocollapse */ ServerPlatformLocation.ngInjectableDef = i0.ɵɵdefineInjectable({ token: ServerPlatformLocation, factory: function ServerPlatformLocation_Factory(t) { return new (t || ServerPlatformLocation)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(INITIAL_CONFIG, 8)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [INITIAL_CONFIG]
            }] }]; }, null);
if (false) {
    /** @type {?} */
    ServerPlatformLocation.prototype.href;
    /** @type {?} */
    ServerPlatformLocation.prototype.hostname;
    /** @type {?} */
    ServerPlatformLocation.prototype.protocol;
    /** @type {?} */
    ServerPlatformLocation.prototype.port;
    /** @type {?} */
    ServerPlatformLocation.prototype.pathname;
    /** @type {?} */
    ServerPlatformLocation.prototype.search;
    /** @type {?} */
    ServerPlatformLocation.prototype.hash;
    /**
     * @type {?}
     * @private
     */
    ServerPlatformLocation.prototype._hashUpdate;
    /**
     * @type {?}
     * @private
     */
    ServerPlatformLocation.prototype._doc;
}
/**
 * @param {?} fn
 * @return {?}
 */
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFnRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hHLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFHeEQsU0FBUyxRQUFRLENBQUMsTUFBYzs7VUFDeEIsU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ25DLE9BQU87UUFDTCxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUMxQixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtLQUMzQixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFPRCxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQVVqQyxZQUM4QixJQUFTLEVBQXNDLE9BQVk7UUFBM0QsU0FBSSxHQUFKLElBQUksQ0FBSztRQVZ2QixTQUFJLEdBQVcsR0FBRyxDQUFDO1FB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S0FBVyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXZELElBQUksS0FBVyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUdwRCxRQUFRLEtBQWMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7WUFqRTFDLFVBQVU7Ozs7NENBWUosTUFBTSxTQUFDLFFBQVE7NENBQXNCLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs7d0VBWGhFLHNCQUFzQix5RUFBdEIsc0JBQXNCLGNBV3JCLFFBQVEsZUFBeUMsY0FBYzttQ0FYaEUsc0JBQXNCO2NBRGxDLFVBQVU7O3NCQVlKLE1BQU07dUJBQUMsUUFBUTs7c0JBQXNCLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsY0FBYzs7OztJQVYzRSxzQ0FBbUM7O0lBQ25DLDBDQUF1Qzs7SUFDdkMsMENBQXVDOztJQUN2QyxzQ0FBbUM7O0lBQ25DLDBDQUF1Qzs7SUFDdkMsd0NBQW9DOztJQUNwQyxzQ0FBa0M7Ozs7O0lBQ2xDLDZDQUF5RDs7Ozs7SUFHckQsc0NBQW1DOzs7Ozs7QUF3RHpDLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxFQUFZO0lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgTG9jYXRpb25DaGFuZ2VFdmVudCwgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5cbmZ1bmN0aW9uIHBhcnNlVXJsKHVybFN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IHBhcnNlZFVybCA9IHVybC5wYXJzZSh1cmxTdHIpO1xuICByZXR1cm4ge1xuICAgIGhvc3RuYW1lOiBwYXJzZWRVcmwuaG9zdG5hbWUgfHwgJycsXG4gICAgcHJvdG9jb2w6IHBhcnNlZFVybC5wcm90b2NvbCB8fCAnJyxcbiAgICBwb3J0OiBwYXJzZWRVcmwucG9ydCB8fCAnJyxcbiAgICBwYXRobmFtZTogcGFyc2VkVXJsLnBhdGhuYW1lIHx8ICcnLFxuICAgIHNlYXJjaDogcGFyc2VkVXJsLnNlYXJjaCB8fCAnJyxcbiAgICBoYXNoOiBwYXJzZWRVcmwuaGFzaCB8fCAnJyxcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXJ2ZXItc2lkZSBpbXBsZW1lbnRhdGlvbiBvZiBVUkwgc3RhdGUuIEltcGxlbWVudHMgYHBhdGhuYW1lYCwgYHNlYXJjaGAsIGFuZCBgaGFzaGBcbiAqIGJ1dCBub3QgdGhlIHN0YXRlIHN0YWNrLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyUGxhdGZvcm1Mb2NhdGlvbiBpbXBsZW1lbnRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgaHJlZjogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgaG9zdG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHByb3RvY29sOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwb3J0OiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwYXRobmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgc2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHJlYWRvbmx5IGhhc2g6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9oYXNoVXBkYXRlID0gbmV3IFN1YmplY3Q8TG9jYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55LCBAT3B0aW9uYWwoKSBASW5qZWN0KElOSVRJQUxfQ09ORklHKSBfY29uZmlnOiBhbnkpIHtcbiAgICBjb25zdCBjb25maWcgPSBfY29uZmlnIGFzIFBsYXRmb3JtQ29uZmlnIHwgbnVsbDtcbiAgICBpZiAoISFjb25maWcgJiYgISFjb25maWcudXJsKSB7XG4gICAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChjb25maWcudXJsKTtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgICB0aGlzLnByb3RvY29sID0gcGFyc2VkVXJsLnByb3RvY29sO1xuICAgICAgdGhpcy5wb3J0ID0gcGFyc2VkVXJsLnBvcnQ7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gcGFyc2VkVXJsLnBhdGhuYW1lO1xuICAgICAgdGhpcy5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgICAgdGhpcy5oYXNoID0gcGFyc2VkVXJsLmhhc2g7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7IHJldHVybiBnZXRET00oKS5nZXRCYXNlSHJlZih0aGlzLl9kb2MpICE7IH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgLy8gTm8tb3A6IGEgc3RhdGUgc3RhY2sgaXMgbm90IGltcGxlbWVudGVkLCBzb1xuICAgIC8vIG5vIGV2ZW50cyB3aWxsIGV2ZXIgY29tZS5cbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQgeyB0aGlzLl9oYXNoVXBkYXRlLnN1YnNjcmliZShmbik7IH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLnBhdGhuYW1lfSR7dGhpcy5zZWFyY2h9JHt0aGlzLmhhc2h9YDsgfVxuXG4gIHByaXZhdGUgc2V0SGFzaCh2YWx1ZTogc3RyaW5nLCBvbGRVcmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmhhc2ggPT09IHZhbHVlKSB7XG4gICAgICAvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiB0aGUgaGFzaCBoYXMgbm90IGNoYW5nZWQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICh0aGlzIGFze2hhc2g6IHN0cmluZ30pLmhhc2ggPSB2YWx1ZTtcbiAgICBjb25zdCBuZXdVcmwgPSB0aGlzLnVybDtcbiAgICBzY2hlZHVsZU1pY3JvVGFzaygoKSA9PiB0aGlzLl9oYXNoVXBkYXRlLm5leHQoe1xuICAgICAgdHlwZTogJ2hhc2hjaGFuZ2UnLCBzdGF0ZTogbnVsbCwgb2xkVXJsLCBuZXdVcmxcbiAgICB9IGFzIExvY2F0aW9uQ2hhbmdlRXZlbnQpKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFVybCA9IHRoaXMudXJsO1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKG5ld1VybCk7XG4gICAgKHRoaXMgYXN7cGF0aG5hbWU6IHN0cmluZ30pLnBhdGhuYW1lID0gcGFyc2VkVXJsLnBhdGhuYW1lO1xuICAgICh0aGlzIGFze3NlYXJjaDogc3RyaW5nfSkuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICB0aGlzLnNldEhhc2gocGFyc2VkVXJsLmhhc2gsIG9sZFVybCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIG5ld1VybCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQgeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpOyB9XG5cbiAgYmFjaygpOiB2b2lkIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBzZXJ2ZXIsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24geyByZXR1cm4gdW5kZWZpbmVkOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFzayhmbjogRnVuY3Rpb24pIHtcbiAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbn1cbiJdfQ==