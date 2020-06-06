/**
 * @license Angular v10.0.0-rc.0+84.sha-aaa2009
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser-dynamic/testing'), require('@angular/platform-browser/animations'), require('@angular/platform-server')) :
    typeof define === 'function' && define.amd ? define('@angular/platform-server/testing', ['exports', '@angular/core', '@angular/platform-browser-dynamic/testing', '@angular/platform-browser/animations', '@angular/platform-server'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.platformServer = global.ng.platformServer || {}, global.ng.platformServer.testing = {}), global.ng.core, global.ng.platformBrowserDynamic.testing, global.ng.platformBrowser.animations, global.ng.platformServer));
}(this, (function (exports, i0, testing, animations, platformServer) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Platform for testing
     *
     * @publicApi
     */
    var platformServerTesting = i0.createPlatformFactory(testing.ɵplatformCoreDynamicTesting, 'serverTesting', platformServer.ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
    /**
     * NgModule for testing.
     *
     * @publicApi
     */
    var ServerTestingModule = /** @class */ (function () {
        function ServerTestingModule() {
        }
        ServerTestingModule.ɵmod = i0.ɵɵdefineNgModule({ type: ServerTestingModule });
        ServerTestingModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ServerTestingModule_Factory(t) { return new (t || ServerTestingModule)(); }, providers: platformServer.ɵSERVER_RENDER_PROVIDERS, imports: [[animations.NoopAnimationsModule], testing.BrowserDynamicTestingModule] });
        return ServerTestingModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ServerTestingModule, { imports: [animations.NoopAnimationsModule], exports: [testing.BrowserDynamicTestingModule] }); })();
    /*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ServerTestingModule, [{
            type: i0.NgModule,
            args: [{
                    exports: [testing.BrowserDynamicTestingModule],
                    imports: [animations.NoopAnimationsModule],
                    providers: platformServer.ɵSERVER_RENDER_PROVIDERS
                }]
        }], null, null); })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file only reexports content of the `src` folder. Keep it that way.

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    exports.ServerTestingModule = ServerTestingModule;
    exports.platformServerTesting = platformServerTesting;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-server-testing.umd.js.map
