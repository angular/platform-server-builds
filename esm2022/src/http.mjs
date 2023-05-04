/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XhrFactory } from '@angular/common';
import { Injectable } from '@angular/core';
import * as xhr2 from 'xhr2';
import * as i0 from "@angular/core";
class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerXhr }); }
}
export { ServerXhr };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-2180a69", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
export const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQzs7QUFFN0IsTUFDYSxTQUFTO0lBQ3BCLEtBQUs7UUFDSCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7eUhBSFUsU0FBUzs2SEFBVCxTQUFTOztTQUFULFNBQVM7c0dBQVQsU0FBUztrQkFEckIsVUFBVTs7QUFRWCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBZTtJQUMvQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztDQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7WGhyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgeGhyMiBmcm9tICd4aHIyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhociBpbXBsZW1lbnRzIFhockZhY3Rvcnkge1xuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sXG5dO1xuIl19