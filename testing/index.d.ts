/**
 * @license Angular v20.0.0-next.1+sha-c492db4
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */


import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser-dynamic/testing';
import { PlatformRef } from '@angular/core';
import { StaticProvider } from '@angular/core';

/**
 * Platform for testing
 *
 * @publicApi
 */
export declare const platformServerTesting: (extraProviders?: StaticProvider[]) => PlatformRef;

/**
 * NgModule for testing.
 *
 * @publicApi
 */
export declare class ServerTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerTestingModule, never, never, [typeof i1.BrowserDynamicTestingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerTestingModule>;
}

export { }
