/**
 * @license Angular v19.2.7+sha-b557618
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { PLATFORM_SERVER_PROVIDERS, PlatformState, BEFORE_APP_SERIALIZED, platformServer, INITIAL_CONFIG, createScript } from './server-BPmC12ZL.mjs';
export { ServerModule, ENABLE_DOM_EMULATION as ɵENABLE_DOM_EMULATION, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS } from './server-BPmC12ZL.mjs';
import { makeEnvironmentProviders, InjectionToken, ɵstartMeasuring as _startMeasuring, ɵstopMeasuring as _stopMeasuring, ApplicationRef, ɵIS_HYDRATION_DOM_REUSE_ENABLED as _IS_HYDRATION_DOM_REUSE_ENABLED, ɵannotateForHydration as _annotateForHydration, CSP_NONCE, APP_ID, Renderer2, ɵSSR_CONTENT_INTEGRITY_MARKER as _SSR_CONTENT_INTEGRITY_MARKER, Version } from '@angular/core';
import '@angular/common';
import '@angular/platform-browser';
import '@angular/common/http';
import 'rxjs';

/**
 * Sets up providers necessary to enable server rendering functionality for the application.
 *
 * @usageNotes
 *
 * Basic example of how you can add server support to your application:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideServerRendering()]
 * });
 * ```
 *
 * @publicApi
 * @returns A set of providers to setup the server.
 */
function provideServerRendering() {
    if (typeof ngServerMode === 'undefined') {
        globalThis['ngServerMode'] = true;
    }
    return makeEnvironmentProviders([...PLATFORM_SERVER_PROVIDERS]);
}

/**
 * Event dispatch (JSAction) script is inlined into the HTML by the build
 * process to avoid extra blocking request on a page. The script looks like this:
 * ```html
 * <script type="text/javascript" id="ng-event-dispatch-contract">...</script>
 * ```
 * This const represents the "id" attribute value.
 */
const EVENT_DISPATCH_SCRIPT_ID = 'ng-event-dispatch-contract';
/**
 * Creates an instance of a server platform (with or without JIT compiler support
 * depending on the `ngJitMode` global const value), using provided options.
 */
function createServerPlatform(options) {
    const extraProviders = options.platformProviders ?? [];
    const measuringLabel = 'createServerPlatform';
    _startMeasuring(measuringLabel);
    const platform = platformServer([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders,
    ]);
    _stopMeasuring(measuringLabel);
    return platform;
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
    const measuringLabel = 'prepareForHydration';
    _startMeasuring(measuringLabel);
    const environmentInjector = applicationRef.injector;
    const doc = platformState.getDocument();
    if (!environmentInjector.get(_IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
        // Hydration is diabled, remove inlined event dispatch script.
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
        return;
    }
    appendSsrContentIntegrityMarker(doc);
    const eventTypesToReplay = _annotateForHydration(applicationRef, doc);
    if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) {
        insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
    }
    else {
        // No events to replay, we should remove inlined event dispatch script
        // (which was injected by the build process) from the HTML.
        removeEventDispatchScript(doc);
    }
    _stopMeasuring(measuringLabel);
}
/**
 * Creates a marker comment node and append it into the `<body>`.
 * Some CDNs have mechanisms to remove all comment node from HTML.
 * This behaviour breaks hydration, so we'll detect on the client side if this
 * marker comment is still available or else throw an error
 */
function appendSsrContentIntegrityMarker(doc) {
    // Adding a ng hydration marker comment
    const comment = doc.createComment(_SSR_CONTENT_INTEGRITY_MARKER);
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
    const measuringLabel = 'insertEventRecordScript';
    _startMeasuring(measuringLabel);
    const { regular, capture } = eventTypesToReplay;
    const eventDispatchScript = findEventDispatchScript(doc);
    // Note: this is only true when build with the CLI tooling, which inserts the script in the HTML
    if (eventDispatchScript) {
        // This is defined in packages/core/primitives/event-dispatch/contract_binary.ts
        const replayScriptContents = `window.__jsaction_bootstrap(` +
            `document.body,` +
            `"${appId}",` +
            `${JSON.stringify(Array.from(regular))},` +
            `${JSON.stringify(Array.from(capture))}` +
            `);`;
        const replayScript = createScript(doc, replayScriptContents, nonce);
        // Insert replay script right after inlined event dispatch script, since it
        // relies on `__jsaction_bootstrap` to be defined in the global scope.
        eventDispatchScript.after(replayScript);
    }
    _stopMeasuring(measuringLabel);
}
/**
 * Renders an Angular application to a string.
 *
 * @private
 *
 * @param platformRef - Reference to the Angular platform.
 * @param applicationRef - Reference to the Angular application.
 * @returns A promise that resolves to the rendered string.
 */
async function renderInternal(platformRef, applicationRef) {
    const platformState = platformRef.injector.get(PlatformState);
    prepareForHydration(platformState, applicationRef);
    appendServerContextInfo(applicationRef);
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
    return platformState.renderToString();
}
/**
 * Destroy the application in a macrotask, this allows pending promises to be settled and errors
 * to be surfaced to the users.
 */
function asyncDestroyPlatform(platformRef) {
    return new Promise((resolve) => {
        setTimeout(() => {
            platformRef.destroy();
            resolve();
        }, 0);
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
const SERVER_CONTEXT = new InjectionToken('SERVER_CONTEXT');
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
async function renderModule(moduleType, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platformRef = createServerPlatform({ document, url, platformProviders });
    try {
        const moduleRef = await platformRef.bootstrapModule(moduleType);
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        const measuringLabel = 'whenStable';
        _startMeasuring(measuringLabel);
        // Block until application is stable.
        await applicationRef.whenStable();
        _stopMeasuring(measuringLabel);
        return await renderInternal(platformRef, applicationRef);
    }
    finally {
        await asyncDestroyPlatform(platformRef);
    }
}
/**
 * Bootstraps an instance of an Angular application and renders it to a string.

 * ```ts
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
async function renderApplication(bootstrap, options) {
    const renderAppLabel = 'renderApplication';
    const bootstrapLabel = 'bootstrap';
    const _renderLabel = '_render';
    _startMeasuring(renderAppLabel);
    const platformRef = createServerPlatform(options);
    try {
        _startMeasuring(bootstrapLabel);
        const applicationRef = await bootstrap();
        _stopMeasuring(bootstrapLabel);
        _startMeasuring(_renderLabel);
        const measuringLabel = 'whenStable';
        _startMeasuring(measuringLabel);
        // Block until application is stable.
        await applicationRef.whenStable();
        _stopMeasuring(measuringLabel);
        const rendered = await renderInternal(platformRef, applicationRef);
        _stopMeasuring(_renderLabel);
        return rendered;
    }
    finally {
        await asyncDestroyPlatform(platformRef);
        _stopMeasuring(renderAppLabel);
    }
}

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-server package.
 */
/**
 * @publicApi
 */
const VERSION = new Version('19.2.7+sha-b557618');

export { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformState, VERSION, platformServer, provideServerRendering, renderApplication, renderModule, SERVER_CONTEXT as ɵSERVER_CONTEXT, renderInternal as ɵrenderInternal };
//# sourceMappingURL=platform-server.mjs.map
