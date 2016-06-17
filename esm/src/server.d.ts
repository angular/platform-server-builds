import { ComponentRef, PlatformRef, Type } from '@angular/core';
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to {@link platform}.
 */
export declare const SERVER_PLATFORM_PROVIDERS: Array<any>;
export declare const SERVER_APPLICATION_PROVIDERS: Array<any>;
export declare function serverPlatform(): PlatformRef;
export declare function serverBootstrap(appComponentType: Type, customProviders?: Array<any>): Promise<ComponentRef<any>>;
