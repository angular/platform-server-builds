/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT, ɵgetDOM as getDOM, } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
const RESOLVE_PROTOCOL = 'resolve:';
function parseUrl(urlStr) {
    const { hostname, protocol, port, pathname, search, hash } = new URL(urlStr, RESOLVE_PROTOCOL + '//');
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
        queueMicrotask(() => this._hashUpdate.next({
            type: 'hashchange',
            state: null,
            oldUrl,
            newUrl,
        }));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9+sha-69dce38", ngImport: i0, type: ServerPlatformLocation, deps: [{ token: DOCUMENT }, { token: INITIAL_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9+sha-69dce38", ngImport: i0, type: ServerPlatformLocation }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9+sha-69dce38", ngImport: i0, type: ServerPlatformLocation, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxRQUFRLEVBSVIsT0FBTyxJQUFJLE1BQU0sR0FDbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLGNBQWMsRUFBaUIsTUFBTSxVQUFVLENBQUM7O0FBRXhELE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO0FBRXBDLFNBQVMsUUFBUSxDQUFDLE1BQWM7SUFROUIsTUFBTSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxHQUFHLENBQ2hFLE1BQU0sRUFDTixnQkFBZ0IsR0FBRyxJQUFJLENBQ3hCLENBQUM7SUFFRixPQUFPO1FBQ0wsUUFBUTtRQUNSLFFBQVEsRUFBRSxRQUFRLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUN2RCxJQUFJO1FBQ0osUUFBUTtRQUNSLE1BQU07UUFDTixJQUFJO0tBQ0wsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQzRCLElBQVMsRUFDQyxPQUFZO1FBRHRCLFNBQUksR0FBSixJQUFJLENBQUs7UUFWckIsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQUNuQixhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFDdkIsU0FBSSxHQUFXLEdB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RUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLFFBQVE7UUFDTixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO3lIQXpGVSxzQkFBc0Isa0JBV3ZCLFFBQVEsYUFDSSxjQUFjOzZIQVp6QixzQkFBc0I7O3NHQUF0QixzQkFBc0I7a0JBRGxDLFVBQVU7OzBCQVlOLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBET0NVTUVOVCxcbiAgTG9jYXRpb25DaGFuZ2VFdmVudCxcbiAgTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcixcbiAgUGxhdGZvcm1Mb2NhdGlvbixcbiAgybVnZXRET00gYXMgZ2V0RE9NLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCDJtVdyaXRhYmxlIGFzIFdyaXRhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cbmNvbnN0IFJFU09MVkVfUFJPVE9DT0wgPSAncmVzb2x2ZTonO1xuXG5mdW5jdGlvbiBwYXJzZVVybCh1cmxTdHI6IHN0cmluZyk6IHtcbiAgaG9zdG5hbWU6IHN0cmluZztcbiAgcHJvdG9jb2w6IHN0cmluZztcbiAgcG9ydDogc3RyaW5nO1xuICBwYXRobmFtZTogc3RyaW5nO1xuICBzZWFyY2g6IHN0cmluZztcbiAgaGFzaDogc3RyaW5nO1xufSB7XG4gIGNvbnN0IHtob3N0bmFtZSwgcHJvdG9jb2wsIHBvcnQsIHBhdGhuYW1lLCBzZWFyY2gsIGhhc2h9ID0gbmV3IFVSTChcbiAgICB1cmxTdHIsXG4gICAgUkVTT0xWRV9QUk9UT0NPTCArICcvLycsXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBob3N0bmFtZSxcbiAgICBwcm90b2NvbDogcHJvdG9jb2wgPT09IFJFU09MVkVfUFJPVE9DT0wgPyAnJyA6IHByb3RvY29sLFxuICAgIHBvcnQsXG4gICAgcGF0aG5hbWUsXG4gICAgc2VhcmNoLFxuICAgIGhhc2gsXG4gIH07XG59XG5cbi8qKlxuICogU2VydmVyLXNpZGUgaW1wbGVtZW50YXRpb24gb2YgVVJMIHN0YXRlLiBJbXBsZW1lbnRzIGBwYXRobmFtZWAsIGBzZWFyY2hgLCBhbmQgYGhhc2hgXG4gKiBidXQgbm90IHRoZSBzdGF0ZSBzdGFjay5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBsYXRmb3JtTG9jYXRpb24gaW1wbGVtZW50cyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IGhyZWY6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IGhvc3RuYW1lOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwcm90b2NvbDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcG9ydDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgcGF0aG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHNlYXJjaDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyByZWFkb25seSBoYXNoOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfaGFzaFVwZGF0ZSA9IG5ldyBTdWJqZWN0PExvY2F0aW9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChJTklUSUFMX0NPTkZJRykgX2NvbmZpZzogYW55LFxuICApIHtcbiAgICBjb25zdCBjb25maWcgPSBfY29uZmlnIGFzIFBsYXRmb3JtQ29uZmlnIHwgbnVsbDtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnVybCkge1xuICAgICAgY29uc3QgdXJsID0gcGFyc2VVcmwoY29uZmlnLnVybCk7XG4gICAgICB0aGlzLnByb3RvY29sID0gdXJsLnByb3RvY29sO1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHVybC5ob3N0bmFtZTtcbiAgICAgIHRoaXMucG9ydCA9IHVybC5wb3J0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHVybC5wYXRobmFtZTtcbiAgICAgIHRoaXMuc2VhcmNoID0gdXJsLnNlYXJjaDtcbiAgICAgIHRoaXMuaGFzaCA9IHVybC5oYXNoO1xuICAgICAgdGhpcy5ocmVmID0gX2RvYy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRET00oKS5nZXRCYXNlSHJlZih0aGlzLl9kb2MpITtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiBWb2lkRnVuY3Rpb24ge1xuICAgIC8vIE5vLW9wOiBhIHN0YXRlIHN0YWNrIGlzIG5vdCBpbXBsZW1lbnRlZCwgc29cbiAgICAvLyBubyBldmVudHMgd2lsbCBldmVyIGNvbWUuXG4gICAgcmV0dXJuICgpID0+IHt9O1xuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogVm9pZEZ1bmN0aW9uIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLl9oYXNoVXBkYXRlLnN1YnNjcmliZShmbik7XG4gICAgcmV0dXJuICgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLnBhdGhuYW1lfSR7dGhpcy5zZWFyY2h9JHt0aGlzLmhhc2h9YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGFzaCh2YWx1ZTogc3RyaW5nLCBvbGRVcmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmhhc2ggPT09IHZhbHVlKSB7XG4gICAgICAvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiB0aGUgaGFzaCBoYXMgbm90IGNoYW5nZWQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICh0aGlzIGFzIFdyaXRhYmxlPHRoaXM+KS5oYXNoID0gdmFsdWU7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy51cmw7XG4gICAgcXVldWVNaWNyb3Rhc2soKCkgPT5cbiAgICAgIHRoaXMuX2hhc2hVcGRhdGUubmV4dCh7XG4gICAgICAgIHR5cGU6ICdoYXNoY2hhbmdlJyxcbiAgICAgICAgc3RhdGU6IG51bGwsXG4gICAgICAgIG9sZFVybCxcbiAgICAgICAgbmV3VXJsLFxuICAgICAgfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSxcbiAgICApO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgb2xkVXJsID0gdGhpcy51cmw7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gcGFyc2VVcmwobmV3VXJsKTtcbiAgICAodGhpcyBhcyBXcml0YWJsZTx0aGlzPikucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLnNlYXJjaCA9IHBhcnNlZFVybC5zZWFyY2g7XG4gICAgdGhpcy5zZXRIYXNoKHBhcnNlZFVybC5oYXNoLCBvbGRVcmwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBuZXdVcmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLy8gSGlzdG9yeSBBUEkgaXNuJ3QgYXZhaWxhYmxlIG9uIHNlcnZlciwgdGhlcmVmb3JlIHJldHVybiB1bmRlZmluZWRcbiAgZ2V0U3RhdGUoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19