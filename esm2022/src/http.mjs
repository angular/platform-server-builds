/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XhrFactory } from '@angular/common';
import { Injectable } from '@angular/core';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-221f882", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-221f882", ngImport: i0, type: ServerXhr }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-221f882", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQzs7QUFHbkQsTUFBTSxPQUFPLFNBQVM7SUFHcEIsdUVBQXVFO0lBQ3ZFLDBFQUEwRTtJQUMxRSwrRUFBK0U7SUFDL0Usb0NBQW9DO0lBQzVCLEtBQUssQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE1BQU0sRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFDLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztTQUNyRjtRQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQzt5SEFyQlUsU0FBUzs2SEFBVCxTQUFTOztzR0FBVCxTQUFTO2tCQURyQixVQUFVOztBQTBCWCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztDQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7WGhyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgWGhyRmFjdG9yeSB7XG4gIHByaXZhdGUgeGhySW1wbDogdHlwZW9mIGltcG9ydCgneGhyMicpfHVuZGVmaW5lZDtcblxuICAvLyBUaGUgYHhocjJgIGRlcGVuZGVuY3kgaGFzIGEgc2lkZS1lZmZlY3Qgb2YgYWNjZXNzaW5nIGFuZCBtb2RpZnlpbmcgYVxuICAvLyBnbG9iYWwgc2NvcGUuIExvYWRpbmcgYHhocjJgIGR5bmFtaWNhbGx5IGFsbG93cyB1cyB0byBkZWxheSB0aGUgbG9hZGluZ1xuICAvLyBhbmQgc3RhcnQgdGhlIHByb2Nlc3Mgb25jZSB0aGUgZ2xvYmFsIHNjb3BlIGlzIGVzdGFibGlzaGVkIGJ5IHRoZSB1bmRlcmx5aW5nXG4gIC8vIHNlcnZlciBwbGF0Zm9ybSAodmlhIHNoaW1zLCBldGMpLlxuICBwcml2YXRlIGFzeW5jIMm1bG9hZEltcGwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnhockltcGwpIHtcbiAgICAgIGNvbnN0IHtkZWZhdWx0OiB4aHJ9ID0gYXdhaXQgaW1wb3J0KCd4aHIyJyk7XG4gICAgICB0aGlzLnhockltcGwgPSB4aHI7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0IGltcGwgPSB0aGlzLnhockltcGw7XG4gICAgaWYgKCFpbXBsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc3RhdGUgaW4gU2VydmVyWGhyOiBYSFIgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGltcGwuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfSFRUUF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogU2VydmVyWGhyfSxcbl07XG4iXX0=