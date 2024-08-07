/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createPlatformFactory, NgModule } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting as platformCoreDynamicTesting, } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS as INTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS as SERVER_RENDER_PROVIDERS, } from '@angular/platform-server';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerTestingModule, imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerTestingModule, providers: SERVER_RENDER_PROVIDERS, imports: [NoopAnimationsModule, BrowserDynamicTestingModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IsMkJBQTJCLElBQUksMEJBQTBCLEdBQzFELE1BQU0sMkNBQTJDLENBQUM7QUFDbkQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUNMLG1DQUFtQyxJQUFJLGtDQUFrQyxFQUN6RSx3QkFBd0IsSUFBSSx1QkFBdUIsR0FDcEQsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFbEM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLHFCQUFxQixDQUN4RCwwQkFBMEIsRUFDMUIsZUFBZSxFQUNmLGtDQUFrQyxDQUNuQyxDQUFDO0FBRUY7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7eUhBQW5CLG1CQUFtQjswSEFBbkIsbUJBQW1CLFlBSHBCLG9CQUFvQixhQURwQiwyQkFBMkI7MEhBSTFCLG1CQUFtQixhQUZuQix1QkFBdUIsWUFEeEIsb0JBQW9CLEVBRHBCLDJCQUEyQjs7c0dBSTFCLG1CQUFtQjtrQkFML0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsXG4gIMm1cGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcgYXMgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICDJtUlOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMgYXMgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgybVTRVJWRVJfUkVOREVSX1BST1ZJREVSUyBhcyBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyJztcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyVGVzdGluZyA9IGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgcGxhdGZvcm1Db3JlRHluYW1pY1Rlc3RpbmcsXG4gICdzZXJ2ZXJUZXN0aW5nJyxcbiAgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyxcbik7XG5cbi8qKlxuICogTmdNb2R1bGUgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlXSxcbiAgaW1wb3J0czogW05vb3BBbmltYXRpb25zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyVGVzdGluZ01vZHVsZSB7fVxuIl19