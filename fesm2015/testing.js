/**
 * @license Angular v9.1.0-rc.0+109.sha-568e9df
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { createPlatformFactory, NgModule, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, ɵsetClassMetadata } from '@angular/core';
import { ɵplatformCoreDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/testing/src/server.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * \@publicApi
 * @type {?}
 */
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
/** @nocollapse */ ServerTestingModule.ɵmod = ɵɵdefineNgModule({ type: ServerTestingModule });
/** @nocollapse */ ServerTestingModule.ɵinj = ɵɵdefineInjector({ factory: function ServerTestingModule_Factory(t) { return new (t || ServerTestingModule)(); }, providers: ɵSERVER_RENDER_PROVIDERS, imports: [[NoopAnimationsModule],
        BrowserDynamicTestingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(ServerTestingModule, { imports: [NoopAnimationsModule], exports: [BrowserDynamicTestingModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(ServerTestingModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserDynamicTestingModule],
                imports: [NoopAnimationsModule],
                providers: ɵSERVER_RENDER_PROVIDERS
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/testing/src/testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/testing/public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/testing/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ServerTestingModule, platformServerTesting };
//# sourceMappingURL=testing.js.map
