/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const domino = require('domino');
import { ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import { ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
export function setDomTypes() {
    // Make all Domino types available in the global env.
    Object.assign(global, domino.impl);
    global['KeyboardEvent'] = domino.impl.Event;
}
/**
 * Parses a document string to a Document object.
 */
export function parseDocument(html, url = '/') {
    let window = domino.createWindow(html, url);
    let doc = window.document;
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
export class DominoAdapter extends BrowserDomAdapter {
    constructor() {
        super(...arguments);
        this.supportsDOMEvents = false;
    }
    static makeCurrent() {
        setDomTypes();
        setRootDomAdapter(new DominoAdapter());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RSxNQUFNLFVBQVUsV0FBVztJQUN6QixxREFBcUQ7SUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE1BQWMsQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxHQUFHLEdBQUcsR0FBRztJQUNuRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQWE7SUFDN0MsT0FBUSxHQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFBcEQ7O1FBTVcsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBeURyQyxDQUFDO0lBOURDLE1BQU0sQ0FBQyxXQUFXO1FBQ2hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsaUJBQWlCLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFLRCxrQkFBa0I7UUFDaEIsT0FBTyxhQUFhLENBQUMsaUVBQWlFLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQzdCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxHQUFhLEVBQUUsTUFBYztRQUNoRCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ3pCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQWE7O1FBQ3ZCLHNFQUFzRTtRQUN0RSxPQUFPLE9BQUEsR0FBRyxDQUFDLGVBQWdCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsTUFBTSxNQUFLLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBRUQsYUFBYSxDQUFDLEVBQVEsRUFBRSxHQUFRO1FBQzlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIseUNBQXlDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ25DLE1BQU0sR0FBRyxHQUFJLEdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5jb25zdCBkb21pbm8gPSByZXF1aXJlKCdkb21pbm8nKTtcblxuaW1wb3J0IHvJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7ybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldERvbVR5cGVzKCkge1xuICAvLyBNYWtlIGFsbCBEb21pbm8gdHlwZXMgYXZhaWxhYmxlIGluIHRoZSBnbG9iYWwgZW52LlxuICBPYmplY3QuYXNzaWduKGdsb2JhbCwgZG9taW5vLmltcGwpO1xuICAoZ2xvYmFsIGFzIGFueSlbJ0tleWJvYXJkRXZlbnQnXSA9IGRvbWluby5pbXBsLkV2ZW50O1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIGRvY3VtZW50IHN0cmluZyB0byBhIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoaHRtbDogc3RyaW5nLCB1cmwgPSAnLycpIHtcbiAgbGV0IHdpbmRvdyA9IGRvbWluby5jcmVhdGVXaW5kb3coaHRtbCwgdXJsKTtcbiAgbGV0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgcmV0dXJuIGRvYztcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIGEgZG9jdW1lbnQgdG8gc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRG9jdW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gIHJldHVybiAoZG9jIGFzIGFueSkuc2VyaWFsaXplKCk7XG59XG5cbi8qKlxuICogRE9NIEFkYXB0ZXIgZm9yIHRoZSBzZXJ2ZXIgcGxhdGZvcm0gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2ZnbmFzcy9kb21pbm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBEb21pbm9BZGFwdGVyIGV4dGVuZHMgQnJvd3NlckRvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7XG4gICAgc2V0RG9tVHlwZXMoKTtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgRG9taW5vQWRhcHRlcigpKTtcbiAgfVxuXG4gIHJlYWRvbmx5IHN1cHBvcnRzRE9NRXZlbnRzID0gZmFsc2U7XG4gIHByaXZhdGUgc3RhdGljIGRlZmF1bHREb2M6IERvY3VtZW50O1xuXG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBwYXJzZURvY3VtZW50KCc8aHRtbD48aGVhZD48dGl0bGU+ZmFrZVRpdGxlPC90aXRsZT48L2hlYWQ+PGJvZHk+PC9ib2R5PjwvaHRtbD4nKTtcbiAgfVxuXG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgaWYgKCFEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MpIHtcbiAgICAgIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYyA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jO1xuICB9XG5cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5FTEVNRU5UX05PREUgOiBmYWxzZTtcbiAgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUuc2hhZG93Um9vdCA9PSBub2RlO1xuICB9XG5cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIGRvYy5kZWZhdWx0VmlldztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgLy8gVE9ETyhhbHhodWIpOiBOZWVkIHJlbGF0aXZlIHBhdGggbG9naWMgZnJvbSBCcm93c2VyRG9tQWRhcHRlciBoZXJlP1xuICAgIHJldHVybiBkb2MuZG9jdW1lbnRFbGVtZW50IS5xdWVyeVNlbGVjdG9yKCdiYXNlJyk/LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnQgdG8gdGhlIHdpbmRvdyBhbHNvLlxuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gICAgY29uc3Qgd2luID0gKGRvYyBhcyBhbnkpLmRlZmF1bHRWaWV3O1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnO1xuICB9XG5cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRDb29raWUgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkJyk7XG4gIH1cbn1cbiJdfQ==