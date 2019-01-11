/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { ɵTRANSITION_ID } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { PlatformState } from './platform_state';
import { platformDynamicServer, platformServer } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
/**
 * @record
 */
function PlatformOptions() { }
if (false) {
    /** @type {?|undefined} */
    PlatformOptions.prototype.document;
    /** @type {?|undefined} */
    PlatformOptions.prototype.url;
    /** @type {?|undefined} */
    PlatformOptions.prototype.extraProviders;
}
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    /** @type {?} */
    const extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * @template T
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then((moduleRef) => {
        /** @type {?} */
        const transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
        }
        /** @type {?} */
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        return applicationRef.isStable.pipe((first((isStable) => isStable)))
            .toPromise()
            .then(() => {
            /** @type {?} */
            const platformState = platform.injector.get(PlatformState);
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            /** @type {?} */
            const callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
            if (callbacks) {
                for (const callback of callbacks) {
                    try {
                        callback();
                    }
                    catch (e) {
                        // Ignore exceptions.
                        console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                    }
                }
            }
            /** @type {?} */
            const output = platformState.renderToString();
            platform.destroy();
            return output;
        });
    });
}
/**
 * Renders a Module to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {\@link renderModuleFactory} instead.
 *
 * \@publicApi
 * @template T
 * @param {?} module
 * @param {?} options
 * @return {?}
 */
