/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, InjectionToken, Renderer2, ɵannotateForHydration as annotateForHydration, ɵENABLED_SSR_FEATURES as ENABLED_SSR_FEATURES, ɵInitialRenderPendingTasks as InitialRenderPendingTasks, ɵIS_HYDRATION_FEATURE_ENABLED as IS_HYDRATION_FEATURE_ENABLED, ɵisPromise } from '@angular/core';
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
function appendServerContextInfo(applicationRef) {
    const injector = applicationRef.injector;
    let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
    const features = injector.get(ENABLED_SSR_FEATURES);
    if (features.size > 0) {
        // Append features information into the server context value.
        serverContext += `|${Array.from(features).join(',')}`;
    }
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
        const isStablePromise = applicationRef.isStable.pipe((first((isStable) => isStable))).toPromise();
        const pendingTasks = environmentInjector.get(InitialRenderPendingTasks);
        const pendingTasksPromise = pendingTasks.whenAllTasksComplete;
        return Promise.allSettled([isStablePromise, pendingTasksPromise]).then(() => {
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
                appendServerContextInfo(applicationRef);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFzQyxTQUFTLEVBQXdCLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLDZCQUE2QixJQUFJLDRCQUE0QixFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwVyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBUS9ELFNBQVMsWUFBWSxDQUNqQixlQUFrRSxFQUNsRSxPQUF3QjtJQUMxQixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO0lBQ3ZELE9BQU8sZUFBZSxDQUFDO1FBQ3JCLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFDO1FBQ25GLGNBQWM7S0FDZixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxjQUE4QjtJQUM3RCxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0lBQ3pDLElBQUksYUFBYSxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMs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QWMsRUFBRSxpQkFBaUIsRUFBQyxHQUFHLE9BQU8sQ0FBQztJQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMscUJBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztJQUN6RixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUksU0FBd0MsRUFBRSxPQUk5RTtJQUNDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUU5RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZVJlZiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlcjIsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCDJtWFubm90YXRlRm9ySHlkcmF0aW9uIGFzIGFubm90YXRlRm9ySHlkcmF0aW9uLCDJtUVOQUJMRURfU1NSX0ZFQVRVUkVTIGFzIEVOQUJMRURfU1NSX0ZFQVRVUkVTLCDJtUluaXRpYWxSZW5kZXJQZW5kaW5nVGFza3MgYXMgSW5pdGlhbFJlbmRlclBlbmRpbmdUYXNrcywgybVJU19IWURSQVRJT05fRkVBVFVSRV9FTkFCTEVEIGFzIElTX0hZRFJBVElPTl9GRUFUVVJFX0VOQUJMRUQsIMm1aXNQcm9taXNlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7cGxhdGZvcm1EeW5hbWljU2VydmVyfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuaW50ZXJmYWNlIFBsYXRmb3JtT3B0aW9ucyB7XG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50O1xuICB1cmw/OiBzdHJpbmc7XG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuZnVuY3Rpb24gX2dldFBsYXRmb3JtKFxuICAgIHBsYXRmb3JtRmFjdG9yeTogKGV4dHJhUHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdKSA9PiBQbGF0Zm9ybVJlZixcbiAgICBvcHRpb25zOiBQbGF0Zm9ybU9wdGlvbnMpOiBQbGF0Zm9ybVJlZiB7XG4gIGNvbnN0IGV4dHJhUHJvdmlkZXJzID0gb3B0aW9ucy5wbGF0Zm9ybVByb3ZpZGVycyA/PyBbXTtcbiAgcmV0dXJuIHBsYXRmb3JtRmFjdG9yeShbXG4gICAge3Byb3ZpZGU6IElOSVRJQUxfQ09ORklHLCB1c2VWYWx1ZToge2RvY3VtZW50OiBvcHRpb25zLmRvY3VtZW50LCB1cmw6IG9wdGlvbnMudXJsfX0sXG4gICAgZXh0cmFQcm92aWRlcnNcbiAgXSk7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYG5nLXNlcnZlci1jb250ZXh0YCBhdHRyaWJ1dGUgdG8gaG9zdCBlbGVtZW50cyBvZiBhbGwgYm9vdHN0cmFwcGVkIGNvbXBvbmVudHNcbiAqIHdpdGhpbiBhIGdpdmVuIGFwcGxpY2F0aW9uLlxuICovXG5mdW5jdGlvbiBhcHBlbmRTZXJ2ZXJDb250ZXh0SW5mbyhhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAgY29uc3QgaW5qZWN0b3IgPSBhcHBsaWNhdGlvblJlZi5pbmplY3RvcjtcbiAgbGV0IHNlcnZlckNvbnRleHQgPSBzYW5pdGl6ZVNlcnZlckNvbnRleHQoaW5qZWN0b3IuZ2V0KFNFUlZFUl9DT05URVhULCBERUZBVUxUX1NFUlZFUl9DT05URVhUKSk7XG4gIGNvbnN0IGZlYXR1cmVzID0gaW5qZWN0b3IuZ2V0KEVOQUJMRURfU1NSX0ZFQVRVUkVTKTtcbiAgaWYgKGZlYXR1cmVzLnNpemUgPiAwKSB7XG4gICAgLy8gQXBwZW5kIGZlYXR1cmVzIGluZm9ybWF0aW9uIGludG8gdGhlIHNlcnZlciBjb250ZXh0IHZhbHVlLlxuICAgIHNlcnZlckNvbnRleHQgKz0gYHwke0FycmF5LmZyb20oZmVhdHVyZXMpLmpvaW4oJywnKX1gO1xuICB9XG4gIGFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnRSZWYgPT4ge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gY29tcG9uZW50UmVmLmluamVjdG9yLmdldChSZW5kZXJlcjIpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICduZy1zZXJ2ZXItY29udGV4dCcsIHNlcnZlckNvbnRleHQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9yZW5kZXI8VD4oXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtUmVmLFxuICAgIGJvb3RzdHJhcFByb21pc2U6IFByb21pc2U8TmdNb2R1bGVSZWY8VD58QXBwbGljYXRpb25SZWY+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIGJvb3RzdHJhcFByb21pc2UudGhlbigobW9kdWxlT3JBcHBsaWNhdGlvblJlZikgPT4ge1xuICAgIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3IgPSBtb2R1bGVPckFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICAgIGNvbnN0IGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiA9IG1vZHVsZU9yQXBwbGljYXRpb25SZWYgaW5zdGFuY2VvZiBBcHBsaWNhdGlvblJlZiA/XG4gICAgICAgIG1vZHVsZU9yQXBwbGljYXRpb25SZWYgOlxuICAgICAgICBlbnZpcm9ubWVudEluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgY29uc3QgaXNTdGFibGVQcm9taXNlID1cbiAgICAgICAgYXBwbGljYXRpb25SZWYuaXNTdGFibGUucGlwZSgoZmlyc3QoKGlzU3RhYmxlOiBib29sZWFuKSA9PiBpc1N0YWJsZSkpKS50b1Byb21pc2UoKTtcbiAgICBjb25zdCBwZW5kaW5nVGFza3MgPSBlbnZpcm9ubWVudEluamVjdG9yLmdldChJbml0aWFsUmVuZGVyUGVuZGluZ1Rhc2tzKTtcbiAgICBjb25zdCBwZW5kaW5nVGFza3NQcm9taXNlID0gcGVuZGluZ1Rhc2tzLndoZW5BbGxUYXNrc0NvbXBsZXRlO1xuICAgIHJldHVybiBQcm9taXNlLmFsbFNldHRsZWQoW2lzU3RhYmxlUHJvbWlzZSwgcGVuZGluZ1Rhc2tzUHJvbWlzZV0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcGxhdGZvcm1TdGF0ZSA9IHBsYXRmb3JtLmluamVjdG9yLmdldChQbGF0Zm9ybVN0YXRlKTtcblxuICAgICAgY29uc3QgYXN5bmNQcm9taXNlczogUHJvbWlzZTxhbnk+W10gPSBbXTtcblxuICAgICAgaWYgKGFwcGxpY2F0aW9uUmVmLmluamVjdG9yLmdldChJU19IWURSQVRJT05fRkVBVFVSRV9FTkFCTEVELCBmYWxzZSkpIHtcbiAgICAgICAgYW5ub3RhdGVGb3JIeWRyYXRpb24oYXBwbGljYXRpb25SZWYsIHBsYXRmb3JtU3RhdGUuZ2V0RG9jdW1lbnQoKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbnkgQkVGT1JFX0FQUF9TRVJJQUxJWkVEIGNhbGxiYWNrcyBqdXN0IGJlZm9yZSByZW5kZXJpbmcgdG8gc3RyaW5nLlxuICAgICAgY29uc3QgY2FsbGJhY2tzID0gZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQkVGT1JFX0FQUF9TRVJJQUxJWkVELCBudWxsKTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja1Jlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBpZiAoybVpc1Byb21pc2UoY2FsbGJhY2tSZXN1bHQpKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IGluIFRTMy43LCBjYWxsYmFja1Jlc3VsdCBpcyB2b2lkLlxuICAgICAgICAgICAgICBhc3luY1Byb21pc2VzLnB1c2goY2FsbGJhY2tSZXN1bHQgYXMgYW55KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLlxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGFwcGVuZFNlcnZlckNvbnRleHRJbmZvKGFwcGxpY2F0aW9uUmVmKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gcGxhdGZvcm1TdGF0ZS5yZW5kZXJUb1N0cmluZygpO1xuICAgICAgICBwbGF0Zm9ybS5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICB9O1xuXG4gICAgICBpZiAoYXN5bmNQcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgLmFsbChhc3luY1Byb21pc2VzLm1hcChhc3luY1Byb21pc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jUHJvbWlzZS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKVxuICAgICAgICAgIC50aGVuKGNvbXBsZXRlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogU3BlY2lmaWVzIHRoZSB2YWx1ZSB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIG5vIHNlcnZlciBjb250ZXh0IHZhbHVlIGhhcyBiZWVuIHByb3ZpZGVkLlxuICovXG5jb25zdCBERUZBVUxUX1NFUlZFUl9DT05URVhUID0gJ290aGVyJztcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCB0b2tlbiB0aGF0IGFsbG93cyBwcm92aWRpbmcgZXh0cmEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlcnZlciBjb250ZXh0XG4gKiAoZS5nLiB3aGV0aGVyIFNTUiBvciBTU0cgd2FzIHVzZWQpLiBUaGUgdmFsdWUgaXMgYSBzdHJpbmcgYW5kIGNoYXJhY3RlcnMgb3RoZXJcbiAqIHRoYW4gW2EtekEtWjAtOVxcLV0gYXJlIHJlbW92ZWQuIFNlZSB0aGUgZGVmYXVsdCB2YWx1ZSBpbiBgREVGQVVMVF9TRVJWRVJfQ09OVEVYVGAgY29uc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBTRVJWRVJfQ09OVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdTRVJWRVJfQ09OVEVYVCcpO1xuXG4vKipcbiAqIFNhbml0aXplcyBwcm92aWRlZCBzZXJ2ZXIgY29udGV4dDpcbiAqIC0gcmVtb3ZlcyBhbGwgY2hhcmFjdGVycyBvdGhlciB0aGFuIGEteiwgQS1aLCAwLTkgYW5kIGAtYFxuICogLSByZXR1cm5zIGBvdGhlcmAgaWYgbm90aGluZyBpcyBwcm92aWRlZCBvciB0aGUgc3RyaW5nIGlzIGVtcHR5IGFmdGVyIHNhbml0aXphdGlvblxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZVNlcnZlckNvbnRleHQoc2VydmVyQ29udGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgY29udGV4dCA9IHNlcnZlckNvbnRleHQucmVwbGFjZSgvW15hLXpBLVowLTlcXC1dL2csICcnKTtcbiAgcmV0dXJuIGNvbnRleHQubGVuZ3RoID4gMCA/IGNvbnRleHQgOiBERUZBVUxUX1NFUlZFUl9DT05URVhUO1xufVxuXG4vKipcbiAqIEJvb3RzdHJhcHMgYW4gYXBwbGljYXRpb24gdXNpbmcgcHJvdmlkZWQgTmdNb2R1bGUgYW5kIHNlcmlhbGl6ZXMgdGhlIHBhZ2UgY29udGVudCB0byBzdHJpbmcuXG4gKlxuICogQHBhcmFtIG1vZHVsZVR5cGUgQSByZWZlcmVuY2UgdG8gYW4gTmdNb2R1bGUgdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgYm9vdHN0cmFwLlxuICogQHBhcmFtIG9wdGlvbnMgQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgcmVuZGVyIG9wZXJhdGlvbjpcbiAqICAtIGBkb2N1bWVudGAgLSB0aGUgZG9jdW1lbnQgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBlaXRoZXIgYXMgYW4gSFRNTCBzdHJpbmcgb3JcbiAqICAgICAgICAgICAgICAgICBhcyBhIHJlZmVyZW5jZSB0byB0aGUgYGRvY3VtZW50YCBpbnN0YW5jZS5cbiAqICAtIGB1cmxgIC0gdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiAgLSBgZXh0cmFQcm92aWRlcnNgIC0gc2V0IG9mIHBsYXRmb3JtIGxldmVsIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9kdWxlPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4sIG9wdGlvbnM6IHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmd8RG9jdW1lbnQsXG4gIHVybD86IHN0cmluZyxcbiAgZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdLFxufSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtkb2N1bWVudCwgdXJsLCBleHRyYVByb3ZpZGVyczogcGxhdGZvcm1Qcm92aWRlcnN9ID0gb3B0aW9ucztcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCB7ZG9jdW1lbnQsIHVybCwgcGxhdGZvcm1Qcm92aWRlcnN9KTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZShtb2R1bGVUeXBlKSk7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGl0IHRvIGEgc3RyaW5nLlxuXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBib290c3RyYXAgPSAoKSA9PiBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCBhcHBDb25maWcpO1xuICogY29uc3Qgb3V0cHV0OiBzdHJpbmcgPSBhd2FpdCByZW5kZXJBcHBsaWNhdGlvbihib290c3RyYXApO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGJvb3RzdHJhcCBBIG1ldGhvZCB0aGF0IHdoZW4gaW52b2tlZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYFxuICogICAgIGluc3RhbmNlIG9uY2UgcmVzb2x2ZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBwbGF0Zm9ybVByb3ZpZGVyc2AgLSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyBBIFByb21pc2UsIHRoYXQgcmV0dXJucyBzZXJpYWxpemVkICh0byBhIHN0cmluZykgcmVuZGVyZWQgcGFnZSwgb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQXBwbGljYXRpb248VD4oYm9vdHN0cmFwOiAoKSA9PiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiwgb3B0aW9uczoge1xuICBkb2N1bWVudD86IHN0cmluZ3xEb2N1bWVudCxcbiAgdXJsPzogc3RyaW5nLFxuICBwbGF0Zm9ybVByb3ZpZGVycz86IFByb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgcGxhdGZvcm0gPSBfZ2V0UGxhdGZvcm0ocGxhdGZvcm1EeW5hbWljU2VydmVyLCBvcHRpb25zKTtcblxuICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybSwgYm9vdHN0cmFwKCkpO1xufVxuIl19