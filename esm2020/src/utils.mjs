/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, importProvidersFrom, ɵinternalBootstrapApplication as internalBootstrapApplication, ɵisPromise } from '@angular/core';
import { BrowserModule, ɵTRANSITION_ID } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { PlatformState } from './platform_state';
import { platformDynamicServer, platformServer, ServerModule } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
import { TRANSFER_STATE_SERIALIZATION_PROVIDERS } from './transfer_state';
function _getPlatform(platformFactory, options) {
    const extraProviders = options.platformProviders ?? [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
function _render(platform, bootstrapPromise) {
    return bootstrapPromise.then((moduleOrApplicationRef) => {
        const environmentInjector = moduleOrApplicationRef.injector;
        const transitionId = environmentInjector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
        }
        const applicationRef = moduleOrApplicationRef instanceof ApplicationRef ?
            moduleOrApplicationRef :
            environmentInjector.get(ApplicationRef);
        return applicationRef.isStable.pipe((first((isStable) => isStable)))
            .toPromise()
            .then(() => {
            const platformState = platform.injector.get(PlatformState);
            const asyncPromises = [];
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
            if (callbacks) {
                for (const callback of callbacks) {
                    try {
                        const callbackResult = callback();
                        if (ɵisPromise(callbackResult)) {
                            // TODO: in TS3.7, callbackResult is void.
                            asyncPromises.push(callbackResult);
                        }
                    }
                    catch (e) {
                        // Ignore exceptions.
                        console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                    }
                }
            }
            const complete = () => {
                const output = platformState.renderToString();
                platform.destroy();
                return output;
            };
            if (asyncPromises.length === 0) {
                return complete();
            }
            return Promise
                .all(asyncPromises.map(asyncPromise => {
                return asyncPromise.catch(e => {
                    console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                });
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
 * @publicApi
 */
export function renderModule(module, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Bootstraps an instance of an Angular application and renders it to a string.
 *
 * Note: the root component passed into this function *must* be a standalone one (should have the
 * `standalone: true` flag in the `@Component` decorator config).
 *
 * ```typescript
 * @Component({
 *   standalone: true,
 *   template: 'Hello world!'
 * })
 * class RootComponent {}
 *
 * const output: string = await renderApplication(RootComponent, {appId: 'server-app'});
 * ```
 *
 * @param rootComponent A reference to a Standalone Component that should be rendered.
 * @param options Additional configuration for the render operation:
 *  - `appId` - a string identifier of this application. The appId is used to prefix all
 *              server-generated stylings and state keys of the application in TransferState
 *              use-cases.
 *  - `document` - the full document HTML of the page to render, as a string.
 *  - `url` - the URL for the current render request.
 *  - `providers` - set of application level providers for the current render request.
 *  - `platformProviders` - the platform level providers for the current render request.
 * @returns A Promise, that returns serialized (to a string) rendered page, once resolved.
 *
 * @publicApi
 * @developerPreview
 */
export function renderApplication(rootComponent, options) {
    const { document, url, platformProviders, appId } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    const appProviders = [
        importProvidersFrom(BrowserModule.withServerTransition({ appId })),
        importProvidersFrom(ServerModule),
        ...TRANSFER_STATE_SERIALIZATION_PROVIDERS,
        ...(options.providers ?? []),
    ];
    return _render(platform, internalBootstrapApplication({ rootComponent, appProviders }));
}
/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * @publicApi
 *
 * @deprecated
 * This symbol is no longer necessary as of Angular v13.
 * Use {@link renderModule} API instead.
 */
export function renderModuleFactory(moduleFactory, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platform = _getPlatform(platformServer, { document, url, platformProviders });
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQTZCLG1CQUFtQixFQUE2RSw2QkFBNkIsSUFBSSw0QkFBNEIsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDblAsT0FBTyxFQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFDLHNDQUFzQyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFReEUsU0FBUyxZQUFZLENBQ2pCLGVBQWtFLEVBQ2xFLE9BQXdCO0lBQzFCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7SUFDdkQsT0FBTyxlQUFlLENBQUM7UUFDckIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUM7UUFDbkYsY0FBYztLQUNmLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FDWixRQUFxQixFQUNyQixnQkFBd0Q7SUFDMUQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFO1FB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TUFBTSxVQUFVLGlCQUFpQixDQUFJLGFBQXNCLEVBQUUsT0FNNUQ7SUFDQyxNQUFNLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDekYsTUFBTSxZQUFZLEdBQUc7UUFDbkIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNoRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDakMsR0FBRyxzQ0FBc0M7UUFDekMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0tBQzdCLENBQUM7SUFDRixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hGLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLGFBQWlDLEVBQ2pDLE9BQTZFO0lBRS9FLE1BQU0sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxHQUFHLE9BQU8sQ0FBQztJQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDbEYsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgSW1wb3J0ZWROZ01vZHVsZVByb3ZpZGVycywgaW1wb3J0UHJvdmlkZXJzRnJvbSwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBTdGF0aWNQcm92aWRlciwgVHlwZSwgybVpbnRlcm5hbEJvb3RzdHJhcEFwcGxpY2F0aW9uIGFzIGludGVybmFsQm9vdHN0cmFwQXBwbGljYXRpb24sIMm1aXNQcm9taXNlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgybVUUkFOU0lUSU9OX0lEfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7cGxhdGZvcm1EeW5hbWljU2VydmVyLCBwbGF0Zm9ybVNlcnZlciwgU2VydmVyTW9kdWxlfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7VFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlN9IGZyb20gJy4vdHJhbnNmZXJfc3RhdGUnO1xuXG5pbnRlcmZhY2UgUGxhdGZvcm1PcHRpb25zIHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcGxhdGZvcm1Qcm92aWRlcnM/OiBQcm92aWRlcltdO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGxhdGZvcm0oXG4gICAgcGxhdGZvcm1GYWN0b3J5OiAoZXh0cmFQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmLFxuICAgIG9wdGlvbnM6IFBsYXRmb3JtT3B0aW9ucyk6IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZXh0cmFQcm92aWRlcnMgPSBvcHRpb25zLnBsYXRmb3JtUHJvdmlkZXJzID8/IFtdO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuZnVuY3Rpb24gX3JlbmRlcjxUPihcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsXG4gICAgYm9vdHN0cmFwUHJvbWlzZTogUHJvbWlzZTxOZ01vZHVsZVJlZjxUPnxBcHBsaWNhdGlvblJlZj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gYm9vdHN0cmFwUHJvbWlzZS50aGVuKChtb2R1bGVPckFwcGxpY2F0aW9uUmVmKSA9PiB7XG4gICAgY29uc3QgZW52aXJvbm1lbnRJbmplY3RvciA9IG1vZHVsZU9yQXBwbGljYXRpb25SZWYuaW5qZWN0b3I7XG4gICAgY29uc3QgdHJhbnNpdGlvbklkID0gZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoybVUUkFOU0lUSU9OX0lELCBudWxsKTtcbiAgICBpZiAoIXRyYW5zaXRpb25JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGByZW5kZXJNb2R1bGVbRmFjdG9yeV0oKSByZXF1aXJlcyB0aGUgdXNlIG9mIEJyb3dzZXJNb2R1bGUud2l0aFNlcnZlclRyYW5zaXRpb24oKSB0byBlbnN1cmVcbnRoZSBzZXJ2ZXItcmVuZGVyZWQgYXBwIGNhbiBiZSBwcm9wZXJseSBib290c3RyYXBwZWQgaW50byBhIGNsaWVudCBhcHAuYCk7XG4gICAgfVxuICAgIGNvbnN0IGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiA9IG1vZHVsZU9yQXBwbGljYXRpb25SZWYgaW5zdGFuY2VvZiBBcHBsaWNhdGlvblJlZiA/XG4gICAgICAgIG1vZHVsZU9yQXBwbGljYXRpb25SZWYgOlxuICAgICAgICBlbnZpcm9ubWVudEluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgcmV0dXJuIGFwcGxpY2F0aW9uUmVmLmlzU3RhYmxlLnBpcGUoKGZpcnN0KChpc1N0YWJsZTogYm9vbGVhbikgPT4gaXNTdGFibGUpKSlcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwbGF0Zm9ybVN0YXRlID0gcGxhdGZvcm0uaW5qZWN0b3IuZ2V0KFBsYXRmb3JtU3RhdGUpO1xuXG4gICAgICAgICAgY29uc3QgYXN5bmNQcm9taXNlczogUHJvbWlzZTxhbnk+W10gPSBbXTtcblxuICAgICAgICAgIC8vIFJ1biBhbnkgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIGNhbGxiYWNrcyBqdXN0IGJlZm9yZSByZW5kZXJpbmcgdG8gc3RyaW5nLlxuICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KEJFRk9SRV9BUFBfU0VSSUFMSVpFRCwgbnVsbCk7XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrUmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICBpZiAoybVpc1Byb21pc2UoY2FsbGJhY2tSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbiBUUzMuNywgY2FsbGJhY2tSZXN1bHQgaXMgdm9pZC5cbiAgICAgICAgICAgICAgICAgIGFzeW5jUHJvbWlzZXMucHVzaChjYWxsYmFja1Jlc3VsdCBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGV4Y2VwdGlvbnMuXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gcGxhdGZvcm1TdGF0ZS5yZW5kZXJUb1N0cmluZygpO1xuICAgICAgICAgICAgcGxhdGZvcm0uZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFzeW5jUHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAuYWxsKGFzeW5jUHJvbWlzZXMubWFwKGFzeW5jUHJvbWlzZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzeW5jUHJvbWlzZS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSWdub3JpbmcgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIEV4Y2VwdGlvbjogJywgZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAudGhlbihjb21wbGV0ZSk7XG4gICAgICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIGEgTW9kdWxlIHRvIHN0cmluZy5cbiAqXG4gKiBgZG9jdW1lbnRgIGlzIHRoZSBmdWxsIGRvY3VtZW50IEhUTUwgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBhcyBhIHN0cmluZy5cbiAqIGB1cmxgIGlzIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogYGV4dHJhUHJvdmlkZXJzYCBhcmUgdGhlIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9kdWxlPFQ+KFxuICAgIG1vZHVsZTogVHlwZTxUPiwgb3B0aW9uczoge2RvY3VtZW50Pzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXX0pOlxuICAgIFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtkb2N1bWVudCwgdXJsLCBleHRyYVByb3ZpZGVyczogcGxhdGZvcm1Qcm92aWRlcnN9ID0gb3B0aW9ucztcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZShtb2R1bGUpKTtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcnMgaXQgdG8gYSBzdHJpbmcuXG4gKlxuICogTm90ZTogdGhlIHJvb3QgY29tcG9uZW50IHBhc3NlZCBpbnRvIHRoaXMgZnVuY3Rpb24gKm11c3QqIGJlIGEgc3RhbmRhbG9uZSBvbmUgKHNob3VsZCBoYXZlIHRoZVxuICogYHN0YW5kYWxvbmU6IHRydWVgIGZsYWcgaW4gdGhlIGBAQ29tcG9uZW50YCBkZWNvcmF0b3IgY29uZmlnKS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAqICAgdGVtcGxhdGU6ICdIZWxsbyB3b3JsZCEnXG4gKiB9KVxuICogY2xhc3MgUm9vdENvbXBvbmVudCB7fVxuICpcbiAqIGNvbnN0IG91dHB1dDogc3RyaW5nID0gYXdhaXQgcmVuZGVyQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge2FwcElkOiAnc2VydmVyLWFwcCd9KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSByb290Q29tcG9uZW50IEEgcmVmZXJlbmNlIHRvIGEgU3RhbmRhbG9uZSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGFwcElkYCAtIGEgc3RyaW5nIGlkZW50aWZpZXIgb2YgdGhpcyBhcHBsaWNhdGlvbi4gVGhlIGFwcElkIGlzIHVzZWQgdG8gcHJlZml4IGFsbFxuICogICAgICAgICAgICAgIHNlcnZlci1nZW5lcmF0ZWQgc3R5bGluZ3MgYW5kIHN0YXRlIGtleXMgb2YgdGhlIGFwcGxpY2F0aW9uIGluIFRyYW5zZmVyU3RhdGVcbiAqICAgICAgICAgICAgICB1c2UtY2FzZXMuXG4gKiAgLSBgZG9jdW1lbnRgIC0gdGhlIGZ1bGwgZG9jdW1lbnQgSFRNTCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGFzIGEgc3RyaW5nLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBwcm92aWRlcnNgIC0gc2V0IG9mIGFwcGxpY2F0aW9uIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiAgLSBgcGxhdGZvcm1Qcm92aWRlcnNgIC0gdGhlIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiBAcmV0dXJucyBBIFByb21pc2UsIHRoYXQgcmV0dXJucyBzZXJpYWxpemVkICh0byBhIHN0cmluZykgcmVuZGVyZWQgcGFnZSwgb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQXBwbGljYXRpb248VD4ocm9vdENvbXBvbmVudDogVHlwZTxUPiwgb3B0aW9uczoge1xuICBhcHBJZDogc3RyaW5nLFxuICBkb2N1bWVudD86IHN0cmluZyxcbiAgdXJsPzogc3RyaW5nLFxuICBwcm92aWRlcnM/OiBBcnJheTxQcm92aWRlcnxJbXBvcnRlZE5nTW9kdWxlUHJvdmlkZXJzPixcbiAgcGxhdGZvcm1Qcm92aWRlcnM/OiBQcm92aWRlcltdLFxufSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVycywgYXBwSWR9ID0gb3B0aW9ucztcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgY29uc3QgYXBwUHJvdmlkZXJzID0gW1xuICAgIGltcG9ydFByb3ZpZGVyc0Zyb20oQnJvd3Nlck1vZHVsZS53aXRoU2VydmVyVHJhbnNpdGlvbih7YXBwSWR9KSksXG4gICAgaW1wb3J0UHJvdmlkZXJzRnJvbShTZXJ2ZXJNb2R1bGUpLFxuICAgIC4uLlRSQU5TRkVSX1NUQVRFX1NFUklBTElaQVRJT05fUFJPVklERVJTLFxuICAgIC4uLihvcHRpb25zLnByb3ZpZGVycyA/PyBbXSksXG4gIF07XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBpbnRlcm5hbEJvb3RzdHJhcEFwcGxpY2F0aW9uKHtyb290Q29tcG9uZW50LCBhcHBQcm92aWRlcnN9KSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIHtAbGluayBOZ01vZHVsZUZhY3Rvcnl9IHRvIHN0cmluZy5cbiAqXG4gKiBgZG9jdW1lbnRgIGlzIHRoZSBmdWxsIGRvY3VtZW50IEhUTUwgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBhcyBhIHN0cmluZy5cbiAqIGB1cmxgIGlzIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogYGV4dHJhUHJvdmlkZXJzYCBhcmUgdGhlIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKlxuICogQHB1YmxpY0FwaVxuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBUaGlzIHN5bWJvbCBpcyBubyBsb25nZXIgbmVjZXNzYXJ5IGFzIG9mIEFuZ3VsYXIgdjEzLlxuICogVXNlIHtAbGluayByZW5kZXJNb2R1bGV9IEFQSSBpbnN0ZWFkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9kdWxlRmFjdG9yeTxUPihcbiAgICBtb2R1bGVGYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8VD4sXG4gICAgb3B0aW9uczoge2RvY3VtZW50Pzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXX0pOlxuICAgIFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtkb2N1bWVudCwgdXJsLCBleHRyYVByb3ZpZGVyczogcGxhdGZvcm1Qcm92aWRlcnN9ID0gb3B0aW9ucztcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1TZXJ2ZXIsIHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVyc30pO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlRmFjdG9yeShtb2R1bGVGYWN0b3J5KSk7XG59XG4iXX0=