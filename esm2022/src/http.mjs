/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation, XhrFactory } from '@angular/common';
import { ɵHTTP_ROOT_INTERCEPTOR_FNS as HTTP_ROOT_INTERCEPTOR_FNS, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ServerXhr {
    // The `xhr2` dependency has a side-effect of accessing and modifying a
    // global scope. Loading `xhr2` dynamically allows us to delay the loading
    // and start the process once the global scope is established by the underlying
    // server platform (via shims, etc).
    async ɵloadImpl() {
        if (!this.xhrImpl) {
            const { default: xhr } = await import('xhr2');
            this.xhrImpl = xhr;
        }
    }
    build() {
        const impl = this.xhrImpl;
        if (!impl) {
            throw new Error('Unexpected state in ServerXhr: XHR implementation is not loaded.');
        }
        return new impl.XMLHttpRequest();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerXhr }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
function relativeUrlsTransformerInterceptorFn(request, next) {
    const platformLocation = inject(PlatformLocation);
    const { href, protocol, hostname, port } = platformLocation;
    if (!protocol.startsWith('http')) {
        return next(request);
    }
    let urlPrefix = `${protocol}//${hostname}`;
    if (port) {
        urlPrefix += `:${port}`;
    }
    const baseHref = platformLocation.getBaseHrefFromDOM() || href;
    const baseUrl = new URL(baseHref, urlPrefix);
    const newUrl = new URL(request.url, baseUrl).toString();
    return next(request.clone({ url: newUrl }));
}
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr },
    {
        provide: HTTP_ROOT_INTERCEPTOR_FNS,
        useValue: relativeUrlsTransformerInterceptorFn,
        multi: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUlMLDBCQUEwQixJQUFJLHlCQUF5QixHQUN4RCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDOztBQUkzRCxNQUFNLE9BQU8sU0FBUztJQUdwQix1RUFBdUU7SUFDdkUsMEVBQTBFO0lBQzFFLCtFQUErRTtJQUMvRSxvQ0FBb0M7SUFDNUIsS0FBSyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixNQUFNLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7eUhBckJVLFNBQVM7NkhBQVQsU0FBUzs7c0dBQVQsU0FBUztrQkFEckIsVUFBVTs7QUF5QlgsU0FBUyxvQ0FBb0MsQ0FDM0MsT0FBNkIsRUFDN0IsSUFBbUI7SUFFbkIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxNQUFNLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxTQUFTLEdBQUcsR0FBRyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7SUFDM0MsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNULFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLElBQUksQ0FBQztJQUMvRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7SUFDMUM7UUFDRSxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLFFBQVEsRUFBRSxvQ0FBb0M7UUFDOUMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9uLCBYaHJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlckZuLFxuICBIdHRwUmVxdWVzdCxcbiAgybVIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TIGFzIEhUVFBfUk9PVF9JTlRFUkNFUFRPUl9GTlMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgWGhyRmFjdG9yeSB7XG4gIHByaXZhdGUgeGhySW1wbDogdHlwZW9mIGltcG9ydCgneGhyMicpIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFRoZSBgeGhyMmAgZGVwZW5kZW5jeSBoYXMgYSBzaWRlLWVmZmVjdCBvZiBhY2Nlc3NpbmcgYW5kIG1vZGlmeWluZyBhXG4gIC8vIGdsb2JhbCBzY29wZS4gTG9hZGluZyBgeGhyMmAgZHluYW1pY2FsbHkgYWxsb3dzIHVzIHRvIGRlbGF5IHRoZSBsb2FkaW5nXG4gIC8vIGFuZCBzdGFydCB0aGUgcHJvY2VzcyBvbmNlIHRoZSBnbG9iYWwgc2NvcGUgaXMgZXN0YWJsaXNoZWQgYnkgdGhlIHVuZGVybHlpbmdcbiAgLy8gc2VydmVyIHBsYXRmb3JtICh2aWEgc2hpbXMsIGV0YykuXG4gIHByaXZhdGUgYXN5bmMgybVsb2FkSW1wbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMueGhySW1wbCkge1xuICAgICAgY29uc3Qge2RlZmF1bHQ6IHhocn0gPSBhd2FpdCBpbXBvcnQoJ3hocjInKTtcbiAgICAgIHRoaXMueGhySW1wbCA9IHhocjtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgY29uc3QgaW1wbCA9IHRoaXMueGhySW1wbDtcbiAgICBpZiAoIWltcGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzdGF0ZSBpbiBTZXJ2ZXJYaHI6IFhIUiBpbXBsZW1lbnRhdGlvbiBpcyBub3QgbG9hZGVkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgaW1wbC5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbGF0aXZlVXJsc1RyYW5zZm9ybWVySW50ZXJjZXB0b3JGbihcbiAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8dW5rbm93bj4sXG4gIG5leHQ6IEh0dHBIYW5kbGVyRm4sXG4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICBjb25zdCBwbGF0Zm9ybUxvY2F0aW9uID0gaW5qZWN0KFBsYXRmb3JtTG9jYXRpb24pO1xuICBjb25zdCB7aHJlZiwgcHJvdG9jb2wsIGhvc3RuYW1lLCBwb3J0fSA9IHBsYXRmb3JtTG9jYXRpb247XG4gIGlmICghcHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgcmV0dXJuIG5leHQocmVxdWVzdCk7XG4gIH1cblxuICBsZXQgdXJsUHJlZml4ID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfWA7XG4gIGlmIChwb3J0KSB7XG4gICAgdXJsUHJlZml4ICs9IGA6JHtwb3J0fWA7XG4gIH1cblxuICBjb25zdCBiYXNlSHJlZiA9IHBsYXRmb3JtTG9jYXRpb24uZ2V0QmFzZUhyZWZGcm9tRE9NKCkgfHwgaHJlZjtcbiAgY29uc3QgYmFzZVVybCA9IG5ldyBVUkwoYmFzZUhyZWYsIHVybFByZWZpeCk7XG4gIGNvbnN0IG5ld1VybCA9IG5ldyBVUkwocmVxdWVzdC51cmwsIGJhc2VVcmwpLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIG5leHQocmVxdWVzdC5jbG9uZSh7dXJsOiBuZXdVcmx9KSk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSxcbiAge1xuICAgIHByb3ZpZGU6IEhUVFBfUk9PVF9JTlRFUkNFUFRPUl9GTlMsXG4gICAgdXNlVmFsdWU6IHJlbGF0aXZlVXJsc1RyYW5zZm9ybWVySW50ZXJjZXB0b3JGbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfSxcbl07XG4iXX0=