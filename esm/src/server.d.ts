import { ClassProvider, ExistingProvider, FactoryProvider, PlatformRef, TypeProvider, ValueProvider } from '@angular/core';
export declare const INTERNAL_SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * The ng module for the server.
 *
 * @experimental
 */
export declare class ServerModule {
}
/**
 * @experimental
 */
export declare const platformServer: (extraProviders?: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[]) => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const platformDynamicServer: (extraProviders?: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[]) => PlatformRef;
