/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ApplicationRef } from '@angular/core';
import { ɵTRANSITION_ID } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { PlatformState } from './platform_state';
import { platformDynamicServer, platformServer } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
function _getPlatform(platformFactory, options) {
    var extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then(function (moduleRef) {
        var transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error("renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure\nthe server-rendered app can be properly bootstrapped into a client app.");
        }
        var applicationRef = moduleRef.injector.get(ApplicationRef);
        return applicationRef.isStable.pipe((first(function (isStable) { return isStable; })))
            .toPromise()
            .then(function () {
            var platformState = platform.injector.get(PlatformState);
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            var callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
            if (callbacks) {
                try {
                    for (var callbacks_1 = tslib_1.__values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                        var callback = callbacks_1_1.value;
                        try {
                            callback();
                        }
                        catch (e) {
                            // Ignore exceptions.
                            console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            var output = platformState.renderToString();
            platform.destroy();
            return output;
            var e_1, _a;
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
 * Do not use this in a production server environment. Use pre-compiled {@link NgModuleFactory} with
 * {@link renderModuleFactory} instead.
 *
 * @experimental
 */
export function renderModule(module, options) {
    var platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * @experimental
 */
export function renderModuleFactory(moduleFactory, options) {
    var platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBUS9ELHNCQUNJLGVBQWtFLEVBQ2xFLE9BQXdCO0lBQzFCLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM1RSxPQUFPLGVBQWUsQ0FBQztRQUNyQixFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBQztRQUNuRixjQUFjO0tBQ2YsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxpQkFDSSxRQUFxQixFQUFFLGdCQUF5QztJQUNsRSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFDLFNBQVM7UUFDckMsSUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWCxxS0FDOEQsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBTSxjQUFjLEdBQW1CLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxRQUFpQixJQUFLLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQyxDQUFDLENBQUM7YUFDeEUsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDO1lBQ0osSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7O1lBRzNELElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RFLElBQUksU0FBUyxFQUFFOztvQkFDYixLQUF1QixJQUFBLGNBQUEsaUJBQUEsU0FBUyxDQUFBLG9DQUFBO3dCQUEzQixJQUFNLFFBQVEsc0JBQUE7d0JBQ2pCLElBQUk7NEJBQ0YsUUFBUSxFQUFFLENBQUM7eUJBQ1o7d0JBQUMsT0FBTyxDQUFDLEVBQUU7OzRCQUVWLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQy9EO3FCQUNGOzs7Ozs7Ozs7YUFDRjtZQUVELElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM5QyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsT0FBTyxNQUFNLENBQUM7O1NBQ2YsQ0FBQyxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUFjRCxNQUFNLHVCQUNGLE1BQWUsRUFBRSxPQUE2RTtJQUVoRyxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUM1RDs7Ozs7Ozs7OztBQVdELE1BQU0sOEJBQ0YsYUFBaUMsRUFDakMsT0FBNkU7SUFFL0UsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Q0FDMUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVSZWYsIFBsYXRmb3JtUmVmLCBTdGF0aWNQcm92aWRlciwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge2ZpcnN0fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge3BsYXRmb3JtRHluYW1pY1NlcnZlciwgcGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJy4vc2VydmVyJztcbmltcG9ydCB7QkVGT1JFX0FQUF9TRVJJQUxJWkVELCBJTklUSUFMX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG5pbnRlcmZhY2UgUGxhdGZvcm1PcHRpb25zIHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGxhdGZvcm0oXG4gICAgcGxhdGZvcm1GYWN0b3J5OiAoZXh0cmFQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmLFxuICAgIG9wdGlvbnM6IFBsYXRmb3JtT3B0aW9ucyk6IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZXh0cmFQcm92aWRlcnMgPSBvcHRpb25zLmV4dHJhUHJvdmlkZXJzID8gb3B0aW9ucy5leHRyYVByb3ZpZGVycyA6IFtdO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuZnVuY3Rpb24gX3JlbmRlcjxUPihcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsIG1vZHVsZVJlZlByb21pc2U6IFByb21pc2U8TmdNb2R1bGVSZWY8VD4+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG1vZHVsZVJlZlByb21pc2UudGhlbigobW9kdWxlUmVmKSA9PiB7XG4gICAgY29uc3QgdHJhbnNpdGlvbklkID0gbW9kdWxlUmVmLmluamVjdG9yLmdldCjJtVRSQU5TSVRJT05fSUQsIG51bGwpO1xuICAgIGlmICghdHJhbnNpdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYHJlbmRlck1vZHVsZVtGYWN0b3J5XSgpIHJlcXVpcmVzIHRoZSB1c2Ugb2YgQnJvd3Nlck1vZHVsZS53aXRoU2VydmVyVHJhbnNpdGlvbigpIHRvIGVuc3VyZVxudGhlIHNlcnZlci1yZW5kZXJlZCBhcHAgY2FuIGJlIHByb3Blcmx5IGJvb3RzdHJhcHBlZCBpbnRvIGEgY2xpZW50IGFwcC5gKTtcbiAgICB9XG4gICAgY29uc3QgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgcmV0dXJuIGFwcGxpY2F0aW9uUmVmLmlzU3RhYmxlLnBpcGUoKGZpcnN0KChpc1N0YWJsZTogYm9vbGVhbikgPT4gaXNTdGFibGUpKSlcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwbGF0Zm9ybVN0YXRlID0gcGxhdGZvcm0uaW5qZWN0b3IuZ2V0KFBsYXRmb3JtU3RhdGUpO1xuXG4gICAgICAgICAgLy8gUnVuIGFueSBCRUZPUkVfQVBQX1NFUklBTElaRUQgY2FsbGJhY2tzIGp1c3QgYmVmb3JlIHJlbmRlcmluZyB0byBzdHJpbmcuXG4gICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChCRUZPUkVfQVBQX1NFUklBTElaRUQsIG51bGwpO1xuICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSWdub3JpbmcgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIEV4Y2VwdGlvbjogJywgZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvdXRwdXQgPSBwbGF0Zm9ybVN0YXRlLnJlbmRlclRvU3RyaW5nKCk7XG4gICAgICAgICAgcGxhdGZvcm0uZGVzdHJveSgpO1xuICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIGEgTW9kdWxlIHRvIHN0cmluZy5cbiAqXG4gKiBgZG9jdW1lbnRgIGlzIHRoZSBmdWxsIGRvY3VtZW50IEhUTUwgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBhcyBhIHN0cmluZy5cbiAqIGB1cmxgIGlzIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogYGV4dHJhUHJvdmlkZXJzYCBhcmUgdGhlIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKlxuICogRG8gbm90IHVzZSB0aGlzIGluIGEgcHJvZHVjdGlvbiBzZXJ2ZXIgZW52aXJvbm1lbnQuIFVzZSBwcmUtY29tcGlsZWQge0BsaW5rIE5nTW9kdWxlRmFjdG9yeX0gd2l0aFxuICoge0BsaW5rIHJlbmRlck1vZHVsZUZhY3Rvcnl9IGluc3RlYWQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9kdWxlPFQ+KFxuICAgIG1vZHVsZTogVHlwZTxUPiwgb3B0aW9uczoge2RvY3VtZW50Pzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXX0pOlxuICAgIFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtRHluYW1pY1NlcnZlciwgb3B0aW9ucyk7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUobW9kdWxlKSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIHtAbGluayBOZ01vZHVsZUZhY3Rvcnl9IHRvIHN0cmluZy5cbiAqXG4gKiBgZG9jdW1lbnRgIGlzIHRoZSBmdWxsIGRvY3VtZW50IEhUTUwgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBhcyBhIHN0cmluZy5cbiAqIGB1cmxgIGlzIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogYGV4dHJhUHJvdmlkZXJzYCBhcmUgdGhlIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9kdWxlRmFjdG9yeTxUPihcbiAgICBtb2R1bGVGYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8VD4sXG4gICAgb3B0aW9uczoge2RvY3VtZW50Pzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXX0pOlxuICAgIFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtU2VydmVyLCBvcHRpb25zKTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZUZhY3RvcnkobW9kdWxlRmFjdG9yeSkpO1xufVxuIl19