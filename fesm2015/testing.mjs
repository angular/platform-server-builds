/**
 * @license Angular v15.2.8+sha-0f38b98
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, NgModule } from '@angular/core';
import { ɵplatformCoreDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
}
ServerTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.8+sha-0f38b98", ngImport: i0, type: ServerTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.8+sha-0f38b98", ngImport: i0, type: ServerTestingModule, imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] });
ServerTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.8+sha-0f38b98", ngImport: i0, type: ServerTestingModule, providers: ɵSERVER_RENDER_PROVIDERS, imports: [NoopAnimationsModule, BrowserDynamicTestingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.8+sha-0f38b98", ngImport: i0, type: ServerTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserDynamicTestingModule],
                    imports: [NoopAnimationsModule],
                    providers: ɵSERVER_RENDER_PROVIDERS
                }]
        }] });

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-browser-dynamic/testing package.
 */

/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */
// This file only reexports content of the `src` folder. Keep it that way.

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */

export { ServerTestingModule, platformServerTesting };
//# sourceMappingURL=testing.mjs.map
