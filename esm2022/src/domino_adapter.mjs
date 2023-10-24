/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
import { ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import domino from './bundled-domino';
export function setDomTypes() {
    // Make all Domino types available in the global env.
    // NB: Any changes here should also be done in `packages/platform-server/init/src/shims.ts`.
    Object.assign(globalThis, domino.impl);
    globalThis['KeyboardEvent'] = domino.impl.Event;
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
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return doc.documentElement.querySelector('base')?.getAttribute('href') || '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWxGLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBRXRDLE1BQU0sVUFBVSxXQUFXO0lBQ3pCLHFEQUFxRDtJQUNyRCw0RkFBNEY7SUFDNUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLFVBQWtCLENBQUMsZUFBZSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0QsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDbkQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFhO0lBQzdDLE9BQVEsR0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCO0lBQXBEOztRQU1vQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUEwRDlDLENBQUM7SUEvREMsTUFBTSxDQUFVLFdBQVc7UUFDekIsV0FBVyxFQUFFLENBQUM7UUFDZCxpQkFBaUIsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUtRLGtCQUFrQjtRQUN6QixPQUFPLGFBQWEsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFUSxrQkFBa0I7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsYUFBYSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEQ7UUFDRCxPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVRLGFBQWEsQ0FBQyxJQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDaEYsQ0FBQztJQUNRLFlBQVksQ0FBQyxJQUFTO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVELGlGQUFpRjtJQUN4RSxvQkFBb0IsQ0FBQyxHQUFhLEVBQUUsTUFBYztRQUN6RCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ3pCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVEsV0FBVyxDQUFDLEdBQWE7UUFDaEMsc0VBQXNFO1FBQ3RFLE9BQU8sR0FBRyxDQUFDLGVBQWdCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEYsQ0FBQztJQUVRLGFBQWEsQ0FBQyxFQUFRLEVBQUUsR0FBUTtRQUN2QyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLHlDQUF5QztRQUN6QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBSSxHQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksR0FBRyxFQUFFO1lBQ1AsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFUSxZQUFZO1FBQ25CLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUVRLFNBQVMsQ0FBQyxJQUFZO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHvJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IGRvbWlubyBmcm9tICcuL2J1bmRsZWQtZG9taW5vJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldERvbVR5cGVzKCkge1xuICAvLyBNYWtlIGFsbCBEb21pbm8gdHlwZXMgYXZhaWxhYmxlIGluIHRoZSBnbG9iYWwgZW52LlxuICAvLyBOQjogQW55IGNoYW5nZXMgaGVyZSBzaG91bGQgYWxzbyBiZSBkb25lIGluIGBwYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvaW5pdC9zcmMvc2hpbXMudHNgLlxuICBPYmplY3QuYXNzaWduKGdsb2JhbFRoaXMsIGRvbWluby5pbXBsKTtcbiAgKGdsb2JhbFRoaXMgYXMgYW55KVsnS2V5Ym9hcmRFdmVudCddID0gZG9taW5vLmltcGwuRXZlbnQ7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgZG9jdW1lbnQgc3RyaW5nIHRvIGEgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEb2N1bWVudChodG1sOiBzdHJpbmcsIHVybCA9ICcvJykge1xuICBsZXQgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdyhodG1sLCB1cmwpO1xuICBsZXQgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgYSBkb2N1bWVudCB0byBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVEb2N1bWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIChkb2MgYXMgYW55KS5zZXJpYWxpemUoKTtcbn1cblxuLyoqXG4gKiBET00gQWRhcHRlciBmb3IgdGhlIHNlcnZlciBwbGF0Zm9ybSBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmduYXNzL2RvbWluby5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbWlub0FkYXB0ZXIgZXh0ZW5kcyBCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBvdmVycmlkZSBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXREb21UeXBlcygpO1xuICAgIHNldFJvb3REb21BZGFwdGVyKG5ldyBEb21pbm9BZGFwdGVyKCkpO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVhZG9ubHkgc3VwcG9ydHNET01FdmVudHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdERvYzogRG9jdW1lbnQ7XG5cbiAgb3ZlcnJpZGUgY3JlYXRlSHRtbERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICByZXR1cm4gcGFyc2VEb2N1bWVudCgnPGh0bWw+PGhlYWQ+PHRpdGxlPmZha2VUaXRsZTwvdGl0bGU+PC9oZWFkPjxib2R5PjwvYm9keT48L2h0bWw+Jyk7XG4gIH1cblxuICBvdmVycmlkZSBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIGlmICghRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jKSB7XG4gICAgICBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MgPSBkb21pbm8uY3JlYXRlRG9jdW1lbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYztcbiAgfVxuXG4gIG92ZXJyaWRlIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUgPyBub2RlLm5vZGVUeXBlID09PSBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MuRUxFTUVOVF9OT0RFIDogZmFsc2U7XG4gIH1cbiAgb3ZlcnJpZGUgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlLnNoYWRvd1Jvb3QgPT0gbm9kZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZCBpbiBJdnkgY29kZS4gVG8gYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDE0LiAqL1xuICBvdmVycmlkZSBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0fG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09ICd3aW5kb3cnKSB7XG4gICAgICByZXR1cm4gZG9jLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBkb2MuYm9keTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvdmVycmlkZSBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgICAvLyBUT0RPKGFseGh1Yik6IE5lZWQgcmVsYXRpdmUgcGF0aCBsb2dpYyBmcm9tIEJyb3dzZXJEb21BZGFwdGVyIGhlcmU/XG4gICAgcmV0dXJuIGRvYy5kb2N1bWVudEVsZW1lbnQhLnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKT8uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gIH1cblxuICBvdmVycmlkZSBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBldmVudCB0byB0aGUgd2luZG93IGFsc28uXG4gICAgY29uc3QgZG9jID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgICBjb25zdCB3aW4gPSAoZG9jIGFzIGFueSkuZGVmYXVsdFZpZXc7XG4gICAgaWYgKHdpbikge1xuICAgICAgd2luLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7XG4gIH1cblxuICBvdmVycmlkZSBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldENvb2tpZSBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQnKTtcbiAgfVxufVxuIl19