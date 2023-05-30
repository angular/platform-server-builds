/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createPlatformFactory, NgModule } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting as platformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS as INTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS as SERVER_RENDER_PROVIDERS } from '@angular/platform-server';
import * as i0 from "@angular/core";
/**
 * Platform for testing
 *
 * @publicApi
 */
export const platformServerTesting = createPlatformFactory(platformCoreDynamicTesting, 'serverTesting', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class ServerTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-381cb98", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.0-next.2+sha-381cb98", ngImport: i0, type: ServerTestingModule, imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-381cb98", ngImport: i0, type: ServerTestingModule, providers: SERVER_RENDER_PROVIDERS, imports: [NoopAnimationsModule, BrowserDynamicTestingModule] }); }
}
export { ServerTestingModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-381cb98", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQywyQkFBMkIsRUFBRSwyQkFBMkIsSUFBSSwwQkFBMEIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pKLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxtQ0FBbUMsSUFBSSxrQ0FBa0MsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQUd4Szs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcscUJBQXFCLENBQ3RELDBCQUEwQixFQUFFLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXJGOzs7O0dBSUc7QUFDSCxNQUthLG1CQUFtQjt5SEFBbkIsbUJBQW1COzBIQUFuQixtQkFBbUIsWUFIcEIsb0JBQW9CLGFBRHBCLDJCQUEyQjswSEFJMUIsbUJBQW1CLGFBRm5CLHVCQUF1QixZQUR4QixvQkFBb0IsRUFEcEIsMkJBQTJCOztTQUkxQixtQkFBbUI7c0dBQW5CLG1CQUFtQjtrQkFML0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwgybVwbGF0Zm9ybUNvcmVEeW5hbWljVGVzdGluZyBhcyBwbGF0Zm9ybUNvcmVEeW5hbWljVGVzdGluZ30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7ybVJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTIGFzIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMsIMm1U0VSVkVSX1JFTkRFUl9QUk9WSURFUlMgYXMgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLXNlcnZlcic7XG5cblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyVGVzdGluZyA9IGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgICBwbGF0Zm9ybUNvcmVEeW5hbWljVGVzdGluZywgJ3NlcnZlclRlc3RpbmcnLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGVdLFxuICBpbXBvcnRzOiBbTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFNFUlZFUl9SRU5ERVJfUFJPVklERVJTXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlclRlc3RpbmdNb2R1bGUge1xufVxuIl19