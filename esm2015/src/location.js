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
import * as i0 from "@angular/core";
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
    ServerPlatformLocation.ɵfac = function ServerPlatformLocation_Factory(t) { return new (t || ServerPlatformLocation)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(INITIAL_CONFIG, 8)); };
    ServerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: ServerPlatformLocation, factory: ServerPlatformLocation.ɵfac });
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
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQWlFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQzs7QUFHeEQsU0FBUyxRQUFRLENBQUMsTUFBYztJQUM5QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLE9BQU87UUFDTCxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUMxQixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtLQUMzQixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNIO0lBQUEsTUFDYSxzQkFBc0I7UUFVakMsWUFDOEIsSUFBUyxFQUFzQyxPQUFZO1lBQTNELFNBQUksR0FBSixJQUFJLENBQUs7WUFWdkIsU0FBSSxHQUFXLEdBQUcsQ0FBQztZQUNuQixhQUFRLEdBQVcsR0FBRyxD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LENBQUM7UUFDckMsQ0FBQztRQUVELG9FQUFvRTtRQUNwRSxRQUFRO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7Z0dBNUVVLHNCQUFzQixjQVdyQixRQUFRLGVBQXlDLGNBQWM7a0VBWGhFLHNCQUFzQixXQUF0QixzQkFBc0I7aUNBaENuQztLQTZHQztTQTdFWSxzQkFBc0I7a0RBQXRCLHNCQUFzQjtjQURsQyxVQUFVOztzQkFZSixNQUFNO3VCQUFDLFFBQVE7O3NCQUFzQixRQUFROztzQkFBSSxNQUFNO3VCQUFDLGNBQWM7O0FBb0U3RSxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBWTtJQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgTG9jYXRpb25DaGFuZ2VFdmVudCwgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbiwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuZnVuY3Rpb24gcGFyc2VVcmwodXJsU3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHVybFN0cik7XG4gIHJldHVybiB7XG4gICAgaG9zdG5hbWU6IHBhcnNlZFVybC5ob3N0bmFtZSB8fCAnJyxcbiAgICBwcm90b2NvbDogcGFyc2VkVXJsLnByb3RvY29sIHx8ICcnLFxuICAgIHBvcnQ6IHBhcnNlZFVybC5wb3J0IHx8ICcnLFxuICAgIHBhdGhuYW1lOiBwYXJzZWRVcmwucGF0aG5hbWUgfHwgJycsXG4gICAgc2VhcmNoOiBwYXJzZWRVcmwuc2VhcmNoIHx8ICcnLFxuICAgIGhhc2g6IHBhcnNlZFVybC5oYXNoIHx8ICcnLFxuICB9O1xufVxuXG4vKipcbiAqIFNlcnZlci1zaWRlIGltcGxlbWVudGF0aW9uIG9mIFVSTCBzdGF0ZS4gSW1wbGVtZW50cyBgcGF0aG5hbWVgLCBgc2VhcmNoYCwgYW5kIGBoYXNoYFxuICogYnV0IG5vdCB0aGUgc3RhdGUgc3RhY2suXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uIGltcGxlbWVudHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHB1YmxpYyByZWFkb25seSBocmVmOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBob3N0bmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvdG9jb2w6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBvcnQ6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBhdGhuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBzZWFyY2g6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hhc2hVcGRhdGUgPSBuZXcgU3ViamVjdDxMb2NhdGlvbkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoSU5JVElBTF9DT05GSUcpIF9jb25maWc6IGFueSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IF9jb25maWcgYXMgUGxhdGZvcm1Db25maWcgfCBudWxsO1xuICAgIGlmICghIWNvbmZpZyAmJiAhIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKGNvbmZpZy51cmwpO1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgICAgIHRoaXMucHJvdG9jb2wgPSBwYXJzZWRVcmwucHJvdG9jb2w7XG4gICAgICB0aGlzLnBvcnQgPSBwYXJzZWRVcmwucG9ydDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgICB0aGlzLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgICB0aGlzLmhhc2ggPSBwYXJzZWRVcmwuaGFzaDtcbiAgICB9XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSE7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgLy8gTm8tb3A6IGEgc3RhdGUgc3RhY2sgaXMgbm90IGltcGxlbWVudGVkLCBzb1xuICAgIC8vIG5vIGV2ZW50cyB3aWxsIGV2ZXIgY29tZS5cbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX2hhc2hVcGRhdGUuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7XG4gIH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhcyB7aGFzaDogc3RyaW5nfSkuaGFzaCA9IHZhbHVlO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMudXJsO1xuICAgIHNjaGVkdWxlTWljcm9UYXNrKFxuICAgICAgICAoKSA9PiB0aGlzLl9oYXNoVXBkYXRlLm5leHQoXG4gICAgICAgICAgICB7dHlwZTogJ2hhc2hjaGFuZ2UnLCBzdGF0ZTogbnVsbCwgb2xkVXJsLCBuZXdVcmx9IGFzIExvY2F0aW9uQ2hhbmdlRXZlbnQpKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFVybCA9IHRoaXMudXJsO1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKG5ld1VybCk7XG4gICAgKHRoaXMgYXMge3BhdGhuYW1lOiBzdHJpbmd9KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhcyB7c2VhcmNoOiBzdHJpbmd9KS5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgIHRoaXMuc2V0SGFzaChwYXJzZWRVcmwuaGFzaCwgb2xkVXJsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgbmV3VXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBzZXJ2ZXIsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKGZuOiBGdW5jdGlvbikge1xuICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soJ3NjaGVkdWxlTWljcm90YXNrJywgZm4pO1xufVxuIl19