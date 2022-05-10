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
import { createPlatformFactory, Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, Testability, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS, ɵsetDocument, ɵTESTABILITY as TESTABILITY } from '@angular/core';
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
ServerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0-next.0+sha-3165fa3", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.0-next.0+sha-3165fa3", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] });
ServerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.0-next.0+sha-3165fa3", ngImport: i0, type: ServerModule, providers: [
        SERVER_RENDER_PROVIDERS,
        SERVER_HTTP_PROVIDERS,
        { provide: Testability, useValue: null },
        { provide: TESTABILITY, useValue: null },
        { provide: ViewportScroller, useClass: NullViewportScroller },
    ], imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0-next.0+sha-3165fa3", ngImport: i0, type: ServerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    imports: [HttpClientModule, NoopAnimationsModule],
                    providers: [
                        SERVER_RENDER_PROVIDERS,
                        SERVER_HTTP_PROVIDERS,
                        { provide: Testability, useValue: null },
                        { provide: TESTABILITY, useValue: null },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUwsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUF5QixnQkFBZ0IsRUFBa0IsV0FBVyxFQUFFLHlCQUF5QixJQUFJLHdCQUF3QixFQUFFLFlBQVksRUFBRSxZQUFZLElBQUksV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ULE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0SCxPQUFPLEVBQUMsb0JBQW9CLElBQUksbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVyRyxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxZQUFZ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QUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQzt3QkFDdEMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7d0JBQ3RDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztxQkFDNUQ7aUJBQ0Y7O0FBSUQsU0FBUyxTQUFTLENBQUMsUUFBa0I7SUFDbkMsSUFBSSxNQUFNLEdBQXdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNFLHFDQUFxQztJQUNyQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUN2QixxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7QUFFdEY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUM5QixxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsa0NBQWtDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtET0NVTUVOVCwgUGxhdGZvcm1Mb2NhdGlvbiwgVmlld3BvcnRTY3JvbGxlciwgybVnZXRET00gYXMgZ2V0RE9NLCDJtU51bGxWaWV3cG9ydFNjcm9sbGVyIGFzIE51bGxWaWV3cG9ydFNjcm9sbGVyLCDJtVBMQVRGT1JNX1NFUlZFUl9JRCBhcyBQTEFURk9STV9TRVJWRVJfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBJbmplY3RvciwgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFJlbmRlcmVyRmFjdG9yeTIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgybVBTExPV19NVUxUSVBMRV9QTEFURk9STVMgYXMgQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TLCDJtXNldERvY3VtZW50LCDJtVRFU1RBQklMSVRZIGFzIFRFU1RBQklMSVRZfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge8m1cGxhdGZvcm1Db3JlRHluYW1pYyBhcyBwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7RG9taW5vQWRhcHRlciwgcGFyc2VEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9IVFRQX1BST1ZJREVSU30gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7U2VydmVyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vc2VydmVyX2V2ZW50cyc7XG5pbXBvcnQge1NlcnZlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vc2VydmVyX3JlbmRlcmVyJztcbmltcG9ydCB7U2VydmVyU3R5bGVzSG9zdH0gZnJvbSAnLi9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtJbmplY3Rvcl19LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9TRVJWRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IGluaXREb21pbm9BZGFwdGVyLCBtdWx0aTogdHJ1ZSwgZGVwczogW0luamVjdG9yXX0sIHtcbiAgICBwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHVzZUNsYXNzOiBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgW09wdGlvbmFsLCBJTklUSUFMX0NPTkZJR11dXG4gIH0sXG4gIHtwcm92aWRlOiBQbGF0Zm9ybVN0YXRlLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAgLy8gQWRkIHNwZWNpYWwgcHJvdmlkZXIgdGhhdCBhbGxvd3MgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHBsYXRmb3JtU2VydmVyKiB0byBiZSBjcmVhdGVkLlxuICB7cHJvdmlkZTogQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TLCB1c2VWYWx1ZTogdHJ1ZX1cbl07XG5cbmZ1bmN0aW9uIGluaXREb21pbm9BZGFwdGVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIERvbWlub0FkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5KFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlckZhY3RvcnkyLCBlbmdpbmU6IMm1QW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeShyZW5kZXJlciwgZW5naW5lLCB6b25lKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9SRU5ERVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLFxuICB7XG4gICAgcHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICB1c2VGYWN0b3J5OiBpbnN0YW50aWF0ZVNlcnZlclJlbmRlcmVyRmFjdG9yeSxcbiAgICBkZXBzOiBbU2VydmVyUmVuZGVyZXJGYWN0b3J5MiwgybVBbmltYXRpb25FbmdpbmUsIE5nWm9uZV1cbiAgfSxcbiAgU2VydmVyU3R5bGVzSG9zdCxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBTZXJ2ZXJTdHlsZXNIb3N0fSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgbXVsdGk6IHRydWUsIHVzZUNsYXNzOiBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59LFxuXTtcblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbiAgICBTRVJWRVJfSFRUUF9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sICAvLyBLZWVwIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cbiAgICB7cHJvdmlkZTogVEVTVEFCSUxJVFksIHVzZVZhbHVlOiBudWxsfSxcbiAgICB7cHJvdmlkZTogVmlld3BvcnRTY3JvbGxlciwgdXNlQ2xhc3M6IE51bGxWaWV3cG9ydFNjcm9sbGVyfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICBsZXQgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgY29uc3QgZG9jdW1lbnQgPSBjb25maWcgJiYgY29uZmlnLmRvY3VtZW50ID8gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVNlcnZlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXXx1bmRlZmluZWQpID0+IFBsYXRmb3JtUmVmID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnc2VydmVyJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogVGhlIHNlcnZlciBwbGF0Zm9ybSB0aGF0IHN1cHBvcnRzIHRoZSBydW50aW1lIGNvbXBpbGVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtRHluYW1pY1NlcnZlciA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZUR5bmFtaWMsICdzZXJ2ZXJEeW5hbWljJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=