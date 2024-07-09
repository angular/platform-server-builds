/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, ApplicationRef, CSP_NONCE, InjectionToken, Renderer2, ɵannotateForHydration as annotateForHydration, ɵIS_HYDRATION_DOM_REUSE_ENABLED as IS_HYDRATION_DOM_REUSE_ENABLED, ɵSSR_CONTENT_INTEGRITY_MARKER as SSR_CONTENT_INTEGRITY_MARKER, ɵwhenStable as whenStable, } from '@angular/core';
import { PlatformState } from './platform_state';
import { platformServer } from './server';
import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG } from './tokens';
import { createScript } from './transfer_state';
import { runAndMeasurePerf } from './profiler';
/**
 * Event dispatch (JSAction) script is inlined into the HTML by the build
 * process to avoid extra blocking request on a page. The script looks like this:
 * ```
 * <script type="text/javascript" id="ng-event-dispatch-contract">...</script>
 * ```
 * This const represents the "id" attribute value.
 */
export const EVENT_DISPATCH_SCRIPT_ID = 'ng-event-dispatch-contract';
/**
 * Creates an instance of a server platform (with or without JIT compiler support
 * depending on the `ngJitMode` global const value), using provided options.
 */
function createServerPlatform(options) {
    const extraProviders = options.platformProviders ?? [];
    return platformServer([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders,
    ]);
}
/**
 * Finds and returns inlined event dispatch script if it exists.
 * See the `EVENT_DISPATCH_SCRIPT_ID` const docs for additional info.
 */
function findEventDispatchScript(doc) {
    return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
/**
 * Removes inlined event dispatch script if it exists.
 * See the `EVENT_DISPATCH_SCRIPT_ID` const docs for additional info.
 */
function removeEventDispatchScript(doc) {
    findEventDispatchScript(doc)?.remove();
}
/**
 * Annotate nodes for hydration and remove event dispatch script when not needed.
 */
function prepareForHydration(platformState, applicationRef) {
    const environmentInjector = applicationRef.injector;
    const doc = platformState.getDocument();
    if (!environmentInjector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
        // Hydration is diabled, remove inlined event dispatch script.
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
        return;
    }
    appendSsrContentIntegrityMarker(doc);
    const eventTypesToReplay = annotateForHydration(applicationRef, doc);
    if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) {
        insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
    }
    else {
        // No events to replay, we should remove inlined event dispatch script
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
    }
}
/**
 * Creates a marker comment node and append it into the `<body>`.
 * Some CDNs have mechanisms to remove all comment node from HTML.
 * This behaviour breaks hydration, so we'll detect on the client side if this
 * marker comment is still available or else throw an error
 */
function appendSsrContentIntegrityMarker(doc) {
    // Adding a ng hydration marker comment
    const comment = doc.createComment(SSR_CONTENT_INTEGRITY_MARKER);
    doc.body.firstChild
        ? doc.body.insertBefore(comment, doc.body.firstChild)
        : doc.body.append(comment);
}
/**
 * Adds the `ng-server-context` attribute to host elements of all bootstrapped components
 * within a given application.
 */
