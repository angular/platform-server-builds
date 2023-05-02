/**
 * @license Angular v16.1.0-next.0+sha-47c093a
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */


import { ApplicationRef } from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
import * as i2 from '@angular/platform-browser/animations';
import * as i3 from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { Provider } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { Type } from '@angular/core';
import { Version } from '@angular/core';

/**
 * A function that will be executed when calling `renderApplication` or
 * `renderModule` just before current platform state is rendered to string.
 *
 * @publicApi
 */
export declare const BEFORE_APP_SERIALIZED: InjectionToken<(() => void | Promise<void>)[]>;

/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
export declare const INITIAL_CONFIG: InjectionToken<PlatformConfig>;

/**
 * Config object passed to initialize the platform.
 *
 * @publicApi
 */
export declare interface PlatformConfig {
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
    /**
     * Note: this option has no effect and can be removed from the config.
     *
     * Whether to append the absolute URL to any relative HTTP requests. If set to
     * true, this logic executes prior to any HTTP interceptors that may run later
     * on in the request. `baseUrl` must be supplied if this flag is enabled.
     *
     * @deprecated This option is a noop.
     * @default false
     */
    useAbsoluteUrl?: boolean;
    /**
     * Note: this option has no effect and can be removed from the config.
     *
     * The base URL for resolving absolute URL for HTTP requests. It must be set
     * if `useAbsoluteUrl` is true, and must consist of protocol, hostname,
     * and optional port. This option has no effect if `useAbsoluteUrl` is not
     * enabled.
     *
     * @deprecated This option is a noop.
     */
    baseUrl?: string;
}

/**
 * The server platform that supports the runtime compiler.
 *
 * @see `platformServer`
 * @deprecated add an `import @angular/compiler` and replace the usage with `platformServer`
 *     instead.
 * @publicApi
 */
export declare const platformDynamicServer: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * @publicApi
 */
export declare const platformServer: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
export declare class PlatformState {
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
export declare function provideServerRendering(): EnvironmentProviders;

/**
 * Bootstraps an instance of an Angular application and renders it to a string.

 * ```typescript
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
 * @developerPreview
 */
export declare function renderApplication<T>(bootstrap: () => Promise<ApplicationRef>, options: {
    document?: string | Document;
    url?: string;
    platformProviders?: Provider[];
}): Promise<string>;

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
export declare function renderModule<T>(moduleType: Type<T>, options: {
    document?: string | Document;
    url?: string;
    extraProviders?: StaticProvider[];
}): Promise<string>;

/**
 * The ng module for the server.
 *
 * @publicApi
 */
export declare class ServerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerModule, never, [typeof i1.HttpClientModule, typeof i2.NoopAnimationsModule], [typeof i3.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerModule>;
}

/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * Note: this module is not needed if the `renderApplication` function is used.
 * The `renderApplication` makes all providers from this module available in the application.
 *
 * @publicApi
 * @deprecated no longer needed, you can inject the `TransferState` in an app without providing
 *     this module.
 */
export declare class ServerTransferStateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerTransferStateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerTransferStateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerTransferStateModule>;
}

/**
 * @publicApi
 */
export declare const VERSION: Version;

export declare const ɵINTERNAL_SERVER_PLATFORM_PROVIDERS: StaticProvider[];

/**
 * An internal token that allows providing extra information about the server context
 * (e.g. whether SSR or SSG was used). The value is a string and characters other
 * than [a-zA-Z0-9\-] are removed. See the default value in `DEFAULT_SERVER_CONTEXT` const.
 */
export declare const ɵSERVER_CONTEXT: InjectionToken<string>;

export declare const ɵSERVER_RENDER_PROVIDERS: Provider[];

export declare function ɵsetDomTypes(): void;

export { }
