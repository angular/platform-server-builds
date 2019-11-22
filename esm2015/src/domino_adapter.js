/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/domino_adapter.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7TUFPTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUVoQyxPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFeEUsU0FBUyxlQUFlLENBQUMsVUFBa0I7SUFDekMsT0FBTyxJQUFJLEtBQUssQ0FBQyxtREFBbUQsR0FBRyxVQUFVLENBQUMsQ0FBQztBQUNyRixDQUFDOzs7O0FBRUQsU0FBUyxXQUFXO0lBQ2xCLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZELENBQUM7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxHQUFHLEdBQUcsR0FBRzs7UUFDL0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQzs7UUFDdkMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRO0lBQ3pCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQWE7SUFDN0MsT0FBTyxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbEMsQ0FBQzs7OztBQUtELE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCOzs7O0lBQ2xELE1BQU0sQ0FBQyxXQUFXO1FBQ2hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsaUJBQWlCLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBSUQsR0FBRyxDQUFDLEtBQWE7UUFDZixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFakQsV0FBVyxLQUFJLENBQUM7Ozs7SUFFaEIsaUJBQWlCLEtBQWMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTlDLGtCQUFrQjtRQUNoQixPQUFPLGFBQWEsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsYUFBYSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEQ7UUFDRCxPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hGLENBQUM7Ozs7O0lBQ0QsWUFBWSxDQUFDLElBQVMsSUFBYSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRXBFLFdBQVcsQ0FBQyxFQUFXLEVBQUUsSUFBWTtRQUNuQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDbkIsdUVBQXVFO1lBQ3ZFLG1CQUFtQjtZQUNuQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEM7YUFBTSxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsaUVBQWlFO1lBQ2pFLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN2QjtRQUNELE9BQU8sQ0FBQyxtQkFBSyxFQUFFLEVBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQUVELG9CQUFvQixDQUFDLEdBQWEsRUFBRSxNQUFjO1FBQ2hELElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN2QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDeEI7UUFDRCxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDekIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEdBQWE7O2NBQ2pCLElBQUksR0FBRyxtQkFBQSxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQzs7WUFDcEQsSUFBSSxHQUFHLEVBQUU7UUFDYixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksR0FBRyxtQkFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDcEM7UUFDRCxzRUFBc0U7UUFDdEUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsRUFBUSxFQUFFLEdBQVE7UUFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O2NBR2hCLEdBQUcsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLEVBQUU7O2NBQzVCLEdBQUcsR0FBRyxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsV0FBVztRQUNwQyxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVSxLQUFjLE1BQU0sZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUM5RCxXQUFXLEtBQWUsTUFBTSxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2pFLFlBQVksS0FBYSxPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUVwRCxjQUFjLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7O0lBRS9DLGVBQWUsS0FBYyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzVDLFNBQVMsQ0FBQyxJQUFZLElBQVksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hFOzs7Ozs7SUFuRkMseUJBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuY29uc3QgZG9taW5vID0gcmVxdWlyZSgnZG9taW5vJyk7XG5cbmltcG9ydCB7ybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge8m1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmZ1bmN0aW9uIF9ub3RJbXBsZW1lbnRlZChtZXRob2ROYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkIGluIERvbWlub0FkYXB0ZXI6ICcgKyBtZXRob2ROYW1lKTtcbn1cblxuZnVuY3Rpb24gc2V0RG9tVHlwZXMoKSB7XG4gIC8vIE1ha2UgYWxsIERvbWlubyB0eXBlcyBhdmFpbGFibGUgYXMgdHlwZXMgaW4gdGhlIGdsb2JhbCBlbnYuXG4gIE9iamVjdC5hc3NpZ24oZ2xvYmFsLCBkb21pbm8uaW1wbCk7XG4gIChnbG9iYWwgYXMgYW55KVsnS2V5Ym9hcmRFdmVudCddID0gZG9taW5vLmltcGwuRXZlbnQ7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgZG9jdW1lbnQgc3RyaW5nIHRvIGEgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEb2N1bWVudChodG1sOiBzdHJpbmcsIHVybCA9ICcvJykge1xuICBsZXQgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdyhodG1sLCB1cmwpO1xuICBsZXQgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgYSBkb2N1bWVudCB0byBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVEb2N1bWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIChkb2MgYXMgYW55KS5zZXJpYWxpemUoKTtcbn1cblxuLyoqXG4gKiBET00gQWRhcHRlciBmb3IgdGhlIHNlcnZlciBwbGF0Zm9ybSBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmduYXNzL2RvbWluby5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbWlub0FkYXB0ZXIgZXh0ZW5kcyBCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXREb21UeXBlcygpO1xuICAgIHNldFJvb3REb21BZGFwdGVyKG5ldyBEb21pbm9BZGFwdGVyKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdERvYzogRG9jdW1lbnQ7XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICBsb2dHcm91cEVuZCgpIHt9XG5cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBwYXJzZURvY3VtZW50KCc8aHRtbD48aGVhZD48dGl0bGU+ZmFrZVRpdGxlPC90aXRsZT48L2hlYWQ+PGJvZHk+PC9ib2R5PjwvaHRtbD4nKTtcbiAgfVxuXG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgaWYgKCFEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MpIHtcbiAgICAgIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYyA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jO1xuICB9XG5cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5FTEVNRU5UX05PREUgOiBmYWxzZTtcbiAgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlLnNoYWRvd1Jvb3QgPT0gbm9kZTsgfVxuXG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lID09PSAnaHJlZicpIHtcbiAgICAgIC8vIERvbWlubyB0cmllcyB0byByZXNvbHZlIGhyZWYtcyB3aGljaCB3ZSBkbyBub3Qgd2FudC4gSnVzdCByZXR1cm4gdGhlXG4gICAgICAvLyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnaW5uZXJUZXh0Jykge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgaW5uZXJUZXh0LiBKdXN0IG1hcCBpdCB0byB0ZXh0Q29udGVudC5cbiAgICAgIHJldHVybiBlbC50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PmVsKVtuYW1lXTtcbiAgfVxuXG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiBkb2MuZGVmYXVsdFZpZXc7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2UgPSBkb2MuZG9jdW1lbnRFbGVtZW50ICEucXVlcnlTZWxlY3RvcignYmFzZScpO1xuICAgIGxldCBocmVmID0gJyc7XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIGhyZWYgPSBiYXNlLmdldEF0dHJpYnV0ZSgnaHJlZicpICE7XG4gICAgfVxuICAgIC8vIFRPRE8oYWx4aHViKTogTmVlZCByZWxhdGl2ZSBwYXRoIGxvZ2ljIGZyb20gQnJvd3NlckRvbUFkYXB0ZXIgaGVyZT9cbiAgICByZXR1cm4gaHJlZjtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZWw6IE5vZGUsIGV2dDogYW55KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldnQpO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGV2ZW50IHRvIHRoZSB3aW5kb3cgYWxzby5cbiAgICBjb25zdCBkb2MgPSBlbC5vd25lckRvY3VtZW50IHx8IGVsO1xuICAgIGNvbnN0IHdpbiA9IChkb2MgYXMgYW55KS5kZWZhdWx0VmlldztcbiAgICBpZiAod2luKSB7XG4gICAgICB3aW4uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0SGlzdG9yeScpOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRMb2NhdGlvbicpOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cblxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZS5ub3coKTsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldENvb2tpZScpOyB9XG59XG4iXX0=