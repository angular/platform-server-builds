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
import { ApplicationRef, ɵisPromise } from '@angular/core';
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
            /** @type {?} */
            const asyncPromises = [];
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            /** @type {?} */
            const callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
            if (callbacks) {
                for (const callback of callbacks) {
                    try {
                        /** @type {?} */
                        const callbackResult = callback();
                        if (ɵisPromise(callbackResult)) {
                            asyncPromises.push(callbackResult);
                        }
                    }
                    catch (e) {
                        // Ignore exceptions.
                        console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                    }
                }
            }
            /** @type {?} */
            const complete = () => {
                /** @type {?} */
                const output = platformState.renderToString();
                platform.destroy();
                return output;
            };
            if (asyncPromises.length === 0) {
                return complete();
            }
            return Promise
                .all(asyncPromises.map(asyncPromise => {
                return asyncPromise.catch(e => { console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e); });
            }))
                .then(complete);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBbUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7OztBQUUvRCw4QkFJQzs7O0lBSEMsbUNBQWtCOztJQUNsQiw4QkFBYTs7SUFDYix5Q0FBa0M7Ozs7Ozs7QUFHcEMsU0FBUyxZQUFZLENBQ2pCLGVBQWtFLEVBQ2xFLE9BQXdCOztVQUNwQixjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUMzRSxPQUFPLGVBQWUsQ0FBQztRQUNyQixFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBQztRQUNuRixjQUFjO0tBQ2YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7OztBQUVELFNBQVMsT0FBTyxDQUNaLFFBQXFCLEVBQUUsZ0JBQXlDO0lBQ2xFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7O2NBQ25DLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWDt3RUFDOEQsQ0FBQyxDQUFDO1NBQ3JFOztjQUNLLGNBQWMsR0FBbUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQzdFLE9BQU8sY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3hFLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxHQUFHLEVBQUU7O2tCQUNILGFBQWEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7O2tCQUVwRCxhQUFhLEdBQW1CLEVBQUU7OztrQkFHbEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQztZQUNyRSxJQUFJLFNBQVMsRUFBRTtnQkFDYixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtvQkFDaEMsSUFBSTs7OEJBQ0ksY0FBYyxHQUFHLFFBQVEsRUFBRTt3QkFDakMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7NEJBQzlCLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7eUJBQ3BDO3FCQUVGO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0Q7aUJBQ0Y7YUFDRjs7a0JBRUssUUFBUSxHQUFHLEdBQUcsRUFBRTs7c0JBQ2QsTUFBTSxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQztZQUVELElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sUUFBUSxFQUFFLENBQUM7YUFDbkI7WUFFRCxPQUFPLE9BQU87aUJBQ1QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FDckIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0UsQ0FBQyxDQUFDLENBQUM7aUJBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxZQUFZLENBQ3hCLE1BQWUsRUFBRSxPQUE2RTs7VUFFMUYsUUFBUSxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUM7SUFDN0QsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQVdELE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsYUFBaUMsRUFDakMsT0FBNkU7O1VBRXpFLFFBQVEsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztJQUN0RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCDJtWlzUHJvbWlzZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge2ZpcnN0fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge3BsYXRmb3JtRHluYW1pY1NlcnZlciwgcGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJy4vc2VydmVyJztcbmltcG9ydCB7QkVGT1JFX0FQUF9TRVJJQUxJWkVELCBJTklUSUFMX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG5pbnRlcmZhY2UgUGxhdGZvcm1PcHRpb25zIHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGxhdGZvcm0oXG4gICAgcGxhdGZvcm1GYWN0b3J5OiAoZXh0cmFQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmLFxuICAgIG9wdGlvbnM6IFBsYXRmb3JtT3B0aW9ucyk6IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZXh0cmFQcm92aWRlcnMgPSBvcHRpb25zLmV4dHJhUHJvdmlkZXJzID8gb3B0aW9ucy5leHRyYVByb3ZpZGVycyA6IFtdO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuZnVuY3Rpb24gX3JlbmRlcjxUPihcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsIG1vZHVsZVJlZlByb21pc2U6IFByb21pc2U8TmdNb2R1bGVSZWY8VD4+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG1vZHVsZVJlZlByb21pc2UudGhlbigobW9kdWxlUmVmKSA9PiB7XG4gICAgY29uc3QgdHJhbnNpdGlvbklkID0gbW9kdWxlUmVmLmluamVjdG9yLmdldCjJtVRSQU5TSVRJT05fSUQsIG51bGwpO1xuICAgIGlmICghdHJhbnNpdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYHJlbmRlck1vZHVsZVtGYWN0b3J5XSgpIHJlcXVpcmVzIHRoZSB1c2Ugb2YgQnJvd3Nlck1vZHVsZS53aXRoU2VydmVyVHJhbnNpdGlvbigpIHRvIGVuc3VyZVxudGhlIHNlcnZlci1yZW5kZXJlZCBhcHAgY2FuIGJlIHByb3Blcmx5IGJvb3RzdHJhcHBlZCBpbnRvIGEgY2xpZW50IGFwcC5gKTtcbiAgICB9XG4gICAgY29uc3QgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgcmV0dXJuIGFwcGxpY2F0aW9uUmVmLmlzU3RhYmxlLnBpcGUoKGZpcnN0KChpc1N0YWJsZTogYm9vbGVhbikgPT4gaXNTdGFibGUpKSlcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwbGF0Zm9ybVN0YXRlID0gcGxhdGZvcm0uaW5qZWN0b3IuZ2V0KFBsYXRmb3JtU3RhdGUpO1xuXG4gICAgICAgICAgY29uc3QgYXN5bmNQcm9taXNlczogUHJvbWlzZTxhbnk+W10gPSBbXTtcblxuICAgICAgICAgIC8vIFJ1biBhbnkgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIGNhbGxiYWNrcyBqdXN0IGJlZm9yZSByZW5kZXJpbmcgdG8gc3RyaW5nLlxuICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoQkVGT1JFX0FQUF9TRVJJQUxJWkVELCBudWxsKTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrUmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICBpZiAoybVpc1Byb21pc2UoY2FsbGJhY2tSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICBhc3luY1Byb21pc2VzLnB1c2goY2FsbGJhY2tSZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGV4Y2VwdGlvbnMuXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gcGxhdGZvcm1TdGF0ZS5yZW5kZXJUb1N0cmluZygpO1xuICAgICAgICAgICAgcGxhdGZvcm0uZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFzeW5jUHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAuYWxsKGFzeW5jUHJvbWlzZXMubWFwKGFzeW5jUHJvbWlzZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzeW5jUHJvbWlzZS5jYXRjaChcbiAgICAgICAgICAgICAgICAgICAgZSA9PiB7IGNvbnNvbGUud2FybignSWdub3JpbmcgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIEV4Y2VwdGlvbjogJywgZSk7IH0pO1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgLnRoZW4oY29tcGxldGUpO1xuICAgICAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIE1vZHVsZSB0byBzdHJpbmcuXG4gKlxuICogYGRvY3VtZW50YCBpcyB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiBgdXJsYCBpcyB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIGBleHRyYVByb3ZpZGVyc2AgYXJlIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIERvIG5vdCB1c2UgdGhpcyBpbiBhIHByb2R1Y3Rpb24gc2VydmVyIGVudmlyb25tZW50LiBVc2UgcHJlLWNvbXBpbGVkIHtAbGluayBOZ01vZHVsZUZhY3Rvcnl9IHdpdGhcbiAqIHtAbGluayByZW5kZXJNb2R1bGVGYWN0b3J5fSBpbnN0ZWFkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZTxUPihcbiAgICBtb2R1bGU6IFR5cGU8VD4sIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZywgdXJsPzogc3RyaW5nLCBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW119KTpcbiAgICBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIG9wdGlvbnMpO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlKG1vZHVsZSkpO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgYSB7QGxpbmsgTmdNb2R1bGVGYWN0b3J5fSB0byBzdHJpbmcuXG4gKlxuICogYGRvY3VtZW50YCBpcyB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiBgdXJsYCBpcyB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIGBleHRyYVByb3ZpZGVyc2AgYXJlIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZUZhY3Rvcnk8VD4oXG4gICAgbW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PFQ+LFxuICAgIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZywgdXJsPzogc3RyaW5nLCBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW119KTpcbiAgICBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybVNlcnZlciwgb3B0aW9ucyk7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGVGYWN0b3J5KG1vZHVsZUZhY3RvcnkpKTtcbn1cbiJdfQ==