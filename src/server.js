/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common/index';
import { platformCoreDynamic } from '@angular/compiler/index';
import { NgModule, PLATFORM_INITIALIZER, RootRenderer, createPlatformFactory, isDevMode, platformCore } from '@angular/core/index';
import { BrowserModule } from '@angular/platform-browser/index';
import { Parse5DomAdapter } from './parse5_adapter';
import { DebugDomRootRenderer } from './private_import_core';
import { SharedStylesHost } from './private_import_platform-browser';
import { ServerRootRenderer } from './server_renderer';
/**
 * @param {?} feature
 * @return {?}
 */
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
class ServerPlatformLocation extends PlatformLocation {
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { throw notSupported('getBaseHrefFromDOM'); }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) { notSupported('onPopState'); }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { notSupported('onHashChange'); }
    ;
    /**
     * @return {?}
     */
    get pathname() { throw notSupported('pathname'); }
    /**
     * @return {?}
     */
    get search() { throw notSupported('search'); }
    /**
     * @return {?}
     */
    get hash() { throw notSupported('hash'); }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) { notSupported('replaceState'); }
    ;
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) { notSupported('pushState'); }
    ;
    /**
     * @return {?}
     */
    forward() { notSupported('forward'); }
    ;
    /**
     * @return {?}
     */
    back() { notSupported('back'); }
    ;
}
export const /** @type {?} */ INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: PlatformLocation, useClass: ServerPlatformLocation },
];
/**
 * @return {?}
 */
function initParse5Adapter() {
    Parse5DomAdapter.makeCurrent();
}
/**
 * @param {?} rootRenderer
 * @return {?}
 */
export function _createConditionalRootRenderer(rootRenderer) {
    if (isDevMode()) {
        return new DebugDomRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
export const /** @type {?} */ SERVER_RENDER_PROVIDERS = [
    ServerRootRenderer,
    { provide: RootRenderer, useFactory: _createConditionalRootRenderer, deps: [ServerRootRenderer] },
    // use plain SharedStylesHost, not the DomSharedStylesHost
    SharedStylesHost
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
export class ServerModule {
}
ServerModule.decorators = [
    { type: NgModule, args: [{ exports: [BrowserModule], providers: SERVER_RENDER_PROVIDERS },] },
];
/** @nocollapse */
ServerModule.ctorParameters = () => [];
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
 * @experimental
 */
export const /** @type {?} */ platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const /** @type {?} */ platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=server.js.map