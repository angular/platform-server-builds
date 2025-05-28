/**
 * @license Angular v20.1.0-next.0+sha-2a290ab
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider, PlatformRef } from '@angular/core';
import * as i1 from '@angular/platform-browser-dynamic/testing';

/**
 * Platform for testing
 *
 * @publicApi
 * @deprecated from v20.0.0, use e2e testing to verify SSR behavior.
 */
declare const platformServerTesting: (extraProviders?: StaticProvider[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @publicApi
 * @deprecated from v20.0.0, use e2e testing to verify SSR behavior.
 */
declare class ServerTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerTestingModule, never, never, [typeof i1.BrowserDynamicTestingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerTestingModule>;
}

export { ServerTestingModule, platformServerTesting };
