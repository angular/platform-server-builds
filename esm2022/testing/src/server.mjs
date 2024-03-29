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
export class ServerTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerTestingModule, imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerTestingModule, providers: SERVER_RENDER_PROVIDERS, imports: [NoopAnimationsModule, BrowserDynamicTestingModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQywyQkFBMkIsRUFBRSwyQkFBMkIsSUFBSSwwQkFBMEIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pKLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxtQ0FBbUMsSUFBSSxrQ0FBa0MsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQUd4Szs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcscUJBQXFCLENBQ3RELDBCQUEwQixFQUFFLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXJGOzs7O0dBSUc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO3lIQUFuQixtQkFBbUI7MEhBQW5CLG1CQUFtQixZQUhwQixvQkFBb0IsYUFEcEIsMkJBQTJCOzBIQUkxQixtQkFBbUIsYUFGbkIsdUJBQXVCLFlBRHhCLG9CQUFvQixFQURwQiwyQkFBMkI7O3NHQUkxQixtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUMvQixTQUFTLEVBQUUsdUJBQXVCO2lCQUNuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIMm1cGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcgYXMgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3Rpbmd9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1SU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyBhcyBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTLCDJtVNFUlZFUl9SRU5ERVJfUFJPVklERVJTIGFzIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInO1xuXG5cbi8qKlxuICogUGxhdGZvcm0gZm9yIHRlc3RpbmdcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVNlcnZlclRlc3RpbmcgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcsICdzZXJ2ZXJUZXN0aW5nJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogTmdNb2R1bGUgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlXSxcbiAgaW1wb3J0czogW05vb3BBbmltYXRpb25zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBTRVJWRVJfUkVOREVSX1BST1ZJREVSU1xufSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUZXN0aW5nTW9kdWxlIHtcbn1cbiJdfQ==