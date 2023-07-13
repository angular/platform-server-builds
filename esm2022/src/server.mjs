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
    { provide: Testability, useValue: null },
    { provide: TESTABILITY, useValue: null },
    { provide: ViewportScroller, useClass: NullViewportScroller },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
export class ServerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4+sha-d0a9f02", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.4+sha-d0a9f02", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.4+sha-d0a9f02", ngImport: i0, type: ServerModule, providers: PLATFORM_SERVER_PROVIDERS, imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4+sha-d0a9f02", ngImport: i0, type: ServerModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUwsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQXlDLFdBQVcsRUFBRSx5QkFBeUIsSUFBSSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxJQUFJLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6UixPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDN0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUN4RCxPQUFPLEVBQUMsc0NBQXNDLEVB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Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBQbGF0Zm9ybUxvY2F0aW9uLCBWaWV3cG9ydFNjcm9sbGVyLCDJtWdldERPTSBhcyBnZXRET00sIMm1TnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIMm1UExBVEZPUk1fU0VSVkVSX0lEIGFzIFBMQVRGT1JNX1NFUlZFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIEluamVjdG9yLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgybVBTExPV19NVUxUSVBMRV9QTEFURk9STVMgYXMgQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TLCDJtXNldERvY3VtZW50LCDJtVRFU1RBQklMSVRZIGFzIFRFU1RBQklMSVRZfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7RG9taW5vQWRhcHRlciwgcGFyc2VEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9IVFRQX1BST1ZJREVSU30gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7U2VydmVyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vc2VydmVyX2V2ZW50cyc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHtUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSU30gZnJvbSAnLi90cmFuc2Zlcl9zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW0luamVjdG9yXX0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1NFUlZFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlRmFjdG9yeTogaW5pdERvbWlub0FkYXB0ZXIsIG11bHRpOiB0cnVlfSwge1xuICAgIHByb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgdXNlQ2xhc3M6IFNlcnZlclBsYXRmb3JtTG9jYXRpb24sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBbT3B0aW9uYWwsIElOSVRJQUxfQ09ORklHXV1cbiAgfSxcbiAge3Byb3ZpZGU6IFBsYXRmb3JtU3RhdGUsIGRlcHM6IFtET0NVTUVOVF19LFxuICAvLyBBZGQgc3BlY2lhbCBwcm92aWRlciB0aGF0IGFsbG93cyBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgcGxhdGZvcm1TZXJ2ZXIqIHRvIGJlIGNyZWF0ZWQuXG4gIHtwcm92aWRlOiBBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIHVzZVZhbHVlOiB0cnVlfVxuXTtcblxuZnVuY3Rpb24gaW5pdERvbWlub0FkYXB0ZXIoKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgRG9taW5vQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIG11bHRpOiB0cnVlLCB1c2VDbGFzczogU2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2lufSxcbl07XG5cbmV4cG9ydCBjb25zdCBQTEFURk9STV9TRVJWRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBUUkFOU0ZFUl9TVEFURV9TRVJJQUxJWkFUSU9OX1BST1ZJREVSUyxcbiAgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlMsXG4gIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sICAvLyBLZWVwIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cbiAge3Byb3ZpZGU6IFRFU1RBQklMSVRZLCB1c2VWYWx1ZTogbnVsbH0sXG4gIHtwcm92aWRlOiBWaWV3cG9ydFNjcm9sbGVyLCB1c2VDbGFzczogTnVsbFZpZXdwb3J0U2Nyb2xsZXJ9LFxuXTtcblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFBMQVRGT1JNX1NFUlZFUl9QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlck1vZHVsZSB7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgbGV0IGRvY3VtZW50OiBEb2N1bWVudDtcbiAgaWYgKGNvbmZpZyAmJiBjb25maWcuZG9jdW1lbnQpIHtcbiAgICBkb2N1bWVudCA9IHR5cGVvZiBjb25maWcuZG9jdW1lbnQgPT09ICdzdHJpbmcnID8gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRvY3VtZW50O1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50ID0gZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIH1cbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfHVuZGVmaW5lZCkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdzZXJ2ZXInLCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBUaGUgc2VydmVyIHBsYXRmb3JtIHRoYXQgc3VwcG9ydHMgdGhlIHJ1bnRpbWUgY29tcGlsZXIuXG4gKlxuICogQHNlZSB7QGxpbmsgcGxhdGZvcm1TZXJ2ZXJ9XG4gKiBAZGVwcmVjYXRlZCBhZGQgYW4gYGltcG9ydCBAYW5ndWxhci9jb21waWxlcmAgYW5kIHJlcGxhY2UgdGhlIHVzYWdlIHdpdGggYHBsYXRmb3JtU2VydmVyYFxuICogICAgIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIgPSBwbGF0Zm9ybVNlcnZlcjtcbiJdfQ==