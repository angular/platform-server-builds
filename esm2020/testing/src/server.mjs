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
}
ServerTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0+52.sha-5a75721.with-local-changes", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0+52.sha-5a75721.with-local-changes", ngImport: i0, type: ServerTestingModule, imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] });
ServerTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0+52.sha-5a75721.with-local-changes", ngImport: i0, type: ServerTestingModule, providers: SERVER_RENDER_PROVIDERS, imports: [[NoopAnimationsModule], BrowserDynamicTestingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0+52.sha-5a75721.with-local-changes", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: SERVER_RENDER_PROVIDERS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3Rlc3Rpbmcvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUE4QixNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsMkJBQTJCLEVBQUUsMkJBQTJCLElBQUksMEJBQTBCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqSixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUMsbUNBQW1DLElBQUksa0NBQWtDLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFHeEs7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLHFCQUFxQixDQUN0RCwwQkFBMEIsRUFBRSxlQUFlLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUVyRjs7OztHQUlHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjs7MkhBQW5CLG1CQUFtQjs0SEFBbkIsbUJBQW1CLFlBSHBCLG9CQUFvQixhQURwQiwyQkFBMkI7NEhBSTFCLG1CQUFtQixhQUZuQix1QkFBdUIsWUFEekIsQ0FBQyxvQkFBb0IsQ0FBQyxFQURyQiwyQkFBMkI7c0dBSTFCLG1CQUFtQjtrQkFML0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBOZ01vZHVsZSwgUGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlLCDJtXBsYXRmb3JtQ29yZUR5bmFtaWNUZXN0aW5nIGFzIHBsYXRmb3JtQ29yZUR5bmFtaWNUZXN0aW5nfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdGluZyc7XG5pbXBvcnQge05vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHvJtUlOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMgYXMgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUywgybVTRVJWRVJfUkVOREVSX1BST1ZJREVSUyBhcyBTRVJWRVJfUkVOREVSX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyJztcblxuXG4vKipcbiAqIFBsYXRmb3JtIGZvciB0ZXN0aW5nXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1TZXJ2ZXJUZXN0aW5nID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgIHBsYXRmb3JtQ29yZUR5bmFtaWNUZXN0aW5nLCAnc2VydmVyVGVzdGluZycsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIE5nTW9kdWxlIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZV0sXG4gIGltcG9ydHM6IFtOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogU0VSVkVSX1JFTkRFUl9QUk9WSURFUlNcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyVGVzdGluZ01vZHVsZSB7XG59XG4iXX0=