/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, PlatformLocation, ViewportScroller, ɵgetDOM as getDOM, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { createPlatformFactory, Injector, NgModule, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, Testability, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS, ɵsetDocument, ɵTESTABILITY as TESTABILITY, } from '@angular/core';
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
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true },
    {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]],
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true },
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0+sha-69b20d8", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.0+sha-69b20d8", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.0+sha-69b20d8", ngImport: i0, type: ServerModule, providers: PLATFORM_SERVER_PROVIDERS, imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0+sha-69b20d8", ngImport: i0, type: ServerModule, decorators: [{
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
        document =
            typeof config.document === 'string'
                ? parseDocument(config.document, config.url)
                : config.document;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLE9BQU8sSUFBSSxNQUFNLEVBQ2pCLHFCQUFxQixJQUFJLG9CQUFvQixFQUM3QyxtQkFBbUIsSUFBSSxrQkFBa0IsR0FDMUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFdBQVcsRUFDWCxvQkFBb0IsRUFDcEIsWUFBWSxFQUlaLFdBQVcsRUFDWCx5QkFBeUIsSUFBSSx3QkFBd0IsRUFDckQsWUFBWSxFQUNaLFlBQVksSUFBSSxXQUFXLEdBQzVCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQWlCLE1BQU0sVUFBVSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxz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WSxFQUFFLFFBQVEsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERPQ1VNRU5ULFxuICBQbGF0Zm9ybUxvY2F0aW9uLFxuICBWaWV3cG9ydFNjcm9sbGVyLFxuICDJtWdldERPTSBhcyBnZXRET00sXG4gIMm1TnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgTnVsbFZpZXdwb3J0U2Nyb2xsZXIsXG4gIMm1UExBVEZPUk1fU0VSVkVSX0lEIGFzIFBMQVRGT1JNX1NFUlZFUl9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtcbiAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LFxuICBJbmplY3RvcixcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRCxcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIHBsYXRmb3JtQ29yZSxcbiAgUGxhdGZvcm1SZWYsXG4gIFByb3ZpZGVyLFxuICBTdGF0aWNQcm92aWRlcixcbiAgVGVzdGFiaWxpdHksXG4gIMm1QUxMT1dfTVVMVElQTEVfUExBVEZPUk1TIGFzIEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUyxcbiAgybVzZXREb2N1bWVudCxcbiAgybVURVNUQUJJTElUWSBhcyBURVNUQUJJTElUWSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIEVWRU5UX01BTkFHRVJfUExVR0lOU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0RvbWlub0FkYXB0ZXIsIHBhcnNlRG9jdW1lbnR9IGZyb20gJy4vZG9taW5vX2FkYXB0ZXInO1xuaW1wb3J0IHtTRVJWRVJfSFRUUF9QUk9WSURFUlN9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1NlcnZlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vbG9jYXRpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7U2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL3NlcnZlcl9ldmVudHMnO1xuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7VFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlN9IGZyb20gJy4vdHJhbnNmZXJfc3RhdGUnO1xuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtJbmplY3Rvcl19LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9TRVJWRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IGluaXREb21pbm9BZGFwdGVyLCBtdWx0aTogdHJ1ZX0sXG4gIHtcbiAgICBwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHVzZUNsYXNzOiBTZXJ2ZXJQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgW09wdGlvbmFsLCBJTklUSUFMX0NPTkZJR11dLFxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9LFxuXTtcblxuZnVuY3Rpb24gaW5pdERvbWlub0FkYXB0ZXIoKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgRG9taW5vQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIG11bHRpOiB0cnVlLCB1c2VDbGFzczogU2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2lufSxcbl07XG5cbmV4cG9ydCBjb25zdCBQTEFURk9STV9TRVJWRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSUyxcbiAgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlMsXG4gIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sIC8vIEtlZXAgZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LlxuICB7cHJvdmlkZTogVEVTVEFCSUxJVFksIHVzZVZhbHVlOiBudWxsfSxcbiAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlcn0sXG5dO1xuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogUExBVEZPUk1fU0VSVkVSX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHt9XG5cbmZ1bmN0aW9uIF9kb2N1bWVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZyB8IG51bGwgPSBpbmplY3Rvci5nZXQoSU5JVElBTF9DT05GSUcsIG51bGwpO1xuICBsZXQgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBpZiAoY29uZmlnICYmIGNvbmZpZy5kb2N1bWVudCkge1xuICAgIGRvY3VtZW50ID1cbiAgICAgIHR5cGVvZiBjb25maWcuZG9jdW1lbnQgPT09ICdzdHJpbmcnXG4gICAgICAgID8gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpXG4gICAgICAgIDogY29uZmlnLmRvY3VtZW50O1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50ID0gZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIH1cbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdIHwgdW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdzZXJ2ZXInLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcbiJdfQ==