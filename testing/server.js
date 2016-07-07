/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/platform-browser-dynamic/testing');
var parse5_adapter_1 = require('../src/parse5_adapter');
var SERVER_TEST_PLATFORM_MARKER = new core_1.OpaqueToken('ServerTestPlatformMarker');
function initServerTests() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
}
/**
 * Creates a compiler for testing
 *
 * @stable
 */
exports.serverTestCompiler = testing_1.browserTestCompiler;
var TEST_SERVER_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initServerTests, multi: true },
    { provide: SERVER_TEST_PLATFORM_MARKER, useValue: true }
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
function serverTestPlatform() {
    if (!core_1.getPlatform()) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(TEST_SERVER_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(SERVER_TEST_PLATFORM_MARKER);
}
exports.serverTestPlatform = serverTestPlatform;
var ServerTestModule = (function () {
    function ServerTestModule() {
    }
    /** @nocollapse */
    ServerTestModule.decorators = [
        { type: core_1.AppModule, args: [{ modules: [testing_1.BrowserDynamicTestModule] },] },
    ];
    return ServerTestModule;
}());
exports.ServerTestModule = ServerTestModule;
//# sourceMappingURL=server.js.map