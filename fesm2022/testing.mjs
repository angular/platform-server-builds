/**
 * @license Angular v20.0.0-next.1+sha-9a124c8
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, NgModule } from '@angular/core';
import { ɵplatformCoreDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * Platform for testing
 *
 * @publicApi
 */
const platformServerTesting = createPlatformFactory(ɵplatformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class ServerTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-next.1+sha-9a124c8", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-next.1+sha-9a124c8", ngImport: i0, type: ServerTestingModule, exports: [BrowserDynamicTestingModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-next.1+sha-9a124c8", ngImport: i0, type: ServerTestingModule, providers: ɵSERVER_RENDER_PROVIDERS, imports: [BrowserDynamicTestingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-next.1+sha-9a124c8", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    providers: ɵSERVER_RENDER_PROVIDERS,
                }]
        }] });

export { ServerTestingModule, platformServerTesting };
//# sourceMappingURL=testing.mjs.map
