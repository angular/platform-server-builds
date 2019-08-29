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
var DominoAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(DominoAdapter, _super);
    function DominoAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DominoAdapter.makeCurrent = function () {
        setDomTypes();
        setRootDomAdapter(new DominoAdapter());
    };
    DominoAdapter.prototype.log = function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    DominoAdapter.prototype.logGroup = function (error) { console.error(error); };
    DominoAdapter.prototype.logGroupEnd = function () { };
    DominoAdapter.prototype.supportsDOMEvents = function () { return false; };
    DominoAdapter.prototype.createHtmlDocument = function () {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    };
    DominoAdapter.prototype.getDefaultDocument = function () {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = domino.createDocument();
        }
        return DominoAdapter.defaultDoc;
    };
    DominoAdapter.prototype.isElementNode = function (node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    };
    DominoAdapter.prototype.isShadowRoot = function (node) { return node.shadowRoot == node; };
    DominoAdapter.prototype.getProperty = function (el, name) {
        if (name === 'href') {
            // Domino tries to resolve href-s which we do not want. Just return the
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
            href = base.getAttribute('href');
        }
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return href;
    };
    /** @internal */
    DominoAdapter.prototype._readStyleAttribute = function (element) {
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
    DominoAdapter.prototype._writeStyleAttribute = function (element, styleMap) {
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
    DominoAdapter.prototype.performanceNow = function () { return Date.now(); };
    DominoAdapter.prototype.supportsCookies = function () { return false; };
    DominoAdapter.prototype.getCookie = function (name) { throw _notImplemented('getCookie'); };
    return DominoAdapter;
}(BrowserDomAdapter));
export { DominoAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taW5vX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2RvbWlub19hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsT0FBTyxFQUFDLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFM0gsU0FBUyxlQUFlLENBQUMsVUFBa0I7SUFDekMsT0FBTyxJQUFJLEtBQUssQ0FBQyxtREFBbUQsR0FBRyxVQUFVLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQsU0FBUyxXQUFXO0lBQ2xCLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsTUFBYyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZELENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBWSxFQUFFLEdBQVM7SUFBVCxvQkFBQSxFQUFBLFNBQVM7SUFDbkQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFhO0lBQzdDLE9BQVEsR0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFFRDs7R0FFRztBQUNIO0lBQW1DLHlDQUFpQjtJQUFwRDs7SUFz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LENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLHlDQUF5QztRQUN6QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxJQUFNLEdBQUcsR0FBSSxHQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksR0FBRyxFQUFFO1lBQ1AsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxrQ0FBVSxHQUFWLGNBQXdCLE1BQU0sZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxtQ0FBVyxHQUFYLGNBQTBCLE1BQU0sZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxvQ0FBWSxHQUFaLGNBQXlCLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRXBELHNDQUFjLEdBQWQsY0FBMkIsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9DLHVDQUFlLEdBQWYsY0FBNkIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLGlDQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLG9CQUFDO0FBQUQsQ0FBQyxBQXRKRCxDQUFtQyxpQkFBaUIsR0FzSm5EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuY29uc3QgZG9taW5vID0gcmVxdWlyZSgnZG9taW5vJyk7XG5cbmltcG9ydCB7ybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlciwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmZ1bmN0aW9uIF9ub3RJbXBsZW1lbnRlZChtZXRob2ROYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkIGluIERvbWlub0FkYXB0ZXI6ICcgKyBtZXRob2ROYW1lKTtcbn1cblxuZnVuY3Rpb24gc2V0RG9tVHlwZXMoKSB7XG4gIC8vIE1ha2UgYWxsIERvbWlubyB0eXBlcyBhdmFpbGFibGUgYXMgdHlwZXMgaW4gdGhlIGdsb2JhbCBlbnYuXG4gIE9iamVjdC5hc3NpZ24oZ2xvYmFsLCBkb21pbm8uaW1wbCk7XG4gIChnbG9iYWwgYXMgYW55KVsnS2V5Ym9hcmRFdmVudCddID0gZG9taW5vLmltcGwuRXZlbnQ7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgZG9jdW1lbnQgc3RyaW5nIHRvIGEgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEb2N1bWVudChodG1sOiBzdHJpbmcsIHVybCA9ICcvJykge1xuICBsZXQgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdyhodG1sLCB1cmwpO1xuICBsZXQgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgYSBkb2N1bWVudCB0byBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVEb2N1bWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIChkb2MgYXMgYW55KS5zZXJpYWxpemUoKTtcbn1cblxuLyoqXG4gKiBET00gQWRhcHRlciBmb3IgdGhlIHNlcnZlciBwbGF0Zm9ybSBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmduYXNzL2RvbWluby5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbWlub0FkYXB0ZXIgZXh0ZW5kcyBCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXREb21UeXBlcygpO1xuICAgIHNldFJvb3REb21BZGFwdGVyKG5ldyBEb21pbm9BZGFwdGVyKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdERvYzogRG9jdW1lbnQ7XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH1cblxuICBsb2dHcm91cEVuZCgpIHt9XG5cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBwYXJzZURvY3VtZW50KCc8aHRtbD48aGVhZD48dGl0bGU+ZmFrZVRpdGxlPC90aXRsZT48L2hlYWQ+PGJvZHk+PC9ib2R5PjwvaHRtbD4nKTtcbiAgfVxuXG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgaWYgKCFEb21pbm9BZGFwdGVyLmRlZmF1bHREb2MpIHtcbiAgICAgIERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYyA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gRG9taW5vQWRhcHRlci5kZWZhdWx0RG9jO1xuICB9XG5cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUubm9kZVR5cGUgPT09IERvbWlub0FkYXB0ZXIuZGVmYXVsdERvYy5FTEVNRU5UX05PREUgOiBmYWxzZTtcbiAgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlLnNoYWRvd1Jvb3QgPT0gbm9kZTsgfVxuXG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lID09PSAnaHJlZicpIHtcbiAgICAgIC8vIERvbWlubyB0cmllcyB0byByZXNvbHZlIGhyZWYtcyB3aGljaCB3ZSBkbyBub3Qgd2FudC4gSnVzdCByZXR1cm4gdGhlXG4gICAgICAvLyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoZWwsICdocmVmJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnaW5uZXJUZXh0Jykge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgaW5uZXJUZXh0LiBKdXN0IG1hcCBpdCB0byB0ZXh0Q29udGVudC5cbiAgICAgIHJldHVybiBlbC50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuICg8YW55PmVsKVtuYW1lXTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAvLyBFdmVuIHRob3VnaCB0aGUgc2VydmVyIHJlbmRlcmVyIHJlZmxlY3RzIGFueSBwcm9wZXJ0aWVzIHRvIGF0dHJpYnV0ZXNcbiAgICAgIC8vIG1hcCAnaHJlZicgdG8gYXR0cmlidXRlIGp1c3QgdG8gaGFuZGxlIHdoZW4gc2V0UHJvcGVydHkgaXMgZGlyZWN0bHkgY2FsbGVkLlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWwsICdocmVmJywgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2lubmVyVGV4dCcpIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IGlubmVyVGV4dC4gSnVzdCBtYXAgaXQgdG8gdGV4dENvbnRlbnQuXG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH1cbiAgICAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiBkb2MuZGVmYXVsdFZpZXc7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2UgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoZG9jLmRvY3VtZW50RWxlbWVudCAhLCAnYmFzZScpO1xuICAgIGxldCBocmVmID0gJyc7XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIGhyZWYgPSBiYXNlLmdldEF0dHJpYnV0ZSgnaHJlZicpICE7XG4gICAgfVxuICAgIC8vIFRPRE8oYWx4aHViKTogTmVlZCByZWxhdGl2ZSBwYXRoIGxvZ2ljIGZyb20gQnJvd3NlckRvbUFkYXB0ZXIgaGVyZT9cbiAgICByZXR1cm4gaHJlZjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30ge1xuICAgIGNvbnN0IHN0eWxlTWFwOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBjb25zdCBzdHlsZUF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIGlmIChzdHlsZUF0dHJpYnV0ZSkge1xuICAgICAgY29uc3Qgc3R5bGVMaXN0ID0gc3R5bGVBdHRyaWJ1dGUuc3BsaXQoLzsrL2cpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZUxpc3RbaV0udHJpbSgpO1xuICAgICAgICBpZiAoc3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBzdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgaWYgKGNvbG9uSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgQ1NTIHN0eWxlOiAke3N0eWxlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBuYW1lID0gc3R5bGUuc3Vic3RyKDAsIGNvbG9uSW5kZXgpLnRyaW0oKTtcbiAgICAgICAgICBzdHlsZU1hcFtuYW1lXSA9IHN0eWxlLnN1YnN0cihjb2xvbkluZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZU1hcDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuICAgIGxldCBzdHlsZUF0dHJWYWx1ZSA9ICcnO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlTWFwKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgc3R5bGVBdHRyVmFsdWUgKz0ga2V5ICsgJzonICsgc3R5bGVNYXBba2V5XSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVBdHRyVmFsdWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZ3xudWxsKSB7XG4gICAgc3R5bGVOYW1lID0gc3R5bGVOYW1lLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc3R5bGVNYXAgPSB0aGlzLl9yZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgc3R5bGVNYXBbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWUgfHwgJyc7XG4gICAgdGhpcy5fd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZU1hcCk7XG4gIH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZykge1xuICAgIC8vIElFIHJlcXVpcmVzICcnIGluc3RlYWQgb2YgbnVsbFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgdGhpcy5zZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUsICcnKTtcbiAgfVxuXG4gIGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHJldHVybiBzdHlsZU1hcFtzdHlsZU5hbWVdIHx8ICcnO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnQgdG8gdGhlIHdpbmRvdyBhbHNvLlxuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQgfHwgZWw7XG4gICAgY29uc3Qgd2luID0gKGRvYyBhcyBhbnkpLmRlZmF1bHRWaWV3O1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdnZXRIaXN0b3J5Jyk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ2dldExvY2F0aW9uJyk7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiAnRmFrZSB1c2VyIGFnZW50JzsgfVxuXG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7IHJldHVybiBEYXRlLm5vdygpOyB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0Q29va2llJyk7IH1cbn1cbiJdfQ==