/**
 * @license Angular v20.1.0-next.0+sha-a2b6163
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { EnvironmentProviders, StaticProvider, PlatformRef, Provider, InjectionToken, ApplicationRef, Type, Version } from '@angular/core';
import * as i1 from '@angular/platform-browser';

/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
declare class PlatformState {
    private _doc;
    constructor(_doc: any);
    /**
     * Renders the current state of the platform to string.
     */
    renderToString(): string;
    /**
     * Returns the current DOM state.
     */
    getDocument(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlatformState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlatformState>;
}

/**
 * Sets up providers necessary to enable server rendering functionality for the application.
 *
 * @usageNotes
 *
 * Basic example of how you can add server support to your application:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideServerRendering()]
 * });
 * ```
 *
 * @publicApi
 * @returns A set of providers to setup the server.
 */
declare function provideServerRendering(): EnvironmentProviders;

declare const INTERNAL_SERVER_PLATFORM_PROVIDERS: StaticProvider[];
declare const SERVER_RENDER_PROVIDERS: Provider[];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
declare class ServerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerModule>;
}
/**
 * @publicApi
 */
declare function platformServer(extraProviders?: StaticProvider[] | undefined): PlatformRef;

/**
 * Config object passed to initialize the platform.
 *
 * @publicApi
 */
interface PlatformConfig {
    /**
     * The initial DOM to use to bootstrap the server application.
     * @default create a new DOM using Domino
     */
    document?: string;
    /**
     * The URL for the current application state. This is used for initializing
     * the platform's location. `protocol`, `hostname`, and `port` will be
     * overridden if `baseUrl` is set.
     * @default none
     */
    url?: string;
}
/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
declare const INITIAL_CONFIG: InjectionToken<PlatformConfig>;
/**
 * A function that will be executed when calling `renderApplication` or
 * `renderModule` just before current platform state is rendered to string.
 *
 * @publicApi
 */
declare const BEFORE_APP_SERIALIZED: InjectionToken<readonly (() => void | Promise<void>)[]>;
declare const ENABLE_DOM_EMULATION: InjectionToken<boolean>;

/**
 * Renders an Angular application to a string.
 *
 * @private
 *
 * @param platformRef - Reference to the Angular platform.
 * @param applicationRef - Reference to the Angular application.
 * @returns A promise that resolves to the rendered string.
 */
declare function renderInternal(platformRef: PlatformRef, applicationRef: ApplicationRef): Promise<string>;
/**
 * An internal token that allows providing extra information about the server context
 * (e.g. whether SSR or SSG was used). The value is a string and characters other
 * than [a-zA-Z0-9\-] are removed. See the default value in `DEFAULT_SERVER_CONTEXT` const.
 */
declare const SERVER_CONTEXT: InjectionToken<string>;
/**
 * Bootstraps an application using provided NgModule and serializes the page content to string.
 *
 * @param moduleType A reference to an NgModule that should be used for bootstrap.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `extraProviders` - set of platform level providers for the current render request.
 *
 * @publicApi
 */
declare function renderModule<T>(moduleType: Type<T>, options: {
    document?: string | Document;
    url?: string;
    extraProviders?: StaticProvider[];
}): Promise<string>;
/**
 * Bootstraps an instance of an Angular application and renders it to a string.

 * ```ts
 * const bootstrap = () => bootstrapApplication(RootComponent, appConfig);
 * const output: string = await renderApplication(bootstrap);
 * ```
 *
 * @param bootstrap A method that when invoked returns a promise that returns an `ApplicationRef`
 *     instance once resolved.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `platformProviders` - the platform level providers for the current render request.
 *
 * @returns A Promise, that returns serialized (to a string) rendered page, once resolved.
 *
 * @publicApi
 */
declare function renderApplication<T>(bootstrap: () => Promise<ApplicationRef>, options: {
    document?: string | Document;
    url?: string;
    platformProviders?: Provider[];
}): Promise<string>;

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-server package.
 */

/**
 * @publicApi
 */
declare const VERSION: Version;

export { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformState, ServerModule, VERSION, platformServer, provideServerRendering, renderApplication, renderModule, ENABLE_DOM_EMULATION as ɵENABLE_DOM_EMULATION, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_CONTEXT as ɵSERVER_CONTEXT, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS, renderInternal as ɵrenderInternal };
export type { PlatformConfig };
