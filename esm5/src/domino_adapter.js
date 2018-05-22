import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var domino = require('domino');
import { ɵBrowserDomAdapter as BrowserDomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/platform-browser';
function _notImplemented(methodName) {
    return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}
/**
 * Parses a document string to a Document object.
 */
export function parseDocument(html, url) {
    if (url === void 0) { url = '/'; }
    var window = domino.createWindow(html, url);
    var doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 */
export function serializeDocument(doc) {
    return doc.serialize();
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
    DominoAdapter.makeCurrent = function () { setRootDomAdapter(new DominoAdapter()); };
    DominoAdapter.prototype.logError = function (error) { console.error(error); };
    DominoAdapter.prototype.log = function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    DominoAdapter.prototype.logGroup = function (error) { console.error(error); };
    DominoAdapter.prototype.logGroupEnd = function () { };
    DominoAdapter.prototype.supportsDOMEvents = function () { return false; };
    DominoAdapter.prototype.supportsNativeShadowDOM = function () { return false; };
    DominoAdapter.prototype.contains = function (nodeA, nodeB) {
        var inner = nodeB;
        while (inner) {
            if (inner === nodeA)
                return true;
            inner = inner.parent;
        }
        return false;
    };
    DominoAdapter.prototype.createHtmlDocument = function () {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    };
    DominoAdapter.prototype.getDefaultDocument = function () {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = domino.createDocument();
        }
        return DominoAdapter.defaultDoc;
    };
    DominoAdapter.prototype.createShadowRoot = function (el, doc) {
        if (doc === void 0) { doc = document; }
        el.shadowRoot = doc.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    };
    DominoAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    DominoAdapter.prototype.isTextNode = function (node) { return node.nodeType === DominoAdapter.defaultDoc.TEXT_NODE; };
    DominoAdapter.prototype.isCommentNode = function (node) {
        return node.nodeType === DominoAdapter.defaultDoc.COMMENT_NODE;
    };
    DominoAdapter.prototype.isElementNode = function (node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    };
    DominoAdapter.prototype.hasShadowRoot = function (node) { return node.shadowRoot != null; };
    DominoAdapter.prototype.isShadowRoot = function (node) { return this.getShadowRoot(node) == node; };
    DominoAdapter.prototype.getProperty = function (el, name) {
        if (name === 'href') {
            // Domino tries tp resolve href-s which we do not want. Just return the
            // attribute value.
            return this.getAttribute(el, 'href');
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            return el.textContent;
        }
        return el[name];
    };
    DominoAdapter.prototype.setProperty = function (el, name, value) {
        if (name === 'href') {
            // Even though the server renderer reflects any properties to attributes
            // map 'href' to attribute just to handle when setProperty is directly called.
            this.setAttribute(el, 'href', value);
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            el.textContent = value;
        }
        el[name] = value;
    };
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
    DominoAdapter.prototype.getBaseHref = function (doc) {
        var base = this.querySelector(doc.documentElement, 'base');
        var href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    };
    /** @internal */
    /** @internal */
    DominoAdapter.prototype._readStyleAttribute = /** @internal */
    function (element) {
        var styleMap = {};
        var styleAttribute = element.getAttribute('style');
        if (styleAttribute) {
            var styleList = styleAttribute.split(/;+/g);
            for (var i = 0; i < styleList.length; i++) {
                var style = styleList[i].trim();
                if (style.length > 0) {
                    var colonIndex = style.indexOf(':');
                    if (colonIndex === -1) {
                        throw new Error("Invalid CSS style: " + style);
                    }
                    var name_1 = style.substr(0, colonIndex).trim();
                    styleMap[name_1] = style.substr(colonIndex + 1).trim();
                }
            }
        }
        return styleMap;
    };
    /** @internal */
    /** @internal */
    DominoAdapter.prototype._writeStyleAttribute = /** @internal */
    function (element, styleMap) {
        var styleAttrValue = '';
        for (var key in styleMap) {
            var newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.setAttribute('style', styleAttrValue);
    };
    DominoAdapter.prototype.setStyle = function (element, styleName, styleValue) {
        styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        var styleMap = this._readStyleAttribute(element);
        styleMap[styleName] = styleValue || '';
        this._writeStyleAttribute(element, styleMap);
    };
    DominoAdapter.prototype.removeStyle = function (element, styleName) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        this.setStyle(element, styleName, '');
    };
    DominoAdapter.prototype.getStyle = function (element, styleName) {
        var styleMap = this._readStyleAttribute(element);
        return styleMap[styleName] || '';
    };
    DominoAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        var value = this.getStyle(element, styleName);
        return styleValue ? value == styleValue : value.length > 0;
    };
    DominoAdapter.prototype.dispatchEvent = function (el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        var doc = el.ownerDocument || el;
        var win = doc.defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    };
    DominoAdapter.prototype.getHistory = function () { throw _notImplemented('getHistory'); };
    DominoAdapter.prototype.getLocation = function () { throw _notImplemented('getLocation'); };
    DominoAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    DominoAdapter.prototype.supportsWebAnimation = function () { return false; };
    DominoAdapter.prototype.performanceNow = function () { return Date.now(); };
    DominoAdapter.prototype.getAnimationPrefix = function () { return ''; };
    DominoAdapter.prototype.getTransitionEnd = function () { return 'transitionend'; };
    DominoAdapter.prototype.supportsAnimation = function () { return true; };
    DominoAdapter.prototype.getDistributedNodes = function (el) { throw _notImplemented('getDistributedNodes'); };
    DominoAdapter.prototype.supportsCookies = function () { return false; };
    DominoAdapter.prototype.getCookie = function (name) { throw _notImplemented('getCookie'); };
    DominoAdapter.prototype.setCookie = function (name, value) { throw _notImplemented('setCookie'); };
    return DominoAdapter;
}(BrowserDomAdapter));
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
export { DominoAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBT0EsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTNILHlCQUF5QixVQUFrQjtJQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLG1EQUFtRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0NBQ3BGOzs7O0FBS0QsTUFBTSx3QkFBd0IsSUFBWSxFQUFFLEdBQVM7SUFBVCxvQkFBQSxFQUFBLFNBQVM7SUFDbkQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQztDQUNaOzs7O0FBS0QsTUFBTSw0QkFBNEIsR0FBYTtJQUM3QyxPQUFRLEdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNqQzs7OztBQUtEOzs7QUFBQTtJQUFtQyx5Q0FBaUI7Ozs7SUFDM0MseUJBQVcsR0FBbEIsY0FBdUIsaUJBQWlCLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFJaEUsZ0NBQVEsR0FBUixVQUFTLEtBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFFakQsMkJBQUcsR0FBSCxVQUFJLEtBQWE7O1FBRWYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjtJQUVELGdDQUFRLEdBQVIsVUFBUyxL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RUFBRTtJQUNqRSxvQ0FBWSxHQUFaLGNBQXlCLE9BQU8saUJBQWlCLENBQUMsRUFBRTtJQUVwRCw0Q0FBb0IsR0FBcEIsY0FBa0MsT0FBTyxLQUFLLENBQUMsRUFBRTtJQUNqRCxzQ0FBYyxHQUFkLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDL0MsMENBQWtCLEdBQWxCLGNBQStCLE9BQU8sRUFBRSxDQUFDLEVBQUU7SUFDM0Msd0NBQWdCLEdBQWhCLGNBQTZCLE9BQU8sZUFBZSxDQUFDLEVBQUU7SUFDdEQseUNBQWlCLEdBQWpCLGNBQStCLE9BQU8sSUFBSSxDQUFDLEVBQUU7SUFFN0MsMkNBQW1CLEdBQW5CLFVBQW9CLEVBQU8sSUFBWSxNQUFNLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7SUFFdEYsdUNBQWUsR0FBZixjQUE2QixPQUFPLEtBQUssQ0FBQyxFQUFFO0lBQzVDLGlDQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtJQUN2RSxpQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEtBQWEsSUFBSSxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO3dCQXJOaEY7RUFrQ21DLGlCQUFpQixFQW9MbkQsQ0FBQTs7OztBQXBMRCx5QkFvTEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5jb25zdCBkb21pbm8gPSByZXF1aXJlKCdkb21pbm8nKTtcblxuaW1wb3J0IHvJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZnVuY3Rpb24gX25vdEltcGxlbWVudGVkKG1ldGhvZE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQgaW4gRG9taW5vQWRhcHRlcjogJyArIG1ldGhvZE5hbWUpO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIGRvY3VtZW50IHN0cmluZyB0byBhIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoaHRtbDogc3RyaW5nLCB1cmwgPSAnLycpIHtcbiAgbGV0IHdpbmRvdyA9IGRvbWluby5jcmVhdGVXaW5kb3coaHRtbCwgdXJsKTtcbiAgbGV0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgcmV0dXJuIGRvYztcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIGEgZG9jdW1lbnQgdG8gc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRG9jdW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gIHJldHVybiAoZG9jIGFzIGFueSkuc2VyaWFsaXplKCk7XG59XG5cbi8qKlxuICogRE9NIEFkYXB0ZXIgZm9yIHRoZSBzZXJ2ZXIgcGxhdGZvcm0gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2ZnbmFzcy9kb21pbm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBEb21pbm9BZGFwdGVyIGV4dGVuZHMgQnJvd3NlckRvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBEb21pbm9BZGFwdGVyKCkpOyB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdERvYzogRG9jdW1lbnQ7XG5cbiAgbG9nRXJyb3IoZXJyb3I6IHN0cmluZykgeyBjb25zb2xlLmVycm9yKGVycm9yKTsgfVxuXG4gIGxvZyhlcnJvcjogc3RyaW5nKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogc3RyaW5nKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7fVxuXG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgc3VwcG9ydHNOYXRpdmVTaGFkb3dET00oKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnRhaW5zKG5vZGVBOiBhbnksIG5vZGVCOiBhbnkpOiBib29sZWFuIHtcbiAgICBsZXQgaW5uZXIgPSBub2RlQjtcbiAgICB3aGlsZSAoaW5uZXIpIHtcbiAgICAgIGlmIChpbm5lciA9PT0gbm9kZUEpIHJldHVybiB0cnVlO1xuICAgICAgaW5uZXIgPSBpbm5lci5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBwYXJzZURvY3VtZW50KCc8aHRtbD48aGVhZD48dGl0bGU+ZmFrZVRpdGxlPC90aXRsZT48L2hlYWQ+PGJvZHk+PC9ib2R5PjwvaHRtbD4nKTtcbiAgfVxuXG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgaWYgKCFEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MpIHtcbiAgICAgIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYyA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jO1xuICB9XG5cbiAgY3JlYXRlU2hhZG93Um9vdChlbDogYW55LCBkb2M6IERvY3VtZW50ID0gZG9jdW1lbnQpOiBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBlbC5zaGFkb3dSb290ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbC5zaGFkb3dSb290LnBhcmVudCA9IGVsO1xuICAgIHJldHVybiBlbC5zaGFkb3dSb290O1xuICB9XG4gIGdldFNoYWRvd1Jvb3QoZWw6IGFueSk6IERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gZWwuc2hhZG93Um9vdDsgfVxuXG4gIGlzVGV4dE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MuVEVYVF9OT0RFOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5DT01NRU5UX05PREU7XG4gIH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5FTEVNRU5UX05PREUgOiBmYWxzZTtcbiAgfVxuICBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5zaGFkb3dSb290ICE9IG51bGw7IH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5nZXRTaGFkb3dSb290KG5vZGUpID09IG5vZGU7IH1cblxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAobmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAvLyBEb21pbm8gdHJpZXMgdHAgcmVzb2x2ZSBocmVmLXMgd2hpY2ggd2UgZG8gbm90IHdhbnQuIEp1c3QgcmV0dXJuIHRoZVxuICAgICAgLy8gYXR0cmlidXRlIHZhbHVlLlxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGVsLCAnaHJlZicpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICByZXR1cm4gZWwudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiAoPGFueT5lbClbbmFtZV07XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKG5hbWUgPT09ICdocmVmJykge1xuICAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIHNlcnZlciByZW5kZXJlciByZWZsZWN0cyBhbnkgcHJvcGVydGllcyB0byBhdHRyaWJ1dGVzXG4gICAgICAvLyBtYXAgJ2hyZWYnIHRvIGF0dHJpYnV0ZSBqdXN0IHRvIGhhbmRsZSB3aGVuIHNldFByb3BlcnR5IGlzIGRpcmVjdGx5IGNhbGxlZC5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsLCAnaHJlZicsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdpbm5lclRleHQnKSB7XG4gICAgICAvLyBEb21pbm8gZG9lcyBub3Qgc3VwcG9ydCBpbm5lclRleHQuIEp1c3QgbWFwIGl0IHRvIHRleHRDb250ZW50LlxuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgKDxhbnk+ZWwpW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0fG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09ICd3aW5kb3cnKSB7XG4gICAgICByZXR1cm4gZG9jLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBkb2MuYm9keTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBiYXNlID0gdGhpcy5xdWVyeVNlbGVjdG9yKGRvYy5kb2N1bWVudEVsZW1lbnQsICdiYXNlJyk7XG4gICAgbGV0IGhyZWYgPSAnJztcbiAgICBpZiAoYmFzZSkge1xuICAgICAgaHJlZiA9IHRoaXMuZ2V0SHJlZihiYXNlKTtcbiAgICB9XG4gICAgLy8gVE9ETyhhbHhodWIpOiBOZWVkIHJlbGF0aXZlIHBhdGggbG9naWMgZnJvbSBCcm93c2VyRG9tQWRhcHRlciBoZXJlP1xuICAgIHJldHVybiBocmVmO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSk6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSB7XG4gICAgY29uc3Qgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGNvbnN0IHN0eWxlQXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgaWYgKHN0eWxlQXR0cmlidXRlKSB7XG4gICAgICBjb25zdCBzdHlsZUxpc3QgPSBzdHlsZUF0dHJpYnV0ZS5zcGxpdCgvOysvZyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzdHlsZSA9IHN0eWxlTGlzdFtpXS50cmltKCk7XG4gICAgICAgIGlmIChzdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgY29sb25JbmRleCA9IHN0eWxlLmluZGV4T2YoJzonKTtcbiAgICAgICAgICBpZiAoY29sb25JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBDU1Mgc3R5bGU6ICR7c3R5bGV9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBzdHlsZS5zdWJzdHIoMCwgY29sb25JbmRleCkudHJpbSgpO1xuICAgICAgICAgIHN0eWxlTWFwW25hbWVdID0gc3R5bGUuc3Vic3RyKGNvbG9uSW5kZXggKyAxKS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlTWFwO1xuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBzdHlsZU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9KSB7XG4gICAgbGV0IHN0eWxlQXR0clZhbHVlID0gJyc7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGVNYXApIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gc3R5bGVNYXBba2V5XTtcbiAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICBzdHlsZUF0dHJWYWx1ZSArPSBrZXkgKyAnOicgKyBzdHlsZU1hcFtrZXldICsgJzsnO1xuICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZUF0dHJWYWx1ZSk7XG4gIH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZ3xudWxsKSB7XG4gICAgc3R5bGVOYW1lID0gc3R5bGVOYW1lLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc3R5bGVNYXAgPSB0aGlzLl9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgc3R5bGVNYXBbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWUgfHwgJyc7XG4gICAgdGhpcy5fd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZU1hcCk7XG4gIH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZykge1xuICAgIC8vIElFIHJlcXVpcmVzICcnIGluc3RlYWQgb2YgbnVsbFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgdGhpcy5zZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUsICcnKTtcbiAgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdHlsZU1hcCA9IHRoaXMuX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVNYXBbc3R5bGVOYW1lXSB8fCAnJztcbiAgfVxuICBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZSk7XG4gICAgcmV0dXJuIHN0eWxlVmFsdWUgPyB2YWx1ZSA9PSBzdHlsZVZhbHVlIDogdmFsdWUubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZWw6IE5vZGUsIGV2dDogYW55KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldnQpO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGV2ZW50IHRvIHRoZSB3aW5kb3cgYWxzby5cbiAgICBjb25zdCBkb2MgPSBlbC5vd25lckRvY3VtZW50IHx8IGVsO1xuICAgIGNvbnN0IHdpbiA9IChkb2MgYXMgYW55KS5kZWZhdWx0VmlldztcbiAgICBpZiAod2luKSB7XG4gICAgICB3aW4uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0SGlzdG9yeScpOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRMb2NhdGlvbicpOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cblxuICBzdXBwb3J0c1dlYkFuaW1hdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHJldHVybiBEYXRlLm5vdygpOyB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyByZXR1cm4gJ3RyYW5zaXRpb25lbmQnOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0RGlzdHJpYnV0ZWROb2RlcycpOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0Q29va2llJyk7IH1cbiAgc2V0Q29va2llKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ3NldENvb2tpZScpOyB9XG59XG4iXX0=