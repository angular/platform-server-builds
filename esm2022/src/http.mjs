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
class ServerXhr {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1+sha-2d87aee", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1+sha-2d87aee", ngImport: i0, type: ServerXhr }); }
}
export { ServerXhr };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1+sha-2d87aee", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQzs7QUFFbkQsTUFDYSxTQUFTO0lBR3BCLHVFQUF1RTtJQUN2RSwwRUFBMEU7SUFDMUUsK0VBQStFO0lBQy9FLG9DQUFvQztJQUM1QixLQUFLLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixNQUFNLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELEtBQUs7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7U0FDckY7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7eUhBckJVLFNBQVM7NkhBQVQsU0FBUzs7U0FBVCxTQUFTO3NHQUFULFNBQVM7a0JBRHJCLFVBQVU7O0FBMEJYLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFlO0lBQy9DLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0NBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtYaHJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJYaHIgaW1wbGVtZW50cyBYaHJGYWN0b3J5IHtcbiAgcHJpdmF0ZSB4aHJJbXBsOiB0eXBlb2YgaW1wb3J0KCd4aHIyJyl8dW5kZWZpbmVkO1xuXG4gIC8vIFRoZSBgeGhyMmAgZGVwZW5kZW5jeSBoYXMgYSBzaWRlLWVmZmVjdCBvZiBhY2Nlc3NpbmcgYW5kIG1vZGlmeWluZyBhXG4gIC8vIGdsb2JhbCBzY29wZS4gTG9hZGluZyBgeGhyMmAgZHluYW1pY2FsbHkgYWxsb3dzIHVzIHRvIGRlbGF5IHRoZSBsb2FkaW5nXG4gIC8vIGFuZCBzdGFydCB0aGUgcHJvY2VzcyBvbmNlIHRoZSBnbG9iYWwgc2NvcGUgaXMgZXN0YWJsaXNoZWQgYnkgdGhlIHVuZGVybHlpbmdcbiAgLy8gc2VydmVyIHBsYXRmb3JtICh2aWEgc2hpbXMsIGV0YykuXG4gIHByaXZhdGUgYXN5bmMgybVsb2FkSW1wbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMueGhySW1wbCkge1xuICAgICAgY29uc3Qge2RlZmF1bHQ6IHhocn0gPSBhd2FpdCBpbXBvcnQoJ3hocjInKTtcbiAgICAgIHRoaXMueGhySW1wbCA9IHhocjtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgY29uc3QgaW1wbCA9IHRoaXMueGhySW1wbDtcbiAgICBpZiAoIWltcGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzdGF0ZSBpbiBTZXJ2ZXJYaHI6IFhIUiBpbXBsZW1lbnRhdGlvbiBpcyBub3QgbG9hZGVkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgaW1wbC5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9IVFRQX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBTZXJ2ZXJYaHJ9LFxuXTtcbiJdfQ==