/**
 * @license Angular v18.2.13+sha-08f01ac
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */


import { ApplicationRef } from '@angular/core';
import { BootstrapContext } from '@angular/platform-browser';
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
export declare const BEFORE_APP_SERIALIZED: InjectionToken<readonly (() => void | Promise<void>)[]>;

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
}

/**
 * Creates a server-side instance of an Angular platform.
 *
 * This platform should be used when performing server-side rendering of an Angular application.
 * Standalone applications can be bootstrapped on the server using the `bootstrapApplication`
 * function from `@angular/platform-browser`. When using `bootstrapApplication`, the `platformServer`
 * should be created first and passed to the bootstrap function using the `BootstrapContext`.
 *
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
 *
 * @usageNotes
 *
 * ```ts
 * import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
 * import { renderApplication } from '@angular/platform-server';
 * import { ApplicationConfig } from '@angular/core';
 * import { AppComponent } from './app.component';
 *
 * const appConfig: ApplicationConfig = { providers: [...] };
 * const bootstrap = (context: BootstrapContext) =>
 *   bootstrapApplication(AppComponent, config, context);
 * const output = await renderApplication(bootstrap);
 * ```
 *
 * @param bootstrap A method that when invoked returns a promise that returns an `ApplicationRef`
 *     instance once resolved. The method is invoked with an `Injector` instance that
 *     provides access to the platform-level dependency injection context.
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
export declare function renderApplication(bootstrap: (context: BootstrapContext) => Promise<ApplicationRef>, options: {
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
 * @publicApi
 */
export declare const VERSION: Version;

export declare function ɵdisableSsrProfiling(): void;

/**
 * This enables an internal performance profiler for SSR apps
 *
 * It should not be imported in application code
 */
export declare function ɵenableSsrProfiling(): void;

export declare const ɵINTERNAL_SERVER_PLATFORM_PROVIDERS: StaticProvider[];

/**
 * An internal token that allows providing extra information about the server context
 * (e.g. whether SSR or SSG was used). The value is a string and characters other
 * than [a-zA-Z0-9\-] are removed. See the default value in `DEFAULT_SERVER_CONTEXT` const.
 */
export declare const ɵSERVER_CONTEXT: InjectionToken<string>;

export declare const ɵSERVER_RENDER_PROVIDERS: Provider[];

export { }
