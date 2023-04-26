/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, InjectionToken, Renderer2, ɵannotateForHydration as annotateForHydration, ɵENABLED_SSR_FEATURES as ENABLED_SSR_FEATURES, ɵInitialRenderPendingTasks as InitialRenderPendingTasks, ɵIS_HYDRATION_DOM_REUSE_ENABLED as IS_HYDRATION_DOM_REUSE_ENABLED } from '@angular/core';
import { first } from 'rxjs/operators';
import { PlatformState } from './platform_state';
import { platformDynamicServer, platformServer } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
/**
 * Creates an instance of a server platform (with or without JIT compiler support
 * depending on the `ngJitMode` global const value), using provided options.
 */
function createServerPlatform(options) {
    const extraProviders = options.platformProviders ?? [];
    const platformFactory = (typeof ngJitMode === 'undefined' || ngJitMode) ? platformDynamicServer : platformServer;
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
async function _render(platformRef, applicationRef) {
    const environmentInjector = applicationRef.injector;
    const isStablePromise = applicationRef.isStable.pipe((first((isStable) => isStable))).toPromise();
    const pendingTasks = environmentInjector.get(InitialRenderPendingTasks);
    const pendingTasksPromise = pendingTasks.whenAllTasksComplete;
    // Block until application is stable.
    await Promise.allSettled([isStablePromise, pendingTasksPromise]);
    const platformState = platformRef.injector.get(PlatformState);
    if (applicationRef.injector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
        annotateForHydration(applicationRef, platformState.getDocument());
    }
    // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
    const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
    if (callbacks) {
        const asyncCallbacks = [];
        for (const callback of callbacks) {
            try {
                const callbackResult = callback();
                if (callbackResult) {
                    asyncCallbacks.push(callbackResult);
                }
            }
            catch (e) {
                // Ignore exceptions.
                console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
            }
        }
        if (asyncCallbacks.length) {
            for (const result of await Promise.allSettled(asyncCallbacks)) {
                if (result.status === 'rejected') {
                    console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', result.reason);
                }
            }
        }
    }
    appendServerContextInfo(applicationRef);
    const output = platformState.renderToString();
    platformRef.destroy();
    return output;
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
export async function renderModule(moduleType, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platformRef = createServerPlatform({ document, url, platformProviders });
    const moduleRef = await platformRef.bootstrapModule(moduleType);
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    return _render(platformRef, applicationRef);
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
export async function renderApplication(bootstrap, options) {
    const platformRef = createServerPlatform(options);
    const applicationRef = await bootstrap();
    return _render(platformRef, applicationRef);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUF5QixTQUFTLEVBQXdCLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLCtCQUErQixJQUFJLDhCQUE4QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9VLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBUS9EOzs7R0FHRztBQUNILFNBQVMsb0JBQW9CLENBQUMsT0FBd0I7SUFDcEQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztJQUN2RCxNQUFNLGVBQWUsR0FDakIsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDN0YsT0FBTyxlQUFlLENBQUM7UUFDckIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUM7UUFDbkYsY0FBYztLQUNmLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLHVC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Q0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGlCQUFpQixDQUFJLFNBQXdDLEVBQUUsT0FJcEY7SUFDQyxNQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxNQUFNLGNBQWMsR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFDO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIEluamVjdGlvblRva2VuLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFJlbmRlcmVyMiwgU3RhdGljUHJvdmlkZXIsIFR5cGUsIMm1YW5ub3RhdGVGb3JIeWRyYXRpb24gYXMgYW5ub3RhdGVGb3JIeWRyYXRpb24sIMm1RU5BQkxFRF9TU1JfRkVBVFVSRVMgYXMgRU5BQkxFRF9TU1JfRkVBVFVSRVMsIMm1SW5pdGlhbFJlbmRlclBlbmRpbmdUYXNrcyBhcyBJbml0aWFsUmVuZGVyUGVuZGluZ1Rhc2tzLCDJtUlTX0hZRFJBVElPTl9ET01fUkVVU0VfRU5BQkxFRCBhcyBJU19IWURSQVRJT05fRE9NX1JFVVNFX0VOQUJMRUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmaXJzdH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIsIHBsYXRmb3JtU2VydmVyfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuaW50ZXJmYWNlIFBsYXRmb3JtT3B0aW9ucyB7XG4gIGRvY3VtZW50Pzogc3RyaW5nfERvY3VtZW50O1xuICB1cmw/OiBzdHJpbmc7XG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgc2VydmVyIHBsYXRmb3JtICh3aXRoIG9yIHdpdGhvdXQgSklUIGNvbXBpbGVyIHN1cHBvcnRcbiAqIGRlcGVuZGluZyBvbiB0aGUgYG5nSml0TW9kZWAgZ2xvYmFsIGNvbnN0IHZhbHVlKSwgdXNpbmcgcHJvdmlkZWQgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU2VydmVyUGxhdGZvcm0ob3B0aW9uczogUGxhdGZvcm1PcHRpb25zKTogUGxhdGZvcm1SZWYge1xuICBjb25zdCBleHRyYVByb3ZpZGVycyA9IG9wdGlvbnMucGxhdGZvcm1Qcm92aWRlcnMgPz8gW107XG4gIGNvbnN0IHBsYXRmb3JtRmFjdG9yeSA9XG4gICAgICAodHlwZW9mIG5nSml0TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdKaXRNb2RlKSA/IHBsYXRmb3JtRHluYW1pY1NlcnZlciA6IHBsYXRmb3JtU2VydmVyO1xuICByZXR1cm4gcGxhdGZvcm1GYWN0b3J5KFtcbiAgICB7cHJvdmlkZTogSU5JVElBTF9DT05GSUcsIHVzZVZhbHVlOiB7ZG9jdW1lbnQ6IG9wdGlvbnMuZG9jdW1lbnQsIHVybDogb3B0aW9ucy51cmx9fSxcbiAgICBleHRyYVByb3ZpZGVyc1xuICBdKTtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBgbmctc2VydmVyLWNvbnRleHRgIGF0dHJpYnV0ZSB0byBob3N0IGVsZW1lbnRzIG9mIGFsbCBib290c3RyYXBwZWQgY29tcG9uZW50c1xuICogd2l0aGluIGEgZ2l2ZW4gYXBwbGljYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGFwcGVuZFNlcnZlckNvbnRleHRJbmZvKGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICBjb25zdCBpbmplY3RvciA9IGFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICBsZXQgc2VydmVyQ29udGV4dCA9IHNhbml0aXplU2VydmVyQ29udGV4dChpbmplY3Rvci5nZXQoU0VSVkVSX0NPTlRFWFQsIERFRkFVTFRfU0VSVkVSX0NPTlRFWFQpKTtcbiAgY29uc3QgZmVhdHVyZXMgPSBpbmplY3Rvci5nZXQoRU5BQkxFRF9TU1JfRkVBVFVSRVMpO1xuICBpZiAoZmVhdHVyZXMuc2l6ZSA+IDApIHtcbiAgICAvLyBBcHBlbmQgZmVhdHVyZXMgaW5mb3JtYXRpb24gaW50byB0aGUgc2VydmVyIGNvbnRleHQgdmFsdWUuXG4gICAgc2VydmVyQ29udGV4dCArPSBgfCR7QXJyYXkuZnJvbShmZWF0dXJlcykuam9pbignLCcpfWA7XG4gIH1cbiAgYXBwbGljYXRpb25SZWYuY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudFJlZiA9PiB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBjb21wb25lbnRSZWYuaW5qZWN0b3IuZ2V0KFJlbmRlcmVyMik7XG4gICAgY29uc3QgZWxlbWVudCA9IGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ25nLXNlcnZlci1jb250ZXh0Jywgc2VydmVyQ29udGV4dCk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3JlbmRlcihwbGF0Zm9ybVJlZjogUGxhdGZvcm1SZWYsIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3IgPSBhcHBsaWNhdGlvblJlZi5pbmplY3RvcjtcbiAgY29uc3QgaXNTdGFibGVQcm9taXNlID1cbiAgICAgIGFwcGxpY2F0aW9uUmVmLmlzU3RhYmxlLnBpcGUoKGZpcnN0KChpc1N0YWJsZTogYm9vbGVhbikgPT4gaXNTdGFibGUpKSkudG9Qcm9taXNlKCk7XG4gIGNvbnN0IHBlbmRpbmdUYXNrcyA9IGVudmlyb25tZW50SW5qZWN0b3IuZ2V0KEluaXRpYWxSZW5kZXJQZW5kaW5nVGFza3MpO1xuICBjb25zdCBwZW5kaW5nVGFza3NQcm9taXNlID0gcGVuZGluZ1Rhc2tzLndoZW5BbGxUYXNrc0NvbXBsZXRlO1xuXG4gIC8vIEJsb2NrIHVudGlsIGFwcGxpY2F0aW9uIGlzIHN0YWJsZS5cbiAgYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKFtpc1N0YWJsZVByb21pc2UsIHBlbmRpbmdUYXNrc1Byb21pc2VdKTtcblxuICBjb25zdCBwbGF0Zm9ybVN0YXRlID0gcGxhdGZvcm1SZWYuaW5qZWN0b3IuZ2V0KFBsYXRmb3JtU3RhdGUpO1xuICBpZiAoYXBwbGljYXRpb25SZWYuaW5qZWN0b3IuZ2V0KElTX0hZRFJBVElPTl9ET01fUkVVU0VfRU5BQkxFRCwgZmFsc2UpKSB7XG4gICAgYW5ub3RhdGVGb3JIeWRyYXRpb24oYXBwbGljYXRpb25SZWYsIHBsYXRmb3JtU3RhdGUuZ2V0RG9jdW1lbnQoKSk7XG4gIH1cblxuICAvLyBSdW4gYW55IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBjYWxsYmFja3MganVzdCBiZWZvcmUgcmVuZGVyaW5nIHRvIHN0cmluZy5cbiAgY29uc3QgY2FsbGJhY2tzID0gZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQkVGT1JFX0FQUF9TRVJJQUxJWkVELCBudWxsKTtcbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNvbnN0IGFzeW5jQ2FsbGJhY2tzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tSZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICBpZiAoY2FsbGJhY2tSZXN1bHQpIHtcbiAgICAgICAgICBhc3luY0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBJZ25vcmUgZXhjZXB0aW9ucy5cbiAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXN5bmNDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoYXN5bmNDYWxsYmFja3MpKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdJZ25vcmluZyBCRUZPUkVfQVBQX1NFUklBTElaRUQgRXhjZXB0aW9uOiAnLCByZXN1bHQucmVhc29uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFwcGVuZFNlcnZlckNvbnRleHRJbmZvKGFwcGxpY2F0aW9uUmVmKTtcbiAgY29uc3Qgb3V0cHV0ID0gcGxhdGZvcm1TdGF0ZS5yZW5kZXJUb1N0cmluZygpO1xuICBwbGF0Zm9ybVJlZi5kZXN0cm95KCk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhlIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgbm8gc2VydmVyIGNvbnRleHQgdmFsdWUgaGFzIGJlZW4gcHJvdmlkZWQuXG4gKi9cbmNvbnN0IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQgPSAnb3RoZXInO1xuXG4vKipcbiAqIEFuIGludGVybmFsIHRva2VuIHRoYXQgYWxsb3dzIHByb3ZpZGluZyBleHRyYSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyIGNvbnRleHRcbiAqIChlLmcuIHdoZXRoZXIgU1NSIG9yIFNTRyB3YXMgdXNlZCkuIFRoZSB2YWx1ZSBpcyBhIHN0cmluZyBhbmQgY2hhcmFjdGVycyBvdGhlclxuICogdGhhbiBbYS16QS1aMC05XFwtXSBhcmUgcmVtb3ZlZC4gU2VlIHRoZSBkZWZhdWx0IHZhbHVlIGluIGBERUZBVUxUX1NFUlZFUl9DT05URVhUYCBjb25zdC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFUlZFUl9DT05URVhUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1NFUlZFUl9DT05URVhUJyk7XG5cbi8qKlxuICogU2FuaXRpemVzIHByb3ZpZGVkIHNlcnZlciBjb250ZXh0OlxuICogLSByZW1vdmVzIGFsbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gYS16LCBBLVosIDAtOSBhbmQgYC1gXG4gKiAtIHJldHVybnMgYG90aGVyYCBpZiBub3RoaW5nIGlzIHByb3ZpZGVkIG9yIHRoZSBzdHJpbmcgaXMgZW1wdHkgYWZ0ZXIgc2FuaXRpemF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplU2VydmVyQ29udGV4dChzZXJ2ZXJDb250ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBjb250ZXh0ID0gc2VydmVyQ29udGV4dC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcLV0vZywgJycpO1xuICByZXR1cm4gY29udGV4dC5sZW5ndGggPiAwID8gY29udGV4dCA6IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQ7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBhcHBsaWNhdGlvbiB1c2luZyBwcm92aWRlZCBOZ01vZHVsZSBhbmQgc2VyaWFsaXplcyB0aGUgcGFnZSBjb250ZW50IHRvIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gbW9kdWxlVHlwZSBBIHJlZmVyZW5jZSB0byBhbiBOZ01vZHVsZSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciBib290c3RyYXAuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBleHRyYVByb3ZpZGVyc2AgLSBzZXQgb2YgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJNb2R1bGU8VD4obW9kdWxlVHlwZTogVHlwZTxUPiwgb3B0aW9uczoge1xuICBkb2N1bWVudD86IHN0cmluZ3xEb2N1bWVudCxcbiAgdXJsPzogc3RyaW5nLFxuICBleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge2RvY3VtZW50LCB1cmwsIGV4dHJhUHJvdmlkZXJzOiBwbGF0Zm9ybVByb3ZpZGVyc30gPSBvcHRpb25zO1xuICBjb25zdCBwbGF0Zm9ybVJlZiA9IGNyZWF0ZVNlcnZlclBsYXRmb3JtKHtkb2N1bWVudCwgdXJsLCBwbGF0Zm9ybVByb3ZpZGVyc30pO1xuICBjb25zdCBtb2R1bGVSZWYgPSBhd2FpdCBwbGF0Zm9ybVJlZi5ib290c3RyYXBNb2R1bGUobW9kdWxlVHlwZSk7XG4gIGNvbnN0IGFwcGxpY2F0aW9uUmVmID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gIHJldHVybiBfcmVuZGVyKHBsYXRmb3JtUmVmLCBhcHBsaWNhdGlvblJlZik7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGl0IHRvIGEgc3RyaW5nLlxuXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBib290c3RyYXAgPSAoKSA9PiBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCBhcHBDb25maWcpO1xuICogY29uc3Qgb3V0cHV0OiBzdHJpbmcgPSBhd2FpdCByZW5kZXJBcHBsaWNhdGlvbihib290c3RyYXApO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGJvb3RzdHJhcCBBIG1ldGhvZCB0aGF0IHdoZW4gaW52b2tlZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYFxuICogICAgIGluc3RhbmNlIG9uY2UgcmVzb2x2ZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBwbGF0Zm9ybVByb3ZpZGVyc2AgLSB0aGUgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyBBIFByb21pc2UsIHRoYXQgcmV0dXJucyBzZXJpYWxpemVkICh0byBhIHN0cmluZykgcmVuZGVyZWQgcGFnZSwgb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVyQXBwbGljYXRpb248VD4oYm9vdHN0cmFwOiAoKSA9PiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiwgb3B0aW9uczoge1xuICBkb2N1bWVudD86IHN0cmluZ3xEb2N1bWVudCxcbiAgdXJsPzogc3RyaW5nLFxuICBwbGF0Zm9ybVByb3ZpZGVycz86IFByb3ZpZGVyW10sXG59KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgcGxhdGZvcm1SZWYgPSBjcmVhdGVTZXJ2ZXJQbGF0Zm9ybShvcHRpb25zKTtcbiAgY29uc3QgYXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXAoKTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm1SZWYsIGFwcGxpY2F0aW9uUmVmKTtcbn1cbiJdfQ==