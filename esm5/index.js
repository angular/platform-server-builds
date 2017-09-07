/**
 * @license Angular v5.0.0-beta.6-f2945c6
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { ApplicationRef, Inject, Injectable, InjectionToken, Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, Version, ViewEncapsulation, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { BrowserModule, DOCUMENT, ɵBrowserDomAdapter, ɵNAMESPACE_URIS, ɵSharedStylesHost, ɵTRANSITION_ID, ɵflattenStyles, ɵgetDOM, ɵsetRootDomAdapter, ɵshimContentAttribute, ɵshimHostAttribute } from '@angular/platform-browser';
import { __extends } from 'tslib';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { PlatformLocation, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler, XhrFactory, ɵinterceptingHandler } from '@angular/common/http';
import { BrowserXhr, Http, HttpModule, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { ɵplatformCoreDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { parse } from 'url';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var domino = require('domino');
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}
/**
 * Parses a document string to a Document object.
 * @param {?} html
 * @param {?=} url
 * @return {?}
 */
function parseDocument(html, url$$1) {
    if (url$$1 === void 0) { url$$1 = '/'; }
    var /** @type {?} */ window = domino.createWindow(html, url$$1);
    var /** @type {?} */ doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 * @param {?} doc
 * @return {?}
 */
function serializeDocument(doc) {
    return ((doc)).serialize();
}
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
var DominoAdapter = (function (_super) {
    __extends(DominoAdapter, _super);
    function DominoAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    DominoAdapter.makeCurrent = function () { ɵsetRootDomAdapter(new DominoAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.logError = function (error) { console.error(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.log = function (error) { console.log(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.logGroup = function (error) { console.error(error); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.logGroupEnd = function () { };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsDOMEvents = function () { return false; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsNativeShadowDOM = function () { return false; };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    DominoAdapter.prototype.contains = function (nodeA, nodeB) {
        var /** @type {?} */ inner = nodeB;
        while (inner) {
            if (inner === nodeA)
                return true;
            inner = inner.parent;
        }
        return false;
    };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.createHtmlDocument = function () {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getDefaultDocument = function () {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = domino.createDocument();
        }
        return DominoAdapter.defaultDoc;
    };
    /**
     * @param {?} el
     * @param {?=} doc
     * @return {?}
     */
    DominoAdapter.prototype.createShadowRoot = function (el, doc) {
        if (doc === void 0) { doc = document; }
        el.shadowRoot = doc.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DominoAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isTextNode = function (node) { return node.nodeType === DominoAdapter.defaultDoc.TEXT_NODE; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isCommentNode = function (node) {
        return node.nodeType === DominoAdapter.defaultDoc.COMMENT_NODE;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isElementNode = function (node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.hasShadowRoot = function (node) { return node.shadowRoot != null; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isShadowRoot = function (node) { return this.getShadowRoot(node) == node; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DominoAdapter.prototype.getProperty = function (el, name) {
        // Domino tries tp resolve href-s which we do not want. Just return the
        // atribute value.
        if (name === 'href') {
            return this.getAttribute(el, 'href');
        }
        return ((el))[name];
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DominoAdapter.prototype.setProperty = function (el, name, value) {
        // Eventhough the server renderer reflects any properties to attributes
        // map 'href' to atribute just to handle when setProperty is directly called.
        if (name === 'href') {
            this.setAttribute(el, 'href', value);
        }
        ((el))[name] = value;
    };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    DominoAdapter.prototype.getGlobalEventTarget = function (doc, target) {
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
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    DominoAdapter.prototype.getBaseHref = function (doc) {
        var /** @type {?} */ base = this.querySelector(doc.documentElement, 'base');
        var /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    };
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    DominoAdapter.prototype._readStyleAttribute = function (element) {
        var /** @type {?} */ styleMap = {};
        var /** @type {?} */ styleAttribute = element.getAttribute('style');
        if (styleAttribute) {
            var /** @type {?} */ styleList = styleAttribute.split(/;+/g);
            for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    var /** @type {?} */ style = (styleList[i]);
                    var /** @type {?} */ colon = style.indexOf(':');
                    if (colon === -1) {
                        throw new Error("Invalid CSS style: " + style);
                    }
                    ((styleMap))[style.substr(0, colon).trim()] = style.substr(colon + 1).trim();
                }
            }
        }
        return styleMap;
    };
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    DominoAdapter.prototype._writeStyleAttribute = function (element, styleMap) {
        var /** @type {?} */ styleAttrValue = '';
        for (var /** @type {?} */ key in styleMap) {
            var /** @type {?} */ newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.setAttribute('style', styleAttrValue);
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    DominoAdapter.prototype.setStyle = function (element, styleName, styleValue) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        ((styleMap))[styleName] = styleValue;
        this._writeStyleAttribute(element, styleMap);
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DominoAdapter.prototype.removeStyle = function (element, styleName) { this.setStyle(element, styleName, null); };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DominoAdapter.prototype.getStyle = function (element, styleName) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap.hasOwnProperty(styleName) ? ((styleMap))[styleName] : '';
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    DominoAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        var /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    DominoAdapter.prototype.dispatchEvent = function (el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        var /** @type {?} */ doc = el.ownerDocument || el;
        var /** @type {?} */ win = ((doc)).defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getHistory = function () { throw _notImplemented('getHistory'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getLocation = function () { throw _notImplemented('getLocation'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsWebAnimation = function () { return false; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.performanceNow = function () { return Date.now(); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getAnimationPrefix = function () { return ''; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getTransitionEnd = function () { return 'transitionend'; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsAnimation = function () { return true; };
    /**
     * @param {?} el
     * @return {?}
     */
    DominoAdapter.prototype.getDistributedNodes = function (el) { throw _notImplemented('getDistributedNodes'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsCookies = function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    DominoAdapter.prototype.getCookie = function (name) { throw _notImplemented('getCookie'); };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DominoAdapter.prototype.setCookie = function (name, value) { throw _notImplemented('setCookie'); };
    return DominoAdapter;
}(ɵBrowserDomAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Representation of the current platform state.
 *
 * \@experimental
 */
var PlatformState = (function () {
    /**
     * @param {?} _doc
     */
    function PlatformState(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     * @return {?}
     */
    PlatformState.prototype.renderToString = function () { return serializeDocument(this._doc); };
    /**
     * Returns the current DOM state.
     * @return {?}
     */
    PlatformState.prototype.getDocument = function () { return this._doc; };
    return PlatformState;
}());
PlatformState.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformState.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var xhr2 = require('xhr2');
var isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url$$1) {
    if (!isAbsoluteUrl.test(url$$1)) {
        throw new Error("URLs requested via Http on the server must be absolute. URL: " + url$$1);
    }
}
var ServerXhr = (function () {
    function ServerXhr() {
    }
    /**
     * @return {?}
     */
    ServerXhr.prototype.build = function () { return new xhr2.XMLHttpRequest(); };
    return ServerXhr;
}());
ServerXhr.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerXhr.ctorParameters = function () { return []; };
var ServerXsrfStrategy = (function () {
    function ServerXsrfStrategy() {
    }
    /**
     * @param {?} req
     * @return {?}
     */
    ServerXsrfStrategy.prototype.configureRequest = function (req) { };
    return ServerXsrfStrategy;
}());
ServerXsrfStrategy.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerXsrfStrategy.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var ZoneMacroTaskWrapper = (function () {
    function ZoneMacroTaskWrapper() {
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.wrap = function (request) {
        var _this = this;
        return new Observable(function (observer) {
            var /** @type {?} */ task = ((null));
            var /** @type {?} */ scheduled = false;
            var /** @type {?} */ sub = null;
            var /** @type {?} */ savedResult = null;
            var /** @type {?} */ savedError = null;
            var /** @type {?} */ scheduleTask = function (_task) {
                task = _task;
                scheduled = true;
                var /** @type {?} */ delegate = _this.delegate(request);
                sub = delegate.subscribe(function (res) { return savedResult = res; }, function (err) {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, function () {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            var /** @type {?} */ cancelTask = function (_task) {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            var /** @type {?} */ onComplete = function () {
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
            var /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, function () { return null; }, cancelTask);
            scheduleTask(_task);
            return function () {
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
    };
    return ZoneMacroTaskWrapper;
}());
var ZoneMacroTaskConnection = (function (_super) {
    __extends(ZoneMacroTaskConnection, _super);
    /**
     * @param {?} request
     * @param {?} backend
     */
    function ZoneMacroTaskConnection(request, backend) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.backend = backend;
        validateRequestUrl(request.url);
        _this.response = _this.wrap(request);
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskConnection.prototype.delegate = function (request) {
        this.lastConnection = this.backend.createConnection(request);
        return (this.lastConnection.response);
    };
    Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
        /**
         * @return {?}
         */
        get: function () {
            return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
        },
        enumerable: true,
        configurable: true
    });
    return ZoneMacroTaskConnection;
}(ZoneMacroTaskWrapper));
var ZoneMacroTaskBackend = (function () {
    /**
     * @param {?} backend
     */
    function ZoneMacroTaskBackend(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskBackend.prototype.createConnection = function (request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    };
    return ZoneMacroTaskBackend;
}());
var ZoneClientBackend = (function (_super) {
    __extends(ZoneClientBackend, _super);
    /**
     * @param {?} backend
     */
    function ZoneClientBackend(backend) {
        var _this = _super.call(this) || this;
        _this.backend = backend;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.handle = function (request) { return this.wrap(request); };
    /**
     * @param {?} request
     * @return {?}
     */
    ZoneClientBackend.prototype.delegate = function (request) {
        return this.backend.handle(request);
    };
    return ZoneClientBackend;
}(ZoneMacroTaskWrapper));
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
function httpFactory(xhrBackend, options) {
    var /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} interceptors
 * @return {?}
 */
function zoneWrappedInterceptingHandler(backend, interceptors) {
    var /** @type {?} */ realBackend = ɵinterceptingHandler(backend, interceptors);
    return new ZoneClientBackend(realBackend);
}
var SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, [new Optional(), HTTP_INTERCEPTORS]]
    }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Config object passed to initialize the platform.
 *
 * \@experimental
 * @record
 */
function PlatformConfig() { }
/**
 * The DI token for setting the initial config for the platform.
 *
 * \@experimental
 */
var INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
 *
 * \@experimental
 */
var BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} urlStr
 * @return {?}
 */
function parseUrl(urlStr) {
    var /** @type {?} */ parsedUrl = parse(urlStr);
    return {
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
var ServerPlatformLocation = (function () {
    /**
     * @param {?} _doc
     * @param {?} _config
     */
    function ServerPlatformLocation(_doc, _config) {
        this._doc = _doc;
        this._path = '/';
        this._search = '';
        this._hash = '';
        this._hashUpdate = new Subject();
        var /** @type {?} */ config = (_config);
        if (!!config && !!config.url) {
            var /** @type {?} */ parsedUrl = parseUrl(config.url);
            this._path = parsedUrl.pathname;
            this._search = parsedUrl.search;
            this._hash = parsedUrl.hash;
        }
    }
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { return ((ɵgetDOM().getBaseHref(this._doc))); };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onPopState = function (fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ServerPlatformLocation.prototype.onHashChange = function (fn) { this._hashUpdate.subscribe(fn); };
    Object.defineProperty(ServerPlatformLocation.prototype, "pathname", {
        /**
         * @return {?}
         */
        get: function () { return this._path; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "search", {
        /**
         * @return {?}
         */
        get: function () { return this._search; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () { return this._hash; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "url", {
        /**
         * @return {?}
         */
        get: function () { return "" + this.pathname + this.search + this.hash; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.setHash = function (value, oldUrl) {
        var _this = this;
        if (this._hash === value) {
            // Don't fire events if the hash has not changed.
            return;
        }
        this._hash = value;
        var /** @type {?} */ newUrl = this.url;
        scheduleMicroTask(function () { return _this._hashUpdate.next(/** @type {?} */ ({ type: 'hashchange', oldUrl: oldUrl, newUrl: newUrl })); });
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.replaceState = function (state, title, newUrl) {
        var /** @type {?} */ oldUrl = this.url;
        var /** @type {?} */ parsedUrl = parseUrl(newUrl);
        this._path = parsedUrl.pathname;
        this._search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */
    ServerPlatformLocation.prototype.pushState = function (state, title, newUrl) {
        this.replaceState(state, title, newUrl);
    };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.forward = function () { throw new Error('Not implemented'); };
    /**
     * @return {?}
     */
    ServerPlatformLocation.prototype.back = function () { throw new Error('Not implemented'); };
    return ServerPlatformLocation;
}());
ServerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerPlatformLocation.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] },] },
]; };
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_ARRAY = [];
var ServerRendererFactory2 = (function () {
    /**
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */
    function ServerRendererFactory2(ngZone, document, sharedStylesHost) {
        this.ngZone = ngZone;
        this.document = document;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.schema = new DomElementSchemaRegistry();
        this.defaultRenderer = new DefaultServerRenderer2(document, ngZone, this.schema);
    }
    
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    ServerRendererFactory2.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Native:
            case ViewEncapsulation.Emulated: {
                var /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationServerRenderer2(this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                throw new Error('Native encapsulation is not supported on the server!');
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    var /** @type {?} */ styles = ɵflattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    };
    /**
     * @return {?}
     */
    ServerRendererFactory2.prototype.begin = function () { };
    /**
     * @return {?}
     */
    ServerRendererFactory2.prototype.end = function () { };
    return ServerRendererFactory2;
}());
ServerRendererFactory2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerRendererFactory2.ctorParameters = function () { return [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ɵSharedStylesHost, },
]; };
var DefaultServerRenderer2 = (function () {
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} schema
     */
    function DefaultServerRenderer2(document, ngZone, schema) {
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
    }
    /**
     * @return {?}
     */
    DefaultServerRenderer2.prototype.destroy = function () { };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createElement = function (name, namespace, debugInfo) {
        if (namespace) {
            return ɵgetDOM().createElementNS(ɵNAMESPACE_URIS[namespace], name);
        }
        return ɵgetDOM().createElement(name);
    };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createComment = function (value, debugInfo) { return ɵgetDOM().createComment(value); };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.createText = function (value, debugInfo) { return ɵgetDOM().createTextNode(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.appendChild = function (parent, newChild) { ɵgetDOM().appendChild(parent, newChild); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (parent) {
            ɵgetDOM().insertBefore(parent, refChild, newChild);
        }
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeChild = function (parent, oldChild) {
        if (parent) {
            ɵgetDOM().removeChild(parent, oldChild);
        }
    };
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    DefaultServerRenderer2.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = ɵgetDOM().querySelector(this.document, selectorOrNode);
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        ɵgetDOM().clearNodes(el);
        return el;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DefaultServerRenderer2.prototype.parentNode = function (node) { return ɵgetDOM().parentElement(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    DefaultServerRenderer2.prototype.nextSibling = function (node) { return ɵgetDOM().nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        if (namespace) {
            ɵgetDOM().setAttributeNS(el, ɵNAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            ɵgetDOM().setAttribute(el, name, value);
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        if (namespace) {
            ɵgetDOM().removeAttributeNS(el, ɵNAMESPACE_URIS[namespace], name);
        }
        else {
            ɵgetDOM().removeAttribute(el, name);
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DefaultServerRenderer2.prototype.addClass = function (el, name) { ɵgetDOM().addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeClass = function (el, name) { ɵgetDOM().removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setStyle = function (el, style, value, flags) {
        ɵgetDOM().setStyle(el, style, value);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    DefaultServerRenderer2.prototype.removeStyle = function (el, style, flags) {
        ɵgetDOM().removeStyle(el, style);
    };
    /**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */
    DefaultServerRenderer2.prototype._isSafeToReflectProperty = function (tagName, propertyName) {
        return this.schema.securityContext(tagName, propertyName, true) ===
            this.schema.securityContext(tagName, propertyName, false);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setProperty = function (el, name, value) {
        checkNoSyntheticProp(name, 'property');
        ɵgetDOM().setProperty(el, name, value);
        // Mirror property values for known HTML element properties in the attributes.
        var /** @type {?} */ tagName = ((el.tagName)).toLowerCase();
        if (value != null && (typeof value === 'number' || typeof value == 'string') &&
            this.schema.hasElement(tagName, EMPTY_ARRAY) &&
            this.schema.hasProperty(tagName, name, EMPTY_ARRAY) &&
            this._isSafeToReflectProperty(tagName, name)) {
            this.setAttribute(el, name, value.toString());
        }
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    DefaultServerRenderer2.prototype.setValue = function (node, value) { ɵgetDOM().setText(node, value); };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    DefaultServerRenderer2.prototype.listen = function (target, eventName, callback) {
        var _this = this;
        // Note: We are not using the EventsPlugin here as this is not needed
        // to run our tests.
        checkNoSyntheticProp(eventName, 'listener');
        var /** @type {?} */ el = typeof target === 'string' ? ɵgetDOM().getGlobalEventTarget(this.document, target) : target;
        var /** @type {?} */ outsideHandler = function (event) { return _this.ngZone.runGuarded(function () { return callback(event); }); };
        return this.ngZone.runOutsideAngular(function () { /** @type {?} */ return (ɵgetDOM().onAndCancel(el, eventName, outsideHandler)); });
    };
    return DefaultServerRenderer2;
}());
var AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
    }
}
var EmulatedEncapsulationServerRenderer2 = (function (_super) {
    __extends(EmulatedEncapsulationServerRenderer2, _super);
    /**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} schema
     * @param {?} component
     */
    function EmulatedEncapsulationServerRenderer2(document, ngZone, sharedStylesHost, schema, component) {
        var _this = _super.call(this, document, ngZone, schema) || this;
        _this.component = component;
        var /** @type {?} */ styles = ɵflattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        _this.contentAttr = ɵshimContentAttribute(component.id);
        _this.hostAttr = ɵshimHostAttribute(component.id);
        return _this;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    EmulatedEncapsulationServerRenderer2.prototype.applyToHost = function (element) { _super.prototype.setAttribute.call(this, element, this.hostAttr, ''); };
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    EmulatedEncapsulationServerRenderer2.prototype.createElement = function (parent, name) {
        var /** @type {?} */ el = _super.prototype.createElement.call(this, parent, name);
        _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
        return el;
    };
    return EmulatedEncapsulationServerRenderer2;
}(DefaultServerRenderer2));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ServerStylesHost = (function (_super) {
    __extends(ServerStylesHost, _super);
    /**
     * @param {?} doc
     * @param {?} transitionId
     */
    function ServerStylesHost(doc, transitionId) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.transitionId = transitionId;
        _this.head = null;
        _this.head = ɵgetDOM().getElementsByTagName(doc, 'head')[0];
        return _this;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    ServerStylesHost.prototype._addStyle = function (style) {
        var /** @type {?} */ adapter = ɵgetDOM();
        var /** @type {?} */ el = adapter.createElement('style');
        adapter.setText(el, style);
        if (!!this.transitionId) {
            adapter.setAttribute(el, 'ng-transition', this.transitionId);
        }
        adapter.appendChild(this.head, el);
    };
    /**
     * @param {?} additions
     * @return {?}
     */
    ServerStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        additions.forEach(function (style) { return _this._addStyle(style); });
    };
    return ServerStylesHost;
}(ɵSharedStylesHost));
ServerStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServerStylesHost.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ɵTRANSITION_ID,] },] },
]; };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initParse5Adapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ɵALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initParse5Adapter(injector) {
    return function () { DominoAdapter.makeCurrent(); };
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
var SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: ɵSharedStylesHost, useExisting: ServerStylesHost },
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
var ServerModule = (function () {
    function ServerModule() {
    }
    return ServerModule;
}());
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
                providers: [
                    SERVER_RENDER_PROVIDERS,
                    SERVER_HTTP_PROVIDERS,
                    { provide: Testability, useValue: null },
                ],
            },] },
];
/** @nocollapse */
ServerModule.ctorParameters = function () { return []; };
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    var /** @type {?} */ config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document, config.url);
    }
    else {
        return ɵgetDOM().createHtmlDocument();
    }
}
/**
 * \@experimental
 */
var platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * \@experimental
 */
var platformDynamicServer = createPlatformFactory(ɵplatformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    var /** @type {?} */ extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * @template T
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then(function (moduleRef) {
        var /** @type {?} */ transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error("renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure\nthe server-rendered app can be properly bootstrapped into a client app.");
        }
        var /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
        return toPromise
            .call(first.call(filter.call(applicationRef.isStable, function (isStable) { return isStable; })))
            .then(function () {
            var /** @type {?} */ platformState = platform.injector.get(PlatformState);
            // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
            var /** @type {?} */ callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
            if (callbacks) {
                for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                    var callback = callbacks_1[_i];
                    try {
                        callback();
                    }
                    catch (e) {
                        // Ignore exceptions.
                        console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                    }
                }
            }
            var /** @type {?} */ output = platformState.renderToString();
            platform.destroy();
            return output;
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
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {\@link renderModuleFactory} instead.
 *
 * \@experimental
 * @template T
 * @param {?} module
 * @param {?} options
 * @return {?}
 */
function renderModule(module, options) {
    var /** @type {?} */ platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * \@experimental
 * @template T
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */
function renderModuleFactory(moduleFactory, options) {
    var /** @type {?} */ platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new Version('5.0.0-beta.6-f2945c6');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { PlatformState, ServerModule, platformDynamicServer, platformServer, BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformConfig, renderModule, renderModuleFactory, VERSION, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS, ServerRendererFactory2 as ɵServerRendererFactory2, SERVER_HTTP_PROVIDERS as ɵg, ServerXhr as ɵc, ServerXsrfStrategy as ɵd, httpFactory as ɵe, zoneWrappedInterceptingHandler as ɵf, instantiateServerRendererFactory as ɵa, ServerStylesHost as ɵb };
//# sourceMappingURL=index.js.map
