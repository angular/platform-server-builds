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
const /** @type {?} */ domino = require('domino');
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
export function parseDocument(html, url = '/') {
    let /** @type {?} */ window = domino.createWindow(html, url);
    let /** @type {?} */ doc = window.document;
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
export class DominoAdapter extends BrowserDomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new DominoAdapter()); }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) { console.error(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { console.error(error); }
    /**
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return false; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { return false; }
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    contains(nodeA, nodeB) {
        let /** @type {?} */ inner = nodeB;
        while (inner) {
            if (inner === nodeA)
                return true;
            inner = inner.parent;
        }
        return false;
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    }
    /**
     * @return {?}
     */
    getDefaultDocument() {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = domino.createDocument();
        }
        return DominoAdapter.defaultDoc;
    }
    /**
     * @param {?} el
     * @param {?=} doc
     * @return {?}
     */
    createShadowRoot(el, doc = document) {
        el.shadowRoot = doc.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return el.shadowRoot; }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return node.nodeType === DominoAdapter.defaultDoc.TEXT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) {
        return node.nodeType === DominoAdapter.defaultDoc.COMMENT_NODE;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { return node.shadowRoot != null; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return this.getShadowRoot(node) == node; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) {
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
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
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
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
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
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        const /** @type {?} */ base = this.querySelector(doc.documentElement, 'base');
        let /** @type {?} */ href = '';
        if (base) {
            href = this.getHref(base);
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    }
    /**
     * \@internal
     * @param {?} element
     * @return {?}
     */
    _readStyleAttribute(element) {
        const /** @type {?} */ styleMap = {};
        const /** @type {?} */ styleAttribute = element.getAttribute('style');
        if (styleAttribute) {
            const /** @type {?} */ styleList = styleAttribute.split(/;+/g);
            for (let /** @type {?} */ i = 0; i < styleList.length; i++) {
                const /** @type {?} */ style = styleList[i].trim();
                if (style.length > 0) {
                    const /** @type {?} */ colonIndex = style.indexOf(':');
                    if (colonIndex === -1) {
                        throw new Error(`Invalid CSS style: ${style}`);
                    }
                    const /** @type {?} */ name = style.substr(0, colonIndex).trim();
                    styleMap[name] = style.substr(colonIndex + 1).trim();
                }
            }
        }
        return styleMap;
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    _writeStyleAttribute(element, styleMap) {
        let /** @type {?} */ styleAttrValue = '';
        for (const /** @type {?} */ key in styleMap) {
            const /** @type {?} */ newValue = styleMap[key];
            if (newValue) {
                styleAttrValue += key + ':' + styleMap[key] + ';';
            }
        }
        element.setAttribute('style', styleAttrValue);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        styleMap[styleName] = styleValue || '';
        this._writeStyleAttribute(element, styleMap);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        this.setStyle(element, styleName, '');
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) {
        const /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap[styleName] || '';
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        const /** @type {?} */ value = this.getStyle(element, styleName);
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        const /** @type {?} */ doc = el.ownerDocument || el;
        const /** @type {?} */ win = (/** @type {?} */ (doc)).defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    }
    /**
     * @return {?}
     */
    getHistory() { throw _notImplemented('getHistory'); }
    /**
     * @return {?}
     */
    getLocation() { throw _notImplemented('getLocation'); }
    /**
     * @return {?}
     */
    getUserAgent() { return 'Fake user agent'; }
    /**
     * @return {?}
     */
    supportsWebAnimation() { return false; }
    /**
     * @return {?}
     */
    performanceNow() { return Date.now(); }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return 'transitionend'; }
    /**
     * @return {?}
     */
    supportsAnimation() { return true; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw _notImplemented('getDistributedNodes'); }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw _notImplemented('getCookie'); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { throw _notImplemented('setCookie'); }
}
function DominoAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    DominoAdapter.defaultDoc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFFM0gseUJBQXlCLFVBQWtCO0lBQ3pDLE9BQU8sSUFBSSxLQUFLLENBQUMsbURBQW1ELEdBQUcsVUFBVSxDQUFDLENBQUM7Q0FDcEY7Ozs7Ozs7QUFLRCxNQUFNLHdCQUF3QixJQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDbkQscUJBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLHFCQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7OztBQUtELE1BQU0sNEJBQTRCLEdBQWE7SUFDN0MsT0FBTyxtQkFBQyxHQUFVLEVBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNqQzs7OztBQUtELE1BQU0sb0JBQXFCLFNBQVEsaUJBQWlCOzs7O0lBQ2xELE1BQU0sQ0FBQyxXQUFXLEtBQUssaUJBQWlCLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBSWhFLFFBQVEsQ0FBQyxLQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVqRCxHQUFHLENBQUMsS0FBYTs7UUFFZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCOzs7OztJQUVELFFBQVEs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QixDQUFDLEVBQUU7Ozs7SUFFcEQsb0JBQW9CLEtBQWMsT0FBTyxLQUFLLENBQUMsRUFBRTs7OztJQUNqRCxjQUFjLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTs7OztJQUMvQyxrQkFBa0IsS0FBYSxPQUFPLEVBQUUsQ0FBQyxFQUFFOzs7O0lBQzNDLGdCQUFnQixLQUFhLE9BQU8sZUFBZSxDQUFDLEVBQUU7Ozs7SUFDdEQsaUJBQWlCLEtBQWMsT0FBTyxJQUFJLENBQUMsRUFBRTs7Ozs7SUFFN0MsbUJBQW1CLENBQUMsRUFBTyxJQUFZLE1BQU0sZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRTs7OztJQUV0RixlQUFlLEtBQWMsT0FBTyxLQUFLLENBQUMsRUFBRTs7Ozs7SUFDNUMsU0FBUyxDQUFDLElBQVksSUFBWSxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFDdkUsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtDQUMvRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IGRvbWlubyA9IHJlcXVpcmUoJ2RvbWlubycpO1xuXG5pbXBvcnQge8m1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXIsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5mdW5jdGlvbiBfbm90SW1wbGVtZW50ZWQobWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBEb21pbm9BZGFwdGVyOiAnICsgbWV0aG9kTmFtZSk7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgZG9jdW1lbnQgc3RyaW5nIHRvIGEgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEb2N1bWVudChodG1sOiBzdHJpbmcsIHVybCA9ICcvJykge1xuICBsZXQgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdyhodG1sLCB1cmwpO1xuICBsZXQgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgYSBkb2N1bWVudCB0byBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVEb2N1bWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIChkb2MgYXMgYW55KS5zZXJpYWxpemUoKTtcbn1cblxuLyoqXG4gKiBET00gQWRhcHRlciBmb3IgdGhlIHNlcnZlciBwbGF0Zm9ybSBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmduYXNzL2RvbWluby5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbWlub0FkYXB0ZXIgZXh0ZW5kcyBCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IERvbWlub0FkYXB0ZXIoKSk7IH1cblxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0RG9jOiBEb2N1bWVudDtcblxuICBsb2dFcnJvcihlcnJvcjogc3RyaW5nKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICBsb2dHcm91cEVuZCgpIHt9XG5cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBzdXBwb3J0c05hdGl2ZVNoYWRvd0RPTSgpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY29udGFpbnMobm9kZUE6IGFueSwgbm9kZUI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGxldCBpbm5lciA9IG5vZGVCO1xuICAgIHdoaWxlIChpbm5lcikge1xuICAgICAgaWYgKGlubmVyID09PSBub2RlQSkgcmV0dXJuIHRydWU7XG4gICAgICBpbm5lciA9IGlubmVyLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQoJzxodG1sPjxoZWFkPjx0aXRsZT5mYWtlVGl0bGU8L3RpdGxlPjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICBpZiAoIURvbWlub0FkYXB0ZXIuZGVmYXVsdERvYykge1xuICAgICAgRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2M7XG4gIH1cblxuICBjcmVhdGVTaGFkb3dSb290KGVsOiBhbnksIGRvYzogRG9jdW1lbnQgPSBkb2N1bWVudCk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgIGVsLnNoYWRvd1Jvb3QgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGVsLnNoYWRvd1Jvb3QucGFyZW50ID0gZWw7XG4gICAgcmV0dXJuIGVsLnNoYWRvd1Jvb3Q7XG4gIH1cbiAgZ2V0U2hhZG93Um9vdChlbDogYW55KTogRG9jdW1lbnRGcmFnbWVudCB7IHJldHVybiBlbC5zaGFkb3dSb290OyB9XG5cbiAgaXNUZXh0Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5URVhUX05PREU7IH1cbiAgaXNDb21tZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkNPTU1FTlRfTk9ERTtcbiAgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlID8gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkVMRU1FTlRfTk9ERSA6IGZhbHNlO1xuICB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlLnNoYWRvd1Jvb3QgIT0gbnVsbDsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmdldFNoYWRvd1Jvb3Qobm9kZSkgPT0gbm9kZTsgfVxuXG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lID09PSAnaHJlZicpIHtcbiAgICAgIC8vIERvbWlubyB0cmllcyB0cCByZXNvbHZlIGhyZWYtcyB3aGljaCB3ZSBkbyBub3Qgd2FudC4gSnVzdCByZXR1cm4gdGhlXG4gICAgICAvLyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoZWwsICdocmVmJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnaW5uZXJUZXh0Jykge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgaW5uZXJUZXh0LiBKdXN0IG1hcCBpdCB0byB0ZXh0Q29udGVudC5cbiAgICAgIHJldHVybiBlbC50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PmVsKVtuYW1lXTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAvLyBFdmVuIHRob3VnaCB0aGUgc2VydmVyIHJlbmRlcmVyIHJlZmxlY3RzIGFueSBwcm9wZXJ0aWVzIHRvIGF0dHJpYnV0ZXNcbiAgICAgIC8vIG1hcCAnaHJlZicgdG8gYXR0cmlidXRlIGp1c3QgdG8gaGFuZGxlIHdoZW4gc2V0UHJvcGVydHkgaXMgZGlyZWN0bHkgY2FsbGVkLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWwsICdocmVmJywgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH1cbiAgICAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiBkb2MuZGVmYXVsdFZpZXc7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2UgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoZG9jLmRvY3VtZW50RWxlbWVudCwgJ2Jhc2UnKTtcbiAgICBsZXQgaHJlZiA9ICcnO1xuICAgIGlmIChiYXNlKSB7XG4gICAgICBocmVmID0gdGhpcy5nZXRIcmVmKGJhc2UpO1xuICAgIH1cbiAgICAvLyBUT0RPKGFseGh1Yik6IE5lZWQgcmVsYXRpdmUgcGF0aCBsb2dpYyBmcm9tIEJyb3dzZXJEb21BZGFwdGVyIGhlcmU/XG4gICAgcmV0dXJuIGhyZWY7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudDogYW55KToge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgICBjb25zdCBzdHlsZU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgY29uc3Qgc3R5bGVBdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBpZiAoc3R5bGVBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IHN0eWxlTGlzdCA9IHN0eWxlQXR0cmlidXRlLnNwbGl0KC87Ky9nKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVMaXN0W2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKHN0eWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjb2xvbkluZGV4ID0gc3R5bGUuaW5kZXhPZignOicpO1xuICAgICAgICAgIGlmIChjb2xvbkluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENTUyBzdHlsZTogJHtzdHlsZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHN0eWxlLnN1YnN0cigwLCBjb2xvbkluZGV4KS50cmltKCk7XG4gICAgICAgICAgc3R5bGVNYXBbbmFtZV0gPSBzdHlsZS5zdWJzdHIoY29sb25JbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVNYXA7XG4gIH1cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBsZXQgc3R5bGVBdHRyVmFsdWUgPSAnJztcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZU1hcCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBzdHlsZU1hcFtrZXldO1xuICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIHN0eWxlQXR0clZhbHVlICs9IGtleSArICc6JyArIHN0eWxlTWFwW2tleV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlQXR0clZhbHVlKTtcbiAgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nfG51bGwpIHtcbiAgICBzdHlsZU5hbWUgPSBzdHlsZU5hbWUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdHlsZU1hcCA9IHRoaXMuX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgICBzdHlsZU1hcFtzdHlsZU5hbWVdID0gc3R5bGVWYWx1ZSB8fCAnJztcbiAgICB0aGlzLl93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlTWFwKTtcbiAgfVxuICByZW1vdmVTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKSB7XG4gICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzc5MTZcbiAgICB0aGlzLnNldFN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZSwgJycpO1xuICB9XG4gIGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHJldHVybiBzdHlsZU1hcFtzdHlsZU5hbWVdIHx8ICcnO1xuICB9XG4gIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKTtcbiAgICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnQgdG8gdGhlIHdpbmRvdyBhbHNvLlxuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gICAgY29uc3Qgd2luID0gKGRvYyBhcyBhbnkpLmRlZmF1bHRWaWV3O1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRIaXN0b3J5Jyk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldExvY2F0aW9uJyk7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuXG4gIHN1cHBvcnRzV2ViQW5pbWF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHsgcmV0dXJuIERhdGUubm93KCk7IH1cbiAgZ2V0QW5pbWF0aW9uUHJlZml4KCk6IHN0cmluZyB7IHJldHVybiAnJzsgfVxuICBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7IHJldHVybiAndHJhbnNpdGlvbmVuZCc7IH1cbiAgc3VwcG9ydHNBbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXREaXN0cmlidXRlZE5vZGVzJyk7IH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRDb29raWUnKTsgfVxuICBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnc2V0Q29va2llJyk7IH1cbn1cbiJdfQ==