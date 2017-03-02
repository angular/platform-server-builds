function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { platformCoreDynamicTesting } from '@angular/compiler/testing';
import { createPlatformFactory, NgModule } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
var platformServerTesting = createPlatformFactory(platformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */

var ServerTestingModule = function ServerTestingModule() {
  _classCallCheck(this, ServerTestingModule);
};

ServerTestingModule.decorators = [{ type: NgModule, args: [{ exports: [BrowserDynamicTestingModule], providers: ɵSERVER_RENDER_PROVIDERS }] }];
/** @nocollapse */
ServerTestingModule.ctorParameters = function () {
  return [];
};

export { platformServerTesting, ServerTestingModule };
