/**
 * @license Angular v16.2.0-next.1+sha-29bf476
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */


import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser/animations';
import * as i2 from '@angular/platform-browser-dynamic/testing';
import { PlatformRef } from '@angular/core';
import { StaticProvider } from '@angular/core';

/**
 * Platform for testing
 *
 * @publicApi
 */
export declare const platformServerTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * NgModule for testing.
 *
 * @publicApi
 */
export declare class ServerTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerTestingModule, never, [typeof i1.NoopAnimationsModule], [typeof i2.BrowserDynamicTestingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerTestingModule>;
}

export { }
