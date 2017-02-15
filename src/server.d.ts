import { InjectionToken, PlatformRef, Provider } from '@angular/core';
export declare const INTERNAL_SERVER_PLATFORM_PROVIDERS: Array<any>;
export declare function _createConditionalRootRenderer(rootRenderer: any): any;
export declare const SERVER_RENDER_PROVIDERS: Provider[];
/**
 * Config object passed to initialize the platform.
 *
 * @experimental
 */
export interface PlatformConfig {
    document?: string;
    url?: string;
}
/**
 * The DI token for setting the initial config for the platform.
 *
 * @experimental
 */
export declare const INITIAL_CONFIG: InjectionToken<PlatformConfig>;
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
export declare const platformServer: (extraProviders?: Provider[]) => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const platformDynamicServer: (extraProviders?: Provider[]) => PlatformRef;
