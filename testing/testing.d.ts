/**
 * @license Angular v9.0.0-rc.1+761.sha-32b72f3
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

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
}

export { }
