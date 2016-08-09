/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_1 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
var server_1 = require('../src/server');
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.platformServerTesting = core_1.createPlatformFactory(testing_1.platformCoreDynamicTesting, 'serverTesting', server_1.INTERNAL_SERVER_PLATFORM_PROVIDERS);
var ServerTestingModule = (function () {
    function ServerTestingModule() {
    }
    /** @nocollapse */
    ServerTestingModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: [testing_2.BrowserDynamicTestingModule] },] },
    ];
    return ServerTestingModule;
}());
exports.ServerTestingModule = ServerTestingModule;
//# sourceMappingURL=server.js.map