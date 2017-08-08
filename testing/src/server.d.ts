import { PlatformRef, StaticProvider } from '@angular/core';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformServerTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare class ServerTestingModule {
}
