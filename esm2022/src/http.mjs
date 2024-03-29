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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerXhr }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerXhr, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUF3QywwQkFBMEIsSUFBSSx5QkFBeUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BJLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDOztBQUkzRCxNQUFNLE9BQU8sU0FBUztJQUdwQix1RUFBdUU7SUFDdkUsMEVBQTBFO0lBQzFFLCtFQUErRTtJQUMvRSxvQ0FBb0M7SUFDNUIsS0FBSyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixNQUFNLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7eUhBckJVLFNBQVM7NkhBQVQsU0FBUzs7c0dBQVQsU0FBUztrQkFEckIsVUFBVTs7QUF5QlgsU0FBUyxvQ0FBb0MsQ0FDekMsT0FBNkIsRUFBRSxJQUFtQjtJQUNwRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsR0FBRyxnQkFBZ0IsQ0FBQztJQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ1QsU0FBUyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksSUFBSSxDQUFDO0lBQy9ELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXhELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztJQUMxQztRQUNFLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsUUFBUSxFQUFFLG9DQUFvQztRQUM5QyxLQUFLLEVBQUUsSUFBSTtLQUNaO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb24sIFhockZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBFdmVudCwgSHR0cEhhbmRsZXJGbiwgSHR0cFJlcXVlc3QsIMm1SFRUUF9ST09UX0lOVEVSQ0VQVE9SX0ZOUyBhcyBIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge2luamVjdCwgSW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhociBpbXBsZW1lbnRzIFhockZhY3Rvcnkge1xuICBwcml2YXRlIHhockltcGw6IHR5cGVvZiBpbXBvcnQoJ3hocjInKXx1bmRlZmluZWQ7XG5cbiAgLy8gVGhlIGB4aHIyYCBkZXBlbmRlbmN5IGhhcyBhIHNpZGUtZWZmZWN0IG9mIGFjY2Vzc2luZyBhbmQgbW9kaWZ5aW5nIGFcbiAgLy8gZ2xvYmFsIHNjb3BlLiBMb2FkaW5nIGB4aHIyYCBkeW5hbWljYWxseSBhbGxvd3MgdXMgdG8gZGVsYXkgdGhlIGxvYWRpbmdcbiAgLy8gYW5kIHN0YXJ0IHRoZSBwcm9jZXNzIG9uY2UgdGhlIGdsb2JhbCBzY29wZSBpcyBlc3RhYmxpc2hlZCBieSB0aGUgdW5kZXJseWluZ1xuICAvLyBzZXJ2ZXIgcGxhdGZvcm0gKHZpYSBzaGltcywgZXRjKS5cbiAgcHJpdmF0ZSBhc3luYyDJtWxvYWRJbXBsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy54aHJJbXBsKSB7XG4gICAgICBjb25zdCB7ZGVmYXVsdDogeGhyfSA9IGF3YWl0IGltcG9ydCgneGhyMicpO1xuICAgICAgdGhpcy54aHJJbXBsID0geGhyO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgICBjb25zdCBpbXBsID0gdGhpcy54aHJJbXBsO1xuICAgIGlmICghaW1wbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHN0YXRlIGluIFNlcnZlclhocjogWEhSIGltcGxlbWVudGF0aW9uIGlzIG5vdCBsb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBpbXBsLlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVsYXRpdmVVcmxzVHJhbnNmb3JtZXJJbnRlcmNlcHRvckZuKFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PHVua25vd24+LCBuZXh0OiBIdHRwSGFuZGxlckZuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8dW5rbm93bj4+IHtcbiAgY29uc3QgcGxhdGZvcm1Mb2NhdGlvbiA9IGluamVjdChQbGF0Zm9ybUxvY2F0aW9uKTtcbiAgY29uc3Qge2hyZWYsIHByb3RvY29sLCBob3N0bmFtZSwgcG9ydH0gPSBwbGF0Zm9ybUxvY2F0aW9uO1xuICBpZiAoIXByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgIHJldHVybiBuZXh0KHJlcXVlc3QpO1xuICB9XG5cbiAgbGV0IHVybFByZWZpeCA9IGAke3Byb3RvY29sfS8vJHtob3N0bmFtZX1gO1xuICBpZiAocG9ydCkge1xuICAgIHVybFByZWZpeCArPSBgOiR7cG9ydH1gO1xuICB9XG5cbiAgY29uc3QgYmFzZUhyZWYgPSBwbGF0Zm9ybUxvY2F0aW9uLmdldEJhc2VIcmVmRnJvbURPTSgpIHx8IGhyZWY7XG4gIGNvbnN0IGJhc2VVcmwgPSBuZXcgVVJMKGJhc2VIcmVmLCB1cmxQcmVmaXgpO1xuICBjb25zdCBuZXdVcmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsLCBiYXNlVXJsKS50b1N0cmluZygpO1xuXG4gIHJldHVybiBuZXh0KHJlcXVlc3QuY2xvbmUoe3VybDogbmV3VXJsfSkpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sXG4gIHtcbiAgICBwcm92aWRlOiBIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TLFxuICAgIHVzZVZhbHVlOiByZWxhdGl2ZVVybHNUcmFuc2Zvcm1lckludGVyY2VwdG9yRm4sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuIl19