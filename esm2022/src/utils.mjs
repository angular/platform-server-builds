/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, InjectionToken, Renderer2, ɵannotateForHydration as annotateForHydration, ɵInitialRenderPendingTasks as InitialRenderPendingTasks, ɵIS_HYDRATION_FEATURE_ENABLED as IS_HYDRATION_FEATURE_ENABLED, ɵisPromise } from '@angular/core';
import { first } from 'rxjs/operators';
import { PlatformState } from './platform_state';
import { platformDynamicServer } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
function _getPlatform(platformFactory, options) {
    const extraProviders = options.platformProviders ?? [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * Adds the `ng-server-context` attribute to host elements of all bootstrapped components
 * within a given application.
 */
function appendServerContextInfo(serverContext, applicationRef) {
    applicationRef.components.forEach(componentRef => {
        const renderer = componentRef.injector.get(Renderer2);
        const element = componentRef.location.nativeElement;
        if (element) {
            renderer.setAttribute(element, 'ng-server-context', serverContext);
        }
    });
}
function _render(platform, bootstrapPromise) {
    return bootstrapPromise.then((moduleOrApplicationRef) => {
        const environmentInjector = moduleOrApplicationRef.injector;
        const applicationRef = moduleOrApplicationRef instanceof ApplicationRef ?
            moduleOrApplicationRef :
            environmentInjector.get(ApplicationRef);
        const serverContext = sanitizeServerContext(environmentInjector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
        const isStablePromise = applicationRef.isStable.pipe((first((isStable) => isStable))).toPromise();
        const pendingTasks = environmentInjector.get(InitialRenderPendingTasks);
        const pendingTasksPromise = pendingTasks.whenAllTasksComplete;
        return Promise.allSettled([isStablePromise, pendingTasksPromise]).then(() => {
            appendServerContextInfo(serverContext, applicationRef);
            const platformState = platform.injector.get(PlatformState);
            const asyncPromises = [];
            if (applicationRef.injector.get(IS_HYDRATION_FEATURE_ENABLED, false)) {
                annotateForHydration(applicationRef, platformState.getDocument());
            }
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
 * Specifies the value that should be used if no server context value has been provided.
 */
const DEFAULT_SERVER_CONTEXT = 'other';
/**
 * An internal token that allows providing extra information about the server context
 * (e.g. whether SSR or SSG was used). The value is a string and characters other
 * than [a-zA-Z0-9\-] are removed. See the default value in `DEFAULT_SERVER_CONTEXT` const.
 */
export const SERVER_CONTEXT = new InjectionToken('SERVER_CONTEXT');
/**
 * Sanitizes provided server context:
 * - removes all characters other than a-z, A-Z, 0-9 and `-`
 * - returns `other` if nothing is provided or the string is empty after sanitization
 */
function sanitizeServerContext(serverContext) {
    const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, '');
    return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
/**
 * Bootstraps an application using provided NgModule and serializes the page content to string.
 *
 * @param moduleType A reference to an NgModule that should be used for bootstrap.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `extraProviders` - set of platform level providers for the current render request.
 *
 * @publicApi
 */
export function renderModule(moduleType, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    return _render(platform, platform.bootstrapModule(moduleType));
}
/**
 * Bootstraps an instance of an Angular application and renders it to a string.

 * ```typescript
 * const bootstrap = () => bootstrapApplication(RootComponent, appConfig);
 * const output: string = await renderApplication(bootstrap);
 * ```
 *
 * @param bootstrap A method that when invoked returns a promise that returns an `ApplicationRef`
 *     instance once resolved.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `platformProviders` - the platform level providers for the current render request.
 *
 * @returns A Promise, that returns serialized (to a string) rendered page, once resolved.
 *
 * @publicApi
 * @developerPreview
 */
export function renderApplication(bootstrap, options) {
    const platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, bootstrap());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFzQyxTQUFTLEVBQXdCLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLDZCQUE2QixJQUFJLDRCQUE0QixFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyVCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBUS9ELFNBQVMsWUFBWSxDQUNqQixlQUFrRSxFQUNsRSxPQUF3QjtJQUMxQixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO0lBQ3ZELE9BQU8sZUFBZSxDQUFDO1FBQ3JCLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFDO1FBQ25GLGNBQWM7S0FDZixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxhQUFxQixFQUFFLGNBQThCO0lBQ3BGLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQy9DLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMs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LFVBQVUsaUJBQWlCLENBQUksU0FBd0MsRUFBRSxPQUk5RTtJQUNDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUU5RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlcjIsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCDJtWFubm90YXRlRm9ySHlkcmF0aW9uIGFzIGFubm90YXRlRm9ySHlkcmF0aW9uLCDJtUluaXRpYWxSZW5kZXJQZW5kaW5nVGFza3MgYXMgSW5pdGlhbFJlbmRlclBlbmRpbmdUYXNrcywgybVJU19IWURSQVRJT05fRkVBVFVSRV9FTkFCTEVEIGFzIElTX0hZRFJBVElPTl9GRUFUVVJFX0VOQUJMRUQsIMm1aXNQcm9taXNlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7cGxhdGZvcm1EeW5hbWljU2VydmVyfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuaW50ZXJmYWNlIFBsYXRmb3JtT3B0aW9ucyB7XG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50O1xuICB1cmw/OiBzdHJpbmc7XG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuZnVuY3Rpb24gX2dldFBsYXRmb3JtKFxuICAgIHBsYXRmb3JtRmFjdG9yeTogKGV4dHJhUHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdKSA9PiBQbGF0Zm9ybVJlZixcbiAgICBvcHRpb25zOiBQbGF0Zm9ybU9wdGlvbnMpOiBQbGF0Zm9ybVJlZiB7XG4gIGNvbnN0IGV4dHJhUHJvdmlkZXJzID0gb3B0aW9ucy5wbGF0Zm9ybVByb3ZpZGVycyA/PyBbXTtcbiAgcmV0dXJuIHBsYXRmb3JtRmFjdG9yeShbXG4gICAge3Byb3ZpZGU6IElOSVRJQUxfQ09ORklHLCB1c2VWYWx1ZToge2RvY3VtZW50OiBvcHRpb25zLmRvY3VtZW50LCB1cmw6IG9wdGlvbnMudXJsfX0sXG4gICAgZXh0cmFQcm92aWRlcnNcbiAgXSk7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYG5nLXNlcnZlci1jb250ZXh0YCBhdHRyaWJ1dGUgdG8gaG9zdCBlbGVtZW50cyBvZiBhbGwgYm9vdHN0cmFwcGVkIGNvbXBvbmVudHNcbiAqIHdpdGhpbiBhIGdpdmVuIGFwcGxpY2F0aW9uLlxuICovXG5mdW5jdGlvbiBhcHBlbmRTZXJ2ZXJDb250ZXh0SW5mbyhzZXJ2ZXJDb250ZXh0OiBzdHJpbmcsIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICBhcHBsaWNhdGlvblJlZi5jb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50UmVmID0+IHtcbiAgICBjb25zdCByZW5kZXJlciA9IGNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoUmVuZGVyZXIyKTtcbiAgICBjb25zdCBlbGVtZW50ID0gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCAnbmctc2VydmVyLWNvbnRleHQnLCBzZXJ2ZXJDb250ZXh0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfcmVuZGVyPFQ+KFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZixcbiAgICBib290c3RyYXBQcm9taXNlOiBQcm9taXNlPE5nTW9kdWxlUmVmPFQ+fEFwcGxpY2F0aW9uUmVmPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBib290c3RyYXBQcm9taXNlLnRoZW4oKG1vZHVsZU9yQXBwbGljYXRpb25SZWYpID0+IHtcbiAgICBjb25zdCBlbnZpcm9ubWVudEluamVjdG9yID0gbW9kdWxlT3JBcHBsaWNhdGlvblJlZi5pbmplY3RvcjtcbiAgICBjb25zdCBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYgPSBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIGluc3RhbmNlb2YgQXBwbGljYXRpb25SZWYgP1xuICAgICAgICBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIDpcbiAgICAgICAgZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICAgIGNvbnN0IHNlcnZlckNvbnRleHQgPVxuICAgICAgICBzYW5pdGl6ZVNlcnZlckNvbnRleHQoZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoU0VSVkVSX0NPTlRFWFQsIERFRkFVTFRfU0VSVkVSX0NPTlRFWFQpKTtcbiAgICBjb25zdCBpc1N0YWJsZVByb21pc2UgPVxuICAgICAgICBhcHBsaWNhdGlvblJlZi5pc1N0YWJsZS5waXBlKChmaXJzdCgoaXNTdGFibGU6IGJvb2xlYW4pID0+IGlzU3RhYmxlKSkpLnRvUHJvbWlzZSgpO1xuICAgIGNvbnN0IHBlbmRpbmdUYXNrcyA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KEluaXRpYWxSZW5kZXJQZW5kaW5nVGFza3MpO1xuICAgIGNvbnN0IHBlbmRpbmdUYXNrc1Byb21pc2UgPSBwZW5kaW5nVGFza3Mud2hlbkFsbFRhc2tzQ29tcGxldGU7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsU2V0dGxlZChbaXNTdGFibGVQcm9taXNlLCBwZW5kaW5nVGFza3NQcm9taXNlXSkudGhlbigoKSA9PiB7XG4gICAgICBhcHBlbmRTZXJ2ZXJDb250ZXh0SW5mbyhzZXJ2ZXJDb250ZXh0LCBhcHBsaWNhdGlvblJlZik7XG5cbiAgICAgIGNvbnN0IHBsYXRmb3JtU3RhdGUgPSBwbGF0Zm9ybS5pbmplY3Rvci5nZXQoUGxhdGZvcm1TdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGFzeW5jUHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gW107XG5cbiAgICAgIGlmIChhcHBsaWNhdGlvblJlZi5pbmplY3Rvci5nZXQoSVNfSFlEUkFUSU9OX0ZFQVRVUkVfRU5BQkxFRCwgZmFsc2UpKSB7XG4gICAgICAgIGFubm90YXRlRm9ySHlkcmF0aW9uKGFwcGxpY2F0aW9uUmVmLCBwbGF0Zm9ybVN0YXRlLmdldERvY3VtZW50KCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gYW55IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBjYWxsYmFja3MganVzdCBiZWZvcmUgcmVuZGVyaW5nIHRvIHN0cmluZy5cbiAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KEJFRk9SRV9BUFBfU0VSSUFMSVpFRCwgbnVsbCk7XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBjYWxsYmFja3MpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tSZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgaWYgKMm1aXNQcm9taXNlKGNhbGxiYWNrUmVzdWx0KSkge1xuICAgICAgICAgICAgICAvLyBUT0RPOiBpbiBUUzMuNywgY2FsbGJhY2tSZXN1bHQgaXMgdm9pZC5cbiAgICAgICAgICAgICAgYXN5bmNQcm9taXNlcy5wdXNoKGNhbGxiYWNrUmVzdWx0IGFzIGFueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXhjZXB0aW9ucy5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSWdub3JpbmcgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIEV4Y2VwdGlvbjogJywgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBwbGF0Zm9ybVN0YXRlLnJlbmRlclRvU3RyaW5nKCk7XG4gICAgICAgIHBsYXRmb3JtLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChhc3luY1Byb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gY29tcGxldGUoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAuYWxsKGFzeW5jUHJvbWlzZXMubWFwKGFzeW5jUHJvbWlzZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXN5bmNQcm9taXNlLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLnRoZW4oY29tcGxldGUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhlIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgbm8gc2VydmVyIGNvbnRleHQgdmFsdWUgaGFzIGJlZW4gcHJvdmlkZWQuXG4gKi9cbmNvbnN0IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQgPSAnb3RoZXInO1xuXG4vKipcbiAqIEFuIGludGVybmFsIHRva2VuIHRoYXQgYWxsb3dzIHByb3ZpZGluZyBleHRyYSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyIGNvbnRleHRcbiAqIChlLmcuIHdoZXRoZXIgU1NSIG9yIFNTRyB3YXMgdXNlZCkuIFRoZSB2YWx1ZSBpcyBhIHN0cmluZyBhbmQgY2hhcmFjdGVycyBvdGhlclxuICogdGhhbiBbYS16QS1aMC05XFwtXSBhcmUgcmVtb3ZlZC4gU2VlIHRoZSBkZWZhdWx0IHZhbHVlIGluIGBERUZBVUxUX1NFUlZFUl9DT05URVhUYCBjb25zdC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFUlZFUl9DT05URVhUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1NFUlZFUl9DT05URVhUJyk7XG5cbi8qKlxuICogU2FuaXRpemVzIHByb3ZpZGVkIHNlcnZlciBjb250ZXh0OlxuICogLSByZW1vdmVzIGFsbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gYS16LCBBLVosIDAtOSBhbmQgYC1gXG4gKiAtIHJldHVybnMgYG90aGVyYCBpZiBub3RoaW5nIGlzIHByb3ZpZGVkIG9yIHRoZSBzdHJpbmcgaXMgZW1wdHkgYWZ0ZXIgc2FuaXRpemF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplU2VydmVyQ29udGV4dChzZXJ2ZXJDb250ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBjb250ZXh0ID0gc2VydmVyQ29udGV4dC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcLV0vZywgJycpO1xuICByZXR1cm4gY29udGV4dC5sZW5ndGggPiAwID8gY29udGV4dCA6IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQ7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBhcHBsaWNhdGlvbiB1c2luZyBwcm92aWRlZCBOZ01vZHVsZSBhbmQgc2VyaWFsaXplcyB0aGUgcGFnZSBjb250ZW50IHRvIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gbW9kdWxlVHlwZSBBIHJlZmVyZW5jZSB0byBhbiBOZ01vZHVsZSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciBib290c3RyYXAuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBleHRyYVByb3ZpZGVyc2AgLSBzZXQgb2YgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNb2R1bGU8VD4obW9kdWxlVHlwZTogVHlwZTxUPiwgb3B0aW9uczoge1xuICBkb2N1bWVudD86IHN0cmluZ3xEb2N1bWVudCxcbiAgdXJsPzogc3RyaW5nLFxuICBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge2RvY3VtZW50LCB1cmwsIGV4dHJhUHJvdmlkZXJzOiBwbGF0Zm9ybVByb3ZpZGVyc30gPSBvcHRpb25zO1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVyc30pO1xuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlKG1vZHVsZVR5cGUpKTtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcnMgaXQgdG8gYSBzdHJpbmcuXG5cbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGJvb3RzdHJhcCA9ICgpID0+IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIGFwcENvbmZpZyk7XG4gKiBjb25zdCBvdXRwdXQ6IHN0cmluZyA9IGF3YWl0IHJlbmRlckFwcGxpY2F0aW9uKGJvb3RzdHJhcCk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYm9vdHN0cmFwIEEgbWV0aG9kIHRoYXQgd2hlbiBpbnZva2VkIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmV0dXJucyBhbiBgQXBwbGljYXRpb25SZWZgXG4gKiAgICAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJlbmRlciBvcGVyYXRpb246XG4gKiAgLSBgZG9jdW1lbnRgIC0gdGhlIGRvY3VtZW50IG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgZWl0aGVyIGFzIGFuIEhUTUwgc3RyaW5nIG9yXG4gKiAgICAgICAgICAgICAgICAgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGBkb2N1bWVudGAgaW5zdGFuY2UuXG4gKiAgLSBgdXJsYCAtIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYHBsYXRmb3JtUHJvdmlkZXJzYCAtIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIEEgUHJvbWlzZSwgdGhhdCByZXR1cm5zIHNlcmlhbGl6ZWQgKHRvIGEgc3RyaW5nKSByZW5kZXJlZCBwYWdlLCBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBcHBsaWNhdGlvbjxUPihib290c3RyYXA6ICgpID0+IFByb21pc2U8QXBwbGljYXRpb25SZWY+LCBvcHRpb25zOiB7XG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50LFxuICB1cmw/OiBzdHJpbmcsXG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXSxcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBib290c3RyYXAoKSk7XG59XG4iXX0=