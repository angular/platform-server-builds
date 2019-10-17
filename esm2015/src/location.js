/**
 * @fileoverview added by tsickle
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
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
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
    { type: Injectable }
];
/** @nocollapse */
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBaUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOzs7OztBQUd4RCxTQUFTLFFBQVEsQ0FBQyxNQUFjOztVQUN4QixTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDbkMsT0FBTztRQUNMLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRTtRQUNsQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1FBQzFCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO0tBQzNCLENBQUM7QUFDSixDQUFDOzs7OztBQU9ELE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBVWpDLFlBQzhCLElBQVMsRUFBc0MsT0FBWTtRQUEzRCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBVnZCLFNBQUksR0FBVyxHQUFHLENBQUM7UUFDbkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixhQUFR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QUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFdkQsSUFBSSxLQUFXLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBR3BELFFBQVEsS0FBYyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztZQWpFMUMsVUFBVTs7Ozs0Q0FZSixNQUFNLFNBQUMsUUFBUTs0Q0FBc0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjOzs7O0lBVjNFLHNDQUFtQzs7SUFDbkMsMENBQXVDOztJQUN2QywwQ0FBdUM7O0lBQ3ZDLHNDQUFtQzs7SUFDbkMsMENBQXVDOztJQUN2Qyx3Q0FBb0M7O0lBQ3BDLHNDQUFrQzs7Ozs7SUFDbEMsNkNBQXlEOzs7OztJQUdyRCxzQ0FBbUM7Ozs7OztBQXdEekMsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQVk7SUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBMb2NhdGlvbkNoYW5nZUV2ZW50LCBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9uLCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcblxuXG5mdW5jdGlvbiBwYXJzZVVybCh1cmxTdHI6IHN0cmluZykge1xuICBjb25zdCBwYXJzZWRVcmwgPSB1cmwucGFyc2UodXJsU3RyKTtcbiAgcmV0dXJuIHtcbiAgICBob3N0bmFtZTogcGFyc2VkVXJsLmhvc3RuYW1lIHx8ICcnLFxuICAgIHByb3RvY29sOiBwYXJzZWRVcmwucHJvdG9jb2wgfHwgJycsXG4gICAgcG9ydDogcGFyc2VkVXJsLnBvcnQgfHwgJycsXG4gICAgcGF0aG5hbWU6IHBhcnNlZFVybC5wYXRobmFtZSB8fCAnJyxcbiAgICBzZWFyY2g6IHBhcnNlZFVybC5zZWFyY2ggfHwgJycsXG4gICAgaGFzaDogcGFyc2VkVXJsLmhhc2ggfHwgJycsXG4gIH07XG59XG5cbi8qKlxuICogU2VydmVyLXNpZGUgaW1wbGVtZW50YXRpb24gb2YgVVJMIHN0YXRlLiBJbXBsZW1lbnRzIGBwYXRobmFtZWAsIGBzZWFyY2hgLCBhbmQgYGhhc2hgXG4gKiBidXQgbm90IHRoZSBzdGF0ZSBzdGFjay5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBsYXRmb3JtTG9jYXRpb24gaW1wbGVtZW50cyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IGhyZWY6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IGhvc3RuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwcm90b2NvbDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcG9ydDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcGF0aG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHNlYXJjaDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyByZWFkb25seSBoYXNoOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfaGFzaFVwZGF0ZSA9IG5ldyBTdWJqZWN0PExvY2F0aW9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSwgQE9wdGlvbmFsKCkgQEluamVjdChJTklUSUFMX0NPTkZJRykgX2NvbmZpZzogYW55KSB7XG4gICAgY29uc3QgY29uZmlnID0gX2NvbmZpZyBhcyBQbGF0Zm9ybUNvbmZpZyB8IG51bGw7XG4gICAgaWYgKCEhY29uZmlnICYmICEhY29uZmlnLnVybCkge1xuICAgICAgY29uc3QgcGFyc2VkVXJsID0gcGFyc2VVcmwoY29uZmlnLnVybCk7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gcGFyc2VkVXJsLmhvc3RuYW1lO1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHBhcnNlZFVybC5wcm90b2NvbDtcbiAgICAgIHRoaXMucG9ydCA9IHBhcnNlZFVybC5wb3J0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHBhcnNlZFVybC5oYXNoO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSAhOyB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIC8vIE5vLW9wOiBhIHN0YXRlIHN0YWNrIGlzIG5vdCBpbXBsZW1lbnRlZCwgc29cbiAgICAvLyBubyBldmVudHMgd2lsbCBldmVyIGNvbWUuXG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5faGFzaFVwZGF0ZS5zdWJzY3JpYmUoZm4pOyB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7IH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhc3toYXNoOiBzdHJpbmd9KS5oYXNoID0gdmFsdWU7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy51cmw7XG4gICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4gdGhpcy5faGFzaFVwZGF0ZS5uZXh0KHtcbiAgICAgIHR5cGU6ICdoYXNoY2hhbmdlJywgc3RhdGU6IG51bGwsIG9sZFVybCwgbmV3VXJsXG4gICAgfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRVcmwgPSB0aGlzLnVybDtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChuZXdVcmwpO1xuICAgICh0aGlzIGFze3BhdGhuYW1lOiBzdHJpbmd9KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhc3tzZWFyY2g6IHN0cmluZ30pLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgdGhpcy5zZXRIYXNoKHBhcnNlZFVybC5oYXNoLCBvbGRVcmwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBuZXdVcmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxuXG4gIGJhY2soKTogdm9pZCB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gc2VydmVyLCB0aGVyZWZvcmUgcmV0dXJuIHVuZGVmaW5lZFxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2soZm46IEZ1bmN0aW9uKSB7XG4gIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygnc2NoZWR1bGVNaWNyb3Rhc2snLCBmbik7XG59XG4iXX0=