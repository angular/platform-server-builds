/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
  @type {?} */
const domino = require('domino');
import { ɵBrowserDomAdapter as BrowserDomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/platform-browser';
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}
/**
 * @return {?}
 */
function setDomTypes() {
    // Make all Domino types available as types in the global env.
    Object.assign(global, domino.impl);
    (/** @type {?} */ (global))['KeyboardEvent'] = domino.impl.Event;
}
/**
 * Parses a document string to a Document object.
 * @param {?} html
 * @param {?=} url
 * @return {?}
 */
export function parseDocument(html, url = '/') {
    /** @type {?} */
    let window = domino.createWindow(html, url);
    /** @type {?} */
    let doc = window.document;
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
    static makeCurrent() {
        setDomTypes();
        setRootDomAdapter(new DominoAdapter());
    }
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
        /** @type {?} */
        let inner = nodeB;
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
        /** @type {?} */
        const base = this.querySelector(/** @type {?} */ ((doc.documentElement)), 'base');
        /** @type {?} */
        let href = '';
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
        /** @type {?} */
        const styleMap = {};
        /** @type {?} */
        const styleAttribute = element.getAttribute('style');
        if (styleAttribute) {
            /** @type {?} */
            const styleList = styleAttribute.split(/;+/g);
            for (let i = 0; i < styleList.length; i++) {
                /** @type {?} */
                const style = styleList[i].trim();
                if (style.length > 0) {
                    /** @type {?} */
                    const colonIndex = style.indexOf(':');
                    if (colonIndex === -1) {
                        throw new Error(`Invalid CSS style: ${style}`);
                    }
                    /** @type {?} */
                    const name = style.substr(0, colonIndex).trim();
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
        /** @type {?} */
        let styleAttrValue = '';
        for (const key in styleMap) {
            /** @type {?} */
            const newValue = styleMap[key];
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
        /** @type {?} */
        const styleMap = this._readStyleAttribute(element);
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
        /** @type {?} */
        const styleMap = this._readStyleAttribute(element);
        return styleMap[styleName] || '';
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        /** @type {?} */
        const value = this.getStyle(element, styleName);
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        /** @type {?} */
        const doc = el.ownerDocument || el;
        /** @type {?} */
        const win = (/** @type {?} */ (doc)).defaultView;
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
if (false) {
    /** @type {?} */
    DominoAdapter.defaultDoc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7OztBQUUzSCxTQUFTLGVBQWUsQ0FBQyxVQUFrQjtJQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLG1EQUFtRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0NBQ3BGOzs7O0FBRUQsU0FBUyxXQUFXOztJQUVsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsbUJBQUMsTUFBYSxFQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDdEQ7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxHQUFHLEdBQUcsR0FBRzs7SUFDbkQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBQzVDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsT0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7O0FBS0QsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQWE7SUFDN0MsT0FBTyxtQkFBQyxHQUFVLEVBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNqQzs7OztBQUtELE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCOzs7O0lBQ2xELE1BQU0sQ0FBQyxXQUFXO1FBQ2hCLFdBQVcsRUFBRSxD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ckMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFRCxVQUFVLEtBQWMsTUFBTSxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTs7OztJQUM5RCxXQUFXLEtBQWUsTUFBTSxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTs7OztJQUNqRSxZQUFZLEtBQWEsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFOzs7O0lBRXBELG9CQUFvQixLQUFjLE9BQU8sS0FBSyxDQUFDLEVBQUU7Ozs7SUFDakQsY0FBYyxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7SUFDL0Msa0JBQWtCLEtBQWEsT0FBTyxFQUFFLENBQUMsRUFBRTs7OztJQUMzQyxnQkFBZ0IsS0FBYSxPQUFPLGVBQWUsQ0FBQyxFQUFFOzs7O0lBQ3RELGlCQUFpQixLQUFjLE9BQU8sSUFBSSxDQUFDLEVBQUU7Ozs7O0lBRTdDLG1CQUFtQixDQUFDLEVBQU8sSUFBWSxNQUFNLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFdEYsZUFBZSxLQUFjLE9BQU8sS0FBSyxDQUFDLEVBQUU7Ozs7O0lBQzVDLFNBQVMsQ0FBQyxJQUFZLElBQVksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBQ3ZFLFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYSxJQUFJLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7Q0FDL0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5jb25zdCBkb21pbm8gPSByZXF1aXJlKCdkb21pbm8nKTtcblxuaW1wb3J0IHvJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZnVuY3Rpb24gX25vdEltcGxlbWVudGVkKG1ldGhvZE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQgaW4gRG9taW5vQWRhcHRlcjogJyArIG1ldGhvZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzZXREb21UeXBlcygpIHtcbiAgLy8gTWFrZSBhbGwgRG9taW5vIHR5cGVzIGF2YWlsYWJsZSBhcyB0eXBlcyBpbiB0aGUgZ2xvYmFsIGVudi5cbiAgT2JqZWN0LmFzc2lnbihnbG9iYWwsIGRvbWluby5pbXBsKTtcbiAgKGdsb2JhbCBhcyBhbnkpWydLZXlib2FyZEV2ZW50J10gPSBkb21pbm8uaW1wbC5FdmVudDtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBkb2N1bWVudCBzdHJpbmcgdG8gYSBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURvY3VtZW50KGh0bWw6IHN0cmluZywgdXJsID0gJy8nKSB7XG4gIGxldCB3aW5kb3cgPSBkb21pbm8uY3JlYXRlV2luZG93KGh0bWwsIHVybCk7XG4gIGxldCBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIHJldHVybiBkb2M7XG59XG5cbi8qKlxuICogU2VyaWFsaXplcyBhIGRvY3VtZW50IHRvIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZURvY3VtZW50KGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICByZXR1cm4gKGRvYyBhcyBhbnkpLnNlcmlhbGl6ZSgpO1xufVxuXG4vKipcbiAqIERPTSBBZGFwdGVyIGZvciB0aGUgc2VydmVyIHBsYXRmb3JtIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9mZ25hc3MvZG9taW5vLlxuICovXG5leHBvcnQgY2xhc3MgRG9taW5vQWRhcHRlciBleHRlbmRzIEJyb3dzZXJEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkge1xuICAgIHNldERvbVR5cGVzKCk7XG4gICAgc2V0Um9vdERvbUFkYXB0ZXIobmV3IERvbWlub0FkYXB0ZXIoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0RG9jOiBEb2N1bWVudDtcblxuICBsb2dFcnJvcihlcnJvcjogc3RyaW5nKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICBsb2dHcm91cEVuZCgpIHt9XG5cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBzdXBwb3J0c05hdGl2ZVNoYWRvd0RPTSgpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY29udGFpbnMobm9kZUE6IGFueSwgbm9kZUI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGxldCBpbm5lciA9IG5vZGVCO1xuICAgIHdoaWxlIChpbm5lcikge1xuICAgICAgaWYgKGlubmVyID09PSBub2RlQSkgcmV0dXJuIHRydWU7XG4gICAgICBpbm5lciA9IGlubmVyLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQoJzxodG1sPjxoZWFkPjx0aXRsZT5mYWtlVGl0bGU8L3RpdGxlPjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICBpZiAoIURvbWlub0FkYXB0ZXIuZGVmYXVsdERvYykge1xuICAgICAgRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2M7XG4gIH1cblxuICBjcmVhdGVTaGFkb3dSb290KGVsOiBhbnksIGRvYzogRG9jdW1lbnQgPSBkb2N1bWVudCk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgIGVsLnNoYWRvd1Jvb3QgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGVsLnNoYWRvd1Jvb3QucGFyZW50ID0gZWw7XG4gICAgcmV0dXJuIGVsLnNoYWRvd1Jvb3Q7XG4gIH1cbiAgZ2V0U2hhZG93Um9vdChlbDogYW55KTogRG9jdW1lbnRGcmFnbWVudCB7IHJldHVybiBlbC5zaGFkb3dSb290OyB9XG5cbiAgaXNUZXh0Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5URVhUX05PREU7IH1cbiAgaXNDb21tZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkNPTU1FTlRfTk9ERTtcbiAgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlID8gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkVMRU1FTlRfTk9ERSA6IGZhbHNlO1xuICB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlLnNoYWRvd1Jvb3QgIT0gbnVsbDsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmdldFNoYWRvd1Jvb3Qobm9kZSkgPT0gbm9kZTsgfVxuXG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lID09PSAnaHJlZicpIHtcbiAgICAgIC8vIERvbWlubyB0cmllcyB0cCByZXNvbHZlIGhyZWYtcyB3aGljaCB3ZSBkbyBub3Qgd2FudC4gSnVzdCByZXR1cm4gdGhlXG4gICAgICAvLyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoZWwsICdocmVmJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnaW5uZXJUZXh0Jykge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgaW5uZXJUZXh0LiBKdXN0IG1hcCBpdCB0byB0ZXh0Q29udGVudC5cbiAgICAgIHJldHVybiBlbC50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PmVsKVtuYW1lXTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAvLyBFdmVuIHRob3VnaCB0aGUgc2VydmVyIHJlbmRlcmVyIHJlZmxlY3RzIGFueSBwcm9wZXJ0aWVzIHRvIGF0dHJpYnV0ZXNcbiAgICAgIC8vIG1hcCAnaHJlZicgdG8gYXR0cmlidXRlIGp1c3QgdG8gaGFuZGxlIHdoZW4gc2V0UHJvcGVydHkgaXMgZGlyZWN0bHkgY2FsbGVkLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWwsICdocmVmJywgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH1cbiAgICAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiBkb2MuZGVmYXVsdFZpZXc7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2UgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoZG9jLmRvY3VtZW50RWxlbWVudCAhLCAnYmFzZScpO1xuICAgIGxldCBocmVmID0gJyc7XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIGhyZWYgPSB0aGlzLmdldEhyZWYoYmFzZSk7XG4gICAgfVxuICAgIC8vIFRPRE8oYWx4aHViKTogTmVlZCByZWxhdGl2ZSBwYXRoIGxvZ2ljIGZyb20gQnJvd3NlckRvbUFkYXB0ZXIgaGVyZT9cbiAgICByZXR1cm4gaHJlZjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30ge1xuICAgIGNvbnN0IHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBjb25zdCBzdHlsZUF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIGlmIChzdHlsZUF0dHJpYnV0ZSkge1xuICAgICAgY29uc3Qgc3R5bGVMaXN0ID0gc3R5bGVBdHRyaWJ1dGUuc3BsaXQoLzsrL2cpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZUxpc3RbaV0udHJpbSgpO1xuICAgICAgICBpZiAoc3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBzdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgaWYgKGNvbG9uSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgQ1NTIHN0eWxlOiAke3N0eWxlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBuYW1lID0gc3R5bGUuc3Vic3RyKDAsIGNvbG9uSW5kZXgpLnRyaW0oKTtcbiAgICAgICAgICBzdHlsZU1hcFtuYW1lXSA9IHN0eWxlLnN1YnN0cihjb2xvbkluZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZU1hcDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuICAgIGxldCBzdHlsZUF0dHJWYWx1ZSA9ICcnO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlTWFwKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgc3R5bGVBdHRyVmFsdWUgKz0ga2V5ICsgJzonICsgc3R5bGVNYXBba2V5XSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVBdHRyVmFsdWUpO1xuICB9XG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmd8bnVsbCkge1xuICAgIHN0eWxlTmFtZSA9IHN0eWxlTmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHN0eWxlTWFwW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlIHx8ICcnO1xuICAgIHRoaXMuX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgIHRoaXMuc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCAnJyk7XG4gIH1cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3R5bGVNYXAgPSB0aGlzLl9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgcmV0dXJuIHN0eWxlTWFwW3N0eWxlTmFtZV0gfHwgJyc7XG4gIH1cbiAgaGFzU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUpO1xuICAgIHJldHVybiBzdHlsZVZhbHVlID8gdmFsdWUgPT0gc3R5bGVWYWx1ZSA6IHZhbHVlLmxlbmd0aCA+IDA7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBldmVudCB0byB0aGUgd2luZG93IGFsc28uXG4gICAgY29uc3QgZG9jID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgICBjb25zdCB3aW4gPSAoZG9jIGFzIGFueSkuZGVmYXVsdFZpZXc7XG4gICAgaWYgKHdpbikge1xuICAgICAgd2luLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH1cblxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldEhpc3RvcnknKTsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0TG9jYXRpb24nKTsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnOyB9XG5cbiAgc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZS5ub3coKTsgfVxuICBnZXRBbmltYXRpb25QcmVmaXgoKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG4gIGdldFRyYW5zaXRpb25FbmQoKTogc3RyaW5nIHsgcmV0dXJuICd0cmFuc2l0aW9uZW5kJzsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBnZXREaXN0cmlidXRlZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldERpc3RyaWJ1dGVkTm9kZXMnKTsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldENvb2tpZScpOyB9XG4gIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdzZXRDb29raWUnKTsgfVxufVxuIl19