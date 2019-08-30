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
            return this.getAttribute(el, 'href');
        }
        else if (name === 'innerText') {
            // Domino does not support innerText. Just map it to textContent.
            return el.textContent;
        }
        return ((/** @type {?} */ (el)))[name];
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
        ((/** @type {?} */ (el)))[name] = value;
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
        const base = this.querySelector((/** @type {?} */ (doc.documentElement)), 'base');
        /** @type {?} */
        let href = '';
        if (base) {
            href = (/** @type {?} */ (base.getAttribute('href')));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztNQU9NLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBRWhDLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUV4RSxTQUFTLGVBQWUsQ0FBQyxVQUFrQjtJQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLG1EQUFtRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7Ozs7QUFFRCxTQUFTLFdBQVc7SUFDbEIsOERBQThEO0lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkQsQ0FBQzs7Ozs7OztBQUtELE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBWSxFQUFFLEdBQUcsR0FBRyxHQUFHOztRQUMvQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDOztRQUN2QyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVE7SUFDekIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFLRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBYTtJQUM3QyxPQUFPLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNsQyxDQUFDOzs7O0FBS0QsTUFBTSxPQUFPLGFB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QUFHLEdBQUcsQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLFdBQVc7UUFDcEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7OztJQUVELFVBQVUsS0FBYyxNQUFNLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDOUQsV0FBVyxLQUFlLE1BQU0sZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUNqRSxZQUFZLEtBQWEsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFcEQsY0FBYyxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7OztJQUUvQyxlQUFlLEtBQWMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1QyxTQUFTLENBQUMsSUFBWSxJQUFZLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN4RTs7Ozs7O0lBaEpDLHlCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IGRvbWlubyA9IHJlcXVpcmUoJ2RvbWlubycpO1xuXG5pbXBvcnQge8m1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHvJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5mdW5jdGlvbiBfbm90SW1wbGVtZW50ZWQobWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBEb21pbm9BZGFwdGVyOiAnICsgbWV0aG9kTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHNldERvbVR5cGVzKCkge1xuICAvLyBNYWtlIGFsbCBEb21pbm8gdHlwZXMgYXZhaWxhYmxlIGFzIHR5cGVzIGluIHRoZSBnbG9iYWwgZW52LlxuICBPYmplY3QuYXNzaWduKGdsb2JhbCwgZG9taW5vLmltcGwpO1xuICAoZ2xvYmFsIGFzIGFueSlbJ0tleWJvYXJkRXZlbnQnXSA9IGRvbWluby5pbXBsLkV2ZW50O1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIGRvY3VtZW50IHN0cmluZyB0byBhIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoaHRtbDogc3RyaW5nLCB1cmwgPSAnLycpIHtcbiAgbGV0IHdpbmRvdyA9IGRvbWluby5jcmVhdGVXaW5kb3coaHRtbCwgdXJsKTtcbiAgbGV0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgcmV0dXJuIGRvYztcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIGEgZG9jdW1lbnQgdG8gc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRG9jdW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gIHJldHVybiAoZG9jIGFzIGFueSkuc2VyaWFsaXplKCk7XG59XG5cbi8qKlxuICogRE9NIEFkYXB0ZXIgZm9yIHRoZSBzZXJ2ZXIgcGxhdGZvcm0gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2ZnbmFzcy9kb21pbm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBEb21pbm9BZGFwdGVyIGV4dGVuZHMgQnJvd3NlckRvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7XG4gICAgc2V0RG9tVHlwZXMoKTtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgRG9taW5vQWRhcHRlcigpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGRlZmF1bHREb2M6IERvY3VtZW50O1xuXG4gIGxvZyhlcnJvcjogc3RyaW5nKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogc3RyaW5nKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7fVxuXG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICByZXR1cm4gcGFyc2VEb2N1bWVudCgnPGh0bWw+PGhlYWQ+PHRpdGxlPmZha2VUaXRsZTwvdGl0bGU+PC9oZWFkPjxib2R5PjwvYm9keT48L2h0bWw+Jyk7XG4gIH1cblxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIGlmICghRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jKSB7XG4gICAgICBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MgPSBkb21pbm8uY3JlYXRlRG9jdW1lbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYztcbiAgfVxuXG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUgPyBub2RlLm5vZGVUeXBlID09PSBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MuRUxFTUVOVF9OT0RFIDogZmFsc2U7XG4gIH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5zaGFkb3dSb290ID09IG5vZGU7IH1cblxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAobmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAvLyBEb21pbm8gdHJpZXMgdG8gcmVzb2x2ZSBocmVmLXMgd2hpY2ggd2UgZG8gbm90IHdhbnQuIEp1c3QgcmV0dXJuIHRoZVxuICAgICAgLy8gYXR0cmlidXRlIHZhbHVlLlxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGVsLCAnaHJlZicpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICByZXR1cm4gZWwudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiAoPGFueT5lbClbbmFtZV07XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKG5hbWUgPT09ICdocmVmJykge1xuICAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIHNlcnZlciByZW5kZXJlciByZWZsZWN0cyBhbnkgcHJvcGVydGllcyB0byBhdHRyaWJ1dGVzXG4gICAgICAvLyBtYXAgJ2hyZWYnIHRvIGF0dHJpYnV0ZSBqdXN0IHRvIGhhbmRsZSB3aGVuIHNldFByb3BlcnR5IGlzIGRpcmVjdGx5IGNhbGxlZC5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsLCAnaHJlZicsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdpbm5lclRleHQnKSB7XG4gICAgICAvLyBEb21pbm8gZG9lcyBub3Qgc3VwcG9ydCBpbm5lclRleHQuIEp1c3QgbWFwIGl0IHRvIHRleHRDb250ZW50LlxuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgKDxhbnk+ZWwpW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0fG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09ICd3aW5kb3cnKSB7XG4gICAgICByZXR1cm4gZG9jLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBkb2MuYm9keTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBiYXNlID0gdGhpcy5xdWVyeVNlbGVjdG9yKGRvYy5kb2N1bWVudEVsZW1lbnQgISwgJ2Jhc2UnKTtcbiAgICBsZXQgaHJlZiA9ICcnO1xuICAgIGlmIChiYXNlKSB7XG4gICAgICBocmVmID0gYmFzZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSAhO1xuICAgIH1cbiAgICAvLyBUT0RPKGFseGh1Yik6IE5lZWQgcmVsYXRpdmUgcGF0aCBsb2dpYyBmcm9tIEJyb3dzZXJEb21BZGFwdGVyIGhlcmU/XG4gICAgcmV0dXJuIGhyZWY7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudDogYW55KToge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgICBjb25zdCBzdHlsZU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgY29uc3Qgc3R5bGVBdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBpZiAoc3R5bGVBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IHN0eWxlTGlzdCA9IHN0eWxlQXR0cmlidXRlLnNwbGl0KC87Ky9nKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVMaXN0W2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKHN0eWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjb2xvbkluZGV4ID0gc3R5bGUuaW5kZXhPZignOicpO1xuICAgICAgICAgIGlmIChjb2xvbkluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENTUyBzdHlsZTogJHtzdHlsZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHN0eWxlLnN1YnN0cigwLCBjb2xvbkluZGV4KS50cmltKCk7XG4gICAgICAgICAgc3R5bGVNYXBbbmFtZV0gPSBzdHlsZS5zdWJzdHIoY29sb25JbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVNYXA7XG4gIH1cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBsZXQgc3R5bGVBdHRyVmFsdWUgPSAnJztcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZU1hcCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBzdHlsZU1hcFtrZXldO1xuICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIHN0eWxlQXR0clZhbHVlICs9IGtleSArICc6JyArIHN0eWxlTWFwW2tleV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlQXR0clZhbHVlKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmd8bnVsbCkge1xuICAgIHN0eWxlTmFtZSA9IHN0eWxlTmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHN0eWxlTWFwW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlIHx8ICcnO1xuICAgIHRoaXMuX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgIHRoaXMuc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCAnJyk7XG4gIH1cblxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdHlsZU1hcCA9IHRoaXMuX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVNYXBbc3R5bGVOYW1lXSB8fCAnJztcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZWw6IE5vZGUsIGV2dDogYW55KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldnQpO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGV2ZW50IHRvIHRoZSB3aW5kb3cgYWxzby5cbiAgICBjb25zdCBkb2MgPSBlbC5vd25lckRvY3VtZW50IHx8IGVsO1xuICAgIGNvbnN0IHdpbiA9IChkb2MgYXMgYW55KS5kZWZhdWx0VmlldztcbiAgICBpZiAod2luKSB7XG4gICAgICB3aW4uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0SGlzdG9yeScpOyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRMb2NhdGlvbicpOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7IH1cblxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZS5ub3coKTsgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldENvb2tpZScpOyB9XG59XG4iXX0=