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
export const PLATFORM_SERVER_PROVIDERS = [
    TRANSFER_STATE_SERIALIZATION_PROVIDERS,
    SERVER_RENDER_PROVIDERS,
    SERVER_HTTP_PROVIDERS,
    { provide: Testability, useValue: null },
    { provide: TESTABILITY, useValue: null },
    { provide: ViewportScroller, useClass: NullViewportScroller },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
class ServerModule {
}
ServerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-2d7f48c", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.2+sha-2d7f48c", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] });
ServerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-2d7f48c", ngImport: i0, type: ServerModule, providers: PLATFORM_SERVER_PROVIDERS, imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] });
export { ServerModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-2d7f48c", ngImport: i0, type: ServerModule, decorators: [{
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
 * @publicApi
 */
export const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUwsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUF5QixnQkFBZ0IsRUFBa0IsV0FBVyxFQUFFLHlCQUF5QixJQUFJLHdCQUF3QixFQUFFLFlBQVksRUFBRSxZQUFZLElBQUksV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ULE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0SCxPQUFPLEVBQUMsb0JBQW9CLElBQUksbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVyRyxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxZQUFZ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O29CQUNqRCxTQUFTLEVBQUUseUJBQXlCO2lCQUNyQzs7QUFJRCxTQUFTLFNBQVMsQ0FBQyxRQUFrQjtJQUNuQyxNQUFNLE1BQU0sR0FBd0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsSUFBSSxRQUFrQixDQUFDO0lBQ3ZCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDN0IsUUFBUSxHQUFHLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDbEU7U0FBTTtRQUNMLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzFDO0lBQ0QscUNBQXFDO0lBQ3JDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQ3ZCLHFCQUFxQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUV0Rjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQzlCLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge0RPQ1VNRU5ULCBQbGF0Zm9ybUxvY2F0aW9uLCBWaWV3cG9ydFNjcm9sbGVyLCDJtWdldERPTSBhcyBnZXRET00sIMm1TnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIMm1UExBVEZPUk1fU0VSVkVSX0lEIGFzIFBMQVRGT1JNX1NFUlZFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIEluamVjdG9yLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBwbGF0Zm9ybUNvcmUsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCDJtUFMTE9XX01VTFRJUExFX1BMQVRGT1JNUyBhcyBBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIMm1c2V0RG9jdW1lbnQsIMm1VEVTVEFCSUxJVFkgYXMgVEVTVEFCSUxJVFl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7ybVwbGF0Zm9ybUNvcmVEeW5hbWljIGFzIHBsYXRmb3JtQ29yZUR5bmFtaWN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5pbXBvcnQge05vb3BBbmltYXRpb25zTW9kdWxlLCDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtEb21pbm9BZGFwdGVyLCBwYXJzZURvY3VtZW50fSBmcm9tICcuL2RvbWlub19hZGFwdGVyJztcbmltcG9ydCB7U0VSVkVSX0hUVFBfUFJPVklERVJTfSBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IHtTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL2xvY2F0aW9uJztcbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge1NlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9zZXJ2ZXJfZXZlbnRzJztcbmltcG9ydCB7U2VydmVyUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9zZXJ2ZXJfcmVuZGVyZXInO1xuaW1wb3J0IHtTZXJ2ZXJTdHlsZXNIb3N0fSBmcm9tICcuL3N0eWxlc19ob3N0JztcbmltcG9ydCB7SU5JVElBTF9DT05GSUcsIFBsYXRmb3JtQ29uZmlnfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQge1RSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTfSBmcm9tICcuL3RyYW5zZmVyX3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fU0VSVkVSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0RG9taW5vQWRhcHRlciwgbXVsdGk6IHRydWV9LCB7XG4gICAgcHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICB1c2VDbGFzczogU2VydmVyUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIFtPcHRpb25hbCwgSU5JVElBTF9DT05GSUddXVxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9XG5dO1xuXG5mdW5jdGlvbiBpbml0RG9taW5vQWRhcHRlcigpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBEb21pbm9BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZVNlcnZlclJlbmRlcmVyRmFjdG9yeShcbiAgICByZW5kZXJlcjogUmVuZGVyZXJGYWN0b3J5MiwgZW5naW5lOiDJtUFuaW1hdGlvbkVuZ2luZSwgem9uZTogTmdab25lKSB7XG4gIHJldHVybiBuZXcgybVBbmltYXRpb25SZW5kZXJlckZhY3RvcnkocmVuZGVyZXIsIGVuZ2luZSwgem9uZSk7XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfUkVOREVSX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgU2VydmVyUmVuZGVyZXJGYWN0b3J5MixcbiAge1xuICAgIHByb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgdXNlRmFjdG9yeTogaW5zdGFudGlhdGVTZXJ2ZXJSZW5kZXJlckZhY3RvcnksXG4gICAgZGVwczogW1NlcnZlclJlbmRlcmVyRmFjdG9yeTIsIMm1QW5pbWF0aW9uRW5naW5lLCBOZ1pvbmVdXG4gIH0sXG4gIFNlcnZlclN0eWxlc0hvc3QsXG4gIHtwcm92aWRlOiBTaGFyZWRTdHlsZXNIb3N0LCB1c2VFeGlzdGluZzogU2VydmVyU3R5bGVzSG9zdH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIG11bHRpOiB0cnVlLCB1c2VDbGFzczogU2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2lufSxcbl07XG5cbmV4cG9ydCBjb25zdCBQTEFURk9STV9TRVJWRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSUyxcbiAgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlMsXG4gIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sICAvLyBLZWVwIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cbiAge3Byb3ZpZGU6IFRFU1RBQklMSVRZLCB1c2VWYWx1ZTogbnVsbH0sXG4gIHtwcm92aWRlOiBWaWV3cG9ydFNjcm9sbGVyLCB1c2VDbGFzczogTnVsbFZpZXdwb3J0U2Nyb2xsZXJ9LFxuXTtcblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFBMQVRGT1JNX1NFUlZFUl9QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlck1vZHVsZSB7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgbGV0IGRvY3VtZW50OiBEb2N1bWVudDtcbiAgaWYgKGNvbmZpZyAmJiBjb25maWcuZG9jdW1lbnQpIHtcbiAgICBkb2N1bWVudCA9IHR5cGVvZiBjb25maWcuZG9jdW1lbnQgPT09ICdzdHJpbmcnID8gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRvY3VtZW50O1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50ID0gZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIH1cbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfHVuZGVmaW5lZCkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdzZXJ2ZXInLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBUaGUgc2VydmVyIHBsYXRmb3JtIHRoYXQgc3VwcG9ydHMgdGhlIHJ1bnRpbWUgY29tcGlsZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1EeW5hbWljU2VydmVyID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlRHluYW1pYywgJ3NlcnZlckR5bmFtaWMnLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcbiJdfQ==