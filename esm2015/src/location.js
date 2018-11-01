import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this._hashUpdate = new Subject();
        /** @type {?} */
        const config = /** @type {?} */ (_config);
        if (!!config && !!config.url) {
            /** @type {?} */
            const parsedUrl = parseUrl(config.url);
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return /** @type {?} */ ((getDOM().getBaseHref(this._doc))); }
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
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    setHash(value, oldUrl) {
        if (this.hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        (/** @type {?} */ (this)).hash = value;
        /** @type {?} */
        const newUrl = this.url;
        scheduleMicroTask(() => this._hashUpdate.next(/** @type {?} */ ({
            type: 'hashchange', state: null, oldUrl, newUrl
        })));
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
        (/** @type {?} */ (this)).pathname = parsedUrl.pathname;
        (/** @type {?} */ (this)).search = parsedUrl.search;
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
}
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
];
ServerPlatformLocation.ngInjectableDef = i0.defineInjectable({ token: ServerPlatformLocation, factory: function ServerPlatformLocation_Factory(t) { return new (t || ServerPlatformLocation)(i0.inject(DOCUMENT), i0.inject(INITIAL_CONFIG, 8)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerPlatformLocation, [{
        type: Injectable
    }], [{
        type: undefined,
        decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }]
    }, {
        type: undefined,
        decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [INITIAL_CONFIG]
            }]
    }], null);
if (false) {
    /** @type {?} */
    ServerPlatformLocation.prototype.pathname;
    /** @type {?} */
    ServerPlatformLocation.prototype.search;
    /** @type {?} */
    ServerPlatformLocation.prototype.hash;
    /** @type {?} */
    ServerPlatformLocation.prototype._hashUpdate;
    /** @type {?} */
    ServerPlatformLocation.prototype._doc;
}
/**
 * @param {?} fn
 * @return {?}
 */
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQUd4RCxTQUFTLFFBQVEsQ0FBQyxNQUFjOztJQUM5QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLE9BQU87UUFDTCxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtLQUMzQixDQUFDO0NBQ0g7Ozs7O0FBT0QsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFNakMsWUFDOEIsSUFBUyxFQUFzQyxPQUFZO1FBQTNELFNBQUksR0FBSixJQUFJLENBQUs7d0JBTkosR0FBRztzQkFDTCxFQUFFO29CQUNKLEVBQUU7MkJBQ1gsSUFBSSxPQUFPLEVBQXVCOztRQUl0RCxNQUFNLE1BQU0scUJBQUcsT0FBZ0MsRUFBQztRQUNoRCxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7O1lBQzVCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDNUI7S0FDRjs7OztJQUVELGtCQUFrQixLQUFhLDBCQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTs7Ozs7SUFFMUUsVUFBVSxDQUFDLEVBQTBCOzs7S0FHcEM7Ozs7O0lBRUQsWUFBWSxDQUFDLEVBQTBCLElBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTs7OztJQUVsRixJQUFJLEdBQUcsS0FBYSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7SUFFbEUsT0FBTyxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzNDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7O1lBRXZCLE9BQU87U0FDUjtRQUNELG1CQUFDLElBQXFCLEVBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOztRQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hCLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxtQkFBQztZQUM1QyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07U0FDekIsRUFBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBRzdCLFlBQVksQ0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLE1BQWM7O1FBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBQ3hCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxtQkFBQyxJQUF5QixFQUFDLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDMUQsbUJBQUMsSUFBdUIsRUFBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN0Qzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsT0FBTyxLQUFXLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFOzs7O0lBRXZELElBQUksS0FBVyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRTs7O1lBdkRyRCxVQUFVOzs7OzRDQVFKLE1BQU0sU0FBQyxRQUFROzRDQUFzQixRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7O3NFQVBoRSxzQkFBc0IseUVBQXRCLHNCQUFzQixZQU9yQixRQUFRLGFBQXlDLGNBQWM7bUNBUGhFLHNCQUFzQjtjQURsQyxVQUFVOzs7O3NCQVFKLE1BQU07dUJBQUMsUUFBUTs7Ozs7c0JBQXNCLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtEN0UsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQVk7SUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN6RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUV2ZW50LCBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5cbmZ1bmN0aW9uIHBhcnNlVXJsKHVybFN0cjogc3RyaW5nKToge3BhdGhuYW1lOiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBoYXNoOiBzdHJpbmd9IHtcbiAgY29uc3QgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHVybFN0cik7XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhcnNlZFVybC5wYXRobmFtZSB8fCAnJyxcbiAgICBzZWFyY2g6IHBhcnNlZFVybC5zZWFyY2ggfHwgJycsXG4gICAgaGFzaDogcGFyc2VkVXJsLmhhc2ggfHwgJycsXG4gIH07XG59XG5cbi8qKlxuICogU2VydmVyLXNpZGUgaW1wbGVtZW50YXRpb24gb2YgVVJMIHN0YXRlLiBJbXBsZW1lbnRzIGBwYXRobmFtZWAsIGBzZWFyY2hgLCBhbmQgYGhhc2hgXG4gKiBidXQgbm90IHRoZSBzdGF0ZSBzdGFjay5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBsYXRmb3JtTG9jYXRpb24gaW1wbGVtZW50cyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhdGhuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBzZWFyY2g6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hhc2hVcGRhdGUgPSBuZXcgU3ViamVjdDxMb2NhdGlvbkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoSU5JVElBTF9DT05GSUcpIF9jb25maWc6IGFueSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IF9jb25maWcgYXMgUGxhdGZvcm1Db25maWcgfCBudWxsO1xuICAgIGlmICghIWNvbmZpZyAmJiAhIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKGNvbmZpZy51cmwpO1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHBhcnNlZFVybC5oYXNoO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSAhOyB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIC8vIE5vLW9wOiBhIHN0YXRlIHN0YWNrIGlzIG5vdCBpbXBsZW1lbnRlZCwgc29cbiAgICAvLyBubyBldmVudHMgd2lsbCBldmVyIGNvbWUuXG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5faGFzaFVwZGF0ZS5zdWJzY3JpYmUoZm4pOyB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7IH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhc3toYXNoOiBzdHJpbmd9KS5oYXNoID0gdmFsdWU7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy51cmw7XG4gICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4gdGhpcy5faGFzaFVwZGF0ZS5uZXh0KHtcbiAgICAgIHR5cGU6ICdoYXNoY2hhbmdlJywgc3RhdGU6IG51bGwsIG9sZFVybCwgbmV3VXJsXG4gICAgfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRVcmwgPSB0aGlzLnVybDtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChuZXdVcmwpO1xuICAgICh0aGlzIGFze3BhdGhuYW1lOiBzdHJpbmd9KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhc3tzZWFyY2g6IHN0cmluZ30pLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgdGhpcy5zZXRIYXNoKHBhcnNlZFVybC5oYXNoLCBvbGRVcmwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBuZXdVcmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxuXG4gIGJhY2soKTogdm9pZCB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKGZuOiBGdW5jdGlvbikge1xuICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soJ3NjaGVkdWxlTWljcm90YXNrJywgZm4pO1xufVxuIl19