/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef, StaticProvider } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser/animations";
import * as i2 from "@angular/platform-browser-dynamic/testing";
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
    static ngModuleDef: i0.ΔNgModuleDefWithMeta<ServerTestingModule, never, [typeof i1.NoopAnimationsModule], [typeof i2.BrowserDynamicTestingModule]>;
    static ngInjectorDef: i0.ΔInjectorDef<ServerTestingModule>;
}
