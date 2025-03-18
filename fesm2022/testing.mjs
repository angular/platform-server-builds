/**
 * @license Angular v20.0.0-next.2+sha-2ca72fa
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, NgModule } from '@angular/core';
import { ɵplatformCoreDynamicTesting as _platformCoreDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS as _INTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS as _SERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * Platform for testing
 *
 * @publicApi
 */
const platformServerTesting = createPlatformFactory(_platformCoreDynamicTesting, 'serverTesting', _INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class ServerTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-next.2+sha-2ca72fa", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-next.2+sha-2ca72fa", ngImport: i0, type: ServerTestingModule, exports: [BrowserDynamicTestingModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-next.2+sha-2ca72fa", ngImport: i0, type: ServerTestingModule, providers: _SERVER_RENDER_PROVIDERS, imports: [BrowserDynamicTestingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-next.2+sha-2ca72fa", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    providers: _SERVER_RENDER_PROVIDERS,
                }]
        }] });

export { ServerTestingModule, platformServerTesting };
//# sourceMappingURL=testing.mjs.map
