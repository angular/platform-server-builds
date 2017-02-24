/**
 * @license Angular v4.0.0-beta.8-3c9a46c
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@angular/platform-server/testing', ['exports', '@angular/compiler/testing', '@angular/core', '@angular/platform-browser-dynamic/testing', '@angular/platform-server'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@angular/compiler/testing'), require('@angular/core'), require('@angular/platform-browser-dynamic/testing'), require('@angular/platform-server'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ng.compiler.testing, global.ng.core, global.ng.platformBrowserDynamic.testing, global.ng.platformServer);
    global.ng = global.ng || {};
    global.ng.platformServer = global.ng.platformServer || {};
    global.ng.platformServer.testing = mod.exports;
  }
})(this, function (exports, _testing, _core, _testing2, _platformServer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ServerTestingModule = exports.platformServerTesting = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * Platform for testing
   *
   * @experimental API related to bootstrapping are still under review.
   */
  var platformServerTesting = (0, _core.createPlatformFactory)(_testing.platformCoreDynamicTesting, 'serverTesting', _platformServer.ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
  /**
   * NgModule for testing.
   *
   * @experimental API related to bootstrapping are still under review.
   */

  var ServerTestingModule = function ServerTestingModule() {
    _classCallCheck(this, ServerTestingModule);
  };

  ServerTestingModule.decorators = [{ type: _core.NgModule, args: [{ exports: [_testing2.BrowserDynamicTestingModule], providers: _platformServer.ɵSERVER_RENDER_PROVIDERS }] }];
  /** @nocollapse */
  ServerTestingModule.ctorParameters = function () {
    return [];
  };

  exports.platformServerTesting = platformServerTesting;
  exports.ServerTestingModule = ServerTestingModule;
});
