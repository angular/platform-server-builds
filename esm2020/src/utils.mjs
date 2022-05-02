/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, importProvidersFrom, ɵbootstrapApplication as bootstrapApplication, ɵisPromise } from '@angular/core';
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
 */
export function renderApplication(rootComponent, options) {
    const { document, url, platformProviders, appId } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    const appProviders = [
        ...importProvidersFrom(BrowserModule.withServerTransition({ appId })),
        ...importProvidersFrom(ServerModule),
        ...(options.providers ?? []),
    ];
    return _render(platform, bootstrapApplication({ rootComponent, appProviders }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUUsbUJBQW1CLEVBQXVGLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsTixPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQVEvRCxTQUFTLFlBQVksQ0FDakIsZUFBa0UsRUFDbEUsT0FBd0I7SUFDMUIsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztJQUN2RCxPQUFPLGVBQWUsQ0FBQztRQUNyQixFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBQztRQUNuRixjQUFjO0tBQ2YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUNaLFFBQXFCLEVBQ3JCLGdCQUF3RDtJQUMxRCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEVBQUU7UUFDdEQsTUFBTSxtQkFBbUIsR0FBSSxzQkFBK0MsQ0FBQyxRQUFRLENBQUM7UUFD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TSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzFELE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sWUFBWSxHQUFHO1FBQ25CLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNuRSxHQUFHLG1CQUFtQixDQUFDLFlBQVksQ0FBQztRQUNwQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7S0FDN0IsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsYUFBaUMsRUFDakMsT0FBNkU7SUFFL0UsTUFBTSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ25FLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztJQUNsRixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBpbXBvcnRQcm92aWRlcnNGcm9tLCBJbmplY3RvciwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBTdGF0aWNQcm92aWRlciwgVHlwZSwgybVib290c3RyYXBBcHBsaWNhdGlvbiBhcyBib290c3RyYXBBcHBsaWNhdGlvbiwgybVpc1Byb21pc2V9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCDJtVRSQU5TSVRJT05fSUR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtmaXJzdH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIHBsYXRmb3JtU2VydmVyLCBTZXJ2ZXJNb2R1bGV9IGZyb20gJy4vc2VydmVyJztcbmltcG9ydCB7QkVGT1JFX0FQUF9TRVJJQUxJWkVELCBJTklUSUFMX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG5pbnRlcmZhY2UgUGxhdGZvcm1PcHRpb25zIHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcGxhdGZvcm1Qcm92aWRlcnM/OiBQcm92aWRlcltdO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGxhdGZvcm0oXG4gICAgcGxhdGZvcm1GYWN0b3J5OiAoZXh0cmFQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmLFxuICAgIG9wdGlvbnM6IFBsYXRmb3JtT3B0aW9ucyk6IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZXh0cmFQcm92aWRlcnMgPSBvcHRpb25zLnBsYXRmb3JtUHJvdmlkZXJzID8/IFtdO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuZnVuY3Rpb24gX3JlbmRlcjxUPihcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsXG4gICAgYm9vdHN0cmFwUHJvbWlzZTogUHJvbWlzZTxOZ01vZHVsZVJlZjxUPnxBcHBsaWNhdGlvblJlZj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gYm9vdHN0cmFwUHJvbWlzZS50aGVuKChtb2R1bGVPckFwcGxpY2F0aW9uUmVmKSA9PiB7XG4gICAgY29uc3QgZW52aXJvbm1lbnRJbmplY3RvciA9IChtb2R1bGVPckFwcGxpY2F0aW9uUmVmIGFzIHtpbmplY3RvcjogSW5qZWN0b3J9KS5pbmplY3RvcjtcbiAgICBjb25zdCB0cmFuc2l0aW9uSWQgPSBlbnZpcm9ubWVudEluamVjdG9yLmdldCjJtVRSQU5TSVRJT05fSUQsIG51bGwpO1xuICAgIGlmICghdHJhbnNpdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYHJlbmRlck1vZHVsZVtGYWN0b3J5XSgpIHJlcXVpcmVzIHRoZSB1c2Ugb2YgQnJvd3Nlck1vZHVsZS53aXRoU2VydmVyVHJhbnNpdGlvbigpIHRvIGVuc3VyZVxudGhlIHNlcnZlci1yZW5kZXJlZCBhcHAgY2FuIGJlIHByb3Blcmx5IGJvb3RzdHJhcHBlZCBpbnRvIGEgY2xpZW50IGFwcC5gKTtcbiAgICB9XG4gICAgY29uc3QgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmID0gbW9kdWxlT3JBcHBsaWNhdGlvblJlZiBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uUmVmID9cbiAgICAgICAgbW9kdWxlT3JBcHBsaWNhdGlvblJlZiA6XG4gICAgICAgIGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgICByZXR1cm4gYXBwbGljYXRpb25SZWYuaXNTdGFibGUucGlwZSgoZmlyc3QoKGlzU3RhYmxlOiBib29sZWFuKSA9PiBpc1N0YWJsZSkpKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBsYXRmb3JtU3RhdGUgPSBwbGF0Zm9ybS5pbmplY3Rvci5nZXQoUGxhdGZvcm1TdGF0ZSk7XG5cbiAgICAgICAgICBjb25zdCBhc3luY1Byb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuXG4gICAgICAgICAgLy8gUnVuIGFueSBCRUZPUkVfQVBQX1NFUklBTElaRUQgY2FsbGJhY2tzIGp1c3QgYmVmb3JlIHJlbmRlcmluZyB0byBzdHJpbmcuXG4gICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQkVGT1JFX0FQUF9TRVJJQUxJWkVELCBudWxsKTtcblxuICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tSZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIGlmICjJtWlzUHJvbWlzZShjYWxsYmFja1Jlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGluIFRTMy43LCBjYWxsYmFja1Jlc3VsdCBpcyB2b2lkLlxuICAgICAgICAgICAgICAgICAgYXN5bmNQcm9taXNlcy5wdXNoKGNhbGxiYWNrUmVzdWx0IGFzIGFueSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXhjZXB0aW9ucy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBwbGF0Zm9ybVN0YXRlLnJlbmRlclRvU3RyaW5nKCk7XG4gICAgICAgICAgICBwbGF0Zm9ybS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYXN5bmNQcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAgIC5hbGwoYXN5bmNQcm9taXNlcy5tYXAoYXN5bmNQcm9taXNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXN5bmNQcm9taXNlLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgIC50aGVuKGNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgYSBNb2R1bGUgdG8gc3RyaW5nLlxuICpcbiAqIGBkb2N1bWVudGAgaXMgdGhlIGZ1bGwgZG9jdW1lbnQgSFRNTCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGFzIGEgc3RyaW5nLlxuICogYHVybGAgaXMgdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiBgZXh0cmFQcm92aWRlcnNgIGFyZSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNb2R1bGU8VD4oXG4gICAgbW9kdWxlOiBUeXBlPFQ+LCBvcHRpb25zOiB7ZG9jdW1lbnQ/OiBzdHJpbmcsIHVybD86IHN0cmluZywgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfSk6XG4gICAgUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge2RvY3VtZW50LCB1cmwsIGV4dHJhUHJvdmlkZXJzOiBwbGF0Zm9ybVByb3ZpZGVyc30gPSBvcHRpb25zO1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVyc30pO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlKG1vZHVsZSkpO1xufVxuXG4vKipcbiAqIEJvb3RzdHJhcHMgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBhbmQgcmVuZGVycyBpdCB0byBhIHN0cmluZy5cbiAqXG4gKiBOb3RlOiB0aGUgcm9vdCBjb21wb25lbnQgcGFzc2VkIGludG8gdGhpcyBmdW5jdGlvbiAqbXVzdCogYmUgYSBzdGFuZGFsb25lIG9uZSAoc2hvdWxkIGhhdmUgdGhlXG4gKiBgc3RhbmRhbG9uZTogdHJ1ZWAgZmxhZyBpbiB0aGUgYEBDb21wb25lbnRgIGRlY29yYXRvciBjb25maWcpLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogICB0ZW1wbGF0ZTogJ0hlbGxvIHdvcmxkISdcbiAqIH0pXG4gKiBjbGFzcyBSb290Q29tcG9uZW50IHt9XG4gKlxuICogY29uc3Qgb3V0cHV0OiBzdHJpbmcgPSBhd2FpdCByZW5kZXJBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7YXBwSWQ6ICdzZXJ2ZXItYXBwJ30pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHJvb3RDb21wb25lbnQgQSByZWZlcmVuY2UgdG8gYSBTdGFuZGFsb25lIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJlbmRlciBvcGVyYXRpb246XG4gKiAgLSBgYXBwSWRgIC0gYSBzdHJpbmcgaWRlbnRpZmllciBvZiB0aGlzIGFwcGxpY2F0aW9uLiBUaGUgYXBwSWQgaXMgdXNlZCB0byBwcmVmaXggYWxsXG4gKiAgICAgICAgICAgICAgc2VydmVyLWdlbmVyYXRlZCBzdHlsaW5ncyBhbmQgc3RhdGUga2V5cyBvZiB0aGUgYXBwbGljYXRpb24gaW4gVHJhbnNmZXJTdGF0ZVxuICogICAgICAgICAgICAgIHVzZS1jYXNlcy5cbiAqICAtIGBkb2N1bWVudGAgLSB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiAgLSBgdXJsYCAtIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYHByb3ZpZGVyc2AgLSBzZXQgb2YgYXBwbGljYXRpb24gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBwbGF0Zm9ybVByb3ZpZGVyc2AgLSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIEByZXR1cm5zIEEgUHJvbWlzZSwgdGhhdCByZXR1cm5zIHNlcmlhbGl6ZWQgKHRvIGEgc3RyaW5nKSByZW5kZXJlZCBwYWdlLCBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFwcGxpY2F0aW9uPFQ+KHJvb3RDb21wb25lbnQ6IFR5cGU8VD4sIG9wdGlvbnM6IHtcbiAgYXBwSWQ6IHN0cmluZyxcbiAgZG9jdW1lbnQ/OiBzdHJpbmcsXG4gIHVybD86IHN0cmluZyxcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXSxcbiAgcGxhdGZvcm1Qcm92aWRlcnM/OiBQcm92aWRlcltdLFxufSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVycywgYXBwSWR9ID0gb3B0aW9ucztcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgY29uc3QgYXBwUHJvdmlkZXJzID0gW1xuICAgIC4uLmltcG9ydFByb3ZpZGVyc0Zyb20oQnJvd3Nlck1vZHVsZS53aXRoU2VydmVyVHJhbnNpdGlvbih7YXBwSWR9KSksXG4gICAgLi4uaW1wb3J0UHJvdmlkZXJzRnJvbShTZXJ2ZXJNb2R1bGUpLFxuICAgIC4uLihvcHRpb25zLnByb3ZpZGVycyA/PyBbXSksXG4gIF07XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBib290c3RyYXBBcHBsaWNhdGlvbih7cm9vdENvbXBvbmVudCwgYXBwUHJvdmlkZXJzfSkpO1xufVxuXG4vKipcbiAqIFJlbmRlcnMgYSB7QGxpbmsgTmdNb2R1bGVGYWN0b3J5fSB0byBzdHJpbmcuXG4gKlxuICogYGRvY3VtZW50YCBpcyB0aGUgZnVsbCBkb2N1bWVudCBIVE1MIG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgYXMgYSBzdHJpbmcuXG4gKiBgdXJsYCBpcyB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqIGBleHRyYVByb3ZpZGVyc2AgYXJlIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogVGhpcyBzeW1ib2wgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSBhcyBvZiBBbmd1bGFyIHYxMy5cbiAqIFVzZSB7QGxpbmsgcmVuZGVyTW9kdWxlfSBBUEkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZUZhY3Rvcnk8VD4oXG4gICAgbW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PFQ+LFxuICAgIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZywgdXJsPzogc3RyaW5nLCBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW119KTpcbiAgICBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgZXh0cmFQcm92aWRlcnM6IHBsYXRmb3JtUHJvdmlkZXJzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZUZhY3RvcnkobW9kdWxlRmFjdG9yeSkpO1xufVxuIl19