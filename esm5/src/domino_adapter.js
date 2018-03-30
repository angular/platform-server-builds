/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ domino = require('domino');
import { ɵBrowserDomAdapter as BrowserDomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/platform-browser';
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
export function parseDocument(html, url) {
    if (url === void 0) { url = '/'; }
    var /** @type {?} */ window = domino.createWindow(html, url);
    var /** @type {?} */ doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 * @param {?} doc
 * @return {?}
 */
export function serializeDocument(doc) {
    return (/** @type {?} */ (doc)).serialize();
}
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
var /**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
DominoAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(DominoAdapter, _super);
    function DominoAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    DominoAdapter.makeCurrent = /**
     * @return {?}
     */
    function () { setRootDomAdapter(new DominoAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.logError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) { console.error(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.log = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    DominoAdapter.prototype.logGroup = /**
     * @param {?} error
     * @return {?}
     */
    function (error) { console.error(error); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.logGroupEnd = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsDOMEvents = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsNativeShadowDOM = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    DominoAdapter.prototype.contains = /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    function (nodeA, nodeB) {
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
    DominoAdapter.prototype.createHtmlDocument = /**
     * @return {?}
     */
    function () {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getDefaultDocument = /**
     * @return {?}
     */
    function () {
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
    DominoAdapter.prototype.createShadowRoot = /**
     * @param {?} el
     * @param {?=} doc
     * @return {?}
     */
    function (el, doc) {
        if (doc === void 0) { doc = document; }
        el.shadowRoot = doc.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DominoAdapter.prototype.getShadowRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { return el.shadowRoot; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isTextNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { return node.nodeType === DominoAdapter.defaultDoc.TEXT_NODE; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isCommentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node.nodeType === DominoAdapter.defaultDoc.COMMENT_NODE;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isElementNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.hasShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { return node.shadowRoot != null; };
    /**
     * @param {?} node
     * @return {?}
     */
    DominoAdapter.prototype.isShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { return this.getShadowRoot(node) == node; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DominoAdapter.prototype.getProperty = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) {
        if (name === 'href') {
            // Domino tries tp resolve href-s which we do not want. Just return the
            // attribute value.
            return this.getAttribute(el, 'href');
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            return el.textContent;
        }
        return (/** @type {?} */ (el))[name];
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DominoAdapter.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) {
        if (name === 'href') {
            // Even though the server renderer reflects any properties to attributes
            // map 'href' to attribute just to handle when setProperty is directly called.
            this.setAttribute(el, 'href', value);
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            el.textContent = value;
        }
        (/** @type {?} */ (el))[name] = value;
    };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    DominoAdapter.prototype.getGlobalEventTarget = /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    function (doc, target) {
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
    DominoAdapter.prototype.getBaseHref = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        var /** @type {?} */ base = this.querySelector(doc.documentElement, 'base');
        var /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    DominoAdapter.prototype._readStyleAttribute = /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ styleMap = {};
        var /** @type {?} */ styleAttribute = element.getAttribute('style');
        if (styleAttribute) {
            var /** @type {?} */ styleList = styleAttribute.split(/;+/g);
            for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                var /** @type {?} */ style = styleList[i].trim();
                if (style.length > 0) {
                    var /** @type {?} */ colonIndex = style.indexOf(':');
                    if (colonIndex === -1) {
                        throw new Error("Invalid CSS style: " + style);
                    }
                    var /** @type {?} */ name_1 = style.substr(0, colonIndex).trim();
                    styleMap[name_1] = style.substr(colonIndex + 1).trim();
                }
            }
        }
        return styleMap;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    DominoAdapter.prototype._writeStyleAttribute = /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    function (element, styleMap) {
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
    DominoAdapter.prototype.setStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) {
        styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        styleMap[styleName] = styleValue || '';
        this._writeStyleAttribute(element, styleMap);
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DominoAdapter.prototype.removeStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        this.setStyle(element, styleName, '');
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DominoAdapter.prototype.getStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap[styleName] || '';
    };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    DominoAdapter.prototype.hasStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) {
        var /** @type {?} */ value = this.getStyle(element, styleName);
        return styleValue ? value == styleValue : value.length > 0;
    };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    DominoAdapter.prototype.dispatchEvent = /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    function (el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        var /** @type {?} */ doc = el.ownerDocument || el;
        var /** @type {?} */ win = (/** @type {?} */ (doc)).defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getHistory = /**
     * @return {?}
     */
    function () { throw _notImplemented('getHistory'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getLocation = /**
     * @return {?}
     */
    function () { throw _notImplemented('getLocation'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getUserAgent = /**
     * @return {?}
     */
    function () { return 'Fake user agent'; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsWebAnimation = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.performanceNow = /**
     * @return {?}
     */
    function () { return Date.now(); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getAnimationPrefix = /**
     * @return {?}
     */
    function () { return ''; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.getTransitionEnd = /**
     * @return {?}
     */
    function () { return 'transitionend'; };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsAnimation = /**
     * @return {?}
     */
    function () { return true; };
    /**
     * @param {?} el
     * @return {?}
     */
    DominoAdapter.prototype.getDistributedNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw _notImplemented('getDistributedNodes'); };
    /**
     * @return {?}
     */
    DominoAdapter.prototype.supportsCookies = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    DominoAdapter.prototype.getCookie = /**
     * @param {?} name
     * @return {?}
     */
    function (name) { throw _notImplemented('getCookie'); };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DominoAdapter.prototype.setCookie = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) { throw _notImplemented('setCookie'); };
    return DominoAdapter;
}(BrowserDomAdapter));
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
export { DominoAdapter };
function DominoAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    DominoAdapter.defaultDoc;
}
//# sourceMappingURL=domino_adapter.js.map