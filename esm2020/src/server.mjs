/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵAnimationEngine } from '@angular/animations/browser';
import { DOCUMENT, PlatformLocation, ViewportScroller, ɵgetDOM as getDOM, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { createPlatformFactory, Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, Testability, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS, ɵsetDocument } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { DominoAdapter, parseDocument } from './domino_adapter';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { PlatformState } from './platform_state';
import { ServerEventManagerPlugin } from './server_events';
import { ServerRendererFactory2 } from './server_renderer';
import { ServerStylesHost } from './styles_host';
import { INITIAL_CONFIG } from './tokens';
import * as i0 from "@angular/core";
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
export const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter(injector) {
    return () => {
        DominoAdapter.makeCurrent();
    };
}
export function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
export const SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: SharedStylesHost, useExisting: ServerStylesHost },
    { provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
export class ServerModule {
}
ServerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-d322052", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-next.15+sha-d322052", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] });
ServerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-d322052", ngImport: i0, type: ServerModule, providers: [
        SERVER_RENDER_PROVIDERS,
        SERVER_HTTP_PROVIDERS,
        { provide: Testability, useValue: null },
        { provide: ViewportScroller, useClass: NullViewportScroller },
    ], imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-d322052", ngImport: i0, type: ServerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    imports: [HttpClientModule, NoopAnimationsModule],
                    providers: [
                        SERVER_RENDER_PROVIDERS,
                        SERVER_HTTP_PROVIDERS,
                        { provide: Testability, useValue: null },
                        { provide: ViewportScroller, useClass: NullViewportScroller },
                    ],
                }]
        }] });
function _document(injector) {
    let config = injector.get(INITIAL_CONFIG, null);
    const document = config && config.document ? parseDocument(config.document, config.url) :
        getDOM().createHtmlDocument();
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
 * @publicApi
 */
export const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUwsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUF5QixnQkFBZ0IsRUFBa0IsV0FBVyxFQUFFLHlCQUF5QixJQUFJLHdCQUF3QixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0UixPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEgsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUYsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHlCQUF5QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFckcsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDN0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ2xELE9BQU8sRUFB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QixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQzt3QkFDdEMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO3FCQUM1RDtpQkFDRjs7QUFJRCxTQUFTLFNBQVMsQ0FBQyxRQUFrQjtJQUNuQyxJQUFJLE1BQU0sR0FBd0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDM0UscUNBQXFDO0lBQ3JDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQ3ZCLHFCQUFxQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUV0Rjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQzlCLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge0RPQ1VNRU5ULCBQbGF0Zm9ybUxvY2F0aW9uLCBWaWV3cG9ydFNjcm9sbGVyLCDJtWdldERPTSBhcyBnZXRET00sIMm1TnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIMm1UExBVEZPUk1fU0VSVkVSX0lEIGFzIFBMQVRGT1JNX1NFUlZFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIEluamVjdG9yLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBwbGF0Zm9ybUNvcmUsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCDJtUFMTE9XX01VTFRJUExFX1BMQVRGT1JNUyBhcyBBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIMm1c2V0RG9jdW1lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7ybVwbGF0Zm9ybUNvcmVEeW5hbWljIGFzIHBsYXRmb3JtQ29yZUR5bmFtaWN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5pbXBvcnQge05vb3BBbmltYXRpb25zTW9kdWxlLCDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtEb21pbm9BZGFwdGVyLCBwYXJzZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcbmltcG9ydCB7U0VSVkVSX0hUVFBfUFJPVklERVJTfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHtTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL2xvY2F0aW9uJztcbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge1NlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9zZXJ2ZXJfZXZlbnRzJztcbmltcG9ydCB7U2VydmVyUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9zZXJ2ZXJfcmVuZGVyZXInO1xuaW1wb3J0IHtTZXJ2ZXJTdHlsZXNIb3N0fSBmcm9tICcuL3N0eWxlc19ob3N0JztcbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5cbmZ1bmN0aW9uIG5vdFN1cHBvcnRlZChmZWF0dXJlOiBzdHJpbmcpOiBFcnJvciB7XG4gIHRocm93IG5ldyBFcnJvcihgcGxhdGZvcm0tc2VydmVyIGRvZXMgbm90IHN1cHBvcnQgJyR7ZmVhdHVyZX0nLmApO1xufVxuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtJbmplY3Rvcl19LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9TRVJWRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IGluaXREb21pbm9BZGFwdGVyLCBtdWx0aTogdHJ1ZSwgZGVwczogW0luamVjdG9yXX0sIHtcbiAgICBwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHVzZUNsYXNzOiBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgW09wdGlvbmFsLCBJTklUSUFMX0NPTkZJR11dXG4gIH0sXG4gIHtwcm92aWRlOiBQbGF0Zm9ybVN0YXRlLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAgLy8gQWRkIHNwZWNpYWwgcHJvdmlkZXIgdGhhdCBhbGxvd3MgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHBsYXRmb3JtU2VydmVyKiB0byBiZSBjcmVhdGVkLlxuICB7cHJvdmlkZTogQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TLCB1c2VWYWx1ZTogdHJ1ZX1cbl07XG5cbmZ1bmN0aW9uIGluaXREb21pbm9BZGFwdGVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIERvbWlub0FkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5KFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlckZhY3RvcnkyLCBlbmdpbmU6IMm1QW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeShyZW5kZXJlciwgZW5naW5lLCB6b25lKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9SRU5ERVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLFxuICB7XG4gICAgcHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICB1c2VGYWN0b3J5OiBpbnN0YW50aWF0ZVNlcnZlclJlbmRlcmVyRmFjdG9yeSxcbiAgICBkZXBzOiBbU2VydmVyUmVuZGVyZXJGYWN0b3J5MiwgybVBbmltYXRpb25FbmdpbmUsIE5nWm9uZV1cbiAgfSxcbiAgU2VydmVyU3R5bGVzSG9zdCxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBTZXJ2ZXJTdHlsZXNIb3N0fSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgbXVsdGk6IHRydWUsIHVzZUNsYXNzOiBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59LFxuXTtcblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbiAgICBTRVJWRVJfSFRUUF9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sXG4gICAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlcn0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlck1vZHVsZSB7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgbGV0IGNvbmZpZzogUGxhdGZvcm1Db25maWd8bnVsbCA9IGluamVjdG9yLmdldChJTklUSUFMX0NPTkZJRywgbnVsbCk7XG4gIGNvbnN0IGRvY3VtZW50ID0gY29uZmlnICYmIGNvbmZpZy5kb2N1bWVudCA/IHBhcnNlRG9jdW1lbnQoY29uZmlnLmRvY3VtZW50LCBjb25maWcudXJsKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldERPTSgpLmNyZWF0ZUh0bWxEb2N1bWVudCgpO1xuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1TZXJ2ZXI6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW118dW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3NlcnZlcicsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIFRoZSBzZXJ2ZXIgcGxhdGZvcm0gdGhhdCBzdXBwb3J0cyB0aGUgcnVudGltZSBjb21waWxlci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmVEeW5hbWljLCAnc2VydmVyRHluYW1pYycsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuIl19