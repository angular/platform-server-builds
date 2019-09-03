/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @type {?}
 */
const domino = require('domino');
import { ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import { ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
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
    ((/** @type {?} */ (global)))['KeyboardEvent'] = domino.impl.Event;
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
    return ((/** @type {?} */ (doc))).serialize();
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
    isShadowRoot(node) { return node.shadowRoot == node; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
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
        return ((/** @type {?} */ (el)))[name];
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
        const base = (/** @type {?} */ (doc.documentElement)).querySelector('base');
        /** @type {?} */
        let href = '';
        if (base) {
            href = (/** @type {?} */ (base.getAttribute('href')));
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        /** @type {?} */
        const doc = el.ownerDocument || el;
        /** @type {?} */
        const win = ((/** @type {?} */ (doc))).defaultView;
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
    performanceNow() { return Date.now(); }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw _notImplemented('getCookie'); }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DominoAdapter.defaultDoc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztNQU9NLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBRWhDLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUV4RSxTQUFTLGVBQWUsQ0FBQyxVQUFrQjtJQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLG1EQUFtRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7Ozs7QUFFRCxTQUFTLFdBQVc7SUFDbEIsOERBQThEO0lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkQsQ0FBQzs7Ozs7OztBQUtELE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBWSxFQUFFLEdBQUcsR0FBRyxHQUFHOztRQUMvQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDOztRQUN2QyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVE7SUFDekIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFLRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBYTtJQUM3QyxPQUFPLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNsQyxDQUFDOzs7O0FBS0QsTUFBTSxPQUFPLGFB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QjtJQUNILENBQUM7Ozs7SUFFRCxVQUFVLEtBQWMsTUFBTSxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQzlELFdBQVcsS0FBZSxNQUFNLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDakUsWUFBWSxLQUFhLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXBELGNBQWMsS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFL0MsZUFBZSxLQUFjLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDNUMsU0FBUyxDQUFDLElBQVksSUFBWSxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEU7Ozs7OztJQW5GQyx5QkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5jb25zdCBkb21pbm8gPSByZXF1aXJlKCdkb21pbm8nKTtcblxuaW1wb3J0IHvJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7ybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZnVuY3Rpb24gX25vdEltcGxlbWVudGVkKG1ldGhvZE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQgaW4gRG9taW5vQWRhcHRlcjogJyArIG1ldGhvZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzZXREb21UeXBlcygpIHtcbiAgLy8gTWFrZSBhbGwgRG9taW5vIHR5cGVzIGF2YWlsYWJsZSBhcyB0eXBlcyBpbiB0aGUgZ2xvYmFsIGVudi5cbiAgT2JqZWN0LmFzc2lnbihnbG9iYWwsIGRvbWluby5pbXBsKTtcbiAgKGdsb2JhbCBhcyBhbnkpWydLZXlib2FyZEV2ZW50J10gPSBkb21pbm8uaW1wbC5FdmVudDtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBkb2N1bWVudCBzdHJpbmcgdG8gYSBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURvY3VtZW50KGh0bWw6IHN0cmluZywgdXJsID0gJy8nKSB7XG4gIGxldCB3aW5kb3cgPSBkb21pbm8uY3JlYXRlV2luZG93KGh0bWwsIHVybCk7XG4gIGxldCBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIHJldHVybiBkb2M7XG59XG5cbi8qKlxuICogU2VyaWFsaXplcyBhIGRvY3VtZW50IHRvIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZURvY3VtZW50KGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICByZXR1cm4gKGRvYyBhcyBhbnkpLnNlcmlhbGl6ZSgpO1xufVxuXG4vKipcbiAqIERPTSBBZGFwdGVyIGZvciB0aGUgc2VydmVyIHBsYXRmb3JtIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9mZ25hc3MvZG9taW5vLlxuICovXG5leHBvcnQgY2xhc3MgRG9taW5vQWRhcHRlciBleHRlbmRzIEJyb3dzZXJEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkge1xuICAgIHNldERvbVR5cGVzKCk7XG4gICAgc2V0Um9vdERvbUFkYXB0ZXIobmV3IERvbWlub0FkYXB0ZXIoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0RG9jOiBEb2N1bWVudDtcblxuICBsb2coZXJyb3I6IHN0cmluZykge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IHN0cmluZykgeyBjb25zb2xlLmVycm9yKGVycm9yKTsgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge31cblxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQoJzxodG1sPjxoZWFkPjx0aXRsZT5mYWtlVGl0bGU8L3RpdGxlPjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICBpZiAoIURvbWlub0FkYXB0ZXIuZGVmYXVsdERvYykge1xuICAgICAgRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2M7XG4gIH1cblxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlID8gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkVMRU1FTlRfTk9ERSA6IGZhbHNlO1xuICB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUuc2hhZG93Um9vdCA9PSBub2RlOyB9XG5cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWUgPT09ICdocmVmJykge1xuICAgICAgLy8gRG9taW5vIHRyaWVzIHRvIHJlc29sdmUgaHJlZi1zIHdoaWNoIHdlIGRvIG5vdCB3YW50LiBKdXN0IHJldHVybiB0aGVcbiAgICAgIC8vIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdpbm5lclRleHQnKSB7XG4gICAgICAvLyBEb21pbm8gZG9lcyBub3Qgc3VwcG9ydCBpbm5lclRleHQuIEp1c3QgbWFwIGl0IHRvIHRleHRDb250ZW50LlxuICAgICAgcmV0dXJuIGVsLnRleHRDb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+ZWwpW25hbWVdO1xuICB9XG5cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIGRvYy5kZWZhdWx0VmlldztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgYmFzZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQgIS5xdWVyeVNlbGVjdG9yKCdiYXNlJyk7XG4gICAgbGV0IGhyZWYgPSAnJztcbiAgICBpZiAoYmFzZSkge1xuICAgICAgaHJlZiA9IGJhc2UuZ2V0QXR0cmlidXRlKCdocmVmJykgITtcbiAgICB9XG4gICAgLy8gVE9ETyhhbHhodWIpOiBOZWVkIHJlbGF0aXZlIHBhdGggbG9naWMgZnJvbSBCcm93c2VyRG9tQWRhcHRlciBoZXJlP1xuICAgIHJldHVybiBocmVmO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnQgdG8gdGhlIHdpbmRvdyBhbHNvLlxuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gICAgY29uc3Qgd2luID0gKGRvYyBhcyBhbnkpLmRlZmF1bHRWaWV3O1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRIaXN0b3J5Jyk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldExvY2F0aW9uJyk7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuXG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHJldHVybiBEYXRlLm5vdygpOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0Q29va2llJyk7IH1cbn1cbiJdfQ==