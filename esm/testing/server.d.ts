import { ClassProvider, ExistingProvider, FactoryProvider, PlatformRef, TypeProvider, ValueProvider } from '@angular/core';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformServerTesting: (extraProviders?: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare class ServerTestingModule {
}
