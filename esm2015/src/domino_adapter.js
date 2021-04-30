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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RSxNQUFNLFVBQVUsV0FBVztJQUN6QixxREFBcUQ7SUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE1BQWMsQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxHQUFHLEdBQUcsR0FBRztJQUNuRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQWE7SUFDN0MsT0FBUSxHQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFBcEQ7O1FBTVcsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBMERyQyxDQUFDO0lBL0RDLE1BQU0sQ0FBQyxXQUFXO1FBQ2hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsaUJBQWlCLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFLRCxrQkFBa0I7UUFDaEIsT0FBTyxhQUFhLENBQUMsaUVBQWlFLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQzdCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsb0JBQW9CLENBQUMsR0FBYSxFQUFFLE1BQWM7UUFDaEQsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN4QjtRQUNELElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN6QixPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFhOztRQUN2QixzRUFBc0U7UUFDdEUsT0FBTyxDQUFBLE1BQUEsR0FBRyxDQUFDLGVBQWdCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUksRUFBRSxDQUFDO0lBQ2hGLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBUSxFQUFFLEdBQVE7UUFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0Qix5Q0FBeUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUksR0FBVyxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IGRvbWlubyA9IHJlcXVpcmUoJ2RvbWlubycpO1xuXG5pbXBvcnQge8m1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHvJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0RG9tVHlwZXMoKSB7XG4gIC8vIE1ha2UgYWxsIERvbWlubyB0eXBlcyBhdmFpbGFibGUgaW4gdGhlIGdsb2JhbCBlbnYuXG4gIE9iamVjdC5hc3NpZ24oZ2xvYmFsLCBkb21pbm8uaW1wbCk7XG4gIChnbG9iYWwgYXMgYW55KVsnS2V5Ym9hcmRFdmVudCddID0gZG9taW5vLmltcGwuRXZlbnQ7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgZG9jdW1lbnQgc3RyaW5nIHRvIGEgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEb2N1bWVudChodG1sOiBzdHJpbmcsIHVybCA9ICcvJykge1xuICBsZXQgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdyhodG1sLCB1cmwpO1xuICBsZXQgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgYSBkb2N1bWVudCB0byBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVEb2N1bWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIChkb2MgYXMgYW55KS5zZXJpYWxpemUoKTtcbn1cblxuLyoqXG4gKiBET00gQWRhcHRlciBmb3IgdGhlIHNlcnZlciBwbGF0Zm9ybSBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmduYXNzL2RvbWluby5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbWlub0FkYXB0ZXIgZXh0ZW5kcyBCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXREb21UeXBlcygpO1xuICAgIHNldFJvb3REb21BZGFwdGVyKG5ldyBEb21pbm9BZGFwdGVyKCkpO1xuICB9XG5cbiAgcmVhZG9ubHkgc3VwcG9ydHNET01FdmVudHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdERvYzogRG9jdW1lbnQ7XG5cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQoJzxodG1sPjxoZWFkPjx0aXRsZT5mYWtlVGl0bGU8L3RpdGxlPjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICBpZiAoIURvbWlub0FkYXB0ZXIuZGVmYXVsdERvYykge1xuICAgICAgRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBEb21pbm9BZGFwdGVyLmRlZmF1bHREb2M7XG4gIH1cblxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlID8gbm9kZS5ub2RlVHlwZSA9PT0gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jLkVMRU1FTlRfTk9ERSA6IGZhbHNlO1xuICB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZS5zaGFkb3dSb290ID09IG5vZGU7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIGJlaW5nIHVzZWQgaW4gSXZ5IGNvZGUuIFRvIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxNC4gKi9cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIGRvYy5kZWZhdWx0VmlldztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgLy8gVE9ETyhhbHhodWIpOiBOZWVkIHJlbGF0aXZlIHBhdGggbG9naWMgZnJvbSBCcm93c2VyRG9tQWRhcHRlciBoZXJlP1xuICAgIHJldHVybiBkb2MuZG9jdW1lbnRFbGVtZW50IS5xdWVyeVNlbGVjdG9yKCdiYXNlJyk/LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnQgdG8gdGhlIHdpbmRvdyBhbHNvLlxuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gICAgY29uc3Qgd2luID0gKGRvYyBhcyBhbnkpLmRlZmF1bHRWaWV3O1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnO1xuICB9XG5cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRDb29raWUgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkJyk7XG4gIH1cbn1cbiJdfQ==