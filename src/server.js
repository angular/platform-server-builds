"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_private_1 = require('../core_private');
var parse5_adapter_1 = require('./parse5_adapter');
var SERVER_PLATFORM_MARKER = new core_1.OpaqueToken('ServerPlatformMarker');
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to {@link platform}.
 */
exports.SERVER_PLATFORM_PROVIDERS = [
    { provide: SERVER_PLATFORM_MARKER, useValue: true }, core_1.PLATFORM_COMMON_PROVIDERS,
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation }
];
exports.SERVER_APPLICATION_PROVIDERS = [platform_browser_1.BROWSER_APP_PROVIDERS, platform_browser_dynamic_1.BROWSER_APP_COMPILER_PROVIDERS];
function initParse5Adapter() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    core_private_1.wtfInit();
}
function serverPlatform() {
    if (!core_1.getPlatform()) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(exports.SERVER_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(SERVER_PLATFORM_MARKER);
}
exports.serverPlatform = serverPlatform;
function serverBootstrap(appComponentType, customProviders) {
    core_private_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
    var providers = [exports.SERVER_APPLICATION_PROVIDERS, customProviders || []];
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(providers, serverPlatform().injector);
    return core_1.coreLoadAndBootstrap(appComponentType, appInjector);
}
exports.serverBootstrap = serverBootstrap;
//# sourceMappingURL=server.js.map