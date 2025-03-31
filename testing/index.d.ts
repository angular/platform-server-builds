/**
 * @license Angular v20.0.0-next.4+sha-1e697f3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider } from '@angular/core';
import * as i1 from '@angular/platform-browser-dynamic/testing';

/**
 * Platform for testing
 *
 * @publicApi
 */
declare const platformServerTesting: (extraProviders?: StaticProvider[]) => i0.PlatformRef;
/**
 * NgModule for testing.
 *
 * @publicApi
 */
declare class ServerTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerTestingModule, never, never, [typeof i1.BrowserDynamicTestingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerTestingModule>;
}

export { ServerTestingModule, platformServerTesting };
