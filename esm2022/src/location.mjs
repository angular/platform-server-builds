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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0+sha-fc6b2f2", ngImport: i0, type: ServerPlatformLocation, deps: [{ token: DOCUMENT }, { token: INITIAL_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0+sha-fc6b2f2", ngImport: i0, type: ServerPlatformLocation }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0+sha-fc6b2f2", ngImport: i0, type: ServerPlatformLocation, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQWlFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxVQUFVLENBQUM7O0FBRXhELE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO0FBRXBDLFNBQVMsUUFBUSxDQUFDLE1BQWM7SUFROUIsSUFBSSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDO0lBRWxHOzs7Ozs7O09BT0c7SUFDSCxJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0UsSUFBSSxHQUFHLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQzVDO0lBRUQsSUFBSSxRQUFRLEtBQUssZ0JBQWdCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDN0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSx3QkFBd0I7S0FDeEQ7SUFDRCxXQUFXO0lBRVgsT0FBTztRQUNMLFFBQVE7UUFDUixRQUFRLEVBQUUsUUFBUSxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDdkQsSUFBSTtRQUNKLFFBQVE7UUFDUixNQUFNO1FBQ04sSUFBSTtLQUNMLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLHNCQUFzQjtJQVVqQyxZQUM4QixJQUFTLEVBQXNDLE9BQVk7UUFBM0QsU0FBSSxHQUFKLElBQUksQ0FBSztRQVZ2QixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBQ25CLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFDdkIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBQ25CLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFDdkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUM7UUFJdkQsTUFBTSxNQUFNLEdBQUcsT0FBZ0MsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTztTQUNSO1FBQ0QsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7YUFDckY7WUFDRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUEwQjtRQUNuQyw4Q0FBOEM7UUFDOUMsNEJBQTRCO1FBQzVCLE9BQU8sR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBMEI7UUFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFTyxPQUFPLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN2QixpREFBaUQ7WUFDakQsT0FBTztTQUNSO1FBQ0EsSUFBdUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsY0FBYyxDQUNWLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUN2QixFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUF3QixDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxJQUF1QixDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3RELElBQXVCLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVSxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLFFBQVE7UUFDTixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO3lIQTNGVSxzQkFBc0Isa0JBV3JCLFFBQVEsYUFBeUMsY0FBYzs2SEFYaEUsc0JBQXNCOztzR0FBdEIsc0JBQXNCO2tCQURsQyxVQUFVOzswQkFZSixNQUFNOzJCQUFDLFFBQVE7OzBCQUFzQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgTG9jYXRpb25DaGFuZ2VFdmVudCwgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbiwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCDJtVdyaXRhYmxlIGFzIFdyaXRhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cbmNvbnN0IFJFU09MVkVfUFJPVE9DT0wgPSAncmVzb2x2ZTonO1xuXG5mdW5jdGlvbiBwYXJzZVVybCh1cmxTdHI6IHN0cmluZyk6IHtcbiAgaG9zdG5hbWU6IHN0cmluZyxcbiAgcHJvdG9jb2w6IHN0cmluZyxcbiAgcG9ydDogc3RyaW5nLFxuICBwYXRobmFtZTogc3RyaW5nLFxuICBzZWFyY2g6IHN0cmluZyxcbiAgaGFzaDogc3RyaW5nLFxufSB7XG4gIGxldCB7aG9zdG5hbWUsIHByb3RvY29sLCBwb3J0LCBwYXRobmFtZSwgc2VhcmNoLCBoYXNofSA9IG5ldyBVUkwodXJsU3RyLCBSRVNPTFZFX1BST1RPQ09MICsgJy8vJyk7XG5cbiAgLyoqXG4gICAqIFRPRE8oYWxhbmFnaXVzKTogUmVtb3ZlIHRoZSBiZWxvdyBpbiB2ZXJzaW9uIDE4LlxuICAgKiBUaGUgZm9sbG93aW5nIGFyZSBkb25lIHRvIG1haW50YWluIHRoZSBzYW1lIGJlaGF2aW91ciBhcyBgdXJsLnBhcnNlYC5cbiAgICogVGhlIG1haW4gZGlmZmVyZW5jZXMgYXJlO1xuICAgKiAgLSBgcGF0aG5hbWVgIGlzIGFsd2F5cyBzdWZmaXhlZCB3aXRoIGEgYC9gLlxuICAgKiAgLSBgcG9ydGAgaXMgZW1wdHkgd2hlbiBgaHR0cDpgIHByb3RvY29sIGFuZCBwb3J0IGluIHVybCBpcyBgODBgXG4gICAqICAtIGBwb3J0YCBpcyBlbXB0eSB3aGVuIGBodHRwczpgIHByb3RvY29sIGFuZCBwb3J0IGluIHVybCBpcyBgNDQzYFxuICAgKi9cbiAgaWYgKHByb3RvY29sICE9PSBSRVNPTFZFX1BST1RPQ09MICYmIHBvcnQgPT09ICcnICYmIC9cXDooODB8NDQzKS8udGVzdCh1cmxTdHIpKSB7XG4gICAgcG9ydCA9IHByb3RvY29sID09PSAnaHR0cDonID8gJzgwJyA6ICc0NDMnO1xuICB9XG5cbiAgaWYgKHByb3RvY29sID09PSBSRVNPTFZFX1BST1RPQ09MICYmIHVybFN0ci5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UoMSk7ICAvLyBSZW1vdmUgbGVhZGluZyBzbGFzaC5cbiAgfVxuICAvLyBFTkQgVE9ET1xuXG4gIHJldHVybiB7XG4gICAgaG9zdG5hbWUsXG4gICAgcHJvdG9jb2w6IHByb3RvY29sID09PSBSRVNPTFZFX1BST1RPQ09MID8gJycgOiBwcm90b2NvbCxcbiAgICBwb3J0LFxuICAgIHBhdGhuYW1lLFxuICAgIHNlYXJjaCxcbiAgICBoYXNoLFxuICB9O1xufVxuXG4vKipcbiAqIFNlcnZlci1zaWRlIGltcGxlbWVudGF0aW9uIG9mIFVSTCBzdGF0ZS4gSW1wbGVtZW50cyBgcGF0aG5hbWVgLCBgc2VhcmNoYCwgYW5kIGBoYXNoYFxuICogYnV0IG5vdCB0aGUgc3RhdGUgc3RhY2suXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uIGltcGxlbWVudHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHB1YmxpYyByZWFkb25seSBocmVmOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBob3N0bmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvdG9jb2w6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBvcnQ6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHBhdGhuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBzZWFyY2g6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hhc2hVcGRhdGUgPSBuZXcgU3ViamVjdDxMb2NhdGlvbkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoSU5JVElBTF9DT05GSUcpIF9jb25maWc6IGFueSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IF9jb25maWcgYXMgUGxhdGZvcm1Db25maWcgfCBudWxsO1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb25maWcudXJsKSB7XG4gICAgICBjb25zdCB1cmwgPSBwYXJzZVVybChjb25maWcudXJsKTtcbiAgICAgIHRoaXMucHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdXJsLmhvc3RuYW1lO1xuICAgICAgdGhpcy5wb3J0ID0gdXJsLnBvcnQ7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gdXJsLnBhdGhuYW1lO1xuICAgICAgdGhpcy5zZWFyY2ggPSB1cmwuc2VhcmNoO1xuICAgICAgdGhpcy5oYXNoID0gdXJsLmhhc2g7XG4gICAgICB0aGlzLmhyZWYgPSBfZG9jLmxvY2F0aW9uLmhyZWY7XG4gICAgfVxuICAgIGlmIChjb25maWcudXNlQWJzb2x1dGVVcmwpIHtcbiAgICAgIGlmICghY29uZmlnLmJhc2VVcmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIlBsYXRmb3JtQ29uZmlnLmJhc2VVcmxcIiBtdXN0IGJlIHNldCBpZiBcInVzZUFic29sdXRlVXJsXCIgaXMgdHJ1ZWApO1xuICAgICAgfVxuICAgICAgY29uc3QgdXJsID0gcGFyc2VVcmwoY29uZmlnLmJhc2VVcmwpO1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHVybC5wcm90b2NvbDtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB1cmwuaG9zdG5hbWU7XG4gICAgICB0aGlzLnBvcnQgPSB1cmwucG9ydDtcbiAgICB9XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkuZ2V0QmFzZUhyZWYodGhpcy5fZG9jKSE7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogVm9pZEZ1bmN0aW9uIHtcbiAgICAvLyBOby1vcDogYSBzdGF0ZSBzdGFjayBpcyBub3QgaW1wbGVtZW50ZWQsIHNvXG4gICAgLy8gbm8gZXZlbnRzIHdpbGwgZXZlciBjb21lLlxuICAgIHJldHVybiAoKSA9PiB7fTtcbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IFZvaWRGdW5jdGlvbiB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5faGFzaFVwZGF0ZS5zdWJzY3JpYmUoZm4pO1xuICAgIHJldHVybiAoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5wYXRobmFtZX0ke3RoaXMuc2VhcmNofSR7dGhpcy5oYXNofWA7XG4gIH1cblxuICBwcml2YXRlIHNldEhhc2godmFsdWU6IHN0cmluZywgb2xkVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5oYXNoID09PSB2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgdGhlIGhhc2ggaGFzIG5vdCBjaGFuZ2VkLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcyBhcyBXcml0YWJsZTx0aGlzPikuaGFzaCA9IHZhbHVlO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMudXJsO1xuICAgIHF1ZXVlTWljcm90YXNrKFxuICAgICAgICAoKSA9PiB0aGlzLl9oYXNoVXBkYXRlLm5leHQoXG4gICAgICAgICAgICB7dHlwZTogJ2hhc2hjaGFuZ2UnLCBzdGF0ZTogbnVsbCwgb2xkVXJsLCBuZXdVcmx9IGFzIExvY2F0aW9uQ2hhbmdlRXZlbnQpKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFVybCA9IHRoaXMudXJsO1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IHBhcnNlVXJsKG5ld1VybCk7XG4gICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLnBhdGhuYW1lID0gcGFyc2VkVXJsLnBhdGhuYW1lO1xuICAgICh0aGlzIGFzIFdyaXRhYmxlPHRoaXM+KS5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgIHRoaXMuc2V0SGFzaChwYXJzZWRVcmwuaGFzaCwgb2xkVXJsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgbmV3VXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBzZXJ2ZXIsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==