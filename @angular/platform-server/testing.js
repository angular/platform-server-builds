/**
 * @license Angular v4.0.0-rc.3-6559425
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { platformCoreDynamicTesting } from '@angular/compiler/testing';
import { createPlatformFactory, NgModule } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
const platformServerTesting = createPlatformFactory(platformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
class ServerTestingModule {
}
ServerTestingModule.decorators = [
    { type: NgModule, args: [{ exports: [BrowserDynamicTestingModule], providers: ɵSERVER_RENDER_PROVIDERS },] },
];
/** @nocollapse */
ServerTestingModule.ctorParameters = () => [];

export { platformServerTesting, ServerTestingModule };