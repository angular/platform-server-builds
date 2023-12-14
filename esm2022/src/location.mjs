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
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
const RESOLVE_PROTOCOL = 'resolve:';
function parseUrl(urlStr) {
    let { hostname, protocol, port, pathname, search, hash } = new URL(urlStr, RESOLVE_PROTOCOL + '//');
    /**
     * TODO(alanagius): Remove the below in version 18.
     * The following are done to maintain the same behaviour as `url.parse`.
     * The main differences are;
     *  - `pathname` is always suffixed with a `/`.
     *  - `port` is empty when `http:` protocol and port in url is `80`
     *  - `port` is empty when `https:` protocol and port in url is `443`
     */
    if (protocol !== RESOLVE_PROTOCOL && port === '' && /\:(80|443)/.test(urlStr)) {
        port = protocol === 'http:' ? '80' : '443';
    }
    if (protocol === RESOLVE_PROTOCOL && urlStr.charAt(0) !== '/') {
        pathname = pathname.slice(1); // Remove leading slash.
    }
    // END TODO
    return {
        hostname,
        protocol: protocol === RESOLVE_PROTOCOL ? '' : protocol,
        port,
        pathname,
        search,
        hash,
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
export class ServerPlatformLocation {
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
        if (!config) {
            return;
        }
        if (config.url) {
            const url = parseUrl(config.url);
            this.protocol = url.protocol;
            this.hostname = url.hostname;
            this.port = url.port;
            this.pathname = url.pathname;
            this.search = url.search;
            this.hash = url.hash;
            this.href = _doc.location.href;
        }
        if (config.useAbsoluteUrl) {
            if (!config.baseUrl) {
                throw new Error(`"PlatformConfig.baseUrl" must be set if "useAbsoluteUrl" is true`);
            }
            const url = parseUrl(config.baseUrl);
            this.protocol = url.protocol;
            this.hostname = url.hostname;
            this.port = url.port;
        }
    }
    getBaseHrefFromDOM() {
        return getDOM().getBaseHref(this._doc);
    }
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
        return () => { };
    }
    onHashChange(fn) {
        const subscription = this._hashUpdate.subscribe(fn);
        return () => subscription.unsubscribe();
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
        queueMicrotask(() => this._hashUpdate.next({ type: 'hashchange', state: null, oldUrl, newUrl }));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.4+sha-606de51", ngImport: i0, type: ServerPlatformLocation, deps: [{ token: DOCUMENT }, { token: INITIAL_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.4+sha-606de51", ngImport: i0, type: ServerPlatformLocation }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.4+sha-606de51", ngImport: i0, type: ServerPlatformLocation, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [INITIAL_CONFIG]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQWlFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxVQUFVLENBQUM7O0FBRXhELE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO0FBRXBDLFNBQVMsUUFBUSxDQUFDLE1BQWM7SUFROUIsSUFBSSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDO0lBRWxHOzs7Ozs7O09BT0c7SUFDSCxJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM5RSxJQUFJLEdBQUcsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksUUFBUSxLQUFLLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDOUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSx3QkFBd0I7SUFDekQsQ0FBQztJQUNELFdBQVc7SUFFWCxPQUFPO1FBQ0wsUUFBUTtRQUNSLFFBQVEsRUFBRSxRQUFRLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUN2RCxJQUFJO1FBQ0osUUFBUTtRQUNSLE1BQU07UUFDTixJQUFJO0tBQ0wsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQzhCLElBQVMsRUFBc0MsT0FBWTtRQUEzRCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBVnZCLFNBQUksR0FBVyxHQUFHLENBQUM7UUFDbkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLFNBQUksR0FBVyxHQUFHLENBQUM7UUFDbkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztRQUl2RCxNQUFNLE1BQU0sR0FBRyxPQUFnQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztZQUN0RixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUEwQjtRQUNuQyw4Q0FBOEM7UUFDOUMsNEJBQTRCO1FBQzVCLE9BQU8sR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBMEI7UUFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFTyxPQUFPLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ3hCLGlEQUFpRDtZQUNqRCxPQUFPO1FBQ1QsQ0FBQztRQUNBLElBQXVCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hCLGNBQWMsQ0FDVixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdkIsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBd0IsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBdUIsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN0RCxJQUF1QixDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELG9FQUFvRTtJQUNwRSxRQUFRO1FBQ04sT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzt5SEEzRlUsc0JBQXNCLGtCQVdyQixRQUFRLGFBQXlDLGNBQWM7NkhBWGhFLHNCQUFzQjs7c0dBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVTs7MEJBWUosTUFBTTsyQkFBQyxRQUFROzswQkFBc0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIExvY2F0aW9uQ2hhbmdlRXZlbnQsIExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb24sIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgybVXcml0YWJsZSBhcyBXcml0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5jb25zdCBSRVNPTFZFX1BST1RPQ09MID0gJ3Jlc29sdmU6JztcblxuZnVuY3Rpb24gcGFyc2VVcmwodXJsU3RyOiBzdHJpbmcpOiB7XG4gIGhvc3RuYW1lOiBzdHJpbmcsXG4gIHByb3RvY29sOiBzdHJpbmcsXG4gIHBvcnQ6IHN0cmluZyxcbiAgcGF0aG5hbWU6IHN0cmluZyxcbiAgc2VhcmNoOiBzdHJpbmcsXG4gIGhhc2g6IHN0cmluZyxcbn0ge1xuICBsZXQge2hvc3RuYW1lLCBwcm90b2NvbCwgcG9ydCwgcGF0aG5hbWUsIHNlYXJjaCwgaGFzaH0gPSBuZXcgVVJMKHVybFN0ciwgUkVTT0xWRV9QUk9UT0NPTCArICcvLycpO1xuXG4gIC8qKlxuICAgKiBUT0RPKGFsYW5hZ2l1cyk6IFJlbW92ZSB0aGUgYmVsb3cgaW4gdmVyc2lvbiAxOC5cbiAgICogVGhlIGZvbGxvd2luZyBhcmUgZG9uZSB0byBtYWludGFpbiB0aGUgc2FtZSBiZWhhdmlvdXIgYXMgYHVybC5wYXJzZWAuXG4gICAqIFRoZSBtYWluIGRpZmZlcmVuY2VzIGFyZTtcbiAgICogIC0gYHBhdGhuYW1lYCBpcyBhbHdheXMgc3VmZml4ZWQgd2l0aCBhIGAvYC5cbiAgICogIC0gYHBvcnRgIGlzIGVtcHR5IHdoZW4gYGh0dHA6YCBwcm90b2NvbCBhbmQgcG9ydCBpbiB1cmwgaXMgYDgwYFxuICAgKiAgLSBgcG9ydGAgaXMgZW1wdHkgd2hlbiBgaHR0cHM6YCBwcm90b2NvbCBhbmQgcG9ydCBpbiB1cmwgaXMgYDQ0M2BcbiAgICovXG4gIGlmIChwcm90b2NvbCAhPT0gUkVTT0xWRV9QUk9UT0NPTCAmJiBwb3J0ID09PSAnJyAmJiAvXFw6KDgwfDQ0MykvLnRlc3QodXJsU3RyKSkge1xuICAgIHBvcnQgPSBwcm90b2NvbCA9PT0gJ2h0dHA6JyA/ICc4MCcgOiAnNDQzJztcbiAgfVxuXG4gIGlmIChwcm90b2NvbCA9PT0gUkVTT0xWRV9QUk9UT0NPTCAmJiB1cmxTdHIuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDEpOyAgLy8gUmVtb3ZlIGxlYWRpbmcgc2xhc2guXG4gIH1cbiAgLy8gRU5EIFRPRE9cblxuICByZXR1cm4ge1xuICAgIGhvc3RuYW1lLFxuICAgIHByb3RvY29sOiBwcm90b2NvbCA9PT0gUkVTT0xWRV9QUk9UT0NPTCA/ICcnIDogcHJvdG9jb2wsXG4gICAgcG9ydCxcbiAgICBwYXRobmFtZSxcbiAgICBzZWFyY2gsXG4gICAgaGFzaCxcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXJ2ZXItc2lkZSBpbXBsZW1lbnRhdGlvbiBvZiBVUkwgc3RhdGUuIEltcGxlbWVudHMgYHBhdGhuYW1lYCwgYHNlYXJjaGAsIGFuZCBgaGFzaGBcbiAqIGJ1dCBub3QgdGhlIHN0YXRlIHN0YWNrLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyUGxhdGZvcm1Mb2NhdGlvbiBpbXBsZW1lbnRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgaHJlZjogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgaG9zdG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHByb3RvY29sOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwb3J0OiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwYXRobmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgc2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHJlYWRvbmx5IGhhc2g6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9oYXNoVXBkYXRlID0gbmV3IFN1YmplY3Q8TG9jYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55LCBAT3B0aW9uYWwoKSBASW5qZWN0KElOSVRJQUxfQ09ORklHKSBfY29uZmlnOiBhbnkpIHtcbiAgICBjb25zdCBjb25maWcgPSBfY29uZmlnIGFzIFBsYXRmb3JtQ29uZmlnIHwgbnVsbDtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnVybCkge1xuICAgICAgY29uc3QgdXJsID0gcGFyc2VVcmwoY29uZmlnLnVybCk7XG4gICAgICB0aGlzLnByb3RvY29sID0gdXJsLnByb3RvY29sO1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHVybC5ob3N0bmFtZTtcbiAgICAgIHRoaXMucG9ydCA9IHVybC5wb3J0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gdXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHVybC5oYXNoO1xuICAgICAgdGhpcy5ocmVmID0gX2RvYy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnVzZUFic29sdXRlVXJsKSB7XG4gICAgICBpZiAoIWNvbmZpZy5iYXNlVXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgXCJQbGF0Zm9ybUNvbmZpZy5iYXNlVXJsXCIgbXVzdCBiZSBzZXQgaWYgXCJ1c2VBYnNvbHV0ZVVybFwiIGlzIHRydWVgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVybCA9IHBhcnNlVXJsKGNvbmZpZy5iYXNlVXJsKTtcbiAgICAgIHRoaXMucHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdXJsLmhvc3RuYW1lO1xuICAgICAgdGhpcy5wb3J0ID0gdXJsLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGdldERPTSgpLmdldEJhc2VIcmVmKHRoaXMuX2RvYykhO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IFZvaWRGdW5jdGlvbiB7XG4gICAgLy8gTm8tb3A6IGEgc3RhdGUgc3RhY2sgaXMgbm90IGltcGxlbWVudGVkLCBzb1xuICAgIC8vIG5vIGV2ZW50cyB3aWxsIGV2ZXIgY29tZS5cbiAgICByZXR1cm4gKCkgPT4ge307XG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiBWb2lkRnVuY3Rpb24ge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuX2hhc2hVcGRhdGUuc3Vic2NyaWJlKGZuKTtcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMucGF0aG5hbWV9JHt0aGlzLnNlYXJjaH0ke3RoaXMuaGFzaH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRIYXNoKHZhbHVlOiBzdHJpbmcsIG9sZFVybDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzaCA9PT0gdmFsdWUpIHtcbiAgICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIHRoZSBoYXNoIGhhcyBub3QgY2hhbmdlZC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLmhhc2ggPSB2YWx1ZTtcbiAgICBjb25zdCBuZXdVcmwgPSB0aGlzLnVybDtcbiAgICBxdWV1ZU1pY3JvdGFzayhcbiAgICAgICAgKCkgPT4gdGhpcy5faGFzaFVwZGF0ZS5uZXh0KFxuICAgICAgICAgICAge3R5cGU6ICdoYXNoY2hhbmdlJywgc3RhdGU6IG51bGwsIG9sZFVybCwgbmV3VXJsfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRVcmwgPSB0aGlzLnVybDtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChuZXdVcmwpO1xuICAgICh0aGlzIGFzIFdyaXRhYmxlPHRoaXM+KS5wYXRobmFtZSA9IHBhcnNlZFVybC5wYXRobmFtZTtcbiAgICAodGhpcyBhcyBXcml0YWJsZTx0aGlzPikuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICB0aGlzLnNldEhhc2gocGFyc2VkVXJsLmhhc2gsIG9sZFVybCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIG5ld1VybCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gc2VydmVyLCB0aGVyZWZvcmUgcmV0dXJuIHVuZGVmaW5lZFxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=