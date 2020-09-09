/**
 * @license Angular v10.1.1
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵsetRootDomAdapter, DOCUMENT, PlatformLocation, ɵgetDOM, ɵPLATFORM_SERVER_ID, ViewportScroller, ɵNullViewportScroller } from '@angular/common';
import { Injectable, Inject, InjectionToken, Injector, Optional, ViewEncapsulation, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, ɵALLOW_MULTIPLE_PLATFORMS, RendererFactory2, NgModule, Testability, ɵsetDocument, createPlatformFactory, platformCore, APP_ID, ApplicationRef, ɵisPromise, Version } from '@angular/core';
import { ɵBrowserDomAdapter, ɵflattenStyles, EventManager, ɵSharedStylesHost, ɵNAMESPACE_URIS, ɵshimContentAttribute, ɵshimHostAttribute, ɵTRANSITION_ID, EVENT_MANAGER_PLUGINS, BrowserModule, ɵescapeHtml, TransferState } from '@angular/platform-browser';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { ɵHttpInterceptingHandler, XhrFactory, HttpHandler, HttpBackend, HttpClientModule } from '@angular/common/http';
import { ɵplatformCoreDynamic } from '@angular/platform-browser-dynamic';
import { ɵAnimationRendererFactory, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import { parse } from 'url';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { first } from 'rxjs/operators';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const domino = require('domino');
function _notImplemented(methodName) {
    return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}
function setDomTypes() {
    // Make all Domino types available as types in the global env.
    Object.assign(global, domino.impl);
    global['KeyboardEvent'] = domino.impl.Event;
}
/**
 * Parses a document string to a Document object.
 */
