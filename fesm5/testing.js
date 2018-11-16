/**
 * @license Angular v7.1.0-rc.0+6.sha-848f414
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

import { NgModule, createPlatformFactory, ɵdefineNgModule, defineInjector, ɵsetClassMetadata } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Platform for testing
 *
 * @publicApi
 */
var platformServerTesting = createPlatformFactory(ɵplatformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
var ServerTestingModule = /** @class */ (function () {
    function ServerTestingModule() {
    }
    ServerTestingModule.ngModuleDef = ɵdefineNgModule({ type: ServerTestingModule, bootstrap: [], declarations: [], imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] });
    ServerTestingModule.ngInjectorDef = defineInjector({ factory: function ServerTestingModule_Factory(t) { return new (t || ServerTestingModule)(); }, providers: ɵSERVER_RENDER_PROVIDERS, imports: [[NoopAnimationsModule],
            [BrowserDynamicTestingModule]] });
    return ServerTestingModule;
}());
/*@__PURE__*/ ɵsetClassMetadata(ServerTestingModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserDynamicTestingModule],
                imports: [NoopAnimationsModule],
                providers: ɵSERVER_RENDER_PROVIDERS
            }]
    }], null, null);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { platformServerTesting, ServerTestingModule };
//# sourceMappingURL=testing.js.map
