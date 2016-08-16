import { PlatformRef } from '@angular/core';
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
export declare const platformServer: (extraProviders?: any[]) => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const platformDynamicServer: (extraProviders?: any[]) => PlatformRef;
