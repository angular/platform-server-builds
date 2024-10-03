/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.7+sha-694fe3f", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.7+sha-694fe3f", ngImport: i0, type: ServerXhr }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.7+sha-694fe3f", ngImport: i0, type: ServerXhr, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUlMLDBCQUEwQixJQUFJLHlCQUF5QixHQUN4RCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDOztBQUkzRCxNQUFNLE9BQU8sU0FBUztJQUdwQix1RUFBdUU7SUFDdkUsMEVBQTBFO0lBQzFFLCtFQUErRTtJQUMvRSxvQ0FBb0M7SUFDNUIsS0FBSyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixNQUFNLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7eUhBckJVLFNBQVM7NkhBQVQsU0FBUzs7c0dBQVQsU0FBUztrQkFEckIsVUFBVTs7QUF5QlgsU0FBUyxvQ0FBb0MsQ0FDM0MsT0FBNkIsRUFDN0IsSUFBbUI7SUFFbkIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxNQUFNLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxTQUFTLEdBQUcsR0FBRyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7SUFDM0MsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNULFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLElBQUksQ0FBQztJQUMvRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7SUFDMUM7UUFDRSxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLFFBQVEsRUFBRSxvQ0FBb0M7UUFDOUMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbiwgWGhyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXJGbixcbiAgSHR0cFJlcXVlc3QsXG4gIMm1SFRUUF9ST09UX0lOVEVSQ0VQVE9SX0ZOUyBhcyBIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge2luamVjdCwgSW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhociBpbXBsZW1lbnRzIFhockZhY3Rvcnkge1xuICBwcml2YXRlIHhockltcGw6IHR5cGVvZiBpbXBvcnQoJ3hocjInKSB8IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgYHhocjJgIGRlcGVuZGVuY3kgaGFzIGEgc2lkZS1lZmZlY3Qgb2YgYWNjZXNzaW5nIGFuZCBtb2RpZnlpbmcgYVxuICAvLyBnbG9iYWwgc2NvcGUuIExvYWRpbmcgYHhocjJgIGR5bmFtaWNhbGx5IGFsbG93cyB1cyB0byBkZWxheSB0aGUgbG9hZGluZ1xuICAvLyBhbmQgc3RhcnQgdGhlIHByb2Nlc3Mgb25jZSB0aGUgZ2xvYmFsIHNjb3BlIGlzIGVzdGFibGlzaGVkIGJ5IHRoZSB1bmRlcmx5aW5nXG4gIC8vIHNlcnZlciBwbGF0Zm9ybSAodmlhIHNoaW1zLCBldGMpLlxuICBwcml2YXRlIGFzeW5jIMm1bG9hZEltcGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnhockltcGwpIHtcbiAgICAgIGNvbnN0IHtkZWZhdWx0OiB4aHJ9ID0gYXdhaXQgaW1wb3J0KCd4aHIyJyk7XG4gICAgICB0aGlzLnhockltcGwgPSB4aHI7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0IGltcGwgPSB0aGlzLnhockltcGw7XG4gICAgaWYgKCFpbXBsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc3RhdGUgaW4gU2VydmVyWGhyOiBYSFIgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGltcGwuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVVybHNUcmFuc2Zvcm1lckludGVyY2VwdG9yRm4oXG4gIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PHVua25vd24+LFxuICBuZXh0OiBIdHRwSGFuZGxlckZuLFxuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8dW5rbm93bj4+IHtcbiAgY29uc3QgcGxhdGZvcm1Mb2NhdGlvbiA9IGluamVjdChQbGF0Zm9ybUxvY2F0aW9uKTtcbiAgY29uc3Qge2hyZWYsIHByb3RvY29sLCBob3N0bmFtZSwgcG9ydH0gPSBwbGF0Zm9ybUxvY2F0aW9uO1xuICBpZiAoIXByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgIHJldHVybiBuZXh0KHJlcXVlc3QpO1xuICB9XG5cbiAgbGV0IHVybFByZWZpeCA9IGAke3Byb3RvY29sfS8vJHtob3N0bmFtZX1gO1xuICBpZiAocG9ydCkge1xuICAgIHVybFByZWZpeCArPSBgOiR7cG9ydH1gO1xuICB9XG5cbiAgY29uc3QgYmFzZUhyZWYgPSBwbGF0Zm9ybUxvY2F0aW9uLmdldEJhc2VIcmVmRnJvbURPTSgpIHx8IGhyZWY7XG4gIGNvbnN0IGJhc2VVcmwgPSBuZXcgVVJMKGJhc2VIcmVmLCB1cmxQcmVmaXgpO1xuICBjb25zdCBuZXdVcmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsLCBiYXNlVXJsKS50b1N0cmluZygpO1xuXG4gIHJldHVybiBuZXh0KHJlcXVlc3QuY2xvbmUoe3VybDogbmV3VXJsfSkpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sXG4gIHtcbiAgICBwcm92aWRlOiBIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TLFxuICAgIHVzZVZhbHVlOiByZWxhdGl2ZVVybHNUcmFuc2Zvcm1lckludGVyY2VwdG9yRm4sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuIl19