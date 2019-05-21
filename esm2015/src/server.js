/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵAnimationEngine } from '@angular/animations/browser';
import { DOCUMENT, PlatformLocation, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS, ɵSharedStylesHost as SharedStylesHost, ɵgetDOM as getDOM } from '@angular/platform-browser';
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
/** @nocollapse */ ServerModule.ngModuleDef = i0.ɵɵdefineNgModule({ type: ServerModule });
/** @nocollapse */ ServerModule.ngInjectorDef = i0.ɵɵdefineInjector({ factory: function ServerModule_Factory(t) { return new (t || ServerModule)(); }, providers: [
        SERVER_RENDER_PROVIDERS,
        SERVER_HTTP_PROVIDERS,
        { provide: Testability, useValue: null },
        { provide: ViewportScroller, useClass: NullViewportScroller },
    ], imports: [[HttpClientModule, NoopAnimationsModule],
        BrowserModule] });
/*@__PURE__*/ i0.ɵɵsetNgModuleScope(ServerModule, { imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] });
/*@__PURE__*/ i0.ɵsetClassMetadata(ServerModule, [{
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
    }], null, null);
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    /** @type {?} */
    let config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document, config.url);
    }
    else {
        return getDOM().createHtmlDocument();
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLElBQUksb0JBQW9CLEVBQUUsbUJBQW1CLElBQUksa0JBQWtCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2SyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQTZCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQXlCLGdCQUFnQixFQUFnQyxXQUFXLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixJQUFJLHdCQUF3QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xULE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pJLE9BQU8sRUFBQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzlGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRXJHLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNsRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBRXhELFNBQVMsWUFBWSxDQUFDLE9BQWU7SUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsT0FBTyxJQUFJLENBQUMsQ0FBQztBQUNwRSxDQUFDOztBQUVELE1BQU0sT0FBTyxrQ0FBa0MsR0FBcUI7SUFDbEUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUM7SUFDNUQsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQztJQUNwRCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFFO1FBQzdGLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDN0M7SUFDRCxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUM7SUFDMUMsd0ZBQXdGO0lBQ3hGLEVBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7Q0FDcEQ7Ozs7O0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxRQUFrQjtJQUMzQzs7O0lBQU8sR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQ2hELENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0NBQWdDLENBQzVDLFFBQTBCLEVBQUUsTUFBd0IsRUFBRSxJQUFZO0lBQ3BFLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELENBQUM7O0FBRUQsTUFBTSxPQUFPLHVCQUF1QixHQUFlO0lBQ2pELHNCQUFzQjtJQUN0QjtRQUNFLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsVUFBVSxFQUFFLGdDQUFnQztRQUM1QyxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7S0FDekQ7SUFDRCxnQkFBZ0I7SUFDaEIsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDO0lBQzFELEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFDO0NBQ2xGOzs7Ozs7QUFpQkQsTUFBTSxPQUFPLFlBQVk7OztZQVZ4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDakQsU0FBUyxFQUFFO29CQUNULHVCQUF1QjtvQkFDdkIscUJBQXFCO29CQUNyQixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztvQkFDdEMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO2lCQUM1RDthQUNGOzt1REFDWSxZQUFZO2dIQUFaLFlBQVksbUJBUFo7UUFDVCx1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1FBQ3RDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztLQUM1RCxZQU5RLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7UUFEdkMsYUFBYTtvQ0FTWixZQUFZLGNBUmIsZ0JBQWdCLEVBQUUsb0JBQW9CLGFBRHRDLGFBQWE7bUNBU1osWUFBWTtjQVZ4QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDakQsU0FBUyxFQUFFO29CQUNULHVCQUF1QjtvQkFDdkIscUJBQXFCO29CQUNyQixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztvQkFDdEMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO2lCQUM1RDthQUNGOzs7Ozs7QUFJRCxTQUFTLFNBQVMsQ0FBQyxRQUFrQjs7UUFDL0IsTUFBTSxHQUF3QixRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7SUFDcEUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUM3QixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0wsT0FBTyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQzs7Ozs7QUFLRCxNQUFNLE9BQU8sY0FBYyxHQUN2QixxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGtDQUFrQyxDQUFDOzs7Ozs7O0FBT3JGLE1BQU0sT0FBTyxxQkFBcUIsR0FDOUIscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGtDQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtET0NVTUVOVCwgUGxhdGZvcm1Mb2NhdGlvbiwgVmlld3BvcnRTY3JvbGxlciwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9TRVJWRVJfSUQgYXMgUExBVEZPUk1fU0VSVkVSX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlckZhY3RvcnkyLCBSb290UmVuZGVyZXIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBwbGF0Zm9ybUNvcmUsIMm1QUxMT1dfTVVMVElQTEVfUExBVEZPUk1TIGFzIEFMTE9XX01VTFRJUExFX1BMQVRGT1JNU30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIEVWRU5UX01BTkFHRVJfUExVR0lOUywgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3QsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge8m1cGxhdGZvcm1Db3JlRHluYW1pYyBhcyBwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7RG9taW5vQWRhcHRlciwgcGFyc2VEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9IVFRQX1BST1ZJREVSU30gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7U2VydmVyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vc2VydmVyX2V2ZW50cyc7XG5pbXBvcnQge1NlcnZlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vc2VydmVyX3JlbmRlcmVyJztcbmltcG9ydCB7U2VydmVyU3R5bGVzSG9zdH0gZnJvbSAnLi9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5mdW5jdGlvbiBub3RTdXBwb3J0ZWQoZmVhdHVyZTogc3RyaW5nKTogRXJyb3Ige1xuICB0aHJvdyBuZXcgRXJyb3IoYHBsYXRmb3JtLXNlcnZlciBkb2VzIG5vdCBzdXBwb3J0ICcke2ZlYXR1cmV9Jy5gKTtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fU0VSVkVSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0RG9taW5vQWRhcHRlciwgbXVsdGk6IHRydWUsIGRlcHM6IFtJbmplY3Rvcl19LCB7XG4gICAgcHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICB1c2VDbGFzczogU2VydmVyUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIFtPcHRpb25hbCwgSU5JVElBTF9DT05GSUddXVxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9XG5dO1xuXG5mdW5jdGlvbiBpbml0RG9taW5vQWRhcHRlcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgcmV0dXJuICgpID0+IHsgRG9taW5vQWRhcHRlci5tYWtlQ3VycmVudCgpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVTZXJ2ZXJSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogybVBbmltYXRpb25FbmdpbmUsIHpvbmU6IE5nWm9uZSkge1xuICByZXR1cm4gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KHJlbmRlcmVyLCBlbmdpbmUsIHpvbmUpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFNlcnZlclJlbmRlcmVyRmFjdG9yeTIsXG4gIHtcbiAgICBwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLCDJtUFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9LFxuICBTZXJ2ZXJTdHlsZXNIb3N0LFxuICB7cHJvdmlkZTogU2hhcmVkU3R5bGVzSG9zdCwgdXNlRXhpc3Rpbmc6IFNlcnZlclN0eWxlc0hvc3R9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBtdWx0aTogdHJ1ZSwgdXNlQ2xhc3M6IFNlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0sXG5dO1xuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTLFxuICAgIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIHVzZVZhbHVlOiBudWxsfSxcbiAgICB7cHJvdmlkZTogVmlld3BvcnRTY3JvbGxlciwgdXNlQ2xhc3M6IE51bGxWaWV3cG9ydFNjcm9sbGVyfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICBsZXQgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgaWYgKGNvbmZpZyAmJiBjb25maWcuZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVIdG1sRG9jdW1lbnQoKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnc2VydmVyJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogVGhlIHNlcnZlciBwbGF0Zm9ybSB0aGF0IHN1cHBvcnRzIHRoZSBydW50aW1lIGNvbXBpbGVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtRHluYW1pY1NlcnZlciA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZUR5bmFtaWMsICdzZXJ2ZXJEeW5hbWljJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=