function parseDocument(html, url = '/') {
    let window = domino.createWindow(html, url);
    let doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 */
function serializeDocument(doc) {
    return doc.serialize();
}
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
class DominoAdapter extends ɵBrowserDomAdapter {
    static makeCurrent() {
        setDomTypes();
        ɵsetRootDomAdapter(new DominoAdapter());
    }
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
    logGroup(error) {
        console.error(error);
    }
    logGroupEnd() { }
    supportsDOMEvents() {
        return false;
    }
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
    getProperty(el, name) {
        if (name === 'href') {
            // Domino tries to resolve href-s which we do not want. Just return the
            // attribute value.
            return el.getAttribute('href');
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            return el.textContent;
        }
        return el[name];
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
        const base = doc.documentElement.querySelector('base');
        let href = '';
        if (base) {
            href = base.getAttribute('href');
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        const doc = el.ownerDocument || el;
        const win = doc.defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    }
    getHistory() {
        throw _notImplemented('getHistory');
    }
    getLocation() {
        throw _notImplemented('getLocation');
    }
    getUserAgent() {
        return 'Fake user agent';
    }
    performanceNow() {
        return Date.now();
    }
    supportsCookies() {
        return false;
    }
    getCookie(name) {
        throw _notImplemented('getCookie');
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Representation of the current platform state.
 *
 * @publicApi
 */
class PlatformState {
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     */
    renderToString() {
        return serializeDocument(this._doc);
    }
    /**
     * Returns the current DOM state.
     */
    getDocument() {
        return this._doc;
    }
}
PlatformState.decorators = [
    { type: Injectable }
];
PlatformState.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
const INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
 *
 * @publicApi
 */
const BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const xhr2 = require('xhr2');
// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.decorators = [
    { type: Injectable }
];
class ZoneMacroTaskWrapper {
    wrap(request) {
        return new Observable((observer) => {
            let task = null;
            let scheduled = false;
            let sub = null;
            let savedResult = null;
            let savedError = null;
            const scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const delegate = this.delegate(request);
                sub = delegate.subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            const cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const onComplete = () => {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            };
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            const _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
            scheduleTask(_task);
            return () => {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
        });
    }
}
class ZoneClientBackend extends ZoneMacroTaskWrapper {
    constructor(backend, platformLocation, config) {
        super();
        this.backend = backend;
        this.platformLocation = platformLocation;
        this.config = config;
    }
    handle(request) {
        const { href, protocol, hostname, port } = this.platformLocation;
        if (this.config.useAbsoluteUrl && !isAbsoluteUrl.test(request.url) &&
            isAbsoluteUrl.test(href)) {
            const baseHref = this.platformLocation.getBaseHrefFromDOM() || href;
            const urlPrefix = `${protocol}//${hostname}` + (port ? `:${port}` : '');
            const baseUrl = new URL(baseHref, urlPrefix);
            const url = new URL(request.url, baseUrl);
            return this.wrap(request.clone({ url: url.toString() }));
        }
        return this.wrap(request);
    }
    delegate(request) {
        return this.backend.handle(request);
    }
}
function zoneWrappedInterceptingHandler(backend, injector, platformLocation, config) {
    const realBackend = new ɵHttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend, platformLocation, config);
}
const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector, PlatformLocation, INITIAL_CONFIG]
    }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function parseUrl(urlStr) {
    const parsedUrl = parse(urlStr);
    return {
        hostname: parsedUrl.hostname || '',
        protocol: parsedUrl.protocol || '',
        port: parsedUrl.port || '',
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
class ServerPlatformLocation {
    constructor(_doc, _config) {
        this._doc = _doc;
        this.href = '/';
        this.hostname = '/';
        this.protocol = '/';
        this.port = '/';
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this._hashUpdate = new Subject();
        const config = _config;
        if (!!config && !!config.url) {
            const parsedUrl = parseUrl(config.url);
            this.hostname = parsedUrl.hostname;
            this.protocol = parsedUrl.protocol;
            this.port = parsedUrl.port;
            this.pathname = parsedUrl.pathname;
            this.search = parsedUrl.search;
            this.hash = parsedUrl.hash;
            this.href = _doc.location.href;
        }
    }
    getBaseHrefFromDOM() {
        return ɵgetDOM().getBaseHref(this._doc);
    }
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    }
    onHashChange(fn) {
        this._hashUpdate.subscribe(fn);
    }
    get url() {
        return `${this.pathname}${this.search}${this.hash}`;
    }
    setHash(value, oldUrl) {
        if (this.hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this.hash = value;
        const newUrl = this.url;
        scheduleMicroTask(() => this._hashUpdate.next({ type: 'hashchange', state: null, oldUrl, newUrl }));
    }
    replaceState(state, title, newUrl) {
        const oldUrl = this.url;
        const parsedUrl = parseUrl(newUrl);
        this.pathname = parsedUrl.pathname;
        this.search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
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
    // History API isn't available on server, therefore return undefined
    getState() {
        return undefined;
    }
}
ServerPlatformLocation.decorators = [
    { type: Injectable }
];
ServerPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
];
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class ServerEventManagerPlugin /* extends EventManagerPlugin which is private */ {
    constructor(doc) {
        this.doc = doc;
    }
    // Handle all events on the server.
    supports(eventName) {
        return true;
    }
    addEventListener(element, eventName, handler) {
        return ɵgetDOM().onAndCancel(element, eventName, handler);
    }
    addGlobalEventListener(element, eventName, handler) {
        const target = ɵgetDOM().getGlobalEventTarget(this.doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}
ServerEventManagerPlugin.decorators = [
    { type: Injectable }
];
ServerEventManagerPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EMPTY_ARRAY = [];
const DEFAULT_SCHEMA = new DomElementSchemaRegistry();
class ServerRendererFactory2 {
    constructor(eventManager, ngZone, document, sharedStylesHost) {
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = DEFAULT_SCHEMA;
        this.defaultRenderer = new DefaultServerRenderer2(eventManager, document, ngZone, this.schema);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                let renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.eventManager, this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                renderer.applyToHost(element);
                return renderer;
            }
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const styles = ɵflattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
    begin() { }
    end() { }
}
ServerRendererFactory2.decorators = [
    { type: Injectable }
];
ServerRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ɵSharedStylesHost }
];
class DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, schema) {
        this.eventManager = eventManager;
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    destroy() { }
    createElement(name, namespace, debugInfo) {
        if (namespace) {
            const doc = this.document || ɵgetDOM().getDefaultDocument();
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            return doc.createElementNS(ɵNAMESPACE_URIS[namespace], name);
        }
        return ɵgetDOM().createElement(name, this.document);
    }
    createComment(value, debugInfo) {
        return ɵgetDOM().getDefaultDocument().createComment(value);
    }
    createText(value, debugInfo) {
        const doc = ɵgetDOM().getDefaultDocument();
        return doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    }
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    selectRootElement(selectorOrNode, debugInfo) {
        let el;
        if (typeof selectorOrNode === 'string') {
            el = this.document.querySelector(selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            el.setAttributeNS(ɵNAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            el.removeAttributeNS(ɵNAMESPACE_URIS[namespace], name);
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const styleMap = _readStyleAttribute(el);
        styleMap[style] = value == null ? '' : value;
        _writeStyleAttribute(el, styleMap);
    }
    removeStyle(el, style, flags) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        this.setStyle(el, style, '', flags);
    }
    // The value was validated already as a property binding, against the property name.
    // To know this value is safe to use as an attribute, the security context of the
    // attribute with the given name is checked against that security context of the
    // property.
    _isSafeToReflectProperty(tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    }
    setProperty(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            el.textContent = value;
        }
        el[name] = value;
        // Mirror property values for known HTML element properties in the attributes.
        // Skip `innerhtml` which is conservatively marked as an attribute for security
        // purposes but is not actually an attribute.
        const tagName = el.tagName.toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            name.toLowerCase() !== 'innerhtml' && this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    }
    setValue(node, value) {
        node.textContent = value;
    }
    listen(target, eventName, callback) {
        checkNoSyntheticProp(eventName, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback));
    }
    decoratePreventDefault(eventHandler) {
        return (event) => {
            // Ivy uses `Function` as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`.
            if (event === Function) {
                return eventHandler;
            }
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            const allowDefaultBehavior = this.ngZone.runGuarded(() => eventHandler(event));
            if (allowDefaultBehavior === false) {
                event.preventDefault();
                event.returnValue = false;
            }
            return undefined;
        };
    }
}
const AT_CHARCODE = '@'.charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, sharedStylesHost, schema, component) {
        super(eventManager, document, ngZone, schema);
        this.component = component;
        // Add a 's' prefix to style attributes to indicate server.
        const componentId = 's' + component.id;
        const styles = ɵflattenStyles(componentId, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = ɵshimContentAttribute(componentId);
        this.hostAttr = ɵshimHostAttribute(componentId);
    }
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name, this.document);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
function _readStyleAttribute(element) {
    const styleMap = {};
    const styleAttribute = element.getAttribute('style');
    if (styleAttribute) {
        const styleList = styleAttribute.split(/;+/g);
        for (let i = 0; i < styleList.length; i++) {
            const style = styleList[i].trim();
            if (style.length > 0) {
                const colonIndex = style.indexOf(':');
                if (colonIndex === -1) {
                    throw new Error(`Invalid CSS style: ${style}`);
                }
                const name = style.substr(0, colonIndex).trim();
                styleMap[name] = style.substr(colonIndex + 1).trim();
            }
        }
    }
    return styleMap;
}
function _writeStyleAttribute(element, styleMap) {
    let styleAttrValue = '';
    for (const key in styleMap) {
        const newValue = styleMap[key];
        if (newValue != null) {
            styleAttrValue += key + ':' + styleMap[key] + ';';
        }
    }
    element.setAttribute('style', styleAttrValue);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class ServerStylesHost extends ɵSharedStylesHost {
    constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this._styleNodes = new Set();
        this.head = doc.getElementsByTagName('head')[0];
    }
    _addStyle(style) {
        let adapter = ɵgetDOM();
        const el = adapter.createElement('style');
        el.textContent = style;
        if (!!this.transitionId) {
            el.setAttribute('ng-transition', this.transitionId);
        }
        this.head.appendChild(el);
        this._styleNodes.add(el);
    }
    onStylesAdded(additions) {
        additions.forEach(style => this._addStyle(style));
    }
    ngOnDestroy() {
        this._styleNodes.forEach(styleNode => styleNode.remove());
    }
}
ServerStylesHost.decorators = [
    { type: Injectable }
];
ServerStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ɵALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter(injector) {
    return () => {
        DominoAdapter.makeCurrent();
    };
}
function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
const SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: ɵSharedStylesHost, useExisting: ServerStylesHost },
    { provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
class ServerModule {
}
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpClientModule, NoopAnimationsModule],
                providers: [
                    SERVER_RENDER_PROVIDERS,
                    SERVER_HTTP_PROVIDERS,
                    { provide: Testability, useValue: null },
                    { provide: ViewportScroller, useClass: ɵNullViewportScroller },
                ],
            },] }
];
function _document(injector) {
    let config = injector.get(INITIAL_CONFIG, null);
    const document = config && config.document ? parseDocument(config.document, config.url) :
        ɵgetDOM().createHtmlDocument();
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
/**
 * @publicApi
 */
const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @publicApi
 */
const platformDynamicServer = createPlatformFactory(ɵplatformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function serializeTransferStateFactory(doc, appId, transferStore) {
    return () => {
        const script = doc.createElement('script');
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        script.textContent = ɵescapeHtml(transferStore.toJson());
        doc.body.appendChild(script);
    };
}
/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
class ServerTransferStateModule {
}
ServerTransferStateModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    TransferState, {
                        provide: BEFORE_APP_SERIALIZED,
                        useFactory: serializeTransferStateFactory,
                        deps: [DOCUMENT, APP_ID, TransferState],
                        multi: true,
                    }
                ]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function _getPlatform(platformFactory, options) {
    const extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then((moduleRef) => {
        const transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
        }
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        return applicationRef.isStable.pipe((first((isStable) => isStable)))
            .toPromise()
            .then(() => {
            const platformState = platform.injector.get(PlatformState);
            const asyncPromises = [];
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            const callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
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
 * If compiling with the ViewEngine renderer, do not use this in a production server environment.
 * Use pre-compiled {@link NgModuleFactory} with {@link renderModuleFactory} instead. If
 * compiling with the Ivy renderer, this method is the recommended rendering method for
 * platform-server.
 *
 * @publicApi
 */
function renderModule(module, options) {
    const platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * @publicApi
 */
function renderModuleFactory(moduleFactory, options) {
    const platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @publicApi
 */
const VERSION = new Version('10.1.1');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformState, ServerModule, ServerTransferStateModule, VERSION, platformDynamicServer, platformServer, renderModule, renderModuleFactory, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS, ServerRendererFactory2 as ɵServerRendererFactory2, instantiateServerRendererFactory as ɵangular_packages_platform_server_platform_server_a, serializeTransferStateFactory as ɵangular_packages_platform_server_platform_server_b, ServerStylesHost as ɵangular_packages_platform_server_platform_server_c, ServerEventManagerPlugin as ɵangular_packages_platform_server_platform_server_d, ServerXhr as ɵangular_packages_platform_server_platform_server_e, zoneWrappedInterceptingHandler as ɵangular_packages_platform_server_platform_server_f, SERVER_HTTP_PROVIDERS as ɵangular_packages_platform_server_platform_server_g };
//# sourceMappingURL=platform-server.js.map
