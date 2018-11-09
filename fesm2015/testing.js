/**
 * @license Angular v7.1.0-beta.2+14.sha-ac1988d
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

import { NgModule, createPlatformFactory, ɵdefineNgModule, defineInjector, ɵsetClassMetadata } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** *
 * Platform for testing
 *
 * \@publicApi
  @type {?} */
const platformServerTesting = createPlatformFactory(ɵplatformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * \@publicApi
 */
class ServerTestingModule {
}
ServerTestingModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserDynamicTestingModule],
                imports: [NoopAnimationsModule],
                providers: ɵSERVER_RENDER_PROVIDERS
            },] },
];
ServerTestingModule.ngModuleDef = ɵdefineNgModule({ type: ServerTestingModule, bootstrap: [], declarations: [], imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] });
ServerTestingModule.ngInjectorDef = defineInjector({ factory: function ServerTestingModule_Factory(t) { return new (t || ServerTestingModule)(); }, providers: ɵSERVER_RENDER_PROVIDERS, imports: [[NoopAnimationsModule],
        [BrowserDynamicTestingModule]] });
/*@__PURE__*/ ɵsetClassMetadata(ServerTestingModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserDynamicTestingModule],
                imports: [NoopAnimationsModule],
                providers: ɵSERVER_RENDER_PROVIDERS
            }]
    }], null, null);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { platformServerTesting, ServerTestingModule };
//# sourceMappingURL=testing.js.map
