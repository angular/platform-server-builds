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
function initServerTests() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
}
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
exports.TEST_SERVER_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initServerTests, multi: true },
    { provide: core_1.CompilerFactory, useValue: testing_1.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.serverTestPlatform = core_1.createPlatformFactory('serverTest', exports.TEST_SERVER_PLATFORM_PROVIDERS);
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
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
exports.TEST_SERVER_APPLICATION_PROVIDERS = testing_1.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS;
//# sourceMappingURL=server.js.map