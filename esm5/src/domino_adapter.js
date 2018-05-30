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
function setDomTypes() {
    // Make all Domino types available as types in the global env.
    Object.assign(global, domino.impl);
    global['KeyboardEvent'] = domino.impl.Event;
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
    DominoAdapter.makeCurrent = function () {
        setDomTypes();
        setRootDomAdapter(new DominoAdapter());
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBT0EsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTNILHlCQUF5QixVQUFrQjtJQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLG1EQUFtRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0NBQ3BGO0FBRUQ7O0lBRUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE1BQWMsQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztDQUN0RDs7OztBQUtELE1BQU0sd0JBQXdCLElBQVksRUFBRSxHQUFTO0lBQVQsb0JBQUEsRUFBQSxTQUFTO0lBQ25ELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsT0FBTyxHQUFHLENBQUM7Q0FDWjs7OztBQUtELE1BQU0sNEJBQTRCLEdBQWE7SUFDN0MsT0FBUSxHQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDakM7Ozs7QUFLRDs7O0FBQUE7SUFBbUMseUNBQWlCOzs7O0lBQzNDLHlCQUFXLEdBQWxCO1FBQ0UsV0FBVyxFQUFFLENBQUM7UUFDZCxpQkFBaUIsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7S0FDeEM7SUFJRCxnQ0FBUSxHQUFS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LENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCxrQ0FBVSxHQUFWLGNBQXdCLE1BQU0sZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7SUFDOUQsbUNBQVcsR0FBWCxjQUEwQixNQUFNLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFO0lBQ2pFLG9DQUFZLEdBQVosY0FBeUIsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFO0lBRXBELDRDQUFvQixHQUFwQixjQUFrQyxPQUFPLEtBQUssQ0FBQyxFQUFFO0lBQ2pELHNDQUFjLEdBQWQsY0FBMkIsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUMvQywwQ0FBa0IsR0FBbEIsY0FBK0IsT0FBTyxFQUFFLENBQUMsRUFBRTtJQUMzQyx3Q0FBZ0IsR0FBaEIsY0FBNkIsT0FBTyxlQUFlLENBQUMsRUFBRTtJQUN0RCx5Q0FBaUIsR0FBakIsY0FBK0IsT0FBTyxJQUFJLENBQUMsRUFBRTtJQUU3QywyQ0FBbUIsR0FBbkIsVUFBb0IsRUFBTyxJQUFZLE1BQU0sZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRTtJQUV0Rix1Q0FBZSxHQUFmLGNBQTZCLE9BQU8sS0FBSyxDQUFDLEVBQUU7SUFDNUMsaUNBQVMsR0FBVCxVQUFVLElBQVksSUFBWSxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO0lBQ3ZFLGlDQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7d0JBOU5oRjtFQXdDbUMsaUJBQWlCLEVBdUxuRCxDQUFBOzs7O0FBdkxELHlCQXVMQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IGRvbWlubyA9IHJlcXVpcmUoJ2RvbWlubycpO1xuXG5pbXBvcnQge8m1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXIsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5mdW5jdGlvbiBfbm90SW1wbGVtZW50ZWQobWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBEb21pbm9BZGFwdGVyOiAnICsgbWV0aG9kTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHNldERvbVR5cGVzKCkge1xuICAvLyBNYWtlIGFsbCBEb21pbm8gdHlwZXMgYXZhaWxhYmxlIGFzIHR5cGVzIGluIHRoZSBnbG9iYWwgZW52LlxuICBPYmplY3QuYXNzaWduKGdsb2JhbCwgZG9taW5vLmltcGwpO1xuICAoZ2xvYmFsIGFzIGFueSlbJ0tleWJvYXJkRXZlbnQnXSA9IGRvbWluby5pbXBsLkV2ZW50O1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIGRvY3VtZW50IHN0cmluZyB0byBhIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoaHRtbDogc3RyaW5nLCB1cmwgPSAnLycpIHtcbiAgbGV0IHdpbmRvdyA9IGRvbWluby5jcmVhdGVXaW5kb3coaHRtbCwgdXJsKTtcbiAgbGV0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgcmV0dXJuIGRvYztcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIGEgZG9jdW1lbnQgdG8gc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRG9jdW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gIHJldHVybiAoZG9jIGFzIGFueSkuc2VyaWFsaXplKCk7XG59XG5cbi8qKlxuICogRE9NIEFkYXB0ZXIgZm9yIHRoZSBzZXJ2ZXIgcGxhdGZvcm0gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2ZnbmFzcy9kb21pbm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBEb21pbm9BZGFwdGVyIGV4dGVuZHMgQnJvd3NlckRvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7XG4gICAgc2V0RG9tVHlwZXMoKTtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgRG9taW5vQWRhcHRlcigpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGRlZmF1bHREb2M6IERvY3VtZW50O1xuXG4gIGxvZ0Vycm9yKGVycm9yOiBzdHJpbmcpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICBsb2coZXJyb3I6IHN0cmluZykge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IHN0cmluZykgeyBjb25zb2xlLmVycm9yKGVycm9yKTsgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge31cblxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICBjb250YWlucyhub2RlQTogYW55LCBub2RlQjogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IGlubmVyID0gbm9kZUI7XG4gICAgd2hpbGUgKGlubmVyKSB7XG4gICAgICBpZiAoaW5uZXIgPT09IG5vZGVBKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlubmVyID0gaW5uZXIucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICByZXR1cm4gcGFyc2VEb2N1bWVudCgnPGh0bWw+PGhlYWQ+PHRpdGxlPmZha2VUaXRsZTwvdGl0bGU+PC9oZWFkPjxib2R5PjwvYm9keT48L2h0bWw+Jyk7XG4gIH1cblxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIGlmICghRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jKSB7XG4gICAgICBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MgPSBkb21pbm8uY3JlYXRlRG9jdW1lbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYztcbiAgfVxuXG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWw6IGFueSwgZG9jOiBEb2N1bWVudCA9IGRvY3VtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XG4gICAgZWwuc2hhZG93Um9vdCA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZWwuc2hhZG93Um9vdC5wYXJlbnQgPSBlbDtcbiAgICByZXR1cm4gZWwuc2hhZG93Um9vdDtcbiAgfVxuICBnZXRTaGFkb3dSb290KGVsOiBhbnkpOiBEb2N1bWVudEZyYWdtZW50IHsgcmV0dXJuIGVsLnNoYWRvd1Jvb3Q7IH1cblxuICBpc1RleHROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLlRFWFRfTk9ERTsgfVxuICBpc0NvbW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MuQ09NTUVOVF9OT0RFO1xuICB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUgPyBub2RlLm5vZGVUeXBlID09PSBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MuRUxFTUVOVF9OT0RFIDogZmFsc2U7XG4gIH1cbiAgaGFzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUuc2hhZG93Um9vdCAhPSBudWxsOyB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZ2V0U2hhZG93Um9vdChub2RlKSA9PSBub2RlOyB9XG5cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWUgPT09ICdocmVmJykge1xuICAgICAgLy8gRG9taW5vIHRyaWVzIHRwIHJlc29sdmUgaHJlZi1zIHdoaWNoIHdlIGRvIG5vdCB3YW50LiBKdXN0IHJldHVybiB0aGVcbiAgICAgIC8vIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShlbCwgJ2hyZWYnKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdpbm5lclRleHQnKSB7XG4gICAgICAvLyBEb21pbm8gZG9lcyBub3Qgc3VwcG9ydCBpbm5lclRleHQuIEp1c3QgbWFwIGl0IHRvIHRleHRDb250ZW50LlxuICAgICAgcmV0dXJuIGVsLnRleHRDb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+ZWwpW25hbWVdO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChuYW1lID09PSAnaHJlZicpIHtcbiAgICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBzZXJ2ZXIgcmVuZGVyZXIgcmVmbGVjdHMgYW55IHByb3BlcnRpZXMgdG8gYXR0cmlidXRlc1xuICAgICAgLy8gbWFwICdocmVmJyB0byBhdHRyaWJ1dGUganVzdCB0byBoYW5kbGUgd2hlbiBzZXRQcm9wZXJ0eSBpcyBkaXJlY3RseSBjYWxsZWQuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShlbCwgJ2hyZWYnLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnaW5uZXJUZXh0Jykge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgaW5uZXJUZXh0LiBKdXN0IG1hcCBpdCB0byB0ZXh0Q29udGVudC5cbiAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfVxuICAgICg8YW55PmVsKVtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIGRvYy5kZWZhdWx0VmlldztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgYmFzZSA9IHRoaXMucXVlcnlTZWxlY3Rvcihkb2MuZG9jdW1lbnRFbGVtZW50LCAnYmFzZScpO1xuICAgIGxldCBocmVmID0gJyc7XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIGhyZWYgPSB0aGlzLmdldEhyZWYoYmFzZSk7XG4gICAgfVxuICAgIC8vIFRPRE8oYWx4aHViKTogTmVlZCByZWxhdGl2ZSBwYXRoIGxvZ2ljIGZyb20gQnJvd3NlckRvbUFkYXB0ZXIgaGVyZT9cbiAgICByZXR1cm4gaHJlZjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30ge1xuICAgIGNvbnN0IHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBjb25zdCBzdHlsZUF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIGlmIChzdHlsZUF0dHJpYnV0ZSkge1xuICAgICAgY29uc3Qgc3R5bGVMaXN0ID0gc3R5bGVBdHRyaWJ1dGUuc3BsaXQoLzsrL2cpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZUxpc3RbaV0udHJpbSgpO1xuICAgICAgICBpZiAoc3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBzdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgaWYgKGNvbG9uSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgQ1NTIHN0eWxlOiAke3N0eWxlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBuYW1lID0gc3R5bGUuc3Vic3RyKDAsIGNvbG9uSW5kZXgpLnRyaW0oKTtcbiAgICAgICAgICBzdHlsZU1hcFtuYW1lXSA9IHN0eWxlLnN1YnN0cihjb2xvbkluZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZU1hcDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuICAgIGxldCBzdHlsZUF0dHJWYWx1ZSA9ICcnO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlTWFwKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgc3R5bGVBdHRyVmFsdWUgKz0ga2V5ICsgJzonICsgc3R5bGVNYXBba2V5XSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVBdHRyVmFsdWUpO1xuICB9XG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmd8bnVsbCkge1xuICAgIHN0eWxlTmFtZSA9IHN0eWxlTmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHN0eWxlTWFwW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlIHx8ICcnO1xuICAgIHRoaXMuX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgIHRoaXMuc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCAnJyk7XG4gIH1cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3R5bGVNYXAgPSB0aGlzLl9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgcmV0dXJuIHN0eWxlTWFwW3N0eWxlTmFtZV0gfHwgJyc7XG4gIH1cbiAgaGFzU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUpO1xuICAgIHJldHVybiBzdHlsZVZhbHVlID8gdmFsdWUgPT0gc3R5bGVWYWx1ZSA6IHZhbHVlLmxlbmd0aCA+IDA7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBldmVudCB0byB0aGUgd2luZG93IGFsc28uXG4gICAgY29uc3QgZG9jID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgICBjb25zdCB3aW4gPSAoZG9jIGFzIGFueSkuZGVmYXVsdFZpZXc7XG4gICAgaWYgKHdpbikge1xuICAgICAgd2luLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH1cblxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldEhpc3RvcnknKTsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0TG9jYXRpb24nKTsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnOyB9XG5cbiAgc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZS5ub3coKTsgfVxuICBnZXRBbmltYXRpb25QcmVmaXgoKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG4gIGdldFRyYW5zaXRpb25FbmQoKTogc3RyaW5nIHsgcmV0dXJuICd0cmFuc2l0aW9uZW5kJzsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBnZXREaXN0cmlidXRlZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldERpc3RyaWJ1dGVkTm9kZXMnKTsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldENvb2tpZScpOyB9XG4gIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdzZXRDb29raWUnKTsgfVxufVxuIl19