function appendServerContextInfo(applicationRef) {
    const injector = applicationRef.injector;
    let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
    applicationRef.components.forEach((componentRef) => {
        const renderer = componentRef.injector.get(Renderer2);
        const element = componentRef.location.nativeElement;
        if (element) {
            renderer.setAttribute(element, 'ng-server-context', serverContext);
        }
    });
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
    const { regular, capture } = eventTypesToReplay;
    const eventDispatchScript = findEventDispatchScript(doc);
    if (eventDispatchScript) {
        // This is defined in packages/core/primitives/event-dispatch/contract_binary.ts
        const replayScriptContents = `window.__jsaction_bootstrap('ngContracts', document.body, ${JSON.stringify(appId)}, ${JSON.stringify(Array.from(regular))}${capture.size ? ',' + JSON.stringify(Array.from(capture)) : ''});`;
        const replayScript = createScript(doc, replayScriptContents, nonce);
        // Insert replay script right after inlined event dispatch script, since it
        // relies on `__jsaction_bootstrap` to be defined in the global scope.
        eventDispatchScript.after(replayScript);
    }
}
async function _render(platformRef, applicationRef) {
    // Block until application is stable.
    await whenStable(applicationRef);
    const platformState = platformRef.injector.get(PlatformState);
    prepareForHydration(platformState, applicationRef);
    // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
    const environmentInjector = applicationRef.injector;
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
    // Destroy the application in a macrotask, this allows pending promises to be settled and errors
    // to be surfaced to the users.
    await new Promise((resolve) => {
        setTimeout(() => {
            platformRef.destroy();
            resolve();
        }, 0);
    });
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
 */
export async function renderApplication(bootstrap, options) {
    return runAndMeasurePerf('renderApplication', async () => {
        const platformRef = createServerPlatform(options);
        const applicationRef = await bootstrap();
        return _render(platformRef, applicationRef);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxNQUFNLEVBQ04sY0FBYyxFQUNkLFNBQVMsRUFDVCxjQUFjLEVBR2QsU0FBUyxFQUdULHFCQUFxQixJQUFJLG9CQUFvQixFQUM3QywrQkFBK0IsSUFBSSw4QkFBOEIsRUFDakUsNkJBQTZCLElBQUksNEJBQTRCLEVBQzdELFdBQVcsSUFBSSxVQUFVLEdBQzFCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUU3Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsNEJBQTRCLENBQUM7QUFRckU7OztHQUdHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxPQUF3QjtJQUNwRCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO0lBQ3ZELE9BQU8sY0FBYyxDQUFDO1FBQ3BCLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFDO1FBQ25GLGNBQWM7S0FDZixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyx1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QztJQUM5QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBQX0lELFxuICBBcHBsaWNhdGlvblJlZixcbiAgQ1NQX05PTkNFLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgUGxhdGZvcm1SZWYsXG4gIFByb3ZpZGVyLFxuICBSZW5kZXJlcjIsXG4gIFN0YXRpY1Byb3ZpZGVyLFxuICBUeXBlLFxuICDJtWFubm90YXRlRm9ySHlkcmF0aW9uIGFzIGFubm90YXRlRm9ySHlkcmF0aW9uLFxuICDJtUlTX0hZRFJBVElPTl9ET01fUkVVU0VfRU5BQkxFRCBhcyBJU19IWURSQVRJT05fRE9NX1JFVVNFX0VOQUJMRUQsXG4gIMm1U1NSX0NPTlRFTlRfSU5URUdSSVRZX01BUktFUiBhcyBTU1JfQ09OVEVOVF9JTlRFR1JJVFlfTUFSS0VSLFxuICDJtXdoZW5TdGFibGUgYXMgd2hlblN0YWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UGxhdGZvcm1TdGF0ZX0gZnJvbSAnLi9wbGF0Zm9ybV9zdGF0ZSc7XG5pbXBvcnQge3BsYXRmb3JtU2VydmVyfSBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQge0JFRk9SRV9BUFBfU0VSSUFMSVpFRCwgSU5JVElBTF9DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7Y3JlYXRlU2NyaXB0fSBmcm9tICcuL3RyYW5zZmVyX3N0YXRlJztcbmltcG9ydCB7cnVuQW5kTWVhc3VyZVBlcmZ9IGZyb20gJy4vcHJvZmlsZXInO1xuXG4vKipcbiAqIEV2ZW50IGRpc3BhdGNoIChKU0FjdGlvbikgc2NyaXB0IGlzIGlubGluZWQgaW50byB0aGUgSFRNTCBieSB0aGUgYnVpbGRcbiAqIHByb2Nlc3MgdG8gYXZvaWQgZXh0cmEgYmxvY2tpbmcgcmVxdWVzdCBvbiBhIHBhZ2UuIFRoZSBzY3JpcHQgbG9va3MgbGlrZSB0aGlzOlxuICogYGBgXG4gKiA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBpZD1cIm5nLWV2ZW50LWRpc3BhdGNoLWNvbnRyYWN0XCI+Li4uPC9zY3JpcHQ+XG4gKiBgYGBcbiAqIFRoaXMgY29uc3QgcmVwcmVzZW50cyB0aGUgXCJpZFwiIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX0RJU1BBVENIX1NDUklQVF9JRCA9ICduZy1ldmVudC1kaXNwYXRjaC1jb250cmFjdCc7XG5cbmludGVyZmFjZSBQbGF0Zm9ybU9wdGlvbnMge1xuICBkb2N1bWVudD86IHN0cmluZyB8IERvY3VtZW50O1xuICB1cmw/OiBzdHJpbmc7XG4gIHBsYXRmb3JtUHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgc2VydmVyIHBsYXRmb3JtICh3aXRoIG9yIHdpdGhvdXQgSklUIGNvbXBpbGVyIHN1cHBvcnRcbiAqIGRlcGVuZGluZyBvbiB0aGUgYG5nSml0TW9kZWAgZ2xvYmFsIGNvbnN0IHZhbHVlKSwgdXNpbmcgcHJvdmlkZWQgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU2VydmVyUGxhdGZvcm0ob3B0aW9uczogUGxhdGZvcm1PcHRpb25zKTogUGxhdGZvcm1SZWYge1xuICBjb25zdCBleHRyYVByb3ZpZGVycyA9IG9wdGlvbnMucGxhdGZvcm1Qcm92aWRlcnMgPz8gW107XG4gIHJldHVybiBwbGF0Zm9ybVNlcnZlcihbXG4gICAge3Byb3ZpZGU6IElOSVRJQUxfQ09ORklHLCB1c2VWYWx1ZToge2RvY3VtZW50OiBvcHRpb25zLmRvY3VtZW50LCB1cmw6IG9wdGlvbnMudXJsfX0sXG4gICAgZXh0cmFQcm92aWRlcnMsXG4gIF0pO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIGlubGluZWQgZXZlbnQgZGlzcGF0Y2ggc2NyaXB0IGlmIGl0IGV4aXN0cy5cbiAqIFNlZSB0aGUgYEVWRU5UX0RJU1BBVENIX1NDUklQVF9JRGAgY29uc3QgZG9jcyBmb3IgYWRkaXRpb25hbCBpbmZvLlxuICovXG5mdW5jdGlvbiBmaW5kRXZlbnREaXNwYXRjaFNjcmlwdChkb2M6IERvY3VtZW50KSB7XG4gIHJldHVybiBkb2MuZ2V0RWxlbWVudEJ5SWQoRVZFTlRfRElTUEFUQ0hfU0NSSVBUX0lEKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGlubGluZWQgZXZlbnQgZGlzcGF0Y2ggc2NyaXB0IGlmIGl0IGV4aXN0cy5cbiAqIFNlZSB0aGUgYEVWRU5UX0RJU1BBVENIX1NDUklQVF9JRGAgY29uc3QgZG9jcyBmb3IgYWRkaXRpb25hbCBpbmZvLlxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudERpc3BhdGNoU2NyaXB0KGRvYzogRG9jdW1lbnQpIHtcbiAgZmluZEV2ZW50RGlzcGF0Y2hTY3JpcHQoZG9jKT8ucmVtb3ZlKCk7XG59XG5cbi8qKlxuICogQW5ub3RhdGUgbm9kZXMgZm9yIGh5ZHJhdGlvbiBhbmQgcmVtb3ZlIGV2ZW50IGRpc3BhdGNoIHNjcmlwdCB3aGVuIG5vdCBuZWVkZWQuXG4gKi9cbmZ1bmN0aW9uIHByZXBhcmVGb3JIeWRyYXRpb24ocGxhdGZvcm1TdGF0ZTogUGxhdGZvcm1TdGF0ZSwgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKTogdm9pZCB7XG4gIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3IgPSBhcHBsaWNhdGlvblJlZi5pbmplY3RvcjtcbiAgY29uc3QgZG9jID0gcGxhdGZvcm1TdGF0ZS5nZXREb2N1bWVudCgpO1xuXG4gIGlmICghZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoSVNfSFlEUkFUSU9OX0RPTV9SRVVTRV9FTkFCTEVELCBmYWxzZSkpIHtcbiAgICAvLyBIeWRyYXRpb24gaXMgZGlhYmxlZCwgcmVtb3ZlIGlubGluZWQgZXZlbnQgZGlzcGF0Y2ggc2NyaXB0LlxuICAgIC8vICh3aGljaCB3YXMgaW5qZWN0ZWQgYnkgdGhlIGJ1aWxkIHByb2Nlc3MpIGZyb20gdGhlIEhUTUwuXG4gICAgcmVtb3ZlRXZlbnREaXNwYXRjaFNjcmlwdChkb2MpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXBwZW5kU3NyQ29udGVudEludGVncml0eU1hcmtlcihkb2MpO1xuXG4gIGNvbnN0IGV2ZW50VHlwZXNUb1JlcGxheSA9IGFubm90YXRlRm9ySHlkcmF0aW9uKGFwcGxpY2F0aW9uUmVmLCBkb2MpO1xuICBpZiAoZXZlbnRUeXBlc1RvUmVwbGF5LnJlZ3VsYXIuc2l6ZSB8fCBldmVudFR5cGVzVG9SZXBsYXkuY2FwdHVyZS5zaXplKSB7XG4gICAgaW5zZXJ0RXZlbnRSZWNvcmRTY3JpcHQoXG4gICAgICBlbnZpcm9ubWVudEluamVjdG9yLmdldChBUFBfSUQpLFxuICAgICAgZG9jLFxuICAgICAgZXZlbnRUeXBlc1RvUmVwbGF5LFxuICAgICAgZW52aXJvbm1lbnRJbmplY3Rvci5nZXQoQ1NQX05PTkNFLCBudWxsKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vIGV2ZW50cyB0byByZXBsYXksIHdlIHNob3VsZCByZW1vdmUgaW5saW5lZCBldmVudCBkaXNwYXRjaCBzY3JpcHRcbiAgICAvLyAod2hpY2ggd2FzIGluamVjdGVkIGJ5IHRoZSBidWlsZCBwcm9jZXNzKSBmcm9tIHRoZSBIVE1MLlxuICAgIHJlbW92ZUV2ZW50RGlzcGF0Y2hTY3JpcHQoZG9jKTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXJrZXIgY29tbWVudCBub2RlIGFuZCBhcHBlbmQgaXQgaW50byB0aGUgYDxib2R5PmAuXG4gKiBTb21lIENETnMgaGF2ZSBtZWNoYW5pc21zIHRvIHJlbW92ZSBhbGwgY29tbWVudCBub2RlIGZyb20gSFRNTC5cbiAqIFRoaXMgYmVoYXZpb3VyIGJyZWFrcyBoeWRyYXRpb24sIHNvIHdlJ2xsIGRldGVjdCBvbiB0aGUgY2xpZW50IHNpZGUgaWYgdGhpc1xuICogbWFya2VyIGNvbW1lbnQgaXMgc3RpbGwgYXZhaWxhYmxlIG9yIGVsc2UgdGhyb3cgYW4gZXJyb3JcbiAqL1xuZnVuY3Rpb24gYXBwZW5kU3NyQ29udGVudEludGVncml0eU1hcmtlcihkb2M6IERvY3VtZW50KSB7XG4gIC8vIEFkZGluZyBhIG5nIGh5ZHJhdGlvbiBtYXJrZXIgY29tbWVudFxuICBjb25zdCBjb21tZW50ID0gZG9jLmNyZWF0ZUNvbW1lbnQoU1NSX0NPTlRFTlRfSU5URUdSSVRZX01BUktFUik7XG4gIGRvYy5ib2R5LmZpcnN0Q2hpbGRcbiAgICA/IGRvYy5ib2R5Lmluc2VydEJlZm9yZShjb21tZW50LCBkb2MuYm9keS5maXJzdENoaWxkKVxuICAgIDogZG9jLmJvZHkuYXBwZW5kKGNvbW1lbnQpO1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGBuZy1zZXJ2ZXItY29udGV4dGAgYXR0cmlidXRlIHRvIGhvc3QgZWxlbWVudHMgb2YgYWxsIGJvb3RzdHJhcHBlZCBjb21wb25lbnRzXG4gKiB3aXRoaW4gYSBnaXZlbiBhcHBsaWNhdGlvbi5cbiAqL1xuZnVuY3Rpb24gYXBwZW5kU2VydmVyQ29udGV4dEluZm8oYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gIGNvbnN0IGluamVjdG9yID0gYXBwbGljYXRpb25SZWYuaW5qZWN0b3I7XG4gIGxldCBzZXJ2ZXJDb250ZXh0ID0gc2FuaXRpemVTZXJ2ZXJDb250ZXh0KGluamVjdG9yLmdldChTRVJWRVJfQ09OVEVYVCwgREVGQVVMVF9TRVJWRVJfQ09OVEVYVCkpO1xuICBhcHBsaWNhdGlvblJlZi5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudFJlZikgPT4ge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gY29tcG9uZW50UmVmLmluamVjdG9yLmdldChSZW5kZXJlcjIpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICduZy1zZXJ2ZXItY29udGV4dCcsIHNlcnZlckNvbnRleHQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydEV2ZW50UmVjb3JkU2NyaXB0KFxuICBhcHBJZDogc3RyaW5nLFxuICBkb2M6IERvY3VtZW50LFxuICBldmVudFR5cGVzVG9SZXBsYXk6IHtyZWd1bGFyOiBTZXQ8c3RyaW5nPjsgY2FwdHVyZTogU2V0PHN0cmluZz59LFxuICBub25jZTogc3RyaW5nIHwgbnVsbCxcbik6IHZvaWQge1xuICBjb25zdCB7cmVndWxhciwgY2FwdHVyZX0gPSBldmVudFR5cGVzVG9SZXBsYXk7XG4gIGNvbnN0IGV2ZW50RGlzcGF0Y2hTY3JpcHQgPSBmaW5kRXZlbnREaXNwYXRjaFNjcmlwdChkb2MpO1xuICBpZiAoZXZlbnREaXNwYXRjaFNjcmlwdCkge1xuICAgIC8vIFRoaXMgaXMgZGVmaW5lZCBpbiBwYWNrYWdlcy9jb3JlL3ByaW1pdGl2ZXMvZXZlbnQtZGlzcGF0Y2gvY29udHJhY3RfYmluYXJ5LnRzXG4gICAgY29uc3QgcmVwbGF5U2NyaXB0Q29udGVudHMgPSBgd2luZG93Ll9fanNhY3Rpb25fYm9vdHN0cmFwKCduZ0NvbnRyYWN0cycsIGRvY3VtZW50LmJvZHksICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICBhcHBJZCxcbiAgICApfSwgJHtKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHJlZ3VsYXIpKX0ke1xuICAgICAgY2FwdHVyZS5zaXplID8gJywnICsgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShjYXB0dXJlKSkgOiAnJ1xuICAgIH0pO2A7XG5cbiAgICBjb25zdCByZXBsYXlTY3JpcHQgPSBjcmVhdGVTY3JpcHQoZG9jLCByZXBsYXlTY3JpcHRDb250ZW50cywgbm9uY2UpO1xuXG4gICAgLy8gSW5zZXJ0IHJlcGxheSBzY3JpcHQgcmlnaHQgYWZ0ZXIgaW5saW5lZCBldmVudCBkaXNwYXRjaCBzY3JpcHQsIHNpbmNlIGl0XG4gICAgLy8gcmVsaWVzIG9uIGBfX2pzYWN0aW9uX2Jvb3RzdHJhcGAgdG8gYmUgZGVmaW5lZCBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIGV2ZW50RGlzcGF0Y2hTY3JpcHQuYWZ0ZXIocmVwbGF5U2NyaXB0KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfcmVuZGVyKHBsYXRmb3JtUmVmOiBQbGF0Zm9ybVJlZiwgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgLy8gQmxvY2sgdW50aWwgYXBwbGljYXRpb24gaXMgc3RhYmxlLlxuICBhd2FpdCB3aGVuU3RhYmxlKGFwcGxpY2F0aW9uUmVmKTtcblxuICBjb25zdCBwbGF0Zm9ybVN0YXRlID0gcGxhdGZvcm1SZWYuaW5qZWN0b3IuZ2V0KFBsYXRmb3JtU3RhdGUpO1xuICBwcmVwYXJlRm9ySHlkcmF0aW9uKHBsYXRmb3JtU3RhdGUsIGFwcGxpY2F0aW9uUmVmKTtcblxuICAvLyBSdW4gYW55IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBjYWxsYmFja3MganVzdCBiZWZvcmUgcmVuZGVyaW5nIHRvIHN0cmluZy5cbiAgY29uc3QgZW52aXJvbm1lbnRJbmplY3RvciA9IGFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICBjb25zdCBjYWxsYmFja3MgPSBlbnZpcm9ubWVudEluamVjdG9yLmdldChCRUZPUkVfQVBQX1NFUklBTElaRUQsIG51bGwpO1xuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY29uc3QgYXN5bmNDYWxsYmFja3M6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjYWxsYmFja1Jlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgICAgIGlmIChjYWxsYmFja1Jlc3VsdCkge1xuICAgICAgICAgIGFzeW5jQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2tSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLlxuICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhc3luY0NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhc3luY0NhbGxiYWNrcykpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdyZWplY3RlZCcpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yaW5nIEJFRk9SRV9BUFBfU0VSSUFMSVpFRCBFeGNlcHRpb246ICcsIHJlc3VsdC5yZWFzb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kU2VydmVyQ29udGV4dEluZm8oYXBwbGljYXRpb25SZWYpO1xuICBjb25zdCBvdXRwdXQgPSBwbGF0Zm9ybVN0YXRlLnJlbmRlclRvU3RyaW5nKCk7XG5cbiAgLy8gRGVzdHJveSB0aGUgYXBwbGljYXRpb24gaW4gYSBtYWNyb3Rhc2ssIHRoaXMgYWxsb3dzIHBlbmRpbmcgcHJvbWlzZXMgdG8gYmUgc2V0dGxlZCBhbmQgZXJyb3JzXG4gIC8vIHRvIGJlIHN1cmZhY2VkIHRvIHRoZSB1c2Vycy5cbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBsYXRmb3JtUmVmLmRlc3Ryb3koKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9LCAwKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhlIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgbm8gc2VydmVyIGNvbnRleHQgdmFsdWUgaGFzIGJlZW4gcHJvdmlkZWQuXG4gKi9cbmNvbnN0IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQgPSAnb3RoZXInO1xuXG4vKipcbiAqIEFuIGludGVybmFsIHRva2VuIHRoYXQgYWxsb3dzIHByb3ZpZGluZyBleHRyYSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyIGNvbnRleHRcbiAqIChlLmcuIHdoZXRoZXIgU1NSIG9yIFNTRyB3YXMgdXNlZCkuIFRoZSB2YWx1ZSBpcyBhIHN0cmluZyBhbmQgY2hhcmFjdGVycyBvdGhlclxuICogdGhhbiBbYS16QS1aMC05XFwtXSBhcmUgcmVtb3ZlZC4gU2VlIHRoZSBkZWZhdWx0IHZhbHVlIGluIGBERUZBVUxUX1NFUlZFUl9DT05URVhUYCBjb25zdC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFUlZFUl9DT05URVhUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1NFUlZFUl9DT05URVhUJyk7XG5cbi8qKlxuICogU2FuaXRpemVzIHByb3ZpZGVkIHNlcnZlciBjb250ZXh0OlxuICogLSByZW1vdmVzIGFsbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gYS16LCBBLVosIDAtOSBhbmQgYC1gXG4gKiAtIHJldHVybnMgYG90aGVyYCBpZiBub3RoaW5nIGlzIHByb3ZpZGVkIG9yIHRoZSBzdHJpbmcgaXMgZW1wdHkgYWZ0ZXIgc2FuaXRpemF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplU2VydmVyQ29udGV4dChzZXJ2ZXJDb250ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBjb250ZXh0ID0gc2VydmVyQ29udGV4dC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcLV0vZywgJycpO1xuICByZXR1cm4gY29udGV4dC5sZW5ndGggPiAwID8gY29udGV4dCA6IERFRkFVTFRfU0VSVkVSX0NPTlRFWFQ7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBhcHBsaWNhdGlvbiB1c2luZyBwcm92aWRlZCBOZ01vZHVsZSBhbmQgc2VyaWFsaXplcyB0aGUgcGFnZSBjb250ZW50IHRvIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gbW9kdWxlVHlwZSBBIHJlZmVyZW5jZSB0byBhbiBOZ01vZHVsZSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciBib290c3RyYXAuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSByZW5kZXIgb3BlcmF0aW9uOlxuICogIC0gYGRvY3VtZW50YCAtIHRoZSBkb2N1bWVudCBvZiB0aGUgcGFnZSB0byByZW5kZXIsIGVpdGhlciBhcyBhbiBIVE1MIHN0cmluZyBvclxuICogICAgICAgICAgICAgICAgIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICogIC0gYHVybGAgLSB0aGUgVVJMIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqICAtIGBleHRyYVByb3ZpZGVyc2AgLSBzZXQgb2YgcGxhdGZvcm0gbGV2ZWwgcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCByZW5kZXIgcmVxdWVzdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJNb2R1bGU8VD4oXG4gIG1vZHVsZVR5cGU6IFR5cGU8VD4sXG4gIG9wdGlvbnM6IHtkb2N1bWVudD86IHN0cmluZyB8IERvY3VtZW50OyB1cmw/OiBzdHJpbmc7IGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXX0sXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7ZG9jdW1lbnQsIHVybCwgZXh0cmFQcm92aWRlcnM6IHBsYXRmb3JtUHJvdmlkZXJzfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHBsYXRmb3JtUmVmID0gY3JlYXRlU2VydmVyUGxhdGZvcm0oe2RvY3VtZW50LCB1cmwsIHBsYXRmb3JtUHJvdmlkZXJzfSk7XG4gIGNvbnN0IG1vZHVsZVJlZiA9IGF3YWl0IHBsYXRmb3JtUmVmLmJvb3RzdHJhcE1vZHVsZShtb2R1bGVUeXBlKTtcbiAgY29uc3QgYXBwbGljYXRpb25SZWYgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgcmV0dXJuIF9yZW5kZXIocGxhdGZvcm1SZWYsIGFwcGxpY2F0aW9uUmVmKTtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcnMgaXQgdG8gYSBzdHJpbmcuXG5cbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGJvb3RzdHJhcCA9ICgpID0+IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIGFwcENvbmZpZyk7XG4gKiBjb25zdCBvdXRwdXQ6IHN0cmluZyA9IGF3YWl0IHJlbmRlckFwcGxpY2F0aW9uKGJvb3RzdHJhcCk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYm9vdHN0cmFwIEEgbWV0aG9kIHRoYXQgd2hlbiBpbnZva2VkIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmV0dXJucyBhbiBgQXBwbGljYXRpb25SZWZgXG4gKiAgICAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJlbmRlciBvcGVyYXRpb246XG4gKiAgLSBgZG9jdW1lbnRgIC0gdGhlIGRvY3VtZW50IG9mIHRoZSBwYWdlIHRvIHJlbmRlciwgZWl0aGVyIGFzIGFuIEhUTUwgc3RyaW5nIG9yXG4gKiAgICAgICAgICAgICAgICAgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGBkb2N1bWVudGAgaW5zdGFuY2UuXG4gKiAgLSBgdXJsYCAtIHRoZSBVUkwgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICogIC0gYHBsYXRmb3JtUHJvdmlkZXJzYCAtIHRoZSBwbGF0Zm9ybSBsZXZlbCBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHJlbmRlciByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIEEgUHJvbWlzZSwgdGhhdCByZXR1cm5zIHNlcmlhbGl6ZWQgKHRvIGEgc3RyaW5nKSByZW5kZXJlZCBwYWdlLCBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlckFwcGxpY2F0aW9uPFQ+KFxuICBib290c3RyYXA6ICgpID0+IFByb21pc2U8QXBwbGljYXRpb25SZWY+LFxuICBvcHRpb25zOiB7ZG9jdW1lbnQ/OiBzdHJpbmcgfCBEb2N1bWVudDsgdXJsPzogc3RyaW5nOyBwbGF0Zm9ybVByb3ZpZGVycz86IFByb3ZpZGVyW119LFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIHJ1bkFuZE1lYXN1cmVQZXJmKCdyZW5kZXJBcHBsaWNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwbGF0Zm9ybVJlZiA9IGNyZWF0ZVNlcnZlclBsYXRmb3JtKG9wdGlvbnMpO1xuXG4gICAgY29uc3QgYXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXAoKTtcbiAgICByZXR1cm4gX3JlbmRlcihwbGF0Zm9ybVJlZiwgYXBwbGljYXRpb25SZWYpO1xuICB9KTtcbn1cbiJdfQ==