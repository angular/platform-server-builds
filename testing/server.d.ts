/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef } from '@angular/core';
import { browserTestCompiler } from '@angular/platform-browser-dynamic/testing';
/**
 * Creates a compiler for testing
 *
 * @stable
 */
export declare const serverTestCompiler: typeof browserTestCompiler;
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare function serverTestPlatform(): PlatformRef;
/**
 * AppModule for testing.
 *
 * @stable
 */
export declare class ServerTestModule {
}
