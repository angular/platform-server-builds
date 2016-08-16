import { ComponentRef, PlatformRef, Type } from '@angular/core';
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @experimental
 */
export declare const SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @experimental
 */
export declare const serverPlatform: () => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const serverDynamicPlatform: () => PlatformRef;
/**
 * Used to bootstrap Angular in server environment (such as node).
 *
 * This version of bootstrap only creates platform injector and does not define anything for
 * application injector. It is expected that application providers are imported from other
 * packages such as `@angular/platform-browser` or `@angular/platform-browser-dynamic`.
 *
 * ```
 * import {BROWSER_APP_PROVIDERS} from '@angular/platform-browser';
 * import {BROWSER_APP_COMPILER_PROVIDERS} from '@angular/platform-browser-dynamic';
 *
 * serverBootstrap(..., [BROWSER_APP_PROVIDERS, BROWSER_APP_COMPILER_PROVIDERS])
 * ```
 *
 * @deprecated create an {@link AppModule} and use {@link bootstrapModule} with the {@link
 * serverDynamicPlatform}()
 * instead.
 */
export declare function serverBootstrap(appComponentType: Type, providers: Array<any>): Promise<ComponentRef<any>>;
