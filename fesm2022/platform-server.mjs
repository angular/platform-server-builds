/**
 * @license Angular v21.0.2+sha-e95d2e3
 * (c) 2010-2025 Google LLC. https://angular.dev/
 * License: MIT
 */

import { PLATFORM_SERVER_PROVIDERS, PlatformState, BEFORE_APP_SERIALIZED, platformServer, INITIAL_CONFIG, createScript } from './_server-chunk.mjs';
export { ServerModule, DominoAdapter as ɵDominoAdapter, ENABLE_DOM_EMULATION as ɵENABLE_DOM_EMULATION, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS } from './_server-chunk.mjs';
import { makeEnvironmentProviders, InjectionToken, ApplicationRef, ɵstartMeasuring as _startMeasuring, ɵstopMeasuring as _stopMeasuring, ɵIS_HYDRATION_DOM_REUSE_ENABLED as _IS_HYDRATION_DOM_REUSE_ENABLED, ɵannotateForHydration as _annotateForHydration, CSP_NONCE, APP_ID, ɵSSR_CONTENT_INTEGRITY_MARKER as _SSR_CONTENT_INTEGRITY_MARKER, Renderer2, Version } from '@angular/core';
import '@angular/common';
import '@angular/platform-browser';
import '@angular/common/http';
import 'rxjs';

function provideServerRendering() {
  if (typeof ngServerMode === 'undefined') {
    globalThis['ngServerMode'] = true;
  }
  return makeEnvironmentProviders([...PLATFORM_SERVER_PROVIDERS]);
}

const EVENT_DISPATCH_SCRIPT_ID = 'ng-event-dispatch-contract';
function createServerPlatform(options) {
  const extraProviders = options.platformProviders ?? [];
  const measuringLabel = 'createServerPlatform';
  _startMeasuring(measuringLabel);
  const platform = platformServer([{
    provide: INITIAL_CONFIG,
    useValue: {
      document: options.document,
      url: options.url
    }
  }, extraProviders]);
  _stopMeasuring(measuringLabel);
  return platform;
}
function findEventDispatchScript(doc) {
  return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
function removeEventDispatchScript(doc) {
  findEventDispatchScript(doc)?.remove();
}
function prepareForHydration(platformState, applicationRef) {
  const measuringLabel = 'prepareForHydration';
  _startMeasuring(measuringLabel);
  const environmentInjector = applicationRef.injector;
  const doc = platformState.getDocument();
  if (!environmentInjector.get(_IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
    removeEventDispatchScript(doc);
    return;
  }
  appendSsrContentIntegrityMarker(doc);
  const eventTypesToReplay = _annotateForHydration(applicationRef, doc);
  if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) {
    insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
  } else {
    removeEventDispatchScript(doc);
  }
  _stopMeasuring(measuringLabel);
}
function appendSsrContentIntegrityMarker(doc) {
  const comment = doc.createComment(_SSR_CONTENT_INTEGRITY_MARKER);
  doc.body.firstChild ? doc.body.insertBefore(comment, doc.body.firstChild) : doc.body.append(comment);
}
function appendServerContextInfo(applicationRef) {
  const injector = applicationRef.injector;
  let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
  applicationRef.components.forEach(componentRef => {
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
  const {
    regular,
    capture
  } = eventTypesToReplay;
  const eventDispatchScript = findEventDispatchScript(doc);
  if (eventDispatchScript) {
    const replayScriptContents = `window.__jsaction_bootstrap(` + `document.body,` + `"${appId}",` + `${JSON.stringify(Array.from(regular))},` + `${JSON.stringify(Array.from(capture))}` + `);`;
    const replayScript = createScript(doc, replayScriptContents, nonce);
    eventDispatchScript.after(replayScript);
  }
  _stopMeasuring(measuringLabel);
}
async function renderInternal(platformRef, applicationRef) {
  const platformState = platformRef.injector.get(PlatformState);
  prepareForHydration(platformState, applicationRef);
  appendServerContextInfo(applicationRef);
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
      } catch (e) {
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
function asyncDestroyPlatform(platformRef) {
  return new Promise(resolve => {
    setTimeout(() => {
      platformRef.destroy();
      resolve();
    }, 0);
  });
}
const DEFAULT_SERVER_CONTEXT = 'other';
const SERVER_CONTEXT = new InjectionToken('SERVER_CONTEXT');
function sanitizeServerContext(serverContext) {
  const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, '');
  return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
async function renderModule(moduleType, options) {
  const {
    document,
    url,
    extraProviders: platformProviders
  } = options;
  const platformRef = createServerPlatform({
    document,
    url,
    platformProviders
  });
  try {
    const moduleRef = await platformRef.bootstrapModule(moduleType);
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const measuringLabel = 'whenStable';
    _startMeasuring(measuringLabel);
    await applicationRef.whenStable();
    _stopMeasuring(measuringLabel);
    return await renderInternal(platformRef, applicationRef);
  } finally {
    await asyncDestroyPlatform(platformRef);
  }
}
async function renderApplication(bootstrap, options) {
  const renderAppLabel = 'renderApplication';
  const bootstrapLabel = 'bootstrap';
  const _renderLabel = '_render';
  _startMeasuring(renderAppLabel);
  const platformRef = createServerPlatform(options);
  try {
    _startMeasuring(bootstrapLabel);
    const applicationRef = await bootstrap({
      platformRef
    });
    _stopMeasuring(bootstrapLabel);
    _startMeasuring(_renderLabel);
    const measuringLabel = 'whenStable';
    _startMeasuring(measuringLabel);
    await applicationRef.whenStable();
    _stopMeasuring(measuringLabel);
    const rendered = await renderInternal(platformRef, applicationRef);
    _stopMeasuring(_renderLabel);
    return rendered;
  } finally {
    await asyncDestroyPlatform(platformRef);
    _stopMeasuring(renderAppLabel);
  }
}

const VERSION = /* @__PURE__ */new Version('21.0.2+sha-e95d2e3');

export { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformState, VERSION, platformServer, provideServerRendering, renderApplication, renderModule, SERVER_CONTEXT as ɵSERVER_CONTEXT, renderInternal as ɵrenderInternal };
//# sourceMappingURL=platform-server.mjs.map
