/**
 * @license Angular v4.0.0-beta.7-612f120
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common'), require('@angular/compiler'), require('@angular/http'), require('rxjs/Observable'), require('rxjs/Subject'), require('url'), require('rxjs/operator/filter'), require('rxjs/operator/first'), require('rxjs/operator/toPromise')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/common', '@angular/compiler', '@angular/http', 'rxjs/Observable', 'rxjs/Subject', 'url', 'rxjs/operator/filter', 'rxjs/operator/first', 'rxjs/operator/toPromise'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformServer = global.ng.platformServer || {}),global.ng.core,global.ng.platformBrowser,global.ng.common,global.ng.compiler,global._angular_http,global.rxjs_Observable,global.rxjs_Subject,global.url,global.rxjs_operator_filter,global.rxjs_operator_first,global.rxjs_operator_toPromise));
}(this, function (exports,_angular_core,_angular_platformBrowser,_angular_common,_angular_compiler,_angular_http,rxjs_Observable,rxjs_Subject,url,rxjs_operator_filter,rxjs_operator_first,rxjs_operator_toPromise) { 'use strict';

    var /** @type {?} */ DomAdapter = _angular_platformBrowser.__platform_browser_private__.DomAdapter;
    var /** @type {?} */ setRootDomAdapter = _angular_platformBrowser.__platform_browser_private__.setRootDomAdapter;
    var /** @type {?} */ getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
    var /** @type {?} */ SharedStylesHost = _angular_platformBrowser.__platform_browser_private__.SharedStylesHost;
    var /** @type {?} */ NAMESPACE_URIS = _angular_platformBrowser.__platform_browser_private__.NAMESPACE_URIS;
    var /** @type {?} */ shimContentAttribute = _angular_platformBrowser.__platform_browser_private__.shimContentAttribute;
    var /** @type {?} */ shimHostAttribute = _angular_platformBrowser.__platform_browser_private__.shimHostAttribute;
    var /** @type {?} */ flattenStyles = _angular_platformBrowser.__platform_browser_private__.flattenStyles;
    var /** @type {?} */ splitNamespace = _angular_platformBrowser.__platform_browser_private__.splitNamespace;
    var /** @type {?} */ isNamespaced = _angular_platformBrowser.__platform_browser_private__.isNamespaced;

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ parse5 = require('parse5');
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
        PlatformState.prototype.renderToString = function () { return getDOM().getInnerHTML(this._doc); };
        /**
         * Returns the current DOM state.
         * @return {?}
         */
        PlatformState.prototype.getDocument = function () { return this._doc; };
        return PlatformState;
    }());
    PlatformState.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    PlatformState.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
    ]; };

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ xhr2 = require('xhr2');
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
        { type: _angular_core.Injectable },
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
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ServerXsrfStrategy.ctorParameters = function () { return []; };
    var ZoneMacroTaskConnection = (function () {
        /**
         * @param {?} request
         * @param {?} backend
         */
        function ZoneMacroTaskConnection(request, backend) {
            var _this = this;
            this.request = request;
            this.response = new rxjs_Observable.Observable(function (observer) {
                var task = null;
                var scheduled = false;
                var sub = null;
                var savedResult = null;
                var savedError = null;
                var scheduleTask = function (_task) {
                    task = _task;
                    scheduled = true;
                    _this.lastConnection = backend.createConnection(request);
                    sub = _this.lastConnection.response
                        .subscribe(function (res) { return savedResult = res; }, function (err) {
                        if (!scheduled) {
                            throw new Error('invoke twice');
                        }
                        savedError = err;
                        scheduled = false;
                        task.invoke();
                    }, function () {
                        if (!scheduled) {
                            throw new Error('invoke twice');
                        }
                        scheduled = false;
                        task.invoke();
                    });
                };
                var cancelTask = function (_task) {
                    if (!scheduled) {
                        return;
                    }
                    scheduled = false;
                    if (sub) {
                        sub.unsubscribe();
                        sub = null;
                    }
                };
                var onComplete = function () {
                    if (savedError !== null) {
                        observer.error(savedError);
                    }
                    else {
                        observer.next(savedResult);
                        observer.complete();
                    }
                };
                // MockBackend is currently synchronous, which means that if scheduleTask is by
                // scheduleMacroTask, the request will hit MockBackend and the response will be
                // sent, causing task.invoke() to be called.
                var _task = Zone.current.scheduleMacroTask('ZoneMacroTaskConnection.subscribe', onComplete, {}, function () { return null; }, cancelTask);
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
        }
        Object.defineProperty(ZoneMacroTaskConnection.prototype, "readyState", {
            /**
             * @return {?}
             */
            get: function () {
                return !!this.lastConnection ? this.lastConnection.readyState : _angular_http.ReadyState.Unsent;
            },
            enumerable: true,
            configurable: true
        });
        return ZoneMacroTaskConnection;
    }());
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
    /**
     * @param {?} xhrBackend
     * @param {?} options
     * @return {?}
     */
    function httpFactory(xhrBackend, options) {
        var /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
        return new _angular_http.Http(macroBackend, options);
    }
    var /** @type {?} */ SERVER_HTTP_PROVIDERS = [
        { provide: _angular_http.Http, useFactory: httpFactory, deps: [_angular_http.XHRBackend, _angular_http.RequestOptions] },
        { provide: _angular_http.BrowserXhr, useClass: ServerXhr },
        { provide: _angular_http.XSRFStrategy, useClass: ServerXsrfStrategy },
    ];

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ globalScope;
    if (typeof window === 'undefined') {
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
            globalScope = (self);
        }
        else {
            globalScope = (global);
        }
    }
    else {
        globalScope = (window);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    // Need to declare a new variable for global here since TypeScript
    // exports the original value of the symbol.
    var /** @type {?} */ global$1 = globalScope;
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    global$1.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    function isPresent(obj) {
        return obj != null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isBlank(obj) {
        return obj == null;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return "" + token.overriddenName;
        }
        if (token.name) {
            return "" + token.name;
        }
        var /** @type {?} */ res = token.toString();
        var /** @type {?} */ newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    /**
     * @param {?} global
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    function setValueOnPath(global, path, value) {
        var /** @type {?} */ parts = path.split('.');
        var /** @type {?} */ obj = global;
        while (parts.length > 1) {
            var /** @type {?} */ name_1 = parts.shift();
            if (obj.hasOwnProperty(name_1) && obj[name_1] != null) {
                obj = obj[name_1];
            }
            else {
                obj = obj[name_1] = {};
            }
        }
        if (obj === undefined || obj === null) {
            obj = {};
        }
        obj[parts.shift()] = value;
    }

    /**
     * The DI token for setting the initial config for the platform.
     *
     * @experimental
     */
    var /** @type {?} */ INITIAL_CONFIG = new _angular_core.InjectionToken('Server.INITIAL_CONFIG');

    /**
     * @param {?} urlStr
     * @return {?}
     */
    function parseUrl(urlStr) {
        var /** @type {?} */ parsedUrl = url.parse(urlStr);
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
            this._hashUpdate = new rxjs_Subject.Subject();
            var config = _config;
            if (!!config && !!config.url) {
                var parsedUrl = parseUrl(config.url);
                this._path = parsedUrl.pathname;
                this._search = parsedUrl.search;
                this._hash = parsedUrl.hash;
            }
        }
        /**
         * @return {?}
         */
        ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { return getDOM().getBaseHref(this._doc); };
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
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ServerPlatformLocation.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [INITIAL_CONFIG,] },] },
    ]; };

    var ListWrapper = (function () {
        function ListWrapper() {
        }
        /**
         * @param {?} arr
         * @param {?} condition
         * @return {?}
         */
        ListWrapper.findLast = function (arr, condition) {
            for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
                if (condition(arr[i])) {
                    return arr[i];
                }
            }
            return null;
        };
        /**
         * @param {?} list
         * @param {?} items
         * @return {?}
         */
        ListWrapper.removeAll = function (list, items) {
            for (var /** @type {?} */ i = 0; i < items.length; ++i) {
                var /** @type {?} */ index = list.indexOf(items[i]);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
        };
        /**
         * @param {?} list
         * @param {?} el
         * @return {?}
         */
        ListWrapper.remove = function (list, el) {
            var /** @type {?} */ index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        ListWrapper.equals = function (a, b) {
            if (a.length != b.length)
                return false;
            for (var /** @type {?} */ i = 0; i < a.length; ++i) {
                if (a[i] !== b[i])
                    return false;
            }
            return true;
        };
        /**
         * @param {?} list
         * @return {?}
         */
        ListWrapper.flatten = function (list) {
            return list.reduce(function (flat, item) {
                var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
                return ((flat)).concat(flatItem);
            }, []);
        };
        return ListWrapper;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var /** @type {?} */ parse5$1 = require('parse5');
    var /** @type {?} */ treeAdapter;
    var /** @type {?} */ _attrToPropMap = {
        'class': 'className',
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex',
    };
    var /** @type {?} */ mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
    /**
     * @param {?} methodName
     * @return {?}
     */
    function _notImplemented(methodName) {
        return new Error('This method is not implemented in Parse5DomAdapter: ' + methodName);
    }
    /**
     * Parses a document string to a Document object.
     * @param {?} html
     * @return {?}
     */
    function parseDocument(html) {
        return parse5$1.parse(html, { treeAdapter: parse5$1.treeAdapters.htmlparser2 });
    }
    /**
     * A `DomAdapter` powered by the `parse5` NodeJS module.
     *
     * \@security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    var Parse5DomAdapter = (function (_super) {
        __extends(Parse5DomAdapter, _super);
        function Parse5DomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        Parse5DomAdapter.makeCurrent = function () {
            treeAdapter = parse5$1.treeAdapters.htmlparser2;
            setRootDomAdapter(new Parse5DomAdapter());
        };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasProperty = function (element, name) {
            return _HTMLElementPropertyList.indexOf(name) > -1;
        };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setProperty = function (el, name, value) {
            if (name === 'innerHTML') {
                this.setInnerHTML(el, value);
            }
            else if (name === 'className') {
                el.attribs['class'] = el.className = value;
            }
            else {
                el[name] = value;
            }
        };
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
        /**
         * @param {?} error
         * @return {?}
         */
        Parse5DomAdapter.prototype.logError = function (error) { console.error(error); };
        /**
         * @param {?} error
         * @return {?}
         */
        Parse5DomAdapter.prototype.log = function (error) { console.log(error); };
        /**
         * @param {?} error
         * @return {?}
         */
        Parse5DomAdapter.prototype.logGroup = function (error) { console.error(error); };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.logGroupEnd = function () { };
        Object.defineProperty(Parse5DomAdapter.prototype, "attrToPropMap", {
            /**
             * @return {?}
             */
            get: function () { return _attrToPropMap; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */
        Parse5DomAdapter.prototype.querySelector = function (el, selector) { return this.querySelectorAll(el, selector)[0]; };
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */
        Parse5DomAdapter.prototype.querySelectorAll = function (el, selector) {
            var _this = this;
            var /** @type {?} */ res = [];
            var /** @type {?} */ _recursive = function (result, node, selector, matcher) {
                var /** @type {?} */ cNodes = node.childNodes;
                if (cNodes && cNodes.length > 0) {
                    for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                        var /** @type {?} */ childNode = cNodes[i];
                        if (_this.elementMatches(childNode, selector, matcher)) {
                            result.push(childNode);
                        }
                        _recursive(result, childNode, selector, matcher);
                    }
                }
            };
            var /** @type {?} */ matcher = new _angular_compiler.SelectorMatcher();
            matcher.addSelectables(_angular_compiler.CssSelector.parse(selector));
            _recursive(res, el, selector, matcher);
            return res;
        };
        /**
         * @param {?} node
         * @param {?} selector
         * @param {?=} matcher
         * @return {?}
         */
        Parse5DomAdapter.prototype.elementMatches = function (node, selector, matcher) {
            if (matcher === void 0) { matcher = null; }
            if (this.isElementNode(node) && selector === '*') {
                return true;
            }
            var /** @type {?} */ result = false;
            if (selector && selector.charAt(0) == '#') {
                result = this.getAttribute(node, 'id') == selector.substring(1);
            }
            else if (selector) {
                if (!matcher) {
                    matcher = new _angular_compiler.SelectorMatcher();
                    matcher.addSelectables(_angular_compiler.CssSelector.parse(selector));
                }
                var /** @type {?} */ cssSelector = new _angular_compiler.CssSelector();
                cssSelector.setElement(this.tagName(node));
                if (node.attribs) {
                    for (var /** @type {?} */ attrName in node.attribs) {
                        cssSelector.addAttribute(attrName, node.attribs[attrName]);
                    }
                }
                var /** @type {?} */ classList = this.classList(node);
                for (var /** @type {?} */ i = 0; i < classList.length; i++) {
                    cssSelector.addClassName(classList[i]);
                }
                matcher.match(cssSelector, function (selector, cb) { result = true; });
            }
            return result;
        };
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */
        Parse5DomAdapter.prototype.on = function (el, evt, listener) {
            var /** @type {?} */ listenersMap = el._eventListenersMap;
            if (!listenersMap) {
                listenersMap = {};
                el._eventListenersMap = listenersMap;
            }
            var /** @type {?} */ listeners = listenersMap[evt] || [];
            listenersMap[evt] = listeners.concat([listener]);
        };
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */
        Parse5DomAdapter.prototype.onAndCancel = function (el, evt, listener) {
            this.on(el, evt, listener);
            return function () { ListWrapper.remove(/** @type {?} */ ((el._eventListenersMap[evt])), listener); };
        };
        /**
         * @param {?} el
         * @param {?} evt
         * @return {?}
         */
        Parse5DomAdapter.prototype.dispatchEvent = function (el, evt) {
            if (!evt.target) {
                evt.target = el;
            }
            if (el._eventListenersMap) {
                var /** @type {?} */ listeners = el._eventListenersMap[evt.type];
                if (listeners) {
                    for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
                        listeners[i](evt);
                    }
                }
            }
            if (el.parent) {
                this.dispatchEvent(el.parent, evt);
            }
            if (el._window) {
                this.dispatchEvent(el._window, evt);
            }
        };
        /**
         * @param {?} eventType
         * @return {?}
         */
        Parse5DomAdapter.prototype.createMouseEvent = function (eventType) { return this.createEvent(eventType); };
        /**
         * @param {?} eventType
         * @return {?}
         */
        Parse5DomAdapter.prototype.createEvent = function (eventType) {
            var /** @type {?} */ event = ({
                type: eventType,
                defaultPrevented: false,
                preventDefault: function () { ((event)).defaultPrevented = true; }
            });
            return event;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        Parse5DomAdapter.prototype.preventDefault = function (event) { event.returnValue = false; };
        /**
         * @param {?} event
         * @return {?}
         */
        Parse5DomAdapter.prototype.isPrevented = function (event) { return isPresent(event.returnValue) && !event.returnValue; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getInnerHTML = function (el) {
            return parse5$1.serialize(this.templateAwareRoot(el), { treeAdapter: treeAdapter });
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getTemplateContent = function (el) { return null; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getOuterHTML = function (el) {
            var /** @type {?} */ fragment = treeAdapter.createDocumentFragment();
            this.appendChild(fragment, el);
            return parse5$1.serialize(fragment, { treeAdapter: treeAdapter });
        };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.nodeName = function (node) { return node.tagName; };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.type = function (node) { throw _notImplemented('type'); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.content = function (node) { return node.childNodes[0]; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.parentElement = function (el) { return el.parent; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.childNodesAsList = function (el) {
            var /** @type {?} */ childNodes = el.childNodes;
            var /** @type {?} */ res = new Array(childNodes.length);
            for (var /** @type {?} */ i = 0; i < childNodes.length; i++) {
                res[i] = childNodes[i];
            }
            return res;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.clearNodes = function (el) {
            while (el.childNodes.length > 0) {
                this.remove(el.childNodes[0]);
            }
        };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.appendChild = function (el, node) {
            this.remove(node);
            treeAdapter.appendChild(this.templateAwareRoot(el), node);
        };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.removeChild = function (el, node) {
            if (el.childNodes.indexOf(node) > -1) {
                this.remove(node);
            }
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.remove = function (el) {
            var /** @type {?} */ parent = el.parent;
            if (parent) {
                var /** @type {?} */ index = parent.childNodes.indexOf(el);
                parent.childNodes.splice(index, 1);
            }
            var /** @type {?} */ prev = el.previousSibling;
            var /** @type {?} */ next = el.nextSibling;
            if (prev) {
                prev.next = next;
            }
            if (next) {
                next.prev = prev;
            }
            el.prev = null;
            el.next = null;
            el.parent = null;
            return el;
        };
        /**
         * @param {?} parent
         * @param {?} ref
         * @param {?} newNode
         * @return {?}
         */
        Parse5DomAdapter.prototype.insertBefore = function (parent, ref, newNode) {
            this.remove(newNode);
            if (ref) {
                treeAdapter.insertBefore(parent, newNode, ref);
            }
            else {
                this.appendChild(parent, newNode);
            }
        };
        /**
         * @param {?} parent
         * @param {?} ref
         * @param {?} nodes
         * @return {?}
         */
        Parse5DomAdapter.prototype.insertAllBefore = function (parent, ref, nodes) {
            var _this = this;
            nodes.forEach(function (n) { return _this.insertBefore(parent, ref, n); });
        };
        /**
         * @param {?} parent
         * @param {?} ref
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.insertAfter = function (parent, ref, node) {
            if (ref.nextSibling) {
                this.insertBefore(parent, ref.nextSibling, node);
            }
            else {
                this.appendChild(parent, node);
            }
        };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setInnerHTML = function (el, value) {
            this.clearNodes(el);
            var /** @type {?} */ content = parse5$1.parseFragment(value, { treeAdapter: treeAdapter });
            for (var /** @type {?} */ i = 0; i < content.childNodes.length; i++) {
                treeAdapter.appendChild(el, content.childNodes[i]);
            }
        };
        /**
         * @param {?} el
         * @param {?=} isRecursive
         * @return {?}
         */
        Parse5DomAdapter.prototype.getText = function (el, isRecursive) {
            if (this.isTextNode(el)) {
                return el.data;
            }
            if (this.isCommentNode(el)) {
                // In the DOM, comments within an element return an empty string for textContent
                // However, comment node instances return the comment content for textContent getter
                return isRecursive ? '' : el.data;
            }
            if (!el.childNodes || el.childNodes.length == 0) {
                return '';
            }
            var /** @type {?} */ textContent = '';
            for (var /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
                textContent += this.getText(el.childNodes[i], true);
            }
            return textContent;
        };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setText = function (el, value) {
            if (this.isTextNode(el) || this.isCommentNode(el)) {
                el.data = value;
            }
            else {
                this.clearNodes(el);
                if (value !== '')
                    treeAdapter.insertText(el, value);
            }
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getValue = function (el) { return el.value; };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setValue = function (el, value) { el.value = value; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getChecked = function (el) { return el.checked; };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
        /**
         * @param {?} text
         * @return {?}
         */
        Parse5DomAdapter.prototype.createComment = function (text) { return treeAdapter.createCommentNode(text); };
        /**
         * @param {?} html
         * @return {?}
         */
        Parse5DomAdapter.prototype.createTemplate = function (html) {
            var /** @type {?} */ template = treeAdapter.createElement('template', 'http://www.w3.org/1999/xhtml', []);
            var /** @type {?} */ content = parse5$1.parseFragment(html, { treeAdapter: treeAdapter });
            treeAdapter.setTemplateContent(template, content);
            return template;
        };
        /**
         * @param {?} tagName
         * @return {?}
         */
        Parse5DomAdapter.prototype.createElement = function (tagName) {
            return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
        };
        /**
         * @param {?} ns
         * @param {?} tagName
         * @return {?}
         */
        Parse5DomAdapter.prototype.createElementNS = function (ns, tagName) {
            return treeAdapter.createElement(tagName, ns, []);
        };
        /**
         * @param {?} text
         * @return {?}
         */
        Parse5DomAdapter.prototype.createTextNode = function (text) {
            var /** @type {?} */ t = (this.createComment(text));
            t.type = 'text';
            return t;
        };
        /**
         * @param {?} attrName
         * @param {?} attrValue
         * @return {?}
         */
        Parse5DomAdapter.prototype.createScriptTag = function (attrName, attrValue) {
            return treeAdapter.createElement('script', 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
        };
        /**
         * @param {?} css
         * @return {?}
         */
        Parse5DomAdapter.prototype.createStyleElement = function (css) {
            var /** @type {?} */ style = this.createElement('style');
            this.setText(style, css);
            return (style);
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.createShadowRoot = function (el) {
            el.shadowRoot = treeAdapter.createDocumentFragment();
            el.shadowRoot.parent = el;
            return el.shadowRoot;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getHost = function (el) { return el.host; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getDistributedNodes = function (el) { throw _notImplemented('getDistributedNodes'); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.clone = function (node) {
            var /** @type {?} */ _recursive = function (node) {
                var /** @type {?} */ nodeClone = Object.create(Object.getPrototypeOf(node));
                for (var /** @type {?} */ prop in node) {
                    var /** @type {?} */ desc = Object.getOwnPropertyDescriptor(node, prop);
                    if (desc && 'value' in desc && typeof desc.value !== 'object') {
                        nodeClone[prop] = node[prop];
                    }
                }
                nodeClone.parent = null;
                nodeClone.prev = null;
                nodeClone.next = null;
                nodeClone.children = null;
                mapProps.forEach(function (mapName) {
                    if (isPresent(node[mapName])) {
                        nodeClone[mapName] = {};
                        for (var /** @type {?} */ prop in node[mapName]) {
                            nodeClone[mapName][prop] = node[mapName][prop];
                        }
                    }
                });
                var /** @type {?} */ cNodes = node.children;
                if (cNodes) {
                    var /** @type {?} */ cNodesClone = new Array(cNodes.length);
                    for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                        var /** @type {?} */ childNode = cNodes[i];
                        var /** @type {?} */ childNodeClone = _recursive(childNode);
                        cNodesClone[i] = childNodeClone;
                        if (i > 0) {
                            childNodeClone.prev = cNodesClone[i - 1];
                            cNodesClone[i - 1].next = childNodeClone;
                        }
                        childNodeClone.parent = nodeClone;
                    }
                    nodeClone.children = cNodesClone;
                }
                return nodeClone;
            };
            return _recursive(node);
        };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.getElementsByClassName = function (element, name) {
            return this.querySelectorAll(element, '.' + name);
        };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.getElementsByTagName = function (element, name) {
            return this.querySelectorAll(element, name);
        };
        /**
         * @param {?} element
         * @return {?}
         */
        Parse5DomAdapter.prototype.classList = function (element) {
            var /** @type {?} */ classAttrValue = null;
            var /** @type {?} */ attributes = element.attribs;
            if (attributes && attributes.hasOwnProperty('class')) {
                classAttrValue = attributes['class'];
            }
            return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
        };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        Parse5DomAdapter.prototype.addClass = function (element, className) {
            var /** @type {?} */ classList = this.classList(element);
            var /** @type {?} */ index = classList.indexOf(className);
            if (index == -1) {
                classList.push(className);
                element.attribs['class'] = element.className = classList.join(' ');
            }
        };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        Parse5DomAdapter.prototype.removeClass = function (element, className) {
            var /** @type {?} */ classList = this.classList(element);
            var /** @type {?} */ index = classList.indexOf(className);
            if (index > -1) {
                classList.splice(index, 1);
                element.attribs['class'] = element.className = classList.join(' ');
            }
        };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasClass = function (element, className) {
            return this.classList(element).indexOf(className) > -1;
        };
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?=} styleValue
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
            if (styleValue === void 0) { styleValue = null; }
            var /** @type {?} */ value = this.getStyle(element, styleName) || '';
            return styleValue ? value == styleValue : value.length > 0;
        };
        /**
         * \@internal
         * @param {?} element
         * @return {?}
         */
        Parse5DomAdapter.prototype._readStyleAttribute = function (element) {
            var /** @type {?} */ styleMap = {};
            var /** @type {?} */ attributes = element.attribs;
            if (attributes && attributes.hasOwnProperty('style')) {
                var /** @type {?} */ styleAttrValue = attributes['style'];
                var /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
                for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                    if (styleList[i].length > 0) {
                        var /** @type {?} */ elems = styleList[i].split(/:+/g);
                        ((styleMap))[elems[0].trim()] = elems[1].trim();
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
        Parse5DomAdapter.prototype._writeStyleAttribute = function (element, styleMap) {
            var /** @type {?} */ styleAttrValue = '';
            for (var /** @type {?} */ key in styleMap) {
                var /** @type {?} */ newValue = styleMap[key];
                if (newValue) {
                    styleAttrValue += key + ':' + styleMap[key] + ';';
                }
            }
            element.attribs['style'] = styleAttrValue;
        };
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        Parse5DomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
            var /** @type {?} */ styleMap = this._readStyleAttribute(element);
            ((styleMap))[styleName] = styleValue;
            this._writeStyleAttribute(element, styleMap);
        };
        /**
         * @param {?} element
         * @param {?} styleName
         * @return {?}
         */
        Parse5DomAdapter.prototype.removeStyle = function (element, styleName) { this.setStyle(element, styleName, null); };
        /**
         * @param {?} element
         * @param {?} styleName
         * @return {?}
         */
        Parse5DomAdapter.prototype.getStyle = function (element, styleName) {
            var /** @type {?} */ styleMap = this._readStyleAttribute(element);
            return styleMap.hasOwnProperty(styleName) ? ((styleMap))[styleName] : '';
        };
        /**
         * @param {?} element
         * @return {?}
         */
        Parse5DomAdapter.prototype.tagName = function (element) { return element.tagName == 'style' ? 'STYLE' : element.tagName; };
        /**
         * @param {?} element
         * @return {?}
         */
        Parse5DomAdapter.prototype.attributeMap = function (element) {
            var /** @type {?} */ res = new Map();
            var /** @type {?} */ elAttrs = treeAdapter.getAttrList(element);
            for (var /** @type {?} */ i = 0; i < elAttrs.length; i++) {
                var /** @type {?} */ attrib = elAttrs[i];
                res.set(attrib.name, attrib.value);
            }
            return res;
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasAttribute = function (element, attribute) {
            return element.attribs && element.attribs.hasOwnProperty(attribute);
        };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        Parse5DomAdapter.prototype.getAttribute = function (element, attribute) {
            return element.attribs && element.attribs.hasOwnProperty(attribute) ?
                element.attribs[attribute] :
                null;
        };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */
        Parse5DomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
        /**
         * @param {?} element
         * @param {?} attribute
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setAttribute = function (element, attribute, value) {
            if (attribute) {
                element.attribs[attribute] = value;
                if (attribute === 'class') {
                    element.className = value;
                }
            }
        };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setAttributeNS = function (element, ns, attribute, value) {
            throw 'not implemented';
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        Parse5DomAdapter.prototype.removeAttribute = function (element, attribute) {
            if (attribute) {
                delete element.attribs[attribute];
            }
        };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.removeAttributeNS = function (element, ns, name) { throw 'not implemented'; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.templateAwareRoot = function (el) {
            return this.isTemplateElement(el) ? treeAdapter.getTemplateContent(el) : el;
        };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.createHtmlDocument = function () {
            var /** @type {?} */ newDoc = treeAdapter.createDocument();
            newDoc.title = 'fakeTitle';
            var /** @type {?} */ head = treeAdapter.createElement('head', null, []);
            var /** @type {?} */ body = treeAdapter.createElement('body', 'http://www.w3.org/1999/xhtml', []);
            this.appendChild(newDoc, head);
            this.appendChild(newDoc, body);
            newDoc['head'] = head;
            newDoc['body'] = body;
            newDoc['_window'] = {};
            return newDoc;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getBoundingClientRect = function (el) { return { left: 0, top: 0, width: 0, height: 0 }; };
        /**
         * @param {?} doc
         * @return {?}
         */
        Parse5DomAdapter.prototype.getTitle = function (doc) { return doc.title || ''; };
        /**
         * @param {?} doc
         * @param {?} newTitle
         * @return {?}
         */
        Parse5DomAdapter.prototype.setTitle = function (doc, newTitle) { doc.title = newTitle; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.isTemplateElement = function (el) {
            return this.isElementNode(el) && this.tagName(el) === 'template';
        };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.isTextNode = function (node) { return treeAdapter.isTextNode(node); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.isCommentNode = function (node) { return treeAdapter.isCommentNode(node); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.isElementNode = function (node) { return node ? treeAdapter.isElementNode(node) : false; };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.hasShadowRoot = function (node) { return isPresent(node.shadowRoot); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.isShadowRoot = function (node) { return this.getShadowRoot(node) == node; };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.importIntoDoc = function (node) { return this.clone(node); };
        /**
         * @param {?} node
         * @return {?}
         */
        Parse5DomAdapter.prototype.adoptNode = function (node) { return node; };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getHref = function (el) { return el.href; };
        /**
         * @param {?} el
         * @param {?} baseUrl
         * @param {?} href
         * @return {?}
         */
        Parse5DomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
            if (href == null) {
                el.href = baseUrl;
            }
            else {
                el.href = baseUrl + '/../' + href;
            }
        };
        /**
         * \@internal
         * @param {?} parsedRules
         * @param {?=} css
         * @return {?}
         */
        Parse5DomAdapter.prototype._buildRules = function (parsedRules, css) {
            var /** @type {?} */ rules = [];
            for (var /** @type {?} */ i = 0; i < parsedRules.length; i++) {
                var /** @type {?} */ parsedRule = parsedRules[i];
                var /** @type {?} */ rule = {};
                rule['cssText'] = css;
                rule['style'] = { content: '', cssText: '' };
                if (parsedRule.type == 'rule') {
                    rule['type'] = 1;
                    rule['selectorText'] =
                        parsedRule.selectors.join(', '.replace(/\s{2,}/g, ' ')
                            .replace(/\s*~\s*/g, ' ~ ')
                            .replace(/\s*\+\s*/g, ' + ')
                            .replace(/\s*>\s*/g, ' > ')
                            .replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                    if (isBlank(parsedRule.declarations)) {
                        continue;
                    }
                    for (var /** @type {?} */ j = 0; j < parsedRule.declarations.length; j++) {
                        var /** @type {?} */ declaration = parsedRule.declarations[j];
                        rule['style'] = declaration.property[declaration.value];
                        rule['style'].cssText += declaration.property + ': ' + declaration.value + ';';
                    }
                }
                else if (parsedRule.type == 'media') {
                    rule['type'] = 4;
                    rule['media'] = { mediaText: parsedRule.media };
                    if (parsedRule.rules) {
                        rule['cssRules'] = this._buildRules(parsedRule.rules);
                    }
                }
                rules.push(rule);
            }
            return rules;
        };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.supportsDOMEvents = function () { return false; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.supportsNativeShadowDOM = function () { return false; };
        /**
         * @param {?} doc
         * @param {?} target
         * @return {?}
         */
        Parse5DomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
            if (target == 'window') {
                return ((doc))._window;
            }
            else if (target == 'document') {
                return doc;
            }
            else if (target == 'body') {
                return doc.body;
            }
        };
        /**
         * @param {?} doc
         * @return {?}
         */
        Parse5DomAdapter.prototype.getBaseHref = function (doc) {
            var /** @type {?} */ base = this.querySelector(doc, 'base');
            var /** @type {?} */ href = '';
            if (base) {
                href = this.getHref(base);
            }
            // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
            return isBlank(href) ? null : href;
        };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.getData = function (el, name) { return this.getAttribute(el, 'data-' + name); };
        /**
         * @param {?} el
         * @return {?}
         */
        Parse5DomAdapter.prototype.getComputedStyle = function (el) { throw 'not implemented'; };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setData = function (el, name, value) { this.setAttribute(el, 'data-' + name, value); };
        /**
         * @param {?} path
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setGlobalVar = function (path, value) { setValueOnPath(global$1, path, value); };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.supportsWebAnimation = function () { return false; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.performanceNow = function () { return Date.now(); };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.getAnimationPrefix = function () { return ''; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.getTransitionEnd = function () { return 'transitionend'; };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.supportsAnimation = function () { return true; };
        /**
         * @param {?} el
         * @param {?} newNode
         * @param {?} oldNode
         * @return {?}
         */
        Parse5DomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw new Error('not implemented'); };
        /**
         * @param {?} templateHtml
         * @return {?}
         */
        Parse5DomAdapter.prototype.parse = function (templateHtml) { throw new Error('not implemented'); };
        /**
         * @param {?} el
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */
        Parse5DomAdapter.prototype.invoke = function (el, methodName, args) { throw new Error('not implemented'); };
        /**
         * @param {?} event
         * @return {?}
         */
        Parse5DomAdapter.prototype.getEventKey = function (event) { throw new Error('not implemented'); };
        /**
         * @return {?}
         */
        Parse5DomAdapter.prototype.supportsCookies = function () { return false; };
        /**
         * @param {?} name
         * @return {?}
         */
        Parse5DomAdapter.prototype.getCookie = function (name) { throw new Error('not implemented'); };
        /**
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        Parse5DomAdapter.prototype.setCookie = function (name, value) { throw new Error('not implemented'); };
        /**
         * @param {?} element
         * @param {?} keyframes
         * @param {?} options
         * @return {?}
         */
        Parse5DomAdapter.prototype.animate = function (element, keyframes, options) { throw new Error('not implemented'); };
        return Parse5DomAdapter;
    }(DomAdapter));
    // TODO: build a proper list, this one is all the keys of a HTMLInputElement
    var /** @type {?} */ _HTMLElementPropertyList = [
        'webkitEntries',
        'incremental',
        'webkitdirectory',
        'selectionDirection',
        'selectionEnd',
        'selectionStart',
        'labels',
        'validationMessage',
        'validity',
        'willValidate',
        'width',
        'valueAsNumber',
        'valueAsDate',
        'value',
        'useMap',
        'defaultValue',
        'type',
        'step',
        'src',
        'size',
        'required',
        'readOnly',
        'placeholder',
        'pattern',
        'name',
        'multiple',
        'min',
        'minLength',
        'maxLength',
        'max',
        'list',
        'indeterminate',
        'height',
        'formTarget',
        'formNoValidate',
        'formMethod',
        'formEnctype',
        'formAction',
        'files',
        'form',
        'disabled',
        'dirName',
        'checked',
        'defaultChecked',
        'autofocus',
        'autocomplete',
        'alt',
        'align',
        'accept',
        'onautocompleteerror',
        'onautocomplete',
        'onwaiting',
        'onvolumechange',
        'ontoggle',
        'ontimeupdate',
        'onsuspend',
        'onsubmit',
        'onstalled',
        'onshow',
        'onselect',
        'onseeking',
        'onseeked',
        'onscroll',
        'onresize',
        'onreset',
        'onratechange',
        'onprogress',
        'onplaying',
        'onplay',
        'onpause',
        'onmousewheel',
        'onmouseup',
        'onmouseover',
        'onmouseout',
        'onmousemove',
        'onmouseleave',
        'onmouseenter',
        'onmousedown',
        'onloadstart',
        'onloadedmetadata',
        'onloadeddata',
        'onload',
        'onkeyup',
        'onkeypress',
        'onkeydown',
        'oninvalid',
        'oninput',
        'onfocus',
        'onerror',
        'onended',
        'onemptied',
        'ondurationchange',
        'ondrop',
        'ondragstart',
        'ondragover',
        'ondragleave',
        'ondragenter',
        'ondragend',
        'ondrag',
        'ondblclick',
        'oncuechange',
        'oncontextmenu',
        'onclose',
        'onclick',
        'onchange',
        'oncanplaythrough',
        'oncanplay',
        'oncancel',
        'onblur',
        'onabort',
        'spellcheck',
        'isContentEditable',
        'contentEditable',
        'outerText',
        'innerText',
        'accessKey',
        'hidden',
        'webkitdropzone',
        'draggable',
        'tabIndex',
        'dir',
        'translate',
        'lang',
        'title',
        'childElementCount',
        'lastElementChild',
        'firstElementChild',
        'children',
        'onwebkitfullscreenerror',
        'onwebkitfullscreenchange',
        'nextElementSibling',
        'previousElementSibling',
        'onwheel',
        'onselectstart',
        'onsearch',
        'onpaste',
        'oncut',
        'oncopy',
        'onbeforepaste',
        'onbeforecut',
        'onbeforecopy',
        'shadowRoot',
        'dataset',
        'classList',
        'className',
        'outerHTML',
        'innerHTML',
        'scrollHeight',
        'scrollWidth',
        'scrollTop',
        'scrollLeft',
        'clientHeight',
        'clientWidth',
        'clientTop',
        'clientLeft',
        'offsetParent',
        'offsetHeight',
        'offsetWidth',
        'offsetTop',
        'offsetLeft',
        'localName',
        'prefix',
        'namespaceURI',
        'id',
        'style',
        'attributes',
        'tagName',
        'parentElement',
        'textContent',
        'baseURI',
        'ownerDocument',
        'nextSibling',
        'previousSibling',
        'lastChild',
        'firstChild',
        'childNodes',
        'parentNode',
        'nodeType',
        'nodeValue',
        'nodeName',
        'closure_lm_714617',
        '__jsaction',
    ];

    var /** @type {?} */ DebugDomRootRenderer = _angular_core.__core_private__.DebugDomRootRenderer;
    var /** @type {?} */ DebugDomRendererV2 = _angular_core.__core_private__.DebugDomRendererV2;
    var /** @type {?} */ ALLOW_MULTIPLE_PLATFORMS = _angular_core.__core_private__.ALLOW_MULTIPLE_PLATFORMS;

    var /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
    var /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
    var /** @type {?} */ EMPTY_ARRAY = [];
    var ServerRootRenderer = (function () {
        /**
         * @param {?} document
         * @param {?} sharedStylesHost
         * @param {?} animationDriver
         * @param {?} appId
         * @param {?} _zone
         */
        function ServerRootRenderer(document, sharedStylesHost, animationDriver, appId, _zone) {
            this.document = document;
            this.sharedStylesHost = sharedStylesHost;
            this.animationDriver = animationDriver;
            this.appId = appId;
            this._zone = _zone;
            this.registeredComponents = new Map();
            this._schema = new _angular_compiler.DomElementSchemaRegistry();
        }
        /**
         * @param {?} componentProto
         * @return {?}
         */
        ServerRootRenderer.prototype.renderComponent = function (componentProto) {
            var /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
            if (!renderer) {
                renderer = new ServerRenderer(this, componentProto, this.animationDriver, this.appId + "-" + componentProto.id, this._zone, this._schema);
                this.registeredComponents.set(componentProto.id, renderer);
            }
            return renderer;
        };
        return ServerRootRenderer;
    }());
    ServerRootRenderer.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ServerRootRenderer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
        { type: SharedStylesHost, },
        { type: _angular_platformBrowser.AnimationDriver, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_core.APP_ID,] },] },
        { type: _angular_core.NgZone, },
    ]; };
    var ServerRenderer = (function () {
        /**
         * @param {?} _rootRenderer
         * @param {?} componentProto
         * @param {?} _animationDriver
         * @param {?} styleShimId
         * @param {?} _zone
         * @param {?} _schema
         */
        function ServerRenderer(_rootRenderer, componentProto, _animationDriver, styleShimId, _zone, _schema) {
            this._rootRenderer = _rootRenderer;
            this.componentProto = componentProto;
            this._animationDriver = _animationDriver;
            this._zone = _zone;
            this._schema = _schema;
            this._styles = flattenStyles(styleShimId, componentProto.styles, []);
            if (componentProto.encapsulation === _angular_core.ViewEncapsulation.Native) {
                throw new Error('Native encapsulation is not supported on the server!');
            }
            this._rootRenderer.sharedStylesHost.addStyles(this._styles);
            if (this.componentProto.encapsulation === _angular_core.ViewEncapsulation.Emulated) {
                this._contentAttr = shimContentAttribute(styleShimId);
                this._hostAttr = shimHostAttribute(styleShimId);
            }
            else {
                this._contentAttr = null;
                this._hostAttr = null;
            }
        }
        /**
         * @param {?} selectorOrNode
         * @param {?} debugInfo
         * @return {?}
         */
        ServerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var /** @type {?} */ el /** TODO #9100 */;
            if (typeof selectorOrNode === 'string') {
                el = getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
                if (isBlank(el)) {
                    throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
                }
            }
            else {
                el = selectorOrNode;
            }
            getDOM().clearNodes(el);
            return el;
        };
        /**
         * @param {?} parent
         * @param {?} name
         * @param {?} debugInfo
         * @return {?}
         */
        ServerRenderer.prototype.createElement = function (parent, name, debugInfo) {
            var /** @type {?} */ el;
            if (isNamespaced(name)) {
                var /** @type {?} */ nsAndName = splitNamespace(name);
                el = getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]);
            }
            else {
                el = getDOM().createElement(name);
            }
            if (isPresent(this._contentAttr)) {
                getDOM().setAttribute(el, this._contentAttr, '');
            }
            if (isPresent(parent)) {
                getDOM().appendChild(parent, el);
            }
            return el;
        };
        /**
         * @param {?} hostElement
         * @return {?}
         */
        ServerRenderer.prototype.createViewRoot = function (hostElement) {
            var /** @type {?} */ nodesParent /** TODO #9100 */;
            if (isPresent(this._hostAttr)) {
                getDOM().setAttribute(hostElement, this._hostAttr, '');
            }
            nodesParent = hostElement;
            return nodesParent;
        };
        /**
         * @param {?} parentElement
         * @param {?} debugInfo
         * @return {?}
         */
        ServerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
            var /** @type {?} */ comment = getDOM().createComment(TEMPLATE_COMMENT_TEXT);
            if (isPresent(parentElement)) {
                getDOM().appendChild(parentElement, comment);
            }
            return comment;
        };
        /**
         * @param {?} parentElement
         * @param {?} value
         * @param {?} debugInfo
         * @return {?}
         */
        ServerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
            var /** @type {?} */ node = getDOM().createTextNode(value);
            if (isPresent(parentElement)) {
                getDOM().appendChild(parentElement, node);
            }
            return node;
        };
        /**
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        ServerRenderer.prototype.projectNodes = function (parentElement, nodes) {
            if (isBlank(parentElement))
                return;
            appendNodes(parentElement, nodes);
        };
        /**
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        ServerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); };
        /**
         * @param {?} viewRootNodes
         * @return {?}
         */
        ServerRenderer.prototype.detachView = function (viewRootNodes) {
            for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
                getDOM().remove(viewRootNodes[i]);
            }
        };
        /**
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        ServerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) { };
        /**
         * @param {?} renderElement
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        ServerRenderer.prototype.listen = function (renderElement, name, callback) {
            var _this = this;
            // Note: We are not using the EventsPlugin here as this is not needed
            // to run our tests.
            var /** @type {?} */ outsideHandler = function (event) { return _this._zone.runGuarded(function () { return callback(event); }); };
            return this._zone.runOutsideAngular(function () { return getDOM().onAndCancel(renderElement, name, outsideHandler); });
        };
        /**
         * @param {?} target
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        ServerRenderer.prototype.listenGlobal = function (target, name, callback) {
            var /** @type {?} */ renderElement = getDOM().getGlobalEventTarget(this._rootRenderer.document, target);
            return this.listen(renderElement, name, callback);
        };
        /**
         * @param {?} tagName
         * @param {?} propertyName
         * @return {?}
         */
        ServerRenderer.prototype._isSafeToReflectProperty = function (tagName, propertyName) {
            return this._schema.securityContext(tagName, propertyName, true) ===
                this._schema.securityContext(tagName, propertyName, false);
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        ServerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
            getDOM().setProperty(renderElement, propertyName, propertyValue);
            // Mirror property values for known HTML element properties in the attributes.
            var /** @type {?} */ tagName = ((renderElement.tagName)).toLowerCase();
            if (isPresent(propertyValue) &&
                (typeof propertyValue === 'number' || typeof propertyValue == 'string') &&
                this._schema.hasElement(tagName, EMPTY_ARRAY) &&
                this._schema.hasProperty(tagName, propertyName, EMPTY_ARRAY) &&
                this._isSafeToReflectProperty(tagName, propertyName)) {
                this.setElementAttribute(renderElement, propertyName, propertyValue.toString());
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        ServerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
            var /** @type {?} */ attrNs;
            var /** @type {?} */ attrNameWithoutNs = attributeName;
            if (isNamespaced(attributeName)) {
                var /** @type {?} */ nsAndName = splitNamespace(attributeName);
                attrNameWithoutNs = nsAndName[1];
                attributeName = nsAndName[0] + ':' + nsAndName[1];
                attrNs = NAMESPACE_URIS[nsAndName[0]];
            }
            if (isPresent(attributeValue)) {
                if (isPresent(attrNs)) {
                    getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
                }
                else {
                    getDOM().setAttribute(renderElement, attributeName, attributeValue);
                }
            }
            else {
                if (isPresent(attrNs)) {
                    getDOM().removeAttributeNS(renderElement, attrNs, attrNameWithoutNs);
                }
                else {
                    getDOM().removeAttribute(renderElement, attributeName);
                }
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        ServerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
            if (getDOM().isCommentNode(renderElement)) {
                var /** @type {?} */ existingBindings = getDOM().getText(renderElement).replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
                var /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
                ((parsedBindings) /** TODO #9100 */)[propertyName] = propertyValue;
                getDOM().setText(renderElement, TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2)));
            }
            else {
                this.setElementAttribute(renderElement, propertyName, propertyValue);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        ServerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
            if (isAdd) {
                getDOM().addClass(renderElement, className);
            }
            else {
                getDOM().removeClass(renderElement, className);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        ServerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
            if (isPresent(styleValue)) {
                getDOM().setStyle(renderElement, styleName, stringify(styleValue));
            }
            else {
                getDOM().removeStyle(renderElement, styleName);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */
        ServerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
            getDOM().invoke(renderElement, methodName, args);
        };
        /**
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        ServerRenderer.prototype.setText = function (renderNode, text) { getDOM().setText(renderNode, text); };
        /**
         * @param {?} element
         * @param {?} startingStyles
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?=} previousPlayers
         * @return {?}
         */
        ServerRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
            if (previousPlayers === void 0) { previousPlayers = []; }
            return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
        };
        return ServerRenderer;
    }());
    /**
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    function moveNodesAfterSibling(ref, nodes) {
        var /** @type {?} */ parent = getDOM().parentElement(ref);
        if (nodes.length > 0 && parent) {
            var /** @type {?} */ nextSibling = getDOM().nextSibling(ref);
            if (nextSibling) {
                for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                    getDOM().insertBefore(parent, nextSibling, nodes[i]);
                }
            }
            else {
                for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                    getDOM().appendChild(parent, nodes[i]);
                }
            }
        }
    }
    /**
     * @param {?} parent
     * @param {?} nodes
     * @return {?}
     */
    function appendNodes(parent, nodes) {
        for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
            getDOM().appendChild(parent, nodes[i]);
        }
    }
    var ServerRendererV2 = (function () {
        /**
         * @param {?} ngZone
         * @param {?} document
         */
        function ServerRendererV2(ngZone, document) {
            this.ngZone = ngZone;
            this.document = document;
        }
        /**
         * @param {?} name
         * @param {?=} namespace
         * @param {?=} debugInfo
         * @return {?}
         */
        ServerRendererV2.prototype.createElement = function (name, namespace, debugInfo) {
            if (namespace) {
                return getDOM().createElementNS(NAMESPACE_URIS[namespace], name);
            }
            return getDOM().createElement(name);
        };
        /**
         * @param {?} value
         * @param {?=} debugInfo
         * @return {?}
         */
        ServerRendererV2.prototype.createComment = function (value, debugInfo) { return getDOM().createComment(value); };
        /**
         * @param {?} value
         * @param {?=} debugInfo
         * @return {?}
         */
        ServerRendererV2.prototype.createText = function (value, debugInfo) { return getDOM().createTextNode(value); };
        /**
         * @param {?} parent
         * @param {?} newChild
         * @return {?}
         */
        ServerRendererV2.prototype.appendChild = function (parent, newChild) { getDOM().appendChild(parent, newChild); };
        /**
         * @param {?} parent
         * @param {?} newChild
         * @param {?} refChild
         * @return {?}
         */
        ServerRendererV2.prototype.insertBefore = function (parent, newChild, refChild) {
            if (parent) {
                getDOM().insertBefore(parent, refChild, newChild);
            }
        };
        /**
         * @param {?} parent
         * @param {?} oldChild
         * @return {?}
         */
        ServerRendererV2.prototype.removeChild = function (parent, oldChild) {
            if (parent) {
                getDOM().removeChild(parent, oldChild);
            }
        };
        /**
         * @param {?} selectorOrNode
         * @param {?=} debugInfo
         * @return {?}
         */
        ServerRendererV2.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var /** @type {?} */ el;
            if (typeof selectorOrNode === 'string') {
                el = getDOM().querySelector(this.document, selectorOrNode);
                if (!el) {
                    throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
                }
            }
            else {
                el = selectorOrNode;
            }
            getDOM().clearNodes(el);
            return el;
        };
        /**
         * @param {?} node
         * @return {?}
         */
        ServerRendererV2.prototype.parentNode = function (node) { return getDOM().parentElement(node); };
        /**
         * @param {?} node
         * @return {?}
         */
        ServerRendererV2.prototype.nextSibling = function (node) { return getDOM().nextSibling(node); };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @param {?=} namespace
         * @return {?}
         */
        ServerRendererV2.prototype.setAttribute = function (el, name, value, namespace) {
            if (namespace) {
                getDOM().setAttributeNS(el, NAMESPACE_URIS[namespace], namespace + ':' + name, value);
            }
            else {
                getDOM().setAttribute(el, name, value);
            }
        };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */
        ServerRendererV2.prototype.removeAttribute = function (el, name, namespace) {
            if (namespace) {
                getDOM().removeAttributeNS(el, NAMESPACE_URIS[namespace], name);
            }
            else {
                getDOM().removeAttribute(el, name);
            }
        };
        /**
         * @param {?} el
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        ServerRendererV2.prototype.setBindingDebugInfo = function (el, propertyName, propertyValue) {
            if (getDOM().isCommentNode(el)) {
                var /** @type {?} */ m = getDOM().getText(el).replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
                var /** @type {?} */ obj = m === null ? {} : JSON.parse(m[1]);
                obj[propertyName] = propertyValue;
                getDOM().setText(el, TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(obj, null, 2)));
            }
            else {
                this.setAttribute(el, propertyName, propertyValue);
            }
        };
        /**
         * @param {?} el
         * @param {?} propertyName
         * @return {?}
         */
        ServerRendererV2.prototype.removeBindingDebugInfo = function (el, propertyName) {
            if (getDOM().isCommentNode(el)) {
                var /** @type {?} */ m = getDOM().getText(el).replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
                var /** @type {?} */ obj = m === null ? {} : JSON.parse(m[1]);
                delete obj[propertyName];
                getDOM().setText(el, TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(obj, null, 2)));
            }
            else {
                this.removeAttribute(el, propertyName);
            }
        };
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        ServerRendererV2.prototype.addClass = function (el, name) { getDOM().addClass(el, name); };
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        ServerRendererV2.prototype.removeClass = function (el, name) { getDOM().removeClass(el, name); };
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */
        ServerRendererV2.prototype.setStyle = function (el, style, value, hasVendorPrefix, hasImportant) {
            getDOM().setStyle(el, style, value);
        };
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */
        ServerRendererV2.prototype.removeStyle = function (el, style, hasVendorPrefix) {
            getDOM().removeStyle(el, style);
        };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        ServerRendererV2.prototype.setProperty = function (el, name, value) { getDOM().setProperty(el, name, value); };
        /**
         * @param {?} node
         * @param {?} value
         * @return {?}
         */
        ServerRendererV2.prototype.setText = function (node, value) { getDOM().setText(node, value); };
        /**
         * @param {?} target
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        ServerRendererV2.prototype.listen = function (target, eventName, callback) {
            var _this = this;
            // Note: We are not using the EventsPlugin here as this is not needed
            // to run our tests.
            var /** @type {?} */ el = typeof target === 'string' ? getDOM().getGlobalEventTarget(this.document, target) : target;
            var /** @type {?} */ outsideHandler = function (event) { return _this.ngZone.runGuarded(function () { return callback(event); }); };
            return this.ngZone.runOutsideAngular(function () { return getDOM().onAndCancel(el, eventName, outsideHandler); });
        };
        return ServerRendererV2;
    }());
    ServerRendererV2.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ServerRendererV2.ctorParameters = function () { return [
        { type: _angular_core.NgZone, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
    ]; };

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ServerStylesHost = (function (_super) {
        __extends$1(ServerStylesHost, _super);
        /**
         * @param {?} doc
         * @param {?} appRef
         */
        function ServerStylesHost(doc, appRef) {
            var _this = _super.call(this) || this;
            _this.doc = doc;
            _this.appRef = appRef;
            _this.root = null;
            _this.buffer = [];
            return _this;
        }
        /**
         * @param {?} style
         * @return {?}
         */
        ServerStylesHost.prototype._addStyle = function (style) {
            var /** @type {?} */ adapter = (getDOM());
            var /** @type {?} */ el = adapter.createElement('style');
            adapter.setText(el, style);
            adapter.appendChild(this.root, el);
        };
        /**
         * @param {?} additions
         * @return {?}
         */
        ServerStylesHost.prototype.onStylesAdded = function (additions) {
            var _this = this;
            if (!this.root) {
                additions.forEach(function (style) { return _this.buffer.push(style); });
            }
            else {
                additions.forEach(function (style) { return _this._addStyle(style); });
            }
        };
        /**
         * @return {?}
         */
        ServerStylesHost.prototype.rootComponentIsReady = function () {
            var _this = this;
            if (!!this.root) {
                return;
            }
            this.root = this.appRef.components[0].location.nativeElement;
            this.buffer.forEach(function (style) { return _this._addStyle(style); });
            this.buffer = null;
        };
        return ServerStylesHost;
    }(SharedStylesHost));
    ServerStylesHost.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ServerStylesHost.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
        { type: _angular_core.ApplicationRef, },
    ]; };

    var /** @type {?} */ INTERNAL_SERVER_PLATFORM_PROVIDERS = [
        { provide: _angular_platformBrowser.DOCUMENT, useFactory: _document, deps: [_angular_core.Injector] },
        { provide: _angular_core.PLATFORM_INITIALIZER, useFactory: initParse5Adapter, multi: true, deps: [_angular_core.Injector] },
        { provide: _angular_common.PlatformLocation, useClass: ServerPlatformLocation }, PlatformState,
        // Add special provider that allows multiple instances of platformServer* to be created.
        { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
    ];
    /**
     * @param {?} injector
     * @return {?}
     */
    function initParse5Adapter(injector) {
        return function () { Parse5DomAdapter.makeCurrent(); };
    }
    /**
     * @param {?} rootRenderer
     * @return {?}
     */
    function _createConditionalRootRenderer(rootRenderer) {
        return _angular_core.isDevMode() ? new DebugDomRootRenderer(rootRenderer) : rootRenderer;
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    function _createDebugRendererV2(renderer) {
        return _angular_core.isDevMode() ? new DebugDomRendererV2(renderer) : renderer;
    }
    /**
     * @param {?} stylesHost
     * @return {?}
     */
    function _addStylesToRootComponentFactory(stylesHost) {
        var /** @type {?} */ initializer = function () { return stylesHost.rootComponentIsReady(); };
        return initializer;
    }
    var /** @type {?} */ SERVER_RENDER_PROVIDERS = [
        ServerRootRenderer,
        { provide: _angular_core.RENDERER_V2_DIRECT, useClass: ServerRendererV2 },
        { provide: _angular_core.RendererV2, useFactory: _createDebugRendererV2, deps: [_angular_core.RENDERER_V2_DIRECT] },
        { provide: _angular_core.RootRenderer, useFactory: _createConditionalRootRenderer, deps: [ServerRootRenderer] },
        ServerStylesHost,
        { provide: SharedStylesHost, useExisting: ServerStylesHost },
        {
            provide: _angular_core.APP_BOOTSTRAP_LISTENER,
            useFactory: _addStylesToRootComponentFactory,
            deps: [ServerStylesHost],
            multi: true
        },
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
        { type: _angular_core.NgModule, args: [{
                    exports: [_angular_platformBrowser.BrowserModule],
                    imports: [_angular_http.HttpModule],
                    providers: [SERVER_RENDER_PROVIDERS, SERVER_HTTP_PROVIDERS],
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
            return parseDocument(config.document);
        }
        else {
            return getDOM().createHtmlDocument();
        }
    }
    /**
     * @experimental
     */
    var /** @type {?} */ platformServer = _angular_core.createPlatformFactory(_angular_core.platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
    /**
     * The server platform that supports the runtime compiler.
     *
     * @experimental
     */
    var /** @type {?} */ platformDynamicServer = _angular_core.createPlatformFactory(_angular_compiler.platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

    var /** @type {?} */ parse5$2 = require('parse5');
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
     * @param {?} platform
     * @param {?} moduleRefPromise
     * @return {?}
     */
    function _render(platform, moduleRefPromise) {
        return moduleRefPromise.then(function (moduleRef) {
            var /** @type {?} */ applicationRef = moduleRef.injector.get(_angular_core.ApplicationRef);
            return rxjs_operator_toPromise.toPromise
                .call(rxjs_operator_first.first.call(rxjs_operator_filter.filter.call(applicationRef.isStable, function (isStable) { return isStable; })))
                .then(function () {
                var /** @type {?} */ output = platform.injector.get(PlatformState).renderToString();
                platform.destroy();
                return output;
            });
        });
    }
    /**
     * Renders a Module to string.
     *
     * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
     * {link renderModuleFactory} instead.
     *
     * \@experimental
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
     * \@experimental
     * @param {?} moduleFactory
     * @param {?} options
     * @return {?}
     */
    function renderModuleFactory(moduleFactory, options) {
        var /** @type {?} */ platform = _getPlatform(platformServer, options);
        return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
    }

    var /** @type {?} */ __platform_server_private__ = {
        INTERNAL_SERVER_PLATFORM_PROVIDERS: INTERNAL_SERVER_PLATFORM_PROVIDERS,
        SERVER_RENDER_PROVIDERS: SERVER_RENDER_PROVIDERS,
    };

    /**
     * @stable
     */
    var /** @type {?} */ VERSION = new _angular_core.Version('4.0.0-beta.7-612f120');

    exports.PlatformState = PlatformState;
    exports.ServerModule = ServerModule;
    exports.platformDynamicServer = platformDynamicServer;
    exports.platformServer = platformServer;
    exports.INITIAL_CONFIG = INITIAL_CONFIG;
    exports.renderModule = renderModule;
    exports.renderModuleFactory = renderModuleFactory;
    exports.VERSION = VERSION;
    exports.__platform_server_private__ = __platform_server_private__;

}));