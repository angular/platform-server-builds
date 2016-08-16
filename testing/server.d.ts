/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef } from '@angular/core';
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
export declare const TEST_SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const serverTestPlatform: () => PlatformRef;
/**
 * AppModule for testing.
 *
 * @stable
 */
export declare class ServerTestModule {
}
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
export declare const TEST_SERVER_APPLICATION_PROVIDERS: Array<any>;
