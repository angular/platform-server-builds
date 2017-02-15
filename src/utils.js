/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, destroyPlatform } from '@angular/core/index';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';
import { PlatformState } from './platform_state';
import { INITIAL_CONFIG, platformDynamicServer, platformServer } from './server';
const /** @type {?} */ parse5 = require('parse5');
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    const /** @type {?} */ extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then((moduleRef) => {
        const /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
        return toPromise
            .call(first.call(filter.call(applicationRef.isStable, (isStable) => isStable)))
            .then(() => {
            const /** @type {?} */ output = platform.injector.get(PlatformState).renderToString();
            destroyPlatform();
            return output;
        });
    });
}
/**
 * Renders a Module to string.
 *
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {link renderModuleFactory} instead.
 *
 * \@experimental
 * @param {?} module
 * @param {?} options
 * @return {?}
 */
export function renderModule(module, options) {
    const /** @type {?} */ platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * \@experimental
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */
export function renderModuleFactory(moduleFactory, options) {
    const /** @type {?} */ platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
//# sourceMappingURL=utils.js.map