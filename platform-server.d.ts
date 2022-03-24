/**
 * @license Angular v14.0.0-next.7+31.sha-71ee417
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */

import { EventManager } from '@angular/platform-browser';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
import * as i2 from '@angular/platform-browser/animations';
import * as i3 from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';
import { NgModuleFactory } from '@angular/core';
import { NgZone } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { Provider } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { RendererFactory2 } from '@angular/core';
import { RendererType2 } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { Type } from '@angular/core';
import { Version } from '@angular/core';
import { ɵSharedStylesHost } from '@angular/platform-browser';

/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
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
     * Whether to append the absolute URL to any relative HTTP requests. If set to
     * true, this logic executes prior to any HTTP interceptors that may run later
     * on in the request. `baseUrl` must be supplied if this flag is enabled.
     * @default false
     */
    useAbsoluteUrl?: boolean;
    /**
     * The base URL for resolving absolute URL for HTTP requests. It must be set
     * if `useAbsoluteUrl` is true, and must consist of protocol, hostname,
     * and optional port. This option has no effect if `useAbsoluteUrl` is not
     * enabled.
     */
    baseUrl?: string;
}

/**
 * The server platform that supports the runtime compiler.
 *
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
 * Renders a Module to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * @publicApi
 */
export declare function renderModule<T>(module: Type<T>, options: {
    document?: string;
    url?: string;
    extraProviders?: StaticProvider[];
}): Promise<string>;

/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * @publicApi
 *
 * @deprecated
 * This symbol is no longer necessary as of Angular v13.
 * Use {@link renderModule} API instead.
 */
export declare function renderModuleFactory<T>(moduleFactory: NgModuleFactory<T>, options: {
    document?: string;
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
 * @publicApi
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

export declare const ɵSERVER_RENDER_PROVIDERS: Provider[];

export declare class ɵServerRendererFactory2 implements RendererFactory2 {
    private eventManager;
    private ngZone;
    private document;
    private sharedStylesHost;
    private rendererByCompId;
    private defaultRenderer;
    private schema;
    constructor(eventManager: EventManager, ngZone: NgZone, document: any, sharedStylesHost: ɵSharedStylesHost);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ɵServerRendererFactory2, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ɵServerRendererFactory2>;
}

export { }
