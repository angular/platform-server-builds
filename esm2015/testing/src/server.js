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
let ServerTestingModule = /** @class */ (() => {
    class ServerTestingModule {
    }
    ServerTestingModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS
                },] }
    ];
    return ServerTestingModule;
})();
export { ServerTestingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUE4QixNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsMkJBQTJCLEVBQUUsMkJBQTJCLElBQUksMEJBQTBCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqSixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUMsbUNBQW1DLElBQUksa0NBQWtDLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUd4Szs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcscUJBQXFCLENBQ3RELDBCQUEwQixFQUFFLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXJGOzs7O0dBSUc7QUFDSDtJQUFBLE1BS2EsbUJBQW1COzs7Z0JBTC9CLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7aUJBQ25DOztJQUVELDBCQUFDO0tBQUE7U0FEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIE5nTW9kdWxlLCBQbGF0Zm9ybVJlZiwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIMm1cGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcgYXMgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3Rpbmd9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1SU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyBhcyBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTLCDJtVNFUlZFUl9SRU5ERVJfUFJPVklERVJTIGFzIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInO1xuXG5cbi8qKlxuICogUGxhdGZvcm0gZm9yIHRlc3RpbmdcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVNlcnZlclRlc3RpbmcgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcsICdzZXJ2ZXJUZXN0aW5nJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogTmdNb2R1bGUgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlXSxcbiAgaW1wb3J0czogW05vb3BBbmltYXRpb25zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBTRVJWRVJfUkVOREVSX1BST1ZJREVSU1xufSlcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJUZXN0aW5nTW9kdWxlIHtcbn1cbiJdfQ==