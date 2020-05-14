/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/location.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
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
let ServerPlatformLocation = /** @class */ (() => {
    /**
     * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
     * but not the state stack.
     */
    class ServerPlatformLocation {
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
        getBaseHrefFromDOM() {
            return (/** @type {?} */ (getDOM().getBaseHref(this._doc)));
        }
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
        onHashChange(fn) {
            this._hashUpdate.subscribe(fn);
        }
        /**
         * @return {?}
         */
        get url() {
            return `${this.pathname}${this.search}${this.hash}`;
        }
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
            () => this._hashUpdate.next((/** @type {?} */ ({ type: 'hashchange', state: null, oldUrl, newUrl })))));
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
        forward() {
            throw new Error('Not implemented');
        }
        /**
         * @return {?}
         */
        back() {
            throw new Error('Not implemented');
        }
        // History API isn't available on server, therefore return undefined
        /**
         * @return {?}
         */
        getState() {
            return undefined;
        }
    }
    ServerPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServerPlatformLocation.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
    ];
    /** @nocollapse */ ServerPlatformLocation.ɵfac = function ServerPlatformLocation_Factory(t) { return new (t || ServerPlatformLocation)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(INITIAL_CONFIG, 8)); };
    /** @nocollapse */ ServerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: ServerPlatformLocation, factory: ServerPlatformLocation.ɵfac });
    return ServerPlatformLocation;
})();
export { ServerPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [INITIAL_CONFIG]
            }] }]; }, null); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBaUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBR3hELFNBQVMsUUFBUSxDQUFDLE1BQWM7O1VBQ3hCLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxPQUFPO1FBQ0wsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRTtRQUNsQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDMUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRTtRQUNsQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQzlCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7S0FDM0IsQ0FBQztBQUNKLENBQUM7Ozs7O0FBTUQ7Ozs7O0lBQUEsTUFDYSxzQkFBc0I7Ozs7O1FBVWpDLFlBQzhCLElBQVMsRUFBc0MsT0FBWTtZQUEzRCxTQUFJLEdBQUosSUFBSSxDQUFLO1lBVnZCLFNBQUksR0FBVyxHQUFHLENBQUM7WUFDbkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFNBQUksR0FBVyxHQUFHLENBQUM7WUFDbkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixXQUFNLEdBQVcsRUFBRSxDQUFDO1lBQ3BCLFNBQUksR0FBVyxFQUFFLENBQUM7WUFDMUIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQzs7a0JBSWpELE1BQU0sR0FBRyxtQkFBQSxPQUFPLEVBQXlCO1lBQy9DLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTs7c0JBQ3RCLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQzthQUM1QjtRQUNILENBQUM7Ozs7UUFFRCxrQkFBa0I7WUFDaEIsT0FBTyxtQkFBQSxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7UUFDMUMsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQUMsRUFBMEI7WUFDbkMsOENBQThDO1lBQzlDLDRCQUE0QjtRQUM5QixDQUFDOzs7OztRQUVELFlBQVksQ0FBQyxFQUEwQjtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7O1FBRUQsSUFBSSxHQUFHO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsQ0FBQzs7Ozs7OztRQUVPLE9BQU8sQ0FBQyxLQUFhLEVBQUUsTUFBYztZQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUN2QixpREFBaUQ7Z0JBQ2pELE9BQU87YUFDUjtZQUNELENBQUMsbUJBQUEsSUFBSSxFQUFrQixDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzs7a0JBQ2hDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRztZQUN2QixpQkFBaUI7OztZQUNiLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUN2QixtQkFBQSxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEVBQXVCLENBQUMsRUFBQyxDQUFDO1FBQ3JGLENBQUM7Ozs7Ozs7UUFFRCxZQUFZLENBQUMsS0FBVSxFQUFFLEtBQWEsRUFBRSxNQUFjOztrQkFDOUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHOztrQkFDakIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDbEMsQ0FBQyxtQkFBQSxJQUFJLEVBQXNCLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUMzRCxDQUFDLG1CQUFBLElBQUksRUFBb0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDOzs7Ozs7O1FBRUQsU0FBUyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsTUFBYztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7OztRQUVELE9BQU87WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckMsQ0FBQzs7OztRQUVELElBQUk7WUFDRixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckMsQ0FBQzs7Ozs7UUFHRCxRQUFRO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7O2dCQTdFRixVQUFVOzs7O2dEQVlKLE1BQU0sU0FBQyxRQUFRO2dEQUFzQixRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7O21IQVhoRSxzQkFBc0IsY0FXckIsUUFBUSxlQUF5QyxjQUFjO3FGQVhoRSxzQkFBc0IsV0FBdEIsc0JBQXNCO2lDQWhDbkM7S0E2R0M7U0E3RVksc0JBQXNCO2tEQUF0QixzQkFBc0I7Y0FEbEMsVUFBVTs7c0JBWUosTUFBTTt1QkFBQyxRQUFROztzQkFBc0IsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxjQUFjOzs7O0lBVjNFLHNDQUFtQzs7SUFDbkMsMENBQXVDOztJQUN2QywwQ0FBdUM7O0lBQ3ZDLHNDQUFtQzs7SUFDbkMsMENBQXVDOztJQUN2Qyx3Q0FBb0M7O0lBQ3BDLHNDQUFrQzs7Ozs7SUFDbEMsNkNBQXlEOzs7OztJQUdyRCxzQ0FBbUM7Ozs7OztBQW9FekMsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQVk7SUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBMb2NhdGlvbkNoYW5nZUV2ZW50LCBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9uLCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcblxuXG5mdW5jdGlvbiBwYXJzZVVybCh1cmxTdHI6IHN0cmluZykge1xuICBjb25zdCBwYXJzZWRVcmwgPSB1cmwucGFyc2UodXJsU3RyKTtcbiAgcmV0dXJuIHtcbiAgICBob3N0bmFtZTogcGFyc2VkVXJsLmhvc3RuYW1lIHx8ICcnLFxuICAgIHByb3RvY29sOiBwYXJzZWRVcmwucHJvdG9jb2wgfHwgJycsXG4gICAgcG9ydDogcGFyc2VkVXJsLnBvcnQgfHwgJycsXG4gICAgcGF0aG5hbWU6IHBhcnNlZFVybC5wYXRobmFtZSB8fCAnJyxcbiAgICBzZWFyY2g6IHBhcnNlZFVybC5zZWFyY2ggfHwgJycsXG4gICAgaGFzaDogcGFyc2VkVXJsLmhhc2ggfHwgJycsXG4gIH07XG59XG5cbi8qKlxuICogU2VydmVyLXNpZGUgaW1wbGVtZW50YXRpb24gb2YgVVJMIHN0YXRlLiBJbXBsZW1lbnRzIGBwYXRobmFtZWAsIGBzZWFyY2hgLCBhbmQgYGhhc2hgXG4gKiBidXQgbm90IHRoZSBzdGF0ZSBzdGFjay5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBsYXRmb3JtTG9jYXRpb24gaW1wbGVtZW50cyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IGhyZWY6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IGhvc3RuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwcm90b2NvbDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcG9ydDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcGF0aG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHNlYXJjaDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyByZWFkb25seSBoYXNoOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfaGFzaFVwZGF0ZSA9IG5ldyBTdWJqZWN0PExvY2F0aW9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSwgQE9wdGlvbmFsKCkgQEluamVjdChJTklUSUFMX0NPTkZJRykgX2NvbmZpZzogYW55KSB7XG4gICAgY29uc3QgY29uZmlnID0gX2NvbmZpZyBhcyBQbGF0Zm9ybUNvbmZpZyB8IG51bGw7XG4gICAgaWYgKCEhY29uZmlnICYmICEhY29uZmlnLnVybCkge1xuICAgICAgY29uc3QgcGFyc2VkVXJsID0gcGFyc2VVcmwoY29uZmlnLnVybCk7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gcGFyc2VkVXJsLmhvc3RuYW1lO1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHBhcnNlZFVybC5wcm90b2NvbDtcbiAgICAgIHRoaXMucG9ydCA9IHBhcnNlZFVybC5wb3J0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHBhcnNlZFVybC5oYXNoO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRET00oKS5nZXRCYXNlSHJlZih0aGlzLl9kb2MpITtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAvLyBOby1vcDogYSBzdGF0ZSBzdGFjayBpcyBub3QgaW1wbGVtZW50ZWQsIHNvXG4gICAgLy8gbm8gZXZlbnRzIHdpbGwgZXZlciBjb21lLlxuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgdGhpcy5faGFzaFVwZGF0ZS5zdWJzY3JpYmUoZm4pO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLnBhdGhuYW1lfSR7dGhpcy5zZWFyY2h9JHt0aGlzLmhhc2h9YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGFzaCh2YWx1ZTogc3RyaW5nLCBvbGRVcmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmhhc2ggPT09IHZhbHVlKSB7XG4gICAgICAvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiB0aGUgaGFzaCBoYXMgbm90IGNoYW5nZWQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICh0aGlzIGFzIHtoYXNoOiBzdHJpbmd9KS5oYXNoID0gdmFsdWU7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy51cmw7XG4gICAgc2NoZWR1bGVNaWNyb1Rhc2soXG4gICAgICAgICgpID0+IHRoaXMuX2hhc2hVcGRhdGUubmV4dChcbiAgICAgICAgICAgIHt0eXBlOiAnaGFzaGNoYW5nZScsIHN0YXRlOiBudWxsLCBvbGRVcmwsIG5ld1VybH0gYXMgTG9jYXRpb25DaGFuZ2VFdmVudCkpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgb2xkVXJsID0gdGhpcy51cmw7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gcGFyc2VVcmwobmV3VXJsKTtcbiAgICAodGhpcyBhcyB7cGF0aG5hbWU6IHN0cmluZ30pLnBhdGhuYW1lID0gcGFyc2VkVXJsLnBhdGhuYW1lO1xuICAgICh0aGlzIGFzIHtzZWFyY2g6IHN0cmluZ30pLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgdGhpcy5zZXRIYXNoKHBhcnNlZFVybC5oYXNoLCBvbGRVcmwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBuZXdVcmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLy8gSGlzdG9yeSBBUEkgaXNuJ3QgYXZhaWxhYmxlIG9uIHNlcnZlciwgdGhlcmVmb3JlIHJldHVybiB1bmRlZmluZWRcbiAgZ2V0U3RhdGUoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2soZm46IEZ1bmN0aW9uKSB7XG4gIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygnc2NoZWR1bGVNaWNyb3Rhc2snLCBmbik7XG59XG4iXX0=