/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, importProvidersFrom, InjectionToken, Renderer2, ɵinternalCreateApplication as internalCreateApplication, ɵisPromise } from '@angular/core';
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
        const transitionId = environmentInjector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
        }
        const applicationRef = moduleOrApplicationRef instanceof ApplicationRef ?
            moduleOrApplicationRef :
            environmentInjector.get(ApplicationRef);
        const serverContext = sanitizeServerContext(environmentInjector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
        return applicationRef.isStable.pipe((first((isStable) => isStable)))
            .toPromise()
            .then(() => {
            appendServerContextInfo(serverContext, applicationRef);
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
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `providers` - set of application level providers for the current render request.
 *  - `platformProviders` - the platform level providers for the current render request.
 *
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
    return _render(platform, internalCreateApplication({ rootComponent, appProviders }));
}
/**
 * Bootstraps an application using provided {@link NgModuleFactory} and serializes the page content
 * to string.
 *
 * @param moduleFactory An instance of the {@link NgModuleFactory} that should be used for
 *     bootstrap.
 * @param options Additional configuration for the render operation:
 *  - `document` - the document of the page to render, either as an HTML string or
 *                 as a reference to the `document` instance.
 *  - `url` - the URL for the current render request.
 *  - `extraProviders` - set of platform level providers for the current render request.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQTZCLG1CQUFtQixFQUFFLGNBQWMsRUFBdUQsU0FBUyxFQUF3QiwwQkFBMEIsSUFBSSx5QkFBeUIsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeFEsT0FBTyxFQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFDLHNDQUFzQyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFReEUsU0FBUyxZQUFZLENBQ2pCLGVBQWtFLEVBQ2xFLE9BQXdCO0lBQzFCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7SUFDdkQsT0FBTyxlQUFlLENBQUM7UUFDckIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUM7UUFDbkYsY0FBYztLQUNmLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLHVCQUF1QixDQUFDLGFBQXFCLEVBQUUsY0FBOEI7SUFDcEYsY0FBYyxDQUFDLFVBQVUsQ0FB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RSxLQUFLLEVBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDekYsTUFBTSxZQUFZLEdBQUc7UUFDbkIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNoRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDakMsR0FBRyxzQ0FBc0M7UUFDekMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0tBQzdCLENBQUM7SUFDRixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUksYUFBaUMsRUFBRSxPQUl6RTtJQUNDLE1BQU0sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxHQUFHLE9BQU8sQ0FBQztJQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7SUFDbEYsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgSW1wb3J0ZWROZ01vZHVsZVByb3ZpZGVycywgaW1wb3J0UHJvdmlkZXJzRnJvbSwgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVSZWYsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgUmVuZGVyZXIyLCBTdGF0aWNQcm92aWRlciwgVHlwZSwgybVpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uIGFzIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24sIMm1aXNQcm9taXNlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgybVUUkFOU0lUSU9OX0lEfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7cGxhdGZvcm1EeW5hbWljU2VydmVyLCBwbGF0Zm9ybVNlcnZlciwgU2VydmVyTW9kdWxlfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7VFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlN9IGZyb20gJy4vdHJhbnNmZXJfc3RhdGUnO1xuXG5pbnRlcmZhY2UgUGxhdGZvcm1PcHRpb25zIHtcbiAgZG9jdW1lbnQ/OiBzdHJpbmd8RG9jdW1lbnQ7XG4gIHVybD86IHN0cmluZztcbiAgcGxhdGZvcm1Qcm92aWRlcnM/OiBQcm92aWRlcltdO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGxhdGZvcm0oXG4gICAgcGxhdGZvcm1GYWN0b3J5OiAoZXh0cmFQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmLFxuICAgIG9wdGlvbnM6IFBsYXRmb3JtT3B0aW9ucyk6IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZXh0cmFQcm92aWRlcnMgPSBvcHRpb25zLnBsYXRmb3JtUHJvdmlkZXJzID8/IFtdO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBgbmctc2VydmVyLWNvbnRleHRgIGF0dHJpYnV0ZSB0byBob3N0IGVsZW1lbnRzIG9mIGFsbCBib290c3RyYXBwZWQgY29tcG9uZW50c1xuICogd2l0aGluIGEgZ2l2ZW4gYXBwbGljYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGFwcGVuZFNlcnZlckNvbnRleHRJbmZvKHNlcnZlckNvbnRleHQ6IHN0cmluZywgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gIGFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnRSZWYgPT4ge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gY29tcG9uZW50UmVmLmluamVjdG9yLmdldChSZW5kZXJlcjIpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICduZy1zZXJ2ZXItY29udGV4dCcsIHNlcnZlckNvbnRleHQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9yZW5kZXI8VD4oXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtUmVmLFxuICAgIGJvb3RzdHJhcFByb21pc2U6IFByb21pc2U8TmdNb2R1bGVSZWY8VD58QXBwbGljYXRpb25SZWY+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIGJvb3RzdHJhcFByb21pc2UudGhlbigobW9kdWxlT3JBcHBsaWNhdGlvblJlZikgPT4ge1xuICAgIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3IgPSBtb2R1bGVPckFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICAgIGNvbnN0IHRyYW5zaXRpb25JZCA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KMm1VFJBTlNJVElPTl9JRCwgbnVsbCk7XG4gICAgaWYgKCF0cmFuc2l0aW9uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgcmVuZGVyTW9kdWxlW0ZhY3RvcnldKCkgcmVxdWlyZXMgdGhlIHVzZSBvZiBCcm93c2VyTW9kdWxlLndpdGhTZXJ2ZXJUcmFuc2l0aW9uKCkgdG8gZW5zdXJlXG50aGUgc2VydmVyLXJlbmRlcmVkIGFwcCBjYW4gYmUgcHJvcGVybHkgYm9vdHN0cmFwcGVkIGludG8gYSBjbGllbnQgYXBwLmApO1xuICAgIH1cbiAgICBjb25zdCBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYgPSBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIGluc3RhbmNlb2YgQXBwbGljYXRpb25SZWYgP1xuICAgICAgICBtb2R1bGVPckFwcGxpY2F0aW9uUmVmIDpcbiAgICAgICAgZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICAgIGNvbnN0IHNlcnZlckNvbnRleHQgPVxuICAgICAgICBzYW5pdGl6ZVNlcnZlckNvbnRleHQoZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoU0VSVkVSX0NPTlRFWFQsIERFRkFVTFRfU0VSVkVSX0NPTlRFWFQpKTtcbiAgICByZXR1cm4gYXBwbGljYXRpb25SZWYuaXNTdGFibGUucGlwZSgoZmlyc3QoKGlzU3RhYmxlOiBib29sZWFuKSA9PiBpc1N0YWJsZSkpKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGFwcGVuZFNlcnZlckNvbnRleHRJbmZvKHNlcnZlckNvbnRleHQsIGFwcGxpY2F0aW9uUmVmKTtcblxuICAgICAgICAgIGNvbnN0IHBsYXRmb3JtU3RhdGUgPSBwbGF0Zm9ybS5pbmplY3Rvci5nZXQoUGxhdGZvcm1TdGF0ZSk7XG5cbiAgICAgICAgICBjb25zdCBhc3luY1Byb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuXG4gICAgICAgICAgLy8gUnVuIGFueSBCRUZPUkVfQVBQX1NFUklBTElaRUQgY2FsbGJhY2tzIGp1c3QgYmVmb3JlIHJlbmRlcmluZyB0byBzdHJpbmcuXG4gICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQkVGT1JFX0FQUF9TRVJJQUxJWkVELCBudWxsKTtcblxuICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tSZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIGlmICjJtWlzUHJvbWlzZShjYWxsYmFja1Jlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGluIFRTMy43LCBjYWxsYmFja1Jlc3VsdCBpcyB2b2lkLlxuICAgICAgICAgICAgICAgICAgYXN5bmNQcm9taXNlcy5wdXNoKGNhbGxiYWNrUmVzdWx0IGFzIGFueSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXhjZXB0aW9ucy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBwbGF0Zm9ybVN0YXRlLnJlbmRlclRvU3RyaW5nKCk7XG4gICAgICAgICAgICBwbGF0Zm9ybS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYXN5bmNQcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAgIC5hbGwoYXN5bmNQcm9taXNlcy5tYXAoYXN5bmNQcm9taXNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXN5bmNQcm9taXNlLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgIC50aGVuKGNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNwZWNpZmllcyB0aGUgdmFsdWUgdGhhdCBzaG91bGQgYmUgdXNlZCBpZiBubyBzZXJ2ZXIgY29udGV4dCB2YWx1ZSBoYXMgYmVlbiBwcm92aWRlZC5cbiAqL1xuY29uc3QgREVGQVVMVF9TRVJWRVJfQ09OVEVYVCA9ICdvdGhlcic7XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgdG9rZW4gdGhhdCBhbGxvd3MgcHJvdmlkaW5nIGV4dHJhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzZXJ2ZXIgY29udGV4dFxuICogKGUuZy4gd2hldGhlciBTU1Igb3IgU1NHIHdhcyB1c2VkKS4gVGhlIHZhbHVlIGlzIGEgc3RyaW5nIGFuZCBjaGFyYWN0ZXJzIG90aGVyXG4gKiB0aGFuIFthLXpBLVowLTlcXC1dIGFyZSByZW1vdmVkLiBTZWUgdGhlIGRlZmF1bHQgdmFsdWUgaW4gYERFRkFVTFRfU0VSVkVSX0NPTlRFWFRgIGNvbnN0LlxuICovXG5leHBvcnQgY29uc3QgU0VSVkVSX0NPTlRFWFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignU0VSVkVSX0NPTlRFWFQnKTtcblxuLyoqXG4gKiBTYW5pdGl6ZXMgcHJvdmlkZWQgc2VydmVyIGNvbnRleHQ6XG4gKiAtIHJlbW92ZXMgYWxsIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBhLXosIEEtWiwgMC05IGFuZCBgLWBcbiAqIC0gcmV0dXJucyBgb3RoZXJgIGlmIG5vdGhpbmcgaXMgcHJvdmlkZWQgb3IgdGhlIHN0cmluZyBpcyBlbXB0eSBhZnRlciBzYW5pdGl6YXRpb25cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVTZXJ2ZXJDb250ZXh0KHNlcnZlckNvbnRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGNvbnRleHQgPSBzZXJ2ZXJDb250ZXh0LnJlcGxhY2UoL1teYS16QS1aMC05XFwtXS9nLCAnJyk7XG4gIHJldHVybiBjb250ZXh0Lmxlbmd0aCA+IDAgPyBjb250ZXh0IDogREVGQVVMVF9TRVJWRVJfQ09OVEVYVDtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGFwcGxpY2F0aW9uIHVzaW5nIHByb3ZpZGVkIE5nTW9kdWxlIGFuZCBzZXJpYWxpemVzIHRoZSBwYWdlIGNvbnRlbnQgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBtb2R1bGVUeXBlIEEgcmVmZXJlbmNlIHRvIGFuIE5nTW9kdWxlIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIGJvb3RzdHJhcC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJlbmRlciBvcGVyYXRpb246XG4gKiAgLSBgZG9jdW1lbnRgIC0gdGhlIGRvY3VtZW50IG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgZWl0aGVyIGFzIGFuIEhUTUwgc3RyaW5nIG9yXG4gKiAgICAgICAgICAgICAgICAgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGBkb2N1bWVudGAgaW5zdGFuY2UuXG4gKiAgLSBgdXJsYCAtIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYGV4dHJhUHJvdmlkZXJzYCAtIHNldCBvZiBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1vZHVsZTxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+LCBvcHRpb25zOiB7XG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50LFxuICB1cmw/OiBzdHJpbmcsXG4gIGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSxcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgZXh0cmFQcm92aWRlcnM6IHBsYXRmb3JtUHJvdmlkZXJzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtID0gX2dldFBsYXRmb3JtKHBsYXRmb3JtRHluYW1pY1NlcnZlciwge2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzfSk7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUobW9kdWxlVHlwZSkpO1xufVxuXG4vKipcbiAqIEJvb3RzdHJhcHMgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBhbmQgcmVuZGVycyBpdCB0byBhIHN0cmluZy5cbiAqXG4gKiBOb3RlOiB0aGUgcm9vdCBjb21wb25lbnQgcGFzc2VkIGludG8gdGhpcyBmdW5jdGlvbiAqbXVzdCogYmUgYSBzdGFuZGFsb25lIG9uZSAoc2hvdWxkIGhhdmUgdGhlXG4gKiBgc3RhbmRhbG9uZTogdHJ1ZWAgZmxhZyBpbiB0aGUgYEBDb21wb25lbnRgIGRlY29yYXRvciBjb25maWcpLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogICB0ZW1wbGF0ZTogJ0hlbGxvIHdvcmxkISdcbiAqIH0pXG4gKiBjbGFzcyBSb290Q29tcG9uZW50IHt9XG4gKlxuICogY29uc3Qgb3V0cHV0OiBzdHJpbmcgPSBhd2FpdCByZW5kZXJBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7YXBwSWQ6ICdzZXJ2ZXItYXBwJ30pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHJvb3RDb21wb25lbnQgQSByZWZlcmVuY2UgdG8gYSBTdGFuZGFsb25lIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJlbmRlciBvcGVyYXRpb246XG4gKiAgLSBgYXBwSWRgIC0gYSBzdHJpbmcgaWRlbnRpZmllciBvZiB0aGlzIGFwcGxpY2F0aW9uLiBUaGUgYXBwSWQgaXMgdXNlZCB0byBwcmVmaXggYWxsXG4gKiAgICAgICAgICAgICAgc2VydmVyLWdlbmVyYXRlZCBzdHlsaW5ncyBhbmQgc3RhdGUga2V5cyBvZiB0aGUgYXBwbGljYXRpb24gaW4gVHJhbnNmZXJTdGF0ZVxuICogICAgICAgICAgICAgIHVzZS1jYXNlcy5cbiAqICAtIGBkb2N1bWVudGAgLSB0aGUgZG9jdW1lbnQgb2YgdGhlIHBhZ2UgdG8gcmVuZGVyLCBlaXRoZXIgYXMgYW4gSFRNTCBzdHJpbmcgb3JcbiAqICAgICAgICAgICAgICAgICBhcyBhIHJlZmVyZW5jZSB0byB0aGUgYGRvY3VtZW50YCBpbnN0YW5jZS5cbiAqICAtIGB1cmxgIC0gdGhlIFVSTCBmb3IgdGhlIGN1cnJlbnQgcmVuZGVyIHJlcXVlc3QuXG4gKiAgLSBgcHJvdmlkZXJzYCAtIHNldCBvZiBhcHBsaWNhdGlvbiBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYHBsYXRmb3JtUHJvdmlkZXJzYCAtIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIEEgUHJvbWlzZSwgdGhhdCByZXR1cm5zIHNlcmlhbGl6ZWQgKHRvIGEgc3RyaW5nKSByZW5kZXJlZCBwYWdlLCBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBcHBsaWNhdGlvbjxUPihyb290Q29tcG9uZW50OiBUeXBlPFQ+LCBvcHRpb25zOiB7XG4gIGFwcElkOiBzdHJpbmcsXG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50LFxuICB1cmw/OiBzdHJpbmcsXG4gIHByb3ZpZGVycz86IEFycmF5PFByb3ZpZGVyfEltcG9ydGVkTmdNb2R1bGVQcm92aWRlcnM+LFxuICBwbGF0Zm9ybVByb3ZpZGVycz86IFByb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzLCBhcHBJZH0gPSBvcHRpb25zO1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVyc30pO1xuICBjb25zdCBhcHBQcm92aWRlcnMgPSBbXG4gICAgaW1wb3J0UHJvdmlkZXJzRnJvbShCcm93c2VyTW9kdWxlLndpdGhTZXJ2ZXJUcmFuc2l0aW9uKHthcHBJZH0pKSxcbiAgICBpbXBvcnRQcm92aWRlcnNGcm9tKFNlcnZlck1vZHVsZSksXG4gICAgLi4uVFJBTlNGRVJfU1RBVEVfU0VSSUFMSVpBVElPTl9QUk9WSURFUlMsXG4gICAgLi4uKG9wdGlvbnMucHJvdmlkZXJzID8/IFtdKSxcbiAgXTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm0sIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24oe3Jvb3RDb21wb25lbnQsIGFwcFByb3ZpZGVyc30pKTtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGFwcGxpY2F0aW9uIHVzaW5nIHByb3ZpZGVkIHtAbGluayBOZ01vZHVsZUZhY3Rvcnl9IGFuZCBzZXJpYWxpemVzIHRoZSBwYWdlIGNvbnRlbnRcbiAqIHRvIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gbW9kdWxlRmFjdG9yeSBBbiBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIE5nTW9kdWxlRmFjdG9yeX0gdGhhdCBzaG91bGQgYmUgdXNlZCBmb3JcbiAqICAgICBib290c3RyYXAuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBleHRyYVByb3ZpZGVyc2AgLSBzZXQgb2YgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIFRoaXMgc3ltYm9sIGlzIG5vIGxvbmdlciBuZWNlc3NhcnkgYXMgb2YgQW5ndWxhciB2MTMuXG4gKiBVc2Uge0BsaW5rIHJlbmRlck1vZHVsZX0gQVBJIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNb2R1bGVGYWN0b3J5PFQ+KG1vZHVsZUZhY3Rvcnk6IE5nTW9kdWxlRmFjdG9yeTxUPiwgb3B0aW9uczoge1xuICBkb2N1bWVudD86IHN0cmluZyxcbiAgdXJsPzogc3RyaW5nLFxuICBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge2RvY3VtZW50LCB1cmwsIGV4dHJhUHJvdmlkZXJzOiBwbGF0Zm9ybVByb3ZpZGVyc30gPSBvcHRpb25zO1xuICBjb25zdCBwbGF0Zm9ybSA9IF9nZXRQbGF0Zm9ybShwbGF0Zm9ybVNlcnZlciwge2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzfSk7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtLCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGVGYWN0b3J5KG1vZHVsZUZhY3RvcnkpKTtcbn1cbiJdfQ==