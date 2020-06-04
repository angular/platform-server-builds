/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
function parseUrl(urlStr) {
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
    class ServerPlatformLocation {
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
            const config = _config;
            if (!!config && !!config.url) {
                const parsedUrl = parseUrl(config.url);
                this.hostname = parsedUrl.hostname;
                this.protocol = parsedUrl.protocol;
                this.port = parsedUrl.port;
                this.pathname = parsedUrl.pathname;
                this.search = parsedUrl.search;
                this.hash = parsedUrl.hash;
            }
        }
        getBaseHrefFromDOM() {
            return getDOM().getBaseHref(this._doc);
        }
        onPopState(fn) {
            // No-op: a state stack is not implemented, so
            // no events will ever come.
        }
        onHashChange(fn) {
            this._hashUpdate.subscribe(fn);
        }
        get url() {
            return `${this.pathname}${this.search}${this.hash}`;
        }
        setHash(value, oldUrl) {
            if (this.hash === value) {
                // Don't fire events if the hash has not changed.
                return;
            }
            this.hash = value;
            const newUrl = this.url;
            scheduleMicroTask(() => this._hashUpdate.next({ type: 'hashchange', state: null, oldUrl, newUrl }));
        }
        replaceState(state, title, newUrl) {
            const oldUrl = this.url;
            const parsedUrl = parseUrl(newUrl);
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.setHash(parsedUrl.hash, oldUrl);
        }
        pushState(state, title, newUrl) {
            this.replaceState(state, title, newUrl);
        }
        forward() {
            throw new Error('Not implemented');
        }
        back() {
            throw new Error('Not implemented');
        }
        // History API isn't available on server, therefore return undefined
        getState() {
            return undefined;
        }
    }
    ServerPlatformLocation.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ServerPlatformLocation.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
    ];
    return ServerPlatformLocation;
})();
export { ServerPlatformLocation };
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQWlFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUd4RCxTQUFTLFFBQVEsQ0FBQyxNQUFjO0lBQzlCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTztRQUNMLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRTtRQUNsQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1FBQzFCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTtRQUM5QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0g7SUFBQSxNQUNhLHNCQUFzQjtRQVVqQyxZQUM4QixJQUFTLEVBQXNDLE9BQVk7WUFBM0QsU0FBSSxHQUFKLElBQUksQ0FBSztZQVZ2QixTQUFJLEdBQVcsR0FBRyxDQUFDO1lBQ25CLGFBQVEsR0FBVyxHQUFHLENB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Q0FBQztRQUNyQyxDQUFDO1FBRUQsb0VBQW9FO1FBQ3BFLFFBQVE7WUFDTixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDOzs7Z0JBN0VGLFVBQVU7Ozs7Z0RBWUosTUFBTSxTQUFDLFFBQVE7Z0RBQXNCLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs7SUFrRTdFLDZCQUFDO0tBQUE7U0E3RVksc0JBQXNCO0FBK0VuQyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBWTtJQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgTG9jYXRpb25DaGFuZ2VFdmVudCwgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbiwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuZnVuY3Rpb24gcGFyc2VVcmwodXJsU3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHVybFN0cik7XG4gIHJldHVybiB7XG4gICAgaG9zdG5hbWU6IHBhcnNlZFVybC5ob3N0bmFtZSB8fCAnJyxcbiAgICBwcm90b2NvbDogcGFyc2VkVXJsLnByb3RvY29sIHx8ICcnLFxuICAgIHBvcnQ6IHBhcnNlZFVybC5wb3J0IHx8ICcnLFxuICAgIHBhdGhuYW1lOiBwYXJzZWRVcmwucGF0aG5hbWUgfHwgJycsXG4gICAgc2VhcmNoOiBwYXJzZWRVcmwuc2VhcmNoIHx8ICcnLFxuICAgIGhhc2g6IHBhcnNlZFVybC5oYXNoIHx8ICcnLFxuICB9O1xufVxuXG4vKipcbiAqIFNlcnZlci1zaWRlIGltcGxlbWVudGF0aW9uIG9mIFVSTCBzdGF0ZS4gSW1wbGVtZW50cyBgcGF0aG5hbWVgLCBgc2VhcmNoYCwgYW5kIGBoYXNoYFxuICogYnV0IG5vdCB0aGUgc3RhdGUgc3RhY2suXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uIGltcGxlbWVudHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHB1YmxpYyByZWFkb25seSBocmVmOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBob3N0bmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvdG9jb2w6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBvcnQ6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBhdGhuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBzZWFyY2g6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hhc2hVcGRhdGUgPSBuZXcgU3ViamVjdDxMb2NhdGlvbkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoSU5JVElBTF9DT05GSUcpIF9jb25maWc6IGFueSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IF9jb25maWcgYXMgUGxhdGZvcm1Db25maWcgfCBudWxsO1xuICAgIGlmICghIWNvbmZpZyAmJiAhIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKGNvbmZpZy51cmwpO1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgICAgIHRoaXMucHJvdG9jb2wgPSBwYXJzZWRVcmwucHJvdG9jb2w7XG4gICAgICB0aGlzLnBvcnQgPSBwYXJzZWRVcmwucG9ydDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgICB0aGlzLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgICB0aGlzLmhhc2ggPSBwYXJzZWRVcmwuaGFzaDtcbiAgICB9XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSE7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgLy8gTm8tb3A6IGEgc3RhdGUgc3RhY2sgaXMgbm90IGltcGxlbWVudGVkLCBzb1xuICAgIC8vIG5vIGV2ZW50cyB3aWxsIGV2ZXIgY29tZS5cbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX2hhc2hVcGRhdGUuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7XG4gIH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhcyB7aGFzaDogc3RyaW5nfSkuaGFzaCA9IHZhbHVlO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMudXJsO1xuICAgIHNjaGVkdWxlTWljcm9UYXNrKFxuICAgICAgICAoKSA9PiB0aGlzLl9oYXNoVXBkYXRlLm5leHQoXG4gICAgICAgICAgICB7dHlwZTogJ2hhc2hjaGFuZ2UnLCBzdGF0ZTogbnVsbCwgb2xkVXJsLCBuZXdVcmx9IGFzIExvY2F0aW9uQ2hhbmdlRXZlbnQpKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFVybCA9IHRoaXMudXJsO1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKG5ld1VybCk7XG4gICAgKHRoaXMgYXMge3BhdGhuYW1lOiBzdHJpbmd9KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhcyB7c2VhcmNoOiBzdHJpbmd9KS5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgIHRoaXMuc2V0SGFzaChwYXJzZWRVcmwuaGFzaCwgb2xkVXJsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgbmV3VXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBzZXJ2ZXIsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKGZuOiBGdW5jdGlvbikge1xuICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soJ3NjaGVkdWxlTWljcm90YXNrJywgZm4pO1xufVxuIl19