export function renderModule(module, options) {
    /** @type {?} */
    const platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * \@publicApi
 * @template T
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */
export function renderModuleFactory(moduleFactory, options) {
    /** @type {?} */
    const platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7O0FBRS9ELDhCQUlDOzs7SUFIQyxtQ0FBa0I7O0lBQ2xCLDhCQUFhOztJQUNiLHlDQUFrQzs7Ozs7OztBQUdwQyxTQUFTLFlBQVksQ0FDakIsZUFBa0UsRUFDbEUsT0FBd0I7O1VBQ3BCLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzNFLE9BQU8sZUFBZSxDQUFDO1FBQ3JCLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFDO1FBQ25GLGNBQWM7S0FDZixDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7O0FBRUQsU0FBUyxPQUFPLENBQ1osUUFBcUIsRUFBRSxnQkFBeUM7SUFDbEUsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs7Y0FDbkMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUNYO3dFQUM4RCxDQUFDLENBQUM7U0FDckU7O2NBQ0ssY0FBYyxHQUFtQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDN0UsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQWlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDeEUsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRTs7a0JBQ0gsYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzs7O2tCQUdwRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDO1lBQ3JFLElBQUksU0FBUyxFQUFFO2dCQUNiLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFO29CQUNoQyxJQUFJO3dCQUNGLFFBQVEsRUFBRSxDQUFDO3FCQUNaO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0Q7aUJBQ0Y7YUFDRjs7a0JBRUssTUFBTSxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUU7WUFDN0MsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxZQUFZLENBQ3hCLE1BQWUsRUFBRSxPQUE2RTs7VUFFMUYsUUFBUSxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUM7SUFDN0QsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQVdELE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsYUFBaUMsRUFDakMsT0FBNkU7O1VBRXpFLFFBQVEsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztJQUN0RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVUUkFOU0lUSU9OX0lEfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7cGxhdGZvcm1EeW5hbWljU2VydmVyLCBwbGF0Zm9ybVNlcnZlcn0gZnJvbSAnLi9zZXJ2ZXInO1xuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUQsIElOSVRJQUxfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbmludGVyZmFjZSBQbGF0Zm9ybU9wdGlvbnMge1xuICBkb2N1bWVudD86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW107XG59XG5cbmZ1bmN0aW9uIF9nZXRQbGF0Zm9ybShcbiAgICBwbGF0Zm9ybUZhY3Rvcnk6IChleHRyYVByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYsXG4gICAgb3B0aW9uczogUGxhdGZvcm1PcHRpb25zKTogUGxhdGZvcm1SZWYge1xuICBjb25zdCBleHRyYVByb3ZpZGVycyA9IG9wdGlvbnMuZXh0cmFQcm92aWRlcnMgPyBvcHRpb25zLmV4dHJhUHJvdmlkZXJzIDogW107XG4gIHJldHVybiBwbGF0Zm9ybUZhY3RvcnkoW1xuICAgIHtwcm92aWRlOiBJTklUSUFMX0NPTkZJRywgdXNlVmFsdWU6IHtkb2N1bWVudDogb3B0aW9ucy5kb2N1bWVudCwgdXJsOiBvcHRpb25zLnVybH19LFxuICAgIGV4dHJhUHJvdmlkZXJzXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBfcmVuZGVyPFQ+KFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgbW9kdWxlUmVmUHJvbWlzZTogUHJvbWlzZTxOZ01vZHVsZVJlZjxUPj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbW9kdWxlUmVmUHJvbWlzZS50aGVuKChtb2R1bGVSZWYpID0+IHtcbiAgICBjb25zdCB0cmFuc2l0aW9uSWQgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KMm1VFJBTlNJVElPTl9JRCwgbnVsbCk7XG4gICAgaWYgKCF0cmFuc2l0aW9uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgcmVuZGVyTW9kdWxlW0ZhY3RvcnldKCkgcmVxdWlyZXMgdGhlIHVzZSBvZiBCcm93c2VyTW9kdWxlLndpdGhTZXJ2ZXJUcmFuc2l0aW9uKCkgdG8gZW5zdXJlXG50aGUgc2VydmVyLXJlbmRlcmVkIGFwcCBjYW4gYmUgcHJvcGVybHkgYm9vdHN0cmFwcGVkIGludG8gYSBjbGllbnQgYXBwLmApO1xuICAgIH1cbiAgICBjb25zdCBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgICByZXR1cm4gYXBwbGljYXRpb25SZWYuaXNTdGFibGUucGlwZSgoZmlyc3QoKGlzU3RhYmxlOiBib29sZWFuKSA9PiBpc1N0YWJsZSkpKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBsYXRmb3JtU3RhdGUgPSBwbGF0Zm9ybS5pbmplY3Rvci5nZXQoUGxhdGZvcm1TdGF0ZSk7XG5cbiAgICAgICAgICAvLyBSdW4gYW55IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBjYWxsYmFja3MganVzdCBiZWZvcmUgcmVuZGVyaW5nIHRvIHN0cmluZy5cbiAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEJFRk9SRV9BUFBfU0VSSUFMSVpFRCwgbnVsbCk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGV4Y2VwdGlvbnMuXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG91dHB1dCA9IHBsYXRmb3JtU3RhdGUucmVuZGVyVG9TdHJpbmcoKTtcbiAgICAgICAgICBwbGF0Zm9ybS5kZXN0cm95KCk7XG4gICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgYSBNb2R1bGUgdG8gc3RyaW5nLlxuICpcbiAqIGBkb2N1bWVudGAgaXMgdGhlIGZ1bGwgZG9jdW1lbnQgSFRNTCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGFzIGEgc3RyaW5nLlxuICogYHVybGAgaXMgdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiBgZXh0cmFQcm92aWRlcnNgIGFyZSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBEbyBub3QgdXNlIHRoaXMgaW4gYSBwcm9kdWN0aW9uIHNlcnZlciBlbnZpcm9ubWVudC4gVXNlIHByZS1jb21waWxlZCB7QGxpbmsgTmdNb2R1bGVGYWN0b3J5fSB3aXRoXG4gKiB7QGxpbmsgcmVuZGVyTW9kdWxlRmFjdG9yeX0gaW5zdGVhZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNb2R1bGU8VD4oXG4gICAgbW9kdWxlOiBUeXBlPFQ+LCBvcHRpb25zOiB7ZG9jdW1lbnQ/OiBzdHJpbmcsIHVybD86IHN0cmluZywgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfSk6XG4gICAgUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCBvcHRpb25zKTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZShtb2R1bGUpKTtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIGEge0BsaW5rIE5nTW9kdWxlRmFjdG9yeX0gdG8gc3RyaW5nLlxuICpcbiAqIGBkb2N1bWVudGAgaXMgdGhlIGZ1bGwgZG9jdW1lbnQgSFRNTCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGFzIGEgc3RyaW5nLlxuICogYHVybGAgaXMgdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiBgZXh0cmFQcm92aWRlcnNgIGFyZSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNb2R1bGVGYWN0b3J5PFQ+KFxuICAgIG1vZHVsZUZhY3Rvcnk6IE5nTW9kdWxlRmFjdG9yeTxUPixcbiAgICBvcHRpb25zOiB7ZG9jdW1lbnQ/OiBzdHJpbmcsIHVybD86IHN0cmluZywgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfSk6XG4gICAgUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1TZXJ2ZXIsIG9wdGlvbnMpO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlRmFjdG9yeShtb2R1bGVGYWN0b3J5KSk7XG59XG4iXX0=