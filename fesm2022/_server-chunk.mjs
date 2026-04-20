/**
 * @license Angular v21.2.9+sha-be74909
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import { ɵsetRootDomAdapter as _setRootDomAdapter, DOCUMENT, XhrFactory, PlatformLocation, ɵgetDOM as _getDOM, ɵPLATFORM_SERVER_ID as _PLATFORM_SERVER_ID, ɵNullViewportScroller as _NullViewportScroller, ViewportScroller } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, inject, Injector, ɵstartMeasuring as _startMeasuring, ɵstopMeasuring as _stopMeasuring, Inject, Injectable, APP_ID, TransferState, PLATFORM_ID, PLATFORM_INITIALIZER, Testability, ɵTESTABILITY as _TESTABILITY, createPlatformFactory, platformCore, ɵsetDocument as _setDocument, NgModule } from '@angular/core';
import { ɵBrowserDomAdapter as _BrowserDomAdapter, EventManagerPlugin, EVENT_MANAGER_PLUGINS, BrowserModule } from '@angular/platform-browser';
import domino from '../third_party/domino/bundled-domino.mjs';
import { ɵHTTP_ROOT_INTERCEPTOR_FNS as _HTTP_ROOT_INTERCEPTOR_FNS } from '@angular/common/http';
import { Subject } from 'rxjs';

function setDomTypes() {
  Object.assign(globalThis, domino.impl);
  globalThis['KeyboardEvent'] = domino.impl.Event;
}
function parseDocument(html, url = '/') {
  let window = domino.createWindow(html, url);
  let doc = window.document;
  return doc;
}
function serializeDocument(doc) {
  return doc.serialize();
}
class DominoAdapter extends _BrowserDomAdapter {
  static makeCurrent() {
    setDomTypes();
    _setRootDomAdapter(new DominoAdapter());
  }
  supportsDOMEvents = false;
  static defaultDoc;
  createHtmlDocument() {
    return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
  }
  getDefaultDocument() {
    if (!DominoAdapter.defaultDoc) {
      DominoAdapter.defaultDoc = domino.createDocument();
    }
    return DominoAdapter.defaultDoc;
  }
  isElementNode(node) {
    return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
  }
  isShadowRoot(node) {
    return node.shadowRoot == node;
  }
  getGlobalEventTarget(doc, target) {
    if (target === 'window') {
      return doc.defaultView;
    }
    if (target === 'document') {
      return doc;
    }
    if (target === 'body') {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    const length = doc.head.children.length;
    for (let i = 0; i < length; i++) {
      const child = doc.head.children[i];
      if (child.tagName === 'BASE') {
        return child.getAttribute('href') || '';
      }
    }
    return '';
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
    const doc = el.ownerDocument || el;
    const win = doc.defaultView;
    if (win) {
      win.dispatchEvent(evt);
    }
  }
  getUserAgent() {
    return 'Fake user agent';
  }
  getCookie(name) {
    throw new Error('getCookie has not been implemented');
  }
}

const INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
const BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');
const ENABLE_DOM_EMULATION = new InjectionToken('ENABLE_DOM_EMULATION');

class PlatformState {
  _doc;
  _enableDomEmulation = enableDomEmulation(inject(Injector));
  constructor(_doc) {
    this._doc = _doc;
  }
  renderToString() {
    if (ngDevMode && !this._enableDomEmulation && !window?.document) {
      throw new Error('Disabled DOM emulation should only run in browser environments');
    }
    const measuringLabel = 'renderToString';
    _startMeasuring(measuringLabel);
    const rendered = this._enableDomEmulation ? serializeDocument(this._doc) : this._doc.documentElement.outerHTML;
    _stopMeasuring(measuringLabel);
    return rendered;
  }
  getDocument() {
    return this._doc;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: PlatformState,
    deps: [{
      token: DOCUMENT
    }],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: PlatformState
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.2.9+sha-be74909",
  ngImport: i0,
  type: PlatformState,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }]
});
function enableDomEmulation(injector) {
  return injector.get(ENABLE_DOM_EMULATION, true);
}

class ServerXhr {
  xhrImpl;
  async ɵloadImpl() {
    if (!this.xhrImpl) {
      const {
        default: xhr
      } = await import('xhr2');
      this.xhrImpl = xhr;
    }
  }
  build() {
    const impl = this.xhrImpl;
    if (!impl) {
      throw new Error('Unexpected state in ServerXhr: XHR implementation is not loaded.');
    }
    return new impl.XMLHttpRequest();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerXhr,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerXhr
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.2.9+sha-be74909",
  ngImport: i0,
  type: ServerXhr,
  decorators: [{
    type: Injectable
  }]
});
function relativeUrlsTransformerInterceptorFn(request, next) {
  const platformLocation = inject(PlatformLocation);
  const {
    href,
    protocol,
    hostname,
    port
  } = platformLocation;
  if (!protocol.startsWith('http')) {
    return next(request);
  }
  let urlPrefix = `${protocol}//${hostname}`;
  if (port) {
    urlPrefix += `:${port}`;
  }
  const baseHref = platformLocation.getBaseHrefFromDOM() || href;
  const baseUrl = new URL(baseHref, urlPrefix);
  const newUrl = new URL(request.url, baseUrl).toString();
  return next(request.clone({
    url: newUrl
  }));
}
const SERVER_HTTP_PROVIDERS = [{
  provide: XhrFactory,
  useClass: ServerXhr
}, {
  provide: _HTTP_ROOT_INTERCEPTOR_FNS,
  useValue: relativeUrlsTransformerInterceptorFn,
  multi: true
}];

function parseUrl(urlStr, origin) {
  const urlToParse = urlStr.length === 0 || urlStr[0] === '/' ? origin + urlStr : urlStr;
  return new URL(urlToParse);
}
class ServerPlatformLocation {
  href = '/';
  hostname = '/';
  protocol = '/';
  port = '/';
  pathname = '/';
  search = '';
  hash = '';
  _hashUpdate = new Subject();
  _doc = inject(DOCUMENT);
  constructor() {
    const config = inject(INITIAL_CONFIG, {
      optional: true
    });
    if (!config) {
      return;
    }
    if (config.url) {
      const {
        protocol,
        hostname,
        port,
        pathname,
        search,
        hash,
        href
      } = parseUrl(config.url, this._doc.location.origin);
      this.protocol = protocol;
      this.hostname = hostname;
      this.port = port;
      this.pathname = pathname;
      this.search = search;
      this.hash = hash;
      this.href = href;
    }
  }
  getBaseHrefFromDOM() {
    return _getDOM().getBaseHref(this._doc);
  }
  onPopState(fn) {
    return () => {};
  }
  onHashChange(fn) {
    const subscription = this._hashUpdate.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  get url() {
    return `${this.pathname}${this.search}${this.hash}`;
  }
  setHash(value, oldUrl) {
    if (this.hash === value) {
      return;
    }
    this.hash = value;
    const newUrl = this.url;
    queueMicrotask(() => this._hashUpdate.next({
      type: 'hashchange',
      state: null,
      oldUrl,
      newUrl
    }));
  }
  replaceState(state, title, newUrl) {
    const oldUrl = this.url;
    const {
      pathname,
      search,
      hash,
      href,
      protocol
    } = parseUrl(newUrl, this._doc.location.origin);
    const writableThis = this;
    writableThis.pathname = pathname;
    writableThis.search = search;
    writableThis.href = href;
    writableThis.protocol = protocol;
    this.setHash(hash, oldUrl);
  }
  pushState(state, title, newUrl) {
    this.replaceState(state, title, newUrl);
  }
  forward() {
    throw new Error('Not implemented');
  }
  back() {
    throw new Error('Not implemented');
  }
  getState() {
    return undefined;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerPlatformLocation,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerPlatformLocation
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.2.9+sha-be74909",
  ngImport: i0,
  type: ServerPlatformLocation,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => []
});

class ServerEventManagerPlugin extends EventManagerPlugin {
  doc;
  constructor(doc) {
    super(doc);
    this.doc = doc;
  }
  supports(eventName) {
    return true;
  }
  addEventListener(element, eventName, handler, options) {
    return _getDOM().onAndCancel(element, eventName, handler, options);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerEventManagerPlugin,
    deps: [{
      token: DOCUMENT
    }],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerEventManagerPlugin
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.2.9+sha-be74909",
  ngImport: i0,
  type: ServerEventManagerPlugin,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }]
});

const TRANSFER_STATE_STATUS = new InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'TRANSFER_STATE_STATUS' : '', {
  factory: () => ({
    serialized: false
  })
});
const TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
  provide: BEFORE_APP_SERIALIZED,
  useFactory: serializeTransferStateFactory,
  multi: true
}];
function createScript(doc, textContent, nonce) {
  const script = doc.createElement('script');
  script.textContent = textContent;
  if (nonce) {
    script.setAttribute('nonce', nonce);
  }
  return script;
}
function warnIfStateTransferHappened(injector) {
  const transferStateStatus = injector.get(TRANSFER_STATE_STATUS);
  if (transferStateStatus.serialized) {
    console.warn(`Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.\n\n` + `This can happen if the server providers have been provided more than once using different mechanisms. For example:\n\n` + `  imports: [ServerModule], // Registers server providers\n` + `  providers: [provideServerRendering()] // Also registers server providers\n\n` + `To fix this, ensure that the \`provideServerRendering()\` function is the only provider used and remove the other(s).`);
  }
  transferStateStatus.serialized = true;
}
function serializeTransferStateFactory() {
  const doc = inject(DOCUMENT);
  const appId = inject(APP_ID);
  const transferStore = inject(TransferState);
  const injector = inject(Injector);
  return () => {
    const measuringLabel = 'serializeTransferStateFactory';
    _startMeasuring(measuringLabel);
    const content = transferStore.toJson();
    if (transferStore.isEmpty) {
      return;
    }
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
      warnIfStateTransferHappened(injector);
    }
    const script = createScript(doc, content, null);
    script.id = appId + '-state';
    script.setAttribute('type', 'application/json');
    doc.body.appendChild(script);
    _stopMeasuring(measuringLabel);
  };
}

const INTERNAL_SERVER_PLATFORM_PROVIDERS = [{
  provide: DOCUMENT,
  useFactory: _document
}, {
  provide: PLATFORM_ID,
  useValue: _PLATFORM_SERVER_ID
}, {
  provide: PLATFORM_INITIALIZER,
  useFactory: initDominoAdapter,
  multi: true
}, {
  provide: PlatformLocation,
  useClass: ServerPlatformLocation,
  deps: []
}, {
  provide: PlatformState,
  deps: [DOCUMENT]
}];
function initDominoAdapter() {
  const injector = inject(Injector);
  const _enableDomEmulation = enableDomEmulation(injector);
  return () => {
    if (_enableDomEmulation) {
      DominoAdapter.makeCurrent();
    } else {
      _BrowserDomAdapter.makeCurrent();
    }
  };
}
const SERVER_RENDER_PROVIDERS = [{
  provide: EVENT_MANAGER_PLUGINS,
  multi: true,
  useClass: ServerEventManagerPlugin
}];
const PLATFORM_SERVER_PROVIDERS = [TRANSFER_STATE_SERIALIZATION_PROVIDERS, SERVER_RENDER_PROVIDERS, SERVER_HTTP_PROVIDERS, {
  provide: Testability,
  useValue: null
}, {
  provide: _TESTABILITY,
  useValue: null
}, {
  provide: ViewportScroller,
  useClass: _NullViewportScroller
}];
class ServerModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerModule,
    exports: [BrowserModule]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "21.2.9+sha-be74909",
    ngImport: i0,
    type: ServerModule,
    providers: PLATFORM_SERVER_PROVIDERS,
    imports: [BrowserModule]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.2.9+sha-be74909",
  ngImport: i0,
  type: ServerModule,
  decorators: [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: PLATFORM_SERVER_PROVIDERS
    }]
  }]
});
function _document() {
  const injector = inject(Injector);
  const config = injector.get(INITIAL_CONFIG, null);
  const _enableDomEmulation = enableDomEmulation(injector);
  let document;
  if (config && config.document) {
    document = typeof config.document === 'string' ? _enableDomEmulation ? parseDocument(config.document, config.url) : window.document : config.document;
  } else {
    document = _getDOM().createHtmlDocument();
  }
  _setDocument(document);
  return document;
}
function platformServer(extraProviders) {
  const noServerModeSet = typeof ngServerMode === 'undefined';
  if (noServerModeSet) {
    globalThis['ngServerMode'] = true;
  }
  const platform = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
  if (noServerModeSet) {
    platform.onDestroy(() => {
      globalThis['ngServerMode'] = undefined;
    });
  }
  return platform;
}

export { BEFORE_APP_SERIALIZED, DominoAdapter, ENABLE_DOM_EMULATION, INITIAL_CONFIG, INTERNAL_SERVER_PLATFORM_PROVIDERS, PLATFORM_SERVER_PROVIDERS, PlatformState, SERVER_RENDER_PROVIDERS, ServerModule, createScript, platformServer };
//# sourceMappingURL=_server-chunk.mjs.map
