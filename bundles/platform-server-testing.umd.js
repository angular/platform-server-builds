/**
 * @license Angular v4.0.0-rc.3-8850098
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/compiler/testing'), require('@angular/core'), require('@angular/platform-browser-dynamic/testing'), require('@angular/platform-server')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/compiler/testing', '@angular/core', '@angular/platform-browser-dynamic/testing', '@angular/platform-server'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformServer = global.ng.platformServer || {}, global.ng.platformServer.testing = global.ng.platformServer.testing || {}),global.ng.compiler.testing,global.ng.core,global.ng.platformBrowserDynamic.testing,global.ng.platformServer));
}(this, function (exports,_angular_compiler_testing,_angular_core,_angular_platformBrowserDynamic_testing,_angular_platformServer) { 'use strict';

    /**
     * Platform for testing
     *
     * @experimental API related to bootstrapping are still under review.
     */
    var platformServerTesting = _angular_core.createPlatformFactory(_angular_compiler_testing.platformCoreDynamicTesting, 'serverTesting', _angular_platformServer.ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
    /**
     * NgModule for testing.
     *
     * @experimental API related to bootstrapping are still under review.
     */
    var ServerTestingModule = (function () {
        function ServerTestingModule() {
        }
        return ServerTestingModule;
    }());
    ServerTestingModule.decorators = [
        { type: _angular_core.NgModule, args: [{ exports: [_angular_platformBrowserDynamic_testing.BrowserDynamicTestingModule], providers: _angular_platformServer.ɵSERVER_RENDER_PROVIDERS },] },
    ];
    /** @nocollapse */
    ServerTestingModule.ctorParameters = function () { return []; };

    exports.platformServerTesting = platformServerTesting;
    exports.ServerTestingModule = ServerTestingModule;

}));