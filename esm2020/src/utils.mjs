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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQTZCLG1CQUFtQixFQUF1Riw2QkFBNkIsSUFBSSw0QkFBNEIsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN1AsT0FBTyxFQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFRL0QsU0FBUyxZQUFZLENBQ2pCLGVBQWtFLEVBQ2xFLE9BQXdCO0lBQzFCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7SUFDdkQsT0FBTyxlQUFlLENBQUM7UUFDckIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUM7UUFDbkYsY0FBYztLQUNmLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FDWixRQUFxQixFQUNyQixnQkFBd0Q7SUFDMUQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFO1FBQ3RELE1BQU0sbUJBQW1CLEdBQUksc0JBQStDLENBQUMsUUFBUSxDQUFDO1FB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QUFNLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDekYsTUFBTSxZQUFZLEdBQUc7UUFDbkIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNoRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0tBQzdCLENBQUM7SUFDRixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hGLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLGFBQWlDLEVBQ2pDLE9BQTZFO0lBRS9FLE1BQU0sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxHQUFHLE9BQU8sQ0FBQztJQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDbEYsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgSW1wb3J0ZWROZ01vZHVsZVByb3ZpZGVycywgaW1wb3J0UHJvdmlkZXJzRnJvbSwgSW5qZWN0b3IsIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVSZWYsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgU3RhdGljUHJvdmlkZXIsIFR5cGUsIMm1aW50ZXJuYWxCb290c3RyYXBBcHBsaWNhdGlvbiBhcyBpbnRlcm5hbEJvb3RzdHJhcEFwcGxpY2F0aW9uLCDJtWlzUHJvbWlzZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIMm1VFJBTlNJVElPTl9JRH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge2ZpcnN0fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge3BsYXRmb3JtRHluYW1pY1NlcnZlciwgcGxhdGZvcm1TZXJ2ZXIsIFNlcnZlck1vZHVsZX0gZnJvbSAnLi9zZXJ2ZXInO1xuaW1wb3J0IHtCRUZPUkVfQVBQX1NFUklBTElaRUQsIElOSVRJQUxfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbmludGVyZmFjZSBQbGF0Zm9ybU9wdGlvbnMge1xuICBkb2N1bWVudD86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICBwbGF0Zm9ybVByb3ZpZGVycz86IFByb3ZpZGVyW107XG59XG5cbmZ1bmN0aW9uIF9nZXRQbGF0Zm9ybShcbiAgICBwbGF0Zm9ybUZhY3Rvcnk6IChleHRyYVByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYsXG4gICAgb3B0aW9uczogUGxhdGZvcm1PcHRpb25zKTogUGxhdGZvcm1SZWYge1xuICBjb25zdCBleHRyYVByb3ZpZGVycyA9IG9wdGlvbnMucGxhdGZvcm1Qcm92aWRlcnMgPz8gW107XG4gIHJldHVybiBwbGF0Zm9ybUZhY3RvcnkoW1xuICAgIHtwcm92aWRlOiBJTklUSUFMX0NPTkZJRywgdXNlVmFsdWU6IHtkb2N1bWVudDogb3B0aW9ucy5kb2N1bWVudCwgdXJsOiBvcHRpb25zLnVybH19LFxuICAgIGV4dHJhUHJvdmlkZXJzXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBfcmVuZGVyPFQ+KFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZixcbiAgICBib290c3RyYXBQcm9taXNlOiBQcm9taXNlPE5nTW9kdWxlUmVmPFQ+fEFwcGxpY2F0aW9uUmVmPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBib290c3RyYXBQcm9taXNlLnRoZW4oKG1vZHVsZU9yQXBwbGljYXRpb25SZWYpID0+IHtcbiAgICBjb25zdCBlbnZpcm9ubWVudEluamVjdG9yID0gKG1vZHVsZU9yQXBwbGljYXRpb25SZWYgYXMge2luamVjdG9yOiBJbmplY3Rvcn0pLmluamVjdG9yO1xuICAgIGNvbnN0IHRyYW5zaXRpb25JZCA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KMm1VFJBTlNJVElPTl9JRCwgbnVsbCk7XG4gICAgaWYgKCF0cmFuc2l0aW9uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgcmVuZGVyTW9kdWxlW0ZhY3RvcnldKCkgcmVxdWlyZXMgdGhlIHVzZSBvZiBCcm93c2VyTW9kdWxlLndpdGhTZXJ2ZXJUcmFuc2l0aW9uKCkgdG8gZW5zdXJlXG50aGUgc2VydmVyLXJlbmRlcmVkIGFwcCBjYW4gYmUgcHJvcGVybHkgYm9vdHN0cmFwcGVkIGludG8gYSBjbGllbnQgYXBwLmApO1xuICAgIH1cbiAgICBjb25zdCBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYgPSBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIGluc3RhbmNlb2YgQXBwbGljYXRpb25SZWYgP1xuICAgICAgICBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIDpcbiAgICAgICAgZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICAgIHJldHVybiBhcHBsaWNhdGlvblJlZi5pc1N0YWJsZS5waXBlKChmaXJzdCgoaXNTdGFibGU6IGJvb2xlYW4pID0+IGlzU3RhYmxlKSkpXG4gICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGxhdGZvcm1TdGF0ZSA9IHBsYXRmb3JtLmluamVjdG9yLmdldChQbGF0Zm9ybVN0YXRlKTtcblxuICAgICAgICAgIGNvbnN0IGFzeW5jUHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gW107XG5cbiAgICAgICAgICAvLyBSdW4gYW55IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBjYWxsYmFja3MganVzdCBiZWZvcmUgcmVuZGVyaW5nIHRvIHN0cmluZy5cbiAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBlbnZpcm9ubWVudEluamVjdG9yLmdldChCRUZPUkVfQVBQX1NFUklBTElaRUQsIG51bGwpO1xuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFja1Jlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgaWYgKMm1aXNQcm9taXNlKGNhbGxiYWNrUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW4gVFMzLjcsIGNhbGxiYWNrUmVzdWx0IGlzIHZvaWQuXG4gICAgICAgICAgICAgICAgICBhc3luY1Byb21pc2VzLnB1c2goY2FsbGJhY2tSZXN1bHQgYXMgYW55KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSWdub3JpbmcgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIEV4Y2VwdGlvbjogJywgZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dCA9IHBsYXRmb3JtU3RhdGUucmVuZGVyVG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHBsYXRmb3JtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChhc3luY1Byb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgLmFsbChhc3luY1Byb21pc2VzLm1hcChhc3luY1Byb21pc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3luY1Byb21pc2UuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgLnRoZW4oY29tcGxldGUpO1xuICAgICAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIE1vZHVsZSB0byBzdHJpbmcuXG4gKlxuICogYGRvY3VtZW50YCBpcyB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiBgdXJsYCBpcyB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIGBleHRyYVByb3ZpZGVyc2AgYXJlIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZTxUPihcbiAgICBtb2R1bGU6IFR5cGU8VD4sIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZywgdXJsPzogc3RyaW5nLCBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW119KTpcbiAgICBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgZXh0cmFQcm92aWRlcnM6IHBsYXRmb3JtUHJvdmlkZXJzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtRHluYW1pY1NlcnZlciwge2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzfSk7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUobW9kdWxlKSk7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGl0IHRvIGEgc3RyaW5nLlxuICpcbiAqIE5vdGU6IHRoZSByb290IGNvbXBvbmVudCBwYXNzZWQgaW50byB0aGlzIGZ1bmN0aW9uICptdXN0KiBiZSBhIHN0YW5kYWxvbmUgb25lIChzaG91bGQgaGF2ZSB0aGVcbiAqIGBzdGFuZGFsb25lOiB0cnVlYCBmbGFnIGluIHRoZSBgQENvbXBvbmVudGAgZGVjb3JhdG9yIGNvbmZpZykuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIHRlbXBsYXRlOiAnSGVsbG8gd29ybGQhJ1xuICogfSlcbiAqIGNsYXNzIFJvb3RDb21wb25lbnQge31cbiAqXG4gKiBjb25zdCBvdXRwdXQ6IHN0cmluZyA9IGF3YWl0IHJlbmRlckFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHthcHBJZDogJ3NlcnZlci1hcHAnfSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcm9vdENvbXBvbmVudCBBIHJlZmVyZW5jZSB0byBhIFN0YW5kYWxvbmUgQ29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICogQHBhcmFtIG9wdGlvbnMgQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgcmVuZGVyIG9wZXJhdGlvbjpcbiAqICAtIGBhcHBJZGAgLSBhIHN0cmluZyBpZGVudGlmaWVyIG9mIHRoaXMgYXBwbGljYXRpb24uIFRoZSBhcHBJZCBpcyB1c2VkIHRvIHByZWZpeCBhbGxcbiAqICAgICAgICAgICAgICBzZXJ2ZXItZ2VuZXJhdGVkIHN0eWxpbmdzIGFuZCBzdGF0ZSBrZXlzIG9mIHRoZSBhcHBsaWNhdGlvbiBpbiBUcmFuc2ZlclN0YXRlXG4gKiAgICAgICAgICAgICAgdXNlLWNhc2VzLlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBmdWxsIGRvY3VtZW50IEhUTUwgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBhcyBhIHN0cmluZy5cbiAqICAtIGB1cmxgIC0gdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiAgLSBgcHJvdmlkZXJzYCAtIHNldCBvZiBhcHBsaWNhdGlvbiBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYHBsYXRmb3JtUHJvdmlkZXJzYCAtIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogQHJldHVybnMgQSBQcm9taXNlLCB0aGF0IHJldHVybnMgc2VyaWFsaXplZCAodG8gYSBzdHJpbmcpIHJlbmRlcmVkIHBhZ2UsIG9uY2UgcmVzb2x2ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFwcGxpY2F0aW9uPFQ+KHJvb3RDb21wb25lbnQ6IFR5cGU8VD4sIG9wdGlvbnM6IHtcbiAgYXBwSWQ6IHN0cmluZyxcbiAgZG9jdW1lbnQ/OiBzdHJpbmcsXG4gIHVybD86IHN0cmluZyxcbiAgcHJvdmlkZXJzPzogQXJyYXk8UHJvdmlkZXJ8SW1wb3J0ZWROZ01vZHVsZVByb3ZpZGVycz4sXG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXSxcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnMsIGFwcElkfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtRHluYW1pY1NlcnZlciwge2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzfSk7XG4gIGNvbnN0IGFwcFByb3ZpZGVycyA9IFtcbiAgICBpbXBvcnRQcm92aWRlcnNGcm9tKEJyb3dzZXJNb2R1bGUud2l0aFNlcnZlclRyYW5zaXRpb24oe2FwcElkfSkpLFxuICAgIGltcG9ydFByb3ZpZGVyc0Zyb20oU2VydmVyTW9kdWxlKSxcbiAgICAuLi4ob3B0aW9ucy5wcm92aWRlcnMgPz8gW10pLFxuICBdO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgaW50ZXJuYWxCb290c3RyYXBBcHBsaWNhdGlvbih7cm9vdENvbXBvbmVudCwgYXBwUHJvdmlkZXJzfSkpO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgYSB7QGxpbmsgTmdNb2R1bGVGYWN0b3J5fSB0byBzdHJpbmcuXG4gKlxuICogYGRvY3VtZW50YCBpcyB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiBgdXJsYCBpcyB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIGBleHRyYVByb3ZpZGVyc2AgYXJlIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogVGhpcyBzeW1ib2wgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSBhcyBvZiBBbmd1bGFyIHYxMy5cbiAqIFVzZSB7QGxpbmsgcmVuZGVyTW9kdWxlfSBBUEkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZUZhY3Rvcnk8VD4oXG4gICAgbW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PFQ+LFxuICAgIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZywgdXJsPzogc3RyaW5nLCBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW119KTpcbiAgICBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgZXh0cmFQcm92aWRlcnM6IHBsYXRmb3JtUHJvdmlkZXJzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZUZhY3RvcnkobW9kdWxlRmFjdG9yeSkpO1xufVxuIl19