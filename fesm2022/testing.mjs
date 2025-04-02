/**
 * @license Angular v20.0.0-next.4+sha-1c7b356
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, platformCore, NgModule } from '@angular/core';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS as _INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { b as INTERNAL_SERVER_PLATFORM_PROVIDERS, d as SERVER_RENDER_PROVIDERS } from './server-BqNlvI2m.mjs';
import '@angular/common';
import '@angular/platform-browser';
import '@angular/common/http';
import 'rxjs';

const INTERNAL_SERVER_DYNAMIC_PLATFORM_TESTING_PROVIDERS = [
    ..._INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    ...INTERNAL_SERVER_PLATFORM_PROVIDERS,
];
/**
 * Platform for testing
 *
 * @publicApi
 */
const platformServerTesting = createPlatformFactory(platformCore, 'serverTesting', INTERNAL_SERVER_DYNAMIC_PLATFORM_TESTING_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class ServerTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-next.4+sha-1c7b356", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-next.4+sha-1c7b356", ngImport: i0, type: ServerTestingModule, exports: [BrowserDynamicTestingModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-next.4+sha-1c7b356", ngImport: i0, type: ServerTestingModule, providers: SERVER_RENDER_PROVIDERS, imports: [BrowserDynamicTestingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-next.4+sha-1c7b356", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    providers: SERVER_RENDER_PROVIDERS,
                }]
        }] });

export { ServerTestingModule, platformServerTesting };
//# sourceMappingURL=testing.mjs.map
