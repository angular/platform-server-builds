/**
 * @license Angular v16.0.0-next.1+sha-b5278cc
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵsetRootDomAdapter, DOCUMENT, XhrFactory, PlatformLocation, ɵgetDOM, ɵPLATFORM_SERVER_ID, ViewportScroller, ɵNullViewportScroller } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Inject, InjectionToken, inject, EnvironmentInjector, Optional, ViewEncapsulation, RendererStyleFlags2, APP_ID, ɵescapeTransferStateContent, NgModule, Injector, PLATFORM_ID, PLATFORM_INITIALIZER, ɵALLOW_MULTIPLE_PLATFORMS, RendererFactory2, NgZone, Testability, ɵTESTABILITY, ɵsetDocument, createPlatformFactory, platformCore, Renderer2, ApplicationRef, ɵisPromise, importProvidersFrom, ɵinternalCreateApplication, ɵgetComponentDef, Version } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { ɵBrowserDomAdapter, ɵshimStyles, ɵNAMESPACE_URIS, ɵshimContentAttribute, ɵshimHostAttribute, ɵSharedStylesHost, ɵTRANSITION_ID, TransferState, EVENT_MANAGER_PLUGINS, BrowserModule } from '@angular/platform-browser';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { ɵHttpInterceptorHandler, HttpBackend, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ɵplatformCoreDynamic } from '@angular/platform-browser-dynamic';
import { ɵAnimationRendererFactory, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import * as xhr2 from 'xhr2';
import * as url from 'url';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { first } from 'rxjs/operators';

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
// external/npm/node_modules/domino/lib/Event.js
var require_Event = __commonJS({
    "external/npm/node_modules/domino/lib/Event.js"(exports, module) {
        "use strict";
        module.exports = Event;
        Event.CAPTURING_PHASE = 1;
        Event.AT_TARGET = 2;
        Event.BUBBLING_PHASE = 3;
        function Event(type, dictionary) {
            this.type = "";
            this.target = null;
            this.currentTarget = null;
            this.eventPhase = Event.AT_TARGET;
            this.bubbles = false;
            this.cancelable = false;
            this.isTrusted = false;
            this.defaultPrevented = false;
            this.timeStamp = Date.now();
            this._propagationStopped = false;
            this._immediatePropagationStopped = false;
            this._initialized = true;
            this._dispatching = false;
            if (type)
                this.type = type;
            if (dictionary) {
                for (var p in dictionary) {
                    this[p] = dictionary[p];
                }
            }
        }
        Event.prototype = Object.create(Object.prototype, {
            constructor: { value: Event },
            stopPropagation: { value: function stopPropagation() {
                    this._propagationStopped = true;
                } },
            stopImmediatePropagation: { value: function stopImmediatePropagation() {
                    this._propagationStopped = true;
                    this._immediatePropagationStopped = true;
                } },
            preventDefault: { value: function preventDefault() {
                    if (this.cancelable)
                        this.defaultPrevented = true;
                } },
            initEvent: { value: function initEvent(type, bubbles, cancelable) {
                    this._initialized = true;
                    if (this._dispatching)
                        return;
                    this._propagationStopped = false;
                    this._immediatePropagationStopped = false;
                    this.defaultPrevented = false;
                    this.isTrusted = false;
                    this.target = null;
                    this.type = type;
                    this.bubbles = bubbles;
                    this.cancelable = cancelable;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/UIEvent.js
var require_UIEvent = __commonJS({
    "external/npm/node_modules/domino/lib/UIEvent.js"(exports, module) {
        "use strict";
        var Event = require_Event();
        module.exports = UIEvent;
        function UIEvent() {
            Event.call(this);
            this.view = null;
            this.detail = 0;
        }
        UIEvent.prototype = Object.create(Event.prototype, {
            constructor: { value: UIEvent },
            initUIEvent: { value: function (type, bubbles, cancelable, view, detail) {
                    this.initEvent(type, bubbles, cancelable);
                    this.view = view;
                    this.detail = detail;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/MouseEvent.js
var require_MouseEvent = __commonJS({
    "external/npm/node_modules/domino/lib/MouseEvent.js"(exports, module) {
        "use strict";
        var UIEvent = require_UIEvent();
        module.exports = MouseEvent;
        function MouseEvent() {
            UIEvent.call(this);
            this.screenX = this.screenY = this.clientX = this.clientY = 0;
            this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = false;
            this.button = 0;
            this.buttons = 1;
            this.relatedTarget = null;
        }
        MouseEvent.prototype = Object.create(UIEvent.prototype, {
            constructor: { value: MouseEvent },
            initMouseEvent: { value: function (type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
                    this.initEvent(type, bubbles, cancelable, view, detail);
                    this.screenX = screenX;
                    this.screenY = screenY;
                    this.clientX = clientX;
                    this.clientY = clientY;
                    this.ctrlKey = ctrlKey;
                    this.altKey = altKey;
                    this.shiftKey = shiftKey;
                    this.metaKey = metaKey;
                    this.button = button;
                    switch (button) {
                        case 0:
                            this.buttons = 1;
                            break;
                        case 1:
                            this.buttons = 4;
                            break;
                        case 2:
                            this.buttons = 2;
                            break;
                        default:
                            this.buttons = 0;
                            break;
                    }
                    this.relatedTarget = relatedTarget;
                } },
            getModifierState: { value: function (key) {
                    switch (key) {
                        case "Alt":
                            return this.altKey;
                        case "Control":
                            return this.ctrlKey;
                        case "Shift":
                            return this.shiftKey;
                        case "Meta":
                            return this.metaKey;
                        default:
                            return false;
                    }
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/DOMException.js
var require_DOMException = __commonJS({
    "external/npm/node_modules/domino/lib/DOMException.js"(exports, module) {
        "use strict";
        module.exports = DOMException;
        var INDEX_SIZE_ERR = 1;
        var HIERARCHY_REQUEST_ERR = 3;
        var WRONG_DOCUMENT_ERR = 4;
        var INVALID_CHARACTER_ERR = 5;
        var NO_MODIFICATION_ALLOWED_ERR = 7;
        var NOT_FOUND_ERR = 8;
        var NOT_SUPPORTED_ERR = 9;
        var INVALID_STATE_ERR = 11;
        var SYNTAX_ERR = 12;
        var INVALID_MODIFICATION_ERR = 13;
        var NAMESPACE_ERR = 14;
        var INVALID_ACCESS_ERR = 15;
        var TYPE_MISMATCH_ERR = 17;
        var SECURITY_ERR = 18;
        var NETWORK_ERR = 19;
        var ABORT_ERR = 20;
        var URL_MISMATCH_ERR = 21;
        var QUOTA_EXCEEDED_ERR = 22;
        var TIMEOUT_ERR = 23;
        var INVALID_NODE_TYPE_ERR = 24;
        var DATA_CLONE_ERR = 25;
        var names = [
            null,
            "INDEX_SIZE_ERR",
            null,
            "HIERARCHY_REQUEST_ERR",
            "WRONG_DOCUMENT_ERR",
            "INVALID_CHARACTER_ERR",
            null,
            "NO_MODIFICATION_ALLOWED_ERR",
            "NOT_FOUND_ERR",
            "NOT_SUPPORTED_ERR",
            "INUSE_ATTRIBUTE_ERR",
            "INVALID_STATE_ERR",
            "SYNTAX_ERR",
            "INVALID_MODIFICATION_ERR",
            "NAMESPACE_ERR",
            "INVALID_ACCESS_ERR",
            null,
            "TYPE_MISMATCH_ERR",
            "SECURITY_ERR",
            "NETWORK_ERR",
            "ABORT_ERR",
            "URL_MISMATCH_ERR",
            "QUOTA_EXCEEDED_ERR",
            "TIMEOUT_ERR",
            "INVALID_NODE_TYPE_ERR",
            "DATA_CLONE_ERR"
        ];
        var messages = [
            null,
            "INDEX_SIZE_ERR (1): the index is not in the allowed range",
            null,
            "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model",
            "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required",
            "INVALID_CHARACTER_ERR (5): the string contains invalid characters",
            null,
            "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified",
            "NOT_FOUND_ERR (8): the object can not be found here",
            "NOT_SUPPORTED_ERR (9): this operation is not supported",
            "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute",
            "INVALID_STATE_ERR (11): the object is in an invalid state",
            "SYNTAX_ERR (12): the string did not match the expected pattern",
            "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way",
            "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML",
            "INVALID_ACCESS_ERR (15): the object does not support the operation or argument",
            null,
            "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type",
            "SECURITY_ERR (18): the operation is insecure",
            "NETWORK_ERR (19): a network error occurred",
            "ABORT_ERR (20): the user aborted an operation",
            "URL_MISMATCH_ERR (21): the given URL does not match another URL",
            "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded",
            "TIMEOUT_ERR (23): a timeout occurred",
            "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation",
            "DATA_CLONE_ERR (25): the object can not be cloned."
        ];
        var constants = {
            INDEX_SIZE_ERR,
            DOMSTRING_SIZE_ERR: 2,
            HIERARCHY_REQUEST_ERR,
            WRONG_DOCUMENT_ERR,
            INVALID_CHARACTER_ERR,
            NO_DATA_ALLOWED_ERR: 6,
            NO_MODIFICATION_ALLOWED_ERR,
            NOT_FOUND_ERR,
            NOT_SUPPORTED_ERR,
            INUSE_ATTRIBUTE_ERR: 10,
            INVALID_STATE_ERR,
            SYNTAX_ERR,
            INVALID_MODIFICATION_ERR,
            NAMESPACE_ERR,
            INVALID_ACCESS_ERR,
            VALIDATION_ERR: 16,
            TYPE_MISMATCH_ERR,
            SECURITY_ERR,
            NETWORK_ERR,
            ABORT_ERR,
            URL_MISMATCH_ERR,
            QUOTA_EXCEEDED_ERR,
            TIMEOUT_ERR,
            INVALID_NODE_TYPE_ERR,
            DATA_CLONE_ERR
        };
        function DOMException(code) {
            Error.call(this);
            Error.captureStackTrace(this, this.constructor);
            this.code = code;
            this.message = messages[code];
            this.name = names[code];
        }
        DOMException.prototype.__proto__ = Error.prototype;
        for (c in constants) {
            v = { value: constants[c] };
            Object.defineProperty(DOMException, c, v);
            Object.defineProperty(DOMException.prototype, c, v);
        }
        var v;
        var c;
    }
});
// external/npm/node_modules/domino/lib/config.js
var require_config = __commonJS({
    "external/npm/node_modules/domino/lib/config.js"(exports) {
        exports.isApiWritable = !global.__domino_frozen__;
    }
});
// external/npm/node_modules/domino/lib/utils.js
var require_utils = __commonJS({
    "external/npm/node_modules/domino/lib/utils.js"(exports) {
        "use strict";
        var DOMException = require_DOMException();
        var ERR = DOMException;
        var isApiWritable = require_config().isApiWritable;
        exports.NAMESPACE = {
            HTML: "http://www.w3.org/1999/xhtml",
            XML: "http://www.w3.org/XML/1998/namespace",
            XMLNS: "http://www.w3.org/2000/xmlns/",
            MATHML: "http://www.w3.org/1998/Math/MathML",
            SVG: "http://www.w3.org/2000/svg",
            XLINK: "http://www.w3.org/1999/xlink"
        };
        exports.IndexSizeError = function () {
            throw new DOMException(ERR.INDEX_SIZE_ERR);
        };
        exports.HierarchyRequestError = function () {
            throw new DOMException(ERR.HIERARCHY_REQUEST_ERR);
        };
        exports.WrongDocumentError = function () {
            throw new DOMException(ERR.WRONG_DOCUMENT_ERR);
        };
        exports.InvalidCharacterError = function () {
            throw new DOMException(ERR.INVALID_CHARACTER_ERR);
        };
        exports.NoModificationAllowedError = function () {
            throw new DOMException(ERR.NO_MODIFICATION_ALLOWED_ERR);
        };
        exports.NotFoundError = function () {
            throw new DOMException(ERR.NOT_FOUND_ERR);
        };
        exports.NotSupportedError = function () {
            throw new DOMException(ERR.NOT_SUPPORTED_ERR);
        };
        exports.InvalidStateError = function () {
            throw new DOMException(ERR.INVALID_STATE_ERR);
        };
        exports.SyntaxError = function () {
            throw new DOMException(ERR.SYNTAX_ERR);
        };
        exports.InvalidModificationError = function () {
            throw new DOMException(ERR.INVALID_MODIFICATION_ERR);
        };
        exports.NamespaceError = function () {
            throw new DOMException(ERR.NAMESPACE_ERR);
        };
        exports.InvalidAccessError = function () {
            throw new DOMException(ERR.INVALID_ACCESS_ERR);
        };
        exports.TypeMismatchError = function () {
            throw new DOMException(ERR.TYPE_MISMATCH_ERR);
        };
        exports.SecurityError = function () {
            throw new DOMException(ERR.SECURITY_ERR);
        };
        exports.NetworkError = function () {
            throw new DOMException(ERR.NETWORK_ERR);
        };
        exports.AbortError = function () {
            throw new DOMException(ERR.ABORT_ERR);
        };
        exports.UrlMismatchError = function () {
            throw new DOMException(ERR.URL_MISMATCH_ERR);
        };
        exports.QuotaExceededError = function () {
            throw new DOMException(ERR.QUOTA_EXCEEDED_ERR);
        };
        exports.TimeoutError = function () {
            throw new DOMException(ERR.TIMEOUT_ERR);
        };
        exports.InvalidNodeTypeError = function () {
            throw new DOMException(ERR.INVALID_NODE_TYPE_ERR);
        };
        exports.DataCloneError = function () {
            throw new DOMException(ERR.DATA_CLONE_ERR);
        };
        exports.nyi = function () {
            throw new Error("NotYetImplemented");
        };
        exports.shouldOverride = function () {
            throw new Error("Abstract function; should be overriding in subclass.");
        };
        exports.assert = function (expr, msg) {
            if (!expr) {
                throw new Error("Assertion failed: " + (msg || "") + "\n" + new Error().stack);
            }
        };
        exports.expose = function (src, c) {
            for (var n in src) {
                Object.defineProperty(c.prototype, n, { value: src[n], writable: isApiWritable });
            }
        };
        exports.merge = function (a, b) {
            for (var n in b) {
                a[n] = b[n];
            }
        };
        exports.documentOrder = function (n, m) {
            return 3 - (n.compareDocumentPosition(m) & 6);
        };
        exports.toASCIILowerCase = function (s) {
            return s.replace(/[A-Z]+/g, function (c) {
                return c.toLowerCase();
            });
        };
        exports.toASCIIUpperCase = function (s) {
            return s.replace(/[a-z]+/g, function (c) {
                return c.toUpperCase();
            });
        };
    }
});
// external/npm/node_modules/domino/lib/EventTarget.js
var require_EventTarget = __commonJS({
    "external/npm/node_modules/domino/lib/EventTarget.js"(exports, module) {
        "use strict";
        var Event = require_Event();
        var MouseEvent = require_MouseEvent();
        var utils = require_utils();
        module.exports = EventTarget;
        function EventTarget() {
        }
        EventTarget.prototype = {
            addEventListener: function addEventListener(type, listener, capture) {
                if (!listener)
                    return;
                if (capture === void 0)
                    capture = false;
                if (!this._listeners)
                    this._listeners = /* @__PURE__ */ Object.create(null);
                if (!this._listeners[type])
                    this._listeners[type] = [];
                var list = this._listeners[type];
                for (var i = 0, n = list.length; i < n; i++) {
                    var l = list[i];
                    if (l.listener === listener && l.capture === capture)
                        return;
                }
                var obj = { listener, capture };
                if (typeof listener === "function")
                    obj.f = listener;
                list.push(obj);
            },
            removeEventListener: function removeEventListener(type, listener, capture) {
                if (capture === void 0)
                    capture = false;
                if (this._listeners) {
                    var list = this._listeners[type];
                    if (list) {
                        for (var i = 0, n = list.length; i < n; i++) {
                            var l = list[i];
                            if (l.listener === listener && l.capture === capture) {
                                if (list.length === 1) {
                                    this._listeners[type] = void 0;
                                }
                                else {
                                    list.splice(i, 1);
                                }
                                return;
                            }
                        }
                    }
                }
            },
            dispatchEvent: function dispatchEvent(event) {
                return this._dispatchEvent(event, false);
            },
            _dispatchEvent: function _dispatchEvent(event, trusted) {
                if (typeof trusted !== "boolean")
                    trusted = false;
                function invoke(target, event2) {
                    var type = event2.type, phase = event2.eventPhase;
                    event2.currentTarget = target;
                    if (phase !== Event.CAPTURING_PHASE && target._handlers && target._handlers[type]) {
                        var handler = target._handlers[type];
                        var rv;
                        if (typeof handler === "function") {
                            rv = handler.call(event2.currentTarget, event2);
                        }
                        else {
                            var f = handler.handleEvent;
                            if (typeof f !== "function")
                                throw new TypeError("handleEvent property of event handler object isnot a function.");
                            rv = f.call(handler, event2);
                        }
                        switch (event2.type) {
                            case "mouseover":
                                if (rv === true)
                                    event2.preventDefault();
                                break;
                            case "beforeunload":
                            default:
                                if (rv === false)
                                    event2.preventDefault();
                                break;
                        }
                    }
                    var list = target._listeners && target._listeners[type];
                    if (!list)
                        return;
                    list = list.slice();
                    for (var i2 = 0, n2 = list.length; i2 < n2; i2++) {
                        if (event2._immediatePropagationStopped)
                            return;
                        var l = list[i2];
                        if (phase === Event.CAPTURING_PHASE && !l.capture || phase === Event.BUBBLING_PHASE && l.capture)
                            continue;
                        if (l.f) {
                            l.f.call(event2.currentTarget, event2);
                        }
                        else {
                            var fn = l.listener.handleEvent;
                            if (typeof fn !== "function")
                                throw new TypeError("handleEvent property of event listener object is not a function.");
                            fn.call(l.listener, event2);
                        }
                    }
                }
                if (!event._initialized || event._dispatching)
                    utils.InvalidStateError();
                event.isTrusted = trusted;
                event._dispatching = true;
                event.target = this;
                var ancestors = [];
                for (var n = this.parentNode; n; n = n.parentNode)
                    ancestors.push(n);
                event.eventPhase = Event.CAPTURING_PHASE;
                for (var i = ancestors.length - 1; i >= 0; i--) {
                    invoke(ancestors[i], event);
                    if (event._propagationStopped)
                        break;
                }
                if (!event._propagationStopped) {
                    event.eventPhase = Event.AT_TARGET;
                    invoke(this, event);
                }
                if (event.bubbles && !event._propagationStopped) {
                    event.eventPhase = Event.BUBBLING_PHASE;
                    for (var ii = 0, nn = ancestors.length; ii < nn; ii++) {
                        invoke(ancestors[ii], event);
                        if (event._propagationStopped)
                            break;
                    }
                }
                event._dispatching = false;
                event.eventPhase = Event.AT_TARGET;
                event.currentTarget = null;
                if (trusted && !event.defaultPrevented && event instanceof MouseEvent) {
                    switch (event.type) {
                        case "mousedown":
                            this._armed = {
                                x: event.clientX,
                                y: event.clientY,
                                t: event.timeStamp
                            };
                            break;
                        case "mouseout":
                        case "mouseover":
                            this._armed = null;
                            break;
                        case "mouseup":
                            if (this._isClick(event))
                                this._doClick(event);
                            this._armed = null;
                            break;
                    }
                }
                return !event.defaultPrevented;
            },
            _isClick: function (event) {
                return this._armed !== null && event.type === "mouseup" && event.isTrusted && event.button === 0 && event.timeStamp - this._armed.t < 1e3 && Math.abs(event.clientX - this._armed.x) < 10 && Math.abs(event.clientY - this._armed.Y) < 10;
            },
            _doClick: function (event) {
                if (this._click_in_progress)
                    return;
                this._click_in_progress = true;
                var activated = this;
                while (activated && !activated._post_click_activation_steps)
                    activated = activated.parentNode;
                if (activated && activated._pre_click_activation_steps) {
                    activated._pre_click_activation_steps();
                }
                var click = this.ownerDocument.createEvent("MouseEvent");
                click.initMouseEvent("click", true, true, this.ownerDocument.defaultView, 1, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, null);
                var result = this._dispatchEvent(click, true);
                if (activated) {
                    if (result) {
                        if (activated._post_click_activation_steps)
                            activated._post_click_activation_steps(click);
                    }
                    else {
                        if (activated._cancelled_activation_steps)
                            activated._cancelled_activation_steps();
                    }
                }
            },
            _setEventHandler: function _setEventHandler(type, handler) {
                if (!this._handlers)
                    this._handlers = /* @__PURE__ */ Object.create(null);
                this._handlers[type] = handler;
            },
            _getEventHandler: function _getEventHandler(type) {
                return this._handlers && this._handlers[type] || null;
            }
        };
    }
});
// external/npm/node_modules/domino/lib/LinkedList.js
var require_LinkedList = __commonJS({
    "external/npm/node_modules/domino/lib/LinkedList.js"(exports, module) {
        "use strict";
        var utils = require_utils();
        var LinkedList = module.exports = {
            valid: function (a) {
                utils.assert(a, "list falsy");
                utils.assert(a._previousSibling, "previous falsy");
                utils.assert(a._nextSibling, "next falsy");
                return true;
            },
            insertBefore: function (a, b) {
                utils.assert(LinkedList.valid(a) && LinkedList.valid(b));
                var a_first = a, a_last = a._previousSibling;
                var b_first = b, b_last = b._previousSibling;
                a_first._previousSibling = b_last;
                a_last._nextSibling = b_first;
                b_last._nextSibling = a_first;
                b_first._previousSibling = a_last;
                utils.assert(LinkedList.valid(a) && LinkedList.valid(b));
            },
            replace: function (a, b) {
                utils.assert(LinkedList.valid(a) && (b === null || LinkedList.valid(b)));
                if (b !== null) {
                    LinkedList.insertBefore(b, a);
                }
                LinkedList.remove(a);
                utils.assert(LinkedList.valid(a) && (b === null || LinkedList.valid(b)));
            },
            remove: function (a) {
                utils.assert(LinkedList.valid(a));
                var prev = a._previousSibling;
                if (prev === a) {
                    return;
                }
                var next = a._nextSibling;
                prev._nextSibling = next;
                next._previousSibling = prev;
                a._previousSibling = a._nextSibling = a;
                utils.assert(LinkedList.valid(a));
            }
        };
    }
});
// external/npm/node_modules/domino/lib/NodeUtils.js
var require_NodeUtils = __commonJS({
    "external/npm/node_modules/domino/lib/NodeUtils.js"(exports, module) {
        "use strict";
        module.exports = {
            serializeOne
        };
        var utils = require_utils();
        var NAMESPACE = utils.NAMESPACE;
        var hasRawContent = {
            STYLE: true,
            SCRIPT: true,
            XMP: true,
            IFRAME: true,
            NOEMBED: true,
            NOFRAMES: true,
            PLAINTEXT: true
        };
        var emptyElements = {
            area: true,
            base: true,
            basefont: true,
            bgsound: true,
            br: true,
            col: true,
            embed: true,
            frame: true,
            hr: true,
            img: true,
            input: true,
            keygen: true,
            link: true,
            meta: true,
            param: true,
            source: true,
            track: true,
            wbr: true
        };
        var extraNewLine = {};
        function escape(s) {
            return s.replace(/[&<>\u00A0]/g, function (c) {
                switch (c) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "\xA0":
                        return "&nbsp;";
                }
            });
        }
        function escapeAttr(s) {
            var toEscape = /[&"\u00A0]/g;
            if (!toEscape.test(s)) {
                return s;
            }
            else {
                return s.replace(toEscape, function (c) {
                    switch (c) {
                        case "&":
                            return "&amp;";
                        case '"':
                            return "&quot;";
                        case "\xA0":
                            return "&nbsp;";
                    }
                });
            }
        }
        function attrname(a) {
            var ns = a.namespaceURI;
            if (!ns)
                return a.localName;
            if (ns === NAMESPACE.XML)
                return "xml:" + a.localName;
            if (ns === NAMESPACE.XLINK)
                return "xlink:" + a.localName;
            if (ns === NAMESPACE.XMLNS) {
                if (a.localName === "xmlns")
                    return "xmlns";
                else
                    return "xmlns:" + a.localName;
            }
            return a.name;
        }
        function serializeOne(kid, parent) {
            var s = "";
            switch (kid.nodeType) {
                case 1:
                    var ns = kid.namespaceURI;
                    var html = ns === NAMESPACE.HTML;
                    var tagname = html || ns === NAMESPACE.SVG || ns === NAMESPACE.MATHML ? kid.localName : kid.tagName;
                    s += "<" + tagname;
                    for (var j = 0, k = kid._numattrs; j < k; j++) {
                        var a = kid._attr(j);
                        s += " " + attrname(a);
                        if (a.value !== void 0)
                            s += '="' + escapeAttr(a.value) + '"';
                    }
                    s += ">";
                    if (!(html && emptyElements[tagname])) {
                        var ss = kid.serialize();
                        if (html && extraNewLine[tagname] && ss.charAt(0) === "\n")
                            s += "\n";
                        s += ss;
                        s += "</" + tagname + ">";
                    }
                    break;
                case 3:
                case 4:
                    var parenttag;
                    if (parent.nodeType === 1 && parent.namespaceURI === NAMESPACE.HTML)
                        parenttag = parent.tagName;
                    else
                        parenttag = "";
                    if (hasRawContent[parenttag] || parenttag === "NOSCRIPT" && parent.ownerDocument._scripting_enabled) {
                        s += kid.data;
                    }
                    else {
                        s += escape(kid.data);
                    }
                    break;
                case 8:
                    s += "<!--" + kid.data + "-->";
                    break;
                case 7:
                    s += "<?" + kid.target + " " + kid.data + "?>";
                    break;
                case 10:
                    s += "<!DOCTYPE " + kid.name;
                    if (false) {
                        if (kid.publicID) {
                            s += ' PUBLIC "' + kid.publicId + '"';
                        }
                        if (kid.systemId) {
                            s += ' "' + kid.systemId + '"';
                        }
                    }
                    s += ">";
                    break;
                default:
                    utils.InvalidStateError();
            }
            return s;
        }
    }
});
// external/npm/node_modules/domino/lib/Node.js
var require_Node = __commonJS({
    "external/npm/node_modules/domino/lib/Node.js"(exports, module) {
        "use strict";
        module.exports = Node;
        var EventTarget = require_EventTarget();
        var LinkedList = require_LinkedList();
        var NodeUtils = require_NodeUtils();
        var utils = require_utils();
        function Node() {
            EventTarget.call(this);
            this.parentNode = null;
            this._nextSibling = this._previousSibling = this;
            this._index = void 0;
        }
        var ELEMENT_NODE = Node.ELEMENT_NODE = 1;
        var ATTRIBUTE_NODE = Node.ATTRIBUTE_NODE = 2;
        var TEXT_NODE = Node.TEXT_NODE = 3;
        var CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE = 4;
        var ENTITY_REFERENCE_NODE = Node.ENTITY_REFERENCE_NODE = 5;
        var ENTITY_NODE = Node.ENTITY_NODE = 6;
        var PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE = 7;
        var COMMENT_NODE = Node.COMMENT_NODE = 8;
        var DOCUMENT_NODE = Node.DOCUMENT_NODE = 9;
        var DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE = 10;
        var DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE = 11;
        var NOTATION_NODE = Node.NOTATION_NODE = 12;
        var DOCUMENT_POSITION_DISCONNECTED = Node.DOCUMENT_POSITION_DISCONNECTED = 1;
        var DOCUMENT_POSITION_PRECEDING = Node.DOCUMENT_POSITION_PRECEDING = 2;
        var DOCUMENT_POSITION_FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING = 4;
        var DOCUMENT_POSITION_CONTAINS = Node.DOCUMENT_POSITION_CONTAINS = 8;
        var DOCUMENT_POSITION_CONTAINED_BY = Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
        var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
        Node.prototype = Object.create(EventTarget.prototype, {
            baseURI: { get: utils.nyi },
            parentElement: { get: function () {
                    return this.parentNode && this.parentNode.nodeType === ELEMENT_NODE ? this.parentNode : null;
                } },
            hasChildNodes: { value: utils.shouldOverride },
            firstChild: { get: utils.shouldOverride },
            lastChild: { get: utils.shouldOverride },
            isConnected: {
                get: function () {
                    let node = this;
                    while (node != null) {
                        if (node.nodeType === Node.DOCUMENT_NODE) {
                            return true;
                        }
                        node = node.parentNode;
                        if (node != null && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                            node = node.host;
                        }
                    }
                    return false;
                }
            },
            previousSibling: { get: function () {
                    var parent = this.parentNode;
                    if (!parent)
                        return null;
                    if (this === parent.firstChild)
                        return null;
                    return this._previousSibling;
                } },
            nextSibling: { get: function () {
                    var parent = this.parentNode, next = this._nextSibling;
                    if (!parent)
                        return null;
                    if (next === parent.firstChild)
                        return null;
                    return next;
                } },
            textContent: {
                get: function () {
                    return null;
                },
                set: function (v) {
                }
            },
            _countChildrenOfType: { value: function (type) {
                    var sum = 0;
                    for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                        if (kid.nodeType === type)
                            sum++;
                    }
                    return sum;
                } },
            _ensureInsertValid: { value: function _ensureInsertValid(node, child, isPreinsert) {
                    var parent = this, i, kid;
                    if (!node.nodeType)
                        throw new TypeError("not a node");
                    switch (parent.nodeType) {
                        case DOCUMENT_NODE:
                        case DOCUMENT_FRAGMENT_NODE:
                        case ELEMENT_NODE:
                            break;
                        default:
                            utils.HierarchyRequestError();
                    }
                    if (node.isAncestor(parent))
                        utils.HierarchyRequestError();
                    if (child !== null || !isPreinsert) {
                        if (child.parentNode !== parent)
                            utils.NotFoundError();
                    }
                    switch (node.nodeType) {
                        case DOCUMENT_FRAGMENT_NODE:
                        case DOCUMENT_TYPE_NODE:
                        case ELEMENT_NODE:
                        case TEXT_NODE:
                        case PROCESSING_INSTRUCTION_NODE:
                        case COMMENT_NODE:
                            break;
                        default:
                            utils.HierarchyRequestError();
                    }
                    if (parent.nodeType === DOCUMENT_NODE) {
                        switch (node.nodeType) {
                            case TEXT_NODE:
                                utils.HierarchyRequestError();
                                break;
                            case DOCUMENT_FRAGMENT_NODE:
                                if (node._countChildrenOfType(TEXT_NODE) > 0)
                                    utils.HierarchyRequestError();
                                switch (node._countChildrenOfType(ELEMENT_NODE)) {
                                    case 0:
                                        break;
                                    case 1:
                                        if (child !== null) {
                                            if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE)
                                                utils.HierarchyRequestError();
                                            for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                                                if (kid.nodeType === DOCUMENT_TYPE_NODE)
                                                    utils.HierarchyRequestError();
                                            }
                                        }
                                        i = parent._countChildrenOfType(ELEMENT_NODE);
                                        if (isPreinsert) {
                                            if (i > 0)
                                                utils.HierarchyRequestError();
                                        }
                                        else {
                                            if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE)
                                                utils.HierarchyRequestError();
                                        }
                                        break;
                                    default:
                                        utils.HierarchyRequestError();
                                }
                                break;
                            case ELEMENT_NODE:
                                if (child !== null) {
                                    if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE)
                                        utils.HierarchyRequestError();
                                    for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                                        if (kid.nodeType === DOCUMENT_TYPE_NODE)
                                            utils.HierarchyRequestError();
                                    }
                                }
                                i = parent._countChildrenOfType(ELEMENT_NODE);
                                if (isPreinsert) {
                                    if (i > 0)
                                        utils.HierarchyRequestError();
                                }
                                else {
                                    if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE)
                                        utils.HierarchyRequestError();
                                }
                                break;
                            case DOCUMENT_TYPE_NODE:
                                if (child === null) {
                                    if (parent._countChildrenOfType(ELEMENT_NODE))
                                        utils.HierarchyRequestError();
                                }
                                else {
                                    for (kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
                                        if (kid === child)
                                            break;
                                        if (kid.nodeType === ELEMENT_NODE)
                                            utils.HierarchyRequestError();
                                    }
                                }
                                i = parent._countChildrenOfType(DOCUMENT_TYPE_NODE);
                                if (isPreinsert) {
                                    if (i > 0)
                                        utils.HierarchyRequestError();
                                }
                                else {
                                    if (i > 1 || i === 1 && child.nodeType !== DOCUMENT_TYPE_NODE)
                                        utils.HierarchyRequestError();
                                }
                                break;
                        }
                    }
                    else {
                        if (node.nodeType === DOCUMENT_TYPE_NODE)
                            utils.HierarchyRequestError();
                    }
                } },
            insertBefore: { value: function insertBefore(node, child) {
                    var parent = this;
                    parent._ensureInsertValid(node, child, true);
                    var refChild = child;
                    if (refChild === node) {
                        refChild = node.nextSibling;
                    }
                    parent.doc.adoptNode(node);
                    node._insertOrReplace(parent, refChild, false);
                    return node;
                } },
            appendChild: { value: function (child) {
                    return this.insertBefore(child, null);
                } },
            _appendChild: { value: function (child) {
                    child._insertOrReplace(this, null, false);
                } },
            removeChild: { value: function removeChild(child) {
                    var parent = this;
                    if (!child.nodeType)
                        throw new TypeError("not a node");
                    if (child.parentNode !== parent)
                        utils.NotFoundError();
                    child.remove();
                    return child;
                } },
            replaceChild: { value: function replaceChild(node, child) {
                    var parent = this;
                    parent._ensureInsertValid(node, child, false);
                    if (node.doc !== parent.doc) {
                        parent.doc.adoptNode(node);
                    }
                    node._insertOrReplace(parent, child, true);
                    return child;
                } },
            contains: { value: function contains(node) {
                    if (node === null) {
                        return false;
                    }
                    if (this === node) {
                        return true;
                    }
                    return (this.compareDocumentPosition(node) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
                } },
            compareDocumentPosition: { value: function compareDocumentPosition(that) {
                    if (this === that)
                        return 0;
                    if (this.doc !== that.doc || this.rooted !== that.rooted)
                        return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
                    var these = [], those = [];
                    for (var n = this; n !== null; n = n.parentNode)
                        these.push(n);
                    for (n = that; n !== null; n = n.parentNode)
                        those.push(n);
                    these.reverse();
                    those.reverse();
                    if (these[0] !== those[0])
                        return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
                    n = Math.min(these.length, those.length);
                    for (var i = 1; i < n; i++) {
                        if (these[i] !== those[i]) {
                            if (these[i].index < those[i].index)
                                return DOCUMENT_POSITION_FOLLOWING;
                            else
                                return DOCUMENT_POSITION_PRECEDING;
                        }
                    }
                    if (these.length < those.length)
                        return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
                    else
                        return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
                } },
            isSameNode: { value: function isSameNode(node) {
                    return this === node;
                } },
            isEqualNode: { value: function isEqualNode(node) {
                    if (!node)
                        return false;
                    if (node.nodeType !== this.nodeType)
                        return false;
                    if (!this.isEqual(node))
                        return false;
                    for (var c1 = this.firstChild, c2 = node.firstChild; c1 && c2; c1 = c1.nextSibling, c2 = c2.nextSibling) {
                        if (!c1.isEqualNode(c2))
                            return false;
                    }
                    return c1 === null && c2 === null;
                } },
            cloneNode: { value: function (deep) {
                    var clone = this.clone();
                    if (deep) {
                        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                            clone._appendChild(kid.cloneNode(true));
                        }
                    }
                    return clone;
                } },
            lookupPrefix: { value: function lookupPrefix(ns) {
                    var e;
                    if (ns === "" || ns === null || ns === void 0)
                        return null;
                    switch (this.nodeType) {
                        case ELEMENT_NODE:
                            return this._lookupNamespacePrefix(ns, this);
                        case DOCUMENT_NODE:
                            e = this.documentElement;
                            return e ? e.lookupPrefix(ns) : null;
                        case ENTITY_NODE:
                        case NOTATION_NODE:
                        case DOCUMENT_FRAGMENT_NODE:
                        case DOCUMENT_TYPE_NODE:
                            return null;
                        case ATTRIBUTE_NODE:
                            e = this.ownerElement;
                            return e ? e.lookupPrefix(ns) : null;
                        default:
                            e = this.parentElement;
                            return e ? e.lookupPrefix(ns) : null;
                    }
                } },
            lookupNamespaceURI: { value: function lookupNamespaceURI(prefix) {
                    if (prefix === "" || prefix === void 0) {
                        prefix = null;
                    }
                    var e;
                    switch (this.nodeType) {
                        case ELEMENT_NODE:
                            return utils.shouldOverride();
                        case DOCUMENT_NODE:
                            e = this.documentElement;
                            return e ? e.lookupNamespaceURI(prefix) : null;
                        case ENTITY_NODE:
                        case NOTATION_NODE:
                        case DOCUMENT_TYPE_NODE:
                        case DOCUMENT_FRAGMENT_NODE:
                            return null;
                        case ATTRIBUTE_NODE:
                            e = this.ownerElement;
                            return e ? e.lookupNamespaceURI(prefix) : null;
                        default:
                            e = this.parentElement;
                            return e ? e.lookupNamespaceURI(prefix) : null;
                    }
                } },
            isDefaultNamespace: { value: function isDefaultNamespace(ns) {
                    if (ns === "" || ns === void 0) {
                        ns = null;
                    }
                    var defaultNamespace = this.lookupNamespaceURI(null);
                    return defaultNamespace === ns;
                } },
            index: { get: function () {
                    var parent = this.parentNode;
                    if (this === parent.firstChild)
                        return 0;
                    var kids = parent.childNodes;
                    if (this._index === void 0 || kids[this._index] !== this) {
                        for (var i = 0; i < kids.length; i++) {
                            kids[i]._index = i;
                        }
                        utils.assert(kids[this._index] === this);
                    }
                    return this._index;
                } },
            isAncestor: { value: function (that) {
                    if (this.doc !== that.doc)
                        return false;
                    if (this.rooted !== that.rooted)
                        return false;
                    for (var e = that; e; e = e.parentNode) {
                        if (e === this)
                            return true;
                    }
                    return false;
                } },
            ensureSameDoc: { value: function (that) {
                    if (that.ownerDocument === null) {
                        that.ownerDocument = this.doc;
                    }
                    else if (that.ownerDocument !== this.doc) {
                        utils.WrongDocumentError();
                    }
                } },
            removeChildren: { value: utils.shouldOverride },
            _insertOrReplace: { value: function _insertOrReplace(parent, before, isReplace) {
                    var child = this, before_index, i;
                    if (child.nodeType === DOCUMENT_FRAGMENT_NODE && child.rooted) {
                        utils.HierarchyRequestError();
                    }
                    if (parent._childNodes) {
                        before_index = before === null ? parent._childNodes.length : before.index;
                        if (child.parentNode === parent) {
                            var child_index = child.index;
                            if (child_index < before_index) {
                                before_index--;
                            }
                        }
                    }
                    if (isReplace) {
                        if (before.rooted)
                            before.doc.mutateRemove(before);
                        before.parentNode = null;
                    }
                    var n = before;
                    if (n === null) {
                        n = parent.firstChild;
                    }
                    var bothRooted = child.rooted && parent.rooted;
                    if (child.nodeType === DOCUMENT_FRAGMENT_NODE) {
                        var spliceArgs = [0, isReplace ? 1 : 0], next;
                        for (var kid = child.firstChild; kid !== null; kid = next) {
                            next = kid.nextSibling;
                            spliceArgs.push(kid);
                            kid.parentNode = parent;
                        }
                        var len = spliceArgs.length;
                        if (isReplace) {
                            LinkedList.replace(n, len > 2 ? spliceArgs[2] : null);
                        }
                        else if (len > 2 && n !== null) {
                            LinkedList.insertBefore(spliceArgs[2], n);
                        }
                        if (parent._childNodes) {
                            spliceArgs[0] = before === null ? parent._childNodes.length : before._index;
                            parent._childNodes.splice.apply(parent._childNodes, spliceArgs);
                            for (i = 2; i < len; i++) {
                                spliceArgs[i]._index = spliceArgs[0] + (i - 2);
                            }
                        }
                        else if (parent._firstChild === before) {
                            if (len > 2) {
                                parent._firstChild = spliceArgs[2];
                            }
                            else if (isReplace) {
                                parent._firstChild = null;
                            }
                        }
                        if (child._childNodes) {
                            child._childNodes.length = 0;
                        }
                        else {
                            child._firstChild = null;
                        }
                        if (parent.rooted) {
                            parent.modify();
                            for (i = 2; i < len; i++) {
                                parent.doc.mutateInsert(spliceArgs[i]);
                            }
                        }
                    }
                    else {
                        if (before === child) {
                            return;
                        }
                        if (bothRooted) {
                            child._remove();
                        }
                        else if (child.parentNode) {
                            child.remove();
                        }
                        child.parentNode = parent;
                        if (isReplace) {
                            LinkedList.replace(n, child);
                            if (parent._childNodes) {
                                child._index = before_index;
                                parent._childNodes[before_index] = child;
                            }
                            else if (parent._firstChild === before) {
                                parent._firstChild = child;
                            }
                        }
                        else {
                            if (n !== null) {
                                LinkedList.insertBefore(child, n);
                            }
                            if (parent._childNodes) {
                                child._index = before_index;
                                parent._childNodes.splice(before_index, 0, child);
                            }
                            else if (parent._firstChild === before) {
                                parent._firstChild = child;
                            }
                        }
                        if (bothRooted) {
                            parent.modify();
                            parent.doc.mutateMove(child);
                        }
                        else if (parent.rooted) {
                            parent.modify();
                            parent.doc.mutateInsert(child);
                        }
                    }
                } },
            lastModTime: { get: function () {
                    if (!this._lastModTime) {
                        this._lastModTime = this.doc.modclock;
                    }
                    return this._lastModTime;
                } },
            modify: { value: function () {
                    if (this.doc.modclock) {
                        var time = ++this.doc.modclock;
                        for (var n = this; n; n = n.parentElement) {
                            if (n._lastModTime) {
                                n._lastModTime = time;
                            }
                        }
                    }
                } },
            doc: { get: function () {
                    return this.ownerDocument || this;
                } },
            rooted: { get: function () {
                    return !!this._nid;
                } },
            normalize: { value: function () {
                    var next;
                    for (var child = this.firstChild; child !== null; child = next) {
                        next = child.nextSibling;
                        if (child.normalize) {
                            child.normalize();
                        }
                        if (child.nodeType !== Node.TEXT_NODE) {
                            continue;
                        }
                        if (child.nodeValue === "") {
                            this.removeChild(child);
                            continue;
                        }
                        var prevChild = child.previousSibling;
                        if (prevChild === null) {
                            continue;
                        }
                        else if (prevChild.nodeType === Node.TEXT_NODE) {
                            prevChild.appendData(child.nodeValue);
                            this.removeChild(child);
                        }
                    }
                } },
            serialize: { value: function () {
                    if (this._innerHTML) {
                        return this._innerHTML;
                    }
                    var s = "";
                    for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                        s += NodeUtils.serializeOne(kid, this);
                    }
                    return s;
                } },
            outerHTML: {
                get: function () {
                    return NodeUtils.serializeOne(this, { nodeType: 0 });
                },
                set: utils.nyi
            },
            ELEMENT_NODE: { value: ELEMENT_NODE },
            ATTRIBUTE_NODE: { value: ATTRIBUTE_NODE },
            TEXT_NODE: { value: TEXT_NODE },
            CDATA_SECTION_NODE: { value: CDATA_SECTION_NODE },
            ENTITY_REFERENCE_NODE: { value: ENTITY_REFERENCE_NODE },
            ENTITY_NODE: { value: ENTITY_NODE },
            PROCESSING_INSTRUCTION_NODE: { value: PROCESSING_INSTRUCTION_NODE },
            COMMENT_NODE: { value: COMMENT_NODE },
            DOCUMENT_NODE: { value: DOCUMENT_NODE },
            DOCUMENT_TYPE_NODE: { value: DOCUMENT_TYPE_NODE },
            DOCUMENT_FRAGMENT_NODE: { value: DOCUMENT_FRAGMENT_NODE },
            NOTATION_NODE: { value: NOTATION_NODE },
            DOCUMENT_POSITION_DISCONNECTED: { value: DOCUMENT_POSITION_DISCONNECTED },
            DOCUMENT_POSITION_PRECEDING: { value: DOCUMENT_POSITION_PRECEDING },
            DOCUMENT_POSITION_FOLLOWING: { value: DOCUMENT_POSITION_FOLLOWING },
            DOCUMENT_POSITION_CONTAINS: { value: DOCUMENT_POSITION_CONTAINS },
            DOCUMENT_POSITION_CONTAINED_BY: { value: DOCUMENT_POSITION_CONTAINED_BY },
            DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC }
        });
    }
});
// external/npm/node_modules/domino/lib/NodeList.es6.js
var require_NodeList_es6 = __commonJS({
    "external/npm/node_modules/domino/lib/NodeList.es6.js"(exports, module) {
        "use strict";
        module.exports = class NodeList extends Array {
            constructor(a) {
                super(a && a.length || 0);
                if (a) {
                    for (var idx in a) {
                        this[idx] = a[idx];
                    }
                }
            }
            item(i) {
                return this[i] || null;
            }
        };
    }
});
// external/npm/node_modules/domino/lib/NodeList.es5.js
var require_NodeList_es5 = __commonJS({
    "external/npm/node_modules/domino/lib/NodeList.es5.js"(exports, module) {
        "use strict";
        function item(i) {
            return this[i] || null;
        }
        function NodeList(a) {
            if (!a)
                a = [];
            a.item = item;
            return a;
        }
        module.exports = NodeList;
    }
});
// external/npm/node_modules/domino/lib/NodeList.js
var require_NodeList = __commonJS({
    "external/npm/node_modules/domino/lib/NodeList.js"(exports, module) {
        "use strict";
        var NodeList;
        try {
            NodeList = require_NodeList_es6();
        }
        catch (e) {
            NodeList = require_NodeList_es5();
        }
        module.exports = NodeList;
    }
});
// external/npm/node_modules/domino/lib/ContainerNode.js
var require_ContainerNode = __commonJS({
    "external/npm/node_modules/domino/lib/ContainerNode.js"(exports, module) {
        "use strict";
        module.exports = ContainerNode;
        var Node = require_Node();
        var NodeList = require_NodeList();
        function ContainerNode() {
            Node.call(this);
            this._firstChild = this._childNodes = null;
        }
        ContainerNode.prototype = Object.create(Node.prototype, {
            hasChildNodes: { value: function () {
                    if (this._childNodes) {
                        return this._childNodes.length > 0;
                    }
                    return this._firstChild !== null;
                } },
            childNodes: { get: function () {
                    this._ensureChildNodes();
                    return this._childNodes;
                } },
            firstChild: { get: function () {
                    if (this._childNodes) {
                        return this._childNodes.length === 0 ? null : this._childNodes[0];
                    }
                    return this._firstChild;
                } },
            lastChild: { get: function () {
                    var kids = this._childNodes, first;
                    if (kids) {
                        return kids.length === 0 ? null : kids[kids.length - 1];
                    }
                    first = this._firstChild;
                    if (first === null) {
                        return null;
                    }
                    return first._previousSibling;
                } },
            _ensureChildNodes: { value: function () {
                    if (this._childNodes) {
                        return;
                    }
                    var first = this._firstChild, kid = first, childNodes = this._childNodes = new NodeList();
                    if (first)
                        do {
                            childNodes.push(kid);
                            kid = kid._nextSibling;
                        } while (kid !== first);
                    this._firstChild = null;
                } },
            removeChildren: { value: function removeChildren() {
                    var root = this.rooted ? this.ownerDocument : null, next = this.firstChild, kid;
                    while (next !== null) {
                        kid = next;
                        next = kid.nextSibling;
                        if (root)
                            root.mutateRemove(kid);
                        kid.parentNode = null;
                    }
                    if (this._childNodes) {
                        this._childNodes.length = 0;
                    }
                    else {
                        this._firstChild = null;
                    }
                    this.modify();
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/xmlnames.js
var require_xmlnames = __commonJS({
    "external/npm/node_modules/domino/lib/xmlnames.js"(exports) {
        "use strict";
        exports.isValidName = isValidName;
        exports.isValidQName = isValidQName;
        var simplename = /^[_:A-Za-z][-.:\w]+$/;
        var simpleqname = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/;
        var ncnamestartchars = "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
        var ncnamechars = "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
        var ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
        var namestartchars = ncnamestartchars + ":";
        var namechars = ncnamechars + ":";
        var name = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
        var qname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
        var hassurrogates = /[\uD800-\uDB7F\uDC00-\uDFFF]/;
        var surrogatechars = /[\uD800-\uDB7F\uDC00-\uDFFF]/g;
        var surrogatepairs = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
        ncnamestartchars += "\uD800-\u{EFC00}-\uDFFF";
        ncnamechars += "\uD800-\u{EFC00}-\uDFFF";
        ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
        namestartchars = ncnamestartchars + ":";
        namechars = ncnamechars + ":";
        var surrogatename = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
        var surrogateqname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
        function isValidName(s) {
            if (simplename.test(s))
                return true;
            if (name.test(s))
                return true;
            if (!hassurrogates.test(s))
                return false;
            if (!surrogatename.test(s))
                return false;
            var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
            return pairs !== null && 2 * pairs.length === chars.length;
        }
        function isValidQName(s) {
            if (simpleqname.test(s))
                return true;
            if (qname.test(s))
                return true;
            if (!hassurrogates.test(s))
                return false;
            if (!surrogateqname.test(s))
                return false;
            var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
            return pairs !== null && 2 * pairs.length === chars.length;
        }
    }
});
// external/npm/node_modules/domino/lib/attributes.js
var require_attributes = __commonJS({
    "external/npm/node_modules/domino/lib/attributes.js"(exports) {
        "use strict";
        var utils = require_utils();
        exports.property = function (attr) {
            if (Array.isArray(attr.type)) {
                var valid = /* @__PURE__ */ Object.create(null);
                attr.type.forEach(function (val) {
                    valid[val.value || val] = val.alias || val;
                });
                var missingValueDefault = attr.missing;
                if (missingValueDefault === void 0) {
                    missingValueDefault = null;
                }
                var invalidValueDefault = attr.invalid;
                if (invalidValueDefault === void 0) {
                    invalidValueDefault = missingValueDefault;
                }
                return {
                    get: function () {
                        var v = this._getattr(attr.name);
                        if (v === null)
                            return missingValueDefault;
                        v = valid[v.toLowerCase()];
                        if (v !== void 0)
                            return v;
                        if (invalidValueDefault !== null)
                            return invalidValueDefault;
                        return v;
                    },
                    set: function (v) {
                        this._setattr(attr.name, v);
                    }
                };
            }
            else if (attr.type === Boolean) {
                return {
                    get: function () {
                        return this.hasAttribute(attr.name);
                    },
                    set: function (v) {
                        if (v) {
                            this._setattr(attr.name, "");
                        }
                        else {
                            this.removeAttribute(attr.name);
                        }
                    }
                };
            }
            else if (attr.type === Number || attr.type === "long" || attr.type === "unsigned long" || attr.type === "limited unsigned long with fallback") {
                return numberPropDesc(attr);
            }
            else if (!attr.type || attr.type === String) {
                return {
                    get: function () {
                        return this._getattr(attr.name) || "";
                    },
                    set: function (v) {
                        if (attr.treatNullAsEmptyString && v === null) {
                            v = "";
                        }
                        this._setattr(attr.name, v);
                    }
                };
            }
            else if (typeof attr.type === "function") {
                return attr.type(attr.name, attr);
            }
            throw new Error("Invalid attribute definition");
        };
        function numberPropDesc(a) {
            var def;
            if (typeof a.default === "function") {
                def = a.default;
            }
            else if (typeof a.default === "number") {
                def = function () {
                    return a.default;
                };
            }
            else {
                def = function () {
                    utils.assert(false, typeof a.default);
                };
            }
            var unsigned_long = a.type === "unsigned long";
            var signed_long = a.type === "long";
            var unsigned_fallback = a.type === "limited unsigned long with fallback";
            var min = a.min, max = a.max, setmin = a.setmin;
            if (min === void 0) {
                if (unsigned_long)
                    min = 0;
                if (signed_long)
                    min = -2147483648;
                if (unsigned_fallback)
                    min = 1;
            }
            if (max === void 0) {
                if (unsigned_long || signed_long || unsigned_fallback)
                    max = 2147483647;
            }
            return {
                get: function () {
                    var v = this._getattr(a.name);
                    var n = a.float ? parseFloat(v) : parseInt(v, 10);
                    if (v === null || !isFinite(n) || min !== void 0 && n < min || max !== void 0 && n > max) {
                        return def.call(this);
                    }
                    if (unsigned_long || signed_long || unsigned_fallback) {
                        if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(v)) {
                            return def.call(this);
                        }
                        n = n | 0;
                    }
                    return n;
                },
                set: function (v) {
                    if (!a.float) {
                        v = Math.floor(v);
                    }
                    if (setmin !== void 0 && v < setmin) {
                        utils.IndexSizeError(a.name + " set to " + v);
                    }
                    if (unsigned_long) {
                        v = v < 0 || v > 2147483647 ? def.call(this) : v | 0;
                    }
                    else if (unsigned_fallback) {
                        v = v < 1 || v > 2147483647 ? def.call(this) : v | 0;
                    }
                    else if (signed_long) {
                        v = v < -2147483648 || v > 2147483647 ? def.call(this) : v | 0;
                    }
                    this._setattr(a.name, String(v));
                }
            };
        }
        exports.registerChangeHandler = function (c, name, handler) {
            var p = c.prototype;
            if (!Object.prototype.hasOwnProperty.call(p, "_attributeChangeHandlers")) {
                p._attributeChangeHandlers = Object.create(p._attributeChangeHandlers || null);
            }
            p._attributeChangeHandlers[name] = handler;
        };
    }
});
// external/npm/node_modules/domino/lib/FilteredElementList.js
var require_FilteredElementList = __commonJS({
    "external/npm/node_modules/domino/lib/FilteredElementList.js"(exports, module) {
        "use strict";
        module.exports = FilteredElementList;
        var Node = require_Node();
        function FilteredElementList(root, filter) {
            this.root = root;
            this.filter = filter;
            this.lastModTime = root.lastModTime;
            this.done = false;
            this.cache = [];
            this.traverse();
        }
        FilteredElementList.prototype = Object.create(Object.prototype, {
            length: { get: function () {
                    this.checkcache();
                    if (!this.done)
                        this.traverse();
                    return this.cache.length;
                } },
            item: { value: function (n) {
                    this.checkcache();
                    if (!this.done && n >= this.cache.length) {
                        this.traverse();
                    }
                    return this.cache[n];
                } },
            checkcache: { value: function () {
                    if (this.lastModTime !== this.root.lastModTime) {
                        for (var i = this.cache.length - 1; i >= 0; i--) {
                            this[i] = void 0;
                        }
                        this.cache.length = 0;
                        this.done = false;
                        this.lastModTime = this.root.lastModTime;
                    }
                } },
            traverse: { value: function (n) {
                    if (n !== void 0)
                        n++;
                    var elt;
                    while ((elt = this.next()) !== null) {
                        this[this.cache.length] = elt;
                        this.cache.push(elt);
                        if (n && this.cache.length === n)
                            return;
                    }
                    this.done = true;
                } },
            next: { value: function () {
                    var start = this.cache.length === 0 ? this.root : this.cache[this.cache.length - 1];
                    var elt;
                    if (start.nodeType === Node.DOCUMENT_NODE)
                        elt = start.documentElement;
                    else
                        elt = start.nextElement(this.root);
                    while (elt) {
                        if (this.filter(elt)) {
                            return elt;
                        }
                        elt = elt.nextElement(this.root);
                    }
                    return null;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/DOMTokenList.js
var require_DOMTokenList = __commonJS({
    "external/npm/node_modules/domino/lib/DOMTokenList.js"(exports, module) {
        "use strict";
        var utils = require_utils();
        module.exports = DOMTokenList;
        function DOMTokenList(getter, setter) {
            this._getString = getter;
            this._setString = setter;
            this._length = 0;
            this._lastStringValue = "";
            this._update();
        }
        Object.defineProperties(DOMTokenList.prototype, {
            length: { get: function () {
                    return this._length;
                } },
            item: { value: function (index) {
                    var list = getList(this);
                    if (index < 0 || index >= list.length) {
                        return null;
                    }
                    return list[index];
                } },
            contains: { value: function (token) {
                    token = String(token);
                    var list = getList(this);
                    return list.indexOf(token) > -1;
                } },
            add: { value: function () {
                    var list = getList(this);
                    for (var i = 0, len = arguments.length; i < len; i++) {
                        var token = handleErrors(arguments[i]);
                        if (list.indexOf(token) < 0) {
                            list.push(token);
                        }
                    }
                    this._update(list);
                } },
            remove: { value: function () {
                    var list = getList(this);
                    for (var i = 0, len = arguments.length; i < len; i++) {
                        var token = handleErrors(arguments[i]);
                        var index = list.indexOf(token);
                        if (index > -1) {
                            list.splice(index, 1);
                        }
                    }
                    this._update(list);
                } },
            toggle: { value: function toggle(token, force) {
                    token = handleErrors(token);
                    if (this.contains(token)) {
                        if (force === void 0 || force === false) {
                            this.remove(token);
                            return false;
                        }
                        return true;
                    }
                    else {
                        if (force === void 0 || force === true) {
                            this.add(token);
                            return true;
                        }
                        return false;
                    }
                } },
            replace: { value: function replace(token, newToken) {
                    if (String(newToken) === "") {
                        utils.SyntaxError();
                    }
                    token = handleErrors(token);
                    newToken = handleErrors(newToken);
                    var list = getList(this);
                    var idx = list.indexOf(token);
                    if (idx < 0) {
                        return false;
                    }
                    var idx2 = list.indexOf(newToken);
                    if (idx2 < 0) {
                        list[idx] = newToken;
                    }
                    else {
                        if (idx < idx2) {
                            list[idx] = newToken;
                            list.splice(idx2, 1);
                        }
                        else {
                            list.splice(idx, 1);
                        }
                    }
                    this._update(list);
                    return true;
                } },
            toString: { value: function () {
                    return this._getString();
                } },
            value: {
                get: function () {
                    return this._getString();
                },
                set: function (v) {
                    this._setString(v);
                    this._update();
                }
            },
            _update: { value: function (list) {
                    if (list) {
                        fixIndex(this, list);
                        this._setString(list.join(" ").trim());
                    }
                    else {
                        fixIndex(this, getList(this));
                    }
                    this._lastStringValue = this._getString();
                } }
        });
        function fixIndex(clist, list) {
            var oldLength = clist._length;
            var i;
            clist._length = list.length;
            for (i = 0; i < list.length; i++) {
                clist[i] = list[i];
            }
            for (; i < oldLength; i++) {
                clist[i] = void 0;
            }
        }
        function handleErrors(token) {
            token = String(token);
            if (token === "") {
                utils.SyntaxError();
            }
            if (/[ \t\r\n\f]/.test(token)) {
                utils.InvalidCharacterError();
            }
            return token;
        }
        function toArray(clist) {
            var length = clist._length;
            var arr = Array(length);
            for (var i = 0; i < length; i++) {
                arr[i] = clist[i];
            }
            return arr;
        }
        function getList(clist) {
            var strProp = clist._getString();
            if (strProp === clist._lastStringValue) {
                return toArray(clist);
            }
            var str = strProp.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
            if (str === "") {
                return [];
            }
            else {
                var seen = /* @__PURE__ */ Object.create(null);
                return str.split(/[ \t\r\n\f]+/g).filter(function (n) {
                    var key = "$" + n;
                    if (seen[key]) {
                        return false;
                    }
                    seen[key] = true;
                    return true;
                });
            }
        }
    }
});
// external/npm/node_modules/domino/lib/select.js
var require_select = __commonJS({
    "external/npm/node_modules/domino/lib/select.js"(exports, module) {
        "use strict";
        var window = Object.create(null, {
            location: { get: function () {
                    throw new Error("window.location is not supported.");
                } }
        });
        var compareDocumentPosition = function (a, b) {
            return a.compareDocumentPosition(b);
        };
        var order = function (a, b) {
            return compareDocumentPosition(a, b) & 2 ? 1 : -1;
        };
        var next = function (el) {
            while ((el = el.nextSibling) && el.nodeType !== 1)
                ;
            return el;
        };
        var prev = function (el) {
            while ((el = el.previousSibling) && el.nodeType !== 1)
                ;
            return el;
        };
        var child = function (el) {
            if (el = el.firstChild) {
                while (el.nodeType !== 1 && (el = el.nextSibling))
                    ;
            }
            return el;
        };
        var lastChild = function (el) {
            if (el = el.lastChild) {
                while (el.nodeType !== 1 && (el = el.previousSibling))
                    ;
            }
            return el;
        };
        var parentIsElement = function (n) {
            if (!n.parentNode) {
                return false;
            }
            var nodeType = n.parentNode.nodeType;
            return nodeType === 1 || nodeType === 9;
        };
        var unquote = function (str) {
            if (!str)
                return str;
            var ch = str[0];
            if (ch === '"' || ch === "'") {
                if (str[str.length - 1] === ch) {
                    str = str.slice(1, -1);
                }
                else {
                    str = str.slice(1);
                }
                return str.replace(rules.str_escape, function (s) {
                    var m = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(s);
                    if (!m) {
                        return s.slice(1);
                    }
                    if (m[2]) {
                        return "";
                    }
                    var cp = parseInt(m[1], 16);
                    return String.fromCodePoint ? String.fromCodePoint(cp) : String.fromCharCode(cp);
                });
            }
            else if (rules.ident.test(str)) {
                return decodeid(str);
            }
            else {
                return str;
            }
        };
        var decodeid = function (str) {
            return str.replace(rules.escape, function (s) {
                var m = /^\\([0-9A-Fa-f]+)/.exec(s);
                if (!m) {
                    return s[1];
                }
                var cp = parseInt(m[1], 16);
                return String.fromCodePoint ? String.fromCodePoint(cp) : String.fromCharCode(cp);
            });
        };
        var indexOf = function () {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf;
            }
            return function (obj, item) {
                var i = this.length;
                while (i--) {
                    if (this[i] === item)
                        return i;
                }
                return -1;
            };
        }();
        var makeInside = function (start, end) {
            var regex = rules.inside.source.replace(/</g, start).replace(/>/g, end);
            return new RegExp(regex);
        };
        var replace = function (regex, name, val) {
            regex = regex.source;
            regex = regex.replace(name, val.source || val);
            return new RegExp(regex);
        };
        var truncateUrl = function (url, num) {
            return url.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", num).join("/");
        };
        var parseNth = function (param_, test) {
            var param = param_.replace(/\s+/g, ""), cap;
            if (param === "even") {
                param = "2n+0";
            }
            else if (param === "odd") {
                param = "2n+1";
            }
            else if (param.indexOf("n") === -1) {
                param = "0n" + param;
            }
            cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);
            return {
                group: cap[1] === "-" ? -(cap[2] || 1) : +(cap[2] || 1),
                offset: cap[4] ? cap[3] === "-" ? -cap[4] : +cap[4] : 0
            };
        };
        var nth = function (param_, test, last) {
            var param = parseNth(param_), group = param.group, offset = param.offset, find2 = !last ? child : lastChild, advance = !last ? next : prev;
            return function (el) {
                if (!parentIsElement(el))
                    return;
                var rel = find2(el.parentNode), pos = 0;
                while (rel) {
                    if (test(rel, el))
                        pos++;
                    if (rel === el) {
                        pos -= offset;
                        return group && pos ? pos % group === 0 && pos < 0 === group < 0 : !pos;
                    }
                    rel = advance(rel);
                }
            };
        };
        var selectors = {
            "*": function () {
                if (false) {
                    return function (el) {
                        if (el.nodeType === 1)
                            return true;
                    };
                }
                return function () {
                    return true;
                };
            }(),
            "type": function (type) {
                type = type.toLowerCase();
                return function (el) {
                    return el.nodeName.toLowerCase() === type;
                };
            },
            "attr": function (key, op, val, i) {
                op = operators[op];
                return function (el) {
                    var attr;
                    switch (key) {
                        case "for":
                            attr = el.htmlFor;
                            break;
                        case "class":
                            attr = el.className;
                            if (attr === "" && el.getAttribute("class") == null) {
                                attr = null;
                            }
                            break;
                        case "href":
                        case "src":
                            attr = el.getAttribute(key, 2);
                            break;
                        case "title":
                            attr = el.getAttribute("title") || null;
                            break;
                        case "id":
                        case "lang":
                        case "dir":
                        case "accessKey":
                        case "hidden":
                        case "tabIndex":
                        case "style":
                            if (el.getAttribute) {
                                attr = el.getAttribute(key);
                                break;
                            }
                        default:
                            if (el.hasAttribute && !el.hasAttribute(key)) {
                                break;
                            }
                            attr = el[key] != null ? el[key] : el.getAttribute && el.getAttribute(key);
                            break;
                    }
                    if (attr == null)
                        return;
                    attr = attr + "";
                    if (i) {
                        attr = attr.toLowerCase();
                        val = val.toLowerCase();
                    }
                    return op(attr, val);
                };
            },
            ":first-child": function (el) {
                return !prev(el) && parentIsElement(el);
            },
            ":last-child": function (el) {
                return !next(el) && parentIsElement(el);
            },
            ":only-child": function (el) {
                return !prev(el) && !next(el) && parentIsElement(el);
            },
            ":nth-child": function (param, last) {
                return nth(param, function () {
                    return true;
                }, last);
            },
            ":nth-last-child": function (param) {
                return selectors[":nth-child"](param, true);
            },
            ":root": function (el) {
                return el.ownerDocument.documentElement === el;
            },
            ":empty": function (el) {
                return !el.firstChild;
            },
            ":not": function (sel) {
                var test = compileGroup(sel);
                return function (el) {
                    return !test(el);
                };
            },
            ":first-of-type": function (el) {
                if (!parentIsElement(el))
                    return;
                var type = el.nodeName;
                while (el = prev(el)) {
                    if (el.nodeName === type)
                        return;
                }
                return true;
            },
            ":last-of-type": function (el) {
                if (!parentIsElement(el))
                    return;
                var type = el.nodeName;
                while (el = next(el)) {
                    if (el.nodeName === type)
                        return;
                }
                return true;
            },
            ":only-of-type": function (el) {
                return selectors[":first-of-type"](el) && selectors[":last-of-type"](el);
            },
            ":nth-of-type": function (param, last) {
                return nth(param, function (rel, el) {
                    return rel.nodeName === el.nodeName;
                }, last);
            },
            ":nth-last-of-type": function (param) {
                return selectors[":nth-of-type"](param, true);
            },
            ":checked": function (el) {
                return !!(el.checked || el.selected);
            },
            ":indeterminate": function (el) {
                return !selectors[":checked"](el);
            },
            ":enabled": function (el) {
                return !el.disabled && el.type !== "hidden";
            },
            ":disabled": function (el) {
                return !!el.disabled;
            },
            ":target": function (el) {
                return el.id === window.location.hash.substring(1);
            },
            ":focus": function (el) {
                return el === el.ownerDocument.activeElement;
            },
            ":is": function (sel) {
                return compileGroup(sel);
            },
            ":matches": function (sel) {
                return selectors[":is"](sel);
            },
            ":nth-match": function (param, last) {
                var args = param.split(/\s*,\s*/), arg = args.shift(), test = compileGroup(args.join(","));
                return nth(arg, test, last);
            },
            ":nth-last-match": function (param) {
                return selectors[":nth-match"](param, true);
            },
            ":links-here": function (el) {
                return el + "" === window.location + "";
            },
            ":lang": function (param) {
                return function (el) {
                    while (el) {
                        if (el.lang)
                            return el.lang.indexOf(param) === 0;
                        el = el.parentNode;
                    }
                };
            },
            ":dir": function (param) {
                return function (el) {
                    while (el) {
                        if (el.dir)
                            return el.dir === param;
                        el = el.parentNode;
                    }
                };
            },
            ":scope": function (el, con) {
                var context = con || el.ownerDocument;
                if (context.nodeType === 9) {
                    return el === context.documentElement;
                }
                return el === context;
            },
            ":any-link": function (el) {
                return typeof el.href === "string";
            },
            ":local-link": function (el) {
                if (el.nodeName) {
                    return el.href && el.host === window.location.host;
                }
                var param = +el + 1;
                return function (el2) {
                    if (!el2.href)
                        return;
                    var url = window.location + "", href = el2 + "";
                    return truncateUrl(url, param) === truncateUrl(href, param);
                };
            },
            ":default": function (el) {
                return !!el.defaultSelected;
            },
            ":valid": function (el) {
                return el.willValidate || el.validity && el.validity.valid;
            },
            ":invalid": function (el) {
                return !selectors[":valid"](el);
            },
            ":in-range": function (el) {
                return el.value > el.min && el.value <= el.max;
            },
            ":out-of-range": function (el) {
                return !selectors[":in-range"](el);
            },
            ":required": function (el) {
                return !!el.required;
            },
            ":optional": function (el) {
                return !el.required;
            },
            ":read-only": function (el) {
                if (el.readOnly)
                    return true;
                var attr = el.getAttribute("contenteditable"), prop = el.contentEditable, name = el.nodeName.toLowerCase();
                name = name !== "input" && name !== "textarea";
                return (name || el.disabled) && attr == null && prop !== "true";
            },
            ":read-write": function (el) {
                return !selectors[":read-only"](el);
            },
            ":hover": function () {
                throw new Error(":hover is not supported.");
            },
            ":active": function () {
                throw new Error(":active is not supported.");
            },
            ":link": function () {
                throw new Error(":link is not supported.");
            },
            ":visited": function () {
                throw new Error(":visited is not supported.");
            },
            ":column": function () {
                throw new Error(":column is not supported.");
            },
            ":nth-column": function () {
                throw new Error(":nth-column is not supported.");
            },
            ":nth-last-column": function () {
                throw new Error(":nth-last-column is not supported.");
            },
            ":current": function () {
                throw new Error(":current is not supported.");
            },
            ":past": function () {
                throw new Error(":past is not supported.");
            },
            ":future": function () {
                throw new Error(":future is not supported.");
            },
            ":contains": function (param) {
                return function (el) {
                    var text = el.innerText || el.textContent || el.value || "";
                    return text.indexOf(param) !== -1;
                };
            },
            ":has": function (param) {
                return function (el) {
                    return find(param, el).length > 0;
                };
            }
        };
        var operators = {
            "-": function () {
                return true;
            },
            "=": function (attr, val) {
                return attr === val;
            },
            "*=": function (attr, val) {
                return attr.indexOf(val) !== -1;
            },
            "~=": function (attr, val) {
                var i, s, f, l;
                for (s = 0; true; s = i + 1) {
                    i = attr.indexOf(val, s);
                    if (i === -1)
                        return false;
                    f = attr[i - 1];
                    l = attr[i + val.length];
                    if ((!f || f === " ") && (!l || l === " "))
                        return true;
                }
            },
            "|=": function (attr, val) {
                var i = attr.indexOf(val), l;
                if (i !== 0)
                    return;
                l = attr[i + val.length];
                return l === "-" || !l;
            },
            "^=": function (attr, val) {
                return attr.indexOf(val) === 0;
            },
            "$=": function (attr, val) {
                var i = attr.lastIndexOf(val);
                return i !== -1 && i + val.length === attr.length;
            },
            "!=": function (attr, val) {
                return attr !== val;
            }
        };
        var combinators = {
            " ": function (test) {
                return function (el) {
                    while (el = el.parentNode) {
                        if (test(el))
                            return el;
                    }
                };
            },
            ">": function (test) {
                return function (el) {
                    if (el = el.parentNode) {
                        return test(el) && el;
                    }
                };
            },
            "+": function (test) {
                return function (el) {
                    if (el = prev(el)) {
                        return test(el) && el;
                    }
                };
            },
            "~": function (test) {
                return function (el) {
                    while (el = prev(el)) {
                        if (test(el))
                            return el;
                    }
                };
            },
            "noop": function (test) {
                return function (el) {
                    return test(el) && el;
                };
            },
            "ref": function (test, name) {
                var node;
                function ref(el) {
                    var doc = el.ownerDocument, nodes = doc.getElementsByTagName("*"), i = nodes.length;
                    while (i--) {
                        node = nodes[i];
                        if (ref.test(el)) {
                            node = null;
                            return true;
                        }
                    }
                    node = null;
                }
                ref.combinator = function (el) {
                    if (!node || !node.getAttribute)
                        return;
                    var attr = node.getAttribute(name) || "";
                    if (attr[0] === "#")
                        attr = attr.substring(1);
                    if (attr === el.id && test(node)) {
                        return node;
                    }
                };
                return ref;
            }
        };
        var rules = {
            escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
            str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
            nonascii: /[\u00A0-\uFFFF]/,
            cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
            qname: /^ *(cssid|\*)/,
            simple: /^(?:([.#]cssid)|pseudo|attr)/,
            ref: /^ *\/(cssid)\/ */,
            combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
            attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
            pseudo: /^(:cssid)(?:\((inside)\))?/,
            inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
            ident: /^(cssid)$/
        };
        rules.cssid = replace(rules.cssid, "nonascii", rules.nonascii);
        rules.cssid = replace(rules.cssid, "escape", rules.escape);
        rules.qname = replace(rules.qname, "cssid", rules.cssid);
        rules.simple = replace(rules.simple, "cssid", rules.cssid);
        rules.ref = replace(rules.ref, "cssid", rules.cssid);
        rules.attr = replace(rules.attr, "cssid", rules.cssid);
        rules.pseudo = replace(rules.pseudo, "cssid", rules.cssid);
        rules.inside = replace(rules.inside, `[^"'>]*`, rules.inside);
        rules.attr = replace(rules.attr, "inside", makeInside("\\[", "\\]"));
        rules.pseudo = replace(rules.pseudo, "inside", makeInside("\\(", "\\)"));
        rules.simple = replace(rules.simple, "pseudo", rules.pseudo);
        rules.simple = replace(rules.simple, "attr", rules.attr);
        rules.ident = replace(rules.ident, "cssid", rules.cssid);
        rules.str_escape = replace(rules.str_escape, "escape", rules.escape);
        var compile = function (sel_) {
            var sel = sel_.replace(/^\s+|\s+$/g, ""), test, filter = [], buff = [], subject, qname, cap, op, ref;
            while (sel) {
                if (cap = rules.qname.exec(sel)) {
                    sel = sel.substring(cap[0].length);
                    qname = decodeid(cap[1]);
                    buff.push(tok(qname, true));
                }
                else if (cap = rules.simple.exec(sel)) {
                    sel = sel.substring(cap[0].length);
                    qname = "*";
                    buff.push(tok(qname, true));
                    buff.push(tok(cap));
                }
                else {
                    throw new SyntaxError("Invalid selector.");
                }
                while (cap = rules.simple.exec(sel)) {
                    sel = sel.substring(cap[0].length);
                    buff.push(tok(cap));
                }
                if (sel[0] === "!") {
                    sel = sel.substring(1);
                    subject = makeSubject();
                    subject.qname = qname;
                    buff.push(subject.simple);
                }
                if (cap = rules.ref.exec(sel)) {
                    sel = sel.substring(cap[0].length);
                    ref = combinators.ref(makeSimple(buff), decodeid(cap[1]));
                    filter.push(ref.combinator);
                    buff = [];
                    continue;
                }
                if (cap = rules.combinator.exec(sel)) {
                    sel = sel.substring(cap[0].length);
                    op = cap[1] || cap[2] || cap[3];
                    if (op === ",") {
                        filter.push(combinators.noop(makeSimple(buff)));
                        break;
                    }
                }
                else {
                    op = "noop";
                }
                if (!combinators[op]) {
                    throw new SyntaxError("Bad combinator.");
                }
                filter.push(combinators[op](makeSimple(buff)));
                buff = [];
            }
            test = makeTest(filter);
            test.qname = qname;
            test.sel = sel;
            if (subject) {
                subject.lname = test.qname;
                subject.test = test;
                subject.qname = subject.qname;
                subject.sel = test.sel;
                test = subject;
            }
            if (ref) {
                ref.test = test;
                ref.qname = test.qname;
                ref.sel = test.sel;
                test = ref;
            }
            return test;
        };
        var tok = function (cap, qname) {
            if (qname) {
                return cap === "*" ? selectors["*"] : selectors.type(cap);
            }
            if (cap[1]) {
                return cap[1][0] === "." ? selectors.attr("class", "~=", decodeid(cap[1].substring(1)), false) : selectors.attr("id", "=", decodeid(cap[1].substring(1)), false);
            }
            if (cap[2]) {
                return cap[3] ? selectors[decodeid(cap[2])](unquote(cap[3])) : selectors[decodeid(cap[2])];
            }
            if (cap[4]) {
                var value = cap[6];
                var i = /["'\s]\s*I$/i.test(value);
                if (i) {
                    value = value.replace(/\s*I$/i, "");
                }
                return selectors.attr(decodeid(cap[4]), cap[5] || "-", unquote(value), i);
            }
            throw new SyntaxError("Unknown Selector.");
        };
        var makeSimple = function (func) {
            var l = func.length, i;
            if (l < 2)
                return func[0];
            return function (el) {
                if (!el)
                    return;
                for (i = 0; i < l; i++) {
                    if (!func[i](el))
                        return;
                }
                return true;
            };
        };
        var makeTest = function (func) {
            if (func.length < 2) {
                return function (el) {
                    return !!func[0](el);
                };
            }
            return function (el) {
                var i = func.length;
                while (i--) {
                    if (!(el = func[i](el)))
                        return;
                }
                return true;
            };
        };
        var makeSubject = function () {
            var target;
            function subject(el) {
                var node = el.ownerDocument, scope = node.getElementsByTagName(subject.lname), i = scope.length;
                while (i--) {
                    if (subject.test(scope[i]) && target === el) {
                        target = null;
                        return true;
                    }
                }
                target = null;
            }
            subject.simple = function (el) {
                target = el;
                return true;
            };
            return subject;
        };
        var compileGroup = function (sel) {
            var test = compile(sel), tests = [test];
            while (test.sel) {
                test = compile(test.sel);
                tests.push(test);
            }
            if (tests.length < 2)
                return test;
            return function (el) {
                var l = tests.length, i = 0;
                for (; i < l; i++) {
                    if (tests[i](el))
                        return true;
                }
            };
        };
        var find = function (sel, node) {
            var results = [], test = compile(sel), scope = node.getElementsByTagName(test.qname), i = 0, el;
            while (el = scope[i++]) {
                if (test(el))
                    results.push(el);
            }
            if (test.sel) {
                while (test.sel) {
                    test = compile(test.sel);
                    scope = node.getElementsByTagName(test.qname);
                    i = 0;
                    while (el = scope[i++]) {
                        if (test(el) && indexOf.call(results, el) === -1) {
                            results.push(el);
                        }
                    }
                }
                results.sort(order);
            }
            return results;
        };
        module.exports = exports = function (sel, context) {
            var id, r;
            if (context.nodeType !== 11 && sel.indexOf(" ") === -1) {
                if (sel[0] === "#" && context.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(sel)) {
                    if (context.doc._hasMultipleElementsWithId) {
                        id = sel.substring(1);
                        if (!context.doc._hasMultipleElementsWithId(id)) {
                            r = context.doc.getElementById(id);
                            return r ? [r] : [];
                        }
                    }
                }
                if (sel[0] === "." && /^\.\w+$/.test(sel)) {
                    return context.getElementsByClassName(sel.substring(1));
                }
                if (/^\w+$/.test(sel)) {
                    return context.getElementsByTagName(sel);
                }
            }
            return find(sel, context);
        };
        exports.selectors = selectors;
        exports.operators = operators;
        exports.combinators = combinators;
        exports.matches = function (el, sel) {
            var test = { sel };
            do {
                test = compile(test.sel);
                if (test(el)) {
                    return true;
                }
            } while (test.sel);
            return false;
        };
    }
});
// external/npm/node_modules/domino/lib/ChildNode.js
var require_ChildNode = __commonJS({
    "external/npm/node_modules/domino/lib/ChildNode.js"(exports, module) {
        "use strict";
        var Node = require_Node();
        var LinkedList = require_LinkedList();
        var createDocumentFragmentFromArguments = function (document, args) {
            var docFrag = document.createDocumentFragment();
            for (var i = 0; i < args.length; i++) {
                var argItem = args[i];
                var isNode = argItem instanceof Node;
                docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
            }
            return docFrag;
        };
        var ChildNode = {
            after: { value: function after() {
                    var argArr = Array.prototype.slice.call(arguments);
                    var parentNode = this.parentNode, nextSibling = this.nextSibling;
                    if (parentNode === null) {
                        return;
                    }
                    while (nextSibling && argArr.some(function (v) {
                        return v === nextSibling;
                    }))
                        nextSibling = nextSibling.nextSibling;
                    var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
                    parentNode.insertBefore(docFrag, nextSibling);
                } },
            before: { value: function before() {
                    var argArr = Array.prototype.slice.call(arguments);
                    var parentNode = this.parentNode, prevSibling = this.previousSibling;
                    if (parentNode === null) {
                        return;
                    }
                    while (prevSibling && argArr.some(function (v) {
                        return v === prevSibling;
                    }))
                        prevSibling = prevSibling.previousSibling;
                    var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
                    var nextSibling = prevSibling ? prevSibling.nextSibling : parentNode.firstChild;
                    parentNode.insertBefore(docFrag, nextSibling);
                } },
            remove: { value: function remove() {
                    if (this.parentNode === null)
                        return;
                    if (this.doc) {
                        this.doc._preremoveNodeIterators(this);
                        if (this.rooted) {
                            this.doc.mutateRemove(this);
                        }
                    }
                    this._remove();
                    this.parentNode = null;
                } },
            _remove: { value: function _remove() {
                    var parent = this.parentNode;
                    if (parent === null)
                        return;
                    if (parent._childNodes) {
                        parent._childNodes.splice(this.index, 1);
                    }
                    else if (parent._firstChild === this) {
                        if (this._nextSibling === this) {
                            parent._firstChild = null;
                        }
                        else {
                            parent._firstChild = this._nextSibling;
                        }
                    }
                    LinkedList.remove(this);
                    parent.modify();
                } },
            replaceWith: { value: function replaceWith() {
                    var argArr = Array.prototype.slice.call(arguments);
                    var parentNode = this.parentNode, nextSibling = this.nextSibling;
                    if (parentNode === null) {
                        return;
                    }
                    while (nextSibling && argArr.some(function (v) {
                        return v === nextSibling;
                    }))
                        nextSibling = nextSibling.nextSibling;
                    var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
                    if (this.parentNode === parentNode) {
                        parentNode.replaceChild(docFrag, this);
                    }
                    else {
                        parentNode.insertBefore(docFrag, nextSibling);
                    }
                } }
        };
        module.exports = ChildNode;
    }
});
// external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js
var require_NonDocumentTypeChildNode = __commonJS({
    "external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js"(exports, module) {
        "use strict";
        var Node = require_Node();
        var NonDocumentTypeChildNode = {
            nextElementSibling: { get: function () {
                    if (this.parentNode) {
                        for (var kid = this.nextSibling; kid !== null; kid = kid.nextSibling) {
                            if (kid.nodeType === Node.ELEMENT_NODE)
                                return kid;
                        }
                    }
                    return null;
                } },
            previousElementSibling: { get: function () {
                    if (this.parentNode) {
                        for (var kid = this.previousSibling; kid !== null; kid = kid.previousSibling) {
                            if (kid.nodeType === Node.ELEMENT_NODE)
                                return kid;
                        }
                    }
                    return null;
                } }
        };
        module.exports = NonDocumentTypeChildNode;
    }
});
// external/npm/node_modules/domino/lib/NamedNodeMap.js
var require_NamedNodeMap = __commonJS({
    "external/npm/node_modules/domino/lib/NamedNodeMap.js"(exports, module) {
        "use strict";
        module.exports = NamedNodeMap;
        var utils = require_utils();
        function NamedNodeMap(element) {
            this.element = element;
        }
        Object.defineProperties(NamedNodeMap.prototype, {
            length: { get: utils.shouldOverride },
            item: { value: utils.shouldOverride },
            getNamedItem: { value: function getNamedItem(qualifiedName) {
                    return this.element.getAttributeNode(qualifiedName);
                } },
            getNamedItemNS: { value: function getNamedItemNS(namespace, localName) {
                    return this.element.getAttributeNodeNS(namespace, localName);
                } },
            setNamedItem: { value: utils.nyi },
            setNamedItemNS: { value: utils.nyi },
            removeNamedItem: { value: function removeNamedItem(qualifiedName) {
                    var attr = this.element.getAttributeNode(qualifiedName);
                    if (attr) {
                        this.element.removeAttribute(qualifiedName);
                        return attr;
                    }
                    utils.NotFoundError();
                } },
            removeNamedItemNS: { value: function removeNamedItemNS(ns, lname) {
                    var attr = this.element.getAttributeNodeNS(ns, lname);
                    if (attr) {
                        this.element.removeAttributeNS(ns, lname);
                        return attr;
                    }
                    utils.NotFoundError();
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/Element.js
var require_Element = __commonJS({
    "external/npm/node_modules/domino/lib/Element.js"(exports, module) {
        "use strict";
        module.exports = Element;
        var xml = require_xmlnames();
        var utils = require_utils();
        var NAMESPACE = utils.NAMESPACE;
        var attributes = require_attributes();
        var Node = require_Node();
        var NodeList = require_NodeList();
        var NodeUtils = require_NodeUtils();
        var FilteredElementList = require_FilteredElementList();
        var DOMException = require_DOMException();
        var DOMTokenList = require_DOMTokenList();
        var select = require_select();
        var ContainerNode = require_ContainerNode();
        var ChildNode = require_ChildNode();
        var NonDocumentTypeChildNode = require_NonDocumentTypeChildNode();
        var NamedNodeMap = require_NamedNodeMap();
        var uppercaseCache = /* @__PURE__ */ Object.create(null);
        function Element(doc, localName, namespaceURI, prefix) {
            ContainerNode.call(this);
            this.nodeType = Node.ELEMENT_NODE;
            this.ownerDocument = doc;
            this.localName = localName;
            this.namespaceURI = namespaceURI;
            this.prefix = prefix;
            this._tagName = void 0;
            this._attrsByQName = /* @__PURE__ */ Object.create(null);
            this._attrsByLName = /* @__PURE__ */ Object.create(null);
            this._attrKeys = [];
        }
        function recursiveGetText(node, a) {
            if (node.nodeType === Node.TEXT_NODE) {
                a.push(node._data);
            }
            else {
                for (var i = 0, n = node.childNodes.length; i < n; i++)
                    recursiveGetText(node.childNodes[i], a);
            }
        }
        Element.prototype = Object.create(ContainerNode.prototype, {
            isHTML: { get: function isHTML() {
                    return this.namespaceURI === NAMESPACE.HTML && this.ownerDocument.isHTML;
                } },
            tagName: { get: function tagName() {
                    if (this._tagName === void 0) {
                        var tn;
                        if (this.prefix === null) {
                            tn = this.localName;
                        }
                        else {
                            tn = this.prefix + ":" + this.localName;
                        }
                        if (this.isHTML) {
                            var up = uppercaseCache[tn];
                            if (!up) {
                                uppercaseCache[tn] = up = utils.toASCIIUpperCase(tn);
                            }
                            tn = up;
                        }
                        this._tagName = tn;
                    }
                    return this._tagName;
                } },
            nodeName: { get: function () {
                    return this.tagName;
                } },
            nodeValue: {
                get: function () {
                    return null;
                },
                set: function () {
                }
            },
            textContent: {
                get: function () {
                    var strings = [];
                    recursiveGetText(this, strings);
                    return strings.join("");
                },
                set: function (newtext) {
                    this.removeChildren();
                    if (newtext !== null && newtext !== void 0 && newtext !== "") {
                        this._appendChild(this.ownerDocument.createTextNode(newtext));
                    }
                }
            },
            innerHTML: {
                get: function () {
                    return this.serialize();
                },
                set: utils.nyi
            },
            outerHTML: {
                get: function () {
                    return NodeUtils.serializeOne(this, { nodeType: 0 });
                },
                set: function (v) {
                    var document = this.ownerDocument;
                    var parent = this.parentNode;
                    if (parent === null) {
                        return;
                    }
                    if (parent.nodeType === Node.DOCUMENT_NODE) {
                        utils.NoModificationAllowedError();
                    }
                    if (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                        parent = parent.ownerDocument.createElement("body");
                    }
                    var parser = document.implementation.mozHTMLParser(document._address, parent);
                    parser.parse(v === null ? "" : String(v), true);
                    this.replaceWith(parser._asDocumentFragment());
                }
            },
            _insertAdjacent: { value: function _insertAdjacent(position, node) {
                    var first = false;
                    switch (position) {
                        case "beforebegin":
                            first = true;
                        case "afterend":
                            var parent = this.parentNode;
                            if (parent === null) {
                                return null;
                            }
                            return parent.insertBefore(node, first ? this : this.nextSibling);
                        case "afterbegin":
                            first = true;
                        case "beforeend":
                            return this.insertBefore(node, first ? this.firstChild : null);
                        default:
                            return utils.SyntaxError();
                    }
                } },
            insertAdjacentElement: { value: function insertAdjacentElement(position, element) {
                    if (element.nodeType !== Node.ELEMENT_NODE) {
                        throw new TypeError("not an element");
                    }
                    position = utils.toASCIILowerCase(String(position));
                    return this._insertAdjacent(position, element);
                } },
            insertAdjacentText: { value: function insertAdjacentText(position, data) {
                    var textNode = this.ownerDocument.createTextNode(data);
                    position = utils.toASCIILowerCase(String(position));
                    this._insertAdjacent(position, textNode);
                } },
            insertAdjacentHTML: { value: function insertAdjacentHTML(position, text) {
                    position = utils.toASCIILowerCase(String(position));
                    text = String(text);
                    var context;
                    switch (position) {
                        case "beforebegin":
                        case "afterend":
                            context = this.parentNode;
                            if (context === null || context.nodeType === Node.DOCUMENT_NODE) {
                                utils.NoModificationAllowedError();
                            }
                            break;
                        case "afterbegin":
                        case "beforeend":
                            context = this;
                            break;
                        default:
                            utils.SyntaxError();
                    }
                    if (!(context instanceof Element) || context.ownerDocument.isHTML && context.localName === "html" && context.namespaceURI === NAMESPACE.HTML) {
                        context = context.ownerDocument.createElementNS(NAMESPACE.HTML, "body");
                    }
                    var parser = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, context);
                    parser.parse(text, true);
                    this._insertAdjacent(position, parser._asDocumentFragment());
                } },
            children: { get: function () {
                    if (!this._children) {
                        this._children = new ChildrenCollection(this);
                    }
                    return this._children;
                } },
            attributes: { get: function () {
                    if (!this._attributes) {
                        this._attributes = new AttributesArray(this);
                    }
                    return this._attributes;
                } },
            firstElementChild: { get: function () {
                    for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                        if (kid.nodeType === Node.ELEMENT_NODE)
                            return kid;
                    }
                    return null;
                } },
            lastElementChild: { get: function () {
                    for (var kid = this.lastChild; kid !== null; kid = kid.previousSibling) {
                        if (kid.nodeType === Node.ELEMENT_NODE)
                            return kid;
                    }
                    return null;
                } },
            childElementCount: { get: function () {
                    return this.children.length;
                } },
            nextElement: { value: function (root) {
                    if (!root)
                        root = this.ownerDocument.documentElement;
                    var next = this.firstElementChild;
                    if (!next) {
                        if (this === root)
                            return null;
                        next = this.nextElementSibling;
                    }
                    if (next)
                        return next;
                    for (var parent = this.parentElement; parent && parent !== root; parent = parent.parentElement) {
                        next = parent.nextElementSibling;
                        if (next)
                            return next;
                    }
                    return null;
                } },
            getElementsByTagName: { value: function getElementsByTagName(lname) {
                    var filter;
                    if (!lname)
                        return new NodeList();
                    if (lname === "*")
                        filter = function () {
                            return true;
                        };
                    else if (this.isHTML)
                        filter = htmlLocalNameElementFilter(lname);
                    else
                        filter = localNameElementFilter(lname);
                    return new FilteredElementList(this, filter);
                } },
            getElementsByTagNameNS: { value: function getElementsByTagNameNS(ns, lname) {
                    var filter;
                    if (ns === "*" && lname === "*")
                        filter = function () {
                            return true;
                        };
                    else if (ns === "*")
                        filter = localNameElementFilter(lname);
                    else if (lname === "*")
                        filter = namespaceElementFilter(ns);
                    else
                        filter = namespaceLocalNameElementFilter(ns, lname);
                    return new FilteredElementList(this, filter);
                } },
            getElementsByClassName: { value: function getElementsByClassName(names) {
                    names = String(names).trim();
                    if (names === "") {
                        var result = new NodeList();
                        return result;
                    }
                    names = names.split(/[ \t\r\n\f]+/);
                    return new FilteredElementList(this, classNamesElementFilter(names));
                } },
            getElementsByName: { value: function getElementsByName(name) {
                    return new FilteredElementList(this, elementNameFilter(String(name)));
                } },
            clone: { value: function clone() {
                    var e;
                    if (this.namespaceURI !== NAMESPACE.HTML || this.prefix || !this.ownerDocument.isHTML) {
                        e = this.ownerDocument.createElementNS(this.namespaceURI, this.prefix !== null ? this.prefix + ":" + this.localName : this.localName);
                    }
                    else {
                        e = this.ownerDocument.createElement(this.localName);
                    }
                    for (var i = 0, n = this._attrKeys.length; i < n; i++) {
                        var lname = this._attrKeys[i];
                        var a = this._attrsByLName[lname];
                        var b = a.cloneNode();
                        b._setOwnerElement(e);
                        e._attrsByLName[lname] = b;
                        e._addQName(b);
                    }
                    e._attrKeys = this._attrKeys.concat();
                    return e;
                } },
            isEqual: { value: function isEqual(that) {
                    if (this.localName !== that.localName || this.namespaceURI !== that.namespaceURI || this.prefix !== that.prefix || this._numattrs !== that._numattrs)
                        return false;
                    for (var i = 0, n = this._numattrs; i < n; i++) {
                        var a = this._attr(i);
                        if (!that.hasAttributeNS(a.namespaceURI, a.localName))
                            return false;
                        if (that.getAttributeNS(a.namespaceURI, a.localName) !== a.value)
                            return false;
                    }
                    return true;
                } },
            _lookupNamespacePrefix: { value: function _lookupNamespacePrefix(ns, originalElement) {
                    if (this.namespaceURI && this.namespaceURI === ns && this.prefix !== null && originalElement.lookupNamespaceURI(this.prefix) === ns) {
                        return this.prefix;
                    }
                    for (var i = 0, n = this._numattrs; i < n; i++) {
                        var a = this._attr(i);
                        if (a.prefix === "xmlns" && a.value === ns && originalElement.lookupNamespaceURI(a.localName) === ns) {
                            return a.localName;
                        }
                    }
                    var parent = this.parentElement;
                    return parent ? parent._lookupNamespacePrefix(ns, originalElement) : null;
                } },
            lookupNamespaceURI: { value: function lookupNamespaceURI(prefix) {
                    if (prefix === "" || prefix === void 0) {
                        prefix = null;
                    }
                    if (this.namespaceURI !== null && this.prefix === prefix)
                        return this.namespaceURI;
                    for (var i = 0, n = this._numattrs; i < n; i++) {
                        var a = this._attr(i);
                        if (a.namespaceURI === NAMESPACE.XMLNS) {
                            if (a.prefix === "xmlns" && a.localName === prefix || prefix === null && a.prefix === null && a.localName === "xmlns") {
                                return a.value || null;
                            }
                        }
                    }
                    var parent = this.parentElement;
                    return parent ? parent.lookupNamespaceURI(prefix) : null;
                } },
            getAttribute: { value: function getAttribute(qname) {
                    var attr = this.getAttributeNode(qname);
                    return attr ? attr.value : null;
                } },
            getAttributeNS: { value: function getAttributeNS(ns, lname) {
                    var attr = this.getAttributeNodeNS(ns, lname);
                    return attr ? attr.value : null;
                } },
            getAttributeNode: { value: function getAttributeNode(qname) {
                    qname = String(qname);
                    if (/[A-Z]/.test(qname) && this.isHTML)
                        qname = utils.toASCIILowerCase(qname);
                    var attr = this._attrsByQName[qname];
                    if (!attr)
                        return null;
                    if (Array.isArray(attr))
                        attr = attr[0];
                    return attr;
                } },
            getAttributeNodeNS: { value: function getAttributeNodeNS(ns, lname) {
                    ns = ns === void 0 || ns === null ? "" : String(ns);
                    lname = String(lname);
                    var attr = this._attrsByLName[ns + "|" + lname];
                    return attr ? attr : null;
                } },
            hasAttribute: { value: function hasAttribute(qname) {
                    qname = String(qname);
                    if (/[A-Z]/.test(qname) && this.isHTML)
                        qname = utils.toASCIILowerCase(qname);
                    return this._attrsByQName[qname] !== void 0;
                } },
            hasAttributeNS: { value: function hasAttributeNS(ns, lname) {
                    ns = ns === void 0 || ns === null ? "" : String(ns);
                    lname = String(lname);
                    var key = ns + "|" + lname;
                    return this._attrsByLName[key] !== void 0;
                } },
            hasAttributes: { value: function hasAttributes() {
                    return this._numattrs > 0;
                } },
            toggleAttribute: { value: function toggleAttribute(qname, force) {
                    qname = String(qname);
                    if (!xml.isValidName(qname))
                        utils.InvalidCharacterError();
                    if (/[A-Z]/.test(qname) && this.isHTML)
                        qname = utils.toASCIILowerCase(qname);
                    var a = this._attrsByQName[qname];
                    if (a === void 0) {
                        if (force === void 0 || force === true) {
                            this._setAttribute(qname, "");
                            return true;
                        }
                        return false;
                    }
                    else {
                        if (force === void 0 || force === false) {
                            this.removeAttribute(qname);
                            return false;
                        }
                        return true;
                    }
                } },
            _setAttribute: { value: function _setAttribute(qname, value) {
                    var attr = this._attrsByQName[qname];
                    var isnew;
                    if (!attr) {
                        attr = this._newattr(qname);
                        isnew = true;
                    }
                    else {
                        if (Array.isArray(attr))
                            attr = attr[0];
                    }
                    attr.value = value;
                    if (this._attributes)
                        this._attributes[qname] = attr;
                    if (isnew && this._newattrhook)
                        this._newattrhook(qname, value);
                } },
            setAttribute: { value: function setAttribute(qname, value) {
                    qname = String(qname);
                    if (!xml.isValidName(qname))
                        utils.InvalidCharacterError();
                    if (/[A-Z]/.test(qname) && this.isHTML)
                        qname = utils.toASCIILowerCase(qname);
                    this._setAttribute(qname, String(value));
                } },
            _setAttributeNS: { value: function _setAttributeNS(ns, qname, value) {
                    var pos = qname.indexOf(":"), prefix, lname;
                    if (pos < 0) {
                        prefix = null;
                        lname = qname;
                    }
                    else {
                        prefix = qname.substring(0, pos);
                        lname = qname.substring(pos + 1);
                    }
                    if (ns === "" || ns === void 0)
                        ns = null;
                    var key = (ns === null ? "" : ns) + "|" + lname;
                    var attr = this._attrsByLName[key];
                    var isnew;
                    if (!attr) {
                        attr = new Attr(this, lname, prefix, ns);
                        isnew = true;
                        this._attrsByLName[key] = attr;
                        if (this._attributes) {
                            this._attributes[this._attrKeys.length] = attr;
                        }
                        this._attrKeys.push(key);
                        this._addQName(attr);
                    }
                    else if (false) {
                        if (attr.prefix !== prefix) {
                            this._removeQName(attr);
                            attr.prefix = prefix;
                            this._addQName(attr);
                        }
                    }
                    attr.value = value;
                    if (isnew && this._newattrhook)
                        this._newattrhook(qname, value);
                } },
            setAttributeNS: { value: function setAttributeNS(ns, qname, value) {
                    ns = ns === null || ns === void 0 || ns === "" ? null : String(ns);
                    qname = String(qname);
                    if (!xml.isValidQName(qname))
                        utils.InvalidCharacterError();
                    var pos = qname.indexOf(":");
                    var prefix = pos < 0 ? null : qname.substring(0, pos);
                    if (prefix !== null && ns === null || prefix === "xml" && ns !== NAMESPACE.XML || (qname === "xmlns" || prefix === "xmlns") && ns !== NAMESPACE.XMLNS || ns === NAMESPACE.XMLNS && !(qname === "xmlns" || prefix === "xmlns"))
                        utils.NamespaceError();
                    this._setAttributeNS(ns, qname, String(value));
                } },
            setAttributeNode: { value: function setAttributeNode(attr) {
                    if (attr.ownerElement !== null && attr.ownerElement !== this) {
                        throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
                    }
                    var result = null;
                    var oldAttrs = this._attrsByQName[attr.name];
                    if (oldAttrs) {
                        if (!Array.isArray(oldAttrs)) {
                            oldAttrs = [oldAttrs];
                        }
                        if (oldAttrs.some(function (a) {
                            return a === attr;
                        })) {
                            return attr;
                        }
                        else if (attr.ownerElement !== null) {
                            throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
                        }
                        oldAttrs.forEach(function (a) {
                            this.removeAttributeNode(a);
                        }, this);
                        result = oldAttrs[0];
                    }
                    this.setAttributeNodeNS(attr);
                    return result;
                } },
            setAttributeNodeNS: { value: function setAttributeNodeNS(attr) {
                    if (attr.ownerElement !== null) {
                        throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
                    }
                    var ns = attr.namespaceURI;
                    var key = (ns === null ? "" : ns) + "|" + attr.localName;
                    var oldAttr = this._attrsByLName[key];
                    if (oldAttr) {
                        this.removeAttributeNode(oldAttr);
                    }
                    attr._setOwnerElement(this);
                    this._attrsByLName[key] = attr;
                    if (this._attributes) {
                        this._attributes[this._attrKeys.length] = attr;
                    }
                    this._attrKeys.push(key);
                    this._addQName(attr);
                    if (this._newattrhook)
                        this._newattrhook(attr.name, attr.value);
                    return oldAttr || null;
                } },
            removeAttribute: { value: function removeAttribute(qname) {
                    qname = String(qname);
                    if (/[A-Z]/.test(qname) && this.isHTML)
                        qname = utils.toASCIILowerCase(qname);
                    var attr = this._attrsByQName[qname];
                    if (!attr)
                        return;
                    if (Array.isArray(attr)) {
                        if (attr.length > 2) {
                            attr = attr.shift();
                        }
                        else {
                            this._attrsByQName[qname] = attr[1];
                            attr = attr[0];
                        }
                    }
                    else {
                        this._attrsByQName[qname] = void 0;
                    }
                    var ns = attr.namespaceURI;
                    var key = (ns === null ? "" : ns) + "|" + attr.localName;
                    this._attrsByLName[key] = void 0;
                    var i = this._attrKeys.indexOf(key);
                    if (this._attributes) {
                        Array.prototype.splice.call(this._attributes, i, 1);
                        this._attributes[qname] = void 0;
                    }
                    this._attrKeys.splice(i, 1);
                    var onchange = attr.onchange;
                    attr._setOwnerElement(null);
                    if (onchange) {
                        onchange.call(attr, this, attr.localName, attr.value, null);
                    }
                    if (this.rooted)
                        this.ownerDocument.mutateRemoveAttr(attr);
                } },
            removeAttributeNS: { value: function removeAttributeNS(ns, lname) {
                    ns = ns === void 0 || ns === null ? "" : String(ns);
                    lname = String(lname);
                    var key = ns + "|" + lname;
                    var attr = this._attrsByLName[key];
                    if (!attr)
                        return;
                    this._attrsByLName[key] = void 0;
                    var i = this._attrKeys.indexOf(key);
                    if (this._attributes) {
                        Array.prototype.splice.call(this._attributes, i, 1);
                    }
                    this._attrKeys.splice(i, 1);
                    this._removeQName(attr);
                    var onchange = attr.onchange;
                    attr._setOwnerElement(null);
                    if (onchange) {
                        onchange.call(attr, this, attr.localName, attr.value, null);
                    }
                    if (this.rooted)
                        this.ownerDocument.mutateRemoveAttr(attr);
                } },
            removeAttributeNode: { value: function removeAttributeNode(attr) {
                    var ns = attr.namespaceURI;
                    var key = (ns === null ? "" : ns) + "|" + attr.localName;
                    if (this._attrsByLName[key] !== attr) {
                        utils.NotFoundError();
                    }
                    this.removeAttributeNS(ns, attr.localName);
                    return attr;
                } },
            getAttributeNames: { value: function getAttributeNames() {
                    var elt = this;
                    return this._attrKeys.map(function (key) {
                        return elt._attrsByLName[key].name;
                    });
                } },
            _getattr: { value: function _getattr(qname) {
                    var attr = this._attrsByQName[qname];
                    return attr ? attr.value : null;
                } },
            _setattr: { value: function _setattr(qname, value) {
                    var attr = this._attrsByQName[qname];
                    var isnew;
                    if (!attr) {
                        attr = this._newattr(qname);
                        isnew = true;
                    }
                    attr.value = String(value);
                    if (this._attributes)
                        this._attributes[qname] = attr;
                    if (isnew && this._newattrhook)
                        this._newattrhook(qname, value);
                } },
            _newattr: { value: function _newattr(qname) {
                    var attr = new Attr(this, qname, null, null);
                    var key = "|" + qname;
                    this._attrsByQName[qname] = attr;
                    this._attrsByLName[key] = attr;
                    if (this._attributes) {
                        this._attributes[this._attrKeys.length] = attr;
                    }
                    this._attrKeys.push(key);
                    return attr;
                } },
            _addQName: { value: function (attr) {
                    var qname = attr.name;
                    var existing = this._attrsByQName[qname];
                    if (!existing) {
                        this._attrsByQName[qname] = attr;
                    }
                    else if (Array.isArray(existing)) {
                        existing.push(attr);
                    }
                    else {
                        this._attrsByQName[qname] = [existing, attr];
                    }
                    if (this._attributes)
                        this._attributes[qname] = attr;
                } },
            _removeQName: { value: function (attr) {
                    var qname = attr.name;
                    var target = this._attrsByQName[qname];
                    if (Array.isArray(target)) {
                        var idx = target.indexOf(attr);
                        utils.assert(idx !== -1);
                        if (target.length === 2) {
                            this._attrsByQName[qname] = target[1 - idx];
                            if (this._attributes) {
                                this._attributes[qname] = this._attrsByQName[qname];
                            }
                        }
                        else {
                            target.splice(idx, 1);
                            if (this._attributes && this._attributes[qname] === attr) {
                                this._attributes[qname] = target[0];
                            }
                        }
                    }
                    else {
                        utils.assert(target === attr);
                        this._attrsByQName[qname] = void 0;
                        if (this._attributes) {
                            this._attributes[qname] = void 0;
                        }
                    }
                } },
            _numattrs: { get: function () {
                    return this._attrKeys.length;
                } },
            _attr: { value: function (n) {
                    return this._attrsByLName[this._attrKeys[n]];
                } },
            id: attributes.property({ name: "id" }),
            className: attributes.property({ name: "class" }),
            classList: { get: function () {
                    var self = this;
                    if (this._classList) {
                        return this._classList;
                    }
                    var dtlist = new DOMTokenList(function () {
                        return self.className || "";
                    }, function (v) {
                        self.className = v;
                    });
                    this._classList = dtlist;
                    return dtlist;
                }, set: function (v) {
                    this.className = v;
                } },
            matches: { value: function (selector) {
                    return select.matches(this, selector);
                } },
            closest: { value: function (selector) {
                    var el = this;
                    do {
                        if (el.matches && el.matches(selector)) {
                            return el;
                        }
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === Node.ELEMENT_NODE);
                    return null;
                } },
            querySelector: { value: function (selector) {
                    return select(selector, this)[0];
                } },
            querySelectorAll: { value: function (selector) {
                    var nodes = select(selector, this);
                    return nodes.item ? nodes : new NodeList(nodes);
                } }
        });
        Object.defineProperties(Element.prototype, ChildNode);
        Object.defineProperties(Element.prototype, NonDocumentTypeChildNode);
        attributes.registerChangeHandler(Element, "id", function (element, lname, oldval, newval) {
            if (element.rooted) {
                if (oldval) {
                    element.ownerDocument.delId(oldval, element);
                }
                if (newval) {
                    element.ownerDocument.addId(newval, element);
                }
            }
        });
        attributes.registerChangeHandler(Element, "class", function (element, lname, oldval, newval) {
            if (element._classList) {
                element._classList._update();
            }
        });
        function Attr(elt, lname, prefix, namespace, value) {
            this.localName = lname;
            this.prefix = prefix === null || prefix === "" ? null : "" + prefix;
            this.namespaceURI = namespace === null || namespace === "" ? null : "" + namespace;
            this.data = value;
            this._setOwnerElement(elt);
        }
        Attr.prototype = Object.create(Object.prototype, {
            ownerElement: {
                get: function () {
                    return this._ownerElement;
                }
            },
            _setOwnerElement: { value: function _setOwnerElement(elt) {
                    this._ownerElement = elt;
                    if (this.prefix === null && this.namespaceURI === null && elt) {
                        this.onchange = elt._attributeChangeHandlers[this.localName];
                    }
                    else {
                        this.onchange = null;
                    }
                } },
            name: { get: function () {
                    return this.prefix ? this.prefix + ":" + this.localName : this.localName;
                } },
            specified: { get: function () {
                    return true;
                } },
            value: {
                get: function () {
                    return this.data;
                },
                set: function (value) {
                    var oldval = this.data;
                    value = value === void 0 ? "" : value + "";
                    if (value === oldval)
                        return;
                    this.data = value;
                    if (this.ownerElement) {
                        if (this.onchange)
                            this.onchange(this.ownerElement, this.localName, oldval, value);
                        if (this.ownerElement.rooted)
                            this.ownerElement.ownerDocument.mutateAttr(this, oldval);
                    }
                }
            },
            cloneNode: { value: function cloneNode(deep) {
                    return new Attr(null, this.localName, this.prefix, this.namespaceURI, this.data);
                } },
            nodeType: { get: function () {
                    return Node.ATTRIBUTE_NODE;
                } },
            nodeName: { get: function () {
                    return this.name;
                } },
            nodeValue: {
                get: function () {
                    return this.value;
                },
                set: function (v) {
                    this.value = v;
                }
            },
            textContent: {
                get: function () {
                    return this.value;
                },
                set: function (v) {
                    if (v === null || v === void 0) {
                        v = "";
                    }
                    this.value = v;
                }
            }
        });
        Element._Attr = Attr;
        function AttributesArray(elt) {
            NamedNodeMap.call(this, elt);
            for (var name in elt._attrsByQName) {
                this[name] = elt._attrsByQName[name];
            }
            for (var i = 0; i < elt._attrKeys.length; i++) {
                this[i] = elt._attrsByLName[elt._attrKeys[i]];
            }
        }
        AttributesArray.prototype = Object.create(NamedNodeMap.prototype, {
            length: { get: function () {
                    return this.element._attrKeys.length;
                }, set: function () {
                } },
            item: { value: function (n) {
                    n = n >>> 0;
                    if (n >= this.length) {
                        return null;
                    }
                    return this.element._attrsByLName[this.element._attrKeys[n]];
                } }
        });
        if (global.Symbol && global.Symbol.iterator) {
            AttributesArray.prototype[global.Symbol.iterator] = function () {
                var i = 0, n = this.length, self = this;
                return {
                    next: function () {
                        if (i < n)
                            return { value: self.item(i++) };
                        return { done: true };
                    }
                };
            };
        }
        function ChildrenCollection(e) {
            this.element = e;
            this.updateCache();
        }
        ChildrenCollection.prototype = Object.create(Object.prototype, {
            length: { get: function () {
                    this.updateCache();
                    return this.childrenByNumber.length;
                } },
            item: { value: function item(n) {
                    this.updateCache();
                    return this.childrenByNumber[n] || null;
                } },
            namedItem: { value: function namedItem(name) {
                    this.updateCache();
                    return this.childrenByName[name] || null;
                } },
            namedItems: { get: function () {
                    this.updateCache();
                    return this.childrenByName;
                } },
            updateCache: { value: function updateCache() {
                    var namedElts = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
                    if (this.lastModTime !== this.element.lastModTime) {
                        this.lastModTime = this.element.lastModTime;
                        var n = this.childrenByNumber && this.childrenByNumber.length || 0;
                        for (var i = 0; i < n; i++) {
                            this[i] = void 0;
                        }
                        this.childrenByNumber = [];
                        this.childrenByName = /* @__PURE__ */ Object.create(null);
                        for (var c = this.element.firstChild; c !== null; c = c.nextSibling) {
                            if (c.nodeType === Node.ELEMENT_NODE) {
                                this[this.childrenByNumber.length] = c;
                                this.childrenByNumber.push(c);
                                var id = c.getAttribute("id");
                                if (id && !this.childrenByName[id])
                                    this.childrenByName[id] = c;
                                var name = c.getAttribute("name");
                                if (name && this.element.namespaceURI === NAMESPACE.HTML && namedElts.test(this.element.localName) && !this.childrenByName[name])
                                    this.childrenByName[id] = c;
                            }
                        }
                    }
                } }
        });
        function localNameElementFilter(lname) {
            return function (e) {
                return e.localName === lname;
            };
        }
        function htmlLocalNameElementFilter(lname) {
            var lclname = utils.toASCIILowerCase(lname);
            if (lclname === lname)
                return localNameElementFilter(lname);
            return function (e) {
                return e.isHTML ? e.localName === lclname : e.localName === lname;
            };
        }
        function namespaceElementFilter(ns) {
            return function (e) {
                return e.namespaceURI === ns;
            };
        }
        function namespaceLocalNameElementFilter(ns, lname) {
            return function (e) {
                return e.namespaceURI === ns && e.localName === lname;
            };
        }
        function classNamesElementFilter(names) {
            return function (e) {
                return names.every(function (n) {
                    return e.classList.contains(n);
                });
            };
        }
        function elementNameFilter(name) {
            return function (e) {
                if (e.namespaceURI !== NAMESPACE.HTML) {
                    return false;
                }
                return e.getAttribute("name") === name;
            };
        }
    }
});
// external/npm/node_modules/domino/lib/Leaf.js
var require_Leaf = __commonJS({
    "external/npm/node_modules/domino/lib/Leaf.js"(exports, module) {
        "use strict";
        module.exports = Leaf;
        var Node = require_Node();
        var NodeList = require_NodeList();
        var utils = require_utils();
        var HierarchyRequestError = utils.HierarchyRequestError;
        var NotFoundError = utils.NotFoundError;
        function Leaf() {
            Node.call(this);
        }
        Leaf.prototype = Object.create(Node.prototype, {
            hasChildNodes: { value: function () {
                    return false;
                } },
            firstChild: { value: null },
            lastChild: { value: null },
            insertBefore: { value: function (node, child) {
                    if (!node.nodeType)
                        throw new TypeError("not a node");
                    HierarchyRequestError();
                } },
            replaceChild: { value: function (node, child) {
                    if (!node.nodeType)
                        throw new TypeError("not a node");
                    HierarchyRequestError();
                } },
            removeChild: { value: function (node) {
                    if (!node.nodeType)
                        throw new TypeError("not a node");
                    NotFoundError();
                } },
            removeChildren: { value: function () {
                } },
            childNodes: { get: function () {
                    if (!this._childNodes)
                        this._childNodes = new NodeList();
                    return this._childNodes;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/CharacterData.js
var require_CharacterData = __commonJS({
    "external/npm/node_modules/domino/lib/CharacterData.js"(exports, module) {
        "use strict";
        module.exports = CharacterData;
        var Leaf = require_Leaf();
        var utils = require_utils();
        var ChildNode = require_ChildNode();
        var NonDocumentTypeChildNode = require_NonDocumentTypeChildNode();
        function CharacterData() {
            Leaf.call(this);
        }
        CharacterData.prototype = Object.create(Leaf.prototype, {
            substringData: { value: function substringData(offset, count) {
                    if (arguments.length < 2) {
                        throw new TypeError("Not enough arguments");
                    }
                    offset = offset >>> 0;
                    count = count >>> 0;
                    if (offset > this.data.length || offset < 0 || count < 0) {
                        utils.IndexSizeError();
                    }
                    return this.data.substring(offset, offset + count);
                } },
            appendData: { value: function appendData(data) {
                    if (arguments.length < 1) {
                        throw new TypeError("Not enough arguments");
                    }
                    this.data += String(data);
                } },
            insertData: { value: function insertData(offset, data) {
                    return this.replaceData(offset, 0, data);
                } },
            deleteData: { value: function deleteData(offset, count) {
                    return this.replaceData(offset, count, "");
                } },
            replaceData: { value: function replaceData(offset, count, data) {
                    var curtext = this.data, len = curtext.length;
                    offset = offset >>> 0;
                    count = count >>> 0;
                    data = String(data);
                    if (offset > len || offset < 0)
                        utils.IndexSizeError();
                    if (offset + count > len)
                        count = len - offset;
                    var prefix = curtext.substring(0, offset), suffix = curtext.substring(offset + count);
                    this.data = prefix + data + suffix;
                } },
            isEqual: { value: function isEqual(n) {
                    return this._data === n._data;
                } },
            length: { get: function () {
                    return this.data.length;
                } }
        });
        Object.defineProperties(CharacterData.prototype, ChildNode);
        Object.defineProperties(CharacterData.prototype, NonDocumentTypeChildNode);
    }
});
// external/npm/node_modules/domino/lib/Text.js
var require_Text = __commonJS({
    "external/npm/node_modules/domino/lib/Text.js"(exports, module) {
        "use strict";
        module.exports = Text;
        var utils = require_utils();
        var Node = require_Node();
        var CharacterData = require_CharacterData();
        function Text(doc, data) {
            CharacterData.call(this);
            this.nodeType = Node.TEXT_NODE;
            this.ownerDocument = doc;
            this._data = data;
            this._index = void 0;
        }
        var nodeValue = {
            get: function () {
                return this._data;
            },
            set: function (v) {
                if (v === null || v === void 0) {
                    v = "";
                }
                else {
                    v = String(v);
                }
                if (v === this._data)
                    return;
                this._data = v;
                if (this.rooted)
                    this.ownerDocument.mutateValue(this);
                if (this.parentNode && this.parentNode._textchangehook)
                    this.parentNode._textchangehook(this);
            }
        };
        Text.prototype = Object.create(CharacterData.prototype, {
            nodeName: { value: "#text" },
            nodeValue,
            textContent: nodeValue,
            data: {
                get: nodeValue.get,
                set: function (v) {
                    nodeValue.set.call(this, v === null ? "" : String(v));
                }
            },
            splitText: { value: function splitText(offset) {
                    if (offset > this._data.length || offset < 0)
                        utils.IndexSizeError();
                    var newdata = this._data.substring(offset), newnode = this.ownerDocument.createTextNode(newdata);
                    this.data = this.data.substring(0, offset);
                    var parent = this.parentNode;
                    if (parent !== null)
                        parent.insertBefore(newnode, this.nextSibling);
                    return newnode;
                } },
            wholeText: { get: function wholeText() {
                    var result = this.textContent;
                    for (var next = this.nextSibling; next; next = next.nextSibling) {
                        if (next.nodeType !== Node.TEXT_NODE) {
                            break;
                        }
                        result += next.textContent;
                    }
                    return result;
                } },
            replaceWholeText: { value: utils.nyi },
            clone: { value: function clone() {
                    return new Text(this.ownerDocument, this._data);
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/Comment.js
var require_Comment = __commonJS({
    "external/npm/node_modules/domino/lib/Comment.js"(exports, module) {
        "use strict";
        module.exports = Comment;
        var Node = require_Node();
        var CharacterData = require_CharacterData();
        function Comment(doc, data) {
            CharacterData.call(this);
            this.nodeType = Node.COMMENT_NODE;
            this.ownerDocument = doc;
            this._data = data;
        }
        var nodeValue = {
            get: function () {
                return this._data;
            },
            set: function (v) {
                if (v === null || v === void 0) {
                    v = "";
                }
                else {
                    v = String(v);
                }
                this._data = v;
                if (this.rooted)
                    this.ownerDocument.mutateValue(this);
            }
        };
        Comment.prototype = Object.create(CharacterData.prototype, {
            nodeName: { value: "#comment" },
            nodeValue,
            textContent: nodeValue,
            data: {
                get: nodeValue.get,
                set: function (v) {
                    nodeValue.set.call(this, v === null ? "" : String(v));
                }
            },
            clone: { value: function clone() {
                    return new Comment(this.ownerDocument, this._data);
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/DocumentFragment.js
var require_DocumentFragment = __commonJS({
    "external/npm/node_modules/domino/lib/DocumentFragment.js"(exports, module) {
        "use strict";
        module.exports = DocumentFragment;
        var Node = require_Node();
        var NodeList = require_NodeList();
        var ContainerNode = require_ContainerNode();
        var Element = require_Element();
        var select = require_select();
        var utils = require_utils();
        function DocumentFragment(doc) {
            ContainerNode.call(this);
            this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
            this.ownerDocument = doc;
        }
        DocumentFragment.prototype = Object.create(ContainerNode.prototype, {
            nodeName: { value: "#document-fragment" },
            nodeValue: {
                get: function () {
                    return null;
                },
                set: function () {
                }
            },
            textContent: Object.getOwnPropertyDescriptor(Element.prototype, "textContent"),
            querySelector: { value: function (selector) {
                    var nodes = this.querySelectorAll(selector);
                    return nodes.length ? nodes[0] : null;
                } },
            querySelectorAll: { value: function (selector) {
                    var context = Object.create(this);
                    context.isHTML = true;
                    context.getElementsByTagName = Element.prototype.getElementsByTagName;
                    context.nextElement = Object.getOwnPropertyDescriptor(Element.prototype, "firstElementChild").get;
                    var nodes = select(selector, context);
                    return nodes.item ? nodes : new NodeList(nodes);
                } },
            clone: { value: function clone() {
                    return new DocumentFragment(this.ownerDocument);
                } },
            isEqual: { value: function isEqual(n) {
                    return true;
                } },
            innerHTML: {
                get: function () {
                    return this.serialize();
                },
                set: utils.nyi
            },
            outerHTML: {
                get: function () {
                    return this.serialize();
                },
                set: utils.nyi
            }
        });
    }
});
// external/npm/node_modules/domino/lib/ProcessingInstruction.js
var require_ProcessingInstruction = __commonJS({
    "external/npm/node_modules/domino/lib/ProcessingInstruction.js"(exports, module) {
        "use strict";
        module.exports = ProcessingInstruction;
        var Node = require_Node();
        var CharacterData = require_CharacterData();
        function ProcessingInstruction(doc, target, data) {
            CharacterData.call(this);
            this.nodeType = Node.PROCESSING_INSTRUCTION_NODE;
            this.ownerDocument = doc;
            this.target = target;
            this._data = data;
        }
        var nodeValue = {
            get: function () {
                return this._data;
            },
            set: function (v) {
                if (v === null || v === void 0) {
                    v = "";
                }
                else {
                    v = String(v);
                }
                this._data = v;
                if (this.rooted)
                    this.ownerDocument.mutateValue(this);
            }
        };
        ProcessingInstruction.prototype = Object.create(CharacterData.prototype, {
            nodeName: { get: function () {
                    return this.target;
                } },
            nodeValue,
            textContent: nodeValue,
            data: {
                get: nodeValue.get,
                set: function (v) {
                    nodeValue.set.call(this, v === null ? "" : String(v));
                }
            },
            clone: { value: function clone() {
                    return new ProcessingInstruction(this.ownerDocument, this.target, this._data);
                } },
            isEqual: { value: function isEqual(n) {
                    return this.target === n.target && this._data === n._data;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/NodeFilter.js
var require_NodeFilter = __commonJS({
    "external/npm/node_modules/domino/lib/NodeFilter.js"(exports, module) {
        "use strict";
        var NodeFilter = {
            FILTER_ACCEPT: 1,
            FILTER_REJECT: 2,
            FILTER_SKIP: 3,
            SHOW_ALL: 4294967295,
            SHOW_ELEMENT: 1,
            SHOW_ATTRIBUTE: 2,
            SHOW_TEXT: 4,
            SHOW_CDATA_SECTION: 8,
            SHOW_ENTITY_REFERENCE: 16,
            SHOW_ENTITY: 32,
            SHOW_PROCESSING_INSTRUCTION: 64,
            SHOW_COMMENT: 128,
            SHOW_DOCUMENT: 256,
            SHOW_DOCUMENT_TYPE: 512,
            SHOW_DOCUMENT_FRAGMENT: 1024,
            SHOW_NOTATION: 2048
        };
        module.exports = NodeFilter.constructor = NodeFilter.prototype = NodeFilter;
    }
});
// external/npm/node_modules/domino/lib/NodeTraversal.js
var require_NodeTraversal = __commonJS({
    "external/npm/node_modules/domino/lib/NodeTraversal.js"(exports, module) {
        "use strict";
        var NodeTraversal = module.exports = {
            nextSkippingChildren,
            nextAncestorSibling,
            next,
            previous,
            deepLastChild
        };
        function nextSkippingChildren(node, stayWithin) {
            if (node === stayWithin) {
                return null;
            }
            if (node.nextSibling !== null) {
                return node.nextSibling;
            }
            return nextAncestorSibling(node, stayWithin);
        }
        function nextAncestorSibling(node, stayWithin) {
            for (node = node.parentNode; node !== null; node = node.parentNode) {
                if (node === stayWithin) {
                    return null;
                }
                if (node.nextSibling !== null) {
                    return node.nextSibling;
                }
            }
            return null;
        }
        function next(node, stayWithin) {
            var n;
            n = node.firstChild;
            if (n !== null) {
                return n;
            }
            if (node === stayWithin) {
                return null;
            }
            n = node.nextSibling;
            if (n !== null) {
                return n;
            }
            return nextAncestorSibling(node, stayWithin);
        }
        function deepLastChild(node) {
            while (node.lastChild) {
                node = node.lastChild;
            }
            return node;
        }
        function previous(node, stayWithin) {
            var p;
            p = node.previousSibling;
            if (p !== null) {
                return deepLastChild(p);
            }
            p = node.parentNode;
            if (p === stayWithin) {
                return null;
            }
            return p;
        }
    }
});
// external/npm/node_modules/domino/lib/TreeWalker.js
var require_TreeWalker = __commonJS({
    "external/npm/node_modules/domino/lib/TreeWalker.js"(exports, module) {
        "use strict";
        module.exports = TreeWalker;
        var Node = require_Node();
        var NodeFilter = require_NodeFilter();
        var NodeTraversal = require_NodeTraversal();
        var utils = require_utils();
        var mapChild = {
            first: "firstChild",
            last: "lastChild",
            next: "firstChild",
            previous: "lastChild"
        };
        var mapSibling = {
            first: "nextSibling",
            last: "previousSibling",
            next: "nextSibling",
            previous: "previousSibling"
        };
        function traverseChildren(tw, type) {
            var child, node, parent, result, sibling;
            node = tw._currentNode[mapChild[type]];
            while (node !== null) {
                result = tw._internalFilter(node);
                if (result === NodeFilter.FILTER_ACCEPT) {
                    tw._currentNode = node;
                    return node;
                }
                if (result === NodeFilter.FILTER_SKIP) {
                    child = node[mapChild[type]];
                    if (child !== null) {
                        node = child;
                        continue;
                    }
                }
                while (node !== null) {
                    sibling = node[mapSibling[type]];
                    if (sibling !== null) {
                        node = sibling;
                        break;
                    }
                    parent = node.parentNode;
                    if (parent === null || parent === tw.root || parent === tw._currentNode) {
                        return null;
                    }
                    else {
                        node = parent;
                    }
                }
            }
            return null;
        }
        function traverseSiblings(tw, type) {
            var node, result, sibling;
            node = tw._currentNode;
            if (node === tw.root) {
                return null;
            }
            while (true) {
                sibling = node[mapSibling[type]];
                while (sibling !== null) {
                    node = sibling;
                    result = tw._internalFilter(node);
                    if (result === NodeFilter.FILTER_ACCEPT) {
                        tw._currentNode = node;
                        return node;
                    }
                    sibling = node[mapChild[type]];
                    if (result === NodeFilter.FILTER_REJECT || sibling === null) {
                        sibling = node[mapSibling[type]];
                    }
                }
                node = node.parentNode;
                if (node === null || node === tw.root) {
                    return null;
                }
                if (tw._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
                    return null;
                }
            }
        }
        function TreeWalker(root, whatToShow, filter) {
            if (!root || !root.nodeType) {
                utils.NotSupportedError();
            }
            this._root = root;
            this._whatToShow = Number(whatToShow) || 0;
            this._filter = filter || null;
            this._active = false;
            this._currentNode = root;
        }
        Object.defineProperties(TreeWalker.prototype, {
            root: { get: function () {
                    return this._root;
                } },
            whatToShow: { get: function () {
                    return this._whatToShow;
                } },
            filter: { get: function () {
                    return this._filter;
                } },
            currentNode: {
                get: function currentNode() {
                    return this._currentNode;
                },
                set: function setCurrentNode(v) {
                    if (!(v instanceof Node)) {
                        throw new TypeError("Not a Node");
                    }
                    this._currentNode = v;
                }
            },
            _internalFilter: { value: function _internalFilter(node) {
                    var result, filter;
                    if (this._active) {
                        utils.InvalidStateError();
                    }
                    if (!(1 << node.nodeType - 1 & this._whatToShow)) {
                        return NodeFilter.FILTER_SKIP;
                    }
                    filter = this._filter;
                    if (filter === null) {
                        result = NodeFilter.FILTER_ACCEPT;
                    }
                    else {
                        this._active = true;
                        try {
                            if (typeof filter === "function") {
                                result = filter(node);
                            }
                            else {
                                result = filter.acceptNode(node);
                            }
                        }
                        finally {
                            this._active = false;
                        }
                    }
                    return +result;
                } },
            parentNode: { value: function parentNode() {
                    var node = this._currentNode;
                    while (node !== this.root) {
                        node = node.parentNode;
                        if (node === null) {
                            return null;
                        }
                        if (this._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
                            this._currentNode = node;
                            return node;
                        }
                    }
                    return null;
                } },
            firstChild: { value: function firstChild() {
                    return traverseChildren(this, "first");
                } },
            lastChild: { value: function lastChild() {
                    return traverseChildren(this, "last");
                } },
            previousSibling: { value: function previousSibling() {
                    return traverseSiblings(this, "previous");
                } },
            nextSibling: { value: function nextSibling() {
                    return traverseSiblings(this, "next");
                } },
            previousNode: { value: function previousNode() {
                    var node, result, previousSibling, lastChild;
                    node = this._currentNode;
                    while (node !== this._root) {
                        for (previousSibling = node.previousSibling; previousSibling; previousSibling = node.previousSibling) {
                            node = previousSibling;
                            result = this._internalFilter(node);
                            if (result === NodeFilter.FILTER_REJECT) {
                                continue;
                            }
                            for (lastChild = node.lastChild; lastChild; lastChild = node.lastChild) {
                                node = lastChild;
                                result = this._internalFilter(node);
                                if (result === NodeFilter.FILTER_REJECT) {
                                    break;
                                }
                            }
                            if (result === NodeFilter.FILTER_ACCEPT) {
                                this._currentNode = node;
                                return node;
                            }
                        }
                        if (node === this.root || node.parentNode === null) {
                            return null;
                        }
                        node = node.parentNode;
                        if (this._internalFilter(node) === NodeFilter.FILTER_ACCEPT) {
                            this._currentNode = node;
                            return node;
                        }
                    }
                    return null;
                } },
            nextNode: { value: function nextNode() {
                    var node, result, firstChild, nextSibling;
                    node = this._currentNode;
                    result = NodeFilter.FILTER_ACCEPT;
                    CHILDREN: while (true) {
                        for (firstChild = node.firstChild; firstChild; firstChild = node.firstChild) {
                            node = firstChild;
                            result = this._internalFilter(node);
                            if (result === NodeFilter.FILTER_ACCEPT) {
                                this._currentNode = node;
                                return node;
                            }
                            else if (result === NodeFilter.FILTER_REJECT) {
                                break;
                            }
                        }
                        for (nextSibling = NodeTraversal.nextSkippingChildren(node, this.root); nextSibling; nextSibling = NodeTraversal.nextSkippingChildren(node, this.root)) {
                            node = nextSibling;
                            result = this._internalFilter(node);
                            if (result === NodeFilter.FILTER_ACCEPT) {
                                this._currentNode = node;
                                return node;
                            }
                            else if (result === NodeFilter.FILTER_SKIP) {
                                continue CHILDREN;
                            }
                        }
                        return null;
                    }
                } },
            toString: { value: function toString() {
                    return "[object TreeWalker]";
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/NodeIterator.js
var require_NodeIterator = __commonJS({
    "external/npm/node_modules/domino/lib/NodeIterator.js"(exports, module) {
        "use strict";
        module.exports = NodeIterator;
        var NodeFilter = require_NodeFilter();
        var NodeTraversal = require_NodeTraversal();
        var utils = require_utils();
        function move(node, stayWithin, directionIsNext) {
            if (directionIsNext) {
                return NodeTraversal.next(node, stayWithin);
            }
            else {
                if (node === stayWithin) {
                    return null;
                }
                return NodeTraversal.previous(node, null);
            }
        }
        function isInclusiveAncestor(node, possibleChild) {
            for (; possibleChild; possibleChild = possibleChild.parentNode) {
                if (node === possibleChild) {
                    return true;
                }
            }
            return false;
        }
        function traverse(ni, directionIsNext) {
            var node, beforeNode;
            node = ni._referenceNode;
            beforeNode = ni._pointerBeforeReferenceNode;
            while (true) {
                if (beforeNode === directionIsNext) {
                    beforeNode = !beforeNode;
                }
                else {
                    node = move(node, ni._root, directionIsNext);
                    if (node === null) {
                        return null;
                    }
                }
                var result = ni._internalFilter(node);
                if (result === NodeFilter.FILTER_ACCEPT) {
                    break;
                }
            }
            ni._referenceNode = node;
            ni._pointerBeforeReferenceNode = beforeNode;
            return node;
        }
        function NodeIterator(root, whatToShow, filter) {
            if (!root || !root.nodeType) {
                utils.NotSupportedError();
            }
            this._root = root;
            this._referenceNode = root;
            this._pointerBeforeReferenceNode = true;
            this._whatToShow = Number(whatToShow) || 0;
            this._filter = filter || null;
            this._active = false;
            root.doc._attachNodeIterator(this);
        }
        Object.defineProperties(NodeIterator.prototype, {
            root: { get: function root() {
                    return this._root;
                } },
            referenceNode: { get: function referenceNode() {
                    return this._referenceNode;
                } },
            pointerBeforeReferenceNode: { get: function pointerBeforeReferenceNode() {
                    return this._pointerBeforeReferenceNode;
                } },
            whatToShow: { get: function whatToShow() {
                    return this._whatToShow;
                } },
            filter: { get: function filter() {
                    return this._filter;
                } },
            _internalFilter: { value: function _internalFilter(node) {
                    var result, filter;
                    if (this._active) {
                        utils.InvalidStateError();
                    }
                    if (!(1 << node.nodeType - 1 & this._whatToShow)) {
                        return NodeFilter.FILTER_SKIP;
                    }
                    filter = this._filter;
                    if (filter === null) {
                        result = NodeFilter.FILTER_ACCEPT;
                    }
                    else {
                        this._active = true;
                        try {
                            if (typeof filter === "function") {
                                result = filter(node);
                            }
                            else {
                                result = filter.acceptNode(node);
                            }
                        }
                        finally {
                            this._active = false;
                        }
                    }
                    return +result;
                } },
            _preremove: { value: function _preremove(toBeRemovedNode) {
                    if (isInclusiveAncestor(toBeRemovedNode, this._root)) {
                        return;
                    }
                    if (!isInclusiveAncestor(toBeRemovedNode, this._referenceNode)) {
                        return;
                    }
                    if (this._pointerBeforeReferenceNode) {
                        var next = toBeRemovedNode;
                        while (next.lastChild) {
                            next = next.lastChild;
                        }
                        next = NodeTraversal.next(next, this.root);
                        if (next) {
                            this._referenceNode = next;
                            return;
                        }
                        this._pointerBeforeReferenceNode = false;
                    }
                    if (toBeRemovedNode.previousSibling === null) {
                        this._referenceNode = toBeRemovedNode.parentNode;
                    }
                    else {
                        this._referenceNode = toBeRemovedNode.previousSibling;
                        var lastChild;
                        for (lastChild = this._referenceNode.lastChild; lastChild; lastChild = this._referenceNode.lastChild) {
                            this._referenceNode = lastChild;
                        }
                    }
                } },
            nextNode: { value: function nextNode() {
                    return traverse(this, true);
                } },
            previousNode: { value: function previousNode() {
                    return traverse(this, false);
                } },
            detach: { value: function detach() {
                } },
            toString: { value: function toString() {
                    return "[object NodeIterator]";
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/URL.js
var require_URL = __commonJS({
    "external/npm/node_modules/domino/lib/URL.js"(exports, module) {
        "use strict";
        module.exports = URL;
        function URL(url) {
            if (!url)
                return Object.create(URL.prototype);
            this.url = url.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
            var match = URL.pattern.exec(this.url);
            if (match) {
                if (match[2])
                    this.scheme = match[2];
                if (match[4]) {
                    var userinfo = match[4].match(URL.userinfoPattern);
                    if (userinfo) {
                        this.username = userinfo[1];
                        this.password = userinfo[3];
                        match[4] = match[4].substring(userinfo[0].length);
                    }
                    if (match[4].match(URL.portPattern)) {
                        var pos = match[4].lastIndexOf(":");
                        this.host = match[4].substring(0, pos);
                        this.port = match[4].substring(pos + 1);
                    }
                    else {
                        this.host = match[4];
                    }
                }
                if (match[5])
                    this.path = match[5];
                if (match[6])
                    this.query = match[7];
                if (match[8])
                    this.fragment = match[9];
            }
        }
        URL.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
        URL.userinfoPattern = /^([^@:]*)(:([^@]*))?@/;
        URL.portPattern = /:\d+$/;
        URL.authorityPattern = /^[^:\/?#]+:\/\//;
        URL.hierarchyPattern = /^[^:\/?#]+:\//;
        URL.percentEncode = function percentEncode(s) {
            var c = s.charCodeAt(0);
            if (c < 256)
                return "%" + c.toString(16);
            else
                throw Error("can't percent-encode codepoints > 255 yet");
        };
        URL.prototype = {
            constructor: URL,
            isAbsolute: function () {
                return !!this.scheme;
            },
            isAuthorityBased: function () {
                return URL.authorityPattern.test(this.url);
            },
            isHierarchical: function () {
                return URL.hierarchyPattern.test(this.url);
            },
            toString: function () {
                var s = "";
                if (this.scheme !== void 0)
                    s += this.scheme + ":";
                if (this.isAbsolute()) {
                    s += "//";
                    if (this.username || this.password) {
                        s += this.username || "";
                        if (this.password) {
                            s += ":" + this.password;
                        }
                        s += "@";
                    }
                    if (this.host) {
                        s += this.host;
                    }
                }
                if (this.port !== void 0)
                    s += ":" + this.port;
                if (this.path !== void 0)
                    s += this.path;
                if (this.query !== void 0)
                    s += "?" + this.query;
                if (this.fragment !== void 0)
                    s += "#" + this.fragment;
                return s;
            },
            resolve: function (relative) {
                var base = this;
                var r = new URL(relative);
                var t = new URL();
                if (r.scheme !== void 0) {
                    t.scheme = r.scheme;
                    t.username = r.username;
                    t.password = r.password;
                    t.host = r.host;
                    t.port = r.port;
                    t.path = remove_dot_segments(r.path);
                    t.query = r.query;
                }
                else {
                    t.scheme = base.scheme;
                    if (r.host !== void 0) {
                        t.username = r.username;
                        t.password = r.password;
                        t.host = r.host;
                        t.port = r.port;
                        t.path = remove_dot_segments(r.path);
                        t.query = r.query;
                    }
                    else {
                        t.username = base.username;
                        t.password = base.password;
                        t.host = base.host;
                        t.port = base.port;
                        if (!r.path) {
                            t.path = base.path;
                            if (r.query !== void 0)
                                t.query = r.query;
                            else
                                t.query = base.query;
                        }
                        else {
                            if (r.path.charAt(0) === "/") {
                                t.path = remove_dot_segments(r.path);
                            }
                            else {
                                t.path = merge(base.path, r.path);
                                t.path = remove_dot_segments(t.path);
                            }
                            t.query = r.query;
                        }
                    }
                }
                t.fragment = r.fragment;
                return t.toString();
                function merge(basepath, refpath) {
                    if (base.host !== void 0 && !base.path)
                        return "/" + refpath;
                    var lastslash = basepath.lastIndexOf("/");
                    if (lastslash === -1)
                        return refpath;
                    else
                        return basepath.substring(0, lastslash + 1) + refpath;
                }
                function remove_dot_segments(path) {
                    if (!path)
                        return path;
                    var output = "";
                    while (path.length > 0) {
                        if (path === "." || path === "..") {
                            path = "";
                            break;
                        }
                        var twochars = path.substring(0, 2);
                        var threechars = path.substring(0, 3);
                        var fourchars = path.substring(0, 4);
                        if (threechars === "../") {
                            path = path.substring(3);
                        }
                        else if (twochars === "./") {
                            path = path.substring(2);
                        }
                        else if (threechars === "/./") {
                            path = "/" + path.substring(3);
                        }
                        else if (twochars === "/." && path.length === 2) {
                            path = "/";
                        }
                        else if (fourchars === "/../" || threechars === "/.." && path.length === 3) {
                            path = "/" + path.substring(4);
                            output = output.replace(/\/?[^\/]*$/, "");
                        }
                        else {
                            var segment = path.match(/(\/?([^\/]*))/)[0];
                            output += segment;
                            path = path.substring(segment.length);
                        }
                    }
                    return output;
                }
            }
        };
    }
});
// external/npm/node_modules/domino/lib/CustomEvent.js
var require_CustomEvent = __commonJS({
    "external/npm/node_modules/domino/lib/CustomEvent.js"(exports, module) {
        "use strict";
        module.exports = CustomEvent;
        var Event = require_Event();
        function CustomEvent(type, dictionary) {
            Event.call(this, type, dictionary);
        }
        CustomEvent.prototype = Object.create(Event.prototype, {
            constructor: { value: CustomEvent }
        });
    }
});
// external/npm/node_modules/domino/lib/events.js
var require_events = __commonJS({
    "external/npm/node_modules/domino/lib/events.js"(exports, module) {
        "use strict";
        module.exports = {
            Event: require_Event(),
            UIEvent: require_UIEvent(),
            MouseEvent: require_MouseEvent(),
            CustomEvent: require_CustomEvent()
        };
    }
});
// external/npm/node_modules/domino/lib/cssparser.js
var require_cssparser = __commonJS({
    "external/npm/node_modules/domino/lib/cssparser.js"(exports) {
        "use strict";
        var parserlib = /* @__PURE__ */ Object.create(null);
        (function () {
            function EventTarget() {
                this._listeners = /* @__PURE__ */ Object.create(null);
            }
            EventTarget.prototype = {
                constructor: EventTarget,
                addListener: function (type, listener) {
                    if (!this._listeners[type]) {
                        this._listeners[type] = [];
                    }
                    this._listeners[type].push(listener);
                },
                fire: function (event) {
                    if (typeof event === "string") {
                        event = { type: event };
                    }
                    if (typeof event.target !== "undefined") {
                        event.target = this;
                    }
                    if (typeof event.type === "undefined") {
                        throw new Error("Event object missing 'type' property.");
                    }
                    if (this._listeners[event.type]) {
                        var listeners = this._listeners[event.type].concat();
                        for (var i = 0, len = listeners.length; i < len; i++) {
                            listeners[i].call(this, event);
                        }
                    }
                },
                removeListener: function (type, listener) {
                    if (this._listeners[type]) {
                        var listeners = this._listeners[type];
                        for (var i = 0, len = listeners.length; i < len; i++) {
                            if (listeners[i] === listener) {
                                listeners.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            };
            function StringReader(text) {
                this._input = text.replace(/(\r|\n){1,2}/g, "\n");
                this._line = 1;
                this._col = 1;
                this._cursor = 0;
            }
            StringReader.prototype = {
                constructor: StringReader,
                getCol: function () {
                    return this._col;
                },
                getLine: function () {
                    return this._line;
                },
                eof: function () {
                    return this._cursor === this._input.length;
                },
                peek: function (count) {
                    var c = null;
                    count = typeof count === "undefined" ? 1 : count;
                    if (this._cursor < this._input.length) {
                        c = this._input.charAt(this._cursor + count - 1);
                    }
                    return c;
                },
                read: function () {
                    var c = null;
                    if (this._cursor < this._input.length) {
                        if (this._input.charAt(this._cursor) === "\n") {
                            this._line++;
                            this._col = 1;
                        }
                        else {
                            this._col++;
                        }
                        c = this._input.charAt(this._cursor++);
                    }
                    return c;
                },
                mark: function () {
                    this._bookmark = {
                        cursor: this._cursor,
                        line: this._line,
                        col: this._col
                    };
                },
                reset: function () {
                    if (this._bookmark) {
                        this._cursor = this._bookmark.cursor;
                        this._line = this._bookmark.line;
                        this._col = this._bookmark.col;
                        delete this._bookmark;
                    }
                },
                readTo: function (pattern) {
                    var buffer = "", c;
                    while (buffer.length < pattern.length || buffer.lastIndexOf(pattern) !== buffer.length - pattern.length) {
                        c = this.read();
                        if (c) {
                            buffer += c;
                        }
                        else {
                            throw new Error('Expected "' + pattern + '" at line ' + this._line + ", col " + this._col + ".");
                        }
                    }
                    return buffer;
                },
                readWhile: function (filter) {
                    var buffer = "", c = this.read();
                    while (c !== null && filter(c)) {
                        buffer += c;
                        c = this.read();
                    }
                    return buffer;
                },
                readMatch: function (matcher) {
                    var source = this._input.substring(this._cursor), value = null;
                    if (typeof matcher === "string") {
                        if (source.indexOf(matcher) === 0) {
                            value = this.readCount(matcher.length);
                        }
                    }
                    else if (matcher instanceof RegExp) {
                        if (matcher.test(source)) {
                            value = this.readCount(RegExp.lastMatch.length);
                        }
                    }
                    return value;
                },
                readCount: function (count) {
                    var buffer = "";
                    while (count--) {
                        buffer += this.read();
                    }
                    return buffer;
                }
            };
            function SyntaxError2(message, line, col) {
                Error.call(this);
                this.name = this.constructor.name;
                this.col = col;
                this.line = line;
                this.message = message;
            }
            SyntaxError2.prototype = Object.create(Error.prototype);
            SyntaxError2.prototype.constructor = SyntaxError2;
            function SyntaxUnit(text, line, col, type) {
                this.col = col;
                this.line = line;
                this.text = text;
                this.type = type;
            }
            SyntaxUnit.fromToken = function (token) {
                return new SyntaxUnit(token.value, token.startLine, token.startCol);
            };
            SyntaxUnit.prototype = {
                constructor: SyntaxUnit,
                valueOf: function () {
                    return this.toString();
                },
                toString: function () {
                    return this.text;
                }
            };
            function TokenStreamBase(input, tokenData) {
                this._reader = input ? new StringReader(input.toString()) : null;
                this._token = null;
                this._tokenData = tokenData;
                this._lt = [];
                this._ltIndex = 0;
                this._ltIndexCache = [];
            }
            TokenStreamBase.createTokenData = function (tokens) {
                var nameMap = [], typeMap = /* @__PURE__ */ Object.create(null), tokenData = tokens.concat([]), i = 0, len = tokenData.length + 1;
                tokenData.UNKNOWN = -1;
                tokenData.unshift({ name: "EOF" });
                for (; i < len; i++) {
                    nameMap.push(tokenData[i].name);
                    tokenData[tokenData[i].name] = i;
                    if (tokenData[i].text) {
                        typeMap[tokenData[i].text] = i;
                    }
                }
                tokenData.name = function (tt) {
                    return nameMap[tt];
                };
                tokenData.type = function (c) {
                    return typeMap[c];
                };
                return tokenData;
            };
            TokenStreamBase.prototype = {
                constructor: TokenStreamBase,
                match: function (tokenTypes, channel) {
                    if (!(tokenTypes instanceof Array)) {
                        tokenTypes = [tokenTypes];
                    }
                    var tt = this.get(channel), i = 0, len = tokenTypes.length;
                    while (i < len) {
                        if (tt === tokenTypes[i++]) {
                            return true;
                        }
                    }
                    this.unget();
                    return false;
                },
                mustMatch: function (tokenTypes, channel) {
                    var token;
                    if (!(tokenTypes instanceof Array)) {
                        tokenTypes = [tokenTypes];
                    }
                    if (!this.match.apply(this, arguments)) {
                        token = this.LT(1);
                        throw new SyntaxError2("Expected " + this._tokenData[tokenTypes[0]].name + " at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
                    }
                },
                advance: function (tokenTypes, channel) {
                    while (this.LA(0) !== 0 && !this.match(tokenTypes, channel)) {
                        this.get();
                    }
                    return this.LA(0);
                },
                get: function (channel) {
                    var tokenInfo = this._tokenData, i = 0, token, info;
                    if (this._lt.length && this._ltIndex >= 0 && this._ltIndex < this._lt.length) {
                        i++;
                        this._token = this._lt[this._ltIndex++];
                        info = tokenInfo[this._token.type];
                        while (info.channel !== void 0 && channel !== info.channel && this._ltIndex < this._lt.length) {
                            this._token = this._lt[this._ltIndex++];
                            info = tokenInfo[this._token.type];
                            i++;
                        }
                        if ((info.channel === void 0 || channel === info.channel) && this._ltIndex <= this._lt.length) {
                            this._ltIndexCache.push(i);
                            return this._token.type;
                        }
                    }
                    token = this._getToken();
                    if (token.type > -1 && !tokenInfo[token.type].hide) {
                        token.channel = tokenInfo[token.type].channel;
                        this._token = token;
                        this._lt.push(token);
                        this._ltIndexCache.push(this._lt.length - this._ltIndex + i);
                        if (this._lt.length > 5) {
                            this._lt.shift();
                        }
                        if (this._ltIndexCache.length > 5) {
                            this._ltIndexCache.shift();
                        }
                        this._ltIndex = this._lt.length;
                    }
                    info = tokenInfo[token.type];
                    if (info && (info.hide || info.channel !== void 0 && channel !== info.channel)) {
                        return this.get(channel);
                    }
                    else {
                        return token.type;
                    }
                },
                LA: function (index) {
                    var total = index, tt;
                    if (index > 0) {
                        if (index > 5) {
                            throw new Error("Too much lookahead.");
                        }
                        while (total) {
                            tt = this.get();
                            total--;
                        }
                        while (total < index) {
                            this.unget();
                            total++;
                        }
                    }
                    else if (index < 0) {
                        if (this._lt[this._ltIndex + index]) {
                            tt = this._lt[this._ltIndex + index].type;
                        }
                        else {
                            throw new Error("Too much lookbehind.");
                        }
                    }
                    else {
                        tt = this._token.type;
                    }
                    return tt;
                },
                LT: function (index) {
                    this.LA(index);
                    return this._lt[this._ltIndex + index - 1];
                },
                peek: function () {
                    return this.LA(1);
                },
                token: function () {
                    return this._token;
                },
                tokenName: function (tokenType) {
                    if (tokenType < 0 || tokenType > this._tokenData.length) {
                        return "UNKNOWN_TOKEN";
                    }
                    else {
                        return this._tokenData[tokenType].name;
                    }
                },
                tokenType: function (tokenName) {
                    return this._tokenData[tokenName] || -1;
                },
                unget: function () {
                    if (this._ltIndexCache.length) {
                        this._ltIndex -= this._ltIndexCache.pop();
                        this._token = this._lt[this._ltIndex - 1];
                    }
                    else {
                        throw new Error("Too much lookahead.");
                    }
                }
            };
            parserlib.util = {
                __proto__: null,
                StringReader,
                SyntaxError: SyntaxError2,
                SyntaxUnit,
                EventTarget,
                TokenStreamBase
            };
        })();
        (function () {
            var EventTarget = parserlib.util.EventTarget, TokenStreamBase = parserlib.util.TokenStreamBase, StringReader = parserlib.util.StringReader, SyntaxError2 = parserlib.util.SyntaxError, SyntaxUnit = parserlib.util.SyntaxUnit;
            var Colors = {
                __proto__: null,
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32",
                currentColor: "The value of the 'color' property.",
                activeBorder: "Active window border.",
                activecaption: "Active window caption.",
                appworkspace: "Background color of multiple document interface.",
                background: "Desktop background.",
                buttonface: "The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.",
                buttonhighlight: "The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
                buttonshadow: "The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
                buttontext: "Text on push buttons.",
                captiontext: "Text in caption, size box, and scrollbar arrow box.",
                graytext: "Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.",
                greytext: "Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color.",
                highlight: "Item(s) selected in a control.",
                highlighttext: "Text of item(s) selected in a control.",
                inactiveborder: "Inactive window border.",
                inactivecaption: "Inactive window caption.",
                inactivecaptiontext: "Color of text in an inactive caption.",
                infobackground: "Background color for tooltip controls.",
                infotext: "Text color for tooltip controls.",
                menu: "Menu background.",
                menutext: "Text in menus.",
                scrollbar: "Scroll bar gray area.",
                threeddarkshadow: "The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
                threedface: "The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
                threedhighlight: "The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
                threedlightshadow: "The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
                threedshadow: "The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
                window: "Window background.",
                windowframe: "Window frame.",
                windowtext: "Text in windows."
            };
            function Combinator(text, line, col) {
                SyntaxUnit.call(this, text, line, col, Parser.COMBINATOR_TYPE);
                this.type = "unknown";
                if (/^\s+$/.test(text)) {
                    this.type = "descendant";
                }
                else if (text === ">") {
                    this.type = "child";
                }
                else if (text === "+") {
                    this.type = "adjacent-sibling";
                }
                else if (text === "~") {
                    this.type = "sibling";
                }
            }
            Combinator.prototype = new SyntaxUnit();
            Combinator.prototype.constructor = Combinator;
            function MediaFeature(name, value) {
                SyntaxUnit.call(this, "(" + name + (value !== null ? ":" + value : "") + ")", name.startLine, name.startCol, Parser.MEDIA_FEATURE_TYPE);
                this.name = name;
                this.value = value;
            }
            MediaFeature.prototype = new SyntaxUnit();
            MediaFeature.prototype.constructor = MediaFeature;
            function MediaQuery(modifier, mediaType, features, line, col) {
                SyntaxUnit.call(this, (modifier ? modifier + " " : "") + (mediaType ? mediaType : "") + (mediaType && features.length > 0 ? " and " : "") + features.join(" and "), line, col, Parser.MEDIA_QUERY_TYPE);
                this.modifier = modifier;
                this.mediaType = mediaType;
                this.features = features;
            }
            MediaQuery.prototype = new SyntaxUnit();
            MediaQuery.prototype.constructor = MediaQuery;
            function Parser(options) {
                EventTarget.call(this);
                this.options = options || {};
                this._tokenStream = null;
            }
            Parser.DEFAULT_TYPE = 0;
            Parser.COMBINATOR_TYPE = 1;
            Parser.MEDIA_FEATURE_TYPE = 2;
            Parser.MEDIA_QUERY_TYPE = 3;
            Parser.PROPERTY_NAME_TYPE = 4;
            Parser.PROPERTY_VALUE_TYPE = 5;
            Parser.PROPERTY_VALUE_PART_TYPE = 6;
            Parser.SELECTOR_TYPE = 7;
            Parser.SELECTOR_PART_TYPE = 8;
            Parser.SELECTOR_SUB_PART_TYPE = 9;
            Parser.prototype = function () {
                var proto = new EventTarget(), prop, additions = {
                    __proto__: null,
                    constructor: Parser,
                    DEFAULT_TYPE: 0,
                    COMBINATOR_TYPE: 1,
                    MEDIA_FEATURE_TYPE: 2,
                    MEDIA_QUERY_TYPE: 3,
                    PROPERTY_NAME_TYPE: 4,
                    PROPERTY_VALUE_TYPE: 5,
                    PROPERTY_VALUE_PART_TYPE: 6,
                    SELECTOR_TYPE: 7,
                    SELECTOR_PART_TYPE: 8,
                    SELECTOR_SUB_PART_TYPE: 9,
                    _stylesheet: function () {
                        var tokenStream = this._tokenStream, count, token, tt;
                        this.fire("startstylesheet");
                        this._charset();
                        this._skipCruft();
                        while (tokenStream.peek() === Tokens.IMPORT_SYM) {
                            this._import();
                            this._skipCruft();
                        }
                        while (tokenStream.peek() === Tokens.NAMESPACE_SYM) {
                            this._namespace();
                            this._skipCruft();
                        }
                        tt = tokenStream.peek();
                        while (tt > Tokens.EOF) {
                            try {
                                switch (tt) {
                                    case Tokens.MEDIA_SYM:
                                        this._media();
                                        this._skipCruft();
                                        break;
                                    case Tokens.PAGE_SYM:
                                        this._page();
                                        this._skipCruft();
                                        break;
                                    case Tokens.FONT_FACE_SYM:
                                        this._font_face();
                                        this._skipCruft();
                                        break;
                                    case Tokens.KEYFRAMES_SYM:
                                        this._keyframes();
                                        this._skipCruft();
                                        break;
                                    case Tokens.VIEWPORT_SYM:
                                        this._viewport();
                                        this._skipCruft();
                                        break;
                                    case Tokens.DOCUMENT_SYM:
                                        this._document();
                                        this._skipCruft();
                                        break;
                                    case Tokens.UNKNOWN_SYM:
                                        tokenStream.get();
                                        if (!this.options.strict) {
                                            this.fire({
                                                type: "error",
                                                error: null,
                                                message: "Unknown @ rule: " + tokenStream.LT(0).value + ".",
                                                line: tokenStream.LT(0).startLine,
                                                col: tokenStream.LT(0).startCol
                                            });
                                            count = 0;
                                            while (tokenStream.advance([Tokens.LBRACE, Tokens.RBRACE]) === Tokens.LBRACE) {
                                                count++;
                                            }
                                            while (count) {
                                                tokenStream.advance([Tokens.RBRACE]);
                                                count--;
                                            }
                                        }
                                        else {
                                            throw new SyntaxError2("Unknown @ rule.", tokenStream.LT(0).startLine, tokenStream.LT(0).startCol);
                                        }
                                        break;
                                    case Tokens.S:
                                        this._readWhitespace();
                                        break;
                                    default:
                                        if (!this._ruleset()) {
                                            switch (tt) {
                                                case Tokens.CHARSET_SYM:
                                                    token = tokenStream.LT(1);
                                                    this._charset(false);
                                                    throw new SyntaxError2("@charset not allowed here.", token.startLine, token.startCol);
                                                case Tokens.IMPORT_SYM:
                                                    token = tokenStream.LT(1);
                                                    this._import(false);
                                                    throw new SyntaxError2("@import not allowed here.", token.startLine, token.startCol);
                                                case Tokens.NAMESPACE_SYM:
                                                    token = tokenStream.LT(1);
                                                    this._namespace(false);
                                                    throw new SyntaxError2("@namespace not allowed here.", token.startLine, token.startCol);
                                                default:
                                                    tokenStream.get();
                                                    this._unexpectedToken(tokenStream.token());
                                            }
                                        }
                                }
                            }
                            catch (ex) {
                                if (ex instanceof SyntaxError2 && !this.options.strict) {
                                    this.fire({
                                        type: "error",
                                        error: ex,
                                        message: ex.message,
                                        line: ex.line,
                                        col: ex.col
                                    });
                                }
                                else {
                                    throw ex;
                                }
                            }
                            tt = tokenStream.peek();
                        }
                        if (tt !== Tokens.EOF) {
                            this._unexpectedToken(tokenStream.token());
                        }
                        this.fire("endstylesheet");
                    },
                    _charset: function (emit) {
                        var tokenStream = this._tokenStream, charset, token, line, col;
                        if (tokenStream.match(Tokens.CHARSET_SYM)) {
                            line = tokenStream.token().startLine;
                            col = tokenStream.token().startCol;
                            this._readWhitespace();
                            tokenStream.mustMatch(Tokens.STRING);
                            token = tokenStream.token();
                            charset = token.value;
                            this._readWhitespace();
                            tokenStream.mustMatch(Tokens.SEMICOLON);
                            if (emit !== false) {
                                this.fire({
                                    type: "charset",
                                    charset,
                                    line,
                                    col
                                });
                            }
                        }
                    },
                    _import: function (emit) {
                        var tokenStream = this._tokenStream, uri, importToken, mediaList = [];
                        tokenStream.mustMatch(Tokens.IMPORT_SYM);
                        importToken = tokenStream.token();
                        this._readWhitespace();
                        tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
                        uri = tokenStream.token().value.replace(/^(?:url\()?["']?([^"']+?)["']?\)?$/, "$1");
                        this._readWhitespace();
                        mediaList = this._media_query_list();
                        tokenStream.mustMatch(Tokens.SEMICOLON);
                        this._readWhitespace();
                        if (emit !== false) {
                            this.fire({
                                type: "import",
                                uri,
                                media: mediaList,
                                line: importToken.startLine,
                                col: importToken.startCol
                            });
                        }
                    },
                    _namespace: function (emit) {
                        var tokenStream = this._tokenStream, line, col, prefix, uri;
                        tokenStream.mustMatch(Tokens.NAMESPACE_SYM);
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        this._readWhitespace();
                        if (tokenStream.match(Tokens.IDENT)) {
                            prefix = tokenStream.token().value;
                            this._readWhitespace();
                        }
                        tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
                        uri = tokenStream.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1");
                        this._readWhitespace();
                        tokenStream.mustMatch(Tokens.SEMICOLON);
                        this._readWhitespace();
                        if (emit !== false) {
                            this.fire({
                                type: "namespace",
                                prefix,
                                uri,
                                line,
                                col
                            });
                        }
                    },
                    _media: function () {
                        var tokenStream = this._tokenStream, line, col, mediaList;
                        tokenStream.mustMatch(Tokens.MEDIA_SYM);
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        this._readWhitespace();
                        mediaList = this._media_query_list();
                        tokenStream.mustMatch(Tokens.LBRACE);
                        this._readWhitespace();
                        this.fire({
                            type: "startmedia",
                            media: mediaList,
                            line,
                            col
                        });
                        while (true) {
                            if (tokenStream.peek() === Tokens.PAGE_SYM) {
                                this._page();
                            }
                            else if (tokenStream.peek() === Tokens.FONT_FACE_SYM) {
                                this._font_face();
                            }
                            else if (tokenStream.peek() === Tokens.VIEWPORT_SYM) {
                                this._viewport();
                            }
                            else if (tokenStream.peek() === Tokens.DOCUMENT_SYM) {
                                this._document();
                            }
                            else if (!this._ruleset()) {
                                break;
                            }
                        }
                        tokenStream.mustMatch(Tokens.RBRACE);
                        this._readWhitespace();
                        this.fire({
                            type: "endmedia",
                            media: mediaList,
                            line,
                            col
                        });
                    },
                    _media_query_list: function () {
                        var tokenStream = this._tokenStream, mediaList = [];
                        this._readWhitespace();
                        if (tokenStream.peek() === Tokens.IDENT || tokenStream.peek() === Tokens.LPAREN) {
                            mediaList.push(this._media_query());
                        }
                        while (tokenStream.match(Tokens.COMMA)) {
                            this._readWhitespace();
                            mediaList.push(this._media_query());
                        }
                        return mediaList;
                    },
                    _media_query: function () {
                        var tokenStream = this._tokenStream, type = null, ident = null, token = null, expressions = [];
                        if (tokenStream.match(Tokens.IDENT)) {
                            ident = tokenStream.token().value.toLowerCase();
                            if (ident !== "only" && ident !== "not") {
                                tokenStream.unget();
                                ident = null;
                            }
                            else {
                                token = tokenStream.token();
                            }
                        }
                        this._readWhitespace();
                        if (tokenStream.peek() === Tokens.IDENT) {
                            type = this._media_type();
                            if (token === null) {
                                token = tokenStream.token();
                            }
                        }
                        else if (tokenStream.peek() === Tokens.LPAREN) {
                            if (token === null) {
                                token = tokenStream.LT(1);
                            }
                            expressions.push(this._media_expression());
                        }
                        if (type === null && expressions.length === 0) {
                            return null;
                        }
                        else {
                            this._readWhitespace();
                            while (tokenStream.match(Tokens.IDENT)) {
                                if (tokenStream.token().value.toLowerCase() !== "and") {
                                    this._unexpectedToken(tokenStream.token());
                                }
                                this._readWhitespace();
                                expressions.push(this._media_expression());
                            }
                        }
                        return new MediaQuery(ident, type, expressions, token.startLine, token.startCol);
                    },
                    _media_type: function () {
                        return this._media_feature();
                    },
                    _media_expression: function () {
                        var tokenStream = this._tokenStream, feature = null, token, expression = null;
                        tokenStream.mustMatch(Tokens.LPAREN);
                        feature = this._media_feature();
                        this._readWhitespace();
                        if (tokenStream.match(Tokens.COLON)) {
                            this._readWhitespace();
                            token = tokenStream.LT(1);
                            expression = this._expression();
                        }
                        tokenStream.mustMatch(Tokens.RPAREN);
                        this._readWhitespace();
                        return new MediaFeature(feature, expression ? new SyntaxUnit(expression, token.startLine, token.startCol) : null);
                    },
                    _media_feature: function () {
                        var tokenStream = this._tokenStream;
                        this._readWhitespace();
                        tokenStream.mustMatch(Tokens.IDENT);
                        return SyntaxUnit.fromToken(tokenStream.token());
                    },
                    _page: function () {
                        var tokenStream = this._tokenStream, line, col, identifier = null, pseudoPage = null;
                        tokenStream.mustMatch(Tokens.PAGE_SYM);
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        this._readWhitespace();
                        if (tokenStream.match(Tokens.IDENT)) {
                            identifier = tokenStream.token().value;
                            if (identifier.toLowerCase() === "auto") {
                                this._unexpectedToken(tokenStream.token());
                            }
                        }
                        if (tokenStream.peek() === Tokens.COLON) {
                            pseudoPage = this._pseudo_page();
                        }
                        this._readWhitespace();
                        this.fire({
                            type: "startpage",
                            id: identifier,
                            pseudo: pseudoPage,
                            line,
                            col
                        });
                        this._readDeclarations(true, true);
                        this.fire({
                            type: "endpage",
                            id: identifier,
                            pseudo: pseudoPage,
                            line,
                            col
                        });
                    },
                    _margin: function () {
                        var tokenStream = this._tokenStream, line, col, marginSym = this._margin_sym();
                        if (marginSym) {
                            line = tokenStream.token().startLine;
                            col = tokenStream.token().startCol;
                            this.fire({
                                type: "startpagemargin",
                                margin: marginSym,
                                line,
                                col
                            });
                            this._readDeclarations(true);
                            this.fire({
                                type: "endpagemargin",
                                margin: marginSym,
                                line,
                                col
                            });
                            return true;
                        }
                        else {
                            return false;
                        }
                    },
                    _margin_sym: function () {
                        var tokenStream = this._tokenStream;
                        if (tokenStream.match([
                            Tokens.TOPLEFTCORNER_SYM,
                            Tokens.TOPLEFT_SYM,
                            Tokens.TOPCENTER_SYM,
                            Tokens.TOPRIGHT_SYM,
                            Tokens.TOPRIGHTCORNER_SYM,
                            Tokens.BOTTOMLEFTCORNER_SYM,
                            Tokens.BOTTOMLEFT_SYM,
                            Tokens.BOTTOMCENTER_SYM,
                            Tokens.BOTTOMRIGHT_SYM,
                            Tokens.BOTTOMRIGHTCORNER_SYM,
                            Tokens.LEFTTOP_SYM,
                            Tokens.LEFTMIDDLE_SYM,
                            Tokens.LEFTBOTTOM_SYM,
                            Tokens.RIGHTTOP_SYM,
                            Tokens.RIGHTMIDDLE_SYM,
                            Tokens.RIGHTBOTTOM_SYM
                        ])) {
                            return SyntaxUnit.fromToken(tokenStream.token());
                        }
                        else {
                            return null;
                        }
                    },
                    _pseudo_page: function () {
                        var tokenStream = this._tokenStream;
                        tokenStream.mustMatch(Tokens.COLON);
                        tokenStream.mustMatch(Tokens.IDENT);
                        return tokenStream.token().value;
                    },
                    _font_face: function () {
                        var tokenStream = this._tokenStream, line, col;
                        tokenStream.mustMatch(Tokens.FONT_FACE_SYM);
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        this._readWhitespace();
                        this.fire({
                            type: "startfontface",
                            line,
                            col
                        });
                        this._readDeclarations(true);
                        this.fire({
                            type: "endfontface",
                            line,
                            col
                        });
                    },
                    _viewport: function () {
                        var tokenStream = this._tokenStream, line, col;
                        tokenStream.mustMatch(Tokens.VIEWPORT_SYM);
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        this._readWhitespace();
                        this.fire({
                            type: "startviewport",
                            line,
                            col
                        });
                        this._readDeclarations(true);
                        this.fire({
                            type: "endviewport",
                            line,
                            col
                        });
                    },
                    _document: function () {
                        var tokenStream = this._tokenStream, token, functions = [], prefix = "";
                        tokenStream.mustMatch(Tokens.DOCUMENT_SYM);
                        token = tokenStream.token();
                        if (/^@\-([^\-]+)\-/.test(token.value)) {
                            prefix = RegExp.$1;
                        }
                        this._readWhitespace();
                        functions.push(this._document_function());
                        while (tokenStream.match(Tokens.COMMA)) {
                            this._readWhitespace();
                            functions.push(this._document_function());
                        }
                        tokenStream.mustMatch(Tokens.LBRACE);
                        this._readWhitespace();
                        this.fire({
                            type: "startdocument",
                            functions,
                            prefix,
                            line: token.startLine,
                            col: token.startCol
                        });
                        while (true) {
                            if (tokenStream.peek() === Tokens.PAGE_SYM) {
                                this._page();
                            }
                            else if (tokenStream.peek() === Tokens.FONT_FACE_SYM) {
                                this._font_face();
                            }
                            else if (tokenStream.peek() === Tokens.VIEWPORT_SYM) {
                                this._viewport();
                            }
                            else if (tokenStream.peek() === Tokens.MEDIA_SYM) {
                                this._media();
                            }
                            else if (!this._ruleset()) {
                                break;
                            }
                        }
                        tokenStream.mustMatch(Tokens.RBRACE);
                        this._readWhitespace();
                        this.fire({
                            type: "enddocument",
                            functions,
                            prefix,
                            line: token.startLine,
                            col: token.startCol
                        });
                    },
                    _document_function: function () {
                        var tokenStream = this._tokenStream, value;
                        if (tokenStream.match(Tokens.URI)) {
                            value = tokenStream.token().value;
                            this._readWhitespace();
                        }
                        else {
                            value = this._function();
                        }
                        return value;
                    },
                    _operator: function (inFunction) {
                        var tokenStream = this._tokenStream, token = null;
                        if (tokenStream.match([Tokens.SLASH, Tokens.COMMA]) || inFunction && tokenStream.match([Tokens.PLUS, Tokens.STAR, Tokens.MINUS])) {
                            token = tokenStream.token();
                            this._readWhitespace();
                        }
                        return token ? PropertyValuePart.fromToken(token) : null;
                    },
                    _combinator: function () {
                        var tokenStream = this._tokenStream, value = null, token;
                        if (tokenStream.match([Tokens.PLUS, Tokens.GREATER, Tokens.TILDE])) {
                            token = tokenStream.token();
                            value = new Combinator(token.value, token.startLine, token.startCol);
                            this._readWhitespace();
                        }
                        return value;
                    },
                    _unary_operator: function () {
                        var tokenStream = this._tokenStream;
                        if (tokenStream.match([Tokens.MINUS, Tokens.PLUS])) {
                            return tokenStream.token().value;
                        }
                        else {
                            return null;
                        }
                    },
                    _property: function () {
                        var tokenStream = this._tokenStream, value = null, hack = null, tokenValue, token, line, col;
                        if (tokenStream.peek() === Tokens.STAR && this.options.starHack) {
                            tokenStream.get();
                            token = tokenStream.token();
                            hack = token.value;
                            line = token.startLine;
                            col = token.startCol;
                        }
                        if (tokenStream.match(Tokens.IDENT)) {
                            token = tokenStream.token();
                            tokenValue = token.value;
                            if (tokenValue.charAt(0) === "_" && this.options.underscoreHack) {
                                hack = "_";
                                tokenValue = tokenValue.substring(1);
                            }
                            value = new PropertyName(tokenValue, hack, line || token.startLine, col || token.startCol);
                            this._readWhitespace();
                        }
                        return value;
                    },
                    _ruleset: function () {
                        var tokenStream = this._tokenStream, tt, selectors;
                        try {
                            selectors = this._selectors_group();
                        }
                        catch (ex) {
                            if (ex instanceof SyntaxError2 && !this.options.strict) {
                                this.fire({
                                    type: "error",
                                    error: ex,
                                    message: ex.message,
                                    line: ex.line,
                                    col: ex.col
                                });
                                tt = tokenStream.advance([Tokens.RBRACE]);
                                if (tt === Tokens.RBRACE) {
                                }
                                else {
                                    throw ex;
                                }
                            }
                            else {
                                throw ex;
                            }
                            return true;
                        }
                        if (selectors) {
                            this.fire({
                                type: "startrule",
                                selectors,
                                line: selectors[0].line,
                                col: selectors[0].col
                            });
                            this._readDeclarations(true);
                            this.fire({
                                type: "endrule",
                                selectors,
                                line: selectors[0].line,
                                col: selectors[0].col
                            });
                        }
                        return selectors;
                    },
                    _selectors_group: function () {
                        var tokenStream = this._tokenStream, selectors = [], selector;
                        selector = this._selector();
                        if (selector !== null) {
                            selectors.push(selector);
                            while (tokenStream.match(Tokens.COMMA)) {
                                this._readWhitespace();
                                selector = this._selector();
                                if (selector !== null) {
                                    selectors.push(selector);
                                }
                                else {
                                    this._unexpectedToken(tokenStream.LT(1));
                                }
                            }
                        }
                        return selectors.length ? selectors : null;
                    },
                    _selector: function () {
                        var tokenStream = this._tokenStream, selector = [], nextSelector = null, combinator = null, ws = null;
                        nextSelector = this._simple_selector_sequence();
                        if (nextSelector === null) {
                            return null;
                        }
                        selector.push(nextSelector);
                        do {
                            combinator = this._combinator();
                            if (combinator !== null) {
                                selector.push(combinator);
                                nextSelector = this._simple_selector_sequence();
                                if (nextSelector === null) {
                                    this._unexpectedToken(tokenStream.LT(1));
                                }
                                else {
                                    selector.push(nextSelector);
                                }
                            }
                            else {
                                if (this._readWhitespace()) {
                                    ws = new Combinator(tokenStream.token().value, tokenStream.token().startLine, tokenStream.token().startCol);
                                    combinator = this._combinator();
                                    nextSelector = this._simple_selector_sequence();
                                    if (nextSelector === null) {
                                        if (combinator !== null) {
                                            this._unexpectedToken(tokenStream.LT(1));
                                        }
                                    }
                                    else {
                                        if (combinator !== null) {
                                            selector.push(combinator);
                                        }
                                        else {
                                            selector.push(ws);
                                        }
                                        selector.push(nextSelector);
                                    }
                                }
                                else {
                                    break;
                                }
                            }
                        } while (true);
                        return new Selector(selector, selector[0].line, selector[0].col);
                    },
                    _simple_selector_sequence: function () {
                        var tokenStream = this._tokenStream, elementName = null, modifiers = [], selectorText = "", components = [
                            function () {
                                return tokenStream.match(Tokens.HASH) ? new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) : null;
                            },
                            this._class,
                            this._attrib,
                            this._pseudo,
                            this._negation
                        ], i = 0, len = components.length, component = null, line, col;
                        line = tokenStream.LT(1).startLine;
                        col = tokenStream.LT(1).startCol;
                        elementName = this._type_selector();
                        if (!elementName) {
                            elementName = this._universal();
                        }
                        if (elementName !== null) {
                            selectorText += elementName;
                        }
                        while (true) {
                            if (tokenStream.peek() === Tokens.S) {
                                break;
                            }
                            while (i < len && component === null) {
                                component = components[i++].call(this);
                            }
                            if (component === null) {
                                if (selectorText === "") {
                                    return null;
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                i = 0;
                                modifiers.push(component);
                                selectorText += component.toString();
                                component = null;
                            }
                        }
                        return selectorText !== "" ? new SelectorPart(elementName, modifiers, selectorText, line, col) : null;
                    },
                    _type_selector: function () {
                        var tokenStream = this._tokenStream, ns = this._namespace_prefix(), elementName = this._element_name();
                        if (!elementName) {
                            if (ns) {
                                tokenStream.unget();
                                if (ns.length > 1) {
                                    tokenStream.unget();
                                }
                            }
                            return null;
                        }
                        else {
                            if (ns) {
                                elementName.text = ns + elementName.text;
                                elementName.col -= ns.length;
                            }
                            return elementName;
                        }
                    },
                    _class: function () {
                        var tokenStream = this._tokenStream, token;
                        if (tokenStream.match(Tokens.DOT)) {
                            tokenStream.mustMatch(Tokens.IDENT);
                            token = tokenStream.token();
                            return new SelectorSubPart("." + token.value, "class", token.startLine, token.startCol - 1);
                        }
                        else {
                            return null;
                        }
                    },
                    _element_name: function () {
                        var tokenStream = this._tokenStream, token;
                        if (tokenStream.match(Tokens.IDENT)) {
                            token = tokenStream.token();
                            return new SelectorSubPart(token.value, "elementName", token.startLine, token.startCol);
                        }
                        else {
                            return null;
                        }
                    },
                    _namespace_prefix: function () {
                        var tokenStream = this._tokenStream, value = "";
                        if (tokenStream.LA(1) === Tokens.PIPE || tokenStream.LA(2) === Tokens.PIPE) {
                            if (tokenStream.match([Tokens.IDENT, Tokens.STAR])) {
                                value += tokenStream.token().value;
                            }
                            tokenStream.mustMatch(Tokens.PIPE);
                            value += "|";
                        }
                        return value.length ? value : null;
                    },
                    _universal: function () {
                        var tokenStream = this._tokenStream, value = "", ns;
                        ns = this._namespace_prefix();
                        if (ns) {
                            value += ns;
                        }
                        if (tokenStream.match(Tokens.STAR)) {
                            value += "*";
                        }
                        return value.length ? value : null;
                    },
                    _attrib: function () {
                        var tokenStream = this._tokenStream, value = null, ns, token;
                        if (tokenStream.match(Tokens.LBRACKET)) {
                            token = tokenStream.token();
                            value = token.value;
                            value += this._readWhitespace();
                            ns = this._namespace_prefix();
                            if (ns) {
                                value += ns;
                            }
                            tokenStream.mustMatch(Tokens.IDENT);
                            value += tokenStream.token().value;
                            value += this._readWhitespace();
                            if (tokenStream.match([
                                Tokens.PREFIXMATCH,
                                Tokens.SUFFIXMATCH,
                                Tokens.SUBSTRINGMATCH,
                                Tokens.EQUALS,
                                Tokens.INCLUDES,
                                Tokens.DASHMATCH
                            ])) {
                                value += tokenStream.token().value;
                                value += this._readWhitespace();
                                tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                                value += tokenStream.token().value;
                                value += this._readWhitespace();
                            }
                            tokenStream.mustMatch(Tokens.RBRACKET);
                            return new SelectorSubPart(value + "]", "attribute", token.startLine, token.startCol);
                        }
                        else {
                            return null;
                        }
                    },
                    _pseudo: function () {
                        var tokenStream = this._tokenStream, pseudo = null, colons = ":", line, col;
                        if (tokenStream.match(Tokens.COLON)) {
                            if (tokenStream.match(Tokens.COLON)) {
                                colons += ":";
                            }
                            if (tokenStream.match(Tokens.IDENT)) {
                                pseudo = tokenStream.token().value;
                                line = tokenStream.token().startLine;
                                col = tokenStream.token().startCol - colons.length;
                            }
                            else if (tokenStream.peek() === Tokens.FUNCTION) {
                                line = tokenStream.LT(1).startLine;
                                col = tokenStream.LT(1).startCol - colons.length;
                                pseudo = this._functional_pseudo();
                            }
                            if (pseudo) {
                                pseudo = new SelectorSubPart(colons + pseudo, "pseudo", line, col);
                            }
                        }
                        return pseudo;
                    },
                    _functional_pseudo: function () {
                        var tokenStream = this._tokenStream, value = null;
                        if (tokenStream.match(Tokens.FUNCTION)) {
                            value = tokenStream.token().value;
                            value += this._readWhitespace();
                            value += this._expression();
                            tokenStream.mustMatch(Tokens.RPAREN);
                            value += ")";
                        }
                        return value;
                    },
                    _expression: function () {
                        var tokenStream = this._tokenStream, value = "";
                        while (tokenStream.match([
                            Tokens.PLUS,
                            Tokens.MINUS,
                            Tokens.DIMENSION,
                            Tokens.NUMBER,
                            Tokens.STRING,
                            Tokens.IDENT,
                            Tokens.LENGTH,
                            Tokens.FREQ,
                            Tokens.ANGLE,
                            Tokens.TIME,
                            Tokens.RESOLUTION,
                            Tokens.SLASH
                        ])) {
                            value += tokenStream.token().value;
                            value += this._readWhitespace();
                        }
                        return value.length ? value : null;
                    },
                    _negation: function () {
                        var tokenStream = this._tokenStream, line, col, value = "", arg, subpart = null;
                        if (tokenStream.match(Tokens.NOT)) {
                            value = tokenStream.token().value;
                            line = tokenStream.token().startLine;
                            col = tokenStream.token().startCol;
                            value += this._readWhitespace();
                            arg = this._negation_arg();
                            value += arg;
                            value += this._readWhitespace();
                            tokenStream.match(Tokens.RPAREN);
                            value += tokenStream.token().value;
                            subpart = new SelectorSubPart(value, "not", line, col);
                            subpart.args.push(arg);
                        }
                        return subpart;
                    },
                    _negation_arg: function () {
                        var tokenStream = this._tokenStream, args = [
                            this._type_selector,
                            this._universal,
                            function () {
                                return tokenStream.match(Tokens.HASH) ? new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) : null;
                            },
                            this._class,
                            this._attrib,
                            this._pseudo
                        ], arg = null, i = 0, len = args.length, line, col, part;
                        line = tokenStream.LT(1).startLine;
                        col = tokenStream.LT(1).startCol;
                        while (i < len && arg === null) {
                            arg = args[i].call(this);
                            i++;
                        }
                        if (arg === null) {
                            this._unexpectedToken(tokenStream.LT(1));
                        }
                        if (arg.type === "elementName") {
                            part = new SelectorPart(arg, [], arg.toString(), line, col);
                        }
                        else {
                            part = new SelectorPart(null, [arg], arg.toString(), line, col);
                        }
                        return part;
                    },
                    _declaration: function () {
                        var tokenStream = this._tokenStream, property = null, expr = null, prio = null, invalid = null, propertyName = "";
                        property = this._property();
                        if (property !== null) {
                            tokenStream.mustMatch(Tokens.COLON);
                            this._readWhitespace();
                            expr = this._expr();
                            if (!expr || expr.length === 0) {
                                this._unexpectedToken(tokenStream.LT(1));
                            }
                            prio = this._prio();
                            propertyName = property.toString();
                            if (this.options.starHack && property.hack === "*" || this.options.underscoreHack && property.hack === "_") {
                                propertyName = property.text;
                            }
                            try {
                                this._validateProperty(propertyName, expr);
                            }
                            catch (ex) {
                                invalid = ex;
                            }
                            this.fire({
                                type: "property",
                                property,
                                value: expr,
                                important: prio,
                                line: property.line,
                                col: property.col,
                                invalid
                            });
                            return true;
                        }
                        else {
                            return false;
                        }
                    },
                    _prio: function () {
                        var tokenStream = this._tokenStream, result = tokenStream.match(Tokens.IMPORTANT_SYM);
                        this._readWhitespace();
                        return result;
                    },
                    _expr: function (inFunction) {
                        var values = [], value = null, operator = null;
                        value = this._term(inFunction);
                        if (value !== null) {
                            values.push(value);
                            do {
                                operator = this._operator(inFunction);
                                if (operator) {
                                    values.push(operator);
                                }
                                value = this._term(inFunction);
                                if (value === null) {
                                    break;
                                }
                                else {
                                    values.push(value);
                                }
                            } while (true);
                        }
                        return values.length > 0 ? new PropertyValue(values, values[0].line, values[0].col) : null;
                    },
                    _term: function (inFunction) {
                        var tokenStream = this._tokenStream, unary = null, value = null, endChar = null, token, line, col;
                        unary = this._unary_operator();
                        if (unary !== null) {
                            line = tokenStream.token().startLine;
                            col = tokenStream.token().startCol;
                        }
                        if (tokenStream.peek() === Tokens.IE_FUNCTION && this.options.ieFilters) {
                            value = this._ie_function();
                            if (unary === null) {
                                line = tokenStream.token().startLine;
                                col = tokenStream.token().startCol;
                            }
                        }
                        else if (inFunction && tokenStream.match([Tokens.LPAREN, Tokens.LBRACE, Tokens.LBRACKET])) {
                            token = tokenStream.token();
                            endChar = token.endChar;
                            value = token.value + this._expr(inFunction).text;
                            if (unary === null) {
                                line = tokenStream.token().startLine;
                                col = tokenStream.token().startCol;
                            }
                            tokenStream.mustMatch(Tokens.type(endChar));
                            value += endChar;
                            this._readWhitespace();
                        }
                        else if (tokenStream.match([
                            Tokens.NUMBER,
                            Tokens.PERCENTAGE,
                            Tokens.LENGTH,
                            Tokens.ANGLE,
                            Tokens.TIME,
                            Tokens.FREQ,
                            Tokens.STRING,
                            Tokens.IDENT,
                            Tokens.URI,
                            Tokens.UNICODE_RANGE
                        ])) {
                            value = tokenStream.token().value;
                            if (unary === null) {
                                line = tokenStream.token().startLine;
                                col = tokenStream.token().startCol;
                            }
                            this._readWhitespace();
                        }
                        else {
                            token = this._hexcolor();
                            if (token === null) {
                                if (unary === null) {
                                    line = tokenStream.LT(1).startLine;
                                    col = tokenStream.LT(1).startCol;
                                }
                                if (value === null) {
                                    if (tokenStream.LA(3) === Tokens.EQUALS && this.options.ieFilters) {
                                        value = this._ie_function();
                                    }
                                    else {
                                        value = this._function();
                                    }
                                }
                            }
                            else {
                                value = token.value;
                                if (unary === null) {
                                    line = token.startLine;
                                    col = token.startCol;
                                }
                            }
                        }
                        return value !== null ? new PropertyValuePart(unary !== null ? unary + value : value, line, col) : null;
                    },
                    _function: function () {
                        var tokenStream = this._tokenStream, functionText = null, expr = null, lt;
                        if (tokenStream.match(Tokens.FUNCTION)) {
                            functionText = tokenStream.token().value;
                            this._readWhitespace();
                            expr = this._expr(true);
                            functionText += expr;
                            if (this.options.ieFilters && tokenStream.peek() === Tokens.EQUALS) {
                                do {
                                    if (this._readWhitespace()) {
                                        functionText += tokenStream.token().value;
                                    }
                                    if (tokenStream.LA(0) === Tokens.COMMA) {
                                        functionText += tokenStream.token().value;
                                    }
                                    tokenStream.match(Tokens.IDENT);
                                    functionText += tokenStream.token().value;
                                    tokenStream.match(Tokens.EQUALS);
                                    functionText += tokenStream.token().value;
                                    lt = tokenStream.peek();
                                    while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                                        tokenStream.get();
                                        functionText += tokenStream.token().value;
                                        lt = tokenStream.peek();
                                    }
                                } while (tokenStream.match([Tokens.COMMA, Tokens.S]));
                            }
                            tokenStream.match(Tokens.RPAREN);
                            functionText += ")";
                            this._readWhitespace();
                        }
                        return functionText;
                    },
                    _ie_function: function () {
                        var tokenStream = this._tokenStream, functionText = null, lt;
                        if (tokenStream.match([Tokens.IE_FUNCTION, Tokens.FUNCTION])) {
                            functionText = tokenStream.token().value;
                            do {
                                if (this._readWhitespace()) {
                                    functionText += tokenStream.token().value;
                                }
                                if (tokenStream.LA(0) === Tokens.COMMA) {
                                    functionText += tokenStream.token().value;
                                }
                                tokenStream.match(Tokens.IDENT);
                                functionText += tokenStream.token().value;
                                tokenStream.match(Tokens.EQUALS);
                                functionText += tokenStream.token().value;
                                lt = tokenStream.peek();
                                while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                                    tokenStream.get();
                                    functionText += tokenStream.token().value;
                                    lt = tokenStream.peek();
                                }
                            } while (tokenStream.match([Tokens.COMMA, Tokens.S]));
                            tokenStream.match(Tokens.RPAREN);
                            functionText += ")";
                            this._readWhitespace();
                        }
                        return functionText;
                    },
                    _hexcolor: function () {
                        var tokenStream = this._tokenStream, token = null, color;
                        if (tokenStream.match(Tokens.HASH)) {
                            token = tokenStream.token();
                            color = token.value;
                            if (!/#[a-f0-9]{3,6}/i.test(color)) {
                                throw new SyntaxError2("Expected a hex color but found '" + color + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
                            }
                            this._readWhitespace();
                        }
                        return token;
                    },
                    _keyframes: function () {
                        var tokenStream = this._tokenStream, token, tt, name, prefix = "";
                        tokenStream.mustMatch(Tokens.KEYFRAMES_SYM);
                        token = tokenStream.token();
                        if (/^@\-([^\-]+)\-/.test(token.value)) {
                            prefix = RegExp.$1;
                        }
                        this._readWhitespace();
                        name = this._keyframe_name();
                        this._readWhitespace();
                        tokenStream.mustMatch(Tokens.LBRACE);
                        this.fire({
                            type: "startkeyframes",
                            name,
                            prefix,
                            line: token.startLine,
                            col: token.startCol
                        });
                        this._readWhitespace();
                        tt = tokenStream.peek();
                        while (tt === Tokens.IDENT || tt === Tokens.PERCENTAGE) {
                            this._keyframe_rule();
                            this._readWhitespace();
                            tt = tokenStream.peek();
                        }
                        this.fire({
                            type: "endkeyframes",
                            name,
                            prefix,
                            line: token.startLine,
                            col: token.startCol
                        });
                        this._readWhitespace();
                        tokenStream.mustMatch(Tokens.RBRACE);
                    },
                    _keyframe_name: function () {
                        var tokenStream = this._tokenStream;
                        tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                        return SyntaxUnit.fromToken(tokenStream.token());
                    },
                    _keyframe_rule: function () {
                        var keyList = this._key_list();
                        this.fire({
                            type: "startkeyframerule",
                            keys: keyList,
                            line: keyList[0].line,
                            col: keyList[0].col
                        });
                        this._readDeclarations(true);
                        this.fire({
                            type: "endkeyframerule",
                            keys: keyList,
                            line: keyList[0].line,
                            col: keyList[0].col
                        });
                    },
                    _key_list: function () {
                        var tokenStream = this._tokenStream, keyList = [];
                        keyList.push(this._key());
                        this._readWhitespace();
                        while (tokenStream.match(Tokens.COMMA)) {
                            this._readWhitespace();
                            keyList.push(this._key());
                            this._readWhitespace();
                        }
                        return keyList;
                    },
                    _key: function () {
                        var tokenStream = this._tokenStream, token;
                        if (tokenStream.match(Tokens.PERCENTAGE)) {
                            return SyntaxUnit.fromToken(tokenStream.token());
                        }
                        else if (tokenStream.match(Tokens.IDENT)) {
                            token = tokenStream.token();
                            if (/from|to/i.test(token.value)) {
                                return SyntaxUnit.fromToken(token);
                            }
                            tokenStream.unget();
                        }
                        this._unexpectedToken(tokenStream.LT(1));
                    },
                    _skipCruft: function () {
                        while (this._tokenStream.match([Tokens.S, Tokens.CDO, Tokens.CDC])) {
                        }
                    },
                    _readDeclarations: function (checkStart, readMargins) {
                        var tokenStream = this._tokenStream, tt;
                        this._readWhitespace();
                        if (checkStart) {
                            tokenStream.mustMatch(Tokens.LBRACE);
                        }
                        this._readWhitespace();
                        try {
                            while (true) {
                                if (tokenStream.match(Tokens.SEMICOLON) || readMargins && this._margin()) {
                                }
                                else if (this._declaration()) {
                                    if (!tokenStream.match(Tokens.SEMICOLON)) {
                                        break;
                                    }
                                }
                                else {
                                    break;
                                }
                                this._readWhitespace();
                            }
                            tokenStream.mustMatch(Tokens.RBRACE);
                            this._readWhitespace();
                        }
                        catch (ex) {
                            if (ex instanceof SyntaxError2 && !this.options.strict) {
                                this.fire({
                                    type: "error",
                                    error: ex,
                                    message: ex.message,
                                    line: ex.line,
                                    col: ex.col
                                });
                                tt = tokenStream.advance([Tokens.SEMICOLON, Tokens.RBRACE]);
                                if (tt === Tokens.SEMICOLON) {
                                    this._readDeclarations(false, readMargins);
                                }
                                else if (tt !== Tokens.RBRACE) {
                                    throw ex;
                                }
                            }
                            else {
                                throw ex;
                            }
                        }
                    },
                    _readWhitespace: function () {
                        var tokenStream = this._tokenStream, ws = "";
                        while (tokenStream.match(Tokens.S)) {
                            ws += tokenStream.token().value;
                        }
                        return ws;
                    },
                    _unexpectedToken: function (token) {
                        throw new SyntaxError2("Unexpected token '" + token.value + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
                    },
                    _verifyEnd: function () {
                        if (this._tokenStream.LA(1) !== Tokens.EOF) {
                            this._unexpectedToken(this._tokenStream.LT(1));
                        }
                    },
                    _validateProperty: function (property, value) {
                        Validation.validate(property, value);
                    },
                    parse: function (input) {
                        this._tokenStream = new TokenStream(input, Tokens);
                        this._stylesheet();
                    },
                    parseStyleSheet: function (input) {
                        return this.parse(input);
                    },
                    parseMediaQuery: function (input) {
                        this._tokenStream = new TokenStream(input, Tokens);
                        var result = this._media_query();
                        this._verifyEnd();
                        return result;
                    },
                    parsePropertyValue: function (input) {
                        this._tokenStream = new TokenStream(input, Tokens);
                        this._readWhitespace();
                        var result = this._expr();
                        this._readWhitespace();
                        this._verifyEnd();
                        return result;
                    },
                    parseRule: function (input) {
                        this._tokenStream = new TokenStream(input, Tokens);
                        this._readWhitespace();
                        var result = this._ruleset();
                        this._readWhitespace();
                        this._verifyEnd();
                        return result;
                    },
                    parseSelector: function (input) {
                        this._tokenStream = new TokenStream(input, Tokens);
                        this._readWhitespace();
                        var result = this._selector();
                        this._readWhitespace();
                        this._verifyEnd();
                        return result;
                    },
                    parseStyleAttribute: function (input) {
                        input += "}";
                        this._tokenStream = new TokenStream(input, Tokens);
                        this._readDeclarations();
                    }
                };
                for (prop in additions) {
                    if (Object.prototype.hasOwnProperty.call(additions, prop)) {
                        proto[prop] = additions[prop];
                    }
                }
                return proto;
            }();
            var Properties = {
                __proto__: null,
                "align-items": "flex-start | flex-end | center | baseline | stretch",
                "align-content": "flex-start | flex-end | center | space-between | space-around | stretch",
                "align-self": "auto | flex-start | flex-end | center | baseline | stretch",
                "-webkit-align-items": "flex-start | flex-end | center | baseline | stretch",
                "-webkit-align-content": "flex-start | flex-end | center | space-between | space-around | stretch",
                "-webkit-align-self": "auto | flex-start | flex-end | center | baseline | stretch",
                "alignment-adjust": "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>",
                "alignment-baseline": "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
                "animation": 1,
                "animation-delay": { multi: "<time>", comma: true },
                "animation-direction": { multi: "normal | alternate", comma: true },
                "animation-duration": { multi: "<time>", comma: true },
                "animation-fill-mode": { multi: "none | forwards | backwards | both", comma: true },
                "animation-iteration-count": { multi: "<number> | infinite", comma: true },
                "animation-name": { multi: "none | <ident>", comma: true },
                "animation-play-state": { multi: "running | paused", comma: true },
                "animation-timing-function": 1,
                "-moz-animation-delay": { multi: "<time>", comma: true },
                "-moz-animation-direction": { multi: "normal | alternate", comma: true },
                "-moz-animation-duration": { multi: "<time>", comma: true },
                "-moz-animation-iteration-count": { multi: "<number> | infinite", comma: true },
                "-moz-animation-name": { multi: "none | <ident>", comma: true },
                "-moz-animation-play-state": { multi: "running | paused", comma: true },
                "-ms-animation-delay": { multi: "<time>", comma: true },
                "-ms-animation-direction": { multi: "normal | alternate", comma: true },
                "-ms-animation-duration": { multi: "<time>", comma: true },
                "-ms-animation-iteration-count": { multi: "<number> | infinite", comma: true },
                "-ms-animation-name": { multi: "none | <ident>", comma: true },
                "-ms-animation-play-state": { multi: "running | paused", comma: true },
                "-webkit-animation-delay": { multi: "<time>", comma: true },
                "-webkit-animation-direction": { multi: "normal | alternate", comma: true },
                "-webkit-animation-duration": { multi: "<time>", comma: true },
                "-webkit-animation-fill-mode": { multi: "none | forwards | backwards | both", comma: true },
                "-webkit-animation-iteration-count": { multi: "<number> | infinite", comma: true },
                "-webkit-animation-name": { multi: "none | <ident>", comma: true },
                "-webkit-animation-play-state": { multi: "running | paused", comma: true },
                "-o-animation-delay": { multi: "<time>", comma: true },
                "-o-animation-direction": { multi: "normal | alternate", comma: true },
                "-o-animation-duration": { multi: "<time>", comma: true },
                "-o-animation-iteration-count": { multi: "<number> | infinite", comma: true },
                "-o-animation-name": { multi: "none | <ident>", comma: true },
                "-o-animation-play-state": { multi: "running | paused", comma: true },
                "appearance": "icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal | none | inherit",
                "azimuth": function (expression) {
                    var simple = "<angle> | leftwards | rightwards | inherit", direction = "left-side | far-left | left | center-left | center | center-right | right | far-right | right-side", behind = false, valid = false, part;
                    if (!ValidationTypes.isAny(expression, simple)) {
                        if (ValidationTypes.isAny(expression, "behind")) {
                            behind = true;
                            valid = true;
                        }
                        if (ValidationTypes.isAny(expression, direction)) {
                            valid = true;
                            if (!behind) {
                                ValidationTypes.isAny(expression, "behind");
                            }
                        }
                    }
                    if (expression.hasNext()) {
                        part = expression.next();
                        if (valid) {
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            throw new ValidationError("Expected (<'azimuth'>) but found '" + part + "'.", part.line, part.col);
                        }
                    }
                },
                "backface-visibility": "visible | hidden",
                "background": 1,
                "background-attachment": { multi: "<attachment>", comma: true },
                "background-clip": { multi: "<box>", comma: true },
                "background-color": "<color> | inherit",
                "background-image": { multi: "<bg-image>", comma: true },
                "background-origin": { multi: "<box>", comma: true },
                "background-position": { multi: "<bg-position>", comma: true },
                "background-repeat": { multi: "<repeat-style>" },
                "background-size": { multi: "<bg-size>", comma: true },
                "baseline-shift": "baseline | sub | super | <percentage> | <length>",
                "behavior": 1,
                "binding": 1,
                "bleed": "<length>",
                "bookmark-label": "<content> | <attr> | <string>",
                "bookmark-level": "none | <integer>",
                "bookmark-state": "open | closed",
                "bookmark-target": "none | <uri> | <attr>",
                "border": "<border-width> || <border-style> || <color>",
                "border-bottom": "<border-width> || <border-style> || <color>",
                "border-bottom-color": "<color> | inherit",
                "border-bottom-left-radius": "<x-one-radius>",
                "border-bottom-right-radius": "<x-one-radius>",
                "border-bottom-style": "<border-style>",
                "border-bottom-width": "<border-width>",
                "border-collapse": "collapse | separate | inherit",
                "border-color": { multi: "<color> | inherit", max: 4 },
                "border-image": 1,
                "border-image-outset": { multi: "<length> | <number>", max: 4 },
                "border-image-repeat": { multi: "stretch | repeat | round", max: 2 },
                "border-image-slice": function (expression) {
                    var valid = false, numeric = "<number> | <percentage>", fill = false, count = 0, max = 4, part;
                    if (ValidationTypes.isAny(expression, "fill")) {
                        fill = true;
                        valid = true;
                    }
                    while (expression.hasNext() && count < max) {
                        valid = ValidationTypes.isAny(expression, numeric);
                        if (!valid) {
                            break;
                        }
                        count++;
                    }
                    if (!fill) {
                        ValidationTypes.isAny(expression, "fill");
                    }
                    else {
                        valid = true;
                    }
                    if (expression.hasNext()) {
                        part = expression.next();
                        if (valid) {
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            throw new ValidationError("Expected ([<number> | <percentage>]{1,4} && fill?) but found '" + part + "'.", part.line, part.col);
                        }
                    }
                },
                "border-image-source": "<image> | none",
                "border-image-width": { multi: "<length> | <percentage> | <number> | auto", max: 4 },
                "border-left": "<border-width> || <border-style> || <color>",
                "border-left-color": "<color> | inherit",
                "border-left-style": "<border-style>",
                "border-left-width": "<border-width>",
                "border-radius": function (expression) {
                    var valid = false, simple = "<length> | <percentage> | inherit", slash = false, count = 0, max = 8, part;
                    while (expression.hasNext() && count < max) {
                        valid = ValidationTypes.isAny(expression, simple);
                        if (!valid) {
                            if (String(expression.peek()) === "/" && count > 0 && !slash) {
                                slash = true;
                                max = count + 5;
                                expression.next();
                            }
                            else {
                                break;
                            }
                        }
                        count++;
                    }
                    if (expression.hasNext()) {
                        part = expression.next();
                        if (valid) {
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            throw new ValidationError("Expected (<'border-radius'>) but found '" + part + "'.", part.line, part.col);
                        }
                    }
                },
                "border-right": "<border-width> || <border-style> || <color>",
                "border-right-color": "<color> | inherit",
                "border-right-style": "<border-style>",
                "border-right-width": "<border-width>",
                "border-spacing": { multi: "<length> | inherit", max: 2 },
                "border-style": { multi: "<border-style>", max: 4 },
                "border-top": "<border-width> || <border-style> || <color>",
                "border-top-color": "<color> | inherit",
                "border-top-left-radius": "<x-one-radius>",
                "border-top-right-radius": "<x-one-radius>",
                "border-top-style": "<border-style>",
                "border-top-width": "<border-width>",
                "border-width": { multi: "<border-width>", max: 4 },
                "bottom": "<margin-width> | inherit",
                "-moz-box-align": "start | end | center | baseline | stretch",
                "-moz-box-decoration-break": "slice |clone",
                "-moz-box-direction": "normal | reverse | inherit",
                "-moz-box-flex": "<number>",
                "-moz-box-flex-group": "<integer>",
                "-moz-box-lines": "single | multiple",
                "-moz-box-ordinal-group": "<integer>",
                "-moz-box-orient": "horizontal | vertical | inline-axis | block-axis | inherit",
                "-moz-box-pack": "start | end | center | justify",
                "-o-box-decoration-break": "slice | clone",
                "-webkit-box-align": "start | end | center | baseline | stretch",
                "-webkit-box-decoration-break": "slice |clone",
                "-webkit-box-direction": "normal | reverse | inherit",
                "-webkit-box-flex": "<number>",
                "-webkit-box-flex-group": "<integer>",
                "-webkit-box-lines": "single | multiple",
                "-webkit-box-ordinal-group": "<integer>",
                "-webkit-box-orient": "horizontal | vertical | inline-axis | block-axis | inherit",
                "-webkit-box-pack": "start | end | center | justify",
                "box-decoration-break": "slice | clone",
                "box-shadow": function (expression) {
                    var part;
                    if (!ValidationTypes.isAny(expression, "none")) {
                        Validation.multiProperty("<shadow>", expression, true, Infinity);
                    }
                    else {
                        if (expression.hasNext()) {
                            part = expression.next();
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                    }
                },
                "box-sizing": "content-box | border-box | inherit",
                "break-after": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
                "break-before": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
                "break-inside": "auto | avoid | avoid-page | avoid-column",
                "caption-side": "top | bottom | inherit",
                "clear": "none | right | left | both | inherit",
                "clip": 1,
                "color": "<color> | inherit",
                "color-profile": 1,
                "column-count": "<integer> | auto",
                "column-fill": "auto | balance",
                "column-gap": "<length> | normal",
                "column-rule": "<border-width> || <border-style> || <color>",
                "column-rule-color": "<color>",
                "column-rule-style": "<border-style>",
                "column-rule-width": "<border-width>",
                "column-span": "none | all",
                "column-width": "<length> | auto",
                "columns": 1,
                "content": 1,
                "counter-increment": 1,
                "counter-reset": 1,
                "crop": "<shape> | auto",
                "cue": "cue-after | cue-before | inherit",
                "cue-after": 1,
                "cue-before": 1,
                "cursor": 1,
                "direction": "ltr | rtl | inherit",
                "display": "inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | none | inherit | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex",
                "dominant-baseline": 1,
                "drop-initial-after-adjust": "central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>",
                "drop-initial-after-align": "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
                "drop-initial-before-adjust": "before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>",
                "drop-initial-before-align": "caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
                "drop-initial-size": "auto | line | <length> | <percentage>",
                "drop-initial-value": "initial | <integer>",
                "elevation": "<angle> | below | level | above | higher | lower | inherit",
                "empty-cells": "show | hide | inherit",
                "filter": 1,
                "fit": "fill | hidden | meet | slice",
                "fit-position": 1,
                "flex": "<flex>",
                "flex-basis": "<width>",
                "flex-direction": "row | row-reverse | column | column-reverse",
                "flex-flow": "<flex-direction> || <flex-wrap>",
                "flex-grow": "<number>",
                "flex-shrink": "<number>",
                "flex-wrap": "nowrap | wrap | wrap-reverse",
                "-webkit-flex": "<flex>",
                "-webkit-flex-basis": "<width>",
                "-webkit-flex-direction": "row | row-reverse | column | column-reverse",
                "-webkit-flex-flow": "<flex-direction> || <flex-wrap>",
                "-webkit-flex-grow": "<number>",
                "-webkit-flex-shrink": "<number>",
                "-webkit-flex-wrap": "nowrap | wrap | wrap-reverse",
                "-ms-flex": "<flex>",
                "-ms-flex-align": "start | end | center | stretch | baseline",
                "-ms-flex-direction": "row | row-reverse | column | column-reverse | inherit",
                "-ms-flex-order": "<number>",
                "-ms-flex-pack": "start | end | center | justify",
                "-ms-flex-wrap": "nowrap | wrap | wrap-reverse",
                "float": "left | right | none | inherit",
                "float-offset": 1,
                "font": 1,
                "font-family": 1,
                "font-feature-settings": "<feature-tag-value> | normal | inherit",
                "font-kerning": "auto | normal | none | initial | inherit | unset",
                "font-size": "<absolute-size> | <relative-size> | <length> | <percentage> | inherit",
                "font-size-adjust": "<number> | none | inherit",
                "font-stretch": "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit",
                "font-style": "normal | italic | oblique | inherit",
                "font-variant": "normal | small-caps | inherit",
                "font-variant-caps": "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps",
                "font-variant-position": "normal | sub | super | inherit | initial | unset",
                "font-weight": "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit",
                "grid": 1,
                "grid-area": 1,
                "grid-auto-columns": 1,
                "grid-auto-flow": 1,
                "grid-auto-position": 1,
                "grid-auto-rows": 1,
                "grid-cell-stacking": "columns | rows | layer",
                "grid-column": 1,
                "grid-columns": 1,
                "grid-column-align": "start | end | center | stretch",
                "grid-column-sizing": 1,
                "grid-column-start": 1,
                "grid-column-end": 1,
                "grid-column-span": "<integer>",
                "grid-flow": "none | rows | columns",
                "grid-layer": "<integer>",
                "grid-row": 1,
                "grid-rows": 1,
                "grid-row-align": "start | end | center | stretch",
                "grid-row-start": 1,
                "grid-row-end": 1,
                "grid-row-span": "<integer>",
                "grid-row-sizing": 1,
                "grid-template": 1,
                "grid-template-areas": 1,
                "grid-template-columns": 1,
                "grid-template-rows": 1,
                "hanging-punctuation": 1,
                "height": "<margin-width> | <content-sizing> | inherit",
                "hyphenate-after": "<integer> | auto",
                "hyphenate-before": "<integer> | auto",
                "hyphenate-character": "<string> | auto",
                "hyphenate-lines": "no-limit | <integer>",
                "hyphenate-resource": 1,
                "hyphens": "none | manual | auto",
                "icon": 1,
                "image-orientation": "angle | auto",
                "image-rendering": 1,
                "image-resolution": 1,
                "ime-mode": "auto | normal | active | inactive | disabled | inherit",
                "inline-box-align": "initial | last | <integer>",
                "justify-content": "flex-start | flex-end | center | space-between | space-around",
                "-webkit-justify-content": "flex-start | flex-end | center | space-between | space-around",
                "left": "<margin-width> | inherit",
                "letter-spacing": "<length> | normal | inherit",
                "line-height": "<number> | <length> | <percentage> | normal | inherit",
                "line-break": "auto | loose | normal | strict",
                "line-stacking": 1,
                "line-stacking-ruby": "exclude-ruby | include-ruby",
                "line-stacking-shift": "consider-shifts | disregard-shifts",
                "line-stacking-strategy": "inline-line-height | block-line-height | max-height | grid-height",
                "list-style": 1,
                "list-style-image": "<uri> | none | inherit",
                "list-style-position": "inside | outside | inherit",
                "list-style-type": "disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none | inherit",
                "margin": { multi: "<margin-width> | inherit", max: 4 },
                "margin-bottom": "<margin-width> | inherit",
                "margin-left": "<margin-width> | inherit",
                "margin-right": "<margin-width> | inherit",
                "margin-top": "<margin-width> | inherit",
                "mark": 1,
                "mark-after": 1,
                "mark-before": 1,
                "marks": 1,
                "marquee-direction": 1,
                "marquee-play-count": 1,
                "marquee-speed": 1,
                "marquee-style": 1,
                "max-height": "<length> | <percentage> | <content-sizing> | none | inherit",
                "max-width": "<length> | <percentage> | <content-sizing> | none | inherit",
                "min-height": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats | inherit",
                "min-width": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats | inherit",
                "move-to": 1,
                "nav-down": 1,
                "nav-index": 1,
                "nav-left": 1,
                "nav-right": 1,
                "nav-up": 1,
                "object-fit": "fill | contain | cover | none | scale-down",
                "object-position": "<bg-position>",
                "opacity": "<number> | inherit",
                "order": "<integer>",
                "-webkit-order": "<integer>",
                "orphans": "<integer> | inherit",
                "outline": 1,
                "outline-color": "<color> | invert | inherit",
                "outline-offset": 1,
                "outline-style": "<border-style> | inherit",
                "outline-width": "<border-width> | inherit",
                "overflow": "visible | hidden | scroll | auto | inherit",
                "overflow-style": 1,
                "overflow-wrap": "normal | break-word",
                "overflow-x": 1,
                "overflow-y": 1,
                "padding": { multi: "<padding-width> | inherit", max: 4 },
                "padding-bottom": "<padding-width> | inherit",
                "padding-left": "<padding-width> | inherit",
                "padding-right": "<padding-width> | inherit",
                "padding-top": "<padding-width> | inherit",
                "page": 1,
                "page-break-after": "auto | always | avoid | left | right | inherit",
                "page-break-before": "auto | always | avoid | left | right | inherit",
                "page-break-inside": "auto | avoid | inherit",
                "page-policy": 1,
                "pause": 1,
                "pause-after": 1,
                "pause-before": 1,
                "perspective": 1,
                "perspective-origin": 1,
                "phonemes": 1,
                "pitch": 1,
                "pitch-range": 1,
                "play-during": 1,
                "pointer-events": "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
                "position": "static | relative | absolute | fixed | inherit",
                "presentation-level": 1,
                "punctuation-trim": 1,
                "quotes": 1,
                "rendering-intent": 1,
                "resize": 1,
                "rest": 1,
                "rest-after": 1,
                "rest-before": 1,
                "richness": 1,
                "right": "<margin-width> | inherit",
                "rotation": 1,
                "rotation-point": 1,
                "ruby-align": 1,
                "ruby-overhang": 1,
                "ruby-position": 1,
                "ruby-span": 1,
                "size": 1,
                "speak": "normal | none | spell-out | inherit",
                "speak-header": "once | always | inherit",
                "speak-numeral": "digits | continuous | inherit",
                "speak-punctuation": "code | none | inherit",
                "speech-rate": 1,
                "src": 1,
                "stress": 1,
                "string-set": 1,
                "table-layout": "auto | fixed | inherit",
                "tab-size": "<integer> | <length>",
                "target": 1,
                "target-name": 1,
                "target-new": 1,
                "target-position": 1,
                "text-align": "left | right | center | justify | match-parent | start | end | inherit",
                "text-align-last": 1,
                "text-decoration": 1,
                "text-emphasis": 1,
                "text-height": 1,
                "text-indent": "<length> | <percentage> | inherit",
                "text-justify": "auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida",
                "text-outline": 1,
                "text-overflow": 1,
                "text-rendering": "auto | optimizeSpeed | optimizeLegibility | geometricPrecision | inherit",
                "text-shadow": 1,
                "text-transform": "capitalize | uppercase | lowercase | none | inherit",
                "text-wrap": "normal | none | avoid",
                "top": "<margin-width> | inherit",
                "-ms-touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
                "touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
                "transform": 1,
                "transform-origin": 1,
                "transform-style": 1,
                "transition": 1,
                "transition-delay": 1,
                "transition-duration": 1,
                "transition-property": 1,
                "transition-timing-function": 1,
                "unicode-bidi": "normal | embed | isolate | bidi-override | isolate-override | plaintext | inherit",
                "user-modify": "read-only | read-write | write-only | inherit",
                "user-select": "none | text | toggle | element | elements | all | inherit",
                "vertical-align": "auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length> | inherit",
                "visibility": "visible | hidden | collapse | inherit",
                "voice-balance": 1,
                "voice-duration": 1,
                "voice-family": 1,
                "voice-pitch": 1,
                "voice-pitch-range": 1,
                "voice-rate": 1,
                "voice-stress": 1,
                "voice-volume": 1,
                "volume": 1,
                "white-space": "normal | pre | nowrap | pre-wrap | pre-line | inherit | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap",
                "white-space-collapse": 1,
                "widows": "<integer> | inherit",
                "width": "<length> | <percentage> | <content-sizing> | auto | inherit",
                "will-change": { multi: "<ident>", comma: true },
                "word-break": "normal | keep-all | break-all",
                "word-spacing": "<length> | normal | inherit",
                "word-wrap": "normal | break-word",
                "writing-mode": "horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb | inherit",
                "z-index": "<integer> | auto | inherit",
                "zoom": "<number> | <percentage> | normal"
            };
            function PropertyName(text, hack, line, col) {
                SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_NAME_TYPE);
                this.hack = hack;
            }
            PropertyName.prototype = new SyntaxUnit();
            PropertyName.prototype.constructor = PropertyName;
            PropertyName.prototype.toString = function () {
                return (this.hack ? this.hack : "") + this.text;
            };
            function PropertyValue(parts, line, col) {
                SyntaxUnit.call(this, parts.join(" "), line, col, Parser.PROPERTY_VALUE_TYPE);
                this.parts = parts;
            }
            PropertyValue.prototype = new SyntaxUnit();
            PropertyValue.prototype.constructor = PropertyValue;
            function PropertyValueIterator(value) {
                this._i = 0;
                this._parts = value.parts;
                this._marks = [];
                this.value = value;
            }
            PropertyValueIterator.prototype.count = function () {
                return this._parts.length;
            };
            PropertyValueIterator.prototype.isFirst = function () {
                return this._i === 0;
            };
            PropertyValueIterator.prototype.hasNext = function () {
                return this._i < this._parts.length;
            };
            PropertyValueIterator.prototype.mark = function () {
                this._marks.push(this._i);
            };
            PropertyValueIterator.prototype.peek = function (count) {
                return this.hasNext() ? this._parts[this._i + (count || 0)] : null;
            };
            PropertyValueIterator.prototype.next = function () {
                return this.hasNext() ? this._parts[this._i++] : null;
            };
            PropertyValueIterator.prototype.previous = function () {
                return this._i > 0 ? this._parts[--this._i] : null;
            };
            PropertyValueIterator.prototype.restore = function () {
                if (this._marks.length) {
                    this._i = this._marks.pop();
                }
            };
            function PropertyValuePart(text, line, col) {
                SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_VALUE_PART_TYPE);
                this.type = "unknown";
                var temp;
                if (/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)) {
                    this.type = "dimension";
                    this.value = +RegExp.$1;
                    this.units = RegExp.$2;
                    switch (this.units.toLowerCase()) {
                        case "em":
                        case "rem":
                        case "ex":
                        case "px":
                        case "cm":
                        case "mm":
                        case "in":
                        case "pt":
                        case "pc":
                        case "ch":
                        case "vh":
                        case "vw":
                        case "vmax":
                        case "vmin":
                            this.type = "length";
                            break;
                        case "fr":
                            this.type = "grid";
                            break;
                        case "deg":
                        case "rad":
                        case "grad":
                            this.type = "angle";
                            break;
                        case "ms":
                        case "s":
                            this.type = "time";
                            break;
                        case "hz":
                        case "khz":
                            this.type = "frequency";
                            break;
                        case "dpi":
                        case "dpcm":
                            this.type = "resolution";
                            break;
                    }
                }
                else if (/^([+\-]?[\d\.]+)%$/i.test(text)) {
                    this.type = "percentage";
                    this.value = +RegExp.$1;
                }
                else if (/^([+\-]?\d+)$/i.test(text)) {
                    this.type = "integer";
                    this.value = +RegExp.$1;
                }
                else if (/^([+\-]?[\d\.]+)$/i.test(text)) {
                    this.type = "number";
                    this.value = +RegExp.$1;
                }
                else if (/^#([a-f0-9]{3,6})/i.test(text)) {
                    this.type = "color";
                    temp = RegExp.$1;
                    if (temp.length === 3) {
                        this.red = parseInt(temp.charAt(0) + temp.charAt(0), 16);
                        this.green = parseInt(temp.charAt(1) + temp.charAt(1), 16);
                        this.blue = parseInt(temp.charAt(2) + temp.charAt(2), 16);
                    }
                    else {
                        this.red = parseInt(temp.substring(0, 2), 16);
                        this.green = parseInt(temp.substring(2, 4), 16);
                        this.blue = parseInt(temp.substring(4, 6), 16);
                    }
                }
                else if (/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text)) {
                    this.type = "color";
                    this.red = +RegExp.$1;
                    this.green = +RegExp.$2;
                    this.blue = +RegExp.$3;
                }
                else if (/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) {
                    this.type = "color";
                    this.red = +RegExp.$1 * 255 / 100;
                    this.green = +RegExp.$2 * 255 / 100;
                    this.blue = +RegExp.$3 * 255 / 100;
                }
                else if (/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
                    this.type = "color";
                    this.red = +RegExp.$1;
                    this.green = +RegExp.$2;
                    this.blue = +RegExp.$3;
                    this.alpha = +RegExp.$4;
                }
                else if (/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
                    this.type = "color";
                    this.red = +RegExp.$1 * 255 / 100;
                    this.green = +RegExp.$2 * 255 / 100;
                    this.blue = +RegExp.$3 * 255 / 100;
                    this.alpha = +RegExp.$4;
                }
                else if (/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) {
                    this.type = "color";
                    this.hue = +RegExp.$1;
                    this.saturation = +RegExp.$2 / 100;
                    this.lightness = +RegExp.$3 / 100;
                }
                else if (/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) {
                    this.type = "color";
                    this.hue = +RegExp.$1;
                    this.saturation = +RegExp.$2 / 100;
                    this.lightness = +RegExp.$3 / 100;
                    this.alpha = +RegExp.$4;
                }
                else if (/^url\(["']?([^\)"']+)["']?\)/i.test(text)) {
                    this.type = "uri";
                    this.uri = RegExp.$1;
                }
                else if (/^([^\(]+)\(/i.test(text)) {
                    this.type = "function";
                    this.name = RegExp.$1;
                    this.value = text;
                }
                else if (/^"([^\n\r\f\\"]|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*"/i.test(text)) {
                    this.type = "string";
                    this.value = PropertyValuePart.parseString(text);
                }
                else if (/^'([^\n\r\f\\']|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*'/i.test(text)) {
                    this.type = "string";
                    this.value = PropertyValuePart.parseString(text);
                }
                else if (Colors[text.toLowerCase()]) {
                    this.type = "color";
                    temp = Colors[text.toLowerCase()].substring(1);
                    this.red = parseInt(temp.substring(0, 2), 16);
                    this.green = parseInt(temp.substring(2, 4), 16);
                    this.blue = parseInt(temp.substring(4, 6), 16);
                }
                else if (/^[\,\/]$/.test(text)) {
                    this.type = "operator";
                    this.value = text;
                }
                else if (/^[a-z\-_\u0080-\uFFFF][a-z0-9\-_\u0080-\uFFFF]*$/i.test(text)) {
                    this.type = "identifier";
                    this.value = text;
                }
            }
            PropertyValuePart.prototype = new SyntaxUnit();
            PropertyValuePart.prototype.constructor = PropertyValuePart;
            PropertyValuePart.parseString = function (str) {
                str = str.slice(1, -1);
                var replacer = function (match, esc) {
                    if (/^(\n|\r\n|\r|\f)$/.test(esc)) {
                        return "";
                    }
                    var m = /^[0-9a-f]{1,6}/i.exec(esc);
                    if (m) {
                        var codePoint = parseInt(m[0], 16);
                        if (String.fromCodePoint) {
                            return String.fromCodePoint(codePoint);
                        }
                        else {
                            return String.fromCharCode(codePoint);
                        }
                    }
                    return esc;
                };
                return str.replace(/\\(\r\n|[^\r0-9a-f]|[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)/ig, replacer);
            };
            PropertyValuePart.serializeString = function (value) {
                var replacer = function (match, c) {
                    if (c === '"') {
                        return "\\" + c;
                    }
                    var cp = String.codePointAt ? String.codePointAt(0) : String.charCodeAt(0);
                    return "\\" + cp.toString(16) + " ";
                };
                return '"' + value.replace(/["\r\n\f]/g, replacer) + '"';
            };
            PropertyValuePart.fromToken = function (token) {
                return new PropertyValuePart(token.value, token.startLine, token.startCol);
            };
            var Pseudos = {
                __proto__: null,
                ":first-letter": 1,
                ":first-line": 1,
                ":before": 1,
                ":after": 1
            };
            Pseudos.ELEMENT = 1;
            Pseudos.CLASS = 2;
            Pseudos.isElement = function (pseudo) {
                return pseudo.indexOf("::") === 0 || Pseudos[pseudo.toLowerCase()] === Pseudos.ELEMENT;
            };
            function Selector(parts, line, col) {
                SyntaxUnit.call(this, parts.join(" "), line, col, Parser.SELECTOR_TYPE);
                this.parts = parts;
                this.specificity = Specificity.calculate(this);
            }
            Selector.prototype = new SyntaxUnit();
            Selector.prototype.constructor = Selector;
            function SelectorPart(elementName, modifiers, text, line, col) {
                SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_PART_TYPE);
                this.elementName = elementName;
                this.modifiers = modifiers;
            }
            SelectorPart.prototype = new SyntaxUnit();
            SelectorPart.prototype.constructor = SelectorPart;
            function SelectorSubPart(text, type, line, col) {
                SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_SUB_PART_TYPE);
                this.type = type;
                this.args = [];
            }
            SelectorSubPart.prototype = new SyntaxUnit();
            SelectorSubPart.prototype.constructor = SelectorSubPart;
            function Specificity(a, b, c, d) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
            }
            Specificity.prototype = {
                constructor: Specificity,
                compare: function (other) {
                    var comps = ["a", "b", "c", "d"], i, len;
                    for (i = 0, len = comps.length; i < len; i++) {
                        if (this[comps[i]] < other[comps[i]]) {
                            return -1;
                        }
                        else if (this[comps[i]] > other[comps[i]]) {
                            return 1;
                        }
                    }
                    return 0;
                },
                valueOf: function () {
                    return this.a * 1e3 + this.b * 100 + this.c * 10 + this.d;
                },
                toString: function () {
                    return this.a + "," + this.b + "," + this.c + "," + this.d;
                }
            };
            Specificity.calculate = function (selector) {
                var i, len, part, b = 0, c = 0, d = 0;
                function updateValues(part2) {
                    var i2, j, len2, num, elementName = part2.elementName ? part2.elementName.text : "", modifier;
                    if (elementName && elementName.charAt(elementName.length - 1) !== "*") {
                        d++;
                    }
                    for (i2 = 0, len2 = part2.modifiers.length; i2 < len2; i2++) {
                        modifier = part2.modifiers[i2];
                        switch (modifier.type) {
                            case "class":
                            case "attribute":
                                c++;
                                break;
                            case "id":
                                b++;
                                break;
                            case "pseudo":
                                if (Pseudos.isElement(modifier.text)) {
                                    d++;
                                }
                                else {
                                    c++;
                                }
                                break;
                            case "not":
                                for (j = 0, num = modifier.args.length; j < num; j++) {
                                    updateValues(modifier.args[j]);
                                }
                        }
                    }
                }
                for (i = 0, len = selector.parts.length; i < len; i++) {
                    part = selector.parts[i];
                    if (part instanceof SelectorPart) {
                        updateValues(part);
                    }
                }
                return new Specificity(0, b, c, d);
            };
            var h = /^[0-9a-fA-F]$/, nl = /\n|\r\n|\r|\f/;
            function isHexDigit(c) {
                return c !== null && h.test(c);
            }
            function isDigit(c) {
                return c !== null && /\d/.test(c);
            }
            function isWhitespace(c) {
                return c !== null && /\s/.test(c);
            }
            function isNewLine(c) {
                return c !== null && nl.test(c);
            }
            function isNameStart(c) {
                return c !== null && /[a-z_\u0080-\uFFFF\\]/i.test(c);
            }
            function isNameChar(c) {
                return c !== null && (isNameStart(c) || /[0-9\-\\]/.test(c));
            }
            function isIdentStart(c) {
                return c !== null && (isNameStart(c) || /\-\\/.test(c));
            }
            function mix(receiver, supplier) {
                for (var prop in supplier) {
                    if (Object.prototype.hasOwnProperty.call(supplier, prop)) {
                        receiver[prop] = supplier[prop];
                    }
                }
                return receiver;
            }
            function TokenStream(input) {
                TokenStreamBase.call(this, input, Tokens);
            }
            TokenStream.prototype = mix(new TokenStreamBase(), {
                _getToken: function (channel) {
                    var c, reader = this._reader, token = null, startLine = reader.getLine(), startCol = reader.getCol();
                    c = reader.read();
                    while (c) {
                        switch (c) {
                            case "/":
                                if (reader.peek() === "*") {
                                    token = this.commentToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                                break;
                            case "|":
                            case "~":
                            case "^":
                            case "$":
                            case "*":
                                if (reader.peek() === "=") {
                                    token = this.comparisonToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                                break;
                            case '"':
                            case "'":
                                token = this.stringToken(c, startLine, startCol);
                                break;
                            case "#":
                                if (isNameChar(reader.peek())) {
                                    token = this.hashToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                                break;
                            case ".":
                                if (isDigit(reader.peek())) {
                                    token = this.numberToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                                break;
                            case "-":
                                if (reader.peek() === "-") {
                                    token = this.htmlCommentEndToken(c, startLine, startCol);
                                }
                                else if (isNameStart(reader.peek())) {
                                    token = this.identOrFunctionToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                                break;
                            case "!":
                                token = this.importantToken(c, startLine, startCol);
                                break;
                            case "@":
                                token = this.atRuleToken(c, startLine, startCol);
                                break;
                            case ":":
                                token = this.notToken(c, startLine, startCol);
                                break;
                            case "<":
                                token = this.htmlCommentStartToken(c, startLine, startCol);
                                break;
                            case "U":
                            case "u":
                                if (reader.peek() === "+") {
                                    token = this.unicodeRangeToken(c, startLine, startCol);
                                    break;
                                }
                            default:
                                if (isDigit(c)) {
                                    token = this.numberToken(c, startLine, startCol);
                                }
                                else if (isWhitespace(c)) {
                                    token = this.whitespaceToken(c, startLine, startCol);
                                }
                                else if (isIdentStart(c)) {
                                    token = this.identOrFunctionToken(c, startLine, startCol);
                                }
                                else {
                                    token = this.charToken(c, startLine, startCol);
                                }
                        }
                        break;
                    }
                    if (!token && c === null) {
                        token = this.createToken(Tokens.EOF, null, startLine, startCol);
                    }
                    return token;
                },
                createToken: function (tt, value, startLine, startCol, options) {
                    var reader = this._reader;
                    options = options || {};
                    return {
                        value,
                        type: tt,
                        channel: options.channel,
                        endChar: options.endChar,
                        hide: options.hide || false,
                        startLine,
                        startCol,
                        endLine: reader.getLine(),
                        endCol: reader.getCol()
                    };
                },
                atRuleToken: function (first, startLine, startCol) {
                    var rule = first, reader = this._reader, tt = Tokens.CHAR, ident;
                    reader.mark();
                    ident = this.readName();
                    rule = first + ident;
                    tt = Tokens.type(rule.toLowerCase());
                    if (tt === Tokens.CHAR || tt === Tokens.UNKNOWN) {
                        if (rule.length > 1) {
                            tt = Tokens.UNKNOWN_SYM;
                        }
                        else {
                            tt = Tokens.CHAR;
                            rule = first;
                            reader.reset();
                        }
                    }
                    return this.createToken(tt, rule, startLine, startCol);
                },
                charToken: function (c, startLine, startCol) {
                    var tt = Tokens.type(c);
                    var opts = {};
                    if (tt === -1) {
                        tt = Tokens.CHAR;
                    }
                    else {
                        opts.endChar = Tokens[tt].endChar;
                    }
                    return this.createToken(tt, c, startLine, startCol, opts);
                },
                commentToken: function (first, startLine, startCol) {
                    var comment = this.readComment(first);
                    return this.createToken(Tokens.COMMENT, comment, startLine, startCol);
                },
                comparisonToken: function (c, startLine, startCol) {
                    var reader = this._reader, comparison = c + reader.read(), tt = Tokens.type(comparison) || Tokens.CHAR;
                    return this.createToken(tt, comparison, startLine, startCol);
                },
                hashToken: function (first, startLine, startCol) {
                    var name = this.readName(first);
                    return this.createToken(Tokens.HASH, name, startLine, startCol);
                },
                htmlCommentStartToken: function (first, startLine, startCol) {
                    var reader = this._reader, text = first;
                    reader.mark();
                    text += reader.readCount(3);
                    if (text === "<!--") {
                        return this.createToken(Tokens.CDO, text, startLine, startCol);
                    }
                    else {
                        reader.reset();
                        return this.charToken(first, startLine, startCol);
                    }
                },
                htmlCommentEndToken: function (first, startLine, startCol) {
                    var reader = this._reader, text = first;
                    reader.mark();
                    text += reader.readCount(2);
                    if (text === "-->") {
                        return this.createToken(Tokens.CDC, text, startLine, startCol);
                    }
                    else {
                        reader.reset();
                        return this.charToken(first, startLine, startCol);
                    }
                },
                identOrFunctionToken: function (first, startLine, startCol) {
                    var reader = this._reader, ident = this.readName(first), tt = Tokens.IDENT, uriFns = ["url(", "url-prefix(", "domain("];
                    if (reader.peek() === "(") {
                        ident += reader.read();
                        if (uriFns.indexOf(ident.toLowerCase()) > -1) {
                            tt = Tokens.URI;
                            ident = this.readURI(ident);
                            if (uriFns.indexOf(ident.toLowerCase()) > -1) {
                                tt = Tokens.FUNCTION;
                            }
                        }
                        else {
                            tt = Tokens.FUNCTION;
                        }
                    }
                    else if (reader.peek() === ":") {
                        if (ident.toLowerCase() === "progid") {
                            ident += reader.readTo("(");
                            tt = Tokens.IE_FUNCTION;
                        }
                    }
                    return this.createToken(tt, ident, startLine, startCol);
                },
                importantToken: function (first, startLine, startCol) {
                    var reader = this._reader, important = first, tt = Tokens.CHAR, temp, c;
                    reader.mark();
                    c = reader.read();
                    while (c) {
                        if (c === "/") {
                            if (reader.peek() !== "*") {
                                break;
                            }
                            else {
                                temp = this.readComment(c);
                                if (temp === "") {
                                    break;
                                }
                            }
                        }
                        else if (isWhitespace(c)) {
                            important += c + this.readWhitespace();
                        }
                        else if (/i/i.test(c)) {
                            temp = reader.readCount(8);
                            if (/mportant/i.test(temp)) {
                                important += c + temp;
                                tt = Tokens.IMPORTANT_SYM;
                            }
                            break;
                        }
                        else {
                            break;
                        }
                        c = reader.read();
                    }
                    if (tt === Tokens.CHAR) {
                        reader.reset();
                        return this.charToken(first, startLine, startCol);
                    }
                    else {
                        return this.createToken(tt, important, startLine, startCol);
                    }
                },
                notToken: function (first, startLine, startCol) {
                    var reader = this._reader, text = first;
                    reader.mark();
                    text += reader.readCount(4);
                    if (text.toLowerCase() === ":not(") {
                        return this.createToken(Tokens.NOT, text, startLine, startCol);
                    }
                    else {
                        reader.reset();
                        return this.charToken(first, startLine, startCol);
                    }
                },
                numberToken: function (first, startLine, startCol) {
                    var reader = this._reader, value = this.readNumber(first), ident, tt = Tokens.NUMBER, c = reader.peek();
                    if (isIdentStart(c)) {
                        ident = this.readName(reader.read());
                        value += ident;
                        if (/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vmax$|^vmin$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(ident)) {
                            tt = Tokens.LENGTH;
                        }
                        else if (/^deg|^rad$|^grad$/i.test(ident)) {
                            tt = Tokens.ANGLE;
                        }
                        else if (/^ms$|^s$/i.test(ident)) {
                            tt = Tokens.TIME;
                        }
                        else if (/^hz$|^khz$/i.test(ident)) {
                            tt = Tokens.FREQ;
                        }
                        else if (/^dpi$|^dpcm$/i.test(ident)) {
                            tt = Tokens.RESOLUTION;
                        }
                        else {
                            tt = Tokens.DIMENSION;
                        }
                    }
                    else if (c === "%") {
                        value += reader.read();
                        tt = Tokens.PERCENTAGE;
                    }
                    return this.createToken(tt, value, startLine, startCol);
                },
                stringToken: function (first, startLine, startCol) {
                    var delim = first, string = first, reader = this._reader, prev = first, tt = Tokens.STRING, c = reader.read();
                    while (c) {
                        string += c;
                        if (c === delim && prev !== "\\") {
                            break;
                        }
                        if (isNewLine(reader.peek()) && c !== "\\") {
                            tt = Tokens.INVALID;
                            break;
                        }
                        prev = c;
                        c = reader.read();
                    }
                    if (c === null) {
                        tt = Tokens.INVALID;
                    }
                    return this.createToken(tt, string, startLine, startCol);
                },
                unicodeRangeToken: function (first, startLine, startCol) {
                    var reader = this._reader, value = first, temp, tt = Tokens.CHAR;
                    if (reader.peek() === "+") {
                        reader.mark();
                        value += reader.read();
                        value += this.readUnicodeRangePart(true);
                        if (value.length === 2) {
                            reader.reset();
                        }
                        else {
                            tt = Tokens.UNICODE_RANGE;
                            if (value.indexOf("?") === -1) {
                                if (reader.peek() === "-") {
                                    reader.mark();
                                    temp = reader.read();
                                    temp += this.readUnicodeRangePart(false);
                                    if (temp.length === 1) {
                                        reader.reset();
                                    }
                                    else {
                                        value += temp;
                                    }
                                }
                            }
                        }
                    }
                    return this.createToken(tt, value, startLine, startCol);
                },
                whitespaceToken: function (first, startLine, startCol) {
                    var value = first + this.readWhitespace();
                    return this.createToken(Tokens.S, value, startLine, startCol);
                },
                readUnicodeRangePart: function (allowQuestionMark) {
                    var reader = this._reader, part = "", c = reader.peek();
                    while (isHexDigit(c) && part.length < 6) {
                        reader.read();
                        part += c;
                        c = reader.peek();
                    }
                    if (allowQuestionMark) {
                        while (c === "?" && part.length < 6) {
                            reader.read();
                            part += c;
                            c = reader.peek();
                        }
                    }
                    return part;
                },
                readWhitespace: function () {
                    var reader = this._reader, whitespace = "", c = reader.peek();
                    while (isWhitespace(c)) {
                        reader.read();
                        whitespace += c;
                        c = reader.peek();
                    }
                    return whitespace;
                },
                readNumber: function (first) {
                    var reader = this._reader, number = first, hasDot = first === ".", c = reader.peek();
                    while (c) {
                        if (isDigit(c)) {
                            number += reader.read();
                        }
                        else if (c === ".") {
                            if (hasDot) {
                                break;
                            }
                            else {
                                hasDot = true;
                                number += reader.read();
                            }
                        }
                        else {
                            break;
                        }
                        c = reader.peek();
                    }
                    return number;
                },
                readString: function () {
                    var reader = this._reader, delim = reader.read(), string = delim, prev = delim, c = reader.peek();
                    while (c) {
                        c = reader.read();
                        string += c;
                        if (c === delim && prev !== "\\") {
                            break;
                        }
                        if (isNewLine(reader.peek()) && c !== "\\") {
                            string = "";
                            break;
                        }
                        prev = c;
                        c = reader.peek();
                    }
                    if (c === null) {
                        string = "";
                    }
                    return string;
                },
                readURI: function (first) {
                    var reader = this._reader, uri = first, inner = "", c = reader.peek();
                    reader.mark();
                    while (c && isWhitespace(c)) {
                        reader.read();
                        c = reader.peek();
                    }
                    if (c === "'" || c === '"') {
                        inner = this.readString();
                    }
                    else {
                        inner = this.readURL();
                    }
                    c = reader.peek();
                    while (c && isWhitespace(c)) {
                        reader.read();
                        c = reader.peek();
                    }
                    if (inner === "" || c !== ")") {
                        uri = first;
                        reader.reset();
                    }
                    else {
                        uri += inner + reader.read();
                    }
                    return uri;
                },
                readURL: function () {
                    var reader = this._reader, url = "", c = reader.peek();
                    while (/^[!#$%&\\*-~]$/.test(c)) {
                        url += reader.read();
                        c = reader.peek();
                    }
                    return url;
                },
                readName: function (first) {
                    var reader = this._reader, ident = first || "", c = reader.peek();
                    while (true) {
                        if (c === "\\") {
                            ident += this.readEscape(reader.read());
                            c = reader.peek();
                        }
                        else if (c && isNameChar(c)) {
                            ident += reader.read();
                            c = reader.peek();
                        }
                        else {
                            break;
                        }
                    }
                    return ident;
                },
                readEscape: function (first) {
                    var reader = this._reader, cssEscape = first || "", i = 0, c = reader.peek();
                    if (isHexDigit(c)) {
                        do {
                            cssEscape += reader.read();
                            c = reader.peek();
                        } while (c && isHexDigit(c) && ++i < 6);
                    }
                    if (cssEscape.length === 3 && /\s/.test(c) || cssEscape.length === 7 || cssEscape.length === 1) {
                        reader.read();
                    }
                    else {
                        c = "";
                    }
                    return cssEscape + c;
                },
                readComment: function (first) {
                    var reader = this._reader, comment = first || "", c = reader.read();
                    if (c === "*") {
                        while (c) {
                            comment += c;
                            if (comment.length > 2 && c === "*" && reader.peek() === "/") {
                                comment += reader.read();
                                break;
                            }
                            c = reader.read();
                        }
                        return comment;
                    }
                    else {
                        return "";
                    }
                }
            });
            var Tokens = [
                { name: "CDO" },
                { name: "CDC" },
                { name: "S", whitespace: true },
                { name: "COMMENT", comment: true, hide: true, channel: "comment" },
                { name: "INCLUDES", text: "~=" },
                { name: "DASHMATCH", text: "|=" },
                { name: "PREFIXMATCH", text: "^=" },
                { name: "SUFFIXMATCH", text: "$=" },
                { name: "SUBSTRINGMATCH", text: "*=" },
                { name: "STRING" },
                { name: "IDENT" },
                { name: "HASH" },
                { name: "IMPORT_SYM", text: "@import" },
                { name: "PAGE_SYM", text: "@page" },
                { name: "MEDIA_SYM", text: "@media" },
                { name: "FONT_FACE_SYM", text: "@font-face" },
                { name: "CHARSET_SYM", text: "@charset" },
                { name: "NAMESPACE_SYM", text: "@namespace" },
                { name: "VIEWPORT_SYM", text: ["@viewport", "@-ms-viewport", "@-o-viewport"] },
                { name: "DOCUMENT_SYM", text: ["@document", "@-moz-document"] },
                { name: "UNKNOWN_SYM" },
                { name: "KEYFRAMES_SYM", text: ["@keyframes", "@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes"] },
                { name: "IMPORTANT_SYM" },
                { name: "LENGTH" },
                { name: "ANGLE" },
                { name: "TIME" },
                { name: "FREQ" },
                { name: "DIMENSION" },
                { name: "PERCENTAGE" },
                { name: "NUMBER" },
                { name: "URI" },
                { name: "FUNCTION" },
                { name: "UNICODE_RANGE" },
                { name: "INVALID" },
                { name: "PLUS", text: "+" },
                { name: "GREATER", text: ">" },
                { name: "COMMA", text: "," },
                { name: "TILDE", text: "~" },
                { name: "NOT" },
                { name: "TOPLEFTCORNER_SYM", text: "@top-left-corner" },
                { name: "TOPLEFT_SYM", text: "@top-left" },
                { name: "TOPCENTER_SYM", text: "@top-center" },
                { name: "TOPRIGHT_SYM", text: "@top-right" },
                { name: "TOPRIGHTCORNER_SYM", text: "@top-right-corner" },
                { name: "BOTTOMLEFTCORNER_SYM", text: "@bottom-left-corner" },
                { name: "BOTTOMLEFT_SYM", text: "@bottom-left" },
                { name: "BOTTOMCENTER_SYM", text: "@bottom-center" },
                { name: "BOTTOMRIGHT_SYM", text: "@bottom-right" },
                { name: "BOTTOMRIGHTCORNER_SYM", text: "@bottom-right-corner" },
                { name: "LEFTTOP_SYM", text: "@left-top" },
                { name: "LEFTMIDDLE_SYM", text: "@left-middle" },
                { name: "LEFTBOTTOM_SYM", text: "@left-bottom" },
                { name: "RIGHTTOP_SYM", text: "@right-top" },
                { name: "RIGHTMIDDLE_SYM", text: "@right-middle" },
                { name: "RIGHTBOTTOM_SYM", text: "@right-bottom" },
                { name: "RESOLUTION", state: "media" },
                { name: "IE_FUNCTION" },
                { name: "CHAR" },
                {
                    name: "PIPE",
                    text: "|"
                },
                {
                    name: "SLASH",
                    text: "/"
                },
                {
                    name: "MINUS",
                    text: "-"
                },
                {
                    name: "STAR",
                    text: "*"
                },
                {
                    name: "LBRACE",
                    endChar: "}",
                    text: "{"
                },
                {
                    name: "RBRACE",
                    text: "}"
                },
                {
                    name: "LBRACKET",
                    endChar: "]",
                    text: "["
                },
                {
                    name: "RBRACKET",
                    text: "]"
                },
                {
                    name: "EQUALS",
                    text: "="
                },
                {
                    name: "COLON",
                    text: ":"
                },
                {
                    name: "SEMICOLON",
                    text: ";"
                },
                {
                    name: "LPAREN",
                    endChar: ")",
                    text: "("
                },
                {
                    name: "RPAREN",
                    text: ")"
                },
                {
                    name: "DOT",
                    text: "."
                }
            ];
            (function () {
                var nameMap = [], typeMap = /* @__PURE__ */ Object.create(null);
                Tokens.UNKNOWN = -1;
                Tokens.unshift({ name: "EOF" });
                for (var i = 0, len = Tokens.length; i < len; i++) {
                    nameMap.push(Tokens[i].name);
                    Tokens[Tokens[i].name] = i;
                    if (Tokens[i].text) {
                        if (Tokens[i].text instanceof Array) {
                            for (var j = 0; j < Tokens[i].text.length; j++) {
                                typeMap[Tokens[i].text[j]] = i;
                            }
                        }
                        else {
                            typeMap[Tokens[i].text] = i;
                        }
                    }
                }
                Tokens.name = function (tt) {
                    return nameMap[tt];
                };
                Tokens.type = function (c) {
                    return typeMap[c] || -1;
                };
            })();
            var Validation = {
                validate: function (property, value) {
                    var name = property.toString().toLowerCase(), expression = new PropertyValueIterator(value), spec = Properties[name];
                    if (!spec) {
                        if (name.indexOf("-") !== 0) {
                            throw new ValidationError("Unknown property '" + property + "'.", property.line, property.col);
                        }
                    }
                    else if (typeof spec !== "number") {
                        if (typeof spec === "string") {
                            if (spec.indexOf("||") > -1) {
                                this.groupProperty(spec, expression);
                            }
                            else {
                                this.singleProperty(spec, expression, 1);
                            }
                        }
                        else if (spec.multi) {
                            this.multiProperty(spec.multi, expression, spec.comma, spec.max || Infinity);
                        }
                        else if (typeof spec === "function") {
                            spec(expression);
                        }
                    }
                },
                singleProperty: function (types, expression, max, partial) {
                    var result = false, value = expression.value, count = 0, part;
                    while (expression.hasNext() && count < max) {
                        result = ValidationTypes.isAny(expression, types);
                        if (!result) {
                            break;
                        }
                        count++;
                    }
                    if (!result) {
                        if (expression.hasNext() && !expression.isFirst()) {
                            part = expression.peek();
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
                        }
                    }
                    else if (expression.hasNext()) {
                        part = expression.next();
                        throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                    }
                },
                multiProperty: function (types, expression, comma, max) {
                    var result = false, value = expression.value, count = 0, part;
                    while (expression.hasNext() && !result && count < max) {
                        if (ValidationTypes.isAny(expression, types)) {
                            count++;
                            if (!expression.hasNext()) {
                                result = true;
                            }
                            else if (comma) {
                                if (String(expression.peek()) === ",") {
                                    part = expression.next();
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            break;
                        }
                    }
                    if (!result) {
                        if (expression.hasNext() && !expression.isFirst()) {
                            part = expression.peek();
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            part = expression.previous();
                            if (comma && String(part) === ",") {
                                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                            }
                            else {
                                throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
                            }
                        }
                    }
                    else if (expression.hasNext()) {
                        part = expression.next();
                        throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                    }
                },
                groupProperty: function (types, expression, comma) {
                    var result = false, value = expression.value, typeCount = types.split("||").length, groups = { count: 0 }, partial = false, name, part;
                    while (expression.hasNext() && !result) {
                        name = ValidationTypes.isAnyOfGroup(expression, types);
                        if (name) {
                            if (groups[name]) {
                                break;
                            }
                            else {
                                groups[name] = 1;
                                groups.count++;
                                partial = true;
                                if (groups.count === typeCount || !expression.hasNext()) {
                                    result = true;
                                }
                            }
                        }
                        else {
                            break;
                        }
                    }
                    if (!result) {
                        if (partial && expression.hasNext()) {
                            part = expression.peek();
                            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                        }
                        else {
                            throw new ValidationError("Expected (" + types + ") but found '" + value + "'.", value.line, value.col);
                        }
                    }
                    else if (expression.hasNext()) {
                        part = expression.next();
                        throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                    }
                }
            };
            function ValidationError(message, line, col) {
                this.col = col;
                this.line = line;
                this.message = message;
            }
            ValidationError.prototype = new Error();
            var ValidationTypes = {
                isLiteral: function (part, literals) {
                    var text = part.text.toString().toLowerCase(), args = literals.split(" | "), i, len, found = false;
                    for (i = 0, len = args.length; i < len && !found; i++) {
                        if (text === args[i].toLowerCase()) {
                            found = true;
                        }
                    }
                    return found;
                },
                isSimple: function (type) {
                    return !!this.simple[type];
                },
                isComplex: function (type) {
                    return !!this.complex[type];
                },
                isAny: function (expression, types) {
                    var args = types.split(" | "), i, len, found = false;
                    for (i = 0, len = args.length; i < len && !found && expression.hasNext(); i++) {
                        found = this.isType(expression, args[i]);
                    }
                    return found;
                },
                isAnyOfGroup: function (expression, types) {
                    var args = types.split(" || "), i, len, found = false;
                    for (i = 0, len = args.length; i < len && !found; i++) {
                        found = this.isType(expression, args[i]);
                    }
                    return found ? args[i - 1] : false;
                },
                isType: function (expression, type) {
                    var part = expression.peek(), result = false;
                    if (type.charAt(0) !== "<") {
                        result = this.isLiteral(part, type);
                        if (result) {
                            expression.next();
                        }
                    }
                    else if (this.simple[type]) {
                        result = this.simple[type](part);
                        if (result) {
                            expression.next();
                        }
                    }
                    else {
                        result = this.complex[type](expression);
                    }
                    return result;
                },
                simple: {
                    __proto__: null,
                    "<absolute-size>": function (part) {
                        return ValidationTypes.isLiteral(part, "xx-small | x-small | small | medium | large | x-large | xx-large");
                    },
                    "<attachment>": function (part) {
                        return ValidationTypes.isLiteral(part, "scroll | fixed | local");
                    },
                    "<attr>": function (part) {
                        return part.type === "function" && part.name === "attr";
                    },
                    "<bg-image>": function (part) {
                        return this["<image>"](part) || this["<gradient>"](part) || String(part) === "none";
                    },
                    "<gradient>": function (part) {
                        return part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i.test(part);
                    },
                    "<box>": function (part) {
                        return ValidationTypes.isLiteral(part, "padding-box | border-box | content-box");
                    },
                    "<content>": function (part) {
                        return part.type === "function" && part.name === "content";
                    },
                    "<relative-size>": function (part) {
                        return ValidationTypes.isLiteral(part, "smaller | larger");
                    },
                    "<ident>": function (part) {
                        return part.type === "identifier";
                    },
                    "<length>": function (part) {
                        if (part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?calc/i.test(part)) {
                            return true;
                        }
                        else {
                            return part.type === "length" || part.type === "number" || part.type === "integer" || String(part) === "0";
                        }
                    },
                    "<color>": function (part) {
                        return part.type === "color" || String(part) === "transparent" || String(part) === "currentColor";
                    },
                    "<number>": function (part) {
                        return part.type === "number" || this["<integer>"](part);
                    },
                    "<integer>": function (part) {
                        return part.type === "integer";
                    },
                    "<line>": function (part) {
                        return part.type === "integer";
                    },
                    "<angle>": function (part) {
                        return part.type === "angle";
                    },
                    "<uri>": function (part) {
                        return part.type === "uri";
                    },
                    "<image>": function (part) {
                        return this["<uri>"](part);
                    },
                    "<percentage>": function (part) {
                        return part.type === "percentage" || String(part) === "0";
                    },
                    "<border-width>": function (part) {
                        return this["<length>"](part) || ValidationTypes.isLiteral(part, "thin | medium | thick");
                    },
                    "<border-style>": function (part) {
                        return ValidationTypes.isLiteral(part, "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset");
                    },
                    "<content-sizing>": function (part) {
                        return ValidationTypes.isLiteral(part, "fill-available | -moz-available | -webkit-fill-available | max-content | -moz-max-content | -webkit-max-content | min-content | -moz-min-content | -webkit-min-content | fit-content | -moz-fit-content | -webkit-fit-content");
                    },
                    "<margin-width>": function (part) {
                        return this["<length>"](part) || this["<percentage>"](part) || ValidationTypes.isLiteral(part, "auto");
                    },
                    "<padding-width>": function (part) {
                        return this["<length>"](part) || this["<percentage>"](part);
                    },
                    "<shape>": function (part) {
                        return part.type === "function" && (part.name === "rect" || part.name === "inset-rect");
                    },
                    "<time>": function (part) {
                        return part.type === "time";
                    },
                    "<flex-grow>": function (part) {
                        return this["<number>"](part);
                    },
                    "<flex-shrink>": function (part) {
                        return this["<number>"](part);
                    },
                    "<width>": function (part) {
                        return this["<margin-width>"](part);
                    },
                    "<flex-basis>": function (part) {
                        return this["<width>"](part);
                    },
                    "<flex-direction>": function (part) {
                        return ValidationTypes.isLiteral(part, "row | row-reverse | column | column-reverse");
                    },
                    "<flex-wrap>": function (part) {
                        return ValidationTypes.isLiteral(part, "nowrap | wrap | wrap-reverse");
                    },
                    "<feature-tag-value>": function (part) {
                        return part.type === "function" && /^[A-Z0-9]{4}$/i.test(part);
                    }
                },
                complex: {
                    __proto__: null,
                    "<bg-position>": function (expression) {
                        var result = false, numeric = "<percentage> | <length>", xDir = "left | right", yDir = "top | bottom", count = 0;
                        while (expression.peek(count) && expression.peek(count).text !== ",") {
                            count++;
                        }
                        if (count < 3) {
                            if (ValidationTypes.isAny(expression, xDir + " | center | " + numeric)) {
                                result = true;
                                ValidationTypes.isAny(expression, yDir + " | center | " + numeric);
                            }
                            else if (ValidationTypes.isAny(expression, yDir)) {
                                result = true;
                                ValidationTypes.isAny(expression, xDir + " | center");
                            }
                        }
                        else {
                            if (ValidationTypes.isAny(expression, xDir)) {
                                if (ValidationTypes.isAny(expression, yDir)) {
                                    result = true;
                                    ValidationTypes.isAny(expression, numeric);
                                }
                                else if (ValidationTypes.isAny(expression, numeric)) {
                                    if (ValidationTypes.isAny(expression, yDir)) {
                                        result = true;
                                        ValidationTypes.isAny(expression, numeric);
                                    }
                                    else if (ValidationTypes.isAny(expression, "center")) {
                                        result = true;
                                    }
                                }
                            }
                            else if (ValidationTypes.isAny(expression, yDir)) {
                                if (ValidationTypes.isAny(expression, xDir)) {
                                    result = true;
                                    ValidationTypes.isAny(expression, numeric);
                                }
                                else if (ValidationTypes.isAny(expression, numeric)) {
                                    if (ValidationTypes.isAny(expression, xDir)) {
                                        result = true;
                                        ValidationTypes.isAny(expression, numeric);
                                    }
                                    else if (ValidationTypes.isAny(expression, "center")) {
                                        result = true;
                                    }
                                }
                            }
                            else if (ValidationTypes.isAny(expression, "center")) {
                                if (ValidationTypes.isAny(expression, xDir + " | " + yDir)) {
                                    result = true;
                                    ValidationTypes.isAny(expression, numeric);
                                }
                            }
                        }
                        return result;
                    },
                    "<bg-size>": function (expression) {
                        var result = false, numeric = "<percentage> | <length> | auto";
                        if (ValidationTypes.isAny(expression, "cover | contain")) {
                            result = true;
                        }
                        else if (ValidationTypes.isAny(expression, numeric)) {
                            result = true;
                            ValidationTypes.isAny(expression, numeric);
                        }
                        return result;
                    },
                    "<repeat-style>": function (expression) {
                        var result = false, values = "repeat | space | round | no-repeat", part;
                        if (expression.hasNext()) {
                            part = expression.next();
                            if (ValidationTypes.isLiteral(part, "repeat-x | repeat-y")) {
                                result = true;
                            }
                            else if (ValidationTypes.isLiteral(part, values)) {
                                result = true;
                                if (expression.hasNext() && ValidationTypes.isLiteral(expression.peek(), values)) {
                                    expression.next();
                                }
                            }
                        }
                        return result;
                    },
                    "<shadow>": function (expression) {
                        var result = false, count = 0, inset = false, color = false;
                        if (expression.hasNext()) {
                            if (ValidationTypes.isAny(expression, "inset")) {
                                inset = true;
                            }
                            if (ValidationTypes.isAny(expression, "<color>")) {
                                color = true;
                            }
                            while (ValidationTypes.isAny(expression, "<length>") && count < 4) {
                                count++;
                            }
                            if (expression.hasNext()) {
                                if (!color) {
                                    ValidationTypes.isAny(expression, "<color>");
                                }
                                if (!inset) {
                                    ValidationTypes.isAny(expression, "inset");
                                }
                            }
                            result = count >= 2 && count <= 4;
                        }
                        return result;
                    },
                    "<x-one-radius>": function (expression) {
                        var result = false, simple = "<length> | <percentage> | inherit";
                        if (ValidationTypes.isAny(expression, simple)) {
                            result = true;
                            ValidationTypes.isAny(expression, simple);
                        }
                        return result;
                    },
                    "<flex>": function (expression) {
                        var part, result = false;
                        if (ValidationTypes.isAny(expression, "none | inherit")) {
                            result = true;
                        }
                        else {
                            if (ValidationTypes.isType(expression, "<flex-grow>")) {
                                if (expression.peek()) {
                                    if (ValidationTypes.isType(expression, "<flex-shrink>")) {
                                        if (expression.peek()) {
                                            result = ValidationTypes.isType(expression, "<flex-basis>");
                                        }
                                        else {
                                            result = true;
                                        }
                                    }
                                    else if (ValidationTypes.isType(expression, "<flex-basis>")) {
                                        result = expression.peek() === null;
                                    }
                                }
                                else {
                                    result = true;
                                }
                            }
                            else if (ValidationTypes.isType(expression, "<flex-basis>")) {
                                result = true;
                            }
                        }
                        if (!result) {
                            part = expression.peek();
                            throw new ValidationError("Expected (none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]) but found '" + expression.value.text + "'.", part.line, part.col);
                        }
                        return result;
                    }
                }
            };
            parserlib.css = {
                __proto__: null,
                Colors,
                Combinator,
                Parser,
                PropertyName,
                PropertyValue,
                PropertyValuePart,
                MediaFeature,
                MediaQuery,
                Selector,
                SelectorPart,
                SelectorSubPart,
                Specificity,
                TokenStream,
                Tokens,
                ValidationError
            };
        })();
        (function () {
            for (var prop in parserlib) {
                exports[prop] = parserlib[prop];
            }
        })();
    }
});
// external/npm/node_modules/domino/lib/CSSStyleDeclaration.js
var require_CSSStyleDeclaration = __commonJS({
    "external/npm/node_modules/domino/lib/CSSStyleDeclaration.js"(exports, module) {
        "use strict";
        var parserlib = require_cssparser();
        module.exports = CSSStyleDeclaration;
        function CSSStyleDeclaration(elt) {
            this._element = elt;
        }
        function parseStyles(s) {
            var parser = new parserlib.css.Parser();
            var result = { property: /* @__PURE__ */ Object.create(null), priority: /* @__PURE__ */ Object.create(null) };
            parser.addListener("property", function (e) {
                if (e.invalid)
                    return;
                result.property[e.property.text] = e.value.text;
                if (e.important)
                    result.priority[e.property.text] = "important";
            });
            s = ("" + s).replace(/^;/, "");
            parser.parseStyleAttribute(s);
            return result;
        }
        var NO_CHANGE = {};
        CSSStyleDeclaration.prototype = Object.create(Object.prototype, {
            _parsed: { get: function () {
                    if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
                        var text = this.cssText;
                        this._parsedStyles = parseStyles(text);
                        this._lastParsedText = text;
                        delete this._names;
                    }
                    return this._parsedStyles;
                } },
            _serialize: { value: function () {
                    var styles = this._parsed;
                    var s = "";
                    for (var name in styles.property) {
                        if (s)
                            s += " ";
                        s += name + ": " + styles.property[name];
                        if (styles.priority[name]) {
                            s += " !" + styles.priority[name];
                        }
                        s += ";";
                    }
                    this.cssText = s;
                    this._lastParsedText = s;
                    delete this._names;
                } },
            cssText: {
                get: function () {
                    return this._element.getAttribute("style");
                },
                set: function (value) {
                    this._element.setAttribute("style", value);
                }
            },
            length: { get: function () {
                    if (!this._names)
                        this._names = Object.getOwnPropertyNames(this._parsed.property);
                    return this._names.length;
                } },
            item: { value: function (n) {
                    if (!this._names)
                        this._names = Object.getOwnPropertyNames(this._parsed.property);
                    return this._names[n];
                } },
            getPropertyValue: { value: function (property) {
                    property = property.toLowerCase();
                    return this._parsed.property[property] || "";
                } },
            getPropertyPriority: { value: function (property) {
                    property = property.toLowerCase();
                    return this._parsed.priority[property] || "";
                } },
            setProperty: { value: function (property, value, priority) {
                    property = property.toLowerCase();
                    if (value === null || value === void 0) {
                        value = "";
                    }
                    if (priority === null || priority === void 0) {
                        priority = "";
                    }
                    if (value !== NO_CHANGE) {
                        value = "" + value;
                    }
                    if (value === "") {
                        this.removeProperty(property);
                        return;
                    }
                    if (priority !== "" && priority !== NO_CHANGE && !/^important$/i.test(priority)) {
                        return;
                    }
                    var styles = this._parsed;
                    if (value === NO_CHANGE) {
                        if (!styles.property[property]) {
                            return;
                        }
                        if (priority !== "") {
                            styles.priority[property] = "important";
                        }
                        else {
                            delete styles.priority[property];
                        }
                    }
                    else {
                        if (value.indexOf(";") !== -1)
                            return;
                        var newprops = parseStyles(property + ":" + value);
                        if (Object.getOwnPropertyNames(newprops.property).length === 0) {
                            return;
                        }
                        if (Object.getOwnPropertyNames(newprops.priority).length !== 0) {
                            return;
                        }
                        for (var p in newprops.property) {
                            styles.property[p] = newprops.property[p];
                            if (priority === NO_CHANGE) {
                                continue;
                            }
                            else if (priority !== "") {
                                styles.priority[p] = "important";
                            }
                            else if (styles.priority[p]) {
                                delete styles.priority[p];
                            }
                        }
                    }
                    this._serialize();
                } },
            setPropertyValue: { value: function (property, value) {
                    return this.setProperty(property, value, NO_CHANGE);
                } },
            setPropertyPriority: { value: function (property, priority) {
                    return this.setProperty(property, NO_CHANGE, priority);
                } },
            removeProperty: { value: function (property) {
                    property = property.toLowerCase();
                    var styles = this._parsed;
                    if (property in styles.property) {
                        delete styles.property[property];
                        delete styles.priority[property];
                        this._serialize();
                    }
                } }
        });
        var cssProperties = {
            alignContent: "align-content",
            alignItems: "align-items",
            alignmentBaseline: "alignment-baseline",
            alignSelf: "align-self",
            animation: "animation",
            animationDelay: "animation-delay",
            animationDirection: "animation-direction",
            animationDuration: "animation-duration",
            animationFillMode: "animation-fill-mode",
            animationIterationCount: "animation-iteration-count",
            animationName: "animation-name",
            animationPlayState: "animation-play-state",
            animationTimingFunction: "animation-timing-function",
            backfaceVisibility: "backface-visibility",
            background: "background",
            backgroundAttachment: "background-attachment",
            backgroundClip: "background-clip",
            backgroundColor: "background-color",
            backgroundImage: "background-image",
            backgroundOrigin: "background-origin",
            backgroundPosition: "background-position",
            backgroundPositionX: "background-position-x",
            backgroundPositionY: "background-position-y",
            backgroundRepeat: "background-repeat",
            backgroundSize: "background-size",
            baselineShift: "baseline-shift",
            border: "border",
            borderBottom: "border-bottom",
            borderBottomColor: "border-bottom-color",
            borderBottomLeftRadius: "border-bottom-left-radius",
            borderBottomRightRadius: "border-bottom-right-radius",
            borderBottomStyle: "border-bottom-style",
            borderBottomWidth: "border-bottom-width",
            borderCollapse: "border-collapse",
            borderColor: "border-color",
            borderImage: "border-image",
            borderImageOutset: "border-image-outset",
            borderImageRepeat: "border-image-repeat",
            borderImageSlice: "border-image-slice",
            borderImageSource: "border-image-source",
            borderImageWidth: "border-image-width",
            borderLeft: "border-left",
            borderLeftColor: "border-left-color",
            borderLeftStyle: "border-left-style",
            borderLeftWidth: "border-left-width",
            borderRadius: "border-radius",
            borderRight: "border-right",
            borderRightColor: "border-right-color",
            borderRightStyle: "border-right-style",
            borderRightWidth: "border-right-width",
            borderSpacing: "border-spacing",
            borderStyle: "border-style",
            borderTop: "border-top",
            borderTopColor: "border-top-color",
            borderTopLeftRadius: "border-top-left-radius",
            borderTopRightRadius: "border-top-right-radius",
            borderTopStyle: "border-top-style",
            borderTopWidth: "border-top-width",
            borderWidth: "border-width",
            bottom: "bottom",
            boxShadow: "box-shadow",
            boxSizing: "box-sizing",
            breakAfter: "break-after",
            breakBefore: "break-before",
            breakInside: "break-inside",
            captionSide: "caption-side",
            clear: "clear",
            clip: "clip",
            clipPath: "clip-path",
            clipRule: "clip-rule",
            color: "color",
            colorInterpolationFilters: "color-interpolation-filters",
            columnCount: "column-count",
            columnFill: "column-fill",
            columnGap: "column-gap",
            columnRule: "column-rule",
            columnRuleColor: "column-rule-color",
            columnRuleStyle: "column-rule-style",
            columnRuleWidth: "column-rule-width",
            columns: "columns",
            columnSpan: "column-span",
            columnWidth: "column-width",
            content: "content",
            counterIncrement: "counter-increment",
            counterReset: "counter-reset",
            cssFloat: "float",
            cursor: "cursor",
            direction: "direction",
            display: "display",
            dominantBaseline: "dominant-baseline",
            emptyCells: "empty-cells",
            enableBackground: "enable-background",
            fill: "fill",
            fillOpacity: "fill-opacity",
            fillRule: "fill-rule",
            filter: "filter",
            flex: "flex",
            flexBasis: "flex-basis",
            flexDirection: "flex-direction",
            flexFlow: "flex-flow",
            flexGrow: "flex-grow",
            flexShrink: "flex-shrink",
            flexWrap: "flex-wrap",
            floodColor: "flood-color",
            floodOpacity: "flood-opacity",
            font: "font",
            fontFamily: "font-family",
            fontFeatureSettings: "font-feature-settings",
            fontSize: "font-size",
            fontSizeAdjust: "font-size-adjust",
            fontStretch: "font-stretch",
            fontStyle: "font-style",
            fontVariant: "font-variant",
            fontWeight: "font-weight",
            glyphOrientationHorizontal: "glyph-orientation-horizontal",
            glyphOrientationVertical: "glyph-orientation-vertical",
            grid: "grid",
            gridArea: "grid-area",
            gridAutoColumns: "grid-auto-columns",
            gridAutoFlow: "grid-auto-flow",
            gridAutoRows: "grid-auto-rows",
            gridColumn: "grid-column",
            gridColumnEnd: "grid-column-end",
            gridColumnGap: "grid-column-gap",
            gridColumnStart: "grid-column-start",
            gridGap: "grid-gap",
            gridRow: "grid-row",
            gridRowEnd: "grid-row-end",
            gridRowGap: "grid-row-gap",
            gridRowStart: "grid-row-start",
            gridTemplate: "grid-template",
            gridTemplateAreas: "grid-template-areas",
            gridTemplateColumns: "grid-template-columns",
            gridTemplateRows: "grid-template-rows",
            height: "height",
            imeMode: "ime-mode",
            justifyContent: "justify-content",
            kerning: "kerning",
            layoutGrid: "layout-grid",
            layoutGridChar: "layout-grid-char",
            layoutGridLine: "layout-grid-line",
            layoutGridMode: "layout-grid-mode",
            layoutGridType: "layout-grid-type",
            left: "left",
            letterSpacing: "letter-spacing",
            lightingColor: "lighting-color",
            lineBreak: "line-break",
            lineHeight: "line-height",
            listStyle: "list-style",
            listStyleImage: "list-style-image",
            listStylePosition: "list-style-position",
            listStyleType: "list-style-type",
            margin: "margin",
            marginBottom: "margin-bottom",
            marginLeft: "margin-left",
            marginRight: "margin-right",
            marginTop: "margin-top",
            marker: "marker",
            markerEnd: "marker-end",
            markerMid: "marker-mid",
            markerStart: "marker-start",
            mask: "mask",
            maxHeight: "max-height",
            maxWidth: "max-width",
            minHeight: "min-height",
            minWidth: "min-width",
            msContentZoomChaining: "-ms-content-zoom-chaining",
            msContentZooming: "-ms-content-zooming",
            msContentZoomLimit: "-ms-content-zoom-limit",
            msContentZoomLimitMax: "-ms-content-zoom-limit-max",
            msContentZoomLimitMin: "-ms-content-zoom-limit-min",
            msContentZoomSnap: "-ms-content-zoom-snap",
            msContentZoomSnapPoints: "-ms-content-zoom-snap-points",
            msContentZoomSnapType: "-ms-content-zoom-snap-type",
            msFlowFrom: "-ms-flow-from",
            msFlowInto: "-ms-flow-into",
            msFontFeatureSettings: "-ms-font-feature-settings",
            msGridColumn: "-ms-grid-column",
            msGridColumnAlign: "-ms-grid-column-align",
            msGridColumns: "-ms-grid-columns",
            msGridColumnSpan: "-ms-grid-column-span",
            msGridRow: "-ms-grid-row",
            msGridRowAlign: "-ms-grid-row-align",
            msGridRows: "-ms-grid-rows",
            msGridRowSpan: "-ms-grid-row-span",
            msHighContrastAdjust: "-ms-high-contrast-adjust",
            msHyphenateLimitChars: "-ms-hyphenate-limit-chars",
            msHyphenateLimitLines: "-ms-hyphenate-limit-lines",
            msHyphenateLimitZone: "-ms-hyphenate-limit-zone",
            msHyphens: "-ms-hyphens",
            msImeAlign: "-ms-ime-align",
            msOverflowStyle: "-ms-overflow-style",
            msScrollChaining: "-ms-scroll-chaining",
            msScrollLimit: "-ms-scroll-limit",
            msScrollLimitXMax: "-ms-scroll-limit-x-max",
            msScrollLimitXMin: "-ms-scroll-limit-x-min",
            msScrollLimitYMax: "-ms-scroll-limit-y-max",
            msScrollLimitYMin: "-ms-scroll-limit-y-min",
            msScrollRails: "-ms-scroll-rails",
            msScrollSnapPointsX: "-ms-scroll-snap-points-x",
            msScrollSnapPointsY: "-ms-scroll-snap-points-y",
            msScrollSnapType: "-ms-scroll-snap-type",
            msScrollSnapX: "-ms-scroll-snap-x",
            msScrollSnapY: "-ms-scroll-snap-y",
            msScrollTranslation: "-ms-scroll-translation",
            msTextCombineHorizontal: "-ms-text-combine-horizontal",
            msTextSizeAdjust: "-ms-text-size-adjust",
            msTouchAction: "-ms-touch-action",
            msTouchSelect: "-ms-touch-select",
            msUserSelect: "-ms-user-select",
            msWrapFlow: "-ms-wrap-flow",
            msWrapMargin: "-ms-wrap-margin",
            msWrapThrough: "-ms-wrap-through",
            opacity: "opacity",
            order: "order",
            orphans: "orphans",
            outline: "outline",
            outlineColor: "outline-color",
            outlineOffset: "outline-offset",
            outlineStyle: "outline-style",
            outlineWidth: "outline-width",
            overflow: "overflow",
            overflowX: "overflow-x",
            overflowY: "overflow-y",
            padding: "padding",
            paddingBottom: "padding-bottom",
            paddingLeft: "padding-left",
            paddingRight: "padding-right",
            paddingTop: "padding-top",
            page: "page",
            pageBreakAfter: "page-break-after",
            pageBreakBefore: "page-break-before",
            pageBreakInside: "page-break-inside",
            perspective: "perspective",
            perspectiveOrigin: "perspective-origin",
            pointerEvents: "pointer-events",
            position: "position",
            quotes: "quotes",
            right: "right",
            rotate: "rotate",
            rubyAlign: "ruby-align",
            rubyOverhang: "ruby-overhang",
            rubyPosition: "ruby-position",
            scale: "scale",
            size: "size",
            stopColor: "stop-color",
            stopOpacity: "stop-opacity",
            stroke: "stroke",
            strokeDasharray: "stroke-dasharray",
            strokeDashoffset: "stroke-dashoffset",
            strokeLinecap: "stroke-linecap",
            strokeLinejoin: "stroke-linejoin",
            strokeMiterlimit: "stroke-miterlimit",
            strokeOpacity: "stroke-opacity",
            strokeWidth: "stroke-width",
            tableLayout: "table-layout",
            textAlign: "text-align",
            textAlignLast: "text-align-last",
            textAnchor: "text-anchor",
            textDecoration: "text-decoration",
            textIndent: "text-indent",
            textJustify: "text-justify",
            textKashida: "text-kashida",
            textKashidaSpace: "text-kashida-space",
            textOverflow: "text-overflow",
            textShadow: "text-shadow",
            textTransform: "text-transform",
            textUnderlinePosition: "text-underline-position",
            top: "top",
            touchAction: "touch-action",
            transform: "transform",
            transformOrigin: "transform-origin",
            transformStyle: "transform-style",
            transition: "transition",
            transitionDelay: "transition-delay",
            transitionDuration: "transition-duration",
            transitionProperty: "transition-property",
            transitionTimingFunction: "transition-timing-function",
            translate: "translate",
            unicodeBidi: "unicode-bidi",
            verticalAlign: "vertical-align",
            visibility: "visibility",
            webkitAlignContent: "-webkit-align-content",
            webkitAlignItems: "-webkit-align-items",
            webkitAlignSelf: "-webkit-align-self",
            webkitAnimation: "-webkit-animation",
            webkitAnimationDelay: "-webkit-animation-delay",
            webkitAnimationDirection: "-webkit-animation-direction",
            webkitAnimationDuration: "-webkit-animation-duration",
            webkitAnimationFillMode: "-webkit-animation-fill-mode",
            webkitAnimationIterationCount: "-webkit-animation-iteration-count",
            webkitAnimationName: "-webkit-animation-name",
            webkitAnimationPlayState: "-webkit-animation-play-state",
            webkitAnimationTimingFunction: "-webkit-animation-timing-funciton",
            webkitAppearance: "-webkit-appearance",
            webkitBackfaceVisibility: "-webkit-backface-visibility",
            webkitBackgroundClip: "-webkit-background-clip",
            webkitBackgroundOrigin: "-webkit-background-origin",
            webkitBackgroundSize: "-webkit-background-size",
            webkitBorderBottomLeftRadius: "-webkit-border-bottom-left-radius",
            webkitBorderBottomRightRadius: "-webkit-border-bottom-right-radius",
            webkitBorderImage: "-webkit-border-image",
            webkitBorderRadius: "-webkit-border-radius",
            webkitBorderTopLeftRadius: "-webkit-border-top-left-radius",
            webkitBorderTopRightRadius: "-webkit-border-top-right-radius",
            webkitBoxAlign: "-webkit-box-align",
            webkitBoxDirection: "-webkit-box-direction",
            webkitBoxFlex: "-webkit-box-flex",
            webkitBoxOrdinalGroup: "-webkit-box-ordinal-group",
            webkitBoxOrient: "-webkit-box-orient",
            webkitBoxPack: "-webkit-box-pack",
            webkitBoxSizing: "-webkit-box-sizing",
            webkitColumnBreakAfter: "-webkit-column-break-after",
            webkitColumnBreakBefore: "-webkit-column-break-before",
            webkitColumnBreakInside: "-webkit-column-break-inside",
            webkitColumnCount: "-webkit-column-count",
            webkitColumnGap: "-webkit-column-gap",
            webkitColumnRule: "-webkit-column-rule",
            webkitColumnRuleColor: "-webkit-column-rule-color",
            webkitColumnRuleStyle: "-webkit-column-rule-style",
            webkitColumnRuleWidth: "-webkit-column-rule-width",
            webkitColumns: "-webkit-columns",
            webkitColumnSpan: "-webkit-column-span",
            webkitColumnWidth: "-webkit-column-width",
            webkitFilter: "-webkit-filter",
            webkitFlex: "-webkit-flex",
            webkitFlexBasis: "-webkit-flex-basis",
            webkitFlexDirection: "-webkit-flex-direction",
            webkitFlexFlow: "-webkit-flex-flow",
            webkitFlexGrow: "-webkit-flex-grow",
            webkitFlexShrink: "-webkit-flex-shrink",
            webkitFlexWrap: "-webkit-flex-wrap",
            webkitJustifyContent: "-webkit-justify-content",
            webkitOrder: "-webkit-order",
            webkitPerspective: "-webkit-perspective-origin",
            webkitPerspectiveOrigin: "-webkit-perspective-origin",
            webkitTapHighlightColor: "-webkit-tap-highlight-color",
            webkitTextFillColor: "-webkit-text-fill-color",
            webkitTextSizeAdjust: "-webkit-text-size-adjust",
            webkitTextStroke: "-webkit-text-stroke",
            webkitTextStrokeColor: "-webkit-text-stroke-color",
            webkitTextStrokeWidth: "-webkit-text-stroke-width",
            webkitTransform: "-webkit-transform",
            webkitTransformOrigin: "-webkit-transform-origin",
            webkitTransformStyle: "-webkit-transform-style",
            webkitTransition: "-webkit-transition",
            webkitTransitionDelay: "-webkit-transition-delay",
            webkitTransitionDuration: "-webkit-transition-duration",
            webkitTransitionProperty: "-webkit-transition-property",
            webkitTransitionTimingFunction: "-webkit-transition-timing-function",
            webkitUserModify: "-webkit-user-modify",
            webkitUserSelect: "-webkit-user-select",
            webkitWritingMode: "-webkit-writing-mode",
            whiteSpace: "white-space",
            widows: "widows",
            width: "width",
            wordBreak: "word-break",
            wordSpacing: "word-spacing",
            wordWrap: "word-wrap",
            writingMode: "writing-mode",
            zIndex: "z-index",
            zoom: "zoom",
            resize: "resize",
            userSelect: "user-select"
        };
        for (prop in cssProperties)
            defineStyleProperty(prop);
        var prop;
        function defineStyleProperty(jsname) {
            var cssname = cssProperties[jsname];
            Object.defineProperty(CSSStyleDeclaration.prototype, jsname, {
                get: function () {
                    return this.getPropertyValue(cssname);
                },
                set: function (value) {
                    this.setProperty(cssname, value);
                }
            });
            if (!CSSStyleDeclaration.prototype.hasOwnProperty(cssname)) {
                Object.defineProperty(CSSStyleDeclaration.prototype, cssname, {
                    get: function () {
                        return this.getPropertyValue(cssname);
                    },
                    set: function (value) {
                        this.setProperty(cssname, value);
                    }
                });
            }
        }
    }
});
// external/npm/node_modules/domino/lib/URLUtils.js
var require_URLUtils = __commonJS({
    "external/npm/node_modules/domino/lib/URLUtils.js"(exports, module) {
        "use strict";
        var URL = require_URL();
        module.exports = URLUtils;
        function URLUtils() {
        }
        URLUtils.prototype = Object.create(Object.prototype, {
            _url: { get: function () {
                    return new URL(this.href);
                } },
            protocol: {
                get: function () {
                    var url = this._url;
                    if (url && url.scheme)
                        return url.scheme + ":";
                    else
                        return ":";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute()) {
                        v = v.replace(/:+$/, "");
                        v = v.replace(/[^-+\.a-zA-Z0-9]/g, URL.percentEncode);
                        if (v.length > 0) {
                            url.scheme = v;
                            output = url.toString();
                        }
                    }
                    this.href = output;
                }
            },
            host: {
                get: function () {
                    var url = this._url;
                    if (url.isAbsolute() && url.isAuthorityBased())
                        return url.host + (url.port ? ":" + url.port : "");
                    else
                        return "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute() && url.isAuthorityBased()) {
                        v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL.percentEncode);
                        if (v.length > 0) {
                            url.host = v;
                            delete url.port;
                            output = url.toString();
                        }
                    }
                    this.href = output;
                }
            },
            hostname: {
                get: function () {
                    var url = this._url;
                    if (url.isAbsolute() && url.isAuthorityBased())
                        return url.host;
                    else
                        return "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute() && url.isAuthorityBased()) {
                        v = v.replace(/^\/+/, "");
                        v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL.percentEncode);
                        if (v.length > 0) {
                            url.host = v;
                            output = url.toString();
                        }
                    }
                    this.href = output;
                }
            },
            port: {
                get: function () {
                    var url = this._url;
                    if (url.isAbsolute() && url.isAuthorityBased() && url.port !== void 0)
                        return url.port;
                    else
                        return "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute() && url.isAuthorityBased()) {
                        v = "" + v;
                        v = v.replace(/[^0-9].*$/, "");
                        v = v.replace(/^0+/, "");
                        if (v.length === 0)
                            v = "0";
                        if (parseInt(v, 10) <= 65535) {
                            url.port = v;
                            output = url.toString();
                        }
                    }
                    this.href = output;
                }
            },
            pathname: {
                get: function () {
                    var url = this._url;
                    if (url.isAbsolute() && url.isHierarchical())
                        return url.path;
                    else
                        return "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute() && url.isHierarchical()) {
                        if (v.charAt(0) !== "/")
                            v = "/" + v;
                        v = v.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, URL.percentEncode);
                        url.path = v;
                        output = url.toString();
                    }
                    this.href = output;
                }
            },
            search: {
                get: function () {
                    var url = this._url;
                    if (url.isAbsolute() && url.isHierarchical() && url.query !== void 0)
                        return "?" + url.query;
                    else
                        return "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute() && url.isHierarchical()) {
                        if (v.charAt(0) === "?")
                            v = v.substring(1);
                        v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL.percentEncode);
                        url.query = v;
                        output = url.toString();
                    }
                    this.href = output;
                }
            },
            hash: {
                get: function () {
                    var url = this._url;
                    if (url == null || url.fragment == null || url.fragment === "") {
                        return "";
                    }
                    else {
                        return "#" + url.fragment;
                    }
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (v.charAt(0) === "#")
                        v = v.substring(1);
                    v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL.percentEncode);
                    url.fragment = v;
                    output = url.toString();
                    this.href = output;
                }
            },
            username: {
                get: function () {
                    var url = this._url;
                    return url.username || "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute()) {
                        v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, URL.percentEncode);
                        url.username = v;
                        output = url.toString();
                    }
                    this.href = output;
                }
            },
            password: {
                get: function () {
                    var url = this._url;
                    return url.password || "";
                },
                set: function (v) {
                    var output = this.href;
                    var url = new URL(output);
                    if (url.isAbsolute()) {
                        if (v === "") {
                            url.password = null;
                        }
                        else {
                            v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, URL.percentEncode);
                            url.password = v;
                        }
                        output = url.toString();
                    }
                    this.href = output;
                }
            },
            origin: { get: function () {
                    var url = this._url;
                    if (url == null) {
                        return "";
                    }
                    var originForPort = function (defaultPort) {
                        var origin = [url.scheme, url.host, +url.port || defaultPort];
                        return origin[0] + "://" + origin[1] + (origin[2] === defaultPort ? "" : ":" + origin[2]);
                    };
                    switch (url.scheme) {
                        case "ftp":
                            return originForPort(21);
                        case "gopher":
                            return originForPort(70);
                        case "http":
                        case "ws":
                            return originForPort(80);
                        case "https":
                        case "wss":
                            return originForPort(443);
                        default:
                            return url.scheme + "://";
                    }
                } }
        });
        URLUtils._inherit = function (proto) {
            Object.getOwnPropertyNames(URLUtils.prototype).forEach(function (p) {
                if (p === "constructor" || p === "href") {
                    return;
                }
                var desc = Object.getOwnPropertyDescriptor(URLUtils.prototype, p);
                Object.defineProperty(proto, p, desc);
            });
        };
    }
});
// external/npm/node_modules/domino/lib/defineElement.js
var require_defineElement = __commonJS({
    "external/npm/node_modules/domino/lib/defineElement.js"(exports, module) {
        "use strict";
        var attributes = require_attributes();
        var isApiWritable = require_config().isApiWritable;
        module.exports = function (spec, defaultConstructor, tagList, tagNameToImpl) {
            var c = spec.ctor;
            if (c) {
                var props = spec.props || {};
                if (spec.attributes) {
                    for (var n in spec.attributes) {
                        var attr = spec.attributes[n];
                        if (typeof attr !== "object" || Array.isArray(attr))
                            attr = { type: attr };
                        if (!attr.name)
                            attr.name = n.toLowerCase();
                        props[n] = attributes.property(attr);
                    }
                }
                props.constructor = { value: c, writable: isApiWritable };
                c.prototype = Object.create((spec.superclass || defaultConstructor).prototype, props);
                if (spec.events) {
                    addEventHandlers(c, spec.events);
                }
                tagList[spec.name] = c;
            }
            else {
                c = defaultConstructor;
            }
            (spec.tags || spec.tag && [spec.tag] || []).forEach(function (tag) {
                tagNameToImpl[tag] = c;
            });
            return c;
        };
        function EventHandlerBuilder(body, document, form, element) {
            this.body = body;
            this.document = document;
            this.form = form;
            this.element = element;
        }
        EventHandlerBuilder.prototype.build = function () {
            return () => {
            };
        };
        function EventHandlerChangeHandler(elt, name, oldval, newval) {
            var doc = elt.ownerDocument || /* @__PURE__ */ Object.create(null);
            var form = elt.form || /* @__PURE__ */ Object.create(null);
            elt[name] = new EventHandlerBuilder(newval, doc, form, elt).build();
        }
        function addEventHandlers(c, eventHandlerTypes) {
            var p = c.prototype;
            eventHandlerTypes.forEach(function (type) {
                Object.defineProperty(p, "on" + type, {
                    get: function () {
                        return this._getEventHandler(type);
                    },
                    set: function (v) {
                        this._setEventHandler(type, v);
                    }
                });
                attributes.registerChangeHandler(c, "on" + type, EventHandlerChangeHandler);
            });
        }
    }
});
// external/npm/node_modules/domino/lib/htmlelts.js
var require_htmlelts = __commonJS({
    "external/npm/node_modules/domino/lib/htmlelts.js"(exports) {
        "use strict";
        var Node = require_Node();
        var Element = require_Element();
        var CSSStyleDeclaration = require_CSSStyleDeclaration();
        var utils = require_utils();
        var URLUtils = require_URLUtils();
        var defineElement = require_defineElement();
        var htmlElements = exports.elements = {};
        var htmlNameToImpl = /* @__PURE__ */ Object.create(null);
        exports.createElement = function (doc, localName, prefix) {
            var impl = htmlNameToImpl[localName] || HTMLUnknownElement;
            return new impl(doc, localName, prefix);
        };
        function define(spec) {
            return defineElement(spec, HTMLElement, htmlElements, htmlNameToImpl);
        }
        function URL(attr) {
            return {
                get: function () {
                    var v = this._getattr(attr);
                    if (v === null) {
                        return "";
                    }
                    var url = this.doc._resolve(v);
                    return url === null ? v : url;
                },
                set: function (value) {
                    this._setattr(attr, value);
                }
            };
        }
        function CORS(attr) {
            return {
                get: function () {
                    var v = this._getattr(attr);
                    if (v === null) {
                        return null;
                    }
                    if (v.toLowerCase() === "use-credentials") {
                        return "use-credentials";
                    }
                    return "anonymous";
                },
                set: function (value) {
                    if (value === null || value === void 0) {
                        this.removeAttribute(attr);
                    }
                    else {
                        this._setattr(attr, value);
                    }
                }
            };
        }
        var REFERRER = {
            type: ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
            missing: ""
        };
        var focusableElements = {
            "A": true,
            "LINK": true,
            "BUTTON": true,
            "INPUT": true,
            "SELECT": true,
            "TEXTAREA": true,
            "COMMAND": true
        };
        var HTMLFormElement = function (doc, localName, prefix) {
            HTMLElement.call(this, doc, localName, prefix);
            this._form = null;
        };
        var HTMLElement = exports.HTMLElement = define({
            superclass: Element,
            name: "HTMLElement",
            ctor: function HTMLElement2(doc, localName, prefix) {
                Element.call(this, doc, localName, utils.NAMESPACE.HTML, prefix);
            },
            props: {
                dangerouslySetInnerHTML: {
                    set: function (v) {
                        this._innerHTML = v;
                    }
                },
                innerHTML: {
                    get: function () {
                        return this.serialize();
                    },
                    set: function (v) {
                        var parser = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
                        parser.parse(v === null ? "" : String(v), true);
                        var target = this instanceof htmlNameToImpl.template ? this.content : this;
                        while (target.hasChildNodes())
                            target.removeChild(target.firstChild);
                        target.appendChild(parser._asDocumentFragment());
                    }
                },
                style: { get: function () {
                        if (!this._style)
                            this._style = new CSSStyleDeclaration(this);
                        return this._style;
                    }, set: function (v) {
                        if (v === null || v === void 0) {
                            v = "";
                        }
                        this._setattr("style", String(v));
                    } },
                blur: { value: function () {
                    } },
                focus: { value: function () {
                    } },
                forceSpellCheck: { value: function () {
                    } },
                click: { value: function () {
                        if (this._click_in_progress)
                            return;
                        this._click_in_progress = true;
                        try {
                            if (this._pre_click_activation_steps)
                                this._pre_click_activation_steps();
                            var event = this.ownerDocument.createEvent("MouseEvent");
                            event.initMouseEvent("click", true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            var success = this.dispatchEvent(event);
                            if (success) {
                                if (this._post_click_activation_steps)
                                    this._post_click_activation_steps(event);
                            }
                            else {
                                if (this._cancelled_activation_steps)
                                    this._cancelled_activation_steps();
                            }
                        }
                        finally {
                            this._click_in_progress = false;
                        }
                    } },
                submit: { value: utils.nyi }
            },
            attributes: {
                title: String,
                lang: String,
                dir: { type: ["ltr", "rtl", "auto"], missing: "" },
                accessKey: String,
                hidden: Boolean,
                tabIndex: { type: "long", default: function () {
                        if (this.tagName in focusableElements || this.contentEditable)
                            return 0;
                        else
                            return -1;
                    } }
            },
            events: [
                "abort",
                "canplay",
                "canplaythrough",
                "change",
                "click",
                "contextmenu",
                "cuechange",
                "dblclick",
                "drag",
                "dragend",
                "dragenter",
                "dragleave",
                "dragover",
                "dragstart",
                "drop",
                "durationchange",
                "emptied",
                "ended",
                "input",
                "invalid",
                "keydown",
                "keypress",
                "keyup",
                "loadeddata",
                "loadedmetadata",
                "loadstart",
                "mousedown",
                "mousemove",
                "mouseout",
                "mouseover",
                "mouseup",
                "mousewheel",
                "pause",
                "play",
                "playing",
                "progress",
                "ratechange",
                "readystatechange",
                "reset",
                "seeked",
                "seeking",
                "select",
                "show",
                "stalled",
                "submit",
                "suspend",
                "timeupdate",
                "volumechange",
                "waiting",
                "blur",
                "error",
                "focus",
                "load",
                "scroll"
            ]
        });
        var HTMLUnknownElement = define({
            name: "HTMLUnknownElement",
            ctor: function HTMLUnknownElement2(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        var formAssociatedProps = {
            form: { get: function () {
                    return this._form;
                } }
        };
        define({
            tag: "a",
            name: "HTMLAnchorElement",
            ctor: function HTMLAnchorElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                _post_click_activation_steps: { value: function (e) {
                        if (this.href) {
                            this.ownerDocument.defaultView.location = this.href;
                        }
                    } }
            },
            attributes: {
                href: URL,
                ping: String,
                download: String,
                target: String,
                rel: String,
                media: String,
                hreflang: String,
                type: String,
                referrerPolicy: REFERRER,
                coords: String,
                charset: String,
                name: String,
                rev: String,
                shape: String
            }
        });
        URLUtils._inherit(htmlNameToImpl.a.prototype);
        define({
            tag: "area",
            name: "HTMLAreaElement",
            ctor: function HTMLAreaElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                alt: String,
                target: String,
                download: String,
                rel: String,
                media: String,
                href: URL,
                hreflang: String,
                type: String,
                shape: String,
                coords: String,
                ping: String,
                referrerPolicy: REFERRER,
                noHref: Boolean
            }
        });
        URLUtils._inherit(htmlNameToImpl.area.prototype);
        define({
            tag: "br",
            name: "HTMLBRElement",
            ctor: function HTMLBRElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                clear: String
            }
        });
        define({
            tag: "base",
            name: "HTMLBaseElement",
            ctor: function HTMLBaseElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                "target": String
            }
        });
        define({
            tag: "body",
            name: "HTMLBodyElement",
            ctor: function HTMLBodyElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            events: [
                "afterprint",
                "beforeprint",
                "beforeunload",
                "blur",
                "error",
                "focus",
                "hashchange",
                "load",
                "message",
                "offline",
                "online",
                "pagehide",
                "pageshow",
                "popstate",
                "resize",
                "scroll",
                "storage",
                "unload"
            ],
            attributes: {
                text: { type: String, treatNullAsEmptyString: true },
                link: { type: String, treatNullAsEmptyString: true },
                vLink: { type: String, treatNullAsEmptyString: true },
                aLink: { type: String, treatNullAsEmptyString: true },
                bgColor: { type: String, treatNullAsEmptyString: true },
                background: String
            }
        });
        define({
            tag: "button",
            name: "HTMLButtonElement",
            ctor: function HTMLButtonElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                name: String,
                value: String,
                disabled: Boolean,
                autofocus: Boolean,
                type: { type: ["submit", "reset", "button", "menu"], missing: "submit" },
                formTarget: String,
                formNoValidate: Boolean,
                formMethod: { type: ["get", "post", "dialog"], invalid: "get", missing: "" },
                formEnctype: { type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], invalid: "application/x-www-form-urlencoded", missing: "" }
            }
        });
        define({
            tag: "dl",
            name: "HTMLDListElement",
            ctor: function HTMLDListElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                compact: Boolean
            }
        });
        define({
            tag: "data",
            name: "HTMLDataElement",
            ctor: function HTMLDataElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                value: String
            }
        });
        define({
            tag: "datalist",
            name: "HTMLDataListElement",
            ctor: function HTMLDataListElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "details",
            name: "HTMLDetailsElement",
            ctor: function HTMLDetailsElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                "open": Boolean
            }
        });
        define({
            tag: "div",
            name: "HTMLDivElement",
            ctor: function HTMLDivElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String
            }
        });
        define({
            tag: "embed",
            name: "HTMLEmbedElement",
            ctor: function HTMLEmbedElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                src: URL,
                type: String,
                width: String,
                height: String,
                align: String,
                name: String
            }
        });
        define({
            tag: "fieldset",
            name: "HTMLFieldSetElement",
            ctor: function HTMLFieldSetElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                disabled: Boolean,
                name: String
            }
        });
        define({
            tag: "form",
            name: "HTMLFormElement",
            ctor: function HTMLFormElement2(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                action: String,
                autocomplete: { type: ["on", "off"], missing: "on" },
                name: String,
                acceptCharset: { name: "accept-charset" },
                target: String,
                noValidate: Boolean,
                method: { type: ["get", "post", "dialog"], invalid: "get", missing: "get" },
                enctype: { type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], invalid: "application/x-www-form-urlencoded", missing: "application/x-www-form-urlencoded" },
                encoding: { name: "enctype", type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], invalid: "application/x-www-form-urlencoded", missing: "application/x-www-form-urlencoded" }
            }
        });
        define({
            tag: "hr",
            name: "HTMLHRElement",
            ctor: function HTMLHRElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String,
                color: String,
                noShade: Boolean,
                size: String,
                width: String
            }
        });
        define({
            tag: "head",
            name: "HTMLHeadElement",
            ctor: function HTMLHeadElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
            name: "HTMLHeadingElement",
            ctor: function HTMLHeadingElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String
            }
        });
        define({
            tag: "html",
            name: "HTMLHtmlElement",
            ctor: function HTMLHtmlElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                version: String
            }
        });
        define({
            tag: "iframe",
            name: "HTMLIFrameElement",
            ctor: function HTMLIFrameElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                src: URL,
                srcdoc: String,
                name: String,
                width: String,
                height: String,
                seamless: Boolean,
                allowFullscreen: Boolean,
                allowUserMedia: Boolean,
                allowPaymentRequest: Boolean,
                referrerPolicy: REFERRER,
                align: String,
                scrolling: String,
                frameBorder: String,
                longDesc: URL,
                marginHeight: { type: String, treatNullAsEmptyString: true },
                marginWidth: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tag: "img",
            name: "HTMLImageElement",
            ctor: function HTMLImageElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                alt: String,
                src: URL,
                srcset: String,
                crossOrigin: CORS,
                useMap: String,
                isMap: Boolean,
                height: { type: "unsigned long", default: 0 },
                width: { type: "unsigned long", default: 0 },
                referrerPolicy: REFERRER,
                name: String,
                lowsrc: URL,
                align: String,
                hspace: { type: "unsigned long", default: 0 },
                vspace: { type: "unsigned long", default: 0 },
                longDesc: URL,
                border: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tag: "input",
            name: "HTMLInputElement",
            ctor: function HTMLInputElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: {
                form: formAssociatedProps.form,
                _post_click_activation_steps: { value: function (e) {
                        if (this.type === "checkbox") {
                            this.checked = !this.checked;
                        }
                        else if (this.type === "radio") {
                            var group = this.form.getElementsByName(this.name);
                            for (var i = group.length - 1; i >= 0; i--) {
                                var el = group[i];
                                el.checked = el === this;
                            }
                        }
                    } }
            },
            attributes: {
                name: String,
                disabled: Boolean,
                autofocus: Boolean,
                accept: String,
                alt: String,
                max: String,
                min: String,
                pattern: String,
                placeholder: String,
                step: String,
                dirName: String,
                defaultValue: { name: "value" },
                multiple: Boolean,
                required: Boolean,
                readOnly: Boolean,
                checked: Boolean,
                value: String,
                src: URL,
                defaultChecked: { name: "checked", type: Boolean },
                size: { type: "unsigned long", default: 20, min: 1, setmin: 1 },
                width: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
                height: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
                minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
                maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
                autocomplete: String,
                type: {
                    type: [
                        "text",
                        "hidden",
                        "search",
                        "tel",
                        "url",
                        "email",
                        "password",
                        "datetime",
                        "date",
                        "month",
                        "week",
                        "time",
                        "datetime-local",
                        "number",
                        "range",
                        "color",
                        "checkbox",
                        "radio",
                        "file",
                        "submit",
                        "image",
                        "reset",
                        "button"
                    ],
                    missing: "text"
                },
                formTarget: String,
                formNoValidate: Boolean,
                formMethod: { type: ["get", "post"], invalid: "get", missing: "" },
                formEnctype: { type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], invalid: "application/x-www-form-urlencoded", missing: "" },
                inputMode: { type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"], missing: "" },
                align: String,
                useMap: String
            }
        });
        define({
            tag: "keygen",
            name: "HTMLKeygenElement",
            ctor: function HTMLKeygenElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                name: String,
                disabled: Boolean,
                autofocus: Boolean,
                challenge: String,
                keytype: { type: ["rsa"], missing: "" }
            }
        });
        define({
            tag: "li",
            name: "HTMLLIElement",
            ctor: function HTMLLIElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                value: { type: "long", default: 0 },
                type: String
            }
        });
        define({
            tag: "label",
            name: "HTMLLabelElement",
            ctor: function HTMLLabelElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                htmlFor: { name: "for", type: String }
            }
        });
        define({
            tag: "legend",
            name: "HTMLLegendElement",
            ctor: function HTMLLegendElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String
            }
        });
        define({
            tag: "link",
            name: "HTMLLinkElement",
            ctor: function HTMLLinkElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                href: URL,
                rel: String,
                media: String,
                hreflang: String,
                type: String,
                crossOrigin: CORS,
                nonce: String,
                integrity: String,
                referrerPolicy: REFERRER,
                charset: String,
                rev: String,
                target: String
            }
        });
        define({
            tag: "map",
            name: "HTMLMapElement",
            ctor: function HTMLMapElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                name: String
            }
        });
        define({
            tag: "menu",
            name: "HTMLMenuElement",
            ctor: function HTMLMenuElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
                label: String,
                compact: Boolean
            }
        });
        define({
            tag: "meta",
            name: "HTMLMetaElement",
            ctor: function HTMLMetaElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                name: String,
                content: String,
                httpEquiv: { name: "http-equiv", type: String },
                scheme: String
            }
        });
        define({
            tag: "meter",
            name: "HTMLMeterElement",
            ctor: function HTMLMeterElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps
        });
        define({
            tags: ["ins", "del"],
            name: "HTMLModElement",
            ctor: function HTMLModElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                cite: URL,
                dateTime: String
            }
        });
        define({
            tag: "ol",
            name: "HTMLOListElement",
            ctor: function HTMLOListElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                _numitems: { get: function () {
                        var items = 0;
                        this.childNodes.forEach(function (n) {
                            if (n.nodeType === Node.ELEMENT_NODE && n.tagName === "LI")
                                items++;
                        });
                        return items;
                    } }
            },
            attributes: {
                type: String,
                reversed: Boolean,
                start: {
                    type: "long",
                    default: function () {
                        if (this.reversed)
                            return this._numitems;
                        else
                            return 1;
                    }
                },
                compact: Boolean
            }
        });
        define({
            tag: "object",
            name: "HTMLObjectElement",
            ctor: function HTMLObjectElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                data: URL,
                type: String,
                name: String,
                useMap: String,
                typeMustMatch: Boolean,
                width: String,
                height: String,
                align: String,
                archive: String,
                code: String,
                declare: Boolean,
                hspace: { type: "unsigned long", default: 0 },
                standby: String,
                vspace: { type: "unsigned long", default: 0 },
                codeBase: URL,
                codeType: String,
                border: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tag: "optgroup",
            name: "HTMLOptGroupElement",
            ctor: function HTMLOptGroupElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                disabled: Boolean,
                label: String
            }
        });
        define({
            tag: "option",
            name: "HTMLOptionElement",
            ctor: function HTMLOptionElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                form: { get: function () {
                        var p = this.parentNode;
                        while (p && p.nodeType === Node.ELEMENT_NODE) {
                            if (p.localName === "select")
                                return p.form;
                            p = p.parentNode;
                        }
                    } },
                value: {
                    get: function () {
                        return this._getattr("value") || this.text;
                    },
                    set: function (v) {
                        this._setattr("value", v);
                    }
                },
                text: {
                    get: function () {
                        return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
                    },
                    set: function (v) {
                        this.textContent = v;
                    }
                }
            },
            attributes: {
                disabled: Boolean,
                defaultSelected: { name: "selected", type: Boolean },
                label: String
            }
        });
        define({
            tag: "output",
            name: "HTMLOutputElement",
            ctor: function HTMLOutputElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                name: String
            }
        });
        define({
            tag: "p",
            name: "HTMLParagraphElement",
            ctor: function HTMLParagraphElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String
            }
        });
        define({
            tag: "param",
            name: "HTMLParamElement",
            ctor: function HTMLParamElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                name: String,
                value: String,
                type: String,
                valueType: String
            }
        });
        define({
            tags: ["pre", "listing", "xmp"],
            name: "HTMLPreElement",
            ctor: function HTMLPreElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                width: { type: "long", default: 0 }
            }
        });
        define({
            tag: "progress",
            name: "HTMLProgressElement",
            ctor: function HTMLProgressElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: formAssociatedProps,
            attributes: {
                max: { type: Number, float: true, default: 1, min: 0 }
            }
        });
        define({
            tags: ["q", "blockquote"],
            name: "HTMLQuoteElement",
            ctor: function HTMLQuoteElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                cite: URL
            }
        });
        define({
            tag: "script",
            name: "HTMLScriptElement",
            ctor: function HTMLScriptElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                text: {
                    get: function () {
                        var s = "";
                        for (var i = 0, n = this.childNodes.length; i < n; i++) {
                            var child = this.childNodes[i];
                            if (child.nodeType === Node.TEXT_NODE)
                                s += child._data;
                        }
                        return s;
                    },
                    set: function (value) {
                        this.removeChildren();
                        if (value !== null && value !== "") {
                            this.appendChild(this.ownerDocument.createTextNode(value));
                        }
                    }
                }
            },
            attributes: {
                src: URL,
                type: String,
                charset: String,
                defer: Boolean,
                async: Boolean,
                crossOrigin: CORS,
                nonce: String,
                integrity: String
            }
        });
        define({
            tag: "select",
            name: "HTMLSelectElement",
            ctor: function HTMLSelectElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: {
                form: formAssociatedProps.form,
                options: { get: function () {
                        return this.getElementsByTagName("option");
                    } }
            },
            attributes: {
                autocomplete: String,
                name: String,
                disabled: Boolean,
                autofocus: Boolean,
                multiple: Boolean,
                required: Boolean,
                size: { type: "unsigned long", default: 0 }
            }
        });
        define({
            tag: "source",
            name: "HTMLSourceElement",
            ctor: function HTMLSourceElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                src: URL,
                type: String,
                media: String
            }
        });
        define({
            tag: "span",
            name: "HTMLSpanElement",
            ctor: function HTMLSpanElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "style",
            name: "HTMLStyleElement",
            ctor: function HTMLStyleElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                media: String,
                type: String,
                scoped: Boolean
            }
        });
        define({
            tag: "caption",
            name: "HTMLTableCaptionElement",
            ctor: function HTMLTableCaptionElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                align: String
            }
        });
        define({
            name: "HTMLTableCellElement",
            ctor: function HTMLTableCellElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                colSpan: { type: "unsigned long", default: 1 },
                rowSpan: { type: "unsigned long", default: 1 },
                scope: { type: ["row", "col", "rowgroup", "colgroup"], missing: "" },
                abbr: String,
                align: String,
                axis: String,
                height: String,
                width: String,
                ch: { name: "char", type: String },
                chOff: { name: "charoff", type: String },
                noWrap: Boolean,
                vAlign: String,
                bgColor: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tags: ["col", "colgroup"],
            name: "HTMLTableColElement",
            ctor: function HTMLTableColElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                span: { type: "limited unsigned long with fallback", default: 1, min: 1 },
                align: String,
                ch: { name: "char", type: String },
                chOff: { name: "charoff", type: String },
                vAlign: String,
                width: String
            }
        });
        define({
            tag: "table",
            name: "HTMLTableElement",
            ctor: function HTMLTableElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                rows: { get: function () {
                        return this.getElementsByTagName("tr");
                    } }
            },
            attributes: {
                align: String,
                border: String,
                frame: String,
                rules: String,
                summary: String,
                width: String,
                bgColor: { type: String, treatNullAsEmptyString: true },
                cellPadding: { type: String, treatNullAsEmptyString: true },
                cellSpacing: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tag: "template",
            name: "HTMLTemplateElement",
            ctor: function HTMLTemplateElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
                this._contentFragment = doc._templateDoc.createDocumentFragment();
            },
            props: {
                content: { get: function () {
                        return this._contentFragment;
                    } },
                serialize: { value: function () {
                        return this.content.serialize();
                    } }
            }
        });
        define({
            tag: "tr",
            name: "HTMLTableRowElement",
            ctor: function HTMLTableRowElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                cells: { get: function () {
                        return this.querySelectorAll("td,th");
                    } }
            },
            attributes: {
                align: String,
                ch: { name: "char", type: String },
                chOff: { name: "charoff", type: String },
                vAlign: String,
                bgColor: { type: String, treatNullAsEmptyString: true }
            }
        });
        define({
            tags: ["thead", "tfoot", "tbody"],
            name: "HTMLTableSectionElement",
            ctor: function HTMLTableSectionElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                rows: { get: function () {
                        return this.getElementsByTagName("tr");
                    } }
            },
            attributes: {
                align: String,
                ch: { name: "char", type: String },
                chOff: { name: "charoff", type: String },
                vAlign: String
            }
        });
        define({
            tag: "textarea",
            name: "HTMLTextAreaElement",
            ctor: function HTMLTextAreaElement(doc, localName, prefix) {
                HTMLFormElement.call(this, doc, localName, prefix);
            },
            props: {
                form: formAssociatedProps.form,
                type: { get: function () {
                        return "textarea";
                    } },
                defaultValue: {
                    get: function () {
                        return this.textContent;
                    },
                    set: function (v) {
                        this.textContent = v;
                    }
                },
                value: {
                    get: function () {
                        return this.defaultValue;
                    },
                    set: function (v) {
                        this.defaultValue = v;
                    }
                },
                textLength: { get: function () {
                        return this.value.length;
                    } }
            },
            attributes: {
                autocomplete: String,
                name: String,
                disabled: Boolean,
                autofocus: Boolean,
                placeholder: String,
                wrap: String,
                dirName: String,
                required: Boolean,
                readOnly: Boolean,
                rows: { type: "limited unsigned long with fallback", default: 2 },
                cols: { type: "limited unsigned long with fallback", default: 20 },
                maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
                minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
                inputMode: { type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"], missing: "" }
            }
        });
        define({
            tag: "time",
            name: "HTMLTimeElement",
            ctor: function HTMLTimeElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                dateTime: String,
                pubDate: Boolean
            }
        });
        define({
            tag: "title",
            name: "HTMLTitleElement",
            ctor: function HTMLTitleElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                text: { get: function () {
                        return this.textContent;
                    } }
            }
        });
        define({
            tag: "ul",
            name: "HTMLUListElement",
            ctor: function HTMLUListElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                type: String,
                compact: Boolean
            }
        });
        define({
            name: "HTMLMediaElement",
            ctor: function HTMLMediaElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                src: URL,
                crossOrigin: CORS,
                preload: { type: ["metadata", "none", "auto", { value: "", alias: "auto" }], missing: "auto" },
                loop: Boolean,
                autoplay: Boolean,
                mediaGroup: String,
                controls: Boolean,
                defaultMuted: { name: "muted", type: Boolean }
            }
        });
        define({
            name: "HTMLAudioElement",
            tag: "audio",
            superclass: htmlElements.HTMLMediaElement,
            ctor: function HTMLAudioElement(doc, localName, prefix) {
                htmlElements.HTMLMediaElement.call(this, doc, localName, prefix);
            }
        });
        define({
            name: "HTMLVideoElement",
            tag: "video",
            superclass: htmlElements.HTMLMediaElement,
            ctor: function HTMLVideoElement(doc, localName, prefix) {
                htmlElements.HTMLMediaElement.call(this, doc, localName, prefix);
            },
            attributes: {
                poster: URL,
                width: { type: "unsigned long", min: 0, default: 0 },
                height: { type: "unsigned long", min: 0, default: 0 }
            }
        });
        define({
            tag: "td",
            name: "HTMLTableDataCellElement",
            superclass: htmlElements.HTMLTableCellElement,
            ctor: function HTMLTableDataCellElement(doc, localName, prefix) {
                htmlElements.HTMLTableCellElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "th",
            name: "HTMLTableHeaderCellElement",
            superclass: htmlElements.HTMLTableCellElement,
            ctor: function HTMLTableHeaderCellElement(doc, localName, prefix) {
                htmlElements.HTMLTableCellElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "frameset",
            name: "HTMLFrameSetElement",
            ctor: function HTMLFrameSetElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "frame",
            name: "HTMLFrameElement",
            ctor: function HTMLFrameElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            }
        });
        define({
            tag: "canvas",
            name: "HTMLCanvasElement",
            ctor: function HTMLCanvasElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                getContext: { value: utils.nyi },
                probablySupportsContext: { value: utils.nyi },
                setContext: { value: utils.nyi },
                transferControlToProxy: { value: utils.nyi },
                toDataURL: { value: utils.nyi },
                toBlob: { value: utils.nyi }
            },
            attributes: {
                width: { type: "unsigned long", default: 300 },
                height: { type: "unsigned long", default: 150 }
            }
        });
        define({
            tag: "dialog",
            name: "HTMLDialogElement",
            ctor: function HTMLDialogElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                show: { value: utils.nyi },
                showModal: { value: utils.nyi },
                close: { value: utils.nyi }
            },
            attributes: {
                open: Boolean,
                returnValue: String
            }
        });
        define({
            tag: "menuitem",
            name: "HTMLMenuItemElement",
            ctor: function HTMLMenuItemElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            props: {
                _label: {
                    get: function () {
                        var val = this._getattr("label");
                        if (val !== null && val !== "") {
                            return val;
                        }
                        val = this.textContent;
                        return val.replace(/[ \t\n\f\r]+/g, " ").trim();
                    }
                },
                label: {
                    get: function () {
                        var val = this._getattr("label");
                        if (val !== null) {
                            return val;
                        }
                        return this._label;
                    },
                    set: function (v) {
                        this._setattr("label", v);
                    }
                }
            },
            attributes: {
                type: { type: ["command", "checkbox", "radio"], missing: "command" },
                icon: URL,
                disabled: Boolean,
                checked: Boolean,
                radiogroup: String,
                default: Boolean
            }
        });
        define({
            tag: "source",
            name: "HTMLSourceElement",
            ctor: function HTMLSourceElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                srcset: String,
                sizes: String,
                media: String,
                src: URL,
                type: String
            }
        });
        define({
            tag: "track",
            name: "HTMLTrackElement",
            ctor: function HTMLTrackElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                src: URL,
                srclang: String,
                label: String,
                default: Boolean,
                kind: { type: ["subtitles", "captions", "descriptions", "chapters", "metadata"], missing: "subtitles", invalid: "metadata" }
            },
            props: {
                NONE: { get: function () {
                        return 0;
                    } },
                LOADING: { get: function () {
                        return 1;
                    } },
                LOADED: { get: function () {
                        return 2;
                    } },
                ERROR: { get: function () {
                        return 3;
                    } },
                readyState: { get: utils.nyi },
                track: { get: utils.nyi }
            }
        });
        define({
            tag: "font",
            name: "HTMLFontElement",
            ctor: function HTMLFontElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                color: { type: String, treatNullAsEmptyString: true },
                face: { type: String },
                size: { type: String }
            }
        });
        define({
            tag: "dir",
            name: "HTMLDirectoryElement",
            ctor: function HTMLDirectoryElement(doc, localName, prefix) {
                HTMLElement.call(this, doc, localName, prefix);
            },
            attributes: {
                compact: Boolean
            }
        });
        define({
            tags: [
                "abbr",
                "address",
                "article",
                "aside",
                "b",
                "bdi",
                "bdo",
                "cite",
                "code",
                "dd",
                "dfn",
                "dt",
                "em",
                "figcaption",
                "figure",
                "footer",
                "header",
                "hgroup",
                "i",
                "kbd",
                "main",
                "mark",
                "nav",
                "noscript",
                "rb",
                "rp",
                "rt",
                "rtc",
                "ruby",
                "s",
                "samp",
                "section",
                "small",
                "strong",
                "sub",
                "summary",
                "sup",
                "u",
                "var",
                "wbr",
                "acronym",
                "basefont",
                "big",
                "center",
                "nobr",
                "noembed",
                "noframes",
                "plaintext",
                "strike",
                "tt"
            ]
        });
    }
});
// external/npm/node_modules/domino/lib/svg.js
var require_svg = __commonJS({
    "external/npm/node_modules/domino/lib/svg.js"(exports) {
        "use strict";
        var Element = require_Element();
        var defineElement = require_defineElement();
        var utils = require_utils();
        var CSSStyleDeclaration = require_CSSStyleDeclaration();
        var svgElements = exports.elements = {};
        var svgNameToImpl = /* @__PURE__ */ Object.create(null);
        exports.createElement = function (doc, localName, prefix) {
            var impl = svgNameToImpl[localName] || SVGElement;
            return new impl(doc, localName, prefix);
        };
        function define(spec) {
            return defineElement(spec, SVGElement, svgElements, svgNameToImpl);
        }
        var SVGElement = define({
            superclass: Element,
            name: "SVGElement",
            ctor: function SVGElement2(doc, localName, prefix) {
                Element.call(this, doc, localName, utils.NAMESPACE.SVG, prefix);
            },
            props: {
                style: { get: function () {
                        if (!this._style)
                            this._style = new CSSStyleDeclaration(this);
                        return this._style;
                    } }
            }
        });
        define({
            name: "SVGSVGElement",
            ctor: function SVGSVGElement(doc, localName, prefix) {
                SVGElement.call(this, doc, localName, prefix);
            },
            tag: "svg",
            props: {
                createSVGRect: { value: function () {
                        return exports.createElement(this.ownerDocument, "rect", null);
                    } }
            }
        });
        define({
            tags: [
                "a",
                "altGlyph",
                "altGlyphDef",
                "altGlyphItem",
                "animate",
                "animateColor",
                "animateMotion",
                "animateTransform",
                "circle",
                "clipPath",
                "color-profile",
                "cursor",
                "defs",
                "desc",
                "ellipse",
                "feBlend",
                "feColorMatrix",
                "feComponentTransfer",
                "feComposite",
                "feConvolveMatrix",
                "feDiffuseLighting",
                "feDisplacementMap",
                "feDistantLight",
                "feFlood",
                "feFuncA",
                "feFuncB",
                "feFuncG",
                "feFuncR",
                "feGaussianBlur",
                "feImage",
                "feMerge",
                "feMergeNode",
                "feMorphology",
                "feOffset",
                "fePointLight",
                "feSpecularLighting",
                "feSpotLight",
                "feTile",
                "feTurbulence",
                "filter",
                "font",
                "font-face",
                "font-face-format",
                "font-face-name",
                "font-face-src",
                "font-face-uri",
                "foreignObject",
                "g",
                "glyph",
                "glyphRef",
                "hkern",
                "image",
                "line",
                "linearGradient",
                "marker",
                "mask",
                "metadata",
                "missing-glyph",
                "mpath",
                "path",
                "pattern",
                "polygon",
                "polyline",
                "radialGradient",
                "rect",
                "script",
                "set",
                "stop",
                "style",
                "switch",
                "symbol",
                "text",
                "textPath",
                "title",
                "tref",
                "tspan",
                "use",
                "view",
                "vkern"
            ]
        });
    }
});
// external/npm/node_modules/domino/lib/MutationConstants.js
var require_MutationConstants = __commonJS({
    "external/npm/node_modules/domino/lib/MutationConstants.js"(exports, module) {
        "use strict";
        module.exports = {
            VALUE: 1,
            ATTR: 2,
            REMOVE_ATTR: 3,
            REMOVE: 4,
            MOVE: 5,
            INSERT: 6
        };
    }
});
// external/npm/node_modules/domino/lib/Document.js
var require_Document = __commonJS({
    "external/npm/node_modules/domino/lib/Document.js"(exports, module) {
        "use strict";
        module.exports = Document;
        var Node = require_Node();
        var NodeList = require_NodeList();
        var ContainerNode = require_ContainerNode();
        var Element = require_Element();
        var Text = require_Text();
        var Comment = require_Comment();
        var Event = require_Event();
        var DocumentFragment = require_DocumentFragment();
        var ProcessingInstruction = require_ProcessingInstruction();
        var DOMImplementation = require_DOMImplementation();
        var TreeWalker = require_TreeWalker();
        var NodeIterator = require_NodeIterator();
        var NodeFilter = require_NodeFilter();
        var URL = require_URL();
        var select = require_select();
        var events = require_events();
        var xml = require_xmlnames();
        var html = require_htmlelts();
        var svg = require_svg();
        var utils = require_utils();
        var MUTATE = require_MutationConstants();
        var NAMESPACE = utils.NAMESPACE;
        var isApiWritable = require_config().isApiWritable;
        function Document(isHTML, address) {
            ContainerNode.call(this);
            this.nodeType = Node.DOCUMENT_NODE;
            this.isHTML = isHTML;
            this._address = address || "about:blank";
            this.readyState = "loading";
            this.implementation = new DOMImplementation(this);
            this.ownerDocument = null;
            this._contentType = isHTML ? "text/html" : "application/xml";
            this.doctype = null;
            this.documentElement = null;
            this._templateDocCache = null;
            this._nodeIterators = null;
            this._nid = 1;
            this._nextnid = 2;
            this._nodes = [null, this];
            this.byId = /* @__PURE__ */ Object.create(null);
            this.modclock = 0;
        }
        var supportedEvents = {
            event: "Event",
            customevent: "CustomEvent",
            uievent: "UIEvent",
            mouseevent: "MouseEvent"
        };
        var replacementEvent = {
            events: "event",
            htmlevents: "event",
            mouseevents: "mouseevent",
            mutationevents: "mutationevent",
            uievents: "uievent"
        };
        var mirrorAttr = function (f, name, defaultValue) {
            return {
                get: function () {
                    var o = f.call(this);
                    if (o) {
                        return o[name];
                    }
                    return defaultValue;
                },
                set: function (value) {
                    var o = f.call(this);
                    if (o) {
                        o[name] = value;
                    }
                }
            };
        };
        function validateAndExtract(namespace, qualifiedName) {
            var prefix, localName, pos;
            if (namespace === "") {
                namespace = null;
            }
            if (!xml.isValidQName(qualifiedName)) {
                utils.InvalidCharacterError();
            }
            prefix = null;
            localName = qualifiedName;
            pos = qualifiedName.indexOf(":");
            if (pos >= 0) {
                prefix = qualifiedName.substring(0, pos);
                localName = qualifiedName.substring(pos + 1);
            }
            if (prefix !== null && namespace === null) {
                utils.NamespaceError();
            }
            if (prefix === "xml" && namespace !== NAMESPACE.XML) {
                utils.NamespaceError();
            }
            if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== NAMESPACE.XMLNS) {
                utils.NamespaceError();
            }
            if (namespace === NAMESPACE.XMLNS && !(prefix === "xmlns" || qualifiedName === "xmlns")) {
                utils.NamespaceError();
            }
            return { namespace, prefix, localName };
        }
        Document.prototype = Object.create(ContainerNode.prototype, {
            _setMutationHandler: { value: function (handler) {
                    this.mutationHandler = handler;
                } },
            _dispatchRendererEvent: { value: function (targetNid, type, details) {
                    var target = this._nodes[targetNid];
                    if (!target)
                        return;
                    target._dispatchEvent(new Event(type, details), true);
                } },
            nodeName: { value: "#document" },
            nodeValue: {
                get: function () {
                    return null;
                },
                set: function () {
                }
            },
            documentURI: { get: function () {
                    return this._address;
                }, set: utils.nyi },
            compatMode: { get: function () {
                    return this._quirks ? "BackCompat" : "CSS1Compat";
                } },
            createTextNode: { value: function (data) {
                    return new Text(this, String(data));
                } },
            createComment: { value: function (data) {
                    return new Comment(this, data);
                } },
            createDocumentFragment: { value: function () {
                    return new DocumentFragment(this);
                } },
            createProcessingInstruction: { value: function (target, data) {
                    if (!xml.isValidName(target) || data.indexOf("?>") !== -1)
                        utils.InvalidCharacterError();
                    return new ProcessingInstruction(this, target, data);
                } },
            createAttribute: { value: function (localName) {
                    localName = String(localName);
                    if (!xml.isValidName(localName))
                        utils.InvalidCharacterError();
                    if (this.isHTML) {
                        localName = utils.toASCIILowerCase(localName);
                    }
                    return new Element._Attr(null, localName, null, null, "");
                } },
            createAttributeNS: { value: function (namespace, qualifiedName) {
                    namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
                    qualifiedName = String(qualifiedName);
                    var ve = validateAndExtract(namespace, qualifiedName);
                    return new Element._Attr(null, ve.localName, ve.prefix, ve.namespace, "");
                } },
            createElement: { value: function (localName) {
                    localName = String(localName);
                    if (!xml.isValidName(localName))
                        utils.InvalidCharacterError();
                    if (this.isHTML) {
                        if (/[A-Z]/.test(localName))
                            localName = utils.toASCIILowerCase(localName);
                        return html.createElement(this, localName, null);
                    }
                    else if (this.contentType === "application/xhtml+xml") {
                        return html.createElement(this, localName, null);
                    }
                    else {
                        return new Element(this, localName, null, null);
                    }
                }, writable: isApiWritable },
            createElementNS: { value: function (namespace, qualifiedName) {
                    namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
                    qualifiedName = String(qualifiedName);
                    var ve = validateAndExtract(namespace, qualifiedName);
                    return this._createElementNS(ve.localName, ve.namespace, ve.prefix);
                }, writable: isApiWritable },
            _createElementNS: { value: function (localName, namespace, prefix) {
                    if (namespace === NAMESPACE.HTML) {
                        return html.createElement(this, localName, prefix);
                    }
                    else if (namespace === NAMESPACE.SVG) {
                        return svg.createElement(this, localName, prefix);
                    }
                    return new Element(this, localName, namespace, prefix);
                } },
            createEvent: { value: function createEvent(interfaceName) {
                    interfaceName = interfaceName.toLowerCase();
                    var name = replacementEvent[interfaceName] || interfaceName;
                    var constructor = events[supportedEvents[name]];
                    if (constructor) {
                        var e = new constructor();
                        e._initialized = false;
                        return e;
                    }
                    else {
                        utils.NotSupportedError();
                    }
                } },
            createTreeWalker: { value: function (root2, whatToShow, filter) {
                    if (!root2) {
                        throw new TypeError("root argument is required");
                    }
                    if (!(root2 instanceof Node)) {
                        throw new TypeError("root not a node");
                    }
                    whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
                    filter = filter === void 0 ? null : filter;
                    return new TreeWalker(root2, whatToShow, filter);
                } },
            createNodeIterator: { value: function (root2, whatToShow, filter) {
                    if (!root2) {
                        throw new TypeError("root argument is required");
                    }
                    if (!(root2 instanceof Node)) {
                        throw new TypeError("root not a node");
                    }
                    whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
                    filter = filter === void 0 ? null : filter;
                    return new NodeIterator(root2, whatToShow, filter);
                } },
            _attachNodeIterator: { value: function (ni) {
                    if (!this._nodeIterators) {
                        this._nodeIterators = [];
                    }
                    this._nodeIterators.push(ni);
                } },
            _detachNodeIterator: { value: function (ni) {
                    var idx = this._nodeIterators.indexOf(ni);
                    this._nodeIterators.splice(idx, 1);
                } },
            _preremoveNodeIterators: { value: function (toBeRemoved) {
                    if (this._nodeIterators) {
                        this._nodeIterators.forEach(function (ni) {
                            ni._preremove(toBeRemoved);
                        });
                    }
                } },
            _updateDocTypeElement: { value: function _updateDocTypeElement() {
                    this.doctype = this.documentElement = null;
                    for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                        if (kid.nodeType === Node.DOCUMENT_TYPE_NODE)
                            this.doctype = kid;
                        else if (kid.nodeType === Node.ELEMENT_NODE)
                            this.documentElement = kid;
                    }
                } },
            insertBefore: { value: function insertBefore(child, refChild) {
                    Node.prototype.insertBefore.call(this, child, refChild);
                    this._updateDocTypeElement();
                    return child;
                } },
            replaceChild: { value: function replaceChild(node, child) {
                    Node.prototype.replaceChild.call(this, node, child);
                    this._updateDocTypeElement();
                    return child;
                } },
            removeChild: { value: function removeChild(child) {
                    Node.prototype.removeChild.call(this, child);
                    this._updateDocTypeElement();
                    return child;
                } },
            getElementById: { value: function (id) {
                    var n = this.byId[id];
                    if (!n)
                        return null;
                    if (n instanceof MultiId) {
                        return n.getFirst();
                    }
                    return n;
                } },
            _hasMultipleElementsWithId: { value: function (id) {
                    return this.byId[id] instanceof MultiId;
                } },
            getElementsByName: { value: Element.prototype.getElementsByName },
            getElementsByTagName: { value: Element.prototype.getElementsByTagName },
            getElementsByTagNameNS: { value: Element.prototype.getElementsByTagNameNS },
            getElementsByClassName: { value: Element.prototype.getElementsByClassName },
            adoptNode: { value: function adoptNode(node) {
                    if (node.nodeType === Node.DOCUMENT_NODE)
                        utils.NotSupportedError();
                    if (node.nodeType === Node.ATTRIBUTE_NODE) {
                        return node;
                    }
                    if (node.parentNode)
                        node.parentNode.removeChild(node);
                    if (node.ownerDocument !== this)
                        recursivelySetOwner(node, this);
                    return node;
                } },
            importNode: { value: function importNode(node, deep) {
                    return this.adoptNode(node.cloneNode(deep));
                }, writable: isApiWritable },
            origin: { get: function origin() {
                    return null;
                } },
            characterSet: { get: function characterSet() {
                    return "UTF-8";
                } },
            contentType: { get: function contentType() {
                    return this._contentType;
                } },
            URL: { get: function URL2() {
                    return this._address;
                } },
            domain: { get: utils.nyi, set: utils.nyi },
            referrer: { get: utils.nyi },
            cookie: { get: utils.nyi, set: utils.nyi },
            lastModified: { get: utils.nyi },
            location: {
                get: function () {
                    return this.defaultView ? this.defaultView.location : null;
                },
                set: utils.nyi
            },
            _titleElement: {
                get: function () {
                    return this.getElementsByTagName("title").item(0) || null;
                }
            },
            title: {
                get: function () {
                    var elt = this._titleElement;
                    var value = elt ? elt.textContent : "";
                    return value.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
                },
                set: function (value) {
                    var elt = this._titleElement;
                    var head = this.head;
                    if (!elt && !head) {
                        return;
                    }
                    if (!elt) {
                        elt = this.createElement("title");
                        head.appendChild(elt);
                    }
                    elt.textContent = value;
                }
            },
            dir: mirrorAttr(function () {
                var htmlElement = this.documentElement;
                if (htmlElement && htmlElement.tagName === "HTML") {
                    return htmlElement;
                }
            }, "dir", ""),
            fgColor: mirrorAttr(function () {
                return this.body;
            }, "text", ""),
            linkColor: mirrorAttr(function () {
                return this.body;
            }, "link", ""),
            vlinkColor: mirrorAttr(function () {
                return this.body;
            }, "vLink", ""),
            alinkColor: mirrorAttr(function () {
                return this.body;
            }, "aLink", ""),
            bgColor: mirrorAttr(function () {
                return this.body;
            }, "bgColor", ""),
            charset: { get: function () {
                    return this.characterSet;
                } },
            inputEncoding: { get: function () {
                    return this.characterSet;
                } },
            scrollingElement: {
                get: function () {
                    return this._quirks ? this.body : this.documentElement;
                }
            },
            body: {
                get: function () {
                    return namedHTMLChild(this.documentElement, "body");
                },
                set: utils.nyi
            },
            head: { get: function () {
                    return namedHTMLChild(this.documentElement, "head");
                } },
            images: { get: utils.nyi },
            embeds: { get: utils.nyi },
            plugins: { get: utils.nyi },
            links: { get: utils.nyi },
            forms: { get: utils.nyi },
            scripts: { get: utils.nyi },
            applets: { get: function () {
                    return [];
                } },
            activeElement: { get: function () {
                    return null;
                } },
            innerHTML: {
                get: function () {
                    return this.serialize();
                },
                set: utils.nyi
            },
            outerHTML: {
                get: function () {
                    return this.serialize();
                },
                set: utils.nyi
            },
            write: { value: function (args) {
                    if (!this.isHTML)
                        utils.InvalidStateError();
                    if (!this._parser)
                        return;
                    if (!this._parser) {
                    }
                    var s = arguments.join("");
                    this._parser.parse(s);
                } },
            writeln: { value: function writeln(args) {
                    this.write(Array.prototype.join.call(arguments, "") + "\n");
                } },
            open: { value: function () {
                    this.documentElement = null;
                } },
            close: { value: function () {
                    this.readyState = "interactive";
                    this._dispatchEvent(new Event("readystatechange"), true);
                    this._dispatchEvent(new Event("DOMContentLoaded"), true);
                    this.readyState = "complete";
                    this._dispatchEvent(new Event("readystatechange"), true);
                    if (this.defaultView) {
                        this.defaultView._dispatchEvent(new Event("load"), true);
                    }
                } },
            clone: { value: function clone() {
                    var d = new Document(this.isHTML, this._address);
                    d._quirks = this._quirks;
                    d._contentType = this._contentType;
                    return d;
                } },
            cloneNode: { value: function cloneNode(deep) {
                    var clone = Node.prototype.cloneNode.call(this, false);
                    if (deep) {
                        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
                            clone._appendChild(clone.importNode(kid, true));
                        }
                    }
                    clone._updateDocTypeElement();
                    return clone;
                } },
            isEqual: { value: function isEqual(n) {
                    return true;
                } },
            mutateValue: { value: function (node) {
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.VALUE,
                            target: node,
                            data: node.data
                        });
                    }
                } },
            mutateAttr: { value: function (attr, oldval) {
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.ATTR,
                            target: attr.ownerElement,
                            attr
                        });
                    }
                } },
            mutateRemoveAttr: { value: function (attr) {
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.REMOVE_ATTR,
                            target: attr.ownerElement,
                            attr
                        });
                    }
                } },
            mutateRemove: { value: function (node) {
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.REMOVE,
                            target: node.parentNode,
                            node
                        });
                    }
                    recursivelyUproot(node);
                } },
            mutateInsert: { value: function (node) {
                    recursivelyRoot(node);
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.INSERT,
                            target: node.parentNode,
                            node
                        });
                    }
                } },
            mutateMove: { value: function (node) {
                    if (this.mutationHandler) {
                        this.mutationHandler({
                            type: MUTATE.MOVE,
                            target: node
                        });
                    }
                } },
            addId: { value: function addId(id, n) {
                    var val = this.byId[id];
                    if (!val) {
                        this.byId[id] = n;
                    }
                    else {
                        if (!(val instanceof MultiId)) {
                            val = new MultiId(val);
                            this.byId[id] = val;
                        }
                        val.add(n);
                    }
                } },
            delId: { value: function delId(id, n) {
                    var val = this.byId[id];
                    utils.assert(val);
                    if (val instanceof MultiId) {
                        val.del(n);
                        if (val.length === 1) {
                            this.byId[id] = val.downgrade();
                        }
                    }
                    else {
                        this.byId[id] = void 0;
                    }
                } },
            _resolve: { value: function (href) {
                    return new URL(this._documentBaseURL).resolve(href);
                } },
            _documentBaseURL: { get: function () {
                    var url = this._address;
                    if (url === "about:blank")
                        url = "/";
                    var base = this.querySelector("base[href]");
                    if (base) {
                        return new URL(url).resolve(base.getAttribute("href"));
                    }
                    return url;
                } },
            _templateDoc: { get: function () {
                    if (!this._templateDocCache) {
                        var newDoc = new Document(this.isHTML, this._address);
                        this._templateDocCache = newDoc._templateDocCache = newDoc;
                    }
                    return this._templateDocCache;
                } },
            querySelector: { value: function (selector) {
                    return select(selector, this)[0];
                } },
            querySelectorAll: { value: function (selector) {
                    var nodes = select(selector, this);
                    return nodes.item ? nodes : new NodeList(nodes);
                } }
        });
        var eventHandlerTypes = [
            "abort",
            "canplay",
            "canplaythrough",
            "change",
            "click",
            "contextmenu",
            "cuechange",
            "dblclick",
            "drag",
            "dragend",
            "dragenter",
            "dragleave",
            "dragover",
            "dragstart",
            "drop",
            "durationchange",
            "emptied",
            "ended",
            "input",
            "invalid",
            "keydown",
            "keypress",
            "keyup",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "mousewheel",
            "pause",
            "play",
            "playing",
            "progress",
            "ratechange",
            "readystatechange",
            "reset",
            "seeked",
            "seeking",
            "select",
            "show",
            "stalled",
            "submit",
            "suspend",
            "timeupdate",
            "volumechange",
            "waiting",
            "blur",
            "error",
            "focus",
            "load",
            "scroll"
        ];
        eventHandlerTypes.forEach(function (type) {
            Object.defineProperty(Document.prototype, "on" + type, {
                get: function () {
                    return this._getEventHandler(type);
                },
                set: function (v) {
                    this._setEventHandler(type, v);
                }
            });
        });
        function namedHTMLChild(parent, name) {
            if (parent && parent.isHTML) {
                for (var kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
                    if (kid.nodeType === Node.ELEMENT_NODE && kid.localName === name && kid.namespaceURI === NAMESPACE.HTML) {
                        return kid;
                    }
                }
            }
            return null;
        }
        function root(n) {
            n._nid = n.ownerDocument._nextnid++;
            n.ownerDocument._nodes[n._nid] = n;
            if (n.nodeType === Node.ELEMENT_NODE) {
                var id = n.getAttribute("id");
                if (id)
                    n.ownerDocument.addId(id, n);
                if (n._roothook)
                    n._roothook();
            }
        }
        function uproot(n) {
            if (n.nodeType === Node.ELEMENT_NODE) {
                var id = n.getAttribute("id");
                if (id)
                    n.ownerDocument.delId(id, n);
            }
            n.ownerDocument._nodes[n._nid] = void 0;
            n._nid = void 0;
        }
        function recursivelyRoot(node) {
            root(node);
            if (node.nodeType === Node.ELEMENT_NODE) {
                for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling)
                    recursivelyRoot(kid);
            }
        }
        function recursivelyUproot(node) {
            uproot(node);
            for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling)
                recursivelyUproot(kid);
        }
        function recursivelySetOwner(node, owner) {
            node.ownerDocument = owner;
            node._lastModTime = void 0;
            if (Object.prototype.hasOwnProperty.call(node, "_tagName")) {
                node._tagName = void 0;
            }
            for (var kid = node.firstChild; kid !== null; kid = kid.nextSibling)
                recursivelySetOwner(kid, owner);
        }
        function MultiId(node) {
            this.nodes = /* @__PURE__ */ Object.create(null);
            this.nodes[node._nid] = node;
            this.length = 1;
            this.firstNode = void 0;
        }
        MultiId.prototype.add = function (node) {
            if (!this.nodes[node._nid]) {
                this.nodes[node._nid] = node;
                this.length++;
                this.firstNode = void 0;
            }
        };
        MultiId.prototype.del = function (node) {
            if (this.nodes[node._nid]) {
                delete this.nodes[node._nid];
                this.length--;
                this.firstNode = void 0;
            }
        };
        MultiId.prototype.getFirst = function () {
            if (!this.firstNode) {
                var nid;
                for (nid in this.nodes) {
                    if (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[nid]) & Node.DOCUMENT_POSITION_PRECEDING) {
                        this.firstNode = this.nodes[nid];
                    }
                }
            }
            return this.firstNode;
        };
        MultiId.prototype.downgrade = function () {
            if (this.length === 1) {
                var nid;
                for (nid in this.nodes) {
                    return this.nodes[nid];
                }
            }
            return this;
        };
    }
});
// external/npm/node_modules/domino/lib/DocumentType.js
var require_DocumentType = __commonJS({
    "external/npm/node_modules/domino/lib/DocumentType.js"(exports, module) {
        "use strict";
        module.exports = DocumentType;
        var Node = require_Node();
        var Leaf = require_Leaf();
        var ChildNode = require_ChildNode();
        function DocumentType(ownerDocument, name, publicId, systemId) {
            Leaf.call(this);
            this.nodeType = Node.DOCUMENT_TYPE_NODE;
            this.ownerDocument = ownerDocument || null;
            this.name = name;
            this.publicId = publicId || "";
            this.systemId = systemId || "";
        }
        DocumentType.prototype = Object.create(Leaf.prototype, {
            nodeName: { get: function () {
                    return this.name;
                } },
            nodeValue: {
                get: function () {
                    return null;
                },
                set: function () {
                }
            },
            clone: { value: function clone() {
                    return new DocumentType(this.ownerDocument, this.name, this.publicId, this.systemId);
                } },
            isEqual: { value: function isEqual(n) {
                    return this.name === n.name && this.publicId === n.publicId && this.systemId === n.systemId;
                } }
        });
        Object.defineProperties(DocumentType.prototype, ChildNode);
    }
});
// external/npm/node_modules/domino/lib/HTMLParser.js
var require_HTMLParser = __commonJS({
    "external/npm/node_modules/domino/lib/HTMLParser.js"(exports, module) {
        "use strict";
        module.exports = HTMLParser;
        var Document = require_Document();
        var DocumentType = require_DocumentType();
        var Node = require_Node();
        var NAMESPACE = require_utils().NAMESPACE;
        var html = require_htmlelts();
        var impl = html.elements;
        var pushAll = Function.prototype.apply.bind(Array.prototype.push);
        var EOF = -1;
        var TEXT = 1;
        var TAG = 2;
        var ENDTAG = 3;
        var COMMENT = 4;
        var DOCTYPE = 5;
        var NOATTRS = [];
        var quirkyPublicIds = /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i;
        var quirkySystemId = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
        var conditionallyQuirkyPublicIds = /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i;
        var limitedQuirkyPublicIds = /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i;
        var specialSet = /* @__PURE__ */ Object.create(null);
        specialSet[NAMESPACE.HTML] = {
            __proto__: null,
            "address": true,
            "applet": true,
            "area": true,
            "article": true,
            "aside": true,
            "base": true,
            "basefont": true,
            "bgsound": true,
            "blockquote": true,
            "body": true,
            "br": true,
            "button": true,
            "caption": true,
            "center": true,
            "col": true,
            "colgroup": true,
            "dd": true,
            "details": true,
            "dir": true,
            "div": true,
            "dl": true,
            "dt": true,
            "embed": true,
            "fieldset": true,
            "figcaption": true,
            "figure": true,
            "footer": true,
            "form": true,
            "frame": true,
            "frameset": true,
            "h1": true,
            "h2": true,
            "h3": true,
            "h4": true,
            "h5": true,
            "h6": true,
            "head": true,
            "header": true,
            "hgroup": true,
            "hr": true,
            "html": true,
            "iframe": true,
            "img": true,
            "input": true,
            "li": true,
            "link": true,
            "listing": true,
            "main": true,
            "marquee": true,
            "menu": true,
            "meta": true,
            "nav": true,
            "noembed": true,
            "noframes": true,
            "noscript": true,
            "object": true,
            "ol": true,
            "p": true,
            "param": true,
            "plaintext": true,
            "pre": true,
            "script": true,
            "section": true,
            "select": true,
            "source": true,
            "style": true,
            "summary": true,
            "table": true,
            "tbody": true,
            "td": true,
            "template": true,
            "textarea": true,
            "tfoot": true,
            "th": true,
            "thead": true,
            "title": true,
            "tr": true,
            "track": true,
            "ul": true,
            "wbr": true,
            "xmp": true
        };
        specialSet[NAMESPACE.SVG] = {
            __proto__: null,
            "foreignObject": true,
            "desc": true,
            "title": true
        };
        specialSet[NAMESPACE.MATHML] = {
            __proto__: null,
            "mi": true,
            "mo": true,
            "mn": true,
            "ms": true,
            "mtext": true,
            "annotation-xml": true
        };
        var addressdivpSet = /* @__PURE__ */ Object.create(null);
        addressdivpSet[NAMESPACE.HTML] = {
            __proto__: null,
            "address": true,
            "div": true,
            "p": true
        };
        var dddtSet = /* @__PURE__ */ Object.create(null);
        dddtSet[NAMESPACE.HTML] = {
            __proto__: null,
            "dd": true,
            "dt": true
        };
        var tablesectionrowSet = /* @__PURE__ */ Object.create(null);
        tablesectionrowSet[NAMESPACE.HTML] = {
            __proto__: null,
            "table": true,
            "thead": true,
            "tbody": true,
            "tfoot": true,
            "tr": true
        };
        var impliedEndTagsSet = /* @__PURE__ */ Object.create(null);
        impliedEndTagsSet[NAMESPACE.HTML] = {
            __proto__: null,
            "dd": true,
            "dt": true,
            "li": true,
            "menuitem": true,
            "optgroup": true,
            "option": true,
            "p": true,
            "rb": true,
            "rp": true,
            "rt": true,
            "rtc": true
        };
        var thoroughImpliedEndTagsSet = /* @__PURE__ */ Object.create(null);
        thoroughImpliedEndTagsSet[NAMESPACE.HTML] = {
            __proto__: null,
            "caption": true,
            "colgroup": true,
            "dd": true,
            "dt": true,
            "li": true,
            "optgroup": true,
            "option": true,
            "p": true,
            "rb": true,
            "rp": true,
            "rt": true,
            "rtc": true,
            "tbody": true,
            "td": true,
            "tfoot": true,
            "th": true,
            "thead": true,
            "tr": true
        };
        var tableContextSet = /* @__PURE__ */ Object.create(null);
        tableContextSet[NAMESPACE.HTML] = {
            __proto__: null,
            "table": true,
            "template": true,
            "html": true
        };
        var tableBodyContextSet = /* @__PURE__ */ Object.create(null);
        tableBodyContextSet[NAMESPACE.HTML] = {
            __proto__: null,
            "tbody": true,
            "tfoot": true,
            "thead": true,
            "template": true,
            "html": true
        };
        var tableRowContextSet = /* @__PURE__ */ Object.create(null);
        tableRowContextSet[NAMESPACE.HTML] = {
            __proto__: null,
            "tr": true,
            "template": true,
            "html": true
        };
        var formassociatedSet = /* @__PURE__ */ Object.create(null);
        formassociatedSet[NAMESPACE.HTML] = {
            __proto__: null,
            "button": true,
            "fieldset": true,
            "input": true,
            "keygen": true,
            "object": true,
            "output": true,
            "select": true,
            "textarea": true,
            "img": true
        };
        var inScopeSet = /* @__PURE__ */ Object.create(null);
        inScopeSet[NAMESPACE.HTML] = {
            __proto__: null,
            "applet": true,
            "caption": true,
            "html": true,
            "table": true,
            "td": true,
            "th": true,
            "marquee": true,
            "object": true,
            "template": true
        };
        inScopeSet[NAMESPACE.MATHML] = {
            __proto__: null,
            "mi": true,
            "mo": true,
            "mn": true,
            "ms": true,
            "mtext": true,
            "annotation-xml": true
        };
        inScopeSet[NAMESPACE.SVG] = {
            __proto__: null,
            "foreignObject": true,
            "desc": true,
            "title": true
        };
        var inListItemScopeSet = Object.create(inScopeSet);
        inListItemScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
        inListItemScopeSet[NAMESPACE.HTML].ol = true;
        inListItemScopeSet[NAMESPACE.HTML].ul = true;
        var inButtonScopeSet = Object.create(inScopeSet);
        inButtonScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
        inButtonScopeSet[NAMESPACE.HTML].button = true;
        var inTableScopeSet = /* @__PURE__ */ Object.create(null);
        inTableScopeSet[NAMESPACE.HTML] = {
            __proto__: null,
            "html": true,
            "table": true,
            "template": true
        };
        var invertedSelectScopeSet = /* @__PURE__ */ Object.create(null);
        invertedSelectScopeSet[NAMESPACE.HTML] = {
            __proto__: null,
            "optgroup": true,
            "option": true
        };
        var mathmlTextIntegrationPointSet = /* @__PURE__ */ Object.create(null);
        mathmlTextIntegrationPointSet[NAMESPACE.MATHML] = {
            __proto__: null,
            mi: true,
            mo: true,
            mn: true,
            ms: true,
            mtext: true
        };
        var htmlIntegrationPointSet = /* @__PURE__ */ Object.create(null);
        htmlIntegrationPointSet[NAMESPACE.SVG] = {
            __proto__: null,
            foreignObject: true,
            desc: true,
            title: true
        };
        var foreignAttributes = {
            __proto__: null,
            "xlink:actuate": NAMESPACE.XLINK,
            "xlink:arcrole": NAMESPACE.XLINK,
            "xlink:href": NAMESPACE.XLINK,
            "xlink:role": NAMESPACE.XLINK,
            "xlink:show": NAMESPACE.XLINK,
            "xlink:title": NAMESPACE.XLINK,
            "xlink:type": NAMESPACE.XLINK,
            "xml:base": NAMESPACE.XML,
            "xml:lang": NAMESPACE.XML,
            "xml:space": NAMESPACE.XML,
            "xmlns": NAMESPACE.XMLNS,
            "xmlns:xlink": NAMESPACE.XMLNS
        };
        var svgAttrAdjustments = {
            __proto__: null,
            attributename: "attributeName",
            attributetype: "attributeType",
            basefrequency: "baseFrequency",
            baseprofile: "baseProfile",
            calcmode: "calcMode",
            clippathunits: "clipPathUnits",
            diffuseconstant: "diffuseConstant",
            edgemode: "edgeMode",
            filterunits: "filterUnits",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            limitingconeangle: "limitingConeAngle",
            markerheight: "markerHeight",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            numoctaves: "numOctaves",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            refx: "refX",
            refy: "refY",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stitchtiles: "stitchTiles",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textlength: "textLength",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            xchannelselector: "xChannelSelector",
            ychannelselector: "yChannelSelector",
            zoomandpan: "zoomAndPan"
        };
        var svgTagNameAdjustments = {
            __proto__: null,
            altglyph: "altGlyph",
            altglyphdef: "altGlyphDef",
            altglyphitem: "altGlyphItem",
            animatecolor: "animateColor",
            animatemotion: "animateMotion",
            animatetransform: "animateTransform",
            clippath: "clipPath",
            feblend: "feBlend",
            fecolormatrix: "feColorMatrix",
            fecomponenttransfer: "feComponentTransfer",
            fecomposite: "feComposite",
            feconvolvematrix: "feConvolveMatrix",
            fediffuselighting: "feDiffuseLighting",
            fedisplacementmap: "feDisplacementMap",
            fedistantlight: "feDistantLight",
            feflood: "feFlood",
            fefunca: "feFuncA",
            fefuncb: "feFuncB",
            fefuncg: "feFuncG",
            fefuncr: "feFuncR",
            fegaussianblur: "feGaussianBlur",
            feimage: "feImage",
            femerge: "feMerge",
            femergenode: "feMergeNode",
            femorphology: "feMorphology",
            feoffset: "feOffset",
            fepointlight: "fePointLight",
            fespecularlighting: "feSpecularLighting",
            fespotlight: "feSpotLight",
            fetile: "feTile",
            feturbulence: "feTurbulence",
            foreignobject: "foreignObject",
            glyphref: "glyphRef",
            lineargradient: "linearGradient",
            radialgradient: "radialGradient",
            textpath: "textPath"
        };
        var numericCharRefReplacements = {
            __proto__: null,
            0: 65533,
            128: 8364,
            130: 8218,
            131: 402,
            132: 8222,
            133: 8230,
            134: 8224,
            135: 8225,
            136: 710,
            137: 8240,
            138: 352,
            139: 8249,
            140: 338,
            142: 381,
            145: 8216,
            146: 8217,
            147: 8220,
            148: 8221,
            149: 8226,
            150: 8211,
            151: 8212,
            152: 732,
            153: 8482,
            154: 353,
            155: 8250,
            156: 339,
            158: 382,
            159: 376
        };
        var namedCharRefs = {
            __proto__: null,
            "AElig": 198,
            "AElig;": 198,
            "AMP": 38,
            "AMP;": 38,
            "Aacute": 193,
            "Aacute;": 193,
            "Abreve;": 258,
            "Acirc": 194,
            "Acirc;": 194,
            "Acy;": 1040,
            "Afr;": [55349, 56580],
            "Agrave": 192,
            "Agrave;": 192,
            "Alpha;": 913,
            "Amacr;": 256,
            "And;": 10835,
            "Aogon;": 260,
            "Aopf;": [55349, 56632],
            "ApplyFunction;": 8289,
            "Aring": 197,
            "Aring;": 197,
            "Ascr;": [55349, 56476],
            "Assign;": 8788,
            "Atilde": 195,
            "Atilde;": 195,
            "Auml": 196,
            "Auml;": 196,
            "Backslash;": 8726,
            "Barv;": 10983,
            "Barwed;": 8966,
            "Bcy;": 1041,
            "Because;": 8757,
            "Bernoullis;": 8492,
            "Beta;": 914,
            "Bfr;": [55349, 56581],
            "Bopf;": [55349, 56633],
            "Breve;": 728,
            "Bscr;": 8492,
            "Bumpeq;": 8782,
            "CHcy;": 1063,
            "COPY": 169,
            "COPY;": 169,
            "Cacute;": 262,
            "Cap;": 8914,
            "CapitalDifferentialD;": 8517,
            "Cayleys;": 8493,
            "Ccaron;": 268,
            "Ccedil": 199,
            "Ccedil;": 199,
            "Ccirc;": 264,
            "Cconint;": 8752,
            "Cdot;": 266,
            "Cedilla;": 184,
            "CenterDot;": 183,
            "Cfr;": 8493,
            "Chi;": 935,
            "CircleDot;": 8857,
            "CircleMinus;": 8854,
            "CirclePlus;": 8853,
            "CircleTimes;": 8855,
            "ClockwiseContourIntegral;": 8754,
            "CloseCurlyDoubleQuote;": 8221,
            "CloseCurlyQuote;": 8217,
            "Colon;": 8759,
            "Colone;": 10868,
            "Congruent;": 8801,
            "Conint;": 8751,
            "ContourIntegral;": 8750,
            "Copf;": 8450,
            "Coproduct;": 8720,
            "CounterClockwiseContourIntegral;": 8755,
            "Cross;": 10799,
            "Cscr;": [55349, 56478],
            "Cup;": 8915,
            "CupCap;": 8781,
            "DD;": 8517,
            "DDotrahd;": 10513,
            "DJcy;": 1026,
            "DScy;": 1029,
            "DZcy;": 1039,
            "Dagger;": 8225,
            "Darr;": 8609,
            "Dashv;": 10980,
            "Dcaron;": 270,
            "Dcy;": 1044,
            "Del;": 8711,
            "Delta;": 916,
            "Dfr;": [55349, 56583],
            "DiacriticalAcute;": 180,
            "DiacriticalDot;": 729,
            "DiacriticalDoubleAcute;": 733,
            "DiacriticalGrave;": 96,
            "DiacriticalTilde;": 732,
            "Diamond;": 8900,
            "DifferentialD;": 8518,
            "Dopf;": [55349, 56635],
            "Dot;": 168,
            "DotDot;": 8412,
            "DotEqual;": 8784,
            "DoubleContourIntegral;": 8751,
            "DoubleDot;": 168,
            "DoubleDownArrow;": 8659,
            "DoubleLeftArrow;": 8656,
            "DoubleLeftRightArrow;": 8660,
            "DoubleLeftTee;": 10980,
            "DoubleLongLeftArrow;": 10232,
            "DoubleLongLeftRightArrow;": 10234,
            "DoubleLongRightArrow;": 10233,
            "DoubleRightArrow;": 8658,
            "DoubleRightTee;": 8872,
            "DoubleUpArrow;": 8657,
            "DoubleUpDownArrow;": 8661,
            "DoubleVerticalBar;": 8741,
            "DownArrow;": 8595,
            "DownArrowBar;": 10515,
            "DownArrowUpArrow;": 8693,
            "DownBreve;": 785,
            "DownLeftRightVector;": 10576,
            "DownLeftTeeVector;": 10590,
            "DownLeftVector;": 8637,
            "DownLeftVectorBar;": 10582,
            "DownRightTeeVector;": 10591,
            "DownRightVector;": 8641,
            "DownRightVectorBar;": 10583,
            "DownTee;": 8868,
            "DownTeeArrow;": 8615,
            "Downarrow;": 8659,
            "Dscr;": [55349, 56479],
            "Dstrok;": 272,
            "ENG;": 330,
            "ETH": 208,
            "ETH;": 208,
            "Eacute": 201,
            "Eacute;": 201,
            "Ecaron;": 282,
            "Ecirc": 202,
            "Ecirc;": 202,
            "Ecy;": 1069,
            "Edot;": 278,
            "Efr;": [55349, 56584],
            "Egrave": 200,
            "Egrave;": 200,
            "Element;": 8712,
            "Emacr;": 274,
            "EmptySmallSquare;": 9723,
            "EmptyVerySmallSquare;": 9643,
            "Eogon;": 280,
            "Eopf;": [55349, 56636],
            "Epsilon;": 917,
            "Equal;": 10869,
            "EqualTilde;": 8770,
            "Equilibrium;": 8652,
            "Escr;": 8496,
            "Esim;": 10867,
            "Eta;": 919,
            "Euml": 203,
            "Euml;": 203,
            "Exists;": 8707,
            "ExponentialE;": 8519,
            "Fcy;": 1060,
            "Ffr;": [55349, 56585],
            "FilledSmallSquare;": 9724,
            "FilledVerySmallSquare;": 9642,
            "Fopf;": [55349, 56637],
            "ForAll;": 8704,
            "Fouriertrf;": 8497,
            "Fscr;": 8497,
            "GJcy;": 1027,
            "GT": 62,
            "GT;": 62,
            "Gamma;": 915,
            "Gammad;": 988,
            "Gbreve;": 286,
            "Gcedil;": 290,
            "Gcirc;": 284,
            "Gcy;": 1043,
            "Gdot;": 288,
            "Gfr;": [55349, 56586],
            "Gg;": 8921,
            "Gopf;": [55349, 56638],
            "GreaterEqual;": 8805,
            "GreaterEqualLess;": 8923,
            "GreaterFullEqual;": 8807,
            "GreaterGreater;": 10914,
            "GreaterLess;": 8823,
            "GreaterSlantEqual;": 10878,
            "GreaterTilde;": 8819,
            "Gscr;": [55349, 56482],
            "Gt;": 8811,
            "HARDcy;": 1066,
            "Hacek;": 711,
            "Hat;": 94,
            "Hcirc;": 292,
            "Hfr;": 8460,
            "HilbertSpace;": 8459,
            "Hopf;": 8461,
            "HorizontalLine;": 9472,
            "Hscr;": 8459,
            "Hstrok;": 294,
            "HumpDownHump;": 8782,
            "HumpEqual;": 8783,
            "IEcy;": 1045,
            "IJlig;": 306,
            "IOcy;": 1025,
            "Iacute": 205,
            "Iacute;": 205,
            "Icirc": 206,
            "Icirc;": 206,
            "Icy;": 1048,
            "Idot;": 304,
            "Ifr;": 8465,
            "Igrave": 204,
            "Igrave;": 204,
            "Im;": 8465,
            "Imacr;": 298,
            "ImaginaryI;": 8520,
            "Implies;": 8658,
            "Int;": 8748,
            "Integral;": 8747,
            "Intersection;": 8898,
            "InvisibleComma;": 8291,
            "InvisibleTimes;": 8290,
            "Iogon;": 302,
            "Iopf;": [55349, 56640],
            "Iota;": 921,
            "Iscr;": 8464,
            "Itilde;": 296,
            "Iukcy;": 1030,
            "Iuml": 207,
            "Iuml;": 207,
            "Jcirc;": 308,
            "Jcy;": 1049,
            "Jfr;": [55349, 56589],
            "Jopf;": [55349, 56641],
            "Jscr;": [55349, 56485],
            "Jsercy;": 1032,
            "Jukcy;": 1028,
            "KHcy;": 1061,
            "KJcy;": 1036,
            "Kappa;": 922,
            "Kcedil;": 310,
            "Kcy;": 1050,
            "Kfr;": [55349, 56590],
            "Kopf;": [55349, 56642],
            "Kscr;": [55349, 56486],
            "LJcy;": 1033,
            "LT": 60,
            "LT;": 60,
            "Lacute;": 313,
            "Lambda;": 923,
            "Lang;": 10218,
            "Laplacetrf;": 8466,
            "Larr;": 8606,
            "Lcaron;": 317,
            "Lcedil;": 315,
            "Lcy;": 1051,
            "LeftAngleBracket;": 10216,
            "LeftArrow;": 8592,
            "LeftArrowBar;": 8676,
            "LeftArrowRightArrow;": 8646,
            "LeftCeiling;": 8968,
            "LeftDoubleBracket;": 10214,
            "LeftDownTeeVector;": 10593,
            "LeftDownVector;": 8643,
            "LeftDownVectorBar;": 10585,
            "LeftFloor;": 8970,
            "LeftRightArrow;": 8596,
            "LeftRightVector;": 10574,
            "LeftTee;": 8867,
            "LeftTeeArrow;": 8612,
            "LeftTeeVector;": 10586,
            "LeftTriangle;": 8882,
            "LeftTriangleBar;": 10703,
            "LeftTriangleEqual;": 8884,
            "LeftUpDownVector;": 10577,
            "LeftUpTeeVector;": 10592,
            "LeftUpVector;": 8639,
            "LeftUpVectorBar;": 10584,
            "LeftVector;": 8636,
            "LeftVectorBar;": 10578,
            "Leftarrow;": 8656,
            "Leftrightarrow;": 8660,
            "LessEqualGreater;": 8922,
            "LessFullEqual;": 8806,
            "LessGreater;": 8822,
            "LessLess;": 10913,
            "LessSlantEqual;": 10877,
            "LessTilde;": 8818,
            "Lfr;": [55349, 56591],
            "Ll;": 8920,
            "Lleftarrow;": 8666,
            "Lmidot;": 319,
            "LongLeftArrow;": 10229,
            "LongLeftRightArrow;": 10231,
            "LongRightArrow;": 10230,
            "Longleftarrow;": 10232,
            "Longleftrightarrow;": 10234,
            "Longrightarrow;": 10233,
            "Lopf;": [55349, 56643],
            "LowerLeftArrow;": 8601,
            "LowerRightArrow;": 8600,
            "Lscr;": 8466,
            "Lsh;": 8624,
            "Lstrok;": 321,
            "Lt;": 8810,
            "Map;": 10501,
            "Mcy;": 1052,
            "MediumSpace;": 8287,
            "Mellintrf;": 8499,
            "Mfr;": [55349, 56592],
            "MinusPlus;": 8723,
            "Mopf;": [55349, 56644],
            "Mscr;": 8499,
            "Mu;": 924,
            "NJcy;": 1034,
            "Nacute;": 323,
            "Ncaron;": 327,
            "Ncedil;": 325,
            "Ncy;": 1053,
            "NegativeMediumSpace;": 8203,
            "NegativeThickSpace;": 8203,
            "NegativeThinSpace;": 8203,
            "NegativeVeryThinSpace;": 8203,
            "NestedGreaterGreater;": 8811,
            "NestedLessLess;": 8810,
            "NewLine;": 10,
            "Nfr;": [55349, 56593],
            "NoBreak;": 8288,
            "NonBreakingSpace;": 160,
            "Nopf;": 8469,
            "Not;": 10988,
            "NotCongruent;": 8802,
            "NotCupCap;": 8813,
            "NotDoubleVerticalBar;": 8742,
            "NotElement;": 8713,
            "NotEqual;": 8800,
            "NotEqualTilde;": [8770, 824],
            "NotExists;": 8708,
            "NotGreater;": 8815,
            "NotGreaterEqual;": 8817,
            "NotGreaterFullEqual;": [8807, 824],
            "NotGreaterGreater;": [8811, 824],
            "NotGreaterLess;": 8825,
            "NotGreaterSlantEqual;": [10878, 824],
            "NotGreaterTilde;": 8821,
            "NotHumpDownHump;": [8782, 824],
            "NotHumpEqual;": [8783, 824],
            "NotLeftTriangle;": 8938,
            "NotLeftTriangleBar;": [10703, 824],
            "NotLeftTriangleEqual;": 8940,
            "NotLess;": 8814,
            "NotLessEqual;": 8816,
            "NotLessGreater;": 8824,
            "NotLessLess;": [8810, 824],
            "NotLessSlantEqual;": [10877, 824],
            "NotLessTilde;": 8820,
            "NotNestedGreaterGreater;": [10914, 824],
            "NotNestedLessLess;": [10913, 824],
            "NotPrecedes;": 8832,
            "NotPrecedesEqual;": [10927, 824],
            "NotPrecedesSlantEqual;": 8928,
            "NotReverseElement;": 8716,
            "NotRightTriangle;": 8939,
            "NotRightTriangleBar;": [10704, 824],
            "NotRightTriangleEqual;": 8941,
            "NotSquareSubset;": [8847, 824],
            "NotSquareSubsetEqual;": 8930,
            "NotSquareSuperset;": [8848, 824],
            "NotSquareSupersetEqual;": 8931,
            "NotSubset;": [8834, 8402],
            "NotSubsetEqual;": 8840,
            "NotSucceeds;": 8833,
            "NotSucceedsEqual;": [10928, 824],
            "NotSucceedsSlantEqual;": 8929,
            "NotSucceedsTilde;": [8831, 824],
            "NotSuperset;": [8835, 8402],
            "NotSupersetEqual;": 8841,
            "NotTilde;": 8769,
            "NotTildeEqual;": 8772,
            "NotTildeFullEqual;": 8775,
            "NotTildeTilde;": 8777,
            "NotVerticalBar;": 8740,
            "Nscr;": [55349, 56489],
            "Ntilde": 209,
            "Ntilde;": 209,
            "Nu;": 925,
            "OElig;": 338,
            "Oacute": 211,
            "Oacute;": 211,
            "Ocirc": 212,
            "Ocirc;": 212,
            "Ocy;": 1054,
            "Odblac;": 336,
            "Ofr;": [55349, 56594],
            "Ograve": 210,
            "Ograve;": 210,
            "Omacr;": 332,
            "Omega;": 937,
            "Omicron;": 927,
            "Oopf;": [55349, 56646],
            "OpenCurlyDoubleQuote;": 8220,
            "OpenCurlyQuote;": 8216,
            "Or;": 10836,
            "Oscr;": [55349, 56490],
            "Oslash": 216,
            "Oslash;": 216,
            "Otilde": 213,
            "Otilde;": 213,
            "Otimes;": 10807,
            "Ouml": 214,
            "Ouml;": 214,
            "OverBar;": 8254,
            "OverBrace;": 9182,
            "OverBracket;": 9140,
            "OverParenthesis;": 9180,
            "PartialD;": 8706,
            "Pcy;": 1055,
            "Pfr;": [55349, 56595],
            "Phi;": 934,
            "Pi;": 928,
            "PlusMinus;": 177,
            "Poincareplane;": 8460,
            "Popf;": 8473,
            "Pr;": 10939,
            "Precedes;": 8826,
            "PrecedesEqual;": 10927,
            "PrecedesSlantEqual;": 8828,
            "PrecedesTilde;": 8830,
            "Prime;": 8243,
            "Product;": 8719,
            "Proportion;": 8759,
            "Proportional;": 8733,
            "Pscr;": [55349, 56491],
            "Psi;": 936,
            "QUOT": 34,
            "QUOT;": 34,
            "Qfr;": [55349, 56596],
            "Qopf;": 8474,
            "Qscr;": [55349, 56492],
            "RBarr;": 10512,
            "REG": 174,
            "REG;": 174,
            "Racute;": 340,
            "Rang;": 10219,
            "Rarr;": 8608,
            "Rarrtl;": 10518,
            "Rcaron;": 344,
            "Rcedil;": 342,
            "Rcy;": 1056,
            "Re;": 8476,
            "ReverseElement;": 8715,
            "ReverseEquilibrium;": 8651,
            "ReverseUpEquilibrium;": 10607,
            "Rfr;": 8476,
            "Rho;": 929,
            "RightAngleBracket;": 10217,
            "RightArrow;": 8594,
            "RightArrowBar;": 8677,
            "RightArrowLeftArrow;": 8644,
            "RightCeiling;": 8969,
            "RightDoubleBracket;": 10215,
            "RightDownTeeVector;": 10589,
            "RightDownVector;": 8642,
            "RightDownVectorBar;": 10581,
            "RightFloor;": 8971,
            "RightTee;": 8866,
            "RightTeeArrow;": 8614,
            "RightTeeVector;": 10587,
            "RightTriangle;": 8883,
            "RightTriangleBar;": 10704,
            "RightTriangleEqual;": 8885,
            "RightUpDownVector;": 10575,
            "RightUpTeeVector;": 10588,
            "RightUpVector;": 8638,
            "RightUpVectorBar;": 10580,
            "RightVector;": 8640,
            "RightVectorBar;": 10579,
            "Rightarrow;": 8658,
            "Ropf;": 8477,
            "RoundImplies;": 10608,
            "Rrightarrow;": 8667,
            "Rscr;": 8475,
            "Rsh;": 8625,
            "RuleDelayed;": 10740,
            "SHCHcy;": 1065,
            "SHcy;": 1064,
            "SOFTcy;": 1068,
            "Sacute;": 346,
            "Sc;": 10940,
            "Scaron;": 352,
            "Scedil;": 350,
            "Scirc;": 348,
            "Scy;": 1057,
            "Sfr;": [55349, 56598],
            "ShortDownArrow;": 8595,
            "ShortLeftArrow;": 8592,
            "ShortRightArrow;": 8594,
            "ShortUpArrow;": 8593,
            "Sigma;": 931,
            "SmallCircle;": 8728,
            "Sopf;": [55349, 56650],
            "Sqrt;": 8730,
            "Square;": 9633,
            "SquareIntersection;": 8851,
            "SquareSubset;": 8847,
            "SquareSubsetEqual;": 8849,
            "SquareSuperset;": 8848,
            "SquareSupersetEqual;": 8850,
            "SquareUnion;": 8852,
            "Sscr;": [55349, 56494],
            "Star;": 8902,
            "Sub;": 8912,
            "Subset;": 8912,
            "SubsetEqual;": 8838,
            "Succeeds;": 8827,
            "SucceedsEqual;": 10928,
            "SucceedsSlantEqual;": 8829,
            "SucceedsTilde;": 8831,
            "SuchThat;": 8715,
            "Sum;": 8721,
            "Sup;": 8913,
            "Superset;": 8835,
            "SupersetEqual;": 8839,
            "Supset;": 8913,
            "THORN": 222,
            "THORN;": 222,
            "TRADE;": 8482,
            "TSHcy;": 1035,
            "TScy;": 1062,
            "Tab;": 9,
            "Tau;": 932,
            "Tcaron;": 356,
            "Tcedil;": 354,
            "Tcy;": 1058,
            "Tfr;": [55349, 56599],
            "Therefore;": 8756,
            "Theta;": 920,
            "ThickSpace;": [8287, 8202],
            "ThinSpace;": 8201,
            "Tilde;": 8764,
            "TildeEqual;": 8771,
            "TildeFullEqual;": 8773,
            "TildeTilde;": 8776,
            "Topf;": [55349, 56651],
            "TripleDot;": 8411,
            "Tscr;": [55349, 56495],
            "Tstrok;": 358,
            "Uacute": 218,
            "Uacute;": 218,
            "Uarr;": 8607,
            "Uarrocir;": 10569,
            "Ubrcy;": 1038,
            "Ubreve;": 364,
            "Ucirc": 219,
            "Ucirc;": 219,
            "Ucy;": 1059,
            "Udblac;": 368,
            "Ufr;": [55349, 56600],
            "Ugrave": 217,
            "Ugrave;": 217,
            "Umacr;": 362,
            "UnderBar;": 95,
            "UnderBrace;": 9183,
            "UnderBracket;": 9141,
            "UnderParenthesis;": 9181,
            "Union;": 8899,
            "UnionPlus;": 8846,
            "Uogon;": 370,
            "Uopf;": [55349, 56652],
            "UpArrow;": 8593,
            "UpArrowBar;": 10514,
            "UpArrowDownArrow;": 8645,
            "UpDownArrow;": 8597,
            "UpEquilibrium;": 10606,
            "UpTee;": 8869,
            "UpTeeArrow;": 8613,
            "Uparrow;": 8657,
            "Updownarrow;": 8661,
            "UpperLeftArrow;": 8598,
            "UpperRightArrow;": 8599,
            "Upsi;": 978,
            "Upsilon;": 933,
            "Uring;": 366,
            "Uscr;": [55349, 56496],
            "Utilde;": 360,
            "Uuml": 220,
            "Uuml;": 220,
            "VDash;": 8875,
            "Vbar;": 10987,
            "Vcy;": 1042,
            "Vdash;": 8873,
            "Vdashl;": 10982,
            "Vee;": 8897,
            "Verbar;": 8214,
            "Vert;": 8214,
            "VerticalBar;": 8739,
            "VerticalLine;": 124,
            "VerticalSeparator;": 10072,
            "VerticalTilde;": 8768,
            "VeryThinSpace;": 8202,
            "Vfr;": [55349, 56601],
            "Vopf;": [55349, 56653],
            "Vscr;": [55349, 56497],
            "Vvdash;": 8874,
            "Wcirc;": 372,
            "Wedge;": 8896,
            "Wfr;": [55349, 56602],
            "Wopf;": [55349, 56654],
            "Wscr;": [55349, 56498],
            "Xfr;": [55349, 56603],
            "Xi;": 926,
            "Xopf;": [55349, 56655],
            "Xscr;": [55349, 56499],
            "YAcy;": 1071,
            "YIcy;": 1031,
            "YUcy;": 1070,
            "Yacute": 221,
            "Yacute;": 221,
            "Ycirc;": 374,
            "Ycy;": 1067,
            "Yfr;": [55349, 56604],
            "Yopf;": [55349, 56656],
            "Yscr;": [55349, 56500],
            "Yuml;": 376,
            "ZHcy;": 1046,
            "Zacute;": 377,
            "Zcaron;": 381,
            "Zcy;": 1047,
            "Zdot;": 379,
            "ZeroWidthSpace;": 8203,
            "Zeta;": 918,
            "Zfr;": 8488,
            "Zopf;": 8484,
            "Zscr;": [55349, 56501],
            "aacute": 225,
            "aacute;": 225,
            "abreve;": 259,
            "ac;": 8766,
            "acE;": [8766, 819],
            "acd;": 8767,
            "acirc": 226,
            "acirc;": 226,
            "acute": 180,
            "acute;": 180,
            "acy;": 1072,
            "aelig": 230,
            "aelig;": 230,
            "af;": 8289,
            "afr;": [55349, 56606],
            "agrave": 224,
            "agrave;": 224,
            "alefsym;": 8501,
            "aleph;": 8501,
            "alpha;": 945,
            "amacr;": 257,
            "amalg;": 10815,
            "amp": 38,
            "amp;": 38,
            "and;": 8743,
            "andand;": 10837,
            "andd;": 10844,
            "andslope;": 10840,
            "andv;": 10842,
            "ang;": 8736,
            "ange;": 10660,
            "angle;": 8736,
            "angmsd;": 8737,
            "angmsdaa;": 10664,
            "angmsdab;": 10665,
            "angmsdac;": 10666,
            "angmsdad;": 10667,
            "angmsdae;": 10668,
            "angmsdaf;": 10669,
            "angmsdag;": 10670,
            "angmsdah;": 10671,
            "angrt;": 8735,
            "angrtvb;": 8894,
            "angrtvbd;": 10653,
            "angsph;": 8738,
            "angst;": 197,
            "angzarr;": 9084,
            "aogon;": 261,
            "aopf;": [55349, 56658],
            "ap;": 8776,
            "apE;": 10864,
            "apacir;": 10863,
            "ape;": 8778,
            "apid;": 8779,
            "apos;": 39,
            "approx;": 8776,
            "approxeq;": 8778,
            "aring": 229,
            "aring;": 229,
            "ascr;": [55349, 56502],
            "ast;": 42,
            "asymp;": 8776,
            "asympeq;": 8781,
            "atilde": 227,
            "atilde;": 227,
            "auml": 228,
            "auml;": 228,
            "awconint;": 8755,
            "awint;": 10769,
            "bNot;": 10989,
            "backcong;": 8780,
            "backepsilon;": 1014,
            "backprime;": 8245,
            "backsim;": 8765,
            "backsimeq;": 8909,
            "barvee;": 8893,
            "barwed;": 8965,
            "barwedge;": 8965,
            "bbrk;": 9141,
            "bbrktbrk;": 9142,
            "bcong;": 8780,
            "bcy;": 1073,
            "bdquo;": 8222,
            "becaus;": 8757,
            "because;": 8757,
            "bemptyv;": 10672,
            "bepsi;": 1014,
            "bernou;": 8492,
            "beta;": 946,
            "beth;": 8502,
            "between;": 8812,
            "bfr;": [55349, 56607],
            "bigcap;": 8898,
            "bigcirc;": 9711,
            "bigcup;": 8899,
            "bigodot;": 10752,
            "bigoplus;": 10753,
            "bigotimes;": 10754,
            "bigsqcup;": 10758,
            "bigstar;": 9733,
            "bigtriangledown;": 9661,
            "bigtriangleup;": 9651,
            "biguplus;": 10756,
            "bigvee;": 8897,
            "bigwedge;": 8896,
            "bkarow;": 10509,
            "blacklozenge;": 10731,
            "blacksquare;": 9642,
            "blacktriangle;": 9652,
            "blacktriangledown;": 9662,
            "blacktriangleleft;": 9666,
            "blacktriangleright;": 9656,
            "blank;": 9251,
            "blk12;": 9618,
            "blk14;": 9617,
            "blk34;": 9619,
            "block;": 9608,
            "bne;": [61, 8421],
            "bnequiv;": [8801, 8421],
            "bnot;": 8976,
            "bopf;": [55349, 56659],
            "bot;": 8869,
            "bottom;": 8869,
            "bowtie;": 8904,
            "boxDL;": 9559,
            "boxDR;": 9556,
            "boxDl;": 9558,
            "boxDr;": 9555,
            "boxH;": 9552,
            "boxHD;": 9574,
            "boxHU;": 9577,
            "boxHd;": 9572,
            "boxHu;": 9575,
            "boxUL;": 9565,
            "boxUR;": 9562,
            "boxUl;": 9564,
            "boxUr;": 9561,
            "boxV;": 9553,
            "boxVH;": 9580,
            "boxVL;": 9571,
            "boxVR;": 9568,
            "boxVh;": 9579,
            "boxVl;": 9570,
            "boxVr;": 9567,
            "boxbox;": 10697,
            "boxdL;": 9557,
            "boxdR;": 9554,
            "boxdl;": 9488,
            "boxdr;": 9484,
            "boxh;": 9472,
            "boxhD;": 9573,
            "boxhU;": 9576,
            "boxhd;": 9516,
            "boxhu;": 9524,
            "boxminus;": 8863,
            "boxplus;": 8862,
            "boxtimes;": 8864,
            "boxuL;": 9563,
            "boxuR;": 9560,
            "boxul;": 9496,
            "boxur;": 9492,
            "boxv;": 9474,
            "boxvH;": 9578,
            "boxvL;": 9569,
            "boxvR;": 9566,
            "boxvh;": 9532,
            "boxvl;": 9508,
            "boxvr;": 9500,
            "bprime;": 8245,
            "breve;": 728,
            "brvbar": 166,
            "brvbar;": 166,
            "bscr;": [55349, 56503],
            "bsemi;": 8271,
            "bsim;": 8765,
            "bsime;": 8909,
            "bsol;": 92,
            "bsolb;": 10693,
            "bsolhsub;": 10184,
            "bull;": 8226,
            "bullet;": 8226,
            "bump;": 8782,
            "bumpE;": 10926,
            "bumpe;": 8783,
            "bumpeq;": 8783,
            "cacute;": 263,
            "cap;": 8745,
            "capand;": 10820,
            "capbrcup;": 10825,
            "capcap;": 10827,
            "capcup;": 10823,
            "capdot;": 10816,
            "caps;": [8745, 65024],
            "caret;": 8257,
            "caron;": 711,
            "ccaps;": 10829,
            "ccaron;": 269,
            "ccedil": 231,
            "ccedil;": 231,
            "ccirc;": 265,
            "ccups;": 10828,
            "ccupssm;": 10832,
            "cdot;": 267,
            "cedil": 184,
            "cedil;": 184,
            "cemptyv;": 10674,
            "cent": 162,
            "cent;": 162,
            "centerdot;": 183,
            "cfr;": [55349, 56608],
            "chcy;": 1095,
            "check;": 10003,
            "checkmark;": 10003,
            "chi;": 967,
            "cir;": 9675,
            "cirE;": 10691,
            "circ;": 710,
            "circeq;": 8791,
            "circlearrowleft;": 8634,
            "circlearrowright;": 8635,
            "circledR;": 174,
            "circledS;": 9416,
            "circledast;": 8859,
            "circledcirc;": 8858,
            "circleddash;": 8861,
            "cire;": 8791,
            "cirfnint;": 10768,
            "cirmid;": 10991,
            "cirscir;": 10690,
            "clubs;": 9827,
            "clubsuit;": 9827,
            "colon;": 58,
            "colone;": 8788,
            "coloneq;": 8788,
            "comma;": 44,
            "commat;": 64,
            "comp;": 8705,
            "compfn;": 8728,
            "complement;": 8705,
            "complexes;": 8450,
            "cong;": 8773,
            "congdot;": 10861,
            "conint;": 8750,
            "copf;": [55349, 56660],
            "coprod;": 8720,
            "copy": 169,
            "copy;": 169,
            "copysr;": 8471,
            "crarr;": 8629,
            "cross;": 10007,
            "cscr;": [55349, 56504],
            "csub;": 10959,
            "csube;": 10961,
            "csup;": 10960,
            "csupe;": 10962,
            "ctdot;": 8943,
            "cudarrl;": 10552,
            "cudarrr;": 10549,
            "cuepr;": 8926,
            "cuesc;": 8927,
            "cularr;": 8630,
            "cularrp;": 10557,
            "cup;": 8746,
            "cupbrcap;": 10824,
            "cupcap;": 10822,
            "cupcup;": 10826,
            "cupdot;": 8845,
            "cupor;": 10821,
            "cups;": [8746, 65024],
            "curarr;": 8631,
            "curarrm;": 10556,
            "curlyeqprec;": 8926,
            "curlyeqsucc;": 8927,
            "curlyvee;": 8910,
            "curlywedge;": 8911,
            "curren": 164,
            "curren;": 164,
            "curvearrowleft;": 8630,
            "curvearrowright;": 8631,
            "cuvee;": 8910,
            "cuwed;": 8911,
            "cwconint;": 8754,
            "cwint;": 8753,
            "cylcty;": 9005,
            "dArr;": 8659,
            "dHar;": 10597,
            "dagger;": 8224,
            "daleth;": 8504,
            "darr;": 8595,
            "dash;": 8208,
            "dashv;": 8867,
            "dbkarow;": 10511,
            "dblac;": 733,
            "dcaron;": 271,
            "dcy;": 1076,
            "dd;": 8518,
            "ddagger;": 8225,
            "ddarr;": 8650,
            "ddotseq;": 10871,
            "deg": 176,
            "deg;": 176,
            "delta;": 948,
            "demptyv;": 10673,
            "dfisht;": 10623,
            "dfr;": [55349, 56609],
            "dharl;": 8643,
            "dharr;": 8642,
            "diam;": 8900,
            "diamond;": 8900,
            "diamondsuit;": 9830,
            "diams;": 9830,
            "die;": 168,
            "digamma;": 989,
            "disin;": 8946,
            "div;": 247,
            "divide": 247,
            "divide;": 247,
            "divideontimes;": 8903,
            "divonx;": 8903,
            "djcy;": 1106,
            "dlcorn;": 8990,
            "dlcrop;": 8973,
            "dollar;": 36,
            "dopf;": [55349, 56661],
            "dot;": 729,
            "doteq;": 8784,
            "doteqdot;": 8785,
            "dotminus;": 8760,
            "dotplus;": 8724,
            "dotsquare;": 8865,
            "doublebarwedge;": 8966,
            "downarrow;": 8595,
            "downdownarrows;": 8650,
            "downharpoonleft;": 8643,
            "downharpoonright;": 8642,
            "drbkarow;": 10512,
            "drcorn;": 8991,
            "drcrop;": 8972,
            "dscr;": [55349, 56505],
            "dscy;": 1109,
            "dsol;": 10742,
            "dstrok;": 273,
            "dtdot;": 8945,
            "dtri;": 9663,
            "dtrif;": 9662,
            "duarr;": 8693,
            "duhar;": 10607,
            "dwangle;": 10662,
            "dzcy;": 1119,
            "dzigrarr;": 10239,
            "eDDot;": 10871,
            "eDot;": 8785,
            "eacute": 233,
            "eacute;": 233,
            "easter;": 10862,
            "ecaron;": 283,
            "ecir;": 8790,
            "ecirc": 234,
            "ecirc;": 234,
            "ecolon;": 8789,
            "ecy;": 1101,
            "edot;": 279,
            "ee;": 8519,
            "efDot;": 8786,
            "efr;": [55349, 56610],
            "eg;": 10906,
            "egrave": 232,
            "egrave;": 232,
            "egs;": 10902,
            "egsdot;": 10904,
            "el;": 10905,
            "elinters;": 9191,
            "ell;": 8467,
            "els;": 10901,
            "elsdot;": 10903,
            "emacr;": 275,
            "empty;": 8709,
            "emptyset;": 8709,
            "emptyv;": 8709,
            "emsp13;": 8196,
            "emsp14;": 8197,
            "emsp;": 8195,
            "eng;": 331,
            "ensp;": 8194,
            "eogon;": 281,
            "eopf;": [55349, 56662],
            "epar;": 8917,
            "eparsl;": 10723,
            "eplus;": 10865,
            "epsi;": 949,
            "epsilon;": 949,
            "epsiv;": 1013,
            "eqcirc;": 8790,
            "eqcolon;": 8789,
            "eqsim;": 8770,
            "eqslantgtr;": 10902,
            "eqslantless;": 10901,
            "equals;": 61,
            "equest;": 8799,
            "equiv;": 8801,
            "equivDD;": 10872,
            "eqvparsl;": 10725,
            "erDot;": 8787,
            "erarr;": 10609,
            "escr;": 8495,
            "esdot;": 8784,
            "esim;": 8770,
            "eta;": 951,
            "eth": 240,
            "eth;": 240,
            "euml": 235,
            "euml;": 235,
            "euro;": 8364,
            "excl;": 33,
            "exist;": 8707,
            "expectation;": 8496,
            "exponentiale;": 8519,
            "fallingdotseq;": 8786,
            "fcy;": 1092,
            "female;": 9792,
            "ffilig;": 64259,
            "fflig;": 64256,
            "ffllig;": 64260,
            "ffr;": [55349, 56611],
            "filig;": 64257,
            "fjlig;": [102, 106],
            "flat;": 9837,
            "fllig;": 64258,
            "fltns;": 9649,
            "fnof;": 402,
            "fopf;": [55349, 56663],
            "forall;": 8704,
            "fork;": 8916,
            "forkv;": 10969,
            "fpartint;": 10765,
            "frac12": 189,
            "frac12;": 189,
            "frac13;": 8531,
            "frac14": 188,
            "frac14;": 188,
            "frac15;": 8533,
            "frac16;": 8537,
            "frac18;": 8539,
            "frac23;": 8532,
            "frac25;": 8534,
            "frac34": 190,
            "frac34;": 190,
            "frac35;": 8535,
            "frac38;": 8540,
            "frac45;": 8536,
            "frac56;": 8538,
            "frac58;": 8541,
            "frac78;": 8542,
            "frasl;": 8260,
            "frown;": 8994,
            "fscr;": [55349, 56507],
            "gE;": 8807,
            "gEl;": 10892,
            "gacute;": 501,
            "gamma;": 947,
            "gammad;": 989,
            "gap;": 10886,
            "gbreve;": 287,
            "gcirc;": 285,
            "gcy;": 1075,
            "gdot;": 289,
            "ge;": 8805,
            "gel;": 8923,
            "geq;": 8805,
            "geqq;": 8807,
            "geqslant;": 10878,
            "ges;": 10878,
            "gescc;": 10921,
            "gesdot;": 10880,
            "gesdoto;": 10882,
            "gesdotol;": 10884,
            "gesl;": [8923, 65024],
            "gesles;": 10900,
            "gfr;": [55349, 56612],
            "gg;": 8811,
            "ggg;": 8921,
            "gimel;": 8503,
            "gjcy;": 1107,
            "gl;": 8823,
            "glE;": 10898,
            "gla;": 10917,
            "glj;": 10916,
            "gnE;": 8809,
            "gnap;": 10890,
            "gnapprox;": 10890,
            "gne;": 10888,
            "gneq;": 10888,
            "gneqq;": 8809,
            "gnsim;": 8935,
            "gopf;": [55349, 56664],
            "grave;": 96,
            "gscr;": 8458,
            "gsim;": 8819,
            "gsime;": 10894,
            "gsiml;": 10896,
            "gt": 62,
            "gt;": 62,
            "gtcc;": 10919,
            "gtcir;": 10874,
            "gtdot;": 8919,
            "gtlPar;": 10645,
            "gtquest;": 10876,
            "gtrapprox;": 10886,
            "gtrarr;": 10616,
            "gtrdot;": 8919,
            "gtreqless;": 8923,
            "gtreqqless;": 10892,
            "gtrless;": 8823,
            "gtrsim;": 8819,
            "gvertneqq;": [8809, 65024],
            "gvnE;": [8809, 65024],
            "hArr;": 8660,
            "hairsp;": 8202,
            "half;": 189,
            "hamilt;": 8459,
            "hardcy;": 1098,
            "harr;": 8596,
            "harrcir;": 10568,
            "harrw;": 8621,
            "hbar;": 8463,
            "hcirc;": 293,
            "hearts;": 9829,
            "heartsuit;": 9829,
            "hellip;": 8230,
            "hercon;": 8889,
            "hfr;": [55349, 56613],
            "hksearow;": 10533,
            "hkswarow;": 10534,
            "hoarr;": 8703,
            "homtht;": 8763,
            "hookleftarrow;": 8617,
            "hookrightarrow;": 8618,
            "hopf;": [55349, 56665],
            "horbar;": 8213,
            "hscr;": [55349, 56509],
            "hslash;": 8463,
            "hstrok;": 295,
            "hybull;": 8259,
            "hyphen;": 8208,
            "iacute": 237,
            "iacute;": 237,
            "ic;": 8291,
            "icirc": 238,
            "icirc;": 238,
            "icy;": 1080,
            "iecy;": 1077,
            "iexcl": 161,
            "iexcl;": 161,
            "iff;": 8660,
            "ifr;": [55349, 56614],
            "igrave": 236,
            "igrave;": 236,
            "ii;": 8520,
            "iiiint;": 10764,
            "iiint;": 8749,
            "iinfin;": 10716,
            "iiota;": 8489,
            "ijlig;": 307,
            "imacr;": 299,
            "image;": 8465,
            "imagline;": 8464,
            "imagpart;": 8465,
            "imath;": 305,
            "imof;": 8887,
            "imped;": 437,
            "in;": 8712,
            "incare;": 8453,
            "infin;": 8734,
            "infintie;": 10717,
            "inodot;": 305,
            "int;": 8747,
            "intcal;": 8890,
            "integers;": 8484,
            "intercal;": 8890,
            "intlarhk;": 10775,
            "intprod;": 10812,
            "iocy;": 1105,
            "iogon;": 303,
            "iopf;": [55349, 56666],
            "iota;": 953,
            "iprod;": 10812,
            "iquest": 191,
            "iquest;": 191,
            "iscr;": [55349, 56510],
            "isin;": 8712,
            "isinE;": 8953,
            "isindot;": 8949,
            "isins;": 8948,
            "isinsv;": 8947,
            "isinv;": 8712,
            "it;": 8290,
            "itilde;": 297,
            "iukcy;": 1110,
            "iuml": 239,
            "iuml;": 239,
            "jcirc;": 309,
            "jcy;": 1081,
            "jfr;": [55349, 56615],
            "jmath;": 567,
            "jopf;": [55349, 56667],
            "jscr;": [55349, 56511],
            "jsercy;": 1112,
            "jukcy;": 1108,
            "kappa;": 954,
            "kappav;": 1008,
            "kcedil;": 311,
            "kcy;": 1082,
            "kfr;": [55349, 56616],
            "kgreen;": 312,
            "khcy;": 1093,
            "kjcy;": 1116,
            "kopf;": [55349, 56668],
            "kscr;": [55349, 56512],
            "lAarr;": 8666,
            "lArr;": 8656,
            "lAtail;": 10523,
            "lBarr;": 10510,
            "lE;": 8806,
            "lEg;": 10891,
            "lHar;": 10594,
            "lacute;": 314,
            "laemptyv;": 10676,
            "lagran;": 8466,
            "lambda;": 955,
            "lang;": 10216,
            "langd;": 10641,
            "langle;": 10216,
            "lap;": 10885,
            "laquo": 171,
            "laquo;": 171,
            "larr;": 8592,
            "larrb;": 8676,
            "larrbfs;": 10527,
            "larrfs;": 10525,
            "larrhk;": 8617,
            "larrlp;": 8619,
            "larrpl;": 10553,
            "larrsim;": 10611,
            "larrtl;": 8610,
            "lat;": 10923,
            "latail;": 10521,
            "late;": 10925,
            "lates;": [10925, 65024],
            "lbarr;": 10508,
            "lbbrk;": 10098,
            "lbrace;": 123,
            "lbrack;": 91,
            "lbrke;": 10635,
            "lbrksld;": 10639,
            "lbrkslu;": 10637,
            "lcaron;": 318,
            "lcedil;": 316,
            "lceil;": 8968,
            "lcub;": 123,
            "lcy;": 1083,
            "ldca;": 10550,
            "ldquo;": 8220,
            "ldquor;": 8222,
            "ldrdhar;": 10599,
            "ldrushar;": 10571,
            "ldsh;": 8626,
            "le;": 8804,
            "leftarrow;": 8592,
            "leftarrowtail;": 8610,
            "leftharpoondown;": 8637,
            "leftharpoonup;": 8636,
            "leftleftarrows;": 8647,
            "leftrightarrow;": 8596,
            "leftrightarrows;": 8646,
            "leftrightharpoons;": 8651,
            "leftrightsquigarrow;": 8621,
            "leftthreetimes;": 8907,
            "leg;": 8922,
            "leq;": 8804,
            "leqq;": 8806,
            "leqslant;": 10877,
            "les;": 10877,
            "lescc;": 10920,
            "lesdot;": 10879,
            "lesdoto;": 10881,
            "lesdotor;": 10883,
            "lesg;": [8922, 65024],
            "lesges;": 10899,
            "lessapprox;": 10885,
            "lessdot;": 8918,
            "lesseqgtr;": 8922,
            "lesseqqgtr;": 10891,
            "lessgtr;": 8822,
            "lesssim;": 8818,
            "lfisht;": 10620,
            "lfloor;": 8970,
            "lfr;": [55349, 56617],
            "lg;": 8822,
            "lgE;": 10897,
            "lhard;": 8637,
            "lharu;": 8636,
            "lharul;": 10602,
            "lhblk;": 9604,
            "ljcy;": 1113,
            "ll;": 8810,
            "llarr;": 8647,
            "llcorner;": 8990,
            "llhard;": 10603,
            "lltri;": 9722,
            "lmidot;": 320,
            "lmoust;": 9136,
            "lmoustache;": 9136,
            "lnE;": 8808,
            "lnap;": 10889,
            "lnapprox;": 10889,
            "lne;": 10887,
            "lneq;": 10887,
            "lneqq;": 8808,
            "lnsim;": 8934,
            "loang;": 10220,
            "loarr;": 8701,
            "lobrk;": 10214,
            "longleftarrow;": 10229,
            "longleftrightarrow;": 10231,
            "longmapsto;": 10236,
            "longrightarrow;": 10230,
            "looparrowleft;": 8619,
            "looparrowright;": 8620,
            "lopar;": 10629,
            "lopf;": [55349, 56669],
            "loplus;": 10797,
            "lotimes;": 10804,
            "lowast;": 8727,
            "lowbar;": 95,
            "loz;": 9674,
            "lozenge;": 9674,
            "lozf;": 10731,
            "lpar;": 40,
            "lparlt;": 10643,
            "lrarr;": 8646,
            "lrcorner;": 8991,
            "lrhar;": 8651,
            "lrhard;": 10605,
            "lrm;": 8206,
            "lrtri;": 8895,
            "lsaquo;": 8249,
            "lscr;": [55349, 56513],
            "lsh;": 8624,
            "lsim;": 8818,
            "lsime;": 10893,
            "lsimg;": 10895,
            "lsqb;": 91,
            "lsquo;": 8216,
            "lsquor;": 8218,
            "lstrok;": 322,
            "lt": 60,
            "lt;": 60,
            "ltcc;": 10918,
            "ltcir;": 10873,
            "ltdot;": 8918,
            "lthree;": 8907,
            "ltimes;": 8905,
            "ltlarr;": 10614,
            "ltquest;": 10875,
            "ltrPar;": 10646,
            "ltri;": 9667,
            "ltrie;": 8884,
            "ltrif;": 9666,
            "lurdshar;": 10570,
            "luruhar;": 10598,
            "lvertneqq;": [8808, 65024],
            "lvnE;": [8808, 65024],
            "mDDot;": 8762,
            "macr": 175,
            "macr;": 175,
            "male;": 9794,
            "malt;": 10016,
            "maltese;": 10016,
            "map;": 8614,
            "mapsto;": 8614,
            "mapstodown;": 8615,
            "mapstoleft;": 8612,
            "mapstoup;": 8613,
            "marker;": 9646,
            "mcomma;": 10793,
            "mcy;": 1084,
            "mdash;": 8212,
            "measuredangle;": 8737,
            "mfr;": [55349, 56618],
            "mho;": 8487,
            "micro": 181,
            "micro;": 181,
            "mid;": 8739,
            "midast;": 42,
            "midcir;": 10992,
            "middot": 183,
            "middot;": 183,
            "minus;": 8722,
            "minusb;": 8863,
            "minusd;": 8760,
            "minusdu;": 10794,
            "mlcp;": 10971,
            "mldr;": 8230,
            "mnplus;": 8723,
            "models;": 8871,
            "mopf;": [55349, 56670],
            "mp;": 8723,
            "mscr;": [55349, 56514],
            "mstpos;": 8766,
            "mu;": 956,
            "multimap;": 8888,
            "mumap;": 8888,
            "nGg;": [8921, 824],
            "nGt;": [8811, 8402],
            "nGtv;": [8811, 824],
            "nLeftarrow;": 8653,
            "nLeftrightarrow;": 8654,
            "nLl;": [8920, 824],
            "nLt;": [8810, 8402],
            "nLtv;": [8810, 824],
            "nRightarrow;": 8655,
            "nVDash;": 8879,
            "nVdash;": 8878,
            "nabla;": 8711,
            "nacute;": 324,
            "nang;": [8736, 8402],
            "nap;": 8777,
            "napE;": [10864, 824],
            "napid;": [8779, 824],
            "napos;": 329,
            "napprox;": 8777,
            "natur;": 9838,
            "natural;": 9838,
            "naturals;": 8469,
            "nbsp": 160,
            "nbsp;": 160,
            "nbump;": [8782, 824],
            "nbumpe;": [8783, 824],
            "ncap;": 10819,
            "ncaron;": 328,
            "ncedil;": 326,
            "ncong;": 8775,
            "ncongdot;": [10861, 824],
            "ncup;": 10818,
            "ncy;": 1085,
            "ndash;": 8211,
            "ne;": 8800,
            "neArr;": 8663,
            "nearhk;": 10532,
            "nearr;": 8599,
            "nearrow;": 8599,
            "nedot;": [8784, 824],
            "nequiv;": 8802,
            "nesear;": 10536,
            "nesim;": [8770, 824],
            "nexist;": 8708,
            "nexists;": 8708,
            "nfr;": [55349, 56619],
            "ngE;": [8807, 824],
            "nge;": 8817,
            "ngeq;": 8817,
            "ngeqq;": [8807, 824],
            "ngeqslant;": [10878, 824],
            "nges;": [10878, 824],
            "ngsim;": 8821,
            "ngt;": 8815,
            "ngtr;": 8815,
            "nhArr;": 8654,
            "nharr;": 8622,
            "nhpar;": 10994,
            "ni;": 8715,
            "nis;": 8956,
            "nisd;": 8954,
            "niv;": 8715,
            "njcy;": 1114,
            "nlArr;": 8653,
            "nlE;": [8806, 824],
            "nlarr;": 8602,
            "nldr;": 8229,
            "nle;": 8816,
            "nleftarrow;": 8602,
            "nleftrightarrow;": 8622,
            "nleq;": 8816,
            "nleqq;": [8806, 824],
            "nleqslant;": [10877, 824],
            "nles;": [10877, 824],
            "nless;": 8814,
            "nlsim;": 8820,
            "nlt;": 8814,
            "nltri;": 8938,
            "nltrie;": 8940,
            "nmid;": 8740,
            "nopf;": [55349, 56671],
            "not": 172,
            "not;": 172,
            "notin;": 8713,
            "notinE;": [8953, 824],
            "notindot;": [8949, 824],
            "notinva;": 8713,
            "notinvb;": 8951,
            "notinvc;": 8950,
            "notni;": 8716,
            "notniva;": 8716,
            "notnivb;": 8958,
            "notnivc;": 8957,
            "npar;": 8742,
            "nparallel;": 8742,
            "nparsl;": [11005, 8421],
            "npart;": [8706, 824],
            "npolint;": 10772,
            "npr;": 8832,
            "nprcue;": 8928,
            "npre;": [10927, 824],
            "nprec;": 8832,
            "npreceq;": [10927, 824],
            "nrArr;": 8655,
            "nrarr;": 8603,
            "nrarrc;": [10547, 824],
            "nrarrw;": [8605, 824],
            "nrightarrow;": 8603,
            "nrtri;": 8939,
            "nrtrie;": 8941,
            "nsc;": 8833,
            "nsccue;": 8929,
            "nsce;": [10928, 824],
            "nscr;": [55349, 56515],
            "nshortmid;": 8740,
            "nshortparallel;": 8742,
            "nsim;": 8769,
            "nsime;": 8772,
            "nsimeq;": 8772,
            "nsmid;": 8740,
            "nspar;": 8742,
            "nsqsube;": 8930,
            "nsqsupe;": 8931,
            "nsub;": 8836,
            "nsubE;": [10949, 824],
            "nsube;": 8840,
            "nsubset;": [8834, 8402],
            "nsubseteq;": 8840,
            "nsubseteqq;": [10949, 824],
            "nsucc;": 8833,
            "nsucceq;": [10928, 824],
            "nsup;": 8837,
            "nsupE;": [10950, 824],
            "nsupe;": 8841,
            "nsupset;": [8835, 8402],
            "nsupseteq;": 8841,
            "nsupseteqq;": [10950, 824],
            "ntgl;": 8825,
            "ntilde": 241,
            "ntilde;": 241,
            "ntlg;": 8824,
            "ntriangleleft;": 8938,
            "ntrianglelefteq;": 8940,
            "ntriangleright;": 8939,
            "ntrianglerighteq;": 8941,
            "nu;": 957,
            "num;": 35,
            "numero;": 8470,
            "numsp;": 8199,
            "nvDash;": 8877,
            "nvHarr;": 10500,
            "nvap;": [8781, 8402],
            "nvdash;": 8876,
            "nvge;": [8805, 8402],
            "nvgt;": [62, 8402],
            "nvinfin;": 10718,
            "nvlArr;": 10498,
            "nvle;": [8804, 8402],
            "nvlt;": [60, 8402],
            "nvltrie;": [8884, 8402],
            "nvrArr;": 10499,
            "nvrtrie;": [8885, 8402],
            "nvsim;": [8764, 8402],
            "nwArr;": 8662,
            "nwarhk;": 10531,
            "nwarr;": 8598,
            "nwarrow;": 8598,
            "nwnear;": 10535,
            "oS;": 9416,
            "oacute": 243,
            "oacute;": 243,
            "oast;": 8859,
            "ocir;": 8858,
            "ocirc": 244,
            "ocirc;": 244,
            "ocy;": 1086,
            "odash;": 8861,
            "odblac;": 337,
            "odiv;": 10808,
            "odot;": 8857,
            "odsold;": 10684,
            "oelig;": 339,
            "ofcir;": 10687,
            "ofr;": [55349, 56620],
            "ogon;": 731,
            "ograve": 242,
            "ograve;": 242,
            "ogt;": 10689,
            "ohbar;": 10677,
            "ohm;": 937,
            "oint;": 8750,
            "olarr;": 8634,
            "olcir;": 10686,
            "olcross;": 10683,
            "oline;": 8254,
            "olt;": 10688,
            "omacr;": 333,
            "omega;": 969,
            "omicron;": 959,
            "omid;": 10678,
            "ominus;": 8854,
            "oopf;": [55349, 56672],
            "opar;": 10679,
            "operp;": 10681,
            "oplus;": 8853,
            "or;": 8744,
            "orarr;": 8635,
            "ord;": 10845,
            "order;": 8500,
            "orderof;": 8500,
            "ordf": 170,
            "ordf;": 170,
            "ordm": 186,
            "ordm;": 186,
            "origof;": 8886,
            "oror;": 10838,
            "orslope;": 10839,
            "orv;": 10843,
            "oscr;": 8500,
            "oslash": 248,
            "oslash;": 248,
            "osol;": 8856,
            "otilde": 245,
            "otilde;": 245,
            "otimes;": 8855,
            "otimesas;": 10806,
            "ouml": 246,
            "ouml;": 246,
            "ovbar;": 9021,
            "par;": 8741,
            "para": 182,
            "para;": 182,
            "parallel;": 8741,
            "parsim;": 10995,
            "parsl;": 11005,
            "part;": 8706,
            "pcy;": 1087,
            "percnt;": 37,
            "period;": 46,
            "permil;": 8240,
            "perp;": 8869,
            "pertenk;": 8241,
            "pfr;": [55349, 56621],
            "phi;": 966,
            "phiv;": 981,
            "phmmat;": 8499,
            "phone;": 9742,
            "pi;": 960,
            "pitchfork;": 8916,
            "piv;": 982,
            "planck;": 8463,
            "planckh;": 8462,
            "plankv;": 8463,
            "plus;": 43,
            "plusacir;": 10787,
            "plusb;": 8862,
            "pluscir;": 10786,
            "plusdo;": 8724,
            "plusdu;": 10789,
            "pluse;": 10866,
            "plusmn": 177,
            "plusmn;": 177,
            "plussim;": 10790,
            "plustwo;": 10791,
            "pm;": 177,
            "pointint;": 10773,
            "popf;": [55349, 56673],
            "pound": 163,
            "pound;": 163,
            "pr;": 8826,
            "prE;": 10931,
            "prap;": 10935,
            "prcue;": 8828,
            "pre;": 10927,
            "prec;": 8826,
            "precapprox;": 10935,
            "preccurlyeq;": 8828,
            "preceq;": 10927,
            "precnapprox;": 10937,
            "precneqq;": 10933,
            "precnsim;": 8936,
            "precsim;": 8830,
            "prime;": 8242,
            "primes;": 8473,
            "prnE;": 10933,
            "prnap;": 10937,
            "prnsim;": 8936,
            "prod;": 8719,
            "profalar;": 9006,
            "profline;": 8978,
            "profsurf;": 8979,
            "prop;": 8733,
            "propto;": 8733,
            "prsim;": 8830,
            "prurel;": 8880,
            "pscr;": [55349, 56517],
            "psi;": 968,
            "puncsp;": 8200,
            "qfr;": [55349, 56622],
            "qint;": 10764,
            "qopf;": [55349, 56674],
            "qprime;": 8279,
            "qscr;": [55349, 56518],
            "quaternions;": 8461,
            "quatint;": 10774,
            "quest;": 63,
            "questeq;": 8799,
            "quot": 34,
            "quot;": 34,
            "rAarr;": 8667,
            "rArr;": 8658,
            "rAtail;": 10524,
            "rBarr;": 10511,
            "rHar;": 10596,
            "race;": [8765, 817],
            "racute;": 341,
            "radic;": 8730,
            "raemptyv;": 10675,
            "rang;": 10217,
            "rangd;": 10642,
            "range;": 10661,
            "rangle;": 10217,
            "raquo": 187,
            "raquo;": 187,
            "rarr;": 8594,
            "rarrap;": 10613,
            "rarrb;": 8677,
            "rarrbfs;": 10528,
            "rarrc;": 10547,
            "rarrfs;": 10526,
            "rarrhk;": 8618,
            "rarrlp;": 8620,
            "rarrpl;": 10565,
            "rarrsim;": 10612,
            "rarrtl;": 8611,
            "rarrw;": 8605,
            "ratail;": 10522,
            "ratio;": 8758,
            "rationals;": 8474,
            "rbarr;": 10509,
            "rbbrk;": 10099,
            "rbrace;": 125,
            "rbrack;": 93,
            "rbrke;": 10636,
            "rbrksld;": 10638,
            "rbrkslu;": 10640,
            "rcaron;": 345,
            "rcedil;": 343,
            "rceil;": 8969,
            "rcub;": 125,
            "rcy;": 1088,
            "rdca;": 10551,
            "rdldhar;": 10601,
            "rdquo;": 8221,
            "rdquor;": 8221,
            "rdsh;": 8627,
            "real;": 8476,
            "realine;": 8475,
            "realpart;": 8476,
            "reals;": 8477,
            "rect;": 9645,
            "reg": 174,
            "reg;": 174,
            "rfisht;": 10621,
            "rfloor;": 8971,
            "rfr;": [55349, 56623],
            "rhard;": 8641,
            "rharu;": 8640,
            "rharul;": 10604,
            "rho;": 961,
            "rhov;": 1009,
            "rightarrow;": 8594,
            "rightarrowtail;": 8611,
            "rightharpoondown;": 8641,
            "rightharpoonup;": 8640,
            "rightleftarrows;": 8644,
            "rightleftharpoons;": 8652,
            "rightrightarrows;": 8649,
            "rightsquigarrow;": 8605,
            "rightthreetimes;": 8908,
            "ring;": 730,
            "risingdotseq;": 8787,
            "rlarr;": 8644,
            "rlhar;": 8652,
            "rlm;": 8207,
            "rmoust;": 9137,
            "rmoustache;": 9137,
            "rnmid;": 10990,
            "roang;": 10221,
            "roarr;": 8702,
            "robrk;": 10215,
            "ropar;": 10630,
            "ropf;": [55349, 56675],
            "roplus;": 10798,
            "rotimes;": 10805,
            "rpar;": 41,
            "rpargt;": 10644,
            "rppolint;": 10770,
            "rrarr;": 8649,
            "rsaquo;": 8250,
            "rscr;": [55349, 56519],
            "rsh;": 8625,
            "rsqb;": 93,
            "rsquo;": 8217,
            "rsquor;": 8217,
            "rthree;": 8908,
            "rtimes;": 8906,
            "rtri;": 9657,
            "rtrie;": 8885,
            "rtrif;": 9656,
            "rtriltri;": 10702,
            "ruluhar;": 10600,
            "rx;": 8478,
            "sacute;": 347,
            "sbquo;": 8218,
            "sc;": 8827,
            "scE;": 10932,
            "scap;": 10936,
            "scaron;": 353,
            "sccue;": 8829,
            "sce;": 10928,
            "scedil;": 351,
            "scirc;": 349,
            "scnE;": 10934,
            "scnap;": 10938,
            "scnsim;": 8937,
            "scpolint;": 10771,
            "scsim;": 8831,
            "scy;": 1089,
            "sdot;": 8901,
            "sdotb;": 8865,
            "sdote;": 10854,
            "seArr;": 8664,
            "searhk;": 10533,
            "searr;": 8600,
            "searrow;": 8600,
            "sect": 167,
            "sect;": 167,
            "semi;": 59,
            "seswar;": 10537,
            "setminus;": 8726,
            "setmn;": 8726,
            "sext;": 10038,
            "sfr;": [55349, 56624],
            "sfrown;": 8994,
            "sharp;": 9839,
            "shchcy;": 1097,
            "shcy;": 1096,
            "shortmid;": 8739,
            "shortparallel;": 8741,
            "shy": 173,
            "shy;": 173,
            "sigma;": 963,
            "sigmaf;": 962,
            "sigmav;": 962,
            "sim;": 8764,
            "simdot;": 10858,
            "sime;": 8771,
            "simeq;": 8771,
            "simg;": 10910,
            "simgE;": 10912,
            "siml;": 10909,
            "simlE;": 10911,
            "simne;": 8774,
            "simplus;": 10788,
            "simrarr;": 10610,
            "slarr;": 8592,
            "smallsetminus;": 8726,
            "smashp;": 10803,
            "smeparsl;": 10724,
            "smid;": 8739,
            "smile;": 8995,
            "smt;": 10922,
            "smte;": 10924,
            "smtes;": [10924, 65024],
            "softcy;": 1100,
            "sol;": 47,
            "solb;": 10692,
            "solbar;": 9023,
            "sopf;": [55349, 56676],
            "spades;": 9824,
            "spadesuit;": 9824,
            "spar;": 8741,
            "sqcap;": 8851,
            "sqcaps;": [8851, 65024],
            "sqcup;": 8852,
            "sqcups;": [8852, 65024],
            "sqsub;": 8847,
            "sqsube;": 8849,
            "sqsubset;": 8847,
            "sqsubseteq;": 8849,
            "sqsup;": 8848,
            "sqsupe;": 8850,
            "sqsupset;": 8848,
            "sqsupseteq;": 8850,
            "squ;": 9633,
            "square;": 9633,
            "squarf;": 9642,
            "squf;": 9642,
            "srarr;": 8594,
            "sscr;": [55349, 56520],
            "ssetmn;": 8726,
            "ssmile;": 8995,
            "sstarf;": 8902,
            "star;": 9734,
            "starf;": 9733,
            "straightepsilon;": 1013,
            "straightphi;": 981,
            "strns;": 175,
            "sub;": 8834,
            "subE;": 10949,
            "subdot;": 10941,
            "sube;": 8838,
            "subedot;": 10947,
            "submult;": 10945,
            "subnE;": 10955,
            "subne;": 8842,
            "subplus;": 10943,
            "subrarr;": 10617,
            "subset;": 8834,
            "subseteq;": 8838,
            "subseteqq;": 10949,
            "subsetneq;": 8842,
            "subsetneqq;": 10955,
            "subsim;": 10951,
            "subsub;": 10965,
            "subsup;": 10963,
            "succ;": 8827,
            "succapprox;": 10936,
            "succcurlyeq;": 8829,
            "succeq;": 10928,
            "succnapprox;": 10938,
            "succneqq;": 10934,
            "succnsim;": 8937,
            "succsim;": 8831,
            "sum;": 8721,
            "sung;": 9834,
            "sup1": 185,
            "sup1;": 185,
            "sup2": 178,
            "sup2;": 178,
            "sup3": 179,
            "sup3;": 179,
            "sup;": 8835,
            "supE;": 10950,
            "supdot;": 10942,
            "supdsub;": 10968,
            "supe;": 8839,
            "supedot;": 10948,
            "suphsol;": 10185,
            "suphsub;": 10967,
            "suplarr;": 10619,
            "supmult;": 10946,
            "supnE;": 10956,
            "supne;": 8843,
            "supplus;": 10944,
            "supset;": 8835,
            "supseteq;": 8839,
            "supseteqq;": 10950,
            "supsetneq;": 8843,
            "supsetneqq;": 10956,
            "supsim;": 10952,
            "supsub;": 10964,
            "supsup;": 10966,
            "swArr;": 8665,
            "swarhk;": 10534,
            "swarr;": 8601,
            "swarrow;": 8601,
            "swnwar;": 10538,
            "szlig": 223,
            "szlig;": 223,
            "target;": 8982,
            "tau;": 964,
            "tbrk;": 9140,
            "tcaron;": 357,
            "tcedil;": 355,
            "tcy;": 1090,
            "tdot;": 8411,
            "telrec;": 8981,
            "tfr;": [55349, 56625],
            "there4;": 8756,
            "therefore;": 8756,
            "theta;": 952,
            "thetasym;": 977,
            "thetav;": 977,
            "thickapprox;": 8776,
            "thicksim;": 8764,
            "thinsp;": 8201,
            "thkap;": 8776,
            "thksim;": 8764,
            "thorn": 254,
            "thorn;": 254,
            "tilde;": 732,
            "times": 215,
            "times;": 215,
            "timesb;": 8864,
            "timesbar;": 10801,
            "timesd;": 10800,
            "tint;": 8749,
            "toea;": 10536,
            "top;": 8868,
            "topbot;": 9014,
            "topcir;": 10993,
            "topf;": [55349, 56677],
            "topfork;": 10970,
            "tosa;": 10537,
            "tprime;": 8244,
            "trade;": 8482,
            "triangle;": 9653,
            "triangledown;": 9663,
            "triangleleft;": 9667,
            "trianglelefteq;": 8884,
            "triangleq;": 8796,
            "triangleright;": 9657,
            "trianglerighteq;": 8885,
            "tridot;": 9708,
            "trie;": 8796,
            "triminus;": 10810,
            "triplus;": 10809,
            "trisb;": 10701,
            "tritime;": 10811,
            "trpezium;": 9186,
            "tscr;": [55349, 56521],
            "tscy;": 1094,
            "tshcy;": 1115,
            "tstrok;": 359,
            "twixt;": 8812,
            "twoheadleftarrow;": 8606,
            "twoheadrightarrow;": 8608,
            "uArr;": 8657,
            "uHar;": 10595,
            "uacute": 250,
            "uacute;": 250,
            "uarr;": 8593,
            "ubrcy;": 1118,
            "ubreve;": 365,
            "ucirc": 251,
            "ucirc;": 251,
            "ucy;": 1091,
            "udarr;": 8645,
            "udblac;": 369,
            "udhar;": 10606,
            "ufisht;": 10622,
            "ufr;": [55349, 56626],
            "ugrave": 249,
            "ugrave;": 249,
            "uharl;": 8639,
            "uharr;": 8638,
            "uhblk;": 9600,
            "ulcorn;": 8988,
            "ulcorner;": 8988,
            "ulcrop;": 8975,
            "ultri;": 9720,
            "umacr;": 363,
            "uml": 168,
            "uml;": 168,
            "uogon;": 371,
            "uopf;": [55349, 56678],
            "uparrow;": 8593,
            "updownarrow;": 8597,
            "upharpoonleft;": 8639,
            "upharpoonright;": 8638,
            "uplus;": 8846,
            "upsi;": 965,
            "upsih;": 978,
            "upsilon;": 965,
            "upuparrows;": 8648,
            "urcorn;": 8989,
            "urcorner;": 8989,
            "urcrop;": 8974,
            "uring;": 367,
            "urtri;": 9721,
            "uscr;": [55349, 56522],
            "utdot;": 8944,
            "utilde;": 361,
            "utri;": 9653,
            "utrif;": 9652,
            "uuarr;": 8648,
            "uuml": 252,
            "uuml;": 252,
            "uwangle;": 10663,
            "vArr;": 8661,
            "vBar;": 10984,
            "vBarv;": 10985,
            "vDash;": 8872,
            "vangrt;": 10652,
            "varepsilon;": 1013,
            "varkappa;": 1008,
            "varnothing;": 8709,
            "varphi;": 981,
            "varpi;": 982,
            "varpropto;": 8733,
            "varr;": 8597,
            "varrho;": 1009,
            "varsigma;": 962,
            "varsubsetneq;": [8842, 65024],
            "varsubsetneqq;": [10955, 65024],
            "varsupsetneq;": [8843, 65024],
            "varsupsetneqq;": [10956, 65024],
            "vartheta;": 977,
            "vartriangleleft;": 8882,
            "vartriangleright;": 8883,
            "vcy;": 1074,
            "vdash;": 8866,
            "vee;": 8744,
            "veebar;": 8891,
            "veeeq;": 8794,
            "vellip;": 8942,
            "verbar;": 124,
            "vert;": 124,
            "vfr;": [55349, 56627],
            "vltri;": 8882,
            "vnsub;": [8834, 8402],
            "vnsup;": [8835, 8402],
            "vopf;": [55349, 56679],
            "vprop;": 8733,
            "vrtri;": 8883,
            "vscr;": [55349, 56523],
            "vsubnE;": [10955, 65024],
            "vsubne;": [8842, 65024],
            "vsupnE;": [10956, 65024],
            "vsupne;": [8843, 65024],
            "vzigzag;": 10650,
            "wcirc;": 373,
            "wedbar;": 10847,
            "wedge;": 8743,
            "wedgeq;": 8793,
            "weierp;": 8472,
            "wfr;": [55349, 56628],
            "wopf;": [55349, 56680],
            "wp;": 8472,
            "wr;": 8768,
            "wreath;": 8768,
            "wscr;": [55349, 56524],
            "xcap;": 8898,
            "xcirc;": 9711,
            "xcup;": 8899,
            "xdtri;": 9661,
            "xfr;": [55349, 56629],
            "xhArr;": 10234,
            "xharr;": 10231,
            "xi;": 958,
            "xlArr;": 10232,
            "xlarr;": 10229,
            "xmap;": 10236,
            "xnis;": 8955,
            "xodot;": 10752,
            "xopf;": [55349, 56681],
            "xoplus;": 10753,
            "xotime;": 10754,
            "xrArr;": 10233,
            "xrarr;": 10230,
            "xscr;": [55349, 56525],
            "xsqcup;": 10758,
            "xuplus;": 10756,
            "xutri;": 9651,
            "xvee;": 8897,
            "xwedge;": 8896,
            "yacute": 253,
            "yacute;": 253,
            "yacy;": 1103,
            "ycirc;": 375,
            "ycy;": 1099,
            "yen": 165,
            "yen;": 165,
            "yfr;": [55349, 56630],
            "yicy;": 1111,
            "yopf;": [55349, 56682],
            "yscr;": [55349, 56526],
            "yucy;": 1102,
            "yuml": 255,
            "yuml;": 255,
            "zacute;": 378,
            "zcaron;": 382,
            "zcy;": 1079,
            "zdot;": 380,
            "zeetrf;": 8488,
            "zeta;": 950,
            "zfr;": [55349, 56631],
            "zhcy;": 1078,
            "zigrarr;": 8669,
            "zopf;": [55349, 56683],
            "zscr;": [55349, 56527],
            "zwj;": 8205,
            "zwnj;": 8204
        };
        var NAMEDCHARREF = /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g;
        var NAMEDCHARREF_MAXLEN = 32;
        var DBLQUOTEATTRVAL = /[^\r"&\u0000]+/g;
        var SINGLEQUOTEATTRVAL = /[^\r'&\u0000]+/g;
        var UNQUOTEDATTRVAL = /[^\r\t\n\f &>\u0000]+/g;
        var TAGNAME = /[^\r\t\n\f \/>A-Z\u0000]+/g;
        var ATTRNAME = /[^\r\t\n\f \/=>A-Z\u0000]+/g;
        var CDATATEXT = /[^\]\r\u0000\uffff]*/g;
        var DATATEXT = /[^&<\r\u0000\uffff]*/g;
        var RAWTEXT = /[^<\r\u0000\uffff]*/g;
        var PLAINTEXT = /[^\r\u0000\uffff]*/g;
        var SIMPLETAG = /(?:(\/)?([a-z]+)>)|[\s\S]/g;
        var SIMPLEATTR = /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g;
        var NONWS = /[^\x09\x0A\x0C\x0D\x20]/;
        var ALLNONWS = /[^\x09\x0A\x0C\x0D\x20]/g;
        var NONWSNONNUL = /[^\x00\x09\x0A\x0C\x0D\x20]/;
        var LEADINGWS = /^[\x09\x0A\x0C\x0D\x20]+/;
        var NULCHARS = /\x00/g;
        function buf2str(buf) {
            var CHUNKSIZE = 16384;
            if (buf.length < CHUNKSIZE) {
                return String.fromCharCode.apply(String, buf);
            }
            var result = "";
            for (var i = 0; i < buf.length; i += CHUNKSIZE) {
                result += String.fromCharCode.apply(String, buf.slice(i, i + CHUNKSIZE));
            }
            return result;
        }
        function str2buf(s) {
            var result = [];
            for (var i = 0; i < s.length; i++) {
                result[i] = s.charCodeAt(i);
            }
            return result;
        }
        function isA(elt, set) {
            if (typeof set === "string") {
                return elt.namespaceURI === NAMESPACE.HTML && elt.localName === set;
            }
            var tagnames = set[elt.namespaceURI];
            return tagnames && tagnames[elt.localName];
        }
        function isMathmlTextIntegrationPoint(n) {
            return isA(n, mathmlTextIntegrationPointSet);
        }
        function isHTMLIntegrationPoint(n) {
            if (isA(n, htmlIntegrationPointSet))
                return true;
            if (n.namespaceURI === NAMESPACE.MATHML && n.localName === "annotation-xml") {
                var encoding = n.getAttribute("encoding");
                if (encoding)
                    encoding = encoding.toLowerCase();
                if (encoding === "text/html" || encoding === "application/xhtml+xml")
                    return true;
            }
            return false;
        }
        function adjustSVGTagName(name) {
            if (name in svgTagNameAdjustments)
                return svgTagNameAdjustments[name];
            else
                return name;
        }
        function adjustSVGAttributes(attrs) {
            for (var i = 0, n = attrs.length; i < n; i++) {
                if (attrs[i][0] in svgAttrAdjustments) {
                    attrs[i][0] = svgAttrAdjustments[attrs[i][0]];
                }
            }
        }
        function adjustMathMLAttributes(attrs) {
            for (var i = 0, n = attrs.length; i < n; i++) {
                if (attrs[i][0] === "definitionurl") {
                    attrs[i][0] = "definitionURL";
                    break;
                }
            }
        }
        function adjustForeignAttributes(attrs) {
            for (var i = 0, n = attrs.length; i < n; i++) {
                if (attrs[i][0] in foreignAttributes) {
                    attrs[i].push(foreignAttributes[attrs[i][0]]);
                }
            }
        }
        function transferAttributes(attrs, elt) {
            for (var i = 0, n = attrs.length; i < n; i++) {
                var name = attrs[i][0], value = attrs[i][1];
                if (elt.hasAttribute(name))
                    continue;
                elt._setAttribute(name, value);
            }
        }
        HTMLParser.ElementStack = function ElementStack() {
            this.elements = [];
            this.top = null;
        };
        HTMLParser.ElementStack.prototype.push = function (e) {
            this.elements.push(e);
            this.top = e;
        };
        HTMLParser.ElementStack.prototype.pop = function (e) {
            this.elements.pop();
            this.top = this.elements[this.elements.length - 1];
        };
        HTMLParser.ElementStack.prototype.popTag = function (tag) {
            for (var i = this.elements.length - 1; i > 0; i--) {
                var e = this.elements[i];
                if (isA(e, tag))
                    break;
            }
            this.elements.length = i;
            this.top = this.elements[i - 1];
        };
        HTMLParser.ElementStack.prototype.popElementType = function (type) {
            for (var i = this.elements.length - 1; i > 0; i--) {
                if (this.elements[i] instanceof type)
                    break;
            }
            this.elements.length = i;
            this.top = this.elements[i - 1];
        };
        HTMLParser.ElementStack.prototype.popElement = function (e) {
            for (var i = this.elements.length - 1; i > 0; i--) {
                if (this.elements[i] === e)
                    break;
            }
            this.elements.length = i;
            this.top = this.elements[i - 1];
        };
        HTMLParser.ElementStack.prototype.removeElement = function (e) {
            if (this.top === e)
                this.pop();
            else {
                var idx = this.elements.lastIndexOf(e);
                if (idx !== -1)
                    this.elements.splice(idx, 1);
            }
        };
        HTMLParser.ElementStack.prototype.clearToContext = function (set) {
            for (var i = this.elements.length - 1; i > 0; i--) {
                if (isA(this.elements[i], set))
                    break;
            }
            this.elements.length = i + 1;
            this.top = this.elements[i];
        };
        HTMLParser.ElementStack.prototype.contains = function (tag) {
            return this.inSpecificScope(tag, /* @__PURE__ */ Object.create(null));
        };
        HTMLParser.ElementStack.prototype.inSpecificScope = function (tag, set) {
            for (var i = this.elements.length - 1; i >= 0; i--) {
                var elt = this.elements[i];
                if (isA(elt, tag))
                    return true;
                if (isA(elt, set))
                    return false;
            }
            return false;
        };
        HTMLParser.ElementStack.prototype.elementInSpecificScope = function (target, set) {
            for (var i = this.elements.length - 1; i >= 0; i--) {
                var elt = this.elements[i];
                if (elt === target)
                    return true;
                if (isA(elt, set))
                    return false;
            }
            return false;
        };
        HTMLParser.ElementStack.prototype.elementTypeInSpecificScope = function (target, set) {
            for (var i = this.elements.length - 1; i >= 0; i--) {
                var elt = this.elements[i];
                if (elt instanceof target)
                    return true;
                if (isA(elt, set))
                    return false;
            }
            return false;
        };
        HTMLParser.ElementStack.prototype.inScope = function (tag) {
            return this.inSpecificScope(tag, inScopeSet);
        };
        HTMLParser.ElementStack.prototype.elementInScope = function (e) {
            return this.elementInSpecificScope(e, inScopeSet);
        };
        HTMLParser.ElementStack.prototype.elementTypeInScope = function (type) {
            return this.elementTypeInSpecificScope(type, inScopeSet);
        };
        HTMLParser.ElementStack.prototype.inButtonScope = function (tag) {
            return this.inSpecificScope(tag, inButtonScopeSet);
        };
        HTMLParser.ElementStack.prototype.inListItemScope = function (tag) {
            return this.inSpecificScope(tag, inListItemScopeSet);
        };
        HTMLParser.ElementStack.prototype.inTableScope = function (tag) {
            return this.inSpecificScope(tag, inTableScopeSet);
        };
        HTMLParser.ElementStack.prototype.inSelectScope = function (tag) {
            for (var i = this.elements.length - 1; i >= 0; i--) {
                var elt = this.elements[i];
                if (elt.namespaceURI !== NAMESPACE.HTML)
                    return false;
                var localname = elt.localName;
                if (localname === tag)
                    return true;
                if (localname !== "optgroup" && localname !== "option")
                    return false;
            }
            return false;
        };
        HTMLParser.ElementStack.prototype.generateImpliedEndTags = function (butnot, thorough) {
            var endTagSet = thorough ? thoroughImpliedEndTagsSet : impliedEndTagsSet;
            for (var i = this.elements.length - 1; i >= 0; i--) {
                var e = this.elements[i];
                if (butnot && isA(e, butnot))
                    break;
                if (!isA(this.elements[i], endTagSet))
                    break;
            }
            this.elements.length = i + 1;
            this.top = this.elements[i];
        };
        HTMLParser.ActiveFormattingElements = function AFE() {
            this.list = [];
            this.attrs = [];
        };
        HTMLParser.ActiveFormattingElements.prototype.MARKER = { localName: "|" };
        HTMLParser.ActiveFormattingElements.prototype.insertMarker = function () {
            this.list.push(this.MARKER);
            this.attrs.push(this.MARKER);
        };
        HTMLParser.ActiveFormattingElements.prototype.push = function (elt, attrs) {
            var count = 0;
            for (var i = this.list.length - 1; i >= 0; i--) {
                if (this.list[i] === this.MARKER)
                    break;
                if (equal(elt, this.list[i], this.attrs[i])) {
                    count++;
                    if (count === 3) {
                        this.list.splice(i, 1);
                        this.attrs.splice(i, 1);
                        break;
                    }
                }
            }
            this.list.push(elt);
            var attrcopy = [];
            for (var ii = 0; ii < attrs.length; ii++) {
                attrcopy[ii] = attrs[ii];
            }
            this.attrs.push(attrcopy);
            function equal(newelt, oldelt, oldattrs) {
                if (newelt.localName !== oldelt.localName)
                    return false;
                if (newelt._numattrs !== oldattrs.length)
                    return false;
                for (var i2 = 0, n = oldattrs.length; i2 < n; i2++) {
                    var oldname = oldattrs[i2][0];
                    var oldval = oldattrs[i2][1];
                    if (!newelt.hasAttribute(oldname))
                        return false;
                    if (newelt.getAttribute(oldname) !== oldval)
                        return false;
                }
                return true;
            }
        };
        HTMLParser.ActiveFormattingElements.prototype.clearToMarker = function () {
            for (var i = this.list.length - 1; i >= 0; i--) {
                if (this.list[i] === this.MARKER)
                    break;
            }
            if (i < 0)
                i = 0;
            this.list.length = i;
            this.attrs.length = i;
        };
        HTMLParser.ActiveFormattingElements.prototype.findElementByTag = function (tag) {
            for (var i = this.list.length - 1; i >= 0; i--) {
                var elt = this.list[i];
                if (elt === this.MARKER)
                    break;
                if (elt.localName === tag)
                    return elt;
            }
            return null;
        };
        HTMLParser.ActiveFormattingElements.prototype.indexOf = function (e) {
            return this.list.lastIndexOf(e);
        };
        HTMLParser.ActiveFormattingElements.prototype.remove = function (e) {
            var idx = this.list.lastIndexOf(e);
            if (idx !== -1) {
                this.list.splice(idx, 1);
                this.attrs.splice(idx, 1);
            }
        };
        HTMLParser.ActiveFormattingElements.prototype.replace = function (a, b, attrs) {
            var idx = this.list.lastIndexOf(a);
            if (idx !== -1) {
                this.list[idx] = b;
                this.attrs[idx] = attrs;
            }
        };
        HTMLParser.ActiveFormattingElements.prototype.insertAfter = function (a, b) {
            var idx = this.list.lastIndexOf(a);
            if (idx !== -1) {
                this.list.splice(idx, 0, b);
                this.attrs.splice(idx, 0, b);
            }
        };
        function HTMLParser(address, fragmentContext, options) {
            var chars = null;
            var numchars = 0;
            var nextchar = 0;
            var input_complete = false;
            var scanner_skip_newline = false;
            var reentrant_invocations = 0;
            var saved_scanner_state = [];
            var leftovers = "";
            var first_batch = true;
            var paused = 0;
            var tokenizer = data_state;
            var return_state;
            var character_reference_code;
            var tagnamebuf = "";
            var lasttagname = "";
            var tempbuf = [];
            var attrnamebuf = "";
            var attrvaluebuf = "";
            var commentbuf = [];
            var doctypenamebuf = [];
            var doctypepublicbuf = [];
            var doctypesystembuf = [];
            var attributes = [];
            var is_end_tag = false;
            var parser = initial_mode;
            var originalInsertionMode = null;
            var templateInsertionModes = [];
            var stack = new HTMLParser.ElementStack();
            var afe = new HTMLParser.ActiveFormattingElements();
            var fragment = fragmentContext !== void 0;
            var head_element_pointer = null;
            var form_element_pointer = null;
            var scripting_enabled = true;
            if (fragmentContext) {
                scripting_enabled = fragmentContext.ownerDocument._scripting_enabled;
            }
            if (options && options.scripting_enabled === false)
                scripting_enabled = false;
            var frameset_ok = true;
            var force_quirks = false;
            var pending_table_text;
            var text_integration_mode;
            var textrun = [];
            var textIncludesNUL = false;
            var ignore_linefeed = false;
            var htmlparser = {
                document: function () {
                    return doc;
                },
                _asDocumentFragment: function () {
                    var frag = doc.createDocumentFragment();
                    var root2 = doc.firstChild;
                    while (root2.hasChildNodes()) {
                        frag.appendChild(root2.firstChild);
                    }
                    return frag;
                },
                pause: function () {
                    paused++;
                },
                resume: function () {
                    paused--;
                    this.parse("");
                },
                parse: function (s, end, shouldPauseFunc) {
                    var moreToDo;
                    if (paused > 0) {
                        leftovers += s;
                        return true;
                    }
                    if (reentrant_invocations === 0) {
                        if (leftovers) {
                            s = leftovers + s;
                            leftovers = "";
                        }
                        if (end) {
                            s += "\uFFFF";
                            input_complete = true;
                        }
                        chars = s;
                        numchars = s.length;
                        nextchar = 0;
                        if (first_batch) {
                            first_batch = false;
                            if (chars.charCodeAt(0) === 65279)
                                nextchar = 1;
                        }
                        reentrant_invocations++;
                        moreToDo = scanChars(shouldPauseFunc);
                        leftovers = chars.substring(nextchar, numchars);
                        reentrant_invocations--;
                    }
                    else {
                        reentrant_invocations++;
                        saved_scanner_state.push(chars, numchars, nextchar);
                        chars = s;
                        numchars = s.length;
                        nextchar = 0;
                        scanChars();
                        moreToDo = false;
                        leftovers = chars.substring(nextchar, numchars);
                        nextchar = saved_scanner_state.pop();
                        numchars = saved_scanner_state.pop();
                        chars = saved_scanner_state.pop();
                        if (leftovers) {
                            chars = leftovers + chars.substring(nextchar);
                            numchars = chars.length;
                            nextchar = 0;
                            leftovers = "";
                        }
                        reentrant_invocations--;
                    }
                    return moreToDo;
                }
            };
            var doc = new Document(true, address);
            doc._parser = htmlparser;
            doc._scripting_enabled = scripting_enabled;
            if (fragmentContext) {
                if (fragmentContext.ownerDocument._quirks)
                    doc._quirks = true;
                if (fragmentContext.ownerDocument._limitedQuirks)
                    doc._limitedQuirks = true;
                if (fragmentContext.namespaceURI === NAMESPACE.HTML) {
                    switch (fragmentContext.localName) {
                        case "title":
                        case "textarea":
                            tokenizer = rcdata_state;
                            break;
                        case "style":
                        case "xmp":
                        case "iframe":
                        case "noembed":
                        case "noframes":
                        case "script":
                        case "plaintext":
                            tokenizer = plaintext_state;
                            break;
                        case "noscript":
                            if (scripting_enabled)
                                tokenizer = plaintext_state;
                    }
                }
                var root = doc.createElement("html");
                doc._appendChild(root);
                stack.push(root);
                if (fragmentContext instanceof impl.HTMLTemplateElement) {
                    templateInsertionModes.push(in_template_mode);
                }
                resetInsertionMode();
                for (var e = fragmentContext; e !== null; e = e.parentElement) {
                    if (e instanceof impl.HTMLFormElement) {
                        form_element_pointer = e;
                        break;
                    }
                }
            }
            function scanChars(shouldPauseFunc) {
                var codepoint, s, pattern, eof;
                while (nextchar < numchars) {
                    if (paused > 0 || shouldPauseFunc && shouldPauseFunc()) {
                        return true;
                    }
                    switch (typeof tokenizer.lookahead) {
                        case "undefined":
                            codepoint = chars.charCodeAt(nextchar++);
                            if (scanner_skip_newline) {
                                scanner_skip_newline = false;
                                if (codepoint === 10) {
                                    nextchar++;
                                    continue;
                                }
                            }
                            switch (codepoint) {
                                case 13:
                                    if (nextchar < numchars) {
                                        if (chars.charCodeAt(nextchar) === 10)
                                            nextchar++;
                                    }
                                    else {
                                        scanner_skip_newline = true;
                                    }
                                    tokenizer(10);
                                    break;
                                case 65535:
                                    if (input_complete && nextchar === numchars) {
                                        tokenizer(EOF);
                                        break;
                                    }
                                default:
                                    tokenizer(codepoint);
                                    break;
                            }
                            break;
                        case "number":
                            codepoint = chars.charCodeAt(nextchar);
                            var n = tokenizer.lookahead;
                            var needsString = true;
                            if (n < 0) {
                                needsString = false;
                                n = -n;
                            }
                            if (n < numchars - nextchar) {
                                s = needsString ? chars.substring(nextchar, nextchar + n) : null;
                                eof = false;
                            }
                            else {
                                if (input_complete) {
                                    s = needsString ? chars.substring(nextchar, numchars) : null;
                                    eof = true;
                                    if (codepoint === 65535 && nextchar === numchars - 1)
                                        codepoint = EOF;
                                }
                                else {
                                    return true;
                                }
                            }
                            tokenizer(codepoint, s, eof);
                            break;
                        case "string":
                            codepoint = chars.charCodeAt(nextchar);
                            pattern = tokenizer.lookahead;
                            var pos = chars.indexOf(pattern, nextchar);
                            if (pos !== -1) {
                                s = chars.substring(nextchar, pos + pattern.length);
                                eof = false;
                            }
                            else {
                                if (!input_complete)
                                    return true;
                                s = chars.substring(nextchar, numchars);
                                if (codepoint === 65535 && nextchar === numchars - 1)
                                    codepoint = EOF;
                                eof = true;
                            }
                            tokenizer(codepoint, s, eof);
                            break;
                    }
                }
                return false;
            }
            function addAttribute(name, value) {
                for (var i = 0; i < attributes.length; i++) {
                    if (attributes[i][0] === name)
                        return;
                }
                if (value !== void 0) {
                    attributes.push([name, value]);
                }
                else {
                    attributes.push([name]);
                }
            }
            function handleSimpleAttribute() {
                SIMPLEATTR.lastIndex = nextchar - 1;
                var matched = SIMPLEATTR.exec(chars);
                if (!matched)
                    throw new Error("should never happen");
                var name = matched[1];
                if (!name)
                    return false;
                var value = matched[2];
                var len = value.length;
                switch (value[0]) {
                    case '"':
                    case "'":
                        value = value.substring(1, len - 1);
                        nextchar += matched[0].length - 1;
                        tokenizer = after_attribute_value_quoted_state;
                        break;
                    default:
                        tokenizer = before_attribute_name_state;
                        nextchar += matched[0].length - 1;
                        value = value.substring(0, len - 1);
                        break;
                }
                for (var i = 0; i < attributes.length; i++) {
                    if (attributes[i][0] === name)
                        return true;
                }
                attributes.push([name, value]);
                return true;
            }
            function beginTagName() {
                is_end_tag = false;
                tagnamebuf = "";
                attributes.length = 0;
            }
            function beginEndTagName() {
                is_end_tag = true;
                tagnamebuf = "";
                attributes.length = 0;
            }
            function beginTempBuf() {
                tempbuf.length = 0;
            }
            function beginAttrName() {
                attrnamebuf = "";
            }
            function beginAttrValue() {
                attrvaluebuf = "";
            }
            function beginComment() {
                commentbuf.length = 0;
            }
            function beginDoctype() {
                doctypenamebuf.length = 0;
                doctypepublicbuf = null;
                doctypesystembuf = null;
            }
            function beginDoctypePublicId() {
                doctypepublicbuf = [];
            }
            function beginDoctypeSystemId() {
                doctypesystembuf = [];
            }
            function forcequirks() {
                force_quirks = true;
            }
            function cdataAllowed() {
                return stack.top && stack.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
            }
            function appropriateEndTag(buf) {
                return lasttagname === buf;
            }
            function flushText() {
                if (textrun.length > 0) {
                    var s = buf2str(textrun);
                    textrun.length = 0;
                    if (ignore_linefeed) {
                        ignore_linefeed = false;
                        if (s[0] === "\n")
                            s = s.substring(1);
                        if (s.length === 0)
                            return;
                    }
                    insertToken(TEXT, s);
                    textIncludesNUL = false;
                }
                ignore_linefeed = false;
            }
            function getMatchingChars(pattern) {
                pattern.lastIndex = nextchar - 1;
                var match = pattern.exec(chars);
                if (match && match.index === nextchar - 1) {
                    match = match[0];
                    nextchar += match.length - 1;
                    if (input_complete && nextchar === numchars) {
                        match = match.slice(0, -1);
                        nextchar--;
                    }
                    return match;
                }
                else {
                    throw new Error("should never happen");
                }
            }
            function emitCharsWhile(pattern) {
                pattern.lastIndex = nextchar - 1;
                var match = pattern.exec(chars)[0];
                if (!match)
                    return false;
                emitCharString(match);
                nextchar += match.length - 1;
                return true;
            }
            function emitCharString(s) {
                if (textrun.length > 0)
                    flushText();
                if (ignore_linefeed) {
                    ignore_linefeed = false;
                    if (s[0] === "\n")
                        s = s.substring(1);
                    if (s.length === 0)
                        return;
                }
                insertToken(TEXT, s);
            }
            function emitTag() {
                if (is_end_tag)
                    insertToken(ENDTAG, tagnamebuf);
                else {
                    var tagname = tagnamebuf;
                    tagnamebuf = "";
                    lasttagname = tagname;
                    insertToken(TAG, tagname, attributes);
                }
            }
            function emitSimpleTag() {
                if (nextchar === numchars) {
                    return false;
                }
                SIMPLETAG.lastIndex = nextchar;
                var matched = SIMPLETAG.exec(chars);
                if (!matched)
                    throw new Error("should never happen");
                var tagname = matched[2];
                if (!tagname)
                    return false;
                var endtag = matched[1];
                if (endtag) {
                    nextchar += tagname.length + 2;
                    insertToken(ENDTAG, tagname);
                }
                else {
                    nextchar += tagname.length + 1;
                    lasttagname = tagname;
                    insertToken(TAG, tagname, NOATTRS);
                }
                return true;
            }
            function emitSelfClosingTag() {
                if (is_end_tag)
                    insertToken(ENDTAG, tagnamebuf, null, true);
                else {
                    insertToken(TAG, tagnamebuf, attributes, true);
                }
            }
            function emitDoctype() {
                insertToken(DOCTYPE, buf2str(doctypenamebuf), doctypepublicbuf ? buf2str(doctypepublicbuf) : void 0, doctypesystembuf ? buf2str(doctypesystembuf) : void 0);
            }
            function emitEOF() {
                flushText();
                parser(EOF);
                doc.modclock = 1;
            }
            var insertToken = htmlparser.insertToken = function insertToken2(t, value, arg3, arg4) {
                flushText();
                var current = stack.top;
                if (!current || current.namespaceURI === NAMESPACE.HTML) {
                    parser(t, value, arg3, arg4);
                }
                else {
                    if (t !== TAG && t !== TEXT) {
                        insertForeignToken(t, value, arg3, arg4);
                    }
                    else {
                        if (isMathmlTextIntegrationPoint(current) && (t === TEXT || t === TAG && value !== "mglyph" && value !== "malignmark") || t === TAG && value === "svg" && current.namespaceURI === NAMESPACE.MATHML && current.localName === "annotation-xml" || isHTMLIntegrationPoint(current)) {
                            text_integration_mode = true;
                            parser(t, value, arg3, arg4);
                            text_integration_mode = false;
                        }
                        else {
                            insertForeignToken(t, value, arg3, arg4);
                        }
                    }
                }
            };
            function insertComment(data) {
                var parent = stack.top;
                if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
                    fosterParent(function (doc2) {
                        return doc2.createComment(data);
                    });
                }
                else {
                    if (parent instanceof impl.HTMLTemplateElement) {
                        parent = parent.content;
                    }
                    parent._appendChild(parent.ownerDocument.createComment(data));
                }
            }
            function insertText(s) {
                var parent = stack.top;
                if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
                    fosterParent(function (doc2) {
                        return doc2.createTextNode(s);
                    });
                }
                else {
                    if (parent instanceof impl.HTMLTemplateElement) {
                        parent = parent.content;
                    }
                    var lastChild = parent.lastChild;
                    if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
                        lastChild.appendData(s);
                    }
                    else {
                        parent._appendChild(parent.ownerDocument.createTextNode(s));
                    }
                }
            }
            function createHTMLElt(doc2, name, attrs) {
                var elt = html.createElement(doc2, name, null);
                if (attrs) {
                    for (var i = 0, n = attrs.length; i < n; i++) {
                        elt._setAttribute(attrs[i][0], attrs[i][1]);
                    }
                }
                return elt;
            }
            var foster_parent_mode = false;
            function insertHTMLElement(name, attrs) {
                var elt = insertElement(function (doc2) {
                    return createHTMLElt(doc2, name, attrs);
                });
                if (isA(elt, formassociatedSet)) {
                    elt._form = form_element_pointer;
                }
                return elt;
            }
            function insertElement(eltFunc) {
                var elt;
                if (foster_parent_mode && isA(stack.top, tablesectionrowSet)) {
                    elt = fosterParent(eltFunc);
                }
                else if (stack.top instanceof impl.HTMLTemplateElement) {
                    elt = eltFunc(stack.top.content.ownerDocument);
                    stack.top.content._appendChild(elt);
                }
                else {
                    elt = eltFunc(stack.top.ownerDocument);
                    stack.top._appendChild(elt);
                }
                stack.push(elt);
                return elt;
            }
            function insertForeignElement(name, attrs, ns) {
                return insertElement(function (doc2) {
                    var elt = doc2._createElementNS(name, ns, null);
                    if (attrs) {
                        for (var i = 0, n = attrs.length; i < n; i++) {
                            var attr = attrs[i];
                            if (attr.length === 2)
                                elt._setAttribute(attr[0], attr[1]);
                            else {
                                elt._setAttributeNS(attr[2], attr[0], attr[1]);
                            }
                        }
                    }
                    return elt;
                });
            }
            function lastElementOfType(type) {
                for (var i = stack.elements.length - 1; i >= 0; i--) {
                    if (stack.elements[i] instanceof type) {
                        return i;
                    }
                }
                return -1;
            }
            function fosterParent(eltFunc) {
                var parent, before, lastTable = -1, lastTemplate = -1, elt;
                lastTable = lastElementOfType(impl.HTMLTableElement);
                lastTemplate = lastElementOfType(impl.HTMLTemplateElement);
                if (lastTemplate >= 0 && (lastTable < 0 || lastTemplate > lastTable)) {
                    parent = stack.elements[lastTemplate];
                }
                else if (lastTable >= 0) {
                    parent = stack.elements[lastTable].parentNode;
                    if (parent) {
                        before = stack.elements[lastTable];
                    }
                    else {
                        parent = stack.elements[lastTable - 1];
                    }
                }
                if (!parent)
                    parent = stack.elements[0];
                if (parent instanceof impl.HTMLTemplateElement) {
                    parent = parent.content;
                }
                elt = eltFunc(parent.ownerDocument);
                if (elt.nodeType === Node.TEXT_NODE) {
                    var prev;
                    if (before)
                        prev = before.previousSibling;
                    else
                        prev = parent.lastChild;
                    if (prev && prev.nodeType === Node.TEXT_NODE) {
                        prev.appendData(elt.data);
                        return elt;
                    }
                }
                if (before)
                    parent.insertBefore(elt, before);
                else
                    parent._appendChild(elt);
                return elt;
            }
            function resetInsertionMode() {
                var last = false;
                for (var i = stack.elements.length - 1; i >= 0; i--) {
                    var node = stack.elements[i];
                    if (i === 0) {
                        last = true;
                        if (fragment) {
                            node = fragmentContext;
                        }
                    }
                    if (node.namespaceURI === NAMESPACE.HTML) {
                        var tag = node.localName;
                        switch (tag) {
                            case "select":
                                for (var j = i; j > 0;) {
                                    var ancestor = stack.elements[--j];
                                    if (ancestor instanceof impl.HTMLTemplateElement) {
                                        break;
                                    }
                                    else if (ancestor instanceof impl.HTMLTableElement) {
                                        parser = in_select_in_table_mode;
                                        return;
                                    }
                                }
                                parser = in_select_mode;
                                return;
                            case "tr":
                                parser = in_row_mode;
                                return;
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                parser = in_table_body_mode;
                                return;
                            case "caption":
                                parser = in_caption_mode;
                                return;
                            case "colgroup":
                                parser = in_column_group_mode;
                                return;
                            case "table":
                                parser = in_table_mode;
                                return;
                            case "template":
                                parser = templateInsertionModes[templateInsertionModes.length - 1];
                                return;
                            case "body":
                                parser = in_body_mode;
                                return;
                            case "frameset":
                                parser = in_frameset_mode;
                                return;
                            case "html":
                                if (head_element_pointer === null) {
                                    parser = before_head_mode;
                                }
                                else {
                                    parser = after_head_mode;
                                }
                                return;
                            default:
                                if (!last) {
                                    if (tag === "head") {
                                        parser = in_head_mode;
                                        return;
                                    }
                                    if (tag === "td" || tag === "th") {
                                        parser = in_cell_mode;
                                        return;
                                    }
                                }
                        }
                    }
                    if (last) {
                        parser = in_body_mode;
                        return;
                    }
                }
            }
            function parseRawText(name, attrs) {
                insertHTMLElement(name, attrs);
                tokenizer = rawtext_state;
                originalInsertionMode = parser;
                parser = text_mode;
            }
            function parseRCDATA(name, attrs) {
                insertHTMLElement(name, attrs);
                tokenizer = rcdata_state;
                originalInsertionMode = parser;
                parser = text_mode;
            }
            function afeclone(doc2, i) {
                return {
                    elt: createHTMLElt(doc2, afe.list[i].localName, afe.attrs[i]),
                    attrs: afe.attrs[i]
                };
            }
            function afereconstruct() {
                if (afe.list.length === 0)
                    return;
                var entry = afe.list[afe.list.length - 1];
                if (entry === afe.MARKER)
                    return;
                if (stack.elements.lastIndexOf(entry) !== -1)
                    return;
                for (var i = afe.list.length - 2; i >= 0; i--) {
                    entry = afe.list[i];
                    if (entry === afe.MARKER)
                        break;
                    if (stack.elements.lastIndexOf(entry) !== -1)
                        break;
                }
                for (i = i + 1; i < afe.list.length; i++) {
                    var newelt = insertElement(function (doc2) {
                        return afeclone(doc2, i).elt;
                    });
                    afe.list[i] = newelt;
                }
            }
            var BOOKMARK = { localName: "BM" };
            function adoptionAgency(tag) {
                if (isA(stack.top, tag) && afe.indexOf(stack.top) === -1) {
                    stack.pop();
                    return true;
                }
                var outer = 0;
                while (outer < 8) {
                    outer++;
                    var fmtelt = afe.findElementByTag(tag);
                    if (!fmtelt) {
                        return false;
                    }
                    var index = stack.elements.lastIndexOf(fmtelt);
                    if (index === -1) {
                        afe.remove(fmtelt);
                        return true;
                    }
                    if (!stack.elementInScope(fmtelt)) {
                        return true;
                    }
                    var furthestblock = null, furthestblockindex;
                    for (var i = index + 1; i < stack.elements.length; i++) {
                        if (isA(stack.elements[i], specialSet)) {
                            furthestblock = stack.elements[i];
                            furthestblockindex = i;
                            break;
                        }
                    }
                    if (!furthestblock) {
                        stack.popElement(fmtelt);
                        afe.remove(fmtelt);
                        return true;
                    }
                    else {
                        var ancestor = stack.elements[index - 1];
                        afe.insertAfter(fmtelt, BOOKMARK);
                        var node = furthestblock;
                        var lastnode = furthestblock;
                        var nodeindex = furthestblockindex;
                        var nodeafeindex;
                        var inner = 0;
                        while (true) {
                            inner++;
                            node = stack.elements[--nodeindex];
                            if (node === fmtelt)
                                break;
                            nodeafeindex = afe.indexOf(node);
                            if (inner > 3 && nodeafeindex !== -1) {
                                afe.remove(node);
                                nodeafeindex = -1;
                            }
                            if (nodeafeindex === -1) {
                                stack.removeElement(node);
                                continue;
                            }
                            var newelt = afeclone(ancestor.ownerDocument, nodeafeindex);
                            afe.replace(node, newelt.elt, newelt.attrs);
                            stack.elements[nodeindex] = newelt.elt;
                            node = newelt.elt;
                            if (lastnode === furthestblock) {
                                afe.remove(BOOKMARK);
                                afe.insertAfter(newelt.elt, BOOKMARK);
                            }
                            node._appendChild(lastnode);
                            lastnode = node;
                        }
                        if (foster_parent_mode && isA(ancestor, tablesectionrowSet)) {
                            fosterParent(function () {
                                return lastnode;
                            });
                        }
                        else if (ancestor instanceof impl.HTMLTemplateElement) {
                            ancestor.content._appendChild(lastnode);
                        }
                        else {
                            ancestor._appendChild(lastnode);
                        }
                        var newelt2 = afeclone(furthestblock.ownerDocument, afe.indexOf(fmtelt));
                        while (furthestblock.hasChildNodes()) {
                            newelt2.elt._appendChild(furthestblock.firstChild);
                        }
                        furthestblock._appendChild(newelt2.elt);
                        afe.remove(fmtelt);
                        afe.replace(BOOKMARK, newelt2.elt, newelt2.attrs);
                        stack.removeElement(fmtelt);
                        var pos = stack.elements.lastIndexOf(furthestblock);
                        stack.elements.splice(pos + 1, 0, newelt2.elt);
                    }
                }
                return true;
            }
            function handleScriptEnd() {
                stack.pop();
                parser = originalInsertionMode;
                return;
            }
            function stopParsing() {
                delete doc._parser;
                stack.elements.length = 0;
                if (doc.defaultView) {
                    doc.defaultView.dispatchEvent(new impl.Event("load", {}));
                }
            }
            function reconsume(c, new_state) {
                tokenizer = new_state;
                nextchar--;
            }
            function data_state(c) {
                switch (c) {
                    case 38:
                        return_state = data_state;
                        tokenizer = character_reference_state;
                        break;
                    case 60:
                        if (emitSimpleTag())
                            break;
                        tokenizer = tag_open_state;
                        break;
                    case 0:
                        textrun.push(c);
                        textIncludesNUL = true;
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        emitCharsWhile(DATATEXT) || textrun.push(c);
                        break;
                }
            }
            function rcdata_state(c) {
                switch (c) {
                    case 38:
                        return_state = rcdata_state;
                        tokenizer = character_reference_state;
                        break;
                    case 60:
                        tokenizer = rcdata_less_than_sign_state;
                        break;
                    case 0:
                        textrun.push(65533);
                        textIncludesNUL = true;
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        textrun.push(c);
                        break;
                }
            }
            function rawtext_state(c) {
                switch (c) {
                    case 60:
                        tokenizer = rawtext_less_than_sign_state;
                        break;
                    case 0:
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        emitCharsWhile(RAWTEXT) || textrun.push(c);
                        break;
                }
            }
            function script_data_state(c) {
                switch (c) {
                    case 60:
                        tokenizer = script_data_less_than_sign_state;
                        break;
                    case 0:
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        emitCharsWhile(RAWTEXT) || textrun.push(c);
                        break;
                }
            }
            function plaintext_state(c) {
                switch (c) {
                    case 0:
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        emitCharsWhile(PLAINTEXT) || textrun.push(c);
                        break;
                }
            }
            function tag_open_state(c) {
                switch (c) {
                    case 33:
                        tokenizer = markup_declaration_open_state;
                        break;
                    case 47:
                        tokenizer = end_tag_open_state;
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginTagName();
                        reconsume(c, tag_name_state);
                        break;
                    case 63:
                        reconsume(c, bogus_comment_state);
                        break;
                    default:
                        textrun.push(60);
                        reconsume(c, data_state);
                        break;
                }
            }
            function end_tag_open_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginEndTagName();
                        reconsume(c, tag_name_state);
                        break;
                    case 62:
                        tokenizer = data_state;
                        break;
                    case -1:
                        textrun.push(60);
                        textrun.push(47);
                        emitEOF();
                        break;
                    default:
                        reconsume(c, bogus_comment_state);
                        break;
                }
            }
            function tag_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = before_attribute_name_state;
                        break;
                    case 47:
                        tokenizer = self_closing_start_tag_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitTag();
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tagnamebuf += String.fromCharCode(c + 32);
                        break;
                    case 0:
                        tagnamebuf += String.fromCharCode(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        tagnamebuf += getMatchingChars(TAGNAME);
                        break;
                }
            }
            function rcdata_less_than_sign_state(c) {
                if (c === 47) {
                    beginTempBuf();
                    tokenizer = rcdata_end_tag_open_state;
                }
                else {
                    textrun.push(60);
                    reconsume(c, rcdata_state);
                }
            }
            function rcdata_end_tag_open_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginEndTagName();
                        reconsume(c, rcdata_end_tag_name_state);
                        break;
                    default:
                        textrun.push(60);
                        textrun.push(47);
                        reconsume(c, rcdata_state);
                        break;
                }
            }
            function rcdata_end_tag_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = before_attribute_name_state;
                            return;
                        }
                        break;
                    case 47:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = self_closing_start_tag_state;
                            return;
                        }
                        break;
                    case 62:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = data_state;
                            emitTag();
                            return;
                        }
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tagnamebuf += String.fromCharCode(c + 32);
                        tempbuf.push(c);
                        return;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tagnamebuf += String.fromCharCode(c);
                        tempbuf.push(c);
                        return;
                    default:
                        break;
                }
                textrun.push(60);
                textrun.push(47);
                pushAll(textrun, tempbuf);
                reconsume(c, rcdata_state);
            }
            function rawtext_less_than_sign_state(c) {
                if (c === 47) {
                    beginTempBuf();
                    tokenizer = rawtext_end_tag_open_state;
                }
                else {
                    textrun.push(60);
                    reconsume(c, rawtext_state);
                }
            }
            function rawtext_end_tag_open_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginEndTagName();
                        reconsume(c, rawtext_end_tag_name_state);
                        break;
                    default:
                        textrun.push(60);
                        textrun.push(47);
                        reconsume(c, rawtext_state);
                        break;
                }
            }
            function rawtext_end_tag_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = before_attribute_name_state;
                            return;
                        }
                        break;
                    case 47:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = self_closing_start_tag_state;
                            return;
                        }
                        break;
                    case 62:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = data_state;
                            emitTag();
                            return;
                        }
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tagnamebuf += String.fromCharCode(c + 32);
                        tempbuf.push(c);
                        return;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tagnamebuf += String.fromCharCode(c);
                        tempbuf.push(c);
                        return;
                    default:
                        break;
                }
                textrun.push(60);
                textrun.push(47);
                pushAll(textrun, tempbuf);
                reconsume(c, rawtext_state);
            }
            function script_data_less_than_sign_state(c) {
                switch (c) {
                    case 47:
                        beginTempBuf();
                        tokenizer = script_data_end_tag_open_state;
                        break;
                    case 33:
                        tokenizer = script_data_escape_start_state;
                        textrun.push(60);
                        textrun.push(33);
                        break;
                    default:
                        textrun.push(60);
                        reconsume(c, script_data_state);
                        break;
                }
            }
            function script_data_end_tag_open_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginEndTagName();
                        reconsume(c, script_data_end_tag_name_state);
                        break;
                    default:
                        textrun.push(60);
                        textrun.push(47);
                        reconsume(c, script_data_state);
                        break;
                }
            }
            function script_data_end_tag_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = before_attribute_name_state;
                            return;
                        }
                        break;
                    case 47:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = self_closing_start_tag_state;
                            return;
                        }
                        break;
                    case 62:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = data_state;
                            emitTag();
                            return;
                        }
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tagnamebuf += String.fromCharCode(c + 32);
                        tempbuf.push(c);
                        return;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tagnamebuf += String.fromCharCode(c);
                        tempbuf.push(c);
                        return;
                    default:
                        break;
                }
                textrun.push(60);
                textrun.push(47);
                pushAll(textrun, tempbuf);
                reconsume(c, script_data_state);
            }
            function script_data_escape_start_state(c) {
                if (c === 45) {
                    tokenizer = script_data_escape_start_dash_state;
                    textrun.push(45);
                }
                else {
                    reconsume(c, script_data_state);
                }
            }
            function script_data_escape_start_dash_state(c) {
                if (c === 45) {
                    tokenizer = script_data_escaped_dash_dash_state;
                    textrun.push(45);
                }
                else {
                    reconsume(c, script_data_state);
                }
            }
            function script_data_escaped_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = script_data_escaped_dash_state;
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_escaped_less_than_sign_state;
                        break;
                    case 0:
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        textrun.push(c);
                        break;
                }
            }
            function script_data_escaped_dash_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = script_data_escaped_dash_dash_state;
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_escaped_less_than_sign_state;
                        break;
                    case 0:
                        tokenizer = script_data_escaped_state;
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        tokenizer = script_data_escaped_state;
                        textrun.push(c);
                        break;
                }
            }
            function script_data_escaped_dash_dash_state(c) {
                switch (c) {
                    case 45:
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_escaped_less_than_sign_state;
                        break;
                    case 62:
                        tokenizer = script_data_state;
                        textrun.push(62);
                        break;
                    case 0:
                        tokenizer = script_data_escaped_state;
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        tokenizer = script_data_escaped_state;
                        textrun.push(c);
                        break;
                }
            }
            function script_data_escaped_less_than_sign_state(c) {
                switch (c) {
                    case 47:
                        beginTempBuf();
                        tokenizer = script_data_escaped_end_tag_open_state;
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginTempBuf();
                        textrun.push(60);
                        reconsume(c, script_data_double_escape_start_state);
                        break;
                    default:
                        textrun.push(60);
                        reconsume(c, script_data_escaped_state);
                        break;
                }
            }
            function script_data_escaped_end_tag_open_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        beginEndTagName();
                        reconsume(c, script_data_escaped_end_tag_name_state);
                        break;
                    default:
                        textrun.push(60);
                        textrun.push(47);
                        reconsume(c, script_data_escaped_state);
                        break;
                }
            }
            function script_data_escaped_end_tag_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = before_attribute_name_state;
                            return;
                        }
                        break;
                    case 47:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = self_closing_start_tag_state;
                            return;
                        }
                        break;
                    case 62:
                        if (appropriateEndTag(tagnamebuf)) {
                            tokenizer = data_state;
                            emitTag();
                            return;
                        }
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tagnamebuf += String.fromCharCode(c + 32);
                        tempbuf.push(c);
                        return;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tagnamebuf += String.fromCharCode(c);
                        tempbuf.push(c);
                        return;
                    default:
                        break;
                }
                textrun.push(60);
                textrun.push(47);
                pushAll(textrun, tempbuf);
                reconsume(c, script_data_escaped_state);
            }
            function script_data_double_escape_start_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                    case 47:
                    case 62:
                        if (buf2str(tempbuf) === "script") {
                            tokenizer = script_data_double_escaped_state;
                        }
                        else {
                            tokenizer = script_data_escaped_state;
                        }
                        textrun.push(c);
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tempbuf.push(c + 32);
                        textrun.push(c);
                        break;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tempbuf.push(c);
                        textrun.push(c);
                        break;
                    default:
                        reconsume(c, script_data_escaped_state);
                        break;
                }
            }
            function script_data_double_escaped_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = script_data_double_escaped_dash_state;
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_double_escaped_less_than_sign_state;
                        textrun.push(60);
                        break;
                    case 0:
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        textrun.push(c);
                        break;
                }
            }
            function script_data_double_escaped_dash_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = script_data_double_escaped_dash_dash_state;
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_double_escaped_less_than_sign_state;
                        textrun.push(60);
                        break;
                    case 0:
                        tokenizer = script_data_double_escaped_state;
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        tokenizer = script_data_double_escaped_state;
                        textrun.push(c);
                        break;
                }
            }
            function script_data_double_escaped_dash_dash_state(c) {
                switch (c) {
                    case 45:
                        textrun.push(45);
                        break;
                    case 60:
                        tokenizer = script_data_double_escaped_less_than_sign_state;
                        textrun.push(60);
                        break;
                    case 62:
                        tokenizer = script_data_state;
                        textrun.push(62);
                        break;
                    case 0:
                        tokenizer = script_data_double_escaped_state;
                        textrun.push(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        tokenizer = script_data_double_escaped_state;
                        textrun.push(c);
                        break;
                }
            }
            function script_data_double_escaped_less_than_sign_state(c) {
                if (c === 47) {
                    beginTempBuf();
                    tokenizer = script_data_double_escape_end_state;
                    textrun.push(47);
                }
                else {
                    reconsume(c, script_data_double_escaped_state);
                }
            }
            function script_data_double_escape_end_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                    case 47:
                    case 62:
                        if (buf2str(tempbuf) === "script") {
                            tokenizer = script_data_escaped_state;
                        }
                        else {
                            tokenizer = script_data_double_escaped_state;
                        }
                        textrun.push(c);
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        tempbuf.push(c + 32);
                        textrun.push(c);
                        break;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 108:
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                    case 113:
                    case 114:
                    case 115:
                    case 116:
                    case 117:
                    case 118:
                    case 119:
                    case 120:
                    case 121:
                    case 122:
                        tempbuf.push(c);
                        textrun.push(c);
                        break;
                    default:
                        reconsume(c, script_data_double_escaped_state);
                        break;
                }
            }
            function before_attribute_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 47:
                        tokenizer = self_closing_start_tag_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitTag();
                        break;
                    case -1:
                        emitEOF();
                        break;
                    case 61:
                        beginAttrName();
                        attrnamebuf += String.fromCharCode(c);
                        tokenizer = attribute_name_state;
                        break;
                    default:
                        if (handleSimpleAttribute())
                            break;
                        beginAttrName();
                        reconsume(c, attribute_name_state);
                        break;
                }
            }
            function attribute_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                    case 47:
                    case 62:
                    case -1:
                        reconsume(c, after_attribute_name_state);
                        break;
                    case 61:
                        tokenizer = before_attribute_value_state;
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        attrnamebuf += String.fromCharCode(c + 32);
                        break;
                    case 0:
                        attrnamebuf += String.fromCharCode(65533);
                        break;
                    case 34:
                    case 39:
                    case 60:
                    default:
                        attrnamebuf += getMatchingChars(ATTRNAME);
                        break;
                }
            }
            function after_attribute_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 47:
                        addAttribute(attrnamebuf);
                        tokenizer = self_closing_start_tag_state;
                        break;
                    case 61:
                        tokenizer = before_attribute_value_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        addAttribute(attrnamebuf);
                        emitTag();
                        break;
                    case -1:
                        addAttribute(attrnamebuf);
                        emitEOF();
                        break;
                    default:
                        addAttribute(attrnamebuf);
                        beginAttrName();
                        reconsume(c, attribute_name_state);
                        break;
                }
            }
            function before_attribute_value_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 34:
                        beginAttrValue();
                        tokenizer = attribute_value_double_quoted_state;
                        break;
                    case 39:
                        beginAttrValue();
                        tokenizer = attribute_value_single_quoted_state;
                        break;
                    case 62:
                    default:
                        beginAttrValue();
                        reconsume(c, attribute_value_unquoted_state);
                        break;
                }
            }
            function attribute_value_double_quoted_state(c) {
                switch (c) {
                    case 34:
                        addAttribute(attrnamebuf, attrvaluebuf);
                        tokenizer = after_attribute_value_quoted_state;
                        break;
                    case 38:
                        return_state = attribute_value_double_quoted_state;
                        tokenizer = character_reference_state;
                        break;
                    case 0:
                        attrvaluebuf += String.fromCharCode(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    case 10:
                        attrvaluebuf += String.fromCharCode(c);
                        break;
                    default:
                        attrvaluebuf += getMatchingChars(DBLQUOTEATTRVAL);
                        break;
                }
            }
            function attribute_value_single_quoted_state(c) {
                switch (c) {
                    case 39:
                        addAttribute(attrnamebuf, attrvaluebuf);
                        tokenizer = after_attribute_value_quoted_state;
                        break;
                    case 38:
                        return_state = attribute_value_single_quoted_state;
                        tokenizer = character_reference_state;
                        break;
                    case 0:
                        attrvaluebuf += String.fromCharCode(65533);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    case 10:
                        attrvaluebuf += String.fromCharCode(c);
                        break;
                    default:
                        attrvaluebuf += getMatchingChars(SINGLEQUOTEATTRVAL);
                        break;
                }
            }
            function attribute_value_unquoted_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        addAttribute(attrnamebuf, attrvaluebuf);
                        tokenizer = before_attribute_name_state;
                        break;
                    case 38:
                        return_state = attribute_value_unquoted_state;
                        tokenizer = character_reference_state;
                        break;
                    case 62:
                        addAttribute(attrnamebuf, attrvaluebuf);
                        tokenizer = data_state;
                        emitTag();
                        break;
                    case 0:
                        attrvaluebuf += String.fromCharCode(65533);
                        break;
                    case -1:
                        nextchar--;
                        tokenizer = data_state;
                        break;
                    case 34:
                    case 39:
                    case 60:
                    case 61:
                    case 96:
                    default:
                        attrvaluebuf += getMatchingChars(UNQUOTEDATTRVAL);
                        break;
                }
            }
            function after_attribute_value_quoted_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = before_attribute_name_state;
                        break;
                    case 47:
                        tokenizer = self_closing_start_tag_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitTag();
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        reconsume(c, before_attribute_name_state);
                        break;
                }
            }
            function self_closing_start_tag_state(c) {
                switch (c) {
                    case 62:
                        tokenizer = data_state;
                        emitSelfClosingTag(true);
                        break;
                    case -1:
                        emitEOF();
                        break;
                    default:
                        reconsume(c, before_attribute_name_state);
                        break;
                }
            }
            function bogus_comment_state(c, lookahead, eof) {
                var len = lookahead.length;
                if (eof) {
                    nextchar += len - 1;
                }
                else {
                    nextchar += len;
                }
                var comment = lookahead.substring(0, len - 1);
                comment = comment.replace(/\u0000/g, "\uFFFD");
                comment = comment.replace(/\u000D\u000A/g, "\n");
                comment = comment.replace(/\u000D/g, "\n");
                insertToken(COMMENT, comment);
                tokenizer = data_state;
            }
            bogus_comment_state.lookahead = ">";
            function markup_declaration_open_state(c, lookahead, eof) {
                if (lookahead[0] === "-" && lookahead[1] === "-") {
                    nextchar += 2;
                    beginComment();
                    tokenizer = comment_start_state;
                    return;
                }
                if (lookahead.toUpperCase() === "DOCTYPE") {
                    nextchar += 7;
                    tokenizer = doctype_state;
                }
                else if (lookahead === "[CDATA[" && cdataAllowed()) {
                    nextchar += 7;
                    tokenizer = cdata_section_state;
                }
                else {
                    tokenizer = bogus_comment_state;
                }
            }
            markup_declaration_open_state.lookahead = 7;
            function comment_start_state(c) {
                beginComment();
                switch (c) {
                    case 45:
                        tokenizer = comment_start_dash_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        insertToken(COMMENT, buf2str(commentbuf));
                        break;
                    default:
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_start_dash_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = comment_end_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        insertToken(COMMENT, buf2str(commentbuf));
                        break;
                    case -1:
                        insertToken(COMMENT, buf2str(commentbuf));
                        emitEOF();
                        break;
                    default:
                        commentbuf.push(45);
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_state(c) {
                switch (c) {
                    case 60:
                        commentbuf.push(c);
                        tokenizer = comment_less_than_sign_state;
                        break;
                    case 45:
                        tokenizer = comment_end_dash_state;
                        break;
                    case 0:
                        commentbuf.push(65533);
                        break;
                    case -1:
                        insertToken(COMMENT, buf2str(commentbuf));
                        emitEOF();
                        break;
                    default:
                        commentbuf.push(c);
                        break;
                }
            }
            function comment_less_than_sign_state(c) {
                switch (c) {
                    case 33:
                        commentbuf.push(c);
                        tokenizer = comment_less_than_sign_bang_state;
                        break;
                    case 60:
                        commentbuf.push(c);
                        break;
                    default:
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_less_than_sign_bang_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = comment_less_than_sign_bang_dash_state;
                        break;
                    default:
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_less_than_sign_bang_dash_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = comment_less_than_sign_bang_dash_dash_state;
                        break;
                    default:
                        reconsume(c, comment_end_dash_state);
                        break;
                }
            }
            function comment_less_than_sign_bang_dash_dash_state(c) {
                switch (c) {
                    case 62:
                    case -1:
                        reconsume(c, comment_end_state);
                        break;
                    default:
                        reconsume(c, comment_end_state);
                        break;
                }
            }
            function comment_end_dash_state(c) {
                switch (c) {
                    case 45:
                        tokenizer = comment_end_state;
                        break;
                    case -1:
                        insertToken(COMMENT, buf2str(commentbuf));
                        emitEOF();
                        break;
                    default:
                        commentbuf.push(45);
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_end_state(c) {
                switch (c) {
                    case 62:
                        tokenizer = data_state;
                        insertToken(COMMENT, buf2str(commentbuf));
                        break;
                    case 33:
                        tokenizer = comment_end_bang_state;
                        break;
                    case 45:
                        commentbuf.push(45);
                        break;
                    case -1:
                        insertToken(COMMENT, buf2str(commentbuf));
                        emitEOF();
                        break;
                    default:
                        commentbuf.push(45);
                        commentbuf.push(45);
                        reconsume(c, comment_state);
                        break;
                }
            }
            function comment_end_bang_state(c) {
                switch (c) {
                    case 45:
                        commentbuf.push(45);
                        commentbuf.push(45);
                        commentbuf.push(33);
                        tokenizer = comment_end_dash_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        insertToken(COMMENT, buf2str(commentbuf));
                        break;
                    case -1:
                        insertToken(COMMENT, buf2str(commentbuf));
                        emitEOF();
                        break;
                    default:
                        commentbuf.push(45);
                        commentbuf.push(45);
                        commentbuf.push(33);
                        reconsume(c, comment_state);
                        break;
                }
            }
            function doctype_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = before_doctype_name_state;
                        break;
                    case -1:
                        beginDoctype();
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        reconsume(c, before_doctype_name_state);
                        break;
                }
            }
            function before_doctype_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        beginDoctype();
                        doctypenamebuf.push(c + 32);
                        tokenizer = doctype_name_state;
                        break;
                    case 0:
                        beginDoctype();
                        doctypenamebuf.push(65533);
                        tokenizer = doctype_name_state;
                        break;
                    case 62:
                        beginDoctype();
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        beginDoctype();
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        beginDoctype();
                        doctypenamebuf.push(c);
                        tokenizer = doctype_name_state;
                        break;
                }
            }
            function doctype_name_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = after_doctype_name_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 78:
                    case 79:
                    case 80:
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                    case 90:
                        doctypenamebuf.push(c + 32);
                        break;
                    case 0:
                        doctypenamebuf.push(65533);
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        doctypenamebuf.push(c);
                        break;
                }
            }
            function after_doctype_name_state(c, lookahead, eof) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        nextchar += 1;
                        break;
                    case 62:
                        tokenizer = data_state;
                        nextchar += 1;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        lookahead = lookahead.toUpperCase();
                        if (lookahead === "PUBLIC") {
                            nextchar += 6;
                            tokenizer = after_doctype_public_keyword_state;
                        }
                        else if (lookahead === "SYSTEM") {
                            nextchar += 6;
                            tokenizer = after_doctype_system_keyword_state;
                        }
                        else {
                            forcequirks();
                            tokenizer = bogus_doctype_state;
                        }
                        break;
                }
            }
            after_doctype_name_state.lookahead = 6;
            function after_doctype_public_keyword_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = before_doctype_public_identifier_state;
                        break;
                    case 34:
                        beginDoctypePublicId();
                        tokenizer = doctype_public_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypePublicId();
                        tokenizer = doctype_public_identifier_single_quoted_state;
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function before_doctype_public_identifier_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 34:
                        beginDoctypePublicId();
                        tokenizer = doctype_public_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypePublicId();
                        tokenizer = doctype_public_identifier_single_quoted_state;
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function doctype_public_identifier_double_quoted_state(c) {
                switch (c) {
                    case 34:
                        tokenizer = after_doctype_public_identifier_state;
                        break;
                    case 0:
                        doctypepublicbuf.push(65533);
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        doctypepublicbuf.push(c);
                        break;
                }
            }
            function doctype_public_identifier_single_quoted_state(c) {
                switch (c) {
                    case 39:
                        tokenizer = after_doctype_public_identifier_state;
                        break;
                    case 0:
                        doctypepublicbuf.push(65533);
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        doctypepublicbuf.push(c);
                        break;
                }
            }
            function after_doctype_public_identifier_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = between_doctype_public_and_system_identifiers_state;
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case 34:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_single_quoted_state;
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function between_doctype_public_and_system_identifiers_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case 34:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_single_quoted_state;
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function after_doctype_system_keyword_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        tokenizer = before_doctype_system_identifier_state;
                        break;
                    case 34:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_single_quoted_state;
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function before_doctype_system_identifier_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 34:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_double_quoted_state;
                        break;
                    case 39:
                        beginDoctypeSystemId();
                        tokenizer = doctype_system_identifier_single_quoted_state;
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        forcequirks();
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function doctype_system_identifier_double_quoted_state(c) {
                switch (c) {
                    case 34:
                        tokenizer = after_doctype_system_identifier_state;
                        break;
                    case 0:
                        doctypesystembuf.push(65533);
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        doctypesystembuf.push(c);
                        break;
                }
            }
            function doctype_system_identifier_single_quoted_state(c) {
                switch (c) {
                    case 39:
                        tokenizer = after_doctype_system_identifier_state;
                        break;
                    case 0:
                        doctypesystembuf.push(65533);
                        break;
                    case 62:
                        forcequirks();
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        doctypesystembuf.push(c);
                        break;
                }
            }
            function after_doctype_system_identifier_state(c) {
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                        break;
                    case 62:
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        forcequirks();
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        tokenizer = bogus_doctype_state;
                        break;
                }
            }
            function bogus_doctype_state(c) {
                switch (c) {
                    case 62:
                        tokenizer = data_state;
                        emitDoctype();
                        break;
                    case -1:
                        emitDoctype();
                        emitEOF();
                        break;
                    default:
                        break;
                }
            }
            function cdata_section_state(c) {
                switch (c) {
                    case 93:
                        tokenizer = cdata_section_bracket_state;
                        break;
                    case -1:
                        emitEOF();
                        break;
                    case 0:
                        textIncludesNUL = true;
                    default:
                        emitCharsWhile(CDATATEXT) || textrun.push(c);
                        break;
                }
            }
            function cdata_section_bracket_state(c) {
                switch (c) {
                    case 93:
                        tokenizer = cdata_section_end_state;
                        break;
                    default:
                        textrun.push(93);
                        reconsume(c, cdata_section_state);
                        break;
                }
            }
            function cdata_section_end_state(c) {
                switch (c) {
                    case 93:
                        textrun.push(93);
                        break;
                    case 62:
                        flushText();
                        tokenizer = data_state;
                        break;
                    default:
                        textrun.push(93);
                        textrun.push(93);
                        reconsume(c, cdata_section_state);
                        break;
                }
            }
            function character_reference_state(c) {
                beginTempBuf();
                tempbuf.push(38);
                switch (c) {
                    case 9:
                    case 10:
                    case 12:
                    case 32:
                    case 60:
                    case 38:
                    case -1:
                        reconsume(c, character_reference_end_state);
                        break;
                    case 35:
                        tempbuf.push(c);
                        tokenizer = numeric_character_reference_state;
                        break;
                    default:
                        reconsume(c, named_character_reference_state);
                        break;
                }
            }
            function named_character_reference_state(c) {
                NAMEDCHARREF.lastIndex = nextchar;
                var matched = NAMEDCHARREF.exec(chars);
                if (!matched)
                    throw new Error("should never happen");
                var name = matched[1];
                if (!name) {
                    tokenizer = character_reference_end_state;
                    return;
                }
                nextchar += name.length;
                pushAll(tempbuf, str2buf(name));
                switch (return_state) {
                    case attribute_value_double_quoted_state:
                    case attribute_value_single_quoted_state:
                    case attribute_value_unquoted_state:
                        if (name[name.length - 1] !== ";") {
                            if (/[=A-Za-z0-9]/.test(chars[nextchar])) {
                                tokenizer = character_reference_end_state;
                                return;
                            }
                        }
                        break;
                    default:
                        break;
                }
                beginTempBuf();
                var rv = namedCharRefs[name];
                if (typeof rv === "number") {
                    tempbuf.push(rv);
                }
                else {
                    pushAll(tempbuf, rv);
                }
                tokenizer = character_reference_end_state;
            }
            named_character_reference_state.lookahead = -NAMEDCHARREF_MAXLEN;
            function numeric_character_reference_state(c) {
                character_reference_code = 0;
                switch (c) {
                    case 120:
                    case 88:
                        tempbuf.push(c);
                        tokenizer = hexadecimal_character_reference_start_state;
                        break;
                    default:
                        reconsume(c, decimal_character_reference_start_state);
                        break;
                }
            }
            function hexadecimal_character_reference_start_state(c) {
                switch (c) {
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                        reconsume(c, hexadecimal_character_reference_state);
                        break;
                    default:
                        reconsume(c, character_reference_end_state);
                        break;
                }
            }
            function decimal_character_reference_start_state(c) {
                switch (c) {
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        reconsume(c, decimal_character_reference_state);
                        break;
                    default:
                        reconsume(c, character_reference_end_state);
                        break;
                }
            }
            function hexadecimal_character_reference_state(c) {
                switch (c) {
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                        character_reference_code *= 16;
                        character_reference_code += c - 55;
                        break;
                    case 97:
                    case 98:
                    case 99:
                    case 100:
                    case 101:
                    case 102:
                        character_reference_code *= 16;
                        character_reference_code += c - 87;
                        break;
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        character_reference_code *= 16;
                        character_reference_code += c - 48;
                        break;
                    case 59:
                        tokenizer = numeric_character_reference_end_state;
                        break;
                    default:
                        reconsume(c, numeric_character_reference_end_state);
                        break;
                }
            }
            function decimal_character_reference_state(c) {
                switch (c) {
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        character_reference_code *= 10;
                        character_reference_code += c - 48;
                        break;
                    case 59:
                        tokenizer = numeric_character_reference_end_state;
                        break;
                    default:
                        reconsume(c, numeric_character_reference_end_state);
                        break;
                }
            }
            function numeric_character_reference_end_state(c) {
                if (character_reference_code in numericCharRefReplacements) {
                    character_reference_code = numericCharRefReplacements[character_reference_code];
                }
                else if (character_reference_code > 1114111 || character_reference_code >= 55296 && character_reference_code < 57344) {
                    character_reference_code = 65533;
                }
                beginTempBuf();
                if (character_reference_code <= 65535) {
                    tempbuf.push(character_reference_code);
                }
                else {
                    character_reference_code = character_reference_code - 65536;
                    tempbuf.push(55296 + (character_reference_code >> 10));
                    tempbuf.push(56320 + (character_reference_code & 1023));
                }
                reconsume(c, character_reference_end_state);
            }
            function character_reference_end_state(c) {
                switch (return_state) {
                    case attribute_value_double_quoted_state:
                    case attribute_value_single_quoted_state:
                    case attribute_value_unquoted_state:
                        attrvaluebuf += buf2str(tempbuf);
                        break;
                    default:
                        pushAll(textrun, tempbuf);
                        break;
                }
                reconsume(c, return_state);
            }
            function initial_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        value = value.replace(LEADINGWS, "");
                        if (value.length === 0)
                            return;
                        break;
                    case 4:
                        doc._appendChild(doc.createComment(value));
                        return;
                    case 5:
                        var name = value;
                        var publicid = arg3;
                        var systemid = arg4;
                        doc.appendChild(new DocumentType(doc, name, publicid, systemid));
                        if (force_quirks || name.toLowerCase() !== "html" || quirkyPublicIds.test(publicid) || systemid && systemid.toLowerCase() === quirkySystemId || systemid === void 0 && conditionallyQuirkyPublicIds.test(publicid))
                            doc._quirks = true;
                        else if (limitedQuirkyPublicIds.test(publicid) || systemid !== void 0 && conditionallyQuirkyPublicIds.test(publicid))
                            doc._limitedQuirks = true;
                        parser = before_html_mode;
                        return;
                }
                doc._quirks = true;
                parser = before_html_mode;
                parser(t, value, arg3, arg4);
            }
            function before_html_mode(t, value, arg3, arg4) {
                var elt;
                switch (t) {
                    case 1:
                        value = value.replace(LEADINGWS, "");
                        if (value.length === 0)
                            return;
                        break;
                    case 5:
                        return;
                    case 4:
                        doc._appendChild(doc.createComment(value));
                        return;
                    case 2:
                        if (value === "html") {
                            elt = createHTMLElt(doc, value, arg3);
                            stack.push(elt);
                            doc.appendChild(elt);
                            parser = before_head_mode;
                            return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "html":
                            case "head":
                            case "body":
                            case "br":
                                break;
                            default:
                                return;
                        }
                }
                elt = createHTMLElt(doc, "html", null);
                stack.push(elt);
                doc.appendChild(elt);
                parser = before_head_mode;
                parser(t, value, arg3, arg4);
            }
            function before_head_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        value = value.replace(LEADINGWS, "");
                        if (value.length === 0)
                            return;
                        break;
                    case 5:
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "head":
                                var elt = insertHTMLElement(value, arg3);
                                head_element_pointer = elt;
                                parser = in_head_mode;
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "html":
                            case "head":
                            case "body":
                            case "br":
                                break;
                            default:
                                return;
                        }
                }
                before_head_mode(TAG, "head", null);
                parser(t, value, arg3, arg4);
            }
            function in_head_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        var ws = value.match(LEADINGWS);
                        if (ws) {
                            insertText(ws[0]);
                            value = value.substring(ws[0].length);
                        }
                        if (value.length === 0)
                            return;
                        break;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "meta":
                            case "base":
                            case "basefont":
                            case "bgsound":
                            case "link":
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                return;
                            case "title":
                                parseRCDATA(value, arg3);
                                return;
                            case "noscript":
                                if (!scripting_enabled) {
                                    insertHTMLElement(value, arg3);
                                    parser = in_head_noscript_mode;
                                    return;
                                }
                            case "noframes":
                            case "style":
                                parseRawText(value, arg3);
                                return;
                            case "script":
                                insertElement(function (doc2) {
                                    var elt = createHTMLElt(doc2, value, arg3);
                                    elt._parser_inserted = true;
                                    elt._force_async = false;
                                    if (fragment)
                                        elt._already_started = true;
                                    flushText();
                                    return elt;
                                });
                                tokenizer = script_data_state;
                                originalInsertionMode = parser;
                                parser = text_mode;
                                return;
                            case "template":
                                insertHTMLElement(value, arg3);
                                afe.insertMarker();
                                frameset_ok = false;
                                parser = in_template_mode;
                                templateInsertionModes.push(parser);
                                return;
                            case "head":
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "head":
                                stack.pop();
                                parser = after_head_mode;
                                return;
                            case "body":
                            case "html":
                            case "br":
                                break;
                            case "template":
                                if (!stack.contains("template")) {
                                    return;
                                }
                                stack.generateImpliedEndTags(null, "thorough");
                                stack.popTag("template");
                                afe.clearToMarker();
                                templateInsertionModes.pop();
                                resetInsertionMode();
                                return;
                            default:
                                return;
                        }
                        break;
                }
                in_head_mode(ENDTAG, "head", null);
                parser(t, value, arg3, arg4);
            }
            function in_head_noscript_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 5:
                        return;
                    case 4:
                        in_head_mode(t, value);
                        return;
                    case 1:
                        var ws = value.match(LEADINGWS);
                        if (ws) {
                            in_head_mode(t, ws[0]);
                            value = value.substring(ws[0].length);
                        }
                        if (value.length === 0)
                            return;
                        break;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "basefont":
                            case "bgsound":
                            case "link":
                            case "meta":
                            case "noframes":
                            case "style":
                                in_head_mode(t, value, arg3);
                                return;
                            case "head":
                            case "noscript":
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "noscript":
                                stack.pop();
                                parser = in_head_mode;
                                return;
                            case "br":
                                break;
                            default:
                                return;
                        }
                        break;
                }
                in_head_noscript_mode(ENDTAG, "noscript", null);
                parser(t, value, arg3, arg4);
            }
            function after_head_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        var ws = value.match(LEADINGWS);
                        if (ws) {
                            insertText(ws[0]);
                            value = value.substring(ws[0].length);
                        }
                        if (value.length === 0)
                            return;
                        break;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "body":
                                insertHTMLElement(value, arg3);
                                frameset_ok = false;
                                parser = in_body_mode;
                                return;
                            case "frameset":
                                insertHTMLElement(value, arg3);
                                parser = in_frameset_mode;
                                return;
                            case "base":
                            case "basefont":
                            case "bgsound":
                            case "link":
                            case "meta":
                            case "noframes":
                            case "script":
                            case "style":
                            case "template":
                            case "title":
                                stack.push(head_element_pointer);
                                in_head_mode(TAG, value, arg3);
                                stack.removeElement(head_element_pointer);
                                return;
                            case "head":
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "template":
                                return in_head_mode(t, value, arg3, arg4);
                            case "body":
                            case "html":
                            case "br":
                                break;
                            default:
                                return;
                        }
                        break;
                }
                after_head_mode(TAG, "body", null);
                frameset_ok = true;
                parser(t, value, arg3, arg4);
            }
            function in_body_mode(t, value, arg3, arg4) {
                var body, i, node, elt;
                switch (t) {
                    case 1:
                        if (textIncludesNUL) {
                            value = value.replace(NULCHARS, "");
                            if (value.length === 0)
                                return;
                        }
                        if (frameset_ok && NONWS.test(value))
                            frameset_ok = false;
                        afereconstruct();
                        insertText(value);
                        return;
                    case 5:
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case -1:
                        if (templateInsertionModes.length) {
                            return in_template_mode(t);
                        }
                        stopParsing();
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                if (stack.contains("template")) {
                                    return;
                                }
                                transferAttributes(arg3, stack.elements[0]);
                                return;
                            case "base":
                            case "basefont":
                            case "bgsound":
                            case "link":
                            case "meta":
                            case "noframes":
                            case "script":
                            case "style":
                            case "template":
                            case "title":
                                in_head_mode(TAG, value, arg3);
                                return;
                            case "body":
                                body = stack.elements[1];
                                if (!body || !(body instanceof impl.HTMLBodyElement) || stack.contains("template"))
                                    return;
                                frameset_ok = false;
                                transferAttributes(arg3, body);
                                return;
                            case "frameset":
                                if (!frameset_ok)
                                    return;
                                body = stack.elements[1];
                                if (!body || !(body instanceof impl.HTMLBodyElement))
                                    return;
                                if (body.parentNode)
                                    body.parentNode.removeChild(body);
                                while (!(stack.top instanceof impl.HTMLHtmlElement))
                                    stack.pop();
                                insertHTMLElement(value, arg3);
                                parser = in_frameset_mode;
                                return;
                            case "address":
                            case "article":
                            case "aside":
                            case "blockquote":
                            case "center":
                            case "details":
                            case "dialog":
                            case "dir":
                            case "div":
                            case "dl":
                            case "fieldset":
                            case "figcaption":
                            case "figure":
                            case "footer":
                            case "header":
                            case "hgroup":
                            case "main":
                            case "nav":
                            case "ol":
                            case "p":
                            case "section":
                            case "summary":
                            case "ul":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                insertHTMLElement(value, arg3);
                                return;
                            case "menu":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                if (isA(stack.top, "menuitem")) {
                                    stack.pop();
                                }
                                insertHTMLElement(value, arg3);
                                return;
                            case "h1":
                            case "h2":
                            case "h3":
                            case "h4":
                            case "h5":
                            case "h6":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                if (stack.top instanceof impl.HTMLHeadingElement)
                                    stack.pop();
                                insertHTMLElement(value, arg3);
                                return;
                            case "pre":
                            case "listing":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                insertHTMLElement(value, arg3);
                                ignore_linefeed = true;
                                frameset_ok = false;
                                return;
                            case "form":
                                if (form_element_pointer && !stack.contains("template"))
                                    return;
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                elt = insertHTMLElement(value, arg3);
                                if (!stack.contains("template"))
                                    form_element_pointer = elt;
                                return;
                            case "li":
                                frameset_ok = false;
                                for (i = stack.elements.length - 1; i >= 0; i--) {
                                    node = stack.elements[i];
                                    if (node instanceof impl.HTMLLIElement) {
                                        in_body_mode(ENDTAG, "li");
                                        break;
                                    }
                                    if (isA(node, specialSet) && !isA(node, addressdivpSet))
                                        break;
                                }
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                insertHTMLElement(value, arg3);
                                return;
                            case "dd":
                            case "dt":
                                frameset_ok = false;
                                for (i = stack.elements.length - 1; i >= 0; i--) {
                                    node = stack.elements[i];
                                    if (isA(node, dddtSet)) {
                                        in_body_mode(ENDTAG, node.localName);
                                        break;
                                    }
                                    if (isA(node, specialSet) && !isA(node, addressdivpSet))
                                        break;
                                }
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                insertHTMLElement(value, arg3);
                                return;
                            case "plaintext":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                insertHTMLElement(value, arg3);
                                tokenizer = plaintext_state;
                                return;
                            case "button":
                                if (stack.inScope("button")) {
                                    in_body_mode(ENDTAG, "button");
                                    parser(t, value, arg3, arg4);
                                }
                                else {
                                    afereconstruct();
                                    insertHTMLElement(value, arg3);
                                    frameset_ok = false;
                                }
                                return;
                            case "a":
                                var activeElement = afe.findElementByTag("a");
                                if (activeElement) {
                                    in_body_mode(ENDTAG, value);
                                    afe.remove(activeElement);
                                    stack.removeElement(activeElement);
                                }
                            case "b":
                            case "big":
                            case "code":
                            case "em":
                            case "font":
                            case "i":
                            case "s":
                            case "small":
                            case "strike":
                            case "strong":
                            case "tt":
                            case "u":
                                afereconstruct();
                                afe.push(insertHTMLElement(value, arg3), arg3);
                                return;
                            case "nobr":
                                afereconstruct();
                                if (stack.inScope(value)) {
                                    in_body_mode(ENDTAG, value);
                                    afereconstruct();
                                }
                                afe.push(insertHTMLElement(value, arg3), arg3);
                                return;
                            case "applet":
                            case "marquee":
                            case "object":
                                afereconstruct();
                                insertHTMLElement(value, arg3);
                                afe.insertMarker();
                                frameset_ok = false;
                                return;
                            case "table":
                                if (!doc._quirks && stack.inButtonScope("p")) {
                                    in_body_mode(ENDTAG, "p");
                                }
                                insertHTMLElement(value, arg3);
                                frameset_ok = false;
                                parser = in_table_mode;
                                return;
                            case "area":
                            case "br":
                            case "embed":
                            case "img":
                            case "keygen":
                            case "wbr":
                                afereconstruct();
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                frameset_ok = false;
                                return;
                            case "input":
                                afereconstruct();
                                elt = insertHTMLElement(value, arg3);
                                stack.pop();
                                var type = elt.getAttribute("type");
                                if (!type || type.toLowerCase() !== "hidden")
                                    frameset_ok = false;
                                return;
                            case "param":
                            case "source":
                            case "track":
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                return;
                            case "hr":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                if (isA(stack.top, "menuitem")) {
                                    stack.pop();
                                }
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                frameset_ok = false;
                                return;
                            case "image":
                                in_body_mode(TAG, "img", arg3, arg4);
                                return;
                            case "textarea":
                                insertHTMLElement(value, arg3);
                                ignore_linefeed = true;
                                frameset_ok = false;
                                tokenizer = rcdata_state;
                                originalInsertionMode = parser;
                                parser = text_mode;
                                return;
                            case "xmp":
                                if (stack.inButtonScope("p"))
                                    in_body_mode(ENDTAG, "p");
                                afereconstruct();
                                frameset_ok = false;
                                parseRawText(value, arg3);
                                return;
                            case "iframe":
                                frameset_ok = false;
                                parseRawText(value, arg3);
                                return;
                            case "noembed":
                                parseRawText(value, arg3);
                                return;
                            case "noscript":
                                if (scripting_enabled) {
                                    parseRawText(value, arg3);
                                    return;
                                }
                                break;
                            case "select":
                                afereconstruct();
                                insertHTMLElement(value, arg3);
                                frameset_ok = false;
                                if (parser === in_table_mode || parser === in_caption_mode || parser === in_table_body_mode || parser === in_row_mode || parser === in_cell_mode)
                                    parser = in_select_in_table_mode;
                                else
                                    parser = in_select_mode;
                                return;
                            case "optgroup":
                            case "option":
                                if (stack.top instanceof impl.HTMLOptionElement) {
                                    in_body_mode(ENDTAG, "option");
                                }
                                afereconstruct();
                                insertHTMLElement(value, arg3);
                                return;
                            case "menuitem":
                                if (isA(stack.top, "menuitem")) {
                                    stack.pop();
                                }
                                afereconstruct();
                                insertHTMLElement(value, arg3);
                                return;
                            case "rb":
                            case "rtc":
                                if (stack.inScope("ruby")) {
                                    stack.generateImpliedEndTags();
                                }
                                insertHTMLElement(value, arg3);
                                return;
                            case "rp":
                            case "rt":
                                if (stack.inScope("ruby")) {
                                    stack.generateImpliedEndTags("rtc");
                                }
                                insertHTMLElement(value, arg3);
                                return;
                            case "math":
                                afereconstruct();
                                adjustMathMLAttributes(arg3);
                                adjustForeignAttributes(arg3);
                                insertForeignElement(value, arg3, NAMESPACE.MATHML);
                                if (arg4)
                                    stack.pop();
                                return;
                            case "svg":
                                afereconstruct();
                                adjustSVGAttributes(arg3);
                                adjustForeignAttributes(arg3);
                                insertForeignElement(value, arg3, NAMESPACE.SVG);
                                if (arg4)
                                    stack.pop();
                                return;
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "frame":
                            case "head":
                            case "tbody":
                            case "td":
                            case "tfoot":
                            case "th":
                            case "thead":
                            case "tr":
                                return;
                        }
                        afereconstruct();
                        insertHTMLElement(value, arg3);
                        return;
                    case 3:
                        switch (value) {
                            case "template":
                                in_head_mode(ENDTAG, value, arg3);
                                return;
                            case "body":
                                if (!stack.inScope("body"))
                                    return;
                                parser = after_body_mode;
                                return;
                            case "html":
                                if (!stack.inScope("body"))
                                    return;
                                parser = after_body_mode;
                                parser(t, value, arg3);
                                return;
                            case "address":
                            case "article":
                            case "aside":
                            case "blockquote":
                            case "button":
                            case "center":
                            case "details":
                            case "dialog":
                            case "dir":
                            case "div":
                            case "dl":
                            case "fieldset":
                            case "figcaption":
                            case "figure":
                            case "footer":
                            case "header":
                            case "hgroup":
                            case "listing":
                            case "main":
                            case "menu":
                            case "nav":
                            case "ol":
                            case "pre":
                            case "section":
                            case "summary":
                            case "ul":
                                if (!stack.inScope(value))
                                    return;
                                stack.generateImpliedEndTags();
                                stack.popTag(value);
                                return;
                            case "form":
                                if (!stack.contains("template")) {
                                    var openform = form_element_pointer;
                                    form_element_pointer = null;
                                    if (!openform || !stack.elementInScope(openform))
                                        return;
                                    stack.generateImpliedEndTags();
                                    stack.removeElement(openform);
                                }
                                else {
                                    if (!stack.inScope("form"))
                                        return;
                                    stack.generateImpliedEndTags();
                                    stack.popTag("form");
                                }
                                return;
                            case "p":
                                if (!stack.inButtonScope(value)) {
                                    in_body_mode(TAG, value, null);
                                    parser(t, value, arg3, arg4);
                                }
                                else {
                                    stack.generateImpliedEndTags(value);
                                    stack.popTag(value);
                                }
                                return;
                            case "li":
                                if (!stack.inListItemScope(value))
                                    return;
                                stack.generateImpliedEndTags(value);
                                stack.popTag(value);
                                return;
                            case "dd":
                            case "dt":
                                if (!stack.inScope(value))
                                    return;
                                stack.generateImpliedEndTags(value);
                                stack.popTag(value);
                                return;
                            case "h1":
                            case "h2":
                            case "h3":
                            case "h4":
                            case "h5":
                            case "h6":
                                if (!stack.elementTypeInScope(impl.HTMLHeadingElement))
                                    return;
                                stack.generateImpliedEndTags();
                                stack.popElementType(impl.HTMLHeadingElement);
                                return;
                            case "sarcasm":
                                break;
                            case "a":
                            case "b":
                            case "big":
                            case "code":
                            case "em":
                            case "font":
                            case "i":
                            case "nobr":
                            case "s":
                            case "small":
                            case "strike":
                            case "strong":
                            case "tt":
                            case "u":
                                var result = adoptionAgency(value);
                                if (result)
                                    return;
                                break;
                            case "applet":
                            case "marquee":
                            case "object":
                                if (!stack.inScope(value))
                                    return;
                                stack.generateImpliedEndTags();
                                stack.popTag(value);
                                afe.clearToMarker();
                                return;
                            case "br":
                                in_body_mode(TAG, value, null);
                                return;
                        }
                        for (i = stack.elements.length - 1; i >= 0; i--) {
                            node = stack.elements[i];
                            if (isA(node, value)) {
                                stack.generateImpliedEndTags(value);
                                stack.popElement(node);
                                break;
                            }
                            else if (isA(node, specialSet)) {
                                return;
                            }
                        }
                        return;
                }
            }
            function text_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        insertText(value);
                        return;
                    case -1:
                        if (stack.top instanceof impl.HTMLScriptElement)
                            stack.top._already_started = true;
                        stack.pop();
                        parser = originalInsertionMode;
                        parser(t);
                        return;
                    case 3:
                        if (value === "script") {
                            handleScriptEnd();
                        }
                        else {
                            stack.pop();
                            parser = originalInsertionMode;
                        }
                        return;
                    default:
                        return;
                }
            }
            function in_table_mode(t, value, arg3, arg4) {
                function getTypeAttr(attrs) {
                    for (var i = 0, n = attrs.length; i < n; i++) {
                        if (attrs[i][0] === "type")
                            return attrs[i][1].toLowerCase();
                    }
                    return null;
                }
                switch (t) {
                    case 1:
                        if (text_integration_mode) {
                            in_body_mode(t, value, arg3, arg4);
                            return;
                        }
                        else if (isA(stack.top, tablesectionrowSet)) {
                            pending_table_text = [];
                            originalInsertionMode = parser;
                            parser = in_table_text_mode;
                            parser(t, value, arg3, arg4);
                            return;
                        }
                        break;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case 2:
                        switch (value) {
                            case "caption":
                                stack.clearToContext(tableContextSet);
                                afe.insertMarker();
                                insertHTMLElement(value, arg3);
                                parser = in_caption_mode;
                                return;
                            case "colgroup":
                                stack.clearToContext(tableContextSet);
                                insertHTMLElement(value, arg3);
                                parser = in_column_group_mode;
                                return;
                            case "col":
                                in_table_mode(TAG, "colgroup", null);
                                parser(t, value, arg3, arg4);
                                return;
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                stack.clearToContext(tableContextSet);
                                insertHTMLElement(value, arg3);
                                parser = in_table_body_mode;
                                return;
                            case "td":
                            case "th":
                            case "tr":
                                in_table_mode(TAG, "tbody", null);
                                parser(t, value, arg3, arg4);
                                return;
                            case "table":
                                if (!stack.inTableScope(value)) {
                                    return;
                                }
                                in_table_mode(ENDTAG, value);
                                parser(t, value, arg3, arg4);
                                return;
                            case "style":
                            case "script":
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                            case "input":
                                var type = getTypeAttr(arg3);
                                if (type !== "hidden")
                                    break;
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                return;
                            case "form":
                                if (form_element_pointer || stack.contains("template"))
                                    return;
                                form_element_pointer = insertHTMLElement(value, arg3);
                                stack.popElement(form_element_pointer);
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "table":
                                if (!stack.inTableScope(value))
                                    return;
                                stack.popTag(value);
                                resetInsertionMode();
                                return;
                            case "body":
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "html":
                            case "tbody":
                            case "td":
                            case "tfoot":
                            case "th":
                            case "thead":
                            case "tr":
                                return;
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case -1:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                }
                foster_parent_mode = true;
                in_body_mode(t, value, arg3, arg4);
                foster_parent_mode = false;
            }
            function in_table_text_mode(t, value, arg3, arg4) {
                if (t === TEXT) {
                    if (textIncludesNUL) {
                        value = value.replace(NULCHARS, "");
                        if (value.length === 0)
                            return;
                    }
                    pending_table_text.push(value);
                }
                else {
                    var s = pending_table_text.join("");
                    pending_table_text.length = 0;
                    if (NONWS.test(s)) {
                        foster_parent_mode = true;
                        in_body_mode(TEXT, s);
                        foster_parent_mode = false;
                    }
                    else {
                        insertText(s);
                    }
                    parser = originalInsertionMode;
                    parser(t, value, arg3, arg4);
                }
            }
            function in_caption_mode(t, value, arg3, arg4) {
                function end_caption() {
                    if (!stack.inTableScope("caption"))
                        return false;
                    stack.generateImpliedEndTags();
                    stack.popTag("caption");
                    afe.clearToMarker();
                    parser = in_table_mode;
                    return true;
                }
                switch (t) {
                    case 2:
                        switch (value) {
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "tbody":
                            case "td":
                            case "tfoot":
                            case "th":
                            case "thead":
                            case "tr":
                                if (end_caption())
                                    parser(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "caption":
                                end_caption();
                                return;
                            case "table":
                                if (end_caption())
                                    parser(t, value, arg3, arg4);
                                return;
                            case "body":
                            case "col":
                            case "colgroup":
                            case "html":
                            case "tbody":
                            case "td":
                            case "tfoot":
                            case "th":
                            case "thead":
                            case "tr":
                                return;
                        }
                        break;
                }
                in_body_mode(t, value, arg3, arg4);
            }
            function in_column_group_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        var ws = value.match(LEADINGWS);
                        if (ws) {
                            insertText(ws[0]);
                            value = value.substring(ws[0].length);
                        }
                        if (value.length === 0)
                            return;
                        break;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "col":
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                return;
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "colgroup":
                                if (!isA(stack.top, "colgroup")) {
                                    return;
                                }
                                stack.pop();
                                parser = in_table_mode;
                                return;
                            case "col":
                                return;
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case -1:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                }
                if (!isA(stack.top, "colgroup")) {
                    return;
                }
                in_column_group_mode(ENDTAG, "colgroup");
                parser(t, value, arg3, arg4);
            }
            function in_table_body_mode(t, value, arg3, arg4) {
                function endsect() {
                    if (!stack.inTableScope("tbody") && !stack.inTableScope("thead") && !stack.inTableScope("tfoot"))
                        return;
                    stack.clearToContext(tableBodyContextSet);
                    in_table_body_mode(ENDTAG, stack.top.localName, null);
                    parser(t, value, arg3, arg4);
                }
                switch (t) {
                    case 2:
                        switch (value) {
                            case "tr":
                                stack.clearToContext(tableBodyContextSet);
                                insertHTMLElement(value, arg3);
                                parser = in_row_mode;
                                return;
                            case "th":
                            case "td":
                                in_table_body_mode(TAG, "tr", null);
                                parser(t, value, arg3, arg4);
                                return;
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                endsect();
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "table":
                                endsect();
                                return;
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                if (stack.inTableScope(value)) {
                                    stack.clearToContext(tableBodyContextSet);
                                    stack.pop();
                                    parser = in_table_mode;
                                }
                                return;
                            case "body":
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "html":
                            case "td":
                            case "th":
                            case "tr":
                                return;
                        }
                        break;
                }
                in_table_mode(t, value, arg3, arg4);
            }
            function in_row_mode(t, value, arg3, arg4) {
                function endrow() {
                    if (!stack.inTableScope("tr"))
                        return false;
                    stack.clearToContext(tableRowContextSet);
                    stack.pop();
                    parser = in_table_body_mode;
                    return true;
                }
                switch (t) {
                    case 2:
                        switch (value) {
                            case "th":
                            case "td":
                                stack.clearToContext(tableRowContextSet);
                                insertHTMLElement(value, arg3);
                                parser = in_cell_mode;
                                afe.insertMarker();
                                return;
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "tbody":
                            case "tfoot":
                            case "thead":
                            case "tr":
                                if (endrow())
                                    parser(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "tr":
                                endrow();
                                return;
                            case "table":
                                if (endrow())
                                    parser(t, value, arg3, arg4);
                                return;
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                if (stack.inTableScope(value)) {
                                    if (endrow())
                                        parser(t, value, arg3, arg4);
                                }
                                return;
                            case "body":
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "html":
                            case "td":
                            case "th":
                                return;
                        }
                        break;
                }
                in_table_mode(t, value, arg3, arg4);
            }
            function in_cell_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 2:
                        switch (value) {
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "tbody":
                            case "td":
                            case "tfoot":
                            case "th":
                            case "thead":
                            case "tr":
                                if (stack.inTableScope("td")) {
                                    in_cell_mode(ENDTAG, "td");
                                    parser(t, value, arg3, arg4);
                                }
                                else if (stack.inTableScope("th")) {
                                    in_cell_mode(ENDTAG, "th");
                                    parser(t, value, arg3, arg4);
                                }
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "td":
                            case "th":
                                if (!stack.inTableScope(value))
                                    return;
                                stack.generateImpliedEndTags();
                                stack.popTag(value);
                                afe.clearToMarker();
                                parser = in_row_mode;
                                return;
                            case "body":
                            case "caption":
                            case "col":
                            case "colgroup":
                            case "html":
                                return;
                            case "table":
                            case "tbody":
                            case "tfoot":
                            case "thead":
                            case "tr":
                                if (!stack.inTableScope(value))
                                    return;
                                in_cell_mode(ENDTAG, stack.inTableScope("td") ? "td" : "th");
                                parser(t, value, arg3, arg4);
                                return;
                        }
                        break;
                }
                in_body_mode(t, value, arg3, arg4);
            }
            function in_select_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        if (textIncludesNUL) {
                            value = value.replace(NULCHARS, "");
                            if (value.length === 0)
                                return;
                        }
                        insertText(value);
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case -1:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "option":
                                if (stack.top instanceof impl.HTMLOptionElement)
                                    in_select_mode(ENDTAG, value);
                                insertHTMLElement(value, arg3);
                                return;
                            case "optgroup":
                                if (stack.top instanceof impl.HTMLOptionElement)
                                    in_select_mode(ENDTAG, "option");
                                if (stack.top instanceof impl.HTMLOptGroupElement)
                                    in_select_mode(ENDTAG, value);
                                insertHTMLElement(value, arg3);
                                return;
                            case "select":
                                in_select_mode(ENDTAG, value);
                                return;
                            case "input":
                            case "keygen":
                            case "textarea":
                                if (!stack.inSelectScope("select"))
                                    return;
                                in_select_mode(ENDTAG, "select");
                                parser(t, value, arg3, arg4);
                                return;
                            case "script":
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        switch (value) {
                            case "optgroup":
                                if (stack.top instanceof impl.HTMLOptionElement && stack.elements[stack.elements.length - 2] instanceof impl.HTMLOptGroupElement) {
                                    in_select_mode(ENDTAG, "option");
                                }
                                if (stack.top instanceof impl.HTMLOptGroupElement)
                                    stack.pop();
                                return;
                            case "option":
                                if (stack.top instanceof impl.HTMLOptionElement)
                                    stack.pop();
                                return;
                            case "select":
                                if (!stack.inSelectScope(value))
                                    return;
                                stack.popTag(value);
                                resetInsertionMode();
                                return;
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                }
            }
            function in_select_in_table_mode(t, value, arg3, arg4) {
                switch (value) {
                    case "caption":
                    case "table":
                    case "tbody":
                    case "tfoot":
                    case "thead":
                    case "tr":
                    case "td":
                    case "th":
                        switch (t) {
                            case 2:
                                in_select_in_table_mode(ENDTAG, "select");
                                parser(t, value, arg3, arg4);
                                return;
                            case 3:
                                if (stack.inTableScope(value)) {
                                    in_select_in_table_mode(ENDTAG, "select");
                                    parser(t, value, arg3, arg4);
                                }
                                return;
                        }
                }
                in_select_mode(t, value, arg3, arg4);
            }
            function in_template_mode(t, value, arg3, arg4) {
                function switchModeAndReprocess(mode) {
                    parser = mode;
                    templateInsertionModes[templateInsertionModes.length - 1] = parser;
                    parser(t, value, arg3, arg4);
                }
                switch (t) {
                    case 1:
                    case 4:
                    case 5:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                    case -1:
                        if (!stack.contains("template")) {
                            stopParsing();
                        }
                        else {
                            stack.popTag("template");
                            afe.clearToMarker();
                            templateInsertionModes.pop();
                            resetInsertionMode();
                            parser(t, value, arg3, arg4);
                        }
                        return;
                    case 2:
                        switch (value) {
                            case "base":
                            case "basefont":
                            case "bgsound":
                            case "link":
                            case "meta":
                            case "noframes":
                            case "script":
                            case "style":
                            case "template":
                            case "title":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                            case "caption":
                            case "colgroup":
                            case "tbody":
                            case "tfoot":
                            case "thead":
                                switchModeAndReprocess(in_table_mode);
                                return;
                            case "col":
                                switchModeAndReprocess(in_column_group_mode);
                                return;
                            case "tr":
                                switchModeAndReprocess(in_table_body_mode);
                                return;
                            case "td":
                            case "th":
                                switchModeAndReprocess(in_row_mode);
                                return;
                        }
                        switchModeAndReprocess(in_body_mode);
                        return;
                    case 3:
                        switch (value) {
                            case "template":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                            default:
                                return;
                        }
                }
            }
            function after_body_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        if (NONWS.test(value))
                            break;
                        in_body_mode(t, value);
                        return;
                    case 4:
                        stack.elements[0]._appendChild(doc.createComment(value));
                        return;
                    case 5:
                        return;
                    case -1:
                        stopParsing();
                        return;
                    case 2:
                        if (value === "html") {
                            in_body_mode(t, value, arg3, arg4);
                            return;
                        }
                        break;
                    case 3:
                        if (value === "html") {
                            if (fragment)
                                return;
                            parser = after_after_body_mode;
                            return;
                        }
                        break;
                }
                parser = in_body_mode;
                parser(t, value, arg3, arg4);
            }
            function in_frameset_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        value = value.replace(ALLNONWS, "");
                        if (value.length > 0)
                            insertText(value);
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case -1:
                        stopParsing();
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "frameset":
                                insertHTMLElement(value, arg3);
                                return;
                            case "frame":
                                insertHTMLElement(value, arg3);
                                stack.pop();
                                return;
                            case "noframes":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        if (value === "frameset") {
                            if (fragment && stack.top instanceof impl.HTMLHtmlElement)
                                return;
                            stack.pop();
                            if (!fragment && !(stack.top instanceof impl.HTMLFrameSetElement))
                                parser = after_frameset_mode;
                            return;
                        }
                        break;
                }
            }
            function after_frameset_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        value = value.replace(ALLNONWS, "");
                        if (value.length > 0)
                            insertText(value);
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case -1:
                        stopParsing();
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "noframes":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                    case 3:
                        if (value === "html") {
                            parser = after_after_frameset_mode;
                            return;
                        }
                        break;
                }
            }
            function after_after_body_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        if (NONWS.test(value))
                            break;
                        in_body_mode(t, value, arg3, arg4);
                        return;
                    case 4:
                        doc._appendChild(doc.createComment(value));
                        return;
                    case 5:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                    case -1:
                        stopParsing();
                        return;
                    case 2:
                        if (value === "html") {
                            in_body_mode(t, value, arg3, arg4);
                            return;
                        }
                        break;
                }
                parser = in_body_mode;
                parser(t, value, arg3, arg4);
            }
            function after_after_frameset_mode(t, value, arg3, arg4) {
                switch (t) {
                    case 1:
                        value = value.replace(ALLNONWS, "");
                        if (value.length > 0)
                            in_body_mode(t, value, arg3, arg4);
                        return;
                    case 4:
                        doc._appendChild(doc.createComment(value));
                        return;
                    case 5:
                        in_body_mode(t, value, arg3, arg4);
                        return;
                    case -1:
                        stopParsing();
                        return;
                    case 2:
                        switch (value) {
                            case "html":
                                in_body_mode(t, value, arg3, arg4);
                                return;
                            case "noframes":
                                in_head_mode(t, value, arg3, arg4);
                                return;
                        }
                        break;
                }
            }
            function insertForeignToken(t, value, arg3, arg4) {
                function isHTMLFont(attrs) {
                    for (var i2 = 0, n = attrs.length; i2 < n; i2++) {
                        switch (attrs[i2][0]) {
                            case "color":
                            case "face":
                            case "size":
                                return true;
                        }
                    }
                    return false;
                }
                var current;
                switch (t) {
                    case 1:
                        if (frameset_ok && NONWSNONNUL.test(value))
                            frameset_ok = false;
                        if (textIncludesNUL) {
                            value = value.replace(NULCHARS, "\uFFFD");
                        }
                        insertText(value);
                        return;
                    case 4:
                        insertComment(value);
                        return;
                    case 5:
                        return;
                    case 2:
                        switch (value) {
                            case "font":
                                if (!isHTMLFont(arg3))
                                    break;
                            case "b":
                            case "big":
                            case "blockquote":
                            case "body":
                            case "br":
                            case "center":
                            case "code":
                            case "dd":
                            case "div":
                            case "dl":
                            case "dt":
                            case "em":
                            case "embed":
                            case "h1":
                            case "h2":
                            case "h3":
                            case "h4":
                            case "h5":
                            case "h6":
                            case "head":
                            case "hr":
                            case "i":
                            case "img":
                            case "li":
                            case "listing":
                            case "menu":
                            case "meta":
                            case "nobr":
                            case "ol":
                            case "p":
                            case "pre":
                            case "ruby":
                            case "s":
                            case "small":
                            case "span":
                            case "strong":
                            case "strike":
                            case "sub":
                            case "sup":
                            case "table":
                            case "tt":
                            case "u":
                            case "ul":
                            case "var":
                                if (fragment) {
                                    break;
                                }
                                do {
                                    stack.pop();
                                    current = stack.top;
                                } while (current.namespaceURI !== NAMESPACE.HTML && !isMathmlTextIntegrationPoint(current) && !isHTMLIntegrationPoint(current));
                                insertToken(t, value, arg3, arg4);
                                return;
                        }
                        current = stack.elements.length === 1 && fragment ? fragmentContext : stack.top;
                        if (current.namespaceURI === NAMESPACE.MATHML) {
                            adjustMathMLAttributes(arg3);
                        }
                        else if (current.namespaceURI === NAMESPACE.SVG) {
                            value = adjustSVGTagName(value);
                            adjustSVGAttributes(arg3);
                        }
                        adjustForeignAttributes(arg3);
                        insertForeignElement(value, arg3, current.namespaceURI);
                        if (arg4) {
                            if (value === "script" && current.namespaceURI === NAMESPACE.SVG) {
                            }
                            stack.pop();
                        }
                        return;
                    case 3:
                        current = stack.top;
                        if (value === "script" && current.namespaceURI === NAMESPACE.SVG && current.localName === "script") {
                            stack.pop();
                        }
                        else {
                            var i = stack.elements.length - 1;
                            var node = stack.elements[i];
                            for (;;) {
                                if (node.localName.toLowerCase() === value) {
                                    stack.popElement(node);
                                    break;
                                }
                                node = stack.elements[--i];
                                if (node.namespaceURI !== NAMESPACE.HTML)
                                    continue;
                                parser(t, value, arg3, arg4);
                                break;
                            }
                        }
                        return;
                }
            }
            htmlparser.testTokenizer = function (input, initialState, lastStartTag, charbychar) {
                var tokens = [];
                switch (initialState) {
                    case "PCDATA state":
                        tokenizer = data_state;
                        break;
                    case "RCDATA state":
                        tokenizer = rcdata_state;
                        break;
                    case "RAWTEXT state":
                        tokenizer = rawtext_state;
                        break;
                    case "PLAINTEXT state":
                        tokenizer = plaintext_state;
                        break;
                }
                if (lastStartTag) {
                    lasttagname = lastStartTag;
                }
                insertToken = function (t, value, arg3, arg4) {
                    flushText();
                    switch (t) {
                        case 1:
                            if (tokens.length > 0 && tokens[tokens.length - 1][0] === "Character") {
                                tokens[tokens.length - 1][1] += value;
                            }
                            else
                                tokens.push(["Character", value]);
                            break;
                        case 4:
                            tokens.push(["Comment", value]);
                            break;
                        case 5:
                            tokens.push([
                                "DOCTYPE",
                                value,
                                arg3 === void 0 ? null : arg3,
                                arg4 === void 0 ? null : arg4,
                                !force_quirks
                            ]);
                            break;
                        case 2:
                            var attrs = /* @__PURE__ */ Object.create(null);
                            for (var i2 = 0; i2 < arg3.length; i2++) {
                                var a = arg3[i2];
                                if (a.length === 1) {
                                    attrs[a[0]] = "";
                                }
                                else {
                                    attrs[a[0]] = a[1];
                                }
                            }
                            var token = ["StartTag", value, attrs];
                            if (arg4)
                                token.push(true);
                            tokens.push(token);
                            break;
                        case 3:
                            tokens.push(["EndTag", value]);
                            break;
                        case -1:
                            break;
                    }
                };
                if (!charbychar) {
                    this.parse(input, true);
                }
                else {
                    for (var i = 0; i < input.length; i++) {
                        this.parse(input[i]);
                    }
                    this.parse("", true);
                }
                return tokens;
            };
            return htmlparser;
        }
    }
});
// external/npm/node_modules/domino/lib/DOMImplementation.js
var require_DOMImplementation = __commonJS({
    "external/npm/node_modules/domino/lib/DOMImplementation.js"(exports, module) {
        "use strict";
        module.exports = DOMImplementation;
        var Document = require_Document();
        var DocumentType = require_DocumentType();
        var HTMLParser = require_HTMLParser();
        var utils = require_utils();
        var xml = require_xmlnames();
        function DOMImplementation(contextObject) {
            this.contextObject = contextObject;
        }
        var supportedFeatures = {
            "xml": { "": true, "1.0": true, "2.0": true },
            "core": { "": true, "2.0": true },
            "html": { "": true, "1.0": true, "2.0": true },
            "xhtml": { "": true, "1.0": true, "2.0": true }
        };
        DOMImplementation.prototype = {
            hasFeature: function hasFeature(feature, version) {
                var f = supportedFeatures[(feature || "").toLowerCase()];
                return f && f[version || ""] || false;
            },
            createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
                if (!xml.isValidQName(qualifiedName))
                    utils.InvalidCharacterError();
                return new DocumentType(this.contextObject, qualifiedName, publicId, systemId);
            },
            createDocument: function createDocument(namespace, qualifiedName, doctype) {
                var d = new Document(false, null);
                var e;
                if (qualifiedName)
                    e = d.createElementNS(namespace, qualifiedName);
                else
                    e = null;
                if (doctype) {
                    d.appendChild(doctype);
                }
                if (e)
                    d.appendChild(e);
                if (namespace === utils.NAMESPACE.HTML) {
                    d._contentType = "application/xhtml+xml";
                }
                else if (namespace === utils.NAMESPACE.SVG) {
                    d._contentType = "image/svg+xml";
                }
                else {
                    d._contentType = "application/xml";
                }
                return d;
            },
            createHTMLDocument: function createHTMLDocument(titleText) {
                var d = new Document(true, null);
                d.appendChild(new DocumentType(d, "html"));
                var html = d.createElement("html");
                d.appendChild(html);
                var head = d.createElement("head");
                html.appendChild(head);
                if (titleText !== void 0) {
                    var title = d.createElement("title");
                    head.appendChild(title);
                    title.appendChild(d.createTextNode(titleText));
                }
                html.appendChild(d.createElement("body"));
                d.modclock = 1;
                return d;
            },
            mozSetOutputMutationHandler: function (doc, handler) {
                doc.mutationHandler = handler;
            },
            mozGetInputMutationHandler: function (doc) {
                utils.nyi();
            },
            mozHTMLParser: HTMLParser
        };
    }
});
// external/npm/node_modules/domino/lib/Location.js
var require_Location = __commonJS({
    "external/npm/node_modules/domino/lib/Location.js"(exports, module) {
        "use strict";
        var URL = require_URL();
        var URLUtils = require_URLUtils();
        module.exports = Location;
        function Location(window, href) {
            this._window = window;
            this._href = href;
        }
        Location.prototype = Object.create(URLUtils.prototype, {
            constructor: { value: Location },
            href: {
                get: function () {
                    return this._href;
                },
                set: function (v) {
                    this.assign(v);
                }
            },
            assign: { value: function (url) {
                    var current = new URL(this._href);
                    var newurl = current.resolve(url);
                    this._href = newurl;
                } },
            replace: { value: function (url) {
                    this.assign(url);
                } },
            reload: { value: function () {
                    this.assign(this.href);
                } },
            toString: { value: function () {
                    return this.href;
                } }
        });
    }
});
// external/npm/node_modules/domino/lib/NavigatorID.js
var require_NavigatorID = __commonJS({
    "external/npm/node_modules/domino/lib/NavigatorID.js"(exports, module) {
        "use strict";
        var NavigatorID = Object.create(null, {
            appCodeName: { value: "Mozilla" },
            appName: { value: "Netscape" },
            appVersion: { value: "4.0" },
            platform: { value: "" },
            product: { value: "Gecko" },
            productSub: { value: "20100101" },
            userAgent: { value: "" },
            vendor: { value: "" },
            vendorSub: { value: "" },
            taintEnabled: { value: function () {
                    return false;
                } }
        });
        module.exports = NavigatorID;
    }
});
// external/npm/node_modules/domino/lib/WindowTimers.js
var require_WindowTimers = __commonJS({
    "external/npm/node_modules/domino/lib/WindowTimers.js"(exports, module) {
        "use strict";
        var WindowTimers = {
            setTimeout,
            clearTimeout,
            setInterval,
            clearInterval
        };
        module.exports = WindowTimers;
    }
});
// external/npm/node_modules/domino/lib/impl.js
var require_impl = __commonJS({
    "external/npm/node_modules/domino/lib/impl.js"(exports, module) {
        "use strict";
        var utils = require_utils();
        exports = module.exports = {
            CSSStyleDeclaration: require_CSSStyleDeclaration(),
            CharacterData: require_CharacterData(),
            Comment: require_Comment(),
            DOMException: require_DOMException(),
            DOMImplementation: require_DOMImplementation(),
            DOMTokenList: require_DOMTokenList(),
            Document: require_Document(),
            DocumentFragment: require_DocumentFragment(),
            DocumentType: require_DocumentType(),
            Element: require_Element(),
            HTMLParser: require_HTMLParser(),
            NamedNodeMap: require_NamedNodeMap(),
            Node: require_Node(),
            NodeList: require_NodeList(),
            NodeFilter: require_NodeFilter(),
            ProcessingInstruction: require_ProcessingInstruction(),
            Text: require_Text(),
            Window: require_Window()
        };
        utils.merge(exports, require_events());
        utils.merge(exports, require_htmlelts().elements);
        utils.merge(exports, require_svg().elements);
    }
});
// external/npm/node_modules/domino/lib/Window.js
var require_Window = __commonJS({
    "external/npm/node_modules/domino/lib/Window.js"(exports, module) {
        "use strict";
        var DOMImplementation = require_DOMImplementation();
        var EventTarget = require_EventTarget();
        var Location = require_Location();
        var utils = require_utils();
        module.exports = Window;
        function Window(document) {
            this.document = document || new DOMImplementation(null).createHTMLDocument("");
            this.document._scripting_enabled = true;
            this.document.defaultView = this;
            this.location = new Location(this, this.document._address || "about:blank");
        }
        Window.prototype = Object.create(EventTarget.prototype, {
            console: { value: console },
            history: { value: {
                    back: utils.nyi,
                    forward: utils.nyi,
                    go: utils.nyi
                } },
            navigator: { value: require_NavigatorID() },
            window: { get: function () {
                    return this;
                } },
            self: { get: function () {
                    return this;
                } },
            frames: { get: function () {
                    return this;
                } },
            parent: { get: function () {
                    return this;
                } },
            top: { get: function () {
                    return this;
                } },
            length: { value: 0 },
            frameElement: { value: null },
            opener: { value: null },
            onload: {
                get: function () {
                    return this._getEventHandler("load");
                },
                set: function (v) {
                    this._setEventHandler("load", v);
                }
            },
            getComputedStyle: { value: function getComputedStyle(elt) {
                    return elt.style;
                } }
        });
        utils.expose(require_WindowTimers(), Window);
        utils.expose(require_impl(), Window);
    }
});
// external/npm/node_modules/domino/lib/index.js
var require_lib = __commonJS({
    "external/npm/node_modules/domino/lib/index.js"(exports) {
        var DOMImplementation = require_DOMImplementation();
        var HTMLParser = require_HTMLParser();
        var Window = require_Window();
        var impl = require_impl();
        exports.createDOMImplementation = function () {
            return new DOMImplementation(null);
        };
        exports.createDocument = function (html, force) {
            if (html || force) {
                var parser = new HTMLParser();
                parser.parse(html || "", true);
                return parser.document();
            }
            return new DOMImplementation(null).createHTMLDocument("");
        };
        exports.createIncrementalHTMLParser = function () {
            var parser = new HTMLParser();
            return {
                write: function (s) {
                    if (s.length > 0) {
                        parser.parse(s, false, function () {
                            return true;
                        });
                    }
                },
                end: function (s) {
                    parser.parse(s || "", true, function () {
                        return true;
                    });
                },
                process: function (shouldPauseFunc) {
                    return parser.parse("", false, shouldPauseFunc);
                },
                document: function () {
                    return parser.document();
                }
            };
        };
        exports.createWindow = function (html, address) {
            var document = exports.createDocument(html);
            if (address !== void 0) {
                document._address = address;
            }
            return new impl.Window(document);
        };
        exports.impl = impl;
    }
});
var domino = require_lib();
/*!
Parser-Lib
Copyright (c) 2009-2011 Nicholas C. Zakas. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

function setDomTypes() {
    // Make all Domino types available in the global env.
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
    constructor() {
        super(...arguments);
        this.supportsDOMEvents = false;
    }
    static makeCurrent() {
        setDomTypes();
        ɵsetRootDomAdapter(new DominoAdapter());
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
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
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
        var _a;
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return ((_a = doc.documentElement.querySelector('base')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
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
    getUserAgent() {
        return 'Fake user agent';
    }
    getCookie(name) {
        throw new Error('getCookie has not been implemented');
    }
}

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
PlatformState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: PlatformState, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
PlatformState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: PlatformState });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: PlatformState, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    } });

/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
const INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderApplication` or
 * `renderModule` just before current platform state is rendered to string.
 *
 * @publicApi
 */
const BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');

// @see https://www.w3.org/Protocols/HTTP/1.1/draft-ietf-http-v11-spec-01#URI-syntax
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
class ServerXhr {
    build() {
        return new xhr2.XMLHttpRequest();
    }
}
ServerXhr.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ServerXhr.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerXhr });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerXhr, decorators: [{
            type: Injectable
        }] });
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
function zoneWrappedInterceptorHandler(platformLocation, config) {
    return new ZoneClientBackend(new ɵHttpInterceptorHandler(inject(HttpBackend), inject(EnvironmentInjector)), platformLocation, config);
}
const SERVER_HTTP_PROVIDERS = [
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptorHandler,
        deps: [PlatformLocation, INITIAL_CONFIG]
    }
];

function parseUrl(urlStr) {
    const parsedUrl = url.parse(urlStr);
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
        if (!config) {
            return;
        }
        if (config.url) {
            const url = parseUrl(config.url);
            this.protocol = url.protocol;
            this.hostname = url.hostname;
            this.port = url.port;
            this.pathname = url.pathname;
            this.search = url.search;
            this.hash = url.hash;
            this.href = _doc.location.href;
        }
        if (config.useAbsoluteUrl) {
            if (!config.baseUrl) {
                throw new Error(`"PlatformConfig.baseUrl" must be set if "useAbsoluteUrl" is true`);
            }
            const url = parseUrl(config.baseUrl);
            this.protocol = url.protocol;
            this.hostname = url.hostname;
            this.port = url.port;
        }
    }
    getBaseHrefFromDOM() {
        return ɵgetDOM().getBaseHref(this._doc);
    }
    onPopState(fn) {
        // No-op: a state stack is not implemented, so
        // no events will ever come.
        return () => { };
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
ServerPlatformLocation.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerPlatformLocation, deps: [{ token: DOCUMENT }, { token: INITIAL_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ServerPlatformLocation.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerPlatformLocation });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerPlatformLocation, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [INITIAL_CONFIG]
                    }] }];
    } });
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

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
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
    addGlobalEventListener(element, eventName, handler) {
        const target = ɵgetDOM().getGlobalEventTarget(this.doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}
ServerEventManagerPlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
ServerEventManagerPlugin.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */ });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerEventManagerPlugin /* extends EventManagerPlugin which is private */, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    } });

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
                    const styles = ɵshimStyles(type.id, type.styles);
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
ServerRendererFactory2.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerRendererFactory2, deps: [{ token: i1.EventManager }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i1.ɵSharedStylesHost }], target: i0.ɵɵFactoryTarget.Injectable });
ServerRendererFactory2.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerRendererFactory2 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: i1.EventManager }, { type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1.ɵSharedStylesHost }];
    } });
class DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, schema) {
        this.eventManager = eventManager;
        this.document = document;
        this.ngZone = ngZone;
        this.schema = schema;
        this.data = Object.create(null);
        this.destroyNode = null;
    }
    destroy() { }
    createElement(name, namespace) {
        if (namespace) {
            const doc = this.document || ɵgetDOM().getDefaultDocument();
            return doc.createElementNS(ɵNAMESPACE_URIS[namespace], name);
        }
        return ɵgetDOM().createElement(name, this.document);
    }
    createComment(value) {
        return ɵgetDOM().getDefaultDocument().createComment(value);
    }
    createText(value) {
        const doc = ɵgetDOM().getDefaultDocument();
        return doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            const targetParent = isTemplateNode(parent) ? parent.content : parent;
            targetParent.insertBefore(newChild, refChild);
        }
    }
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    selectRootElement(selectorOrNode, preserveContent) {
        const el = typeof selectorOrNode === 'string' ? this.document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
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
            el.setAttributeNS(ɵNAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
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
        value = value == null ? '' : `${value}`.trim();
        const styleMap = _readStyleAttribute(el);
        if (flags & RendererStyleFlags2.Important) {
            value += ' !important';
        }
        styleMap[style] = value;
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
        throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === 'TEMPLATE' && node.content !== undefined;
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
    constructor(eventManager, document, ngZone, sharedStylesHost, schema, component) {
        super(eventManager, document, ngZone, schema);
        this.component = component;
        // Add a 's' prefix to style attributes to indicate server.
        const componentId = 's' + component.id;
        const styles = ɵshimStyles(componentId, component.styles);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = ɵshimContentAttribute(componentId);
        this.hostAttr = ɵshimHostAttribute(componentId);
    }
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
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
                const name = style.slice(0, colonIndex).trim();
                styleMap[name] = style.slice(colonIndex + 1).trim();
            }
        }
    }
    return styleMap;
}
function _writeStyleAttribute(element, styleMap) {
    // We have to construct the `style` attribute ourselves, instead of going through
    // `element.style.setProperty` like the other renderers, because `setProperty` won't
    // write newer CSS properties that Domino doesn't know about like `clip-path`.
    let styleAttrValue = '';
    for (const key in styleMap) {
        const newValue = styleMap[key];
        if (newValue != null && newValue !== '') {
            styleAttrValue += key + ':' + newValue + ';';
        }
    }
    if (styleAttrValue) {
        element.setAttribute('style', styleAttrValue);
    }
    else {
        element.removeAttribute('style');
    }
}

class ServerStylesHost extends ɵSharedStylesHost {
    constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this._styleNodes = new Set();
        this.head = doc.getElementsByTagName('head')[0];
    }
    onStyleAdded(style) {
        const adapter = ɵgetDOM();
        const el = adapter.createElement('style');
        el.textContent = style;
        if (!!this.transitionId) {
            el.setAttribute('ng-transition', this.transitionId);
        }
        this.head.appendChild(el);
        this._styleNodes.add(el);
    }
    ngOnDestroy() {
        this._styleNodes.forEach(styleNode => styleNode.remove());
        this._styleNodes.clear();
        super.ngOnDestroy();
    }
}
ServerStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerStylesHost, deps: [{ token: DOCUMENT }, { token: ɵTRANSITION_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ServerStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerStylesHost });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [ɵTRANSITION_ID]
                    }] }];
    } });

const TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
        provide: BEFORE_APP_SERIALIZED,
        useFactory: serializeTransferStateFactory,
        deps: [DOCUMENT, APP_ID, TransferState],
        multi: true,
    }];
function serializeTransferStateFactory(doc, appId, transferStore) {
    return () => {
        // The `.toJSON` here causes the `onSerialize` callbacks to be called.
        // These callbacks can be used to provide the value for a given key.
        const content = transferStore.toJson();
        if (transferStore.isEmpty) {
            // The state is empty, nothing to transfer,
            // avoid creating an extra `<script>` tag in this case.
            return;
        }
        const script = doc.createElement('script');
        script.id = appId + '-state';
        script.setAttribute('type', 'application/json');
        script.textContent = ɵescapeTransferStateContent(content);
        // It is intentional that we add the script at the very bottom. Angular CLI script tags for
        // bundles are always `type="module"`. These are deferred by default and cause the transfer
        // transfer data to be queried only after the browser has finished parsing the DOM.
        doc.body.appendChild(script);
    };
}
/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * Note: this module is not needed if the `renderApplication` function is used.
 * The `renderApplication` makes all providers from this module available in the application.
 *
 * @publicApi
 * @deprecated no longer needed, you can inject the `TransferState` in an app without providing
 *     this module.
 */
class ServerTransferStateModule {
}
ServerTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerTransferStateModule });
ServerTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerTransferStateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ɵALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter() {
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
ServerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerModule, imports: [HttpClientModule, NoopAnimationsModule], exports: [BrowserModule] });
ServerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerModule, providers: [
        TRANSFER_STATE_SERIALIZATION_PROVIDERS,
        SERVER_RENDER_PROVIDERS,
        SERVER_HTTP_PROVIDERS,
        { provide: Testability, useValue: null },
        { provide: ɵTESTABILITY, useValue: null },
        { provide: ViewportScroller, useClass: ɵNullViewportScroller },
    ], imports: [HttpClientModule, NoopAnimationsModule, BrowserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-b5278cc", ngImport: i0, type: ServerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    imports: [HttpClientModule, NoopAnimationsModule],
                    providers: [
                        TRANSFER_STATE_SERIALIZATION_PROVIDERS,
                        SERVER_RENDER_PROVIDERS,
                        SERVER_HTTP_PROVIDERS,
                        { provide: Testability, useValue: null },
                        { provide: ɵTESTABILITY, useValue: null },
                        { provide: ViewportScroller, useClass: ɵNullViewportScroller },
                    ],
                }]
        }] });
function _document(injector) {
    const config = injector.get(INITIAL_CONFIG, null);
    let document;
    if (config && config.document) {
        document = typeof config.document === 'string' ? parseDocument(config.document, config.url) :
            config.document;
    }
    else {
        document = ɵgetDOM().createHtmlDocument();
    }
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

function _getPlatform(platformFactory, options) {
    var _a;
    const extraProviders = (_a = options.platformProviders) !== null && _a !== void 0 ? _a : [];
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
function renderModule(moduleType, options) {
    const { document, url, extraProviders: platformProviders } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    return _render(platform, platform.bootstrapModule(moduleType));
}
function renderApplication(rootComponentOrBootstrapFn, options) {
    var _a;
    const { document, url, platformProviders, appId = '' } = options;
    const platform = _getPlatform(platformDynamicServer, { document, url, platformProviders });
    if (isBootstrapFn(rootComponentOrBootstrapFn)) {
        return _render(platform, rootComponentOrBootstrapFn());
    }
    const appProviders = [
        importProvidersFrom(BrowserModule.withServerTransition({ appId })),
        importProvidersFrom(ServerModule),
        ...((_a = options.providers) !== null && _a !== void 0 ? _a : []),
    ];
    return _render(platform, ɵinternalCreateApplication({ rootComponent: rootComponentOrBootstrapFn, appProviders }));
}
function isBootstrapFn(value) {
    // We can differentiate between a component and a bootstrap function by reading `cmp`:
    return typeof value === 'function' && !ɵgetComponentDef(value);
}

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-server package.
 */
/**
 * @publicApi
 */
const VERSION = new Version('16.0.0-next.1+sha-b5278cc');

/// <reference types="node" />
// This file only reexports content of the `src` folder. Keep it that way.

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */

export { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, PlatformState, ServerModule, ServerTransferStateModule, VERSION, platformDynamicServer, platformServer, renderApplication, renderModule, INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, SERVER_CONTEXT as ɵSERVER_CONTEXT, SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS, ServerRendererFactory2 as ɵServerRendererFactory2, setDomTypes as ɵsetDomTypes };
//# sourceMappingURL=platform-server.mjs.map
