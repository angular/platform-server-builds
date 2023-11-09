/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation, XhrFactory } from '@angular/common';
import { ɵHTTP_ROOT_INTERCEPTOR_FNS as HTTP_ROOT_INTERCEPTOR_FNS } from '@angular/common/http';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-b1cc092", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-b1cc092", ngImport: i0, type: ServerXhr }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-b1cc092", ngImport: i0, type: ServerXhr, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUF3QywwQkFBMEIsSUFBSSx5QkFBeUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BJLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDOztBQUkzRCxNQUFNLE9BQU8sU0FBUztJQUdwQix1RUFBdUU7SUFDdkUsMEVBQTBFO0lBQzFFLCtFQUErRTtJQUMvRSxvQ0FBb0M7SUFDNUIsS0FBSyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1NBQ3JGO1FBRUQsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxDQUFDO3lIQXJCVSxTQUFTOzZIQUFULFNBQVM7O3NHQUFULFNBQVM7a0JBRHJCLFVBQVU7O0FBeUJYLFNBQVMsb0NBQW9DLENBQ3pDLE9BQTZCLEVBQUUsSUFBbUI7SUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxNQUFNLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEI7SUFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxJQUFJLElBQUksRUFBRTtRQUNSLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxJQUFJLENBQUM7SUFDL0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFeEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFlO0lBQy9DLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0lBQzFDO1FBQ0UsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxRQUFRLEVBQUUsb0NBQW9DO1FBQzlDLEtBQUssRUFBRSxJQUFJO0tBQ1o7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbiwgWGhyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwSGFuZGxlckZuLCBIdHRwUmVxdWVzdCwgybVIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TIGFzIEhUVFBfUk9PVF9JTlRFUkNFUFRPUl9GTlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgWGhyRmFjdG9yeSB7XG4gIHByaXZhdGUgeGhySW1wbDogdHlwZW9mIGltcG9ydCgneGhyMicpfHVuZGVmaW5lZDtcblxuICAvLyBUaGUgYHhocjJgIGRlcGVuZGVuY3kgaGFzIGEgc2lkZS1lZmZlY3Qgb2YgYWNjZXNzaW5nIGFuZCBtb2RpZnlpbmcgYVxuICAvLyBnbG9iYWwgc2NvcGUuIExvYWRpbmcgYHhocjJgIGR5bmFtaWNhbGx5IGFsbG93cyB1cyB0byBkZWxheSB0aGUgbG9hZGluZ1xuICAvLyBhbmQgc3RhcnQgdGhlIHByb2Nlc3Mgb25jZSB0aGUgZ2xvYmFsIHNjb3BlIGlzIGVzdGFibGlzaGVkIGJ5IHRoZSB1bmRlcmx5aW5nXG4gIC8vIHNlcnZlciBwbGF0Zm9ybSAodmlhIHNoaW1zLCBldGMpLlxuICBwcml2YXRlIGFzeW5jIMm1bG9hZEltcGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnhockltcGwpIHtcbiAgICAgIGNvbnN0IHtkZWZhdWx0OiB4aHJ9ID0gYXdhaXQgaW1wb3J0KCd4aHIyJyk7XG4gICAgICB0aGlzLnhockltcGwgPSB4aHI7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0IGltcGwgPSB0aGlzLnhockltcGw7XG4gICAgaWYgKCFpbXBsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc3RhdGUgaW4gU2VydmVyWGhyOiBYSFIgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGltcGwuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVVybHNUcmFuc2Zvcm1lckludGVyY2VwdG9yRm4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8dW5rbm93bj4sIG5leHQ6IEh0dHBIYW5kbGVyRm4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICBjb25zdCBwbGF0Zm9ybUxvY2F0aW9uID0gaW5qZWN0KFBsYXRmb3JtTG9jYXRpb24pO1xuICBjb25zdCB7aHJlZiwgcHJvdG9jb2wsIGhvc3RuYW1lLCBwb3J0fSA9IHBsYXRmb3JtTG9jYXRpb247XG4gIGlmICghcHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgcmV0dXJuIG5leHQocmVxdWVzdCk7XG4gIH1cblxuICBsZXQgdXJsUHJlZml4ID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfWA7XG4gIGlmIChwb3J0KSB7XG4gICAgdXJsUHJlZml4ICs9IGA6JHtwb3J0fWA7XG4gIH1cblxuICBjb25zdCBiYXNlSHJlZiA9IHBsYXRmb3JtTG9jYXRpb24uZ2V0QmFzZUhyZWZGcm9tRE9NKCkgfHwgaHJlZjtcbiAgY29uc3QgYmFzZVVybCA9IG5ldyBVUkwoYmFzZUhyZWYsIHVybFByZWZpeCk7XG4gIGNvbnN0IG5ld1VybCA9IG5ldyBVUkwocmVxdWVzdC51cmwsIGJhc2VVcmwpLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIG5leHQocmVxdWVzdC5jbG9uZSh7dXJsOiBuZXdVcmx9KSk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSxcbiAge1xuICAgIHByb3ZpZGU6IEhUVFBfUk9PVF9JTlRFUkNFUFRPUl9GTlMsXG4gICAgdXNlVmFsdWU6IHJlbGF0aXZlVXJsc1RyYW5zZm9ybWVySW50ZXJjZXB0b3JGbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfSxcbl07XG4iXX0=