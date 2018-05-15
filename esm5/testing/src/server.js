/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule, createPlatformFactory } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting as platformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS as INTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS as SERVER_RENDER_PROVIDERS } from '@angular/platform-server';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export var platformServerTesting = createPlatformFactory(platformCoreDynamicTesting, 'serverTesting', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
var ServerTestingModule = /** @class */ (function () {
    function ServerTestingModule() {
    }
    ServerTestingModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS
                },] }
    ];
    return ServerTestingModule;
}());
export { ServerTestingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBK0IscUJBQXFCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFDLDJCQUEyQixFQUFFLDJCQUEyQixJQUFJLDBCQUEwQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDakosT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFDLG1DQUFtQyxJQUFJLGtDQUFrQyxFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQVF4SyxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FDdEQsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Z0JBT3BGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7aUJBQ25DOzs4QkEvQkQ7O1NBZ0NhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZSwgUGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyLCBjcmVhdGVQbGF0Zm9ybUZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIMm1cGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcgYXMgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3Rpbmd9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1SU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyBhcyBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTLCDJtVNFUlZFUl9SRU5ERVJfUFJPVklERVJTIGFzIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInO1xuXG5cbi8qKlxuICogUGxhdGZvcm0gZm9yIHRlc3RpbmdcbiAqXG4gKiBAZXhwZXJpbWVudGFsIEFQSSByZWxhdGVkIHRvIGJvb3RzdHJhcHBpbmcgYXJlIHN0aWxsIHVuZGVyIHJldmlldy5cbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyVGVzdGluZyA9IGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgICBwbGF0Zm9ybUNvcmVEeW5hbWljVGVzdGluZywgJ3NlcnZlclRlc3RpbmcnLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAZXhwZXJpbWVudGFsIEFQSSByZWxhdGVkIHRvIGJvb3RzdHJhcHBpbmcgYXJlIHN0aWxsIHVuZGVyIHJldmlldy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZV0sXG4gIGltcG9ydHM6IFtOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogU0VSVkVSX1JFTkRFUl9QUk9WSURFUlNcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyVGVzdGluZ01vZHVsZSB7XG59XG4iXX0=