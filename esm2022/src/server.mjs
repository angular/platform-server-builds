/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, PlatformLocation, ViewportScroller, ɵgetDOM as getDOM, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { createPlatformFactory, Injector, NgModule, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, Testability, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS, ɵsetDocument, ɵTESTABILITY as TESTABILITY } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DominoAdapter, parseDocument } from './domino_adapter';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { PlatformState } from './platform_state';
import { ServerEventManagerPlugin } from './server_events';
import { INITIAL_CONFIG } from './tokens';
import { TRANSFER_STATE_SERIALIZATION_PROVIDERS } from './transfer_state';
import * as i0 from "@angular/core";
export const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter() {
    return () => {
        DominoAdapter.makeCurrent();
    };
}
export const SERVER_RENDER_PROVIDERS = [
    { provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin },
];
export const PLATFORM_SERVER_PROVIDERS = [
    TRANSFER_STATE_SERIALIZATION_PROVIDERS,
    SERVER_RENDER_PROVIDERS,
    SERVER_HTTP_PROVIDERS,
    { provide: Testability, useValue: null }, // Keep for backwards-compatibility.
    { provide: TESTABILITY, useValue: null },
    { provide: ViewportScroller, useClass: NullViewportScroller },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
export class ServerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.6+sha-e5d58d2", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.6+sha-e5d58d2", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.6+sha-e5d58d2", ngImport: i0, type: ServerModule, providers: PLATFORM_SERVER_PROVIDERS, imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.6+sha-e5d58d2", ngImport: i0, type: ServerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    imports: [HttpClientModule, NoopAnimationsModule],
                    providers: PLATFORM_SERVER_PROVIDERS,
                }]
        }] });
function _document(injector) {
    const config = injector.get(INITIAL_CONFIG, null);
    let document;
    if (config && config.document) {
        document = typeof config.document === 'string' ? parseDocument(config.document, config.url) :
            config.document;
    }
    else {
        document = getDOM().createHtmlDocument();
    }
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
/**
 * @publicApi
 */
export const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @see {@link platformServer}
 * @deprecated add an `import @angular/compiler` and replace the usage with `platformServer`
 *     instead.
 * @publicApi
 */
export const platformDynamicServer = platformServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUwsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQXlDLFdBQVcsRUFBRSx5QkFBeUIsSUFBSSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxJQUFJLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6UixPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDN0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUN4RCxPQUFPLEVBQUMsc0NBQXNDLEVB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LEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUV0Rjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIFBsYXRmb3JtTG9jYXRpb24sIFZpZXdwb3J0U2Nyb2xsZXIsIMm1Z2V0RE9NIGFzIGdldERPTSwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9TRVJWRVJfSUQgYXMgUExBVEZPUk1fU0VSVkVSX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgSW5qZWN0b3IsIE5nTW9kdWxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBwbGF0Zm9ybUNvcmUsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCDJtUFMTE9XX01VTFRJUExFX1BMQVRGT1JNUyBhcyBBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIMm1c2V0RG9jdW1lbnQsIMm1VEVTVEFCSUxJVFkgYXMgVEVTVEFCSUxJVFl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCBFVkVOVF9NQU5BR0VSX1BMVUdJTlN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtEb21pbm9BZGFwdGVyLCBwYXJzZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcbmltcG9ydCB7U0VSVkVSX0hUVFBfUFJPVklERVJTfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHtTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL2xvY2F0aW9uJztcbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge1NlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9zZXJ2ZXJfZXZlbnRzJztcbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQge1RSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTfSBmcm9tICcuL3RyYW5zZmVyX3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fU0VSVkVSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0RG9taW5vQWRhcHRlciwgbXVsdGk6IHRydWV9LCB7XG4gICAgcHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICB1c2VDbGFzczogU2VydmVyUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIFtPcHRpb25hbCwgSU5JVElBTF9DT05GSUddXVxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9XG5dO1xuXG5mdW5jdGlvbiBpbml0RG9taW5vQWRhcHRlcigpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBEb21pbm9BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfUkVOREVSX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgbXVsdGk6IHRydWUsIHVzZUNsYXNzOiBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59LFxuXTtcblxuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX1NFUlZFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTLFxuICBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbiAgU0VSVkVSX0hUVFBfUFJPVklERVJTLFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIHVzZVZhbHVlOiBudWxsfSwgIC8vIEtlZXAgZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LlxuICB7cHJvdmlkZTogVEVTVEFCSUxJVFksIHVzZVZhbHVlOiBudWxsfSxcbiAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlcn0sXG5dO1xuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogUExBVEZPUk1fU0VSVkVSX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCBjb25maWc6IFBsYXRmb3JtQ29uZmlnfG51bGwgPSBpbmplY3Rvci5nZXQoSU5JVElBTF9DT05GSUcsIG51bGwpO1xuICBsZXQgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBpZiAoY29uZmlnICYmIGNvbmZpZy5kb2N1bWVudCkge1xuICAgIGRvY3VtZW50ID0gdHlwZW9mIGNvbmZpZy5kb2N1bWVudCA9PT0gJ3N0cmluZycgPyBwYXJzZURvY3VtZW50KGNvbmZpZy5kb2N1bWVudCwgY29uZmlnLnVybCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZG9jdW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQgPSBnZXRET00oKS5jcmVhdGVIdG1sRG9jdW1lbnQoKTtcbiAgfVxuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1TZXJ2ZXI6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW118dW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3NlcnZlcicsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIFRoZSBzZXJ2ZXIgcGxhdGZvcm0gdGhhdCBzdXBwb3J0cyB0aGUgcnVudGltZSBjb21waWxlci5cbiAqXG4gKiBAc2VlIHtAbGluayBwbGF0Zm9ybVNlcnZlcn1cbiAqIEBkZXByZWNhdGVkIGFkZCBhbiBgaW1wb3J0IEBhbmd1bGFyL2NvbXBpbGVyYCBhbmQgcmVwbGFjZSB0aGUgdXNhZ2Ugd2l0aCBgcGxhdGZvcm1TZXJ2ZXJgXG4gKiAgICAgaW5zdGVhZC5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtRHluYW1pY1NlcnZlciA9IHBsYXRmb3JtU2VydmVyO1xuIl19