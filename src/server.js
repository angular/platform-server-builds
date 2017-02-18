/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { platformCoreDynamic } from '@angular/compiler';
import { APP_BOOTSTRAP_LISTENER, Injector, NgModule, PLATFORM_INITIALIZER, RendererFactoryV2, RootRenderer, createPlatformFactory, isDevMode, platformCore } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { Parse5DomAdapter, parseDocument } from './parse5_adapter';
import { PlatformState } from './platform_state';
import { ALLOW_MULTIPLE_PLATFORMS, DebugDomRootRenderer } from './private_import_core';
import { SharedStylesHost, getDOM } from './private_import_platform-browser';
import { ServerRendererFactoryV2, ServerRootRenderer } from './server_renderer';
import { ServerStylesHost } from './styles_host';
import { INITIAL_CONFIG } from './tokens';
/**
 * @param {?} feature
 * @return {?}
 */
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
export var /** @type {?} */ INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_INITIALIZER, useFactory: initParse5Adapter, multi: true, deps: [Injector] },
    { provide: PlatformLocation, useClass: ServerPlatformLocation }, PlatformState,
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initParse5Adapter(injector) {
    return function () { Parse5DomAdapter.makeCurrent(); };
}
/**
 * @param {?} rootRenderer
 * @return {?}
 */
export function _createConditionalRootRenderer(rootRenderer) {
    return isDevMode() ? new DebugDomRootRenderer(rootRenderer) : rootRenderer;
}
/**
 * @param {?} stylesHost
 * @return {?}
 */
export function _addStylesToRootComponentFactory(stylesHost) {
    var /** @type {?} */ initializer = function () { return stylesHost.rootComponentIsReady(); };
    return initializer;
}
export var /** @type {?} */ SERVER_RENDER_PROVIDERS = [
    ServerRootRenderer,
    { provide: RootRenderer, useFactory: _createConditionalRootRenderer, deps: [ServerRootRenderer] },
    ServerRendererFactoryV2,
    { provide: RendererFactoryV2, useExisting: ServerRendererFactoryV2 },
    ServerStylesHost,
    { provide: SharedStylesHost, useExisting: ServerStylesHost },
    {
        provide: APP_BOOTSTRAP_LISTENER,
        useFactory: _addStylesToRootComponentFactory,
        deps: [ServerStylesHost],
        multi: true
    },
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
var ServerModule = (function () {
    function ServerModule() {
    }
    return ServerModule;
}());
export { ServerModule };
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpModule],
                providers: [SERVER_RENDER_PROVIDERS, SERVER_HTTP_PROVIDERS],
            },] },
];
/** @nocollapse */
ServerModule.ctorParameters = function () { return []; };
function ServerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerModule.ctorParameters;
}
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    var /** @type {?} */ config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document);
    }
    else {
        return getDOM().createHtmlDocument();
    }
}
/**
 * @experimental
 */
export var /** @type {?} */ platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export var /** @type {?} */ platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=server.js.map