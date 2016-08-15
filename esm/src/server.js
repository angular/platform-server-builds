/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { platformCoreDynamic } from '@angular/compiler';
import { NgModule, PLATFORM_INITIALIZER, createPlatformFactory, platformCore } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { wtfInit } from '../core_private';
import { Parse5DomAdapter } from './parse5_adapter';
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
class ServerPlatformLocation extends PlatformLocation {
    getBaseHrefFromDOM() { throw notSupported('getBaseHrefFromDOM'); }
    ;
    onPopState(fn) { notSupported('onPopState'); }
    ;
    onHashChange(fn) { notSupported('onHashChange'); }
    ;
    get pathname() { throw notSupported('pathname'); }
    get search() { throw notSupported('search'); }
    get hash() { throw notSupported('hash'); }
    replaceState(state, title, url) { notSupported('replaceState'); }
    ;
    pushState(state, title, url) { notSupported('pushState'); }
    ;
    forward() { notSupported('forward'); }
    ;
    back() { notSupported('back'); }
    ;
}
export const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: PlatformLocation, useClass: ServerPlatformLocation },
];
function initParse5Adapter() {
    Parse5DomAdapter.makeCurrent();
    wtfInit();
}
export class ServerModule {
}
/** @nocollapse */
ServerModule.decorators = [
    { type: NgModule, args: [{ imports: [BrowserModule] },] },
];
/**
 * @experimental
 */
export const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=server.js.map