/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/platform-browser-dynamic/testing');
var core_private_1 = require('../core_private');
var parse5_adapter_1 = require('./parse5_adapter');
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
var ServerPlatformLocation = (function (_super) {
    __extends(ServerPlatformLocation, _super);
    function ServerPlatformLocation() {
        _super.apply(this, arguments);
    }
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { throw notSupported('getBaseHrefFromDOM'); };
    ;
    ServerPlatformLocation.prototype.onPopState = function (fn) { notSupported('onPopState'); };
    ;
    ServerPlatformLocation.prototype.onHashChange = function (fn) { notSupported('onHashChange'); };
    ;
    Object.defineProperty(ServerPlatformLocation.prototype, "pathname", {
        get: function () { throw notSupported('pathname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "search", {
        get: function () { throw notSupported('search'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "hash", {
        get: function () { throw notSupported('hash'); },
        enumerable: true,
        configurable: true
    });
    ServerPlatformLocation.prototype.replaceState = function (state, title, url) { notSupported('replaceState'); };
    ;
    ServerPlatformLocation.prototype.pushState = function (state, title, url) { notSupported('pushState'); };
    ;
    ServerPlatformLocation.prototype.forward = function () { notSupported('forward'); };
    ;
    ServerPlatformLocation.prototype.back = function () { notSupported('back'); };
    ;
    return ServerPlatformLocation;
}(common_1.PlatformLocation));
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @experimental
 */
exports.SERVER_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_COMMON_PROVIDERS,
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: ServerPlatformLocation },
];
var SERVER_DYNAMIC_PROVIDERS = [
    exports.SERVER_PLATFORM_PROVIDERS,
    { provide: core_1.CompilerFactory, useValue: testing_1.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
function initParse5Adapter() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    core_private_1.wtfInit();
}
/**
 * @experimental
 */
exports.serverPlatform = core_1.createPlatformFactory('server', exports.SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
exports.serverDynamicPlatform = core_1.createPlatformFactory('serverDynamic', SERVER_DYNAMIC_PROVIDERS);
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
function serverBootstrap(appComponentType, providers) {
    console.warn('serverBootstrap is deprecated. Create an @AppModule and use `bootstrapModule` with the `serverDynamicPlatform()` instead.');
    core_private_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(providers, exports.serverPlatform().injector);
    return core_1.coreLoadAndBootstrap(appComponentType, appInjector);
}
exports.serverBootstrap = serverBootstrap;
//# sourceMappingURL=server.js.map