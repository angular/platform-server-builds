/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/server.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵAnimationEngine } from '@angular/animations/browser';
import { DOCUMENT, PlatformLocation, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID, ɵgetDOM as getDOM } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS, ɵsetDocument } from '@angular/core';
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
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} feature
 * @return {?}
 */
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
/** @type {?} */
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
/**
 * @param {?} injector
 * @return {?}
 */
function initDominoAdapter(injector) {
    return (/**
     * @return {?}
     */
    () => { DominoAdapter.makeCurrent(); });
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
export function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
/** @type {?} */
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
 * \@publicApi
 */
export class ServerModule {
}
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpClientModule, NoopAnimationsModule],
                providers: [
                    SERVER_RENDER_PROVIDERS,
                    SERVER_HTTP_PROVIDERS,
                    { provide: Testability, useValue: null },
                    { provide: ViewportScroller, useClass: NullViewportScroller },
                ],
            },] },
];
/** @nocollapse */ ServerModule.ɵmod = i0.ɵɵdefineNgModule({ type: ServerModule });
/** @nocollapse */ ServerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ServerModule_Factory(t) { return new (t || ServerModule)(); }, providers: [
        SERVER_RENDER_PROVIDERS,
        SERVER_HTTP_PROVIDERS,
        { provide: Testability, useValue: null },
        { provide: ViewportScroller, useClass: NullViewportScroller },
    ], imports: [[HttpClientModule, NoopAnimationsModule],
        BrowserModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ServerModule, { imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerModule, [{
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
    }], null, null); })();
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    /** @type {?} */
    let config = injector.get(INITIAL_CONFIG, null);
    /** @type {?} */
    const document = config && config.document ? parseDocument(config.document, config.url) :
        getDOM().createHtmlDocument();
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
/**
 * \@publicApi
 * @type {?}
 */
export const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * \@publicApi
 * @type {?}
 */
export const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxTCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBeUIsZ0JBQWdCLEVBQWtCLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RSLE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0SCxPQUFPLEVBQUMsb0JBQW9CLElBQUksbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVyRyxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFB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bmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtET0NVTUVOVCwgUGxhdGZvcm1Mb2NhdGlvbiwgVmlld3BvcnRTY3JvbGxlciwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9TRVJWRVJfSUQgYXMgUExBVEZPUk1fU0VSVkVSX0lELCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SW5qZWN0b3IsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIHBsYXRmb3JtQ29yZSwgybVBTExPV19NVUxUSVBMRV9QTEFURk9STVMgYXMgQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TLCDJtXNldERvY3VtZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge8m1cGxhdGZvcm1Db3JlRHluYW1pYyBhcyBwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7RG9taW5vQWRhcHRlciwgcGFyc2VEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9IVFRQX1BST1ZJREVSU30gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7U2VydmVyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vc2VydmVyX2V2ZW50cyc7XG5pbXBvcnQge1NlcnZlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vc2VydmVyX3JlbmRlcmVyJztcbmltcG9ydCB7U2VydmVyU3R5bGVzSG9zdH0gZnJvbSAnLi9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5mdW5jdGlvbiBub3RTdXBwb3J0ZWQoZmVhdHVyZTogc3RyaW5nKTogRXJyb3Ige1xuICB0aHJvdyBuZXcgRXJyb3IoYHBsYXRmb3JtLXNlcnZlciBkb2VzIG5vdCBzdXBwb3J0ICcke2ZlYXR1cmV9Jy5gKTtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fU0VSVkVSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0RG9taW5vQWRhcHRlciwgbXVsdGk6IHRydWUsIGRlcHM6IFtJbmplY3Rvcl19LCB7XG4gICAgcHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICB1c2VDbGFzczogU2VydmVyUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIFtPcHRpb25hbCwgSU5JVElBTF9DT05GSUddXVxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9XG5dO1xuXG5mdW5jdGlvbiBpbml0RG9taW5vQWRhcHRlcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgcmV0dXJuICgpID0+IHsgRG9taW5vQWRhcHRlci5tYWtlQ3VycmVudCgpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVTZXJ2ZXJSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogybVBbmltYXRpb25FbmdpbmUsIHpvbmU6IE5nWm9uZSkge1xuICByZXR1cm4gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KHJlbmRlcmVyLCBlbmdpbmUsIHpvbmUpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFNlcnZlclJlbmRlcmVyRmFjdG9yeTIsXG4gIHtcbiAgICBwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLCDJtUFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9LFxuICBTZXJ2ZXJTdHlsZXNIb3N0LFxuICB7cHJvdmlkZTogU2hhcmVkU3R5bGVzSG9zdCwgdXNlRXhpc3Rpbmc6IFNlcnZlclN0eWxlc0hvc3R9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBtdWx0aTogdHJ1ZSwgdXNlQ2xhc3M6IFNlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0sXG5dO1xuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTLFxuICAgIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIHVzZVZhbHVlOiBudWxsfSxcbiAgICB7cHJvdmlkZTogVmlld3BvcnRTY3JvbGxlciwgdXNlQ2xhc3M6IE51bGxWaWV3cG9ydFNjcm9sbGVyfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICBsZXQgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgY29uc3QgZG9jdW1lbnQgPSBjb25maWcgJiYgY29uZmlnLmRvY3VtZW50ID8gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVNlcnZlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSB8IHVuZGVmaW5lZCkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdzZXJ2ZXInLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBUaGUgc2VydmVyIHBsYXRmb3JtIHRoYXQgc3VwcG9ydHMgdGhlIHJ1bnRpbWUgY29tcGlsZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1EeW5hbWljU2VydmVyID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlRHluYW1pYywgJ3NlcnZlckR5bmFtaWMnLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcbiJdfQ==