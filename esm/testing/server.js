/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { analyzeAppProvidersForDeprecatedConfiguration } from '@angular/compiler';
import { coreDynamicTestingPlatform } from '@angular/compiler/testing';
import { CompilerOptions, NgModule, createPlatformFactory } from '@angular/core';
import { initTestEnvironment } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Console } from '../core_private';
import { INTERNAL_SERVER_PLATFORM_PROVIDERS } from '../src/server';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const serverTestingPlatform = createPlatformFactory(coreDynamicTestingPlatform, 'serverTesting', INTERNAL_SERVER_PLATFORM_PROVIDERS);
export class ServerTestingModule {
}
/** @nocollapse */
ServerTestingModule.decorators = [
    { type: NgModule, args: [{ exports: [BrowserDynamicTestingModule] },] },
];
/**
 * Providers of the `serverTestingPlatform` to be used for creating own platform based on this.
 *
 * @deprecated Use `serverTestingPlatform()` or create a custom platform factory via
 * `createPlatformFactory(serverTestingPlatform, ...)`
 */
export const TEST_SERVER_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[(appProviders) => {
        const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        const platformRef = createPlatformFactory(serverTestingPlatform, 'serverTestingDeprecated', [{
                provide: CompilerOptions,
                useValue: deprecatedConfiguration.compilerOptions,
                multi: true
            }])();
        class DynamicTestModule {
        }
        /** @nocollapse */
        DynamicTestModule.decorators = [
            { type: NgModule, args: [{
                        exports: [ServerTestingModule],
                        declarations: [deprecatedConfiguration.moduleDeclarations]
                    },] },
        ];
        const testInjector = initTestEnvironment(DynamicTestModule, platformRef);
        const console = testInjector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
    }];
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
export const TEST_SERVER_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=server.